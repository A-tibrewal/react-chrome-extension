import React, { Component } from 'react';
import $ from 'jquery';
import { HOST } from './constants';

class StartCampaign extends Component {
    
    constructor(){
        super();
        this.state = {};
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

    render(){
        const all_campaigns = this.state.campaigns || [];
        return (
            <div>
                Do you want to start campaign ?
                <button onClick={ () => this.getCampaigns() }> Get campaigns </button>
                {
                    all_campaigns && all_campaigns.length ? 
                        (<select>
                            { all_campaigns.map(( item ) => (<option>{ item.name }</option>)) }
                        </select>)                     
                     : null
                }
            </div>
        )
    }


}

export default StartCampaign;