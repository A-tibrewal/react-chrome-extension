var HOST = 'http://localhost:3000';
//var HOST = 'https://www.interviewbit.com';

var chrome = window.chrome;

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
   // Send a message to the active tab
   chrome.tabs.query({active: true, currentWindow:true},function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
   });
});

// context menu option added



// var contextMenu = {
//     id: "showOnInterviewbit",
//     title: "Show on Interviewbit",
//     contexts: ["selection"]
//   }
  
//   chrome.contextMenus.create( contextMenu );
  
//   chrome.contextMenus.onClicked.addListener( function( clickedData ){
//       if( clickedData.menuItemId === "showOnInterviewbit" ){
//         if ( validateEmail( clickedData.selectionText ) ){
//           chrome.tabs.create({ url: "https://www.interviewbit.com/admin/candidates#email="+clickedData.selectionText});
//         } else {
//           alert('The selection is not a valid email');
//         }
//       }
//   } );
  
//   function validateEmail(email) {
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
//   }  