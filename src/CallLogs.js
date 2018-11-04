import React from 'react';
const CallLogs = ({ call_data }) => (
    <table style={ { "width":"100%" }}>
    {
        call_data.length ? (
            call_data.map(( item ) =>  
            (<tr><td>{item.from_number}</td> <td>{item.call_timestamp}</td> </tr> )
            ) ) : 'No call logs'  
    }
    </table> 
)

export default CallLogs;