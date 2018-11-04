import React from 'react';
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
            <td>Company</td>
            <td>{user_data.orgname}</td> 
        </tr>
        <tr>
            <td>Position</td>
            <td>{user_data.position}</td> 
        </tr>
        <tr>
            <td>Resume</td>
            <td><a target="_blank" href={"https://www.interviewbit.com/" + user_data.resume_link } >resume </a></td> 
        </tr>
    </table>
)
export default UserData;