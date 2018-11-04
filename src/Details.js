import React, { Component } from 'react';
import { goBack } from 'route-lite';
import UserData from './UserData';

class Details extends Component { 
    render(){
        let {user_data, call_data, company_data, duplicate, resume_present} = this.props;
        console.log( user_data, call_data, company_data, duplicate, resume_present );
        return (
            <div >
                <div style={ { 'padding': '20px' } }>
                <div onClick={ () => goBack() } className="back-wrapper" >  Go Back </div>
                    Candidate details
                <div>
                <UserData user_data = {user_data} />
                </div>
                </div>
            </div>
        )
    }
}

export default Details;
