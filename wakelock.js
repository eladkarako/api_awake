"use strict";
var wakelock = {};


//wake-lock by playing empty-video in the background (must be triggered with a user-click). ---relaying on work done in https://github.com/richtr/NoSleep.js - but modified, using better encoded resources and always 'manual-rewind' instead of using 'loop', also explicitly declare codecs.
wakelock.method1 = {};
wakelock.method1.on     = function(){};                 //dummy function (will be rewritten in 'init')
wakelock.method1.off    = function(){};                 //dummy function (will be rewritten in 'init')
wakelock.method1.is_on  = function(){return false;};    //dummy function (will be rewritten in 'init')
wakelock.method1.init   = function(){
                            var video, source;

                            video = document.createElement("video");
                            video.setAttribute("preload",     "auto");
                          //video.setAttribute("loop",        "true");
                            video.setAttribute("muted",       "true");
                            video.setAttribute("playsinline", "true");
                            video.setAttribute("title",   "No Sleep");

                            /* //no supported.
                            source      = document.createElement("source");
                            source.type = 'video/ogg;codecs="theora"';
                            source.src  = "data:video/ogg;base64,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";
                            video.appendChild(source);
                            */

                            source      = document.createElement("source");
                            source.type = 'video/webm;codecs="vp8.0"';
                            source.src  = "data:video/webm;base64,GkXfowEAAAAAAAAfQoaBAUL3gQFC8oEEQvOBCEKChHdlYm1Ch4ECQoWBAhhTgGcBAAAAAAAL9xFNm3RAO027i1OrhBVJqWZTrIHlTbuMU6uEFlSua1OsggEjTbuMU6uEElTDZ1OsggFrTbuMU6uEHFO7a1Osggva7AEAAAAAAACbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmAQAAAAAAADIq17GDD0JATYCNTGF2ZjU4LjI2LjEwMVdBjUxhdmY1OC4yNi4xMDFEiYhAp3AAAAAAABZUrmsBAAAAAAAAPK4BAAAAAAAAM9eBAXPFgQGcgQAitZyDdW5khoVWX1ZQOIOBASPjg4QCYloA4AEAAAAAAAAHsIIBQLqBtBJUw2cBAAAAAAAAv3NzAQAAAAAAAC5jwAEAAAAAAAAAZ8gBAAAAAAAAGkWjh0VOQ09ERVJEh41MYXZmNTguMjYuMTAxc3MBAAAAAAAAOWPAAQAAAAAAAARjxYEBZ8gBAAAAAAAAIUWjh0VOQ09ERVJEh5RMYXZjNTguNDcuMTAzIGxpYnZweHNzAQAAAAAAADpjwAEAAAAAAAAEY8WBAWfIAQAAAAAAACJFo4hEVVJBVElPTkSHlDAwOjAwOjAzLjAwMDAwMDAwMAAAH0O2dQEAAAAAAAmY54EAo0CjgQAAgNAPAJ0BKkABtAAARwiFhYiFhIgCAgJ1qgP4A/oCBrak9waBZJ9r25snOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnOHsnLgD+/W7z/+K1h1nF/4rf/9Nk8VeM/+mLAKOdgQAoALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEAUACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BAHgAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQCgALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEAyACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BAPAAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOcgQEYAJECAAEQEBRgAGFgv9AAIgAQzX61yT5WAKOdgQFAALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEBaACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BAZAAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQG4ALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEB4ACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BAggAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQIwALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYECWACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BAoAAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQKoALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnIEC0ACRAgABEBAUYABhYL/QACIAEM1+tck+VgCjnYEC+ACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BAyAAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQNIALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEDcACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BA5gAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQPAALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYED6ACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BBBAAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQQ4ALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEEYACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo5yBBIgAkQIAARAQFGAAYWC/0AAiABDNfrXJPlYAo52BBLAAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQTYALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEFAACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BBSgAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQVQALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEFeACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BBaAAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQXIALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEF8ACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BBhgAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOcgQZAAJECAAEQEBRgAGFgv9AAIgAQzX61yT5WAKOdgQZoALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEGkACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BBrgAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQbgALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEHCACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BBzAAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQdYALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEHgACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BB6gAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQfQALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnIEH+ACRAgABEBAUYABhYL/QACIAEM1+tck+VgCjnYEIIACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BCEgAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQhwALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEImACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BCMAAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQjoALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEJEACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BCTgAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQlgALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEJiACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo5yBCbAAkQIAARAQFGAAYWC/0AAiABDNfrXJPlYAo52BCdgAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQoAALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEKKACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BClAAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQp4ALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYEKoACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BCsgAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOdgQrwALECAAEQEAAYABhYL/QACIAEM1+tck+VgACjnYELGACxAgABEBAAGAAYWC/0AAiABDNfrXJPlYAAo52BC0AAsQIAARAQABgAGFgv9AAIgAQzX61yT5WAAKOcgQtoAJECAAEQEBRgAGFgv9AAIgAQzX61yT5WAKOdgQuQALECAAEQEAAYABhYL/QACIAEM1+tck+VgAAcU7trAQAAAAAAABG7j7OBALeK94EB8YICNvCBAw==";
                            video.appendChild(source);

                            source      = document.createElement("source");
                            source.type = 'video/webm;codecs="vp9.0"';
                            source.src  = "data:video/webm;base64,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";
                            video.appendChild(source);

                            source      = document.createElement("source");
                            source.type = 'video/mp4;codecs="avc1.42001E"';
                            source.src  = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAQ+bW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAC7gAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAA2h0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAC7gAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAUAAAAC0AAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAu4AAAAAAABAAAAAALgbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAAyAAAAlgBVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAACi21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAktzdGJsAAAAp3N0c2QAAAAAAAAAAQAAAJdhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAUAAtABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAMWF2Y0MBQsAe/+EAGWdCwB7ZAUGfnwEQAAADABAAAAMDIPFi5IABAAVoy4PEyAAAABBwYXNwAAAAAQAAAAEAAAAYc3R0cwAAAAAAAAABAAAASwAAAgAAAAAUc3RzcwAAAAAAAAABAAAAAQAAABxzdHNjAAAAAAAAAAEAAAABAAAASwAAAAEAAAFAc3RzegAAAAAAAAAAAAAASwAAA0cAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAABRzdGNvAAAAAAAAAAEAAARuAAAAYnVkdGEAAABabWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAtaWxzdAAAACWpdG9vAAAAHWRhdGEAAAABAAAAAExhdmY1OC4yNi4xMDEAAAAIZnJlZQAABsdtZGF0AAACcwYF//9v3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1NyByMjk2OSBkNDA5OWRkIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxOSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTAgcmVmPTMgZGVibG9jaz0xOi0zOi0zIGFuYWx5c2U9MHgxOjB4MTExIG1lPWhleCBzdWJtZT03IHBzeT0xIHBzeV9yZD0yLjAwOjAuNzAgbWl4ZWRfcmVmPTEgbWVfcmFuZ2U9MTYgY2hyb21hX21lPTEgdHJlbGxpcz0xIDh4OGRjdD0wIGNxbT0wIGRlYWR6b25lPTIxLDExIGZhc3RfcHNraXA9MSBjaHJvbWFfcXBfb2Zmc2V0PS00IHRocmVhZHM9NiBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTAgd2VpZ2h0cD0wIGtleWludD0yNTAga2V5aW50X21pbj0yNSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjMuMCBxY29tcD0wLjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgaXBfcmF0aW89MS40MCBhcT0xOjEuMjAAgAAAAMxliIQPznEYoAAm+xwABIpjgACWTJycnJycnJycnJycnJycnJycnJ11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111114AAAAIQZo4H5zgPGAAAAAIQZpUB+c4DxgAAAAIQZpgPznAeMAAAAAIQZqAPznAeMAAAAAIQZqgPznAeMAAAAAIQZrAPznAeMAAAAAIQZrgPznAeMAAAAAIQZsAPznAeMAAAAAIQZsgPznAeMAAAAAIQZtAPznAeMAAAAAIQZtgPznAeMAAAAAIQZuAPznAeMAAAAAIQZugPznAeMAAAAAIQZvAPznAeMAAAAAIQZvgPznAeMAAAAAIQZoAPznAeMAAAAAIQZogPznAeMAAAAAIQZpAPznAeMAAAAAIQZpgPznAeMAAAAAIQZqAPznAeMAAAAAIQZqgPznAeMAAAAAIQZrAPznAeMAAAAAIQZrgPznAeMAAAAAIQZsAPznAeMAAAAAIQZsgPznAeMAAAAAIQZtAPznAeMAAAAAIQZtgPznAeMAAAAAIQZuAPznAeMAAAAAIQZugPznAeMAAAAAIQZvAPznAeMAAAAAIQZvgPznAeMAAAAAIQZoAPznAeMAAAAAIQZogPznAeMAAAAAIQZpAPznAeMAAAAAIQZpgPznAeMAAAAAIQZqAPznAeMAAAAAIQZqgPznAeMAAAAAIQZrAPznAeMAAAAAIQZrgPznAeMAAAAAIQZsAPznAeMAAAAAIQZsgPznAeMAAAAAIQZtAPznAeMAAAAAIQZtgPznAeMAAAAAIQZuAPznAeMAAAAAIQZugPznAeMAAAAAIQZvAPznAeMAAAAAIQZvgPznAeMAAAAAIQZoAPznAeMAAAAAIQZogPznAeMAAAAAIQZpAPznAeMAAAAAIQZpgPznAeMAAAAAIQZqAPznAeMAAAAAIQZqgPznAeMAAAAAIQZrAPznAeMAAAAAIQZrgPznAeMAAAAAIQZsAPznAeMAAAAAIQZsgPznAeMAAAAAIQZtAPznAeMAAAAAIQZtgPznAeMAAAAAIQZuAPznAeMAAAAAIQZugPznAeMAAAAAIQZvAPznAeMAAAAAIQZvgPznAeMAAAAAIQZoAPznAeMAAAAAIQZogPznAeMAAAAAIQZpAPznAeMAAAAAIQZpgPznAeMAAAAAIQZqAPznAeMAAAAAIQZqgPznAeMAAAAAIQZrAPznAeMAAAAAIQZrgPznAeMAAAAAIQZsAOznAeMAAAAAIQZsgOznAeMAAAAAIQZtANznAeMA=";
                            video.appendChild(source);


                            video.addEventListener("loadedmetadata", function(){
                              video.addEventListener("timeupdate", function(){
                                if(video.currentTime > 2.5) video.currentTime = 0.150;
                              });
                            });

                            wakelock.method1.on    = function(){ video.play();                    };
                            wakelock.method1.off   = function(){ video.pause();                   };
                            wakelock.method1.is_on = function(){ return (false === video.paused); };

                            wakelock.method1._backend = {};
                            wakelock.method1._backend.video = video;
                          };




