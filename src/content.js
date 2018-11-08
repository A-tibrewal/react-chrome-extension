/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer} from 'react-frame-component';
import Form from './form';
import Details from './Details';
import "./content.css";
import Router, { Link, goBack } from 'route-lite';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Prospects from './Prospects';

class Main extends React.Component {
    render() {
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
               <FrameContextConsumer>
               {
               // Callback is invoked with iframe's window and document instances
                   ({document, window}) => {
                      // Render Children
                        return (
                            <div>
                                <header>InterviewBit Plus</header>
                                <Tabs>
                                    <TabList>
                                        <Tab> Create Dark Profile </Tab>
                                        <Tab> Prospects </Tab>
                                    </TabList>
                                    <TabPanel>
                                        <div className={'my-extension'}>
                                            <Form />
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <Prospects />
                                        {/* <div>Coming soon</div> */}
                                    </TabPanel>
                                </Tabs>
                           </div>
                        )
                    }
                }
                </FrameContextConsumer>
            </Frame>
        )
    }
}

const app = document.createElement('div');
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Router><Main /></Router>, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action") {
        toggle();
      }
   }
);

function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }else{
     app.style.display = "none";
   }
}