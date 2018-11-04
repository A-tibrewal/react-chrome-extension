import React from 'react';
import * as moment from 'moment';

const CallLogs = ({ call_data }) => (
    <table style={ { "width":"100%" }}>
    {
        call_data.length ? (
            call_data.map(( item ) =>  
            (<tr><td>{item.from_number}</td> <td>{ moment( new Date(item.call_timestamp) ).format('ddd, DD/MM/YY h:mm A') }</td> </tr> )
            ) ) : 'No call logs'  
    }
    </table> 
)

export default CallLogs;