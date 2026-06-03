"use strict";var m=function(n,u){return function(){return u||n((u={exports:{}}).exports,u),u.exports}};var f=m(function(p,s){
var o=require('@stdlib/assert-is-number/dist').isPrimitive,a=require('@stdlib/math-base-assert-is-nan/dist'),c=require('@stdlib/error-tools-fmtprodmsg/dist');function g(n){var u,r,t,e;if(t=0,e=0,arguments.length){if(!o(n))throw new TypeError(c('1K59X',n));return r=n,v}return r=0,l;function l(i){return arguments.length===0?e===0?null:e===1?a(t)?NaN:0/r:t/(e-1)/r:(e+=1,u=i-r,r+=u/e,t+=u*(i-r),e<2?a(t)?NaN:0/r:t/(e-1)/r)}function v(i){return arguments.length===0?e===0?null:t/e/r:(e+=1,u=i-r,t+=u*u,t/e/r)}}s.exports=g
});var N=f();module.exports=N;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
