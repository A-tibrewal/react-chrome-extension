import React, { Component } from 'react';
import { goBack } from 'route-lite';
import UserData from './UserData';
import CallLogs from './CallLogs';
import CompanyData from './CompanyData';
import { Accordion, AccordionItem } from 'react-light-accordion';
class Details extends Component { 
    render(){
        let {user_data, call_data, company_data, duplicate, resume_present} = this.props;
        console.log( user_data, call_data, company_data, duplicate, resume_present );
        return (
            <div >
                <div style={ { 'padding': '20px' } }>
                <div onClick={ () => goBack() } className="back-wrapper" > {"<"} Go Back </div>
                <div>
                    <Accordion atomic={true} >
                        <AccordionItem title="Personal Data">
                            <UserData user_data = {user_data} />
                        </AccordionItem>
                        <AccordionItem title="Company Data">
                            <CompanyData company_data = {company_data} />
                        </AccordionItem>
                        <AccordionItem title="Call Logs">
                            <CallLogs call_data = {call_data} />
                        </AccordionItem>
                    </Accordion>
                </div>
                </div>
            </div>
        )
    }
}

export default Details;
