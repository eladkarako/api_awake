"use strict";
/*! NoSleep.js v0.9.0 - git.io/vfn01 - Rich Tibbett - MIT license */
(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define([], factory);
    else if(typeof exports === 'object')
        exports["NoSleep"] = factory();
    else
        root["NoSleep"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/     // The module cache
/******/     var installedModules = {};
/******/
/******/     // The require function
/******/     function __webpack_require__(moduleId) {
/******/
/******/         // Check if module is in cache
/******/         if(installedModules[moduleId]) {
/******/             return installedModules[moduleId].exports;
/******/         }
/******/         // Create a new module (and put it into the cache)
/******/         var module = installedModules[moduleId] = {
/******/             i: moduleId,
/******/             l: false,
/******/             exports: {}
/******/         };
/******/
/******/         // Execute the module function
/******/         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/         // Flag the module as loaded
/******/         module.l = true;
/******/
/******/         // Return the exports of the module
/******/         return module.exports;
/******/     }
/******/
/******/
/******/     // expose the modules object (__webpack_modules__)
/******/     __webpack_require__.m = modules;
/******/
/******/     // expose the module cache
/******/     __webpack_require__.c = installedModules;
/******/
/******/     // define getter function for harmony exports
/******/     __webpack_require__.d = function(exports, name, getter) {
/******/         if(!__webpack_require__.o(exports, name)) {
/******/             Object.defineProperty(exports, name, {
/******/                 configurable: false,
/******/                 enumerable: true,
/******/                 get: getter
/******/             });
/******/         }
/******/     };
/******/
/******/     // getDefaultExport function for compatibility with non-harmony modules
/******/     __webpack_require__.n = function(module) {
/******/         var getter = module && module.__esModule ?
/******/             function getDefault() { return module['default']; } :
/******/             function getModuleExports() { return module; };
/******/         __webpack_require__.d(getter, 'a', getter);
/******/         return getter;
/******/     };
/******/
/******/     // Object.prototype.hasOwnProperty.call
/******/     __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/     // __webpack_public_path__
/******/     __webpack_require__.p = "";
/******/
/******/     // Load entry module and return exports
/******/     return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(1),
    webm = _require.webm,
    mp4 = _require.mp4;

// Detect iOS browsers < version 10


var oldIOS = typeof navigator !== 'undefined' && parseFloat(('' + (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', '')) < 10 && !window.MSStream;

var NoSleep = function () {
  function NoSleep() {
    var _this = this;

    _classCallCheck(this, NoSleep);

    if (oldIOS) {
      this.noSleepTimer = null;
    } else {
      // Set up no sleep video element
      this.noSleepVideo = document.createElement('video');

      this.noSleepVideo.setAttribute('muted', '');
      this.noSleepVideo.setAttribute('title', 'No Sleep');
      this.noSleepVideo.setAttribute('playsinline', '');

      this._addSourceToVideo(this.noSleepVideo, 'webm', webm);
      this._addSourceToVideo(this.noSleepVideo, 'mp4', mp4);

      this.noSleepVideo.addEventListener('loadedmetadata', function () {
//        if (_this.noSleepVideo.duration <= 1) {
//          // webm source
//          _this.noSleepVideo.setAttribute('loop', '');
//        } else {
//          // mp4 source
          _this.noSleepVideo.addEventListener('timeupdate', function () {
            if (_this.noSleepVideo.currentTime > 0.5) {
              _this.noSleepVideo.currentTime = Math.random();
            }
          });
//        }
      });
    }
  }

  _createClass(NoSleep, [{
    key: '_addSourceToVideo',
    value: function _addSourceToVideo(element, type, dataURI) {
      var source = document.createElement('source');
      source.src = dataURI;
      source.type = 'video/' + type;
      element.appendChild(source);
    }
  }, {
    key: 'enable',
    value: function enable() {
      if (oldIOS) {
        this.disable();
        console.warn('\n        NoSleep enabled for older iOS devices. This can interrupt\n        active or long-running network requests from completing successfully.\n        See https://github.com/richtr/NoSleep.js/issues/15 for more details.\n      ');
        this.noSleepTimer = window.setInterval(function () {
          if (!document.hidden) {
            window.location.href = window.location.href.split('#')[0];
            window.setTimeout(window.stop, 0);
          }
        }, 15000);
      } else {
        this.noSleepVideo.play();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      if (oldIOS) {
        if (this.noSleepTimer) {
          console.warn('\n          NoSleep now disabled for older iOS devices.\n        ');
          window.clearInterval(this.noSleepTimer);
          this.noSleepTimer = null;
        }
      } else {
        this.noSleepVideo.pause();
      }
    }
  }]);

  return NoSleep;
}();

;

module.exports = NoSleep;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  webm: "data:video/webm;base64,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"
 ,mp4:  "data:video/mp4;base64,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wAAAAAhBm6A/OcB4wAAAAAhBm8A/OcB4wAAAAAhBm+A/OcB4wAAAAAhBmgA/OcB4wAAAAAhBmiA/OcB4wAAAAAhBmkA/OcB4wAAAAAhBmmA/OcB4wAAAAAhBmoA/OcB4wAAAAAhBmqA/OcB4wAAAAAhBmsA/OcB4wAAAAAhBmuA/OcB4wAAAAAhBmwA/OcB4wAAAAAhBmyA/OcB4wAAAAAhBm0A/OcB4wAAAAAhBm2A/OcB4wAAAAAhBm4A/OcB4wAAAAAhBm6A/OcB4wAAAAAhBm8A/OcB4wAAAAAhBm+A/OcB4wAAAAAhBmgA/OcB4wAAAAAhBmiA/OcB4wAAAAAhBmkA/OcB4wAAAAAhBmmA/OcB4wAAAAAhBmoA/OcB4wAAAAAhBmqA/OcB4wAAAAAhBmsA/OcB4wAAAAAhBmuA/OcB4wAAAAAhBmwA/OcB4wAAAAAhBmyA/OcB4wAAAAAhBm0A/OcB4wAAAAAhBm2A/OcB4wAAAAAhBm4A/OcB4wAAAAAhBm6A/OcB4wAAAAAhBm8A/OcB4wAAAAAhBm+A/OcB4wAAAAAhBmgA/OcB4wAAAAAhBmiA/OcB4wAAAAAhBmkA/OcB4wAAAAAhBmmA/OcB4wAAAAAhBmoA/OcB4wAAAAAhBmqA/OcB4wAAAAAhBmsA/OcB4wAAAAAhBmuA/OcB4wAAAAAhBmwA/OcB4wAAAAAhBmyA/OcB4wAAAAAhBm0A/OcB4wAAAAAhBm2A/OcB4wAAAAAhBm4A/OcB4wAAAAAhBm6A/OcB4wAAAAAhBm8A/OcB4wAAAAAhBm+A/OcB4wAAAAAhBmgA/OcB4wAAAAAhBmiA/OcB4wAAAAAhBmkA/OcB4wAAAAAhBmmA/OcB4wAAAAAhBmoA/OcB4wAAAAAhBmqA/OcB4wAAAAAhBmsA/OcB4wAAAAAhBmuA/OcB4wAAAAAhBmwA/OcB4wAAAAAhBmyA/OcB4wAAAAAhBm0A/OcB4wAAAAAhBm2A/OcB4wAAAAAhBm4A/OcB4wAAAAAhBm6A/OcB4wAAAAAhBm8A/OcB4wAAAAAhBm+A/OcB4wAAAAAhBmgA/OcB4wAAAAAhBmiA/OcB4wAAAAAhBmkA/OcB4wAAAAAhBmmA/OcB4wAAAAAhBmoA/OcB4wAAAAAhBmqA/OcB4wAAAAAhBmsA/OcB4wAAAAAhBmuA/OcB4wAAAAAhBmwA/OcB4wAAAAAhBmyA/OcB4wAAAAAhBm0A7OcB4wAAAAAhBm2A7OcB4wAAAAAhBm4A3OcB4wA=="
};

/***/ })
/******/ ]);
});



















