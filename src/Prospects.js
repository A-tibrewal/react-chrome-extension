import React, { Component } from 'react';
import $ from 'jquery';
import { HOST } from './constants';
import StartCampaign from './StartCampaign';

class Prospects extends Component {

    constructor(){
        super();
        this.state = {
            status: '',
            connection_id: '',
            email: ''
        };
    }
    
    clickHandler(){

        let location = window.location;
        let that = this;
        if( !(/in\/[\w-]+\/$/).test(location.pathname) ){
            this.setState({
                status: 'Not a profile page'
            });
            return;
        }
        let profile_address = (location.pathname).match((/in\/[\w-]+\/$/))[0];
        $.ajax({
            url: '/' + profile_address + 'detail/contact-info/',
            type : 'GET'
        }).then( function(resp){
            
            let searchIndex = resp.indexOf('emailAddress');
            let subResponse = resp.substr(searchIndex);
            let email = subResponse.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
            console.log( email );
            
            if( !email ){
                that.setState({
                    status: 'Email not found.It seems you are not connected to this profile'
                });
                return;
            }

            that.setState({
                email: email,
                status: 'Found this email associated'
            });

        });
        


    }


    addProspectHandler(){
        let formData = new FormData();
        formData.append('xhr', true );
        //formData.append('profile_status', 'dark_profile');
        formData.append('email', this.email.value );
        let that = this;
        $.ajax({
            url : HOST + '/hire/prospects/add-prospect',
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
             that.setState({
                  status: resp.message,
                  connection_id: resp.connection
              });
        },function(){
            that.setState({
                status: 'Some error occurred. please contact support'
            });
        });

    }



    
    render(){
        let { connection_id, status, email} = this.state;

        const email_input = (<div>
                                <div className="InputAddOn">
                                    <label className="InputAddOn-item" for="email">Email</label>
                                    <input type="text" name="email" key={ `email-${email}`} className="form-control"  defaultValue={ email } ref={input => this.email = input}  id="email" placeholder="Email" />
                                </div>
                                <br/>
                                <button className="import-profile" style={{ width: "100%", marginTop: '10px' }} onClick={this.addProspectHandler.bind(this)}> Add to my Prospects </button>
                                <br/>
                                <br/>
                             </div>);

        const start_campaign = (<div> 
                                    <div className="want-to-start-campaign" > Add this profile to your prospects ? </div>
                                    <button className="import-profile" style={{ width: "100%", marginTop: '10px' }} onClick={this.clickHandler.bind(this)} >Yes</button> 
                                </div>);
        return (
            <div id="add-prospects-wrapper">
                {connection_id ? <StartCampaign email_id={this.email.value} connection_id={ connection_id }/> : <div> <div className="want-to-start-campaign" >{status ? (<div>{status}</div>): null }<br/></div> { email ? email_input : start_campaign } </div> }
            </div>
        )

    }
}
export default Prospects;
