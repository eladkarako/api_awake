(function(){ "use strict";
  var video
     ,source
     ,api_awake
     ;

  video = document.createElement("video");
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("loop", "");   //not using 
  video.setAttribute("preload", "auto");
  video.setAttribute("title", "No Sleep");

  /* MP4 */
  source = document.createElement("source");
  source.type = "video/mp4";
  source.src =  "data:video/mp4;base64,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wAAAAAhBm6A/OcB4wAAAAAhBm8A/OcB4wAAAAAhBm+A/OcB4wAAAAAhBmgA/OcB4wAAAAAhBmiA/OcB4wAAAAAhBmkA/OcB4wAAAAAhBmmA/OcB4wAAAAAhBmoA/OcB4wAAAAAhBmqA/OcB4wAAAAAhBmsA/OcB4wAAAAAhBmuA/OcB4wAAAAAhBmwA/OcB4wAAAAAhBmyA/OcB4wAAAAAhBm0A/OcB4wAAAAAhBm2A/OcB4wAAAAAhBm4A/OcB4wAAAAAhBm6A/OcB4wAAAAAhBm8A/OcB4wAAAAAhBm+A/OcB4wAAAAAhBmgA/OcB4wAAAAAhBmiA/OcB4wAAAAAhBmkA/OcB4wAAAAAhBmmA/OcB4wAAAAAhBmoA/OcB4wAAAAAhBmqA/OcB4wAAAAAhBmsA/OcB4wAAAAAhBmuA/OcB4wAAAAAhBmwA/OcB4wAAAAAhBmyA/OcB4wAAAAAhBm0A/OcB4wAAAAAhBm2A/OcB4wAAAAAhBm4A/OcB4wAAAAAhBm6A/OcB4wAAAAAhBm8A/OcB4wAAAAAhBm+A/OcB4wAAAAAhBmgA/OcB4wAAAAAhBmiA/OcB4wAAAAAhBmkA/OcB4wAAAAAhBmmA/OcB4wAAAAAhBmoA/OcB4wAAAAAhBmqA/OcB4wAAAAAhBmsA/OcB4wAAAAAhBmuA/OcB4wAAAAAhBmwA/OcB4wAAAAAhBmyA/OcB4wAAAAAhBm0A/OcB4wAAAAAhBm2A/OcB4wAAAAAhBm4A/OcB4wAAAAAhBm6A/OcB4wAAAAAhBm8A/OcB4wAAAAAhBm+A/OcB4wAAAAAhBmgA/OcB4wAAAAAhBmiA/OcB4wAAAAAhBmkA/OcB4wAAAAAhBmmA/OcB4wAAAAAhBmoA/OcB4wAAAAAhBmqA/OcB4wAAAAAhBmsA/OcB4wAAAAAhBmuA/OcB4wAAAAAhBmwA/OcB4wAAAAAhBmyA/OcB4wAAAAAhBm0A/OcB4wAAAAAhBm2A/OcB4wAAAAAhBm4A/OcB4wAAAAAhBm6A/OcB4wAAAAAhBm8A/OcB4wAAAAAhBm+A/OcB4wAAAAAhBmgA/OcB4wAAAAAhBmiA/OcB4wAAAAAhBmkA/OcB4wAAAAAhBmmA/OcB4wAAAAAhBmoA/OcB4wAAAAAhBmqA/OcB4wAAAAAhBmsA/OcB4wAAAAAhBmuA/OcB4wAAAAAhBmwA/OcB4wAAAAAhBmyA/OcB4wAAAAAhBm0A7OcB4wAAAAAhBm2A7OcB4wAAAAAhBm4A3OcB4wA=="
  video.appendChild(source);

  /* WEBM */
  /*
  source = document.createElement("source");
  source.type = "video/webm";
  source.src = "data:video/webm;base64,GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA="
  video.appendChild(source);
  */
  video.addEventListener('loadedmetadata', function(){    //this is not working needs to bring previous version back...
    video.addEventListener("timeupdate", function(){
      if(video.currentTime > 3) 
        video.currentTime = Math.random();
    });
  });

  api_awake = {}
  api_awake.is_on = function(){  return (false === video.paused);  }
  api_awake.on    = function(){  video.play();                     }
  api_awake.off   = function(){  video.pause();                    }


  self.api_awake = api_awake;
}());
