// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./mod.d.ts" />
var e="function"==typeof Object.defineProperty?Object.defineProperty:null;var r=Object.defineProperty;function i(e){return"number"==typeof e}function t(e){var r,i="";for(r=0;r<e;r++)i+="0";return i}function a(e,r,i){var a=!1,n=r-e.length;return n<0||(function(e){return"-"===e[0]}(e)&&(a=!0,e=e.substr(1)),e=i?e+t(n):t(n)+e,a&&(e="-"+e)),e}var n=String.prototype.toLowerCase,o=String.prototype.toUpperCase;function s(e){var r,t,s;switch(e.specifier){case"b":r=2;break;case"o":r=8;break;case"x":case"X":r=16;break;default:r=10}if(t=e.arg,s=parseInt(t,10),!isFinite(s)){if(!i(t))throw new Error("invalid integer. Value: "+t);s=0}return s<0&&("u"===e.specifier||10!==r)&&(s=4294967295+s+1),s<0?(t=(-s).toString(r),e.precision&&(t=a(t,e.precision,e.padRight)),t="-"+t):(t=s.toString(r),s||e.precision?e.precision&&(t=a(t,e.precision,e.padRight)):t="",e.sign&&(t=e.sign+t)),16===r&&(e.alternate&&(t="0x"+t),t=e.specifier===o.call(e.specifier)?o.call(t):n.call(t)),8===r&&e.alternate&&"0"!==t.charAt(0)&&(t="0"+t),t}function c(e){return"string"==typeof e}var p=Math.abs,l=String.prototype.toLowerCase,u=String.prototype.toUpperCase,f=String.prototype.replace,g=/e\+(\d)$/,d=/e-(\d)$/,h=/^(\d+)$/,w=/^(\d+)e/,b=/\.0$/,v=/\.0*e/,y=/(\..*[^0])0*e/;function m(e){var r,t,a=parseFloat(e.arg);if(!isFinite(a)){if(!i(e.arg))throw new Error("invalid floating-point number. Value: "+t);a=e.arg}switch(e.specifier){case"e":case"E":t=a.toExponential(e.precision);break;case"f":case"F":t=a.toFixed(e.precision);break;case"g":case"G":p(a)<1e-4?((r=e.precision)>0&&(r-=1),t=a.toExponential(r)):t=a.toPrecision(e.precision),e.alternate||(t=f.call(t,y,"$1e"),t=f.call(t,v,"e"),t=f.call(t,b,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return t=f.call(t,g,"e+0$1"),t=f.call(t,d,"e-0$1"),e.alternate&&(t=f.call(t,h,"$1."),t=f.call(t,w,"$1.e")),a>=0&&e.sign&&(t=e.sign+t),t=e.specifier===u.call(e.specifier)?u.call(t):l.call(t)}function k(e){var r,i="";for(r=0;r<e;r++)i+=" ";return i}function x(e,r,i){var t=r-e.length;return t<0?e:e=i?e+k(t):k(t)+e}var E=String.fromCharCode,S=isNaN,_=Array.isArray;function V(e){var r={};return r.specifier=e.specifier,r.precision=void 0===e.precision?1:e.precision,r.width=e.width,r.flags=e.flags||"",r.mapping=e.mapping,r}function $(e){var r,i,t,n,o,p,l,u,f;if(!_(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(p="",l=1,u=0;u<e.length;u++)if(c(t=e[u]))p+=t;else{if(r=void 0!==t.precision,!(t=V(t)).specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+u+"`. Value: `"+t+"`.");for(t.mapping&&(l=t.mapping),i=t.flags,f=0;f<i.length;f++)switch(n=i.charAt(f)){case" ":t.sign=" ";break;case"+":t.sign="+";break;case"-":t.padRight=!0,t.padZeros=!1;break;case"0":t.padZeros=i.indexOf("-")<0;break;case"#":t.alternate=!0;break;default:throw new Error("invalid flag: "+n)}if("*"===t.width){if(t.width=parseInt(arguments[l],10),l+=1,S(t.width))throw new TypeError("the argument for * width at position "+l+" is not a number. Value: `"+t.width+"`.");t.width<0&&(t.padRight=!0,t.width=-t.width)}if(r&&"*"===t.precision){if(t.precision=parseInt(arguments[l],10),l+=1,S(t.precision))throw new TypeError("the argument for * precision at position "+l+" is not a number. Value: `"+t.precision+"`.");t.precision<0&&(t.precision=1,r=!1)}switch(t.arg=arguments[l],t.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":r&&(t.padZeros=!1),t.arg=s(t);break;case"s":t.maxWidth=r?t.precision:-1;break;case"c":if(!S(t.arg)){if((o=parseInt(t.arg,10))<0||o>127)throw new Error("invalid character code. Value: "+t.arg);t.arg=S(o)?String(t.arg):E(o)}break;case"e":case"E":case"f":case"F":case"g":case"G":r||(t.precision=6),t.arg=m(t);break;default:throw new Error("invalid specifier: "+t.specifier)}t.maxWidth>=0&&t.arg.length>t.maxWidth&&(t.arg=t.arg.substring(0,t.maxWidth)),t.padZeros?t.arg=a(t.arg,t.width||t.precision,t.padRight):t.width&&(t.arg=x(t.arg,t.width,t.padRight)),p+=t.arg||"",l+=1}return p}var F=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function T(e){var r={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return"."===e[4]&&void 0===e[5]&&(r.precision="1"),r}function I(e){var r,i,t,a;for(i=[],a=0,t=F.exec(e);t;)(r=e.slice(a,F.lastIndex-t[0].length)).length&&i.push(r),i.push(T(t)),a=F.lastIndex,t=F.exec(e);return(r=e.slice(a)).length&&i.push(r),i}function j(e){return"string"==typeof e}function A(e){var r,i;if(!j(e))throw new TypeError(A("invalid argument. First argument must be a string. Value: `%s`.",e));for(r=[I(e)],i=1;i<arguments.length;i++)r.push(arguments[i]);return $.apply(null,r)}var C=Object.prototype,R=C.toString,N=C.__defineGetter__,O=C.__defineSetter__,Z=C.__lookupGetter__,P=C.__lookupSetter__;var W=function(){try{return e({},"x",{}),!0}catch(e){return!1}}()?r:function(e,r,i){var t,a,n,o;if("object"!=typeof e||null===e||"[object Array]"===R.call(e))throw new TypeError(A("invalid argument. First argument must be an object. Value: `%s`.",e));if("object"!=typeof i||null===i||"[object Array]"===R.call(i))throw new TypeError(A("invalid argument. Property descriptor must be an object. Value: `%s`.",i));if((a="value"in i)&&(Z.call(e,r)||P.call(e,r)?(t=e.__proto__,e.__proto__=C,delete e[r],e[r]=i.value,e.__proto__=t):e[r]=i.value),n="get"in i,o="set"in i,a&&(n||o))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return n&&N&&N.call(e,r,i.get),o&&O&&O.call(e,r,i.set),e};function G(e,r,i){W(e,r,{configurable:!1,enumerable:!1,writable:!1,value:i})}function L(e){return"number"==typeof e}var U="function"==typeof Symbol&&"symbol"==typeof Symbol("foo");function X(){return U&&"symbol"==typeof Symbol.toStringTag}var M=Object.prototype.toString;var z=Object.prototype.hasOwnProperty;var q="function"==typeof Symbol?Symbol:void 0,B="function"==typeof q?q.toStringTag:"";var D=X()?function(e){var r,i,t,a,n;if(null==e)return M.call(e);i=e[B],n=B,r=null!=(a=e)&&z.call(a,n);try{e[B]=void 0}catch(r){return M.call(e)}return t=M.call(e),r?e[B]=i:delete e[B],t}:function(e){return M.call(e)},H=Number,J=H.prototype.toString;var K=X();function Q(e){return"object"==typeof e&&(e instanceof H||(K?function(e){try{return J.call(e),!0}catch(e){return!1}}(e):"[object Number]"===D(e)))}function Y(e){return L(e)||Q(e)}function ee(e){return e!=e}function re(e){return"number"==typeof e}function ie(e){var r,i="";for(r=0;r<e;r++)i+="0";return i}function te(e,r,i){var t=!1,a=r-e.length;return a<0||(function(e){return"-"===e[0]}(e)&&(t=!0,e=e.substr(1)),e=i?e+ie(a):ie(a)+e,t&&(e="-"+e)),e}G(Y,"isPrimitive",L),G(Y,"isObject",Q);var ae=String.prototype.toLowerCase,ne=String.prototype.toUpperCase;function oe(e){var r,i,t;switch(e.specifier){case"b":r=2;break;case"o":r=8;break;case"x":case"X":r=16;break;default:r=10}if(i=e.arg,t=parseInt(i,10),!isFinite(t)){if(!re(i))throw new Error("invalid integer. Value: "+i);t=0}return t<0&&("u"===e.specifier||10!==r)&&(t=4294967295+t+1),t<0?(i=(-t).toString(r),e.precision&&(i=te(i,e.precision,e.padRight)),i="-"+i):(i=t.toString(r),t||e.precision?e.precision&&(i=te(i,e.precision,e.padRight)):i="",e.sign&&(i=e.sign+i)),16===r&&(e.alternate&&(i="0x"+i),i=e.specifier===ne.call(e.specifier)?ne.call(i):ae.call(i)),8===r&&e.alternate&&"0"!==i.charAt(0)&&(i="0"+i),i}function se(e){return"string"==typeof e}var ce=Math.abs,pe=String.prototype.toLowerCase,le=String.prototype.toUpperCase,ue=String.prototype.replace,fe=/e\+(\d)$/,ge=/e-(\d)$/,de=/^(\d+)$/,he=/^(\d+)e/,we=/\.0$/,be=/\.0*e/,ve=/(\..*[^0])0*e/;function ye(e){var r,i,t=parseFloat(e.arg);if(!isFinite(t)){if(!re(e.arg))throw new Error("invalid floating-point number. Value: "+i);t=e.arg}switch(e.specifier){case"e":case"E":i=t.toExponential(e.precision);break;case"f":case"F":i=t.toFixed(e.precision);break;case"g":case"G":ce(t)<1e-4?((r=e.precision)>0&&(r-=1),i=t.toExponential(r)):i=t.toPrecision(e.precision),e.alternate||(i=ue.call(i,ve,"$1e"),i=ue.call(i,be,"e"),i=ue.call(i,we,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return i=ue.call(i,fe,"e+0$1"),i=ue.call(i,ge,"e-0$1"),e.alternate&&(i=ue.call(i,de,"$1."),i=ue.call(i,he,"$1.e")),t>=0&&e.sign&&(i=e.sign+i),i=e.specifier===le.call(e.specifier)?le.call(i):pe.call(i)}function me(e){var r,i="";for(r=0;r<e;r++)i+=" ";return i}function ke(e,r,i){var t=r-e.length;return t<0?e:e=i?e+me(t):me(t)+e}var xe=String.fromCharCode,Ee=isNaN,Se=Array.isArray;function _e(e){var r={};return r.specifier=e.specifier,r.precision=void 0===e.precision?1:e.precision,r.width=e.width,r.flags=e.flags||"",r.mapping=e.mapping,r}function Ve(e){var r,i,t,a,n,o,s,c,p;if(!Se(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(o="",s=1,c=0;c<e.length;c++)if(se(t=e[c]))o+=t;else{if(r=void 0!==t.precision,!(t=_e(t)).specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+c+"`. Value: `"+t+"`.");for(t.mapping&&(s=t.mapping),i=t.flags,p=0;p<i.length;p++)switch(a=i.charAt(p)){case" ":t.sign=" ";break;case"+":t.sign="+";break;case"-":t.padRight=!0,t.padZeros=!1;break;case"0":t.padZeros=i.indexOf("-")<0;break;case"#":t.alternate=!0;break;default:throw new Error("invalid flag: "+a)}if("*"===t.width){if(t.width=parseInt(arguments[s],10),s+=1,Ee(t.width))throw new TypeError("the argument for * width at position "+s+" is not a number. Value: `"+t.width+"`.");t.width<0&&(t.padRight=!0,t.width=-t.width)}if(r&&"*"===t.precision){if(t.precision=parseInt(arguments[s],10),s+=1,Ee(t.precision))throw new TypeError("the argument for * precision at position "+s+" is not a number. Value: `"+t.precision+"`.");t.precision<0&&(t.precision=1,r=!1)}switch(t.arg=arguments[s],t.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":r&&(t.padZeros=!1),t.arg=oe(t);break;case"s":t.maxWidth=r?t.precision:-1;break;case"c":if(!Ee(t.arg)){if((n=parseInt(t.arg,10))<0||n>127)throw new Error("invalid character code. Value: "+t.arg);t.arg=Ee(n)?String(t.arg):xe(n)}break;case"e":case"E":case"f":case"F":case"g":case"G":r||(t.precision=6),t.arg=ye(t);break;default:throw new Error("invalid specifier: "+t.specifier)}t.maxWidth>=0&&t.arg.length>t.maxWidth&&(t.arg=t.arg.substring(0,t.maxWidth)),t.padZeros?t.arg=te(t.arg,t.width||t.precision,t.padRight):t.width&&(t.arg=ke(t.arg,t.width,t.padRight)),o+=t.arg||"",s+=1}return o}var $e=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function Fe(e){var r={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return"."===e[4]&&void 0===e[5]&&(r.precision="1"),r}function Te(e){var r,i,t,a;for(i=[],a=0,t=$e.exec(e);t;)(r=e.slice(a,$e.lastIndex-t[0].length)).length&&i.push(r),i.push(Fe(t)),a=$e.lastIndex,t=$e.exec(e);return(r=e.slice(a)).length&&i.push(r),i}function Ie(e){return"string"==typeof e}function je(e){var r,i,t;if(!Ie(e))throw new TypeError(je("invalid argument. First argument must be a string. Value: `%s`.",e));for(r=Te(e),(i=new Array(arguments.length))[0]=r,t=1;t<i.length;t++)i[t]=arguments[t];return Ve.apply(null,i)}function Ae(e){var r,i,t,a;if(t=0,a=0,arguments.length){if(!L(e))throw new TypeError(je("invalid argument. Must provide a number. Value: `%s`.",e));return i=e,o}return i=0,n;function n(e){return 0===arguments.length?0===a?null:1===a?ee(t)?NaN:0/i:t/(a-1)/i:(t+=(r=e-i)*(e-(i+=r/(a+=1))),a<2?ee(t)?NaN:0/i:t/(a-1)/i)}function o(e){return 0===arguments.length?0===a?null:t/a/i:(t+=(r=e-i)*r)/(a+=1)/i}}export{Ae as default};
//# sourceMappingURL=mod.js.map