import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <div className="profile-form">
        <input className="form" name="name" />
        <div className="">
            <label for="phone_number">Contact</label>
            <input type="text" required="true" class="form-control" id="phone_number" name="phone_number" placeholder="Phone Number" autocomplete="off" />
        </div>
        <div className="">
            <label for="email">Email
                <a id="check_dark_profile"  class="duplicate">Check</a>
            </label>
            <input type="text" className="form-control" id="email" name="email" placeholder="Email" required="true" />
        </div>
      </div>
    );
  }
}

export default Form;