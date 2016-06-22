var hyperaudiolite = (function () {
  
  var hal = {}, 
    transcript, 
    words, 
    player,
    paraIndex,
    end;
  
  function init(mediaElementId) {
    words = transcript.getElementsByTagName('a');
    paras = transcript.getElementsByTagName('p');
    player = document.getElementById(mediaElementId);
    paraIndex = 0;
    words[0].classList.add("active");
    paras[0].classList.add("active");
    transcript.addEventListener("click", setPlayHead, false);
    player.addEventListener("timeupdate", checkPlayHead, false);
    
    var hashes = window.location.hash.substring(1).split('&');
    var times = {};
    for (i=0; i<hashes.length; i++) {
      var x = hashes[i].split('=');
      var y = parseFloat(x[1]);
      if (!isNaN(y)) {
        times[x[0]] = x[1];
      }
    }
    
    if (times['start']) {
      if (times['end']) {
        if (times['end'] > times['start']) {
          end = times['end'];
        }
      }
      player.currentTime = times['start'];
      player.play();
    }
    
  }

  function setPlayHead(e) {
    var target = (e.target) ? e.target : e.srcElement;
    target.setAttribute("class", "active");
    var timeSecs = parseInt(target.getAttribute("data-m"))/1000;
    
    if(!isNaN(parseFloat(timeSecs))) {
      end = null;
      player.currentTime = timeSecs;
      player.play();
    }
  }

  function checkPlayHead(e) {
    
    //check for end time of shared piece

    if (end && (end < player.currentTime)) {
      player.pause();
      end = null;
    }
    
    var activeitems = transcript.getElementsByClassName('active');
    var activeitemsLength = activeitems.length;

    for (var a = 0; a < activeitemsLength; a++) {
      if (activeitems[a]) { // TODO: look into why we need this
        activeitems[a].classList.remove("active");
      }
    }

    // Establish current paragraph index

    var currentParaIndex;

    for (i = 1; i < words.length; i++) {
      if (parseInt(words[i].getAttribute("data-m"))/1000 > player.currentTime) {

        // TODO: look for a better way of doing this
        var strayActive = transcript.getElementsByClassName('active')[0];
        strayActive.classList.remove("active");

        // word time is in the future - set the previous word as active.
        words[i-1].classList.add("active");
        words[i-1].parentNode.classList.add("active");

        paras = transcript.getElementsByTagName('p');

        for (a = 0; a < paras.length; a++) {

          if (paras[a].classList.contains("active")) {
            currentParaIndex = a;
            break;
          }
        }

        if (currentParaIndex != paraIndex) {

          Velocity(words[i].parentNode, "scroll", { 
            duration: 800,
            delay: 0
          });

          paraIndex = currentParaIndex;
        }

        break;
      }
    }
  }

  hal.init = function(transcriptId, mediaElementId) {
    transcript = document.getElementById(transcriptId);
    init(mediaElementId);
  }
 
  return hal;
 
})();