var nosleep = new NoSleep();



var screen_lock;




function fullscreen_on(element){
  var f,result;
  element = ("undefined" === typeof element) ? self.document.documentElement : element;
  f = false
      ||element.requestFullscreen
      ||element.msRequestFullscreen
      ||element.mozRequestFullScreen
      ||element.webkitRequestFullscreen;
  if("function" !== typeof f) return;
  result = f.call(element);                 //since the function is disattached we need to supply a 'this' using '.call' :    https://www.reddit.com/r/learnjavascript/comments/6tdsqf/why_does_assigning_any_of_the_requestfullscreen/dljzs9m/

  result.then(function(){     console.log("fullscreen is on, success.");                          })
        .catch(function(err){ console.log("fullscreen is still off due to an error.",err);        })
        ;
}


function fullscreen_off(){
  var f,result;
  var f = false
          ||self.document.exitFullscreen
          ||self.document.msExitFullscreen
          ||self.document.mozCancelFullScreen
          ||self.document.webkitExitFullscreen;
  if("function" !== typeof f) return;
  result = f.call(self.document);        //since the function is disattached we need to supply a 'this' using '.call' :    https://www.reddit.com/r/learnjavascript/comments/6tdsqf/why_does_assigning_any_of_the_requestfullscreen/dljzs9m/

  result.then(function(){     console.log("fullscreen is off, success.");                         })
        .catch(function(err){ console.log("fullscreen is on off due to an error.",err);           })
        ;
}


