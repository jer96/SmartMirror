<!--
/**
  * Jeremiah Bill
  * Script to retrieve Gmail information
  * Google Maps API
  * https://developers.google.com/maps/ 
*/

         // Your Client ID can be retrieved from your project in the Google
         // Developer Console, https://console.developers.google.com
         var CLIENT_ID = '850647489816-8010546agj6ti3af1rsv7ikigi5bpgit.apps.googleusercontent.com';
         
         var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
         var apiKey= 'AIzaSyArIhC4kw11UewBc4wg5Au18TJuAGruM0k';
         /**
          * Check if current user has authorized this application.
          */
          function handleClientLoad() {
           gapi.client.setApiKey(apiKey);
           window.setTimeout(checkAuth, 1);
         }
         function checkAuth() {
           gapi.auth.authorize(
             {
               client_id: CLIENT_ID,
               scope: SCOPES,
               immediate: true
             }, handleAuthResult);
         }
         
         /**
          * Handle response from authorization server.
          *
          * @param {Object} authResult Authorization result.
          */
         function handleAuthResult(authResult) {
           var authorizeDiv = document.getElementById('authorize-div');
           if (authResult && !authResult.error) {
             // Hide auth UI, then load client library.
             authorizeDiv.style.display = 'none';
             loadGmailApi();
             $('.table-inbox').removeClass("hidden");
           } else {
             // Show auth UI, allowing the user to initiate authorization by
             // clicking authorize button.
             authorizeDiv.style.display = 'inline';
           }
         }
         
         /**
          * Initiate auth flow in response to user clicking authorize button.
          *
          * @param {Event} event Button click event.
          */
         function handleAuthClick(event) {
           gapi.auth.authorize(
             {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
             handleAuthResult);
           return false;
         }
         
         /**
          * Load Gmail API client library. List labels once client library
          * is loaded.
          */
         function loadGmailApi() {
           gapi.client.load('gmail', 'v1', listInbox);      
         }
         function listInbox() {
           var request = gapi.client.gmail.users.messages.list({
             'userId': 'me',
             //change to unread
             'labelIds': 'STARRED',
             'maxResults': 10
           });
           
             request.execute(function(response) {
               try{
                 $.each(response.messages, function() {
               var messageRequest = gapi.client.gmail.users.messages.get({
                 'userId': 'me',
                 'id': this.id
               });
         
               messageRequest.execute(showMessages);
                  });
               }
               catch(err){
                 $('#inbox').empty();
                 $('#inbox').append('<h1>No emails to display</h1>');
               }
            
            });
         }
         var email = "nothing";

         function showMessages(message) {
          email = getAttributes(message.payload.headers, 'Delivered-To');
          localStorage.setItem("email" , email);

          var date = new Date(getAttributes(message.payload.headers, 'Date'));
          months = [ 'January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October', 'November','December' ];
          month = date.getMonth();
          day = date.getDate();
          time = [months[month] , day].join(" ") + "   ";

         
           $('.table-inbox tbody').append(
             '<tr>\
               <td>'+getAttributes(message.payload.headers, 'From')+'</td>\
               <td>\
                 <a style="color:white" href="#message-modal-' + message.id +
                   '" data-toggle="modal" id="message-link-' + message.id+'">' +
                   getAttributes(message.payload.headers, 'Subject') +
                 '</a>\
               </td>\
               <td>'+time + '</td>\
             </tr>'
           );
           $('body').append(
             '<div class="modal fade" id="message-modal-' + message.id +
                 '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\
               <div class="modal-dialog modal-lg">\
                 <div class="modal-content">\
                   <div class="modal-header">\
                     <button type="button"\
                             class="close"\
                             data-dismiss="modal"\
                             aria-label="Close">\
                       <span aria-hidden="true">&times;</span></button>\
                     <h4 class="modal-title" id=" ">' +
                       getAttributes(message.payload.headers, 'Subject') +
                     '</h4>\
                   </div>\
                   <div class="modal-body">\
                     <iframe id="message-iframe-'+message.id+'" srcdoc="<p>Loading...</p>">\
                     </iframe>\
                   </div>\
                 </div>\
               </div>\
             </div>'
           );
           $('#message-link-'+message.id).on('click', function(){
             var ifrm = $('#message-iframe-'+message.id)[0].contentWindow.document;
             $('body', ifrm).html(getBody(message.payload));
           });
         }

         

         function getBody(message) {
           var encodedBody = '';
           if(typeof message.parts === 'undefined')
           {
             encodedBody = message.body.data;
           }
           else
           {
             encodedBody = getHTMLPart(message.parts);
           }
           encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
           return decodeURIComponent(escape(window.atob(encodedBody)));
         }
         function getHTMLPart(arr) {
           for(var x = 0; x <= arr.length; x++)
           {
             if(typeof arr[x].parts === 'undefined')
             {
               if(arr[x].mimeType === 'text/html')
               {
                 return arr[x].body.data;
               }
             }
             else
             {
               return getHTMLPart(arr[x].parts);
             }
           }
           return '';
         }
        function getAttributes(array , attribute){
           for(i = 0; i  <array.length ; i++){
            if(array[i].name === attribute){
             return array[i].value;
            }
           }
         }
         var inboxFlag = false;
        function showInbox(){
          if(!inboxFlag && mapFlag){
            document.getElementById('inbox').style.display = "initial";
           // $("#showInbox").removeClass("btn btn-default btn-lg active").addClass("btn btn-default btn-lg disabled");
            inboxFlag = true;
          }
          else{
            //$("#showInbox").removeClass("btn btn-default btn-lg disabled").addClass("btn btn-default btn-lg active");
            inboxFlag = false;
            hideInbox();
          }
          
          }
        function hideInbox(){
          document.getElementById('inbox').style.display = "none";
          
          }
          var mapFlag = false;
        function hideMap(){
          if(mapFlag && !inboxFlag){
            document.getElementById('googleMaps').style.display = 'initial';
            mapFlag = false;
            localStorage.setItem("mapFlag" , mapFlag);
          }
          else{
            document.getElementById('googleMaps').style.display = 'none';
            mapFlag = true;
            localStorage.setItem("mapFlag" , mapFlag);
          }
          
          }
        var soundcloudFlag = true;
        function hideSoundCloud(){
          if(soundcloudFlag){
            document.getElementById('soundcloud').style.display = 'none';
            soundcloudFlag =false;
          }
          else{
            document.getElementById('soundcloud').style.display = 'initial';
            soundcloudFlag=true;
          }
          
        }
          setTimeout(hideMap , 3000);
          window.onload = hideInbox();


          -->