import React, { Component } from 'react';
import $ from 'jquery';
import { HOST } from './constants';

class Prospects extends Component {
    
    clickHandler(){
        var formData = new FormData();
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
              console.log(resp);
        },function(){
            console.log('error');
        })
    }
    
    render(){
        return (
            <div >
                <div className="InputAddOn">
                    <label className="InputAddOn-item" for="email">Email</label>
                    <input type="text" name="email" className="form-control"  ref={input => this.email = input}  id="email" placeholder="Email" />
                </div>
                <button class="btn" onClick={ () => { this.clickHandler(); } }>Add to my Prospects</button>
            </div>
        )

    }
}
export default Prospects;