function is_fullscreen_on(){
  return null !== (false
                  ||document.fullscreenElement
                  ||document.msFullscreenElement
                  ||document.mozFullScreenElement
                  ||document.webkitFullscreenElement
                  ||null);
}


function toggle_fullscreen(){
  if(false === is_fullscreen_on()){
    console.log("is not in fullscreen, turning on.");
    nosleep.enable();
    if("undefined" !== typeof window.navigator.requestWakeLock){ try{ screen_lock = window.navigator.requestWakeLock("screen");}catch(err){} }    //trying to keep screen-ON using: https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Wake_Lock_API
    fullscreen_on(undefined);
  }
  else{
    console.log("is in fullscreen, turning off.");
    nosleep.disable();
    if("undefined" !== typeof window.navigator.requestWakeLock){ try{ screen_lock.unlock(); }catch(err){} }
    fullscreen_off();
  }
}


function fullscreen_change_handler(ev){
  if(true === is_fullscreen_on()){
    document.title = "on"
  }
  else{
    document.title = "off"
  }
}

//-----------------------------------------------------------------------------program start.


var fullscreen_enabled = false
                        ||self.document.fullscreenEnabled
                        ||self.document.msFullscreenEnabled
                        ||self.document.mozFullScreenEnabled
                        ||self.document.webkitFullscreenEnabled
                        ;

if(true === fullscreen_enabled){  //https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreenEnabled

  document.querySelector("body").ondblclick  = function(ev){  //double-click on the document.
                                                toggle_fullscreen();
                                              };
}
else{
  console.error("no support for fullscreen-API.");
}


document.onfullscreenchange = fullscreen_change_handler;


/*
//re-calibrate the red-dot borders. CSS-orientation with '@media (orientation:portrait){ / @media (orientation:landscape){' not-always handles it properly after the page has finished loading.
self.addEventListener("orientationchange",function(){          //"resize" is another option for older browsers.         can query the current state using screen.orientation.angle 0=portrait, -90=landscape rotated to the right, 90=landscape rotated to the left.
  self.location.reload(false);
});
*/



document.querySelector("[id=button]").onmousedown  = function(){     toggle_fullscreen();  }