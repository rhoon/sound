function showShare(){d3.select("#shareLink").transition().style("opacity",0),d3.select("div#shareButtons").transition().style("right","1em")}function hideShare(){d3.select("#shareLink").transition().style("opacity",1),d3.select("div#shareButtons").transition().style("right","-4em")}function getData(){source=audioCtx.createBufferSource(),request=new XMLHttpRequest,console.log("FILEINDEX: "+fileIndex);var e=Math.ceil(5*Math.random())+fileSubset[fileIndex];fileIndex++,fileIndex>3&&(fileIndex=0),console.log("sounds/crash"+e+".mp3"),request.open("GET","sounds/crash"+e+".mp3",!0),request.responseType="arraybuffer",request.onload=function(){audioCtx.decodeAudioData(request.response,function(e){source.buffer=e,source.connect(audioCtx.destination)},function(e){console.log("Error connecting to audio file"+e.err)})},request.send()}var audioCtx=new(window.AudioContext||window.webkitAudioContext),myAudio=document.querySelector("audio"),pre=document.querySelector("pre"),myScript=document.querySelector("script");pre.innerHTML=myScript.innerHTML;var source,fileSubset=[0,5,10,15],fileIndex=0,panNode=audioCtx.createStereoPanner(),gainNode=audioCtx.createGain(),compressor=audioCtx.createDynamicsCompressor();compressor.threshold.value=-50,compressor.knee.value=40,compressor.ratio.value=3,compressor.reduction.value=-20,compressor.attack.value=0,compressor.release.value=.25;var myLoc=[40.7831,73.9712],eastWestScale=d3.scaleLinear().range([-1,1]).domain([-.2,.2]).clamp(!0),northSouthScale=d3.scaleLinear().range([0,1]).domain([-.2,.2]).clamp(!0);d3.csv("data/nyc-mvc-oneDayMarch.csv",function(e){function o(){s=!1,d3.select("div#container").transition().style("opacity",.05),d3.select("#playButton").style("display","block"),d3.select("#playButton").transition().style("opacity",1)}function t(){s=!0,d3.select("#playButton").transition().style("opacity",0).style("display","none"),d3.select("div#container").transition().style("opacity",1),a()}function n(){r=!r,console.log("NORTH: "+r)}function a(){setTimeout(function(){var o="am",t=Math.floor(l/60);t>=12&&(t%=12,o="pm"),t<10&&(t="0"+t),t<1&&(t=12);var n=l%60;if(n<10&&(n="0"+n),i.html(t+":"+n+'<span id="ampm">'+o+"</span>"),l==e[d].TIME){var r=0,c;console.log(e[d].TIME),c=parseFloat(e[d].TIME),lat=e[d].LATITUDE,lng=e[d].LONGITUDE,diffX=parseFloat(lng)+parseFloat(myLoc[1]),diffY=parseFloat(lat)-parseFloat(myLoc[0]),dist=Math.sqrt(Math.pow(diffX,2)+Math.pow(diffY,2)),console.log("DIFFX: "+diffX),console.log("DIFFY: "+diffY),console.log("DIST: "+dist);var p=200*l+125*d;console.log("TIME TOTAL: "+p);var f=10,m=1/(100*dist);isNaN(diffX)||(panNode.pan.value=eastWestScale(diffX),gainNode.gain.value=10*m,getData(),source.connect(gainNode),gainNode.connect(compressor),compressor.connect(panNode),panNode.connect(audioCtx.destination),source.start(0)),r++,d++}d<e.length&&(l==e[d].TIME?u=125:(u=200,l++)),l<1440&&s&&a()},u)}console.log(e);var s=!1;a(),d3.select(".play").on("click",t),d3.select(".pause").on("click",o);var r=!1,i=d3.select("h1#clock"),c=d3.selectAll("span#date"),l=0,d=0,u=100;c.text(" "+e[d].DATE)});