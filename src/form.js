import React, { Component } from 'react';
import $ from 'jquery';
import Scrapper from './Scrapper';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      success: false,
      profileData:{}
    };
  }

  getHost( dev = true ){
    if( dev )
      return 'http://localhost:3000'
    else
      return 'https://www.interviewbit.com'
  }

  addFileToS3( type, file_name, file_obj ){
    this.ppdURL = this.getHost() + '/admin/get-ppd';
    this.bucket = 'ib-public-profile-dump';
    this.bucketRegion = 'us-west-2';
    this.getPostPolicyDocument(type, file_name, file_obj);
  }

  getDataDump(data){
    let location = window.location;
    data.source = location.host == 'resdex.naukri.com' ? 'naukri' : 'linkedin'
    if( data.source == 'naukri' ){
      data.url = location.href;
    } else {
      data.url = location.pathname;
    }
    data.dump = "<html>" + $("html").html() + "</html>";
    return data;
  }  


  getPostPolicyDocument = function(type, file_name, file_obj) {
    var that = this;
    let url = this.ppdURL;
    var data = {
      url: file_obj['url'],
      source: file_obj['source'],
      email: file_obj['email'],
      phone_number: file_obj['phone_number'],
      type: file_obj['type'] || ''
    };

    url = new window.URL(url);
    url.search = new URLSearchParams(data);

    fetch( url, {
      credentials: 'include'
    }).then(
      res => res.json()
    )
    .then(
      json => {
        let s3_url = 'https://' + that.bucket + '.s3.amazonaws.com/';
        var formData = that.populateFormData(json.signed_s3_post, file_obj['dump']);
        fetch( s3_url, {
          method: 'POST',
          body: formData 
        } )
      }
    )
  }


  populateFormData = function(signed_s3_post, file_content) {
    var formData = new FormData();
    formData.append('key', signed_s3_post['key']);
    formData.append('acl', signed_s3_post['acl']);
    formData.append('Content-Type', 'text/plain');
    formData.append('AWSAccessKeyId', signed_s3_post['access_key']);
    formData.append('policy', signed_s3_post['policy']);
    formData.append('signature', signed_s3_post['signature']);
    var data = new Blob([ file_content ], {
      type: 'text/plain'
    });
    formData.append('file',  data );
    return formData;
    }

  // componentWillMount(){
  //   window.chromeExtenionVars = {
  //     host: '',
  //     //host: 'https://www.interviewbit.com'
  //   };
  // }

  submitFormHandler = async function( ){
    let email = this.email.value;
    let file = this.resume.files && this.resume.files[0];
    if( file ){
      let type = file.type;
      let file_name = file.name;
      let fileDataURL = await Form.readUploadedFileAsDataURL(file)
      var index = fileDataURL.indexOf('base64,');
      this.resume_data_url = fileDataURL.substring(index + 7);
      this.createDarkProfile();
    }  else {
       alert('Please select resume to go forward');
   }

  }


  makeMessageBox( response, type){
    let message = '';
    if( response.success ){
      message = 'Profile ' + ( response.duplicate ? 'Present' : 'absent' ) +
         '<br/> Resume ' + ( response.resume_present ? 'Present' : 'absent' );
    } else {
      message = 'Profile Absent'
    }
    this.setState({
      message: message
    })
  }

  createDarkProfile = async function( ){
      var formData = new FormData();
      formData.append('resume', this.resume_data_url);
      formData.append('profile_status', 'dark_profile');
      formData.append('email', this.email.value );
      formData.append('name', this.name.value );
      formData.append('university', this.university.value);
      formData.append('orgyear', this.orgyear.value);
      formData.append('degree', this.degree.value);
      formData.append('field', this.field.value);
      formData.append('position', this.position.value);
      formData.append('orgname', this.orgname.value);
      formData.append('city', this.city.value);
      formData.append('base_ctc', this.base_ctc.value );
      formData.append('variable_ctc', this.variable_ctc.value );
      formData.append('notice_period', this.notice_period.value );
      formData.append('xhr', true);//you can append it to formdata with a proper parameter name
      formData.append('new', true);//you can append it to formdata with a proper parameter name
      var that = this;
      $.ajax({
          url : that.getHost() + '/admin/create-dark-profile',
            dataType : 'json',
            type : 'POST',
            xhrFields: {
                withCredentials: true
            },
            cache : true,
            contentType : false,
            processData : false,
            data : formData //formdata will contain all the other details with a name given to parameters
        }).then( function( resp ){
          console.log( resp );
      })
  }


  importProfile(){
    let data = Scrapper.getProfileData();
    this.setState({
      profileData : data['profileData'],
      message: data['message']
    });
    console.log( Scrapper.getProfileData() );
  }


  checkDuplicate = function(){

    var that = this;
    console.log('check Profile', that.getHost());
    var data  = {
      email: this.email.value,
      phone_number: this.phone_number.value
    }

    let fileObj = this.getDataDump( {email: data.email,phone_number: data.phone_number} );
    this.addFileToS3('linkedin', Date.now(), fileObj);

    $.ajax({
      type: "GET",
        url: that.getHost() + '/admin/duplicate-profile',
        data: data,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        cache:true
    }).then( function( resp ){
        that.makeMessageBox( resp );
    },function(){
        that.setState({
          message: "NOT AUTHORIZED. Please login with your admin account"
        })
    })
  }

  static readUploadedFileAsDataURL = inputFile => {
    const temporaryFileReader = new FileReader();
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };


  render() {
    let message = this.state.message;
    let profileData = this.state.profileData;

    return (
      <div className="profile-form">
        <form novalidate="true">
          <div class="message_box">
            <span dangerouslySetInnerHTML={{ __html: message }} />
          </div>
          <div class="import-profile" onClick={() => this.importProfile() }>Import</div>
          <div className="InputAddOn">
              <label className="InputAddOn-item" for="phone_number" >Contact</label>
              <input type="text" required="true" class="form-control" defaultValue={profileData.phone_number} ref={input => this.phone_number = input} id="phone_number" name="phone_number" placeholder="Phone Number" autocomplete="off" />
          </div>
          <div className="InputAddOn">
              <label className="InputAddOn-item" for="email">Email</label>
              <input type="text" className="form-control" ref={input => this.email = input} id="email" name="email" placeholder="Email" />
          </div>
          <div className="InputAddOn">
            <div class="create-dark-profile-btn" onClick={ () => { this.checkDuplicate();  } } >check</div>
          </div>
          <div className="InputAddOn">
              <label className="InputAddOn-item" for="resume" >Resume</label>
              <input type="file" ref={input => this.resume = input} className="form-control" id="resume" name="resume" style={ { width: '200px'} }/>
          </div>
          <div className="InputAddOn">
              <label className="InputAddOn-item" for="name">Name</label>
              <input type="text" class="form-control" id="name" defaultValue={profileData.name} name="name" placeholder="Name" autocomplete="off"  />
          </div>
          <div className="InputAddOn">
          <label className="InputAddOn-item" for="university">University</label>
          <input className="form-control" id="university" name="university"  type="text" defaultValue={profileData.university} />
        </div>
        <div className="InputAddOn">
          <label className="InputAddOn-item" for="orgyear">Grad Yr</label>
          <input type="number" className="form-control" defaultValue={profileData.orgyear} id="orgyear" name="orgyear" placeholder="Graduation Year" autocomplete="off" required="true" type="number" />
        </div>
        <div className="InputAddOn">
          <label className="InputAddOn-item" for="degreer">Degree</label>
          <select class="form-control" type="text" name='degree' id="degree" required="true" defaultValue={profileData.degree}>
                  <option value="">Choose Degree</option>
                  <option value="BE/B.Tech/BS">BE/B.Tech/BS</option>
                  <option value="ME/M.Tech">ME/M.Tech</option>
                  <option value="Dual degree - BE + ME">Dual degree - BE + ME</option>
                  <option value="PhD">PhD</option>
                  <option value="MS">MS</option>
                  <option value="MBA">MBA</option>
                  <option value="MCA/BCA">MCA/BCA</option>
                  <option value="BE + MBA">BE + MBA</option>
                  <option value="">Other</option>
                </select>
        </div>
        <div className="InputAddOn">
          <label className="InputAddOn-item" for="field">Field</label>
          <select className="form-control" type="text" name='field' id="field" required="true" defaultValue={profileData.field}>
                  <option value="">Choose Stream</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Mathematics and Computing">Mathematics and Computing</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Electrical">Electrical</option>
                  <option value="">Other</option>
                </select>
        </div>

        <div className="InputAddOn">
          <label className="InputAddOn-item" for="position">Position</label>
          <select className="form-control" type="text" name='position' id="position"  required="true" defaultValue={profileData.position}>
                  <option value="">Choose Job Position</option>
                  <option value="Engineering Leadership">Engineering Leadership</option>
                  <option value="Backend Engineer">Backend Engineer</option>
                  <option value="Frontend Engineer">Frontend Engineer</option>
                  <option value="Fullstack Engineer">Fullstack Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Android Engineer">Android Engineer</option>
                  <option value="iOS Engineer">iOS Engineer</option>
                  <option value="Devops Engineer">Devops Engineer</option>
                  <option value="Engineering Intern">Engineering Intern</option>
                  <option value="Support Engineer">Support Engineer</option>
                  <option value="Backend Architect">Backend Architect</option>
                  <option value="SDET">SDET</option>
                  <option value="Co-founder">Co-founder</option>
                  <option value="Research Engineer">Research Engineer</option>
                  <option value="QA Engineer">QA Engineer</option>
                  <option value="Manual Tester">Manual Tester</option>
                  <option value="Product Designer">Product Designer</option>
                  <option value="Program Manager">Program Manager</option>
                  <option value="Release Engineer">Release Engineer</option>
                  <option value="Security Leadership">Security Leadership</option>
                  <option value="Database Administrator">Database Administrator</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="">Other</option>
                </select>
        </div>

        <div className="InputAddOn">
          <label className="InputAddOn-item" for="orgname">Company</label>
          <input className="form-control" id="orgname" name="orgname" type="text" defaultValue={profileData.company} />
        </div>
        <div className="InputAddOn">
          <label className="InputAddOn-item" for="city">Location</label>
          <input type="text" className="form-control" id="city" name="city" placeholder="Current Location" autocomplete="off" defaultValue={profileData.location}/>
        </div>


        <div className="InputAddOn">
          <label className="InputAddOn-item" >Fixed</label>
          <input className="form-control" type="number" id="base_ctc" name='base_ctc' placeholder="Fixed income" min='0' max='900'  step="any" defaultValue={profileData.base_ctc} />
        </div>
        <div className="InputAddOn">
          <label className="InputAddOn-item" >Variable</label>
          <input className="form-control" type="number" id="variable_ctc" name='variable_ctc' placeholder="Variable Income" min='0' max='900' step="any" defaultValue={profileData.variable_ctc}/>
        </div>

        <div className="InputAddOn">
          <label className="InputAddOn-item"  for="notice_period">Notice</label>
          <select name="notice-period" placeholder="Notice
                period" id="notice_period" className="form-control" defaultValue={profileData.notice_period} >
                <option value="">Select notice period</option>
                <option value="0">0 days</option>
                <option value="15">15 days</option>
                <option value="30">30 days</option>
                <option value="45">45 days</option>
                <option value="60">60 days</option>
                <option value="75">75 days</option>
                <option value="90">90 days</option>
              </select>
        </div>
        <div  className="create-dark-profile-btn"  onClick={ () => { this.submitFormHandler();  } } >Save</div> 
      </form>
      </div>
    );
  }
}

export default Form;