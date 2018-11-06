import React from 'react';
import { HOST } from './constants';

const UserData = ({ user_data }) => (
    <table style={ { "width":"100%" }}>
        <tr>
            <td>Name</td>
            <td>{user_data.name}</td> 
        </tr>
        <tr>
            <td>Email</td>
            <td>{user_data.email}</td> 
        </tr>
        <tr>
            <td>Resume</td>
            <td>
                {user_data.resume_link ? (<a target="_blank" href={ HOST + '/' + user_data.resume_link } > Resume </a>) : ' Please Update' }
            </td> 
        </tr>
        <tr>
            <td>Company</td>
            <td>{user_data.orgname}</td> 
        </tr>
        <tr>
            <td>Position</td>
            <td>{user_data.position}</td> 
        </tr>
        <tr>
            <td>Grad Year</td>
            <td>{user_data.orgyear}</td> 
        </tr>
        <tr>
            <td>Score</td>
            <td>{user_data.score}</td> 
        </tr>
        <tr>
            <td>CTC</td>
            <td>{user_data.current_ctc}</td> 
        </tr>
        <tr>
            <td>Notice Period</td>
            <td>{user_data.admin_notice_period}</td> 
        </tr>
        <tr>
            <td>University</td>
            <td>{user_data.university}</td> 
        </tr>
        <tr>
            <td>Field</td>
            <td>{user_data.field}</td> 
        </tr>
        <tr>
            <td>Degree</td>
            <td>{user_data.degree}</td> 
        </tr>
        <tr>
            <td>City</td>
            <td>{user_data.city}</td> 
        </tr>
        <tr>
            <td>Country</td>
            <td>{user_data.country}</td> 
        </tr>
        <tr>
            <td>Last Call</td>
            <td>{user_data.last_call_details}</td> 
        </tr>
        <tr>
            <td>Last seen</td>
            <td>{user_data.last_seen}</td> 
        </tr>
    </table>
)
export default UserData;