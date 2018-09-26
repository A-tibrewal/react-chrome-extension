var HOST = 'http://localhost:3000';
//var HOST = 'https://www.interviewbit.com';

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
   // Send a message to the active tab
   chrome.tabs.query({active: true, currentWindow:true},function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
   });
});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) { 
        console.log(request, sender, sendResponse);
        if( request.type =="create_dark_profile"){
            var new_candidate = new candidateProfile(request);
            var response = new_candidate.createDarkProfile();
            sendResponse( response );
        }

    }
);


function candidateProfile( data ){
    this.email = data.email;
    this.name = data.name;
    this.resume = data.resume;
    this.createDarkProfile = async function(){
        var formData = new FormData();
        formData.append('resume', this.resume );
        //var phone_number = data.phone_number;
        formData.append('profile_status', 'dark_profile');
        formData.append('email', data.email);
        formData.append('name', 'aditya');
        formData.append('xhr', true);//you can append it to formdata with a proper parameter name
        formData.append('new', true);//you can append it to formdata with a proper parameter name
        var response = await $.ajax({
            url : HOST + '/admin/create-dark-profile',
              dataType : 'json',
              type : 'POST',
              xhrFields: {
                  withCredentials: true
              },
              cache : true,
              contentType : false,
              processData : false,
              data : formData //formdata will contain all the other details with a name given to parameters
          });
          return response;
    }
}

