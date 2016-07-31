  <!--
  /**
   * Jeremiah Bill
   * Script to retrieve latest SoundCloud playlist 
   * SoundCloud API
   * https://developers.soundcloud.com/docs/api/guide
   */

  function hideGreeting() {
      document.getElementById('greeting').style.display = "none";
  }
  window.onload = hideGreeting();
  //API call 
  SC.initialize({
      client_id: '82ec20b94d9a9ac2329ae23fd599f352',
      redirect_uri: 'http://localhost:8000/callback.html'
  });
  var perma_link;
  // initiate auth popup
  SC.connect(function() {
      SC.get("/me", function(response) {
          //console.log("Welcome" + response.username);
          //console.log(response);
          perma_link = response.permalink;
          // console.log(perma_link);

      });
      getPlaylist();
  });


  var toPlay;
  //gets playlist name 
  function getPlaylist() {
      SC.get("/me/playlists", function(response) {
          //console.log(response);
          for (i = 0; i < response.length; i++) {
              //console.log(response[i].title);
              toPlay = response[i].title;
          }
          play(toPlay);
      });

  }
  //retrieves response from API call applies widget to page
  function play(uri) {
      url = "http://soundcloud.com/" + perma_link + "/sets/" + uri.toLowerCase();
      //console.log(uri);
      SC.oEmbed(url, {
          maxheight: 50,
          auto_play: false
      }, function(resp) {
          document.getElementById('soundcloud').innerHTML = resp.html;

      });
  }

  //BUtton listeners
  $("#playButton").on("click", function(e) {
      var div = document.getElementById('soundcloud');
      var iframe = div.getElementsByTagName('iframe')[0];
      var widget = SC.Widget(iframe);
      widget.bind(SC.Widget.Events.READY, function() {
          console.log('Ready...');

      });
      widget.toggle();
      hideGreeting();

  });
  $("#next").on("click", function(e) {
      var div = document.getElementById('soundcloud');
      var iframe = div.getElementsByTagName('iframe')[0];
      var widget = SC.Widget(iframe);
      widget.bind(SC.Widget.Events.READY, function() {
          console.log('Ready...');

      });
      widget.next();
      hideGreeting();
  });
  $("#prev").on("click", function(e) {
      var div = document.getElementById('soundcloud');
      var iframe = div.getElementsByTagName('iframe')[0];
      var widget = SC.Widget(iframe);
      widget.bind(SC.Widget.Events.READY, function() {
          console.log('Ready...');

      });
      widget.prev();
      hideGreeting();
  });
  -->