var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var myAudio = document.querySelector('audio');
var pre = document.querySelector('pre');
var myScript = document.querySelector('script');
//
// var panControl = document.querySelector('.panning-control');
// var panValue = document.querySelector('.panning-value');

pre.innerHTML = myScript.innerHTML;

var source;


//get data gets the sound file
function getData() {
  source = audioCtx.createBufferSource(); //not supported by firefox
  request = new XMLHttpRequest();
  n = Math.ceil(Math.random()*6);
  // n = 2;
  console.log('sounds/crash'+n+'.mp3');
  request.open('GET', 'sounds/crash'+n+'.mp3', true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    audioCtx.decodeAudioData(request.response, function(buffer) {
      source.buffer = buffer;
      source.connect(audioCtx.destination); // pre-gain node
      // source.loop = true;
    },
    function(e) {
      console.log("Error connecting to audio file" + e.err);
    });
  }
  request.send();

}

// Create a stereo panner
var panNode = audioCtx.createStereoPanner();
// Create volume control
var gainNode = audioCtx.createGain();
var myLoc = [40.7128, 74.0059];

//normalize min and max differences in location
var eastWestScale = d3.scaleLinear()
  .range([-1, 1])
  .domain([-0.2, 0.2])
  .clamp(true);

var northSouthScale = d3.scaleLinear()
  .range([0, 1])
  .domain([-0.2, 0.2])
  .clamp(true);

d3.csv("data/nyc-mvc-oneDayMarch.csv", function(data) {
  console.log(data);

  // PLAY / PAUSE --------------------------------
  var canPlay = false;

  function pause() {
    canPlay = false;
  }

  function play() {
    canPlay = true;
    crashPlayer();
  }
  //
  d3.select('div#play').on('click', play);
  d3.select('div#pause').on('click', pause);

  // NORTH/SOUTH    --------------------------------

  var northSpeakers = false; // make this dynamic based on a button


  // CLOCK        --------------------------------

  //select clock
  var clock = d3.select('h1#clock');
  var date = d3.select('span#date');

  //recursive loop
  var loopTime = 0,        // loop index (iterates until time up)
      i = 0,               // data index (only iterates on hits)
      dura = 100;          // assign this to a time

  date.text(' '+data[i].DATE);

  function crashPlayer() {           //  create a loop function
     setTimeout(function () {    //  call setTimeout when the loop is called

      // get clock display values from data
      var ampm = 'am';
      var hr = Math.floor(loopTime/60);
      if (hr>=12) { hr=hr%12; ampm = 'pm'; };
      if (hr<10) { hr='0'+hr; }
      if (hr<1) { hr=12; }
      var min = loopTime%60;
      if (min<10) { min='0'+min; }

      // display clock values
      clock.html(hr+':'+min+'<span id="ampm">'+ampm+'</span>');


       if (loopTime==data[i].TIME) {

         var w = 0;
         var t;

         console.log(data[i].TIME);
         t = parseFloat(data[i].TIME);

         lat = data[i].LATITUDE;
         lng = data[i].LONGITUDE;

         diffX = parseFloat(lng)+parseFloat(myLoc[1]);
         diffY = parseFloat(lat)-parseFloat(myLoc[0]);

        // volume range works well with 0-10 values
         var volScale = 20,
             northVol = northSouthScale(diffY)*volScale,
             southVol = (1-northVol)*volScale;

         //adjust the panner
         if (!isNaN(diffX)) {
          console.log('northVol: '+northVol);
          panNode.pan.value = eastWestScale(diffX);
          if (northSpeakers) {
            gainNode.gain.value = northVol;
          } else {
            gainNode.gain.value = southVol;
          }

           //play a Sound
           getData();
           source.connect(panNode);
           panNode.connect(gainNode);
           gainNode.connect(audioCtx.destination);
           source.start(0);
         }

         w++;
         i++;

     }

      if (i<data.length) {
        // check for simultaneous crashes
        if(loopTime==data[i].TIME) {
          // if simultaneous, short duration between recurse
          dura = 20;
        } else {
          // if not simultaneous, full duration between recurse
          dura = 120;
          loopTime++;
        }
      }

      // recursive loop call
      if (loopTime<1440 && canPlay) {
           crashPlayer();
      }
    }, dura)
  }

});
