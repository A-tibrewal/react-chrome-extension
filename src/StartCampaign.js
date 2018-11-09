import React, { Component } from 'react';
import $ from 'jquery';
import { HOST } from './constants';

class StartCampaign extends Component {
    
    constructor(){
        super();
        this.state = {
            status: "",
            finished: false
        };
    }

    getCampaigns( ){
        let that = this;
        $.get(HOST + '/hire/get-all-campaigns-and-templates').then(
            function(resp){
                if( resp && resp.campaigns ){
                    let all_campaigns = Object.values( resp.campaigns );
                    that.setState({
                        campaigns:all_campaigns
                    })
                }
            }
        )

    }

    startCampaignNow(){
        let { connection_id, email_id } = this.props;
        var formData = new FormData();
        formData.append('campaign_id', this.campaign.value );
        formData.append('prospect_ids[]', connection_id );
        let that = this;
        $.ajax({
            url : HOST + '/hire/prospects/start-campaign',
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
            if( resp.success){
                that.setState({
                    status: 'Campaign started successfully for ' + email_id ,
                    finished: true
                });
            }
        },function(){
            that.setState({
                status: 'Some error occurred. please contact support'
            });
        })
    }

    render(){
        const all_campaigns = this.state.campaigns || [];
        
        const { status, finished } = this.state;

        const want_to_start_campaign = (<div>
                <br/>
                <br/>
                <div className="want-to-start-campaign">Do you want to start campaign ?</div>
                <button className="import-profile" style={{ width: "100%", marginTop: '10px' }} onClick={ () => this.getCampaigns() }> Yes  </button>
            </div>);
        
        const all_campaigns_div = (<div>
            <div lassName="want-to-start-campaign" >Choose one of the campaigns to start </div><br/>
            <select ref={input => this.campaign = input} >
                            { all_campaigns.map(( item ) => (<option value={item.id} >{ item.name }</option>)) }
            </select>
            <br/>
            <button className="import-profile" style={{ width: "100%", marginTop: '10px' }} onClick={ () => this.startCampaignNow() }> Start Campaign </button>
            <br/>
            <br/>
        </div>);



        return (
            <div>
                {
                    finished ? null : <div> { all_campaigns && all_campaigns.length ? all_campaigns_div : want_to_start_campaign } </div>
                }
                
                {status ? <div className="want-to-start-campaign" >{status}</div> : null}
            </div>
        )
    }


}

export default StartCampaign;