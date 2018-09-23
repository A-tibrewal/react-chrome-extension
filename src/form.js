import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <div className="profile-form">
        <div className="InputAddOn">
            <label className="InputAddOn-item" for="phone_number" >Contact</label>
            <input type="text" required="true" class="form-control" id="phone_number" name="phone_number" placeholder="Phone Number" autocomplete="off" />
        </div>
        <div className="InputAddOn">
            <label className="InputAddOn-item" for="email">Email</label>
            <input type="text" className="form-control" id="email" name="email" placeholder="Email" required="true" />
        </div>
        <div className="InputAddOn">
            <label className="InputAddOn-item" for="resume" >Resume</label>
            <input type="file" className="form-control" id="resume" name="resume" />
        </div>
        <div className="InputAddOn">
            <label className="InputAddOn-item" for="name">Name</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Name" autocomplete="off" required="true" />
        </div>
        <div className="InputAddOn">
        <label className="InputAddOn-item" for="university">University</label>
        <input className="form-control" id="university" name="university" required="true" type="text" />
      </div>
      <div className="InputAddOn">
        <label className="InputAddOn-item" for="orgyear">Grad Yr</label>
        <input type="number" className="form-control" id="orgyear" name="orgyear" placeholder="Graduation Year" autocomplete="off" required="true" type="number" />
      </div>
      <div className="InputAddOn">
        <label className="InputAddOn-item" for="degreer">Degree</label>
        <select class="form-control" type="text" name='degree' id="degree" required="true">
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
        <select className="form-control" type="text" name='field' id="field" required="true">
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
        <select className="form-control" type="text" name='position' id="position"  required="true">
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
        <input className="form-control" id="orgname" name="orgname" type="text" />
      </div>
      <div className="InputAddOn">
        <label className="InputAddOn-item" for="city">Location</label>
        <input type="text" className="form-control" id="city" name="city" placeholder="Current Location" autocomplete="off" />
      </div>


      <div className="InputAddOn">
        <label className="InputAddOn-item" >Fixed</label>
        <input className="form-control" type="number" id="base_ctc" name='base_ctc' placeholder="Fixed income" min='0' max='900'  step="any" />
      </div>
      <div className="InputAddOn">
        <label className="InputAddOn-item" >Variable</label>
        <input className="form-control" type="number" id="variable_ctc" name='variable_ctc' placeholder="Variable Income" min='0' max='900' step="any" />
      </div>

      <div className="InputAddOn">
        <label className="InputAddOn-item"  for="notice_period">Notice</label>
        <select name="notice-period" placeholder="Notice
              period" id="notice_period" className="form-control">
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
      </div>
    );
  }
}

export default Form;