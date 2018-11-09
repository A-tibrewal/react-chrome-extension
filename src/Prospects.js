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
                status: 'Email Found'
            });

        });
        
        







        // let formData = new FormData();
        // formData.append('xhr', true );
        // //formData.append('profile_status', 'dark_profile');
        // formData.append('email', this.email.value );
        // let that = this;
        // $.ajax({
        //     url : HOST + '/hire/prospects/add-prospect',
        //       dataType : 'json',
        //       type : 'POST',
        //       xhrFields: {
        //           withCredentials: true
        //       },
        //       cache : true,
        //       contentType : false,
        //       processData : false,
        //       data : formData //formdata will contain all the other details with a name given to parameters
        //   }).then( function( resp ){
        //      that.setState({
        //           status: resp.message,
        //           connection_id: resp.connection
        //       });
        // },function(){
        //     that.setState({
        //         status: 'Some error occurred. please contact support'
        //     });
        // })
    }
    
    render(){
        let { connection_id, status, email} = this.state;
        return (
            <div >
                <div>{status ? (<div>{status}</div>): null }</div>
                <div>{ email ?
                (<div className="InputAddOn">
                    <label className="InputAddOn-item" for="email">Email</label>
                    <input type="text" name="email" key={ `email-${email}`} className="form-control"  defaultValue={ email } ref={input => this.email = input}  id="email" placeholder="Email" />
                </div>) : null }
                </div>
                <button class="import-profile" style={{ width: "auto" }} onClick={this.clickHandler.bind(this)} >Add to my Prospects</button>
                {connection_id ? <StartCampaign connection_id={ connection_id }/> : null }
            </div>
        )

    }
}
export default Prospects;
