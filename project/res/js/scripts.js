function whichDevice(){var b=navigator.userAgent.toLowerCase();var c=new Array("iphone os 5","ipad; cpu os 5","iphone","ipad","android 2","android","blackberry","palmos");for(var a in c){if(b.indexOf(c[a])>=0){return c[a];}}}function whichTransitionEvent(){var a;var c=document.createElement("fakeelement");var b={"transition":"transitionend","OTransition":"oTransitionEnd","MozTransition":"transitionend","WebkitTransition":"webkitTransitionEnd"};for(a in b){if(c.style[a]!==undefined){return b[a];}}}$(document).ready(function(){});