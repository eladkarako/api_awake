"use strict";
var fullscreen = {};

fullscreen.on = function(target){
                  var vendor_function, result;
                  
                  target = (target instanceof HTMLElement) ? target : self.document.documentElement;
                  
                  vendor_function = target.requestFullscreen
                                 || target.msRequestFullscreen
                                 || target.mozRequestFullScreen
                                 || target.webkitRequestFullscreen
                                 ;

                  if("function" !== typeof vendor_function) return;
                  
                  result = vendor_function.call(target);  //a special way of executing, that also provides 'this' context.  https://www.reddit.com/r/learnjavascript/comments/6tdsqf/why_does_assigning_any_of_the_requestfullscreen/dljzs9m/
                  
                  result.then(function(){     console.log("fullscreen is on, success.");                          })
                        .catch(function(err){ console.log("fullscreen is still off due to an error.",err);        })
                        ;
                };

fullscreen.off = function(){
                   var vendor_function, result;
                   vendor_function = self.document.exitFullscreen
                                  || self.document.msExitFullscreen
                                  || self.document.mozCancelFullScreen
                                  || self.document.webkitExitFullscreen
                                  ;

                  if("function" !== typeof vendor_function) return;

                  result = vendor_function.call(self.document);  //a special way of executing, that also provides 'this' context.  https://www.reddit.com/r/learnjavascript/comments/6tdsqf/why_does_assigning_any_of_the_requestfullscreen/dljzs9m/

                  result.then(function(){     console.log("fullscreen is off, success.");                         })
                        .catch(function(err){ console.log("fullscreen is on off due to an error.",err);           })
                  ;
                }


fullscreen.is_on  = function(){
                     return null !== ( document.fullscreenElement
                                    || document.msFullscreenElement
                                    || document.mozFullScreenElement
                                    || document.webkitFullscreenElement
                                    || null
                                    );
                    }



//use

document.onfullscreenchange = function(ev){
                                if(fullscreen.is_on())
                                  document.title = "fullscreen on";
                                else
                                  document.title = "fullscreen off";
                              };

document.documentElement.onmousedown = function(ev){  //double-click on the document.
                                         if(fullscreen.is_on()){
                                           fullscreen.off();
                                           console.log("fullscreen off");
                                         }else{
                                           fullscreen.on();
                                           console.log("fullscreen on");
                                         }
                                       };
