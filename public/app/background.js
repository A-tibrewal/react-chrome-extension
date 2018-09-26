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
        console.log( request, sender, sendResponse );
        serverOperations.createDarkProfile( request);
    }
);



var serverOperations = {

    createDarkProfile: function( data , callback){
        var formData = new FormData();
        //var file = new File([data.value],data.fileName,{type: data.file_type});
        formData.append('resume', data.resume);
        //var phone_number = data.phone_number;
        formData.append('profile_status', 'dark_profile');
        formData.append('email', data.email);
        formData.append('name', 'aditya');
        // formData.append('phone_number', data.phone_number);
        // formData.append('file_name', data.file_name);
        // formData.append('name', data.name);
        // formData.append('university', data.university);
        // formData.append('orgyear', data.orgyear);
        // formData.append('degree', data.degree);
        // formData.append('field', data.field);
        // formData.append('position', data.position);
        // formData.append('orgname', data.orgname);
        // formData.append('city', data.city);
        // formData.append('base_ctc', data.base_ctc );
        // formData.append('variable_ctc', data.variable_ctc );
        // formData.append('notice_period', data.notice_period );
        formData.append('xhr', true);//you can append it to formdata with a proper parameter name
        formData.append('new', true);//you can append it to formdata with a proper parameter name
    
        $.ajax({
          url : HOST + '/admin/create-dark-profile',
            dataType : 'json',
            type : 'POST',
            xhrFields: {
                withCredentials: true
            },
            cache : true,
            contentType : false,
            processData : false,
            data : formData, //formdata will contain all the other details with a name given to parameters
            success : function(response) {
                        response.profile_link = HOST + "/admin/candidates#email="+data['email'];
                        //callback( response );
            }
        });
    }






};
