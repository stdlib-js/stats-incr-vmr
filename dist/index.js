"use strict";var m=function(n,e){return function(){try{return e||n((e={exports:{}}).exports,e),e.exports}catch(r){throw (e=0, r)}};};var f=m(function(p,s){
var o=require('@stdlib/assert-is-number/dist').isPrimitive,a=require('@stdlib/math-base-assert-is-nan/dist'),c=require('@stdlib/error-tools-fmtprodmsg/dist');function g(n){var e,r,t,u;if(t=0,u=0,arguments.length){if(!o(n))throw new TypeError(c('1K59X',n));return r=n,v}return r=0,l;function l(i){return arguments.length===0?u===0?null:u===1?a(t)?NaN:0/r:t/(u-1)/r:(u+=1,e=i-r,r+=e/u,t+=e*(i-r),u<2?a(t)?NaN:0/r:t/(u-1)/r)}function v(i){return arguments.length===0?u===0?null:t/u/r:(u+=1,e=i-r,t+=e*e,t/u/r)}}s.exports=g
});var N=f();module.exports=N;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