//wake-lock supported by Firefox-OS. does not required user-interaction.   ---https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Navigator/requestWakeLock
wakelock.method2 = {};
wakelock.method2.on    = function(){};                 //dummy function (will be rewritten in 'init')
wakelock.method2.off   = function(){};                 //dummy function (will be rewritten in 'init')
wakelock.method2.is_on = function(){return false;};    //dummy function (will be rewritten in 'init')
wakelock.method2.init  = function(){
                            var screen_lock = undefined;
                            wakelock.method2.on    = function(){    if("undefined" !== typeof window.navigator.requestWakeLock){ try{ screen_lock = window.navigator.requestWakeLock("screen");}catch(err){} }    };    //trying to keep screen-ON using: https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Wake_Lock_API
                            wakelock.method2.off   = function(){    if("undefined" !== typeof window.navigator.requestWakeLock){ try{ screen_lock.unlock(); }catch(err){} }                                       };
                            wakelock.method2.is_on = function(){    return (null!==screen_lock && undefined!==screen_lock)                                                                                        };

                            wakelock.method2._backend = {};
                            wakelock.method2._backend.screen_lock = screen_lock;
                         };




//wake-lock (newer then above) ---https://w3c.github.io/wake-lock/#examples
wakelock.method3 = {};
wakelock.method3.on    = function(){};                 //dummy function (will be rewritten in 'init')
wakelock.method3.off   = function(){};                 //dummy function (will be rewritten in 'init')
wakelock.method3.is_on = function(){return false;};    //dummy function (will be rewritten in 'init')
wakelock.method3.init  = function(){
                           var controller = undefined
                             , signal     = undefined
                             ;

                           wakelock.method3.on    = function(){
                                                      try{
                                                      controller = new AbortController();
                                                      signal     = controller.signal;
                                                      WakeLock.request("screen", { signal });
                                                      WakeLock.request("system", { signal });
                                                      }catch(err){}
                                                    };

                           wakelock.method3.off   = function(){
                                                      try{
                                                      controller.abort();
                                                      //controller = undefined; //not a good idea to 'zero-out' async handlers.
                                                      //signal     = undefined;
                                                      }catch(err){}
                                                    };

                           wakelock.method3.is_on = function(){
                                                      //first cases where the API is is not available.
                                                      if("undefined" === typeof WakeLock)        return false;
                                                      if("undefined" === typeof AbortController) return false;
                                                      //then cases where the variables 'controller'/'signal' are 'zero-out' (not initialized)
                                                      if(undefined === controller) return false;
                                                      if(undefined === signal)     return false;

                                                      return true;
                                                    }

                            wakelock.method3._backend = {};
                            wakelock.method3._backend.controller = controller;
                            wakelock.method3._backend.signal     = signal;
                         };





//------------------------------------------------------------------------------




//use: first needs to init to populate-variables that are 'stored in-the-same-context-of-the-functions'
wakelock.method1.init();  //video object
wakelock.method2.init();  //screen_lock
wakelock.method3.init();  //controller, signal


//use: triggered by a kind of a click.

var html = document.querySelector("html")

html.onmousedown = function(){
  if(wakelock.method1.is_on()
  || wakelock.method2.is_on()
  || wakelock.method3.is_on()){ //turn off
       wakelock.method1.off();
       wakelock.method2.off();
       wakelock.method3.off();
       document.title="stopped";
       html.setAttribute("isplaying","false");
  }
  else{                         //turn on
       wakelock.method1.on();
       wakelock.method2.on();
       wakelock.method3.on();
       document.title="playing";
       html.setAttribute("isplaying","true");
  }
}