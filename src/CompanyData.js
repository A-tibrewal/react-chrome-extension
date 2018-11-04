import React from 'react';
const CompanyData = ({ company_data }) => (
        <div class="company-data">
        { company_data.length ? (
            company_data.map(( item ) =>  
            (
            <table style={ { "width":"100%" }}>     
            <tr>
                <th>Company </th> 
                <th>{item.company_name}</th> 
            </tr>
            <tr>
                 <td>Job Profile</td> 
                 <td>{item.job_profile_id}</td> 
             </tr>
             <tr>
                 <td>Status</td> 
                 <td>{item.new_status}</td> 
             </tr>
             <tr>
                 <td>Preperation M Sent</td> 
                 <td>{item.preperation_material_sent}</td> 
             </tr>
             <tr>
                 <td>Joining Data</td> 
                 <td>{item.joining_data}</td> 
             </tr>
             <tr>
                 <td>Salary Offered</td> 
                 <td>{item.offered_salary}</td> 
             </tr>
            </table>   
            )
            ) ) : 'No Company Data'  }
        </div>
)

export default CompanyData;