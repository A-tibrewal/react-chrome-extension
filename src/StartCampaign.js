import React, { Component } from 'react';
import $ from 'jquery';
import { HOST } from './constants';

class StartCampaign extends Component {
    
    constructor(){
        super();
        this.state = {
            status: ""
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
        let connection_id = this.props.connection_id;
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
                    status: 'Campaign started successfully',
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
        const status = this.state.status;
        return (
            <div>
                Do you want to start campaign ?
                <button onClick={ () => this.getCampaigns() }> Get campaigns </button>
                {
                    all_campaigns && all_campaigns.length ? 
                        (<select ref={input => this.campaign = input} >
                            { all_campaigns.map(( item ) => (<option value={item.id} >{ item.name }</option>)) }
                        </select>)                     
                     : null
                }
                <button class="btn" onClick={ () => this.startCampaignNow() }> Start </button>
                {status ? <div>{status}</div> : null}
            </div>
        )
    }


}

export default StartCampaign;