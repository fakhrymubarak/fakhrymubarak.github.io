const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["js/HomePage-Ill13Fb5.js","js/chunk-BDipPQm_.js","js/chunk-3JDXIiR8.js","js/chunk-DomL0yj5.js","js/chunk-D8qEskI5.js"])))=>i.map(i=>d[i]);
var Sn=Object.defineProperty,An=Object.defineProperties;var Cn=Object.getOwnPropertyDescriptors;var Qe=Object.getOwnPropertySymbols;var _n=Object.prototype.hasOwnProperty,On=Object.prototype.propertyIsEnumerable;var ge=(e,t,n)=>t in e?Sn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,_=(e,t)=>{for(var n in t||(t={}))_n.call(t,n)&&ge(e,n,t[n]);if(Qe)for(var n of Qe(t))On.call(t,n)&&ge(e,n,t[n]);return e},N=(e,t)=>An(e,Cn(t));var Z=(e,t,n)=>ge(e,typeof t!="symbol"?t+"":t,n);var p=(e,t,n)=>new Promise((r,a)=>{var i=c=>{try{o(n.next(c))}catch(l){a(l)}},s=c=>{try{o(n.throw(c))}catch(l){a(l)}},o=c=>c.done?r(c.value):Promise.resolve(c.value).then(i,s);o((n=n.apply(e,t)).next())});import{r as kn,a as xn,g as X}from"../js/chunk-DomL0yj5.js";import{R as O,r as I,a as Dn,b as Rn,B as Pn}from"../js/chunk-3JDXIiR8.js";import{M as Mn,S as Nn,X as Ln,a as jn}from"../js/chunk-D8qEskI5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();var ye={exports:{}},W={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var et;function Bn(){if(et)return W;et=1;var e=kn(),t=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function s(o,c,l){var f,u={},d=null,m=null;l!==void 0&&(d=""+l),c.key!==void 0&&(d=""+c.key),c.ref!==void 0&&(m=c.ref);for(f in c)r.call(c,f)&&!i.hasOwnProperty(f)&&(u[f]=c[f]);if(o&&o.defaultProps)for(f in c=o.defaultProps,c)u[f]===void 0&&(u[f]=c[f]);return{$$typeof:t,type:o,key:d,ref:m,props:u,_owner:a.current}}return W.Fragment=n,W.jsx=s,W.jsxs=s,W}var tt;function $n(){return tt||(tt=1,ye.exports=Bn()),ye.exports}var g=$n(),Q={},nt;function Fn(){if(nt)return Q;nt=1;var e=xn();return Q.createRoot=e.createRoot,Q.hydrateRoot=e.hydrateRoot,Q}var Hn=Fn();const qn=X(Hn);var be={exports:{}},we,rt;function Un(){if(rt)return we;rt=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return we=e,we}var ve,at;function Vn(){if(at)return ve;at=1;var e=Un();function t(){}function n(){}return n.resetWarningCache=t,ve=function(){function r(s,o,c,l,f,u){if(u!==e){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}r.isRequired=r;function a(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:a,element:r,elementType:r,instanceOf:a,node:r,objectOf:a,oneOf:a,oneOfType:a,shape:a,exact:a,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},ve}var it;function zn(){return it||(it=1,be.exports=Vn()()),be.exports}var Wn=zn();const y=X(Wn);var Te,st;function Gn(){if(st)return Te;st=1;var e=typeof Element!="undefined",t=typeof Map=="function",n=typeof Set=="function",r=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function a(i,s){if(i===s)return!0;if(i&&s&&typeof i=="object"&&typeof s=="object"){if(i.constructor!==s.constructor)return!1;var o,c,l;if(Array.isArray(i)){if(o=i.length,o!=s.length)return!1;for(c=o;c--!==0;)if(!a(i[c],s[c]))return!1;return!0}var f;if(t&&i instanceof Map&&s instanceof Map){if(i.size!==s.size)return!1;for(f=i.entries();!(c=f.next()).done;)if(!s.has(c.value[0]))return!1;for(f=i.entries();!(c=f.next()).done;)if(!a(c.value[1],s.get(c.value[0])))return!1;return!0}if(n&&i instanceof Set&&s instanceof Set){if(i.size!==s.size)return!1;for(f=i.entries();!(c=f.next()).done;)if(!s.has(c.value[0]))return!1;return!0}if(r&&ArrayBuffer.isView(i)&&ArrayBuffer.isView(s)){if(o=i.length,o!=s.length)return!1;for(c=o;c--!==0;)if(i[c]!==s[c])return!1;return!0}if(i.constructor===RegExp)return i.source===s.source&&i.flags===s.flags;if(i.valueOf!==Object.prototype.valueOf&&typeof i.valueOf=="function"&&typeof s.valueOf=="function")return i.valueOf()===s.valueOf();if(i.toString!==Object.prototype.toString&&typeof i.toString=="function"&&typeof s.toString=="function")return i.toString()===s.toString();if(l=Object.keys(i),o=l.length,o!==Object.keys(s).length)return!1;for(c=o;c--!==0;)if(!Object.prototype.hasOwnProperty.call(s,l[c]))return!1;if(e&&i instanceof Element)return!1;for(c=o;c--!==0;)if(!((l[c]==="_owner"||l[c]==="__v"||l[c]==="__o")&&i.$$typeof)&&!a(i[l[c]],s[l[c]]))return!1;return!0}return i!==i&&s!==s}return Te=function(s,o){try{return a(s,o)}catch(c){if((c.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw c}},Te}var Kn=Gn();const Yn=X(Kn);var Ie,ot;function Jn(){if(ot)return Ie;ot=1;var e=function(t,n,r,a,i,s,o,c){if(!t){var l;if(n===void 0)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var f=[r,a,i,s,o,c],u=0;l=new Error(n.replace(/%s/g,function(){return f[u++]})),l.name="Invariant Violation"}throw l.framesToPop=1,l}};return Ie=e,Ie}var Xn=Jn();const ct=X(Xn);var Ee,lt;function Zn(){return lt||(lt=1,Ee=function(t,n,r,a){var i=r?r.call(a,t,n):void 0;if(i!==void 0)return!!i;if(t===n)return!0;if(typeof t!="object"||!t||typeof n!="object"||!n)return!1;var s=Object.keys(t),o=Object.keys(n);if(s.length!==o.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(n),l=0;l<s.length;l++){var f=s[l];if(!c(f))return!1;var u=t[f],d=n[f];if(i=r?r.call(a,u,d,f):void 0,i===!1||i===void 0&&u!==d)return!1}return!0}),Ee}var Qn=Zn();const er=X(Qn);function v(){return v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},v.apply(this,arguments)}function We(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,je(e,t)}function je(e,t){return je=Object.setPrototypeOf||function(n,r){return n.__proto__=r,n},je(e,t)}function ut(e,t){if(e==null)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(n=i[r])>=0||(a[n]=e[n]);return a}var h={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title",FRAGMENT:"Symbol(react.fragment)"},tr={rel:["amphtml","canonical","alternate"]},nr={type:["application/ld+json"]},rr={charset:"",name:["robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]},ft=Object.keys(h).map(function(e){return h[e]}),re={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},ar=Object.keys(re).reduce(function(e,t){return e[re[t]]=t,e},{}),V=function(e,t){for(var n=e.length-1;n>=0;n-=1){var r=e[n];if(Object.prototype.hasOwnProperty.call(r,t))return r[t]}return null},ir=function(e){var t=V(e,h.TITLE),n=V(e,"titleTemplate");if(Array.isArray(t)&&(t=t.join("")),n&&t)return n.replace(/%s/g,function(){return t});var r=V(e,"defaultTitle");return t||r||void 0},sr=function(e){return V(e,"onChangeClientState")||function(){}},Se=function(e,t){return t.filter(function(n){return n[e]!==void 0}).map(function(n){return n[e]}).reduce(function(n,r){return v({},n,r)},{})},or=function(e,t){return t.filter(function(n){return n[h.BASE]!==void 0}).map(function(n){return n[h.BASE]}).reverse().reduce(function(n,r){if(!n.length)for(var a=Object.keys(r),i=0;i<a.length;i+=1){var s=a[i].toLowerCase();if(e.indexOf(s)!==-1&&r[s])return n.concat(r)}return n},[])},G=function(e,t,n){var r={};return n.filter(function(a){return!!Array.isArray(a[e])||(a[e]!==void 0&&console&&typeof console.warn=="function"&&console.warn("Helmet: "+e+' should be of type "Array". Instead found type "'+typeof a[e]+'"'),!1)}).map(function(a){return a[e]}).reverse().reduce(function(a,i){var s={};i.filter(function(u){for(var d,m=Object.keys(u),w=0;w<m.length;w+=1){var T=m[w],C=T.toLowerCase();t.indexOf(C)===-1||d==="rel"&&u[d].toLowerCase()==="canonical"||C==="rel"&&u[C].toLowerCase()==="stylesheet"||(d=C),t.indexOf(T)===-1||T!=="innerHTML"&&T!=="cssText"&&T!=="itemprop"||(d=T)}if(!d||!u[d])return!1;var M=u[d].toLowerCase();return r[d]||(r[d]={}),s[d]||(s[d]={}),!r[d][M]&&(s[d][M]=!0,!0)}).reverse().forEach(function(u){return a.push(u)});for(var o=Object.keys(s),c=0;c<o.length;c+=1){var l=o[c],f=v({},r[l],s[l]);r[l]=f}return a},[]).reverse()},cr=function(e,t){if(Array.isArray(e)&&e.length){for(var n=0;n<e.length;n+=1)if(e[n][t])return!0}return!1},Lt=function(e){return Array.isArray(e)?e.join(""):e},Ae=function(e,t){return Array.isArray(e)?e.reduce(function(n,r){return function(a,i){for(var s=Object.keys(a),o=0;o<s.length;o+=1)if(i[s[o]]&&i[s[o]].includes(a[s[o]]))return!0;return!1}(r,t)?n.priority.push(r):n.default.push(r),n},{priority:[],default:[]}):{default:e}},dt=function(e,t){var n;return v({},e,((n={})[t]=void 0,n))},lr=[h.NOSCRIPT,h.SCRIPT,h.STYLE],Ce=function(e,t){return t===void 0&&(t=!0),t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},ht=function(e){return Object.keys(e).reduce(function(t,n){var r=e[n]!==void 0?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r},"")},pt=function(e,t){return t===void 0&&(t={}),Object.keys(e).reduce(function(n,r){return n[re[r]||r]=e[r],n},t)},te=function(e,t){return t.map(function(n,r){var a,i=((a={key:r})["data-rh"]=!0,a);return Object.keys(n).forEach(function(s){var o=re[s]||s;o==="innerHTML"||o==="cssText"?i.dangerouslySetInnerHTML={__html:n.innerHTML||n.cssText}:i[o]=n[s]}),O.createElement(e,i)})},A=function(e,t,n){switch(e){case h.TITLE:return{toComponent:function(){return a=t.titleAttributes,(i={key:r=t.title})["data-rh"]=!0,s=pt(a,i),[O.createElement(h.TITLE,s,r)];var r,a,i,s},toString:function(){return function(r,a,i,s){var o=ht(i),c=Lt(a);return o?"<"+r+' data-rh="true" '+o+">"+Ce(c,s)+"</"+r+">":"<"+r+' data-rh="true">'+Ce(c,s)+"</"+r+">"}(e,t.title,t.titleAttributes,n)}};case"bodyAttributes":case"htmlAttributes":return{toComponent:function(){return pt(t)},toString:function(){return ht(t)}};default:return{toComponent:function(){return te(e,t)},toString:function(){return function(r,a,i){return a.reduce(function(s,o){var c=Object.keys(o).filter(function(u){return!(u==="innerHTML"||u==="cssText")}).reduce(function(u,d){var m=o[d]===void 0?d:d+'="'+Ce(o[d],i)+'"';return u?u+" "+m:m},""),l=o.innerHTML||o.cssText||"",f=lr.indexOf(r)===-1;return s+"<"+r+' data-rh="true" '+c+(f?"/>":">"+l+"</"+r+">")},"")}(e,t,n)}}}},Be=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,a=e.htmlAttributes,i=e.noscriptTags,s=e.styleTags,o=e.title,c=o===void 0?"":o,l=e.titleAttributes,f=e.linkTags,u=e.metaTags,d=e.scriptTags,m={toComponent:function(){},toString:function(){return""}};if(e.prioritizeSeoTags){var w=function(T){var C=T.linkTags,M=T.scriptTags,z=T.encode,he=Ae(T.metaTags,rr),pe=Ae(C,tr),me=Ae(M,nr);return{priorityMethods:{toComponent:function(){return[].concat(te(h.META,he.priority),te(h.LINK,pe.priority),te(h.SCRIPT,me.priority))},toString:function(){return A(h.META,he.priority,z)+" "+A(h.LINK,pe.priority,z)+" "+A(h.SCRIPT,me.priority,z)}},metaTags:he.default,linkTags:pe.default,scriptTags:me.default}}(e);m=w.priorityMethods,f=w.linkTags,u=w.metaTags,d=w.scriptTags}return{priority:m,base:A(h.BASE,t,r),bodyAttributes:A("bodyAttributes",n,r),htmlAttributes:A("htmlAttributes",a,r),link:A(h.LINK,f,r),meta:A(h.META,u,r),noscript:A(h.NOSCRIPT,i,r),script:A(h.SCRIPT,d,r),style:A(h.STYLE,s,r),title:A(h.TITLE,{title:c,titleAttributes:l},r)}},ee=[],$e=function(e,t){var n=this;t===void 0&&(t=typeof document!="undefined"),this.instances=[],this.value={setHelmet:function(r){n.context.helmet=r},helmetInstances:{get:function(){return n.canUseDOM?ee:n.instances},add:function(r){(n.canUseDOM?ee:n.instances).push(r)},remove:function(r){var a=(n.canUseDOM?ee:n.instances).indexOf(r);(n.canUseDOM?ee:n.instances).splice(a,1)}}},this.context=e,this.canUseDOM=t,t||(e.helmet=Be({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))},jt=O.createContext({}),ur=y.shape({setHelmet:y.func,helmetInstances:y.shape({get:y.func,add:y.func,remove:y.func})}),fr=typeof document!="undefined",U=function(e){function t(n){var r;return(r=e.call(this,n)||this).helmetData=new $e(r.props.context,t.canUseDOM),r}return We(t,e),t.prototype.render=function(){return O.createElement(jt.Provider,{value:this.helmetData.value},this.props.children)},t}(I.Component);U.canUseDOM=fr,U.propTypes={context:y.shape({helmet:y.shape()}),children:y.node.isRequired},U.defaultProps={context:{}},U.displayName="HelmetProvider";var q=function(e,t){var n,r=document.head||document.querySelector(h.HEAD),a=r.querySelectorAll(e+"[data-rh]"),i=[].slice.call(a),s=[];return t&&t.length&&t.forEach(function(o){var c=document.createElement(e);for(var l in o)Object.prototype.hasOwnProperty.call(o,l)&&(l==="innerHTML"?c.innerHTML=o.innerHTML:l==="cssText"?c.styleSheet?c.styleSheet.cssText=o.cssText:c.appendChild(document.createTextNode(o.cssText)):c.setAttribute(l,o[l]===void 0?"":o[l]));c.setAttribute("data-rh","true"),i.some(function(f,u){return n=u,c.isEqualNode(f)})?i.splice(n,1):s.push(c)}),i.forEach(function(o){return o.parentNode.removeChild(o)}),s.forEach(function(o){return r.appendChild(o)}),{oldTags:i,newTags:s}},_e=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute("data-rh"),a=r?r.split(","):[],i=[].concat(a),s=Object.keys(t),o=0;o<s.length;o+=1){var c=s[o],l=t[c]||"";n.getAttribute(c)!==l&&n.setAttribute(c,l),a.indexOf(c)===-1&&a.push(c);var f=i.indexOf(c);f!==-1&&i.splice(f,1)}for(var u=i.length-1;u>=0;u-=1)n.removeAttribute(i[u]);a.length===i.length?n.removeAttribute("data-rh"):n.getAttribute("data-rh")!==s.join(",")&&n.setAttribute("data-rh",s.join(","))}},mt=function(e,t){var n=e.baseTag,r=e.htmlAttributes,a=e.linkTags,i=e.metaTags,s=e.noscriptTags,o=e.onChangeClientState,c=e.scriptTags,l=e.styleTags,f=e.title,u=e.titleAttributes;_e(h.BODY,e.bodyAttributes),_e(h.HTML,r),function(T,C){T!==void 0&&document.title!==T&&(document.title=Lt(T)),_e(h.TITLE,C)}(f,u);var d={baseTag:q(h.BASE,n),linkTags:q(h.LINK,a),metaTags:q(h.META,i),noscriptTags:q(h.NOSCRIPT,s),scriptTags:q(h.SCRIPT,c),styleTags:q(h.STYLE,l)},m={},w={};Object.keys(d).forEach(function(T){var C=d[T],M=C.newTags,z=C.oldTags;M.length&&(m[T]=M),z.length&&(w[T]=d[T].oldTags)}),t&&t(),o(e,m,w)},K=null,ae=function(e){function t(){for(var r,a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];return(r=e.call.apply(e,[this].concat(i))||this).rendered=!1,r}We(t,e);var n=t.prototype;return n.shouldComponentUpdate=function(r){return!er(r,this.props)},n.componentDidUpdate=function(){this.emitChange()},n.componentWillUnmount=function(){this.props.context.helmetInstances.remove(this),this.emitChange()},n.emitChange=function(){var r,a,i=this.props.context,s=i.setHelmet,o=null,c=(r=i.helmetInstances.get().map(function(l){var f=v({},l.props);return delete f.context,f}),{baseTag:or(["href"],r),bodyAttributes:Se("bodyAttributes",r),defer:V(r,"defer"),encode:V(r,"encodeSpecialCharacters"),htmlAttributes:Se("htmlAttributes",r),linkTags:G(h.LINK,["rel","href"],r),metaTags:G(h.META,["name","charset","http-equiv","property","itemprop"],r),noscriptTags:G(h.NOSCRIPT,["innerHTML"],r),onChangeClientState:sr(r),scriptTags:G(h.SCRIPT,["src","innerHTML"],r),styleTags:G(h.STYLE,["cssText"],r),title:ir(r),titleAttributes:Se("titleAttributes",r),prioritizeSeoTags:cr(r,"prioritizeSeoTags")});U.canUseDOM?(a=c,K&&cancelAnimationFrame(K),a.defer?K=requestAnimationFrame(function(){mt(a,function(){K=null})}):(mt(a),K=null)):Be&&(o=Be(c)),s(o)},n.init=function(){this.rendered||(this.rendered=!0,this.props.context.helmetInstances.add(this),this.emitChange())},n.render=function(){return this.init(),null},t}(I.Component);ae.propTypes={context:ur.isRequired},ae.displayName="HelmetDispatcher";var dr=["children"],hr=["children"],Oe=function(e){function t(){return e.apply(this,arguments)||this}We(t,e);var n=t.prototype;return n.shouldComponentUpdate=function(r){return!Yn(dt(this.props,"helmetData"),dt(r,"helmetData"))},n.mapNestedChildrenToProps=function(r,a){if(!a)return null;switch(r.type){case h.SCRIPT:case h.NOSCRIPT:return{innerHTML:a};case h.STYLE:return{cssText:a};default:throw new Error("<"+r.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")}},n.flattenArrayTypeChildren=function(r){var a,i=r.child,s=r.arrayTypeChildren;return v({},s,((a={})[i.type]=[].concat(s[i.type]||[],[v({},r.newChildProps,this.mapNestedChildrenToProps(i,r.nestedChildren))]),a))},n.mapObjectTypeChildren=function(r){var a,i,s=r.child,o=r.newProps,c=r.newChildProps,l=r.nestedChildren;switch(s.type){case h.TITLE:return v({},o,((a={})[s.type]=l,a.titleAttributes=v({},c),a));case h.BODY:return v({},o,{bodyAttributes:v({},c)});case h.HTML:return v({},o,{htmlAttributes:v({},c)});default:return v({},o,((i={})[s.type]=v({},c),i))}},n.mapArrayTypeChildrenToProps=function(r,a){var i=v({},a);return Object.keys(r).forEach(function(s){var o;i=v({},i,((o={})[s]=r[s],o))}),i},n.warnOnInvalidChildren=function(r,a){return ct(ft.some(function(i){return r.type===i}),typeof r.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":"Only elements types "+ft.join(", ")+" are allowed. Helmet does not support rendering <"+r.type+"> elements. Refer to our API for more information."),ct(!a||typeof a=="string"||Array.isArray(a)&&!a.some(function(i){return typeof i!="string"}),"Helmet expects a string as a child of <"+r.type+">. Did you forget to wrap your children in braces? ( <"+r.type+">{``}</"+r.type+"> ) Refer to our API for more information."),!0},n.mapChildrenToProps=function(r,a){var i=this,s={};return O.Children.forEach(r,function(o){if(o&&o.props){var c=o.props,l=c.children,f=ut(c,dr),u=Object.keys(f).reduce(function(m,w){return m[ar[w]||w]=f[w],m},{}),d=o.type;switch(typeof d=="symbol"?d=d.toString():i.warnOnInvalidChildren(o,l),d){case h.FRAGMENT:a=i.mapChildrenToProps(l,a);break;case h.LINK:case h.META:case h.NOSCRIPT:case h.SCRIPT:case h.STYLE:s=i.flattenArrayTypeChildren({child:o,arrayTypeChildren:s,newChildProps:u,nestedChildren:l});break;default:a=i.mapObjectTypeChildren({child:o,newProps:a,newChildProps:u,nestedChildren:l})}}}),this.mapArrayTypeChildrenToProps(s,a)},n.render=function(){var r=this.props,a=r.children,i=ut(r,hr),s=v({},i),o=i.helmetData;return a&&(s=this.mapChildrenToProps(a,s)),!o||o instanceof $e||(o=new $e(o.context,o.instances)),o?O.createElement(ae,v({},s,{context:o.value,helmetData:void 0})):O.createElement(jt.Consumer,null,function(c){return O.createElement(ae,v({},s,{context:c}))})},t}(I.Component);Oe.propTypes={base:y.object,bodyAttributes:y.object,children:y.oneOfType([y.arrayOf(y.node),y.node]),defaultTitle:y.string,defer:y.bool,encodeSpecialCharacters:y.bool,htmlAttributes:y.object,link:y.arrayOf(y.object),meta:y.arrayOf(y.object),noscript:y.arrayOf(y.object),onChangeClientState:y.func,script:y.arrayOf(y.object),style:y.arrayOf(y.object),title:y.string,titleAttributes:y.object,titleTemplate:y.string,prioritizeSeoTags:y.bool,helmetData:y.object},Oe.defaultProps={defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1},Oe.displayName="Helmet";const pr="modulepreload",mr=function(e){return"/"+e},gt={},gr=function(t,n,r){let a=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(f=>Promise.resolve(f).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),o=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));a=c(n.map(l=>{if(l=mr(l),l in gt)return;gt[l]=!0;const f=l.endsWith(".css"),u=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=f?"stylesheet":pr,f||(d.as="script"),d.crossOrigin="",d.href=l,o&&d.setAttribute("nonce",o),document.head.appendChild(d),f)return new Promise((m,w)=>{d.addEventListener("load",m),d.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(s){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s}return a.then(s=>{for(const o of s||[])o.status==="rejected"&&i(o.reason);return t().catch(i)})},Bt=I.createContext(void 0),yr=({children:e})=>{const[t,n]=I.useState(()=>{const i=localStorage.getItem("theme");return i||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")});I.useEffect(()=>{const i=window.document.documentElement;i.classList.remove("light","dark"),i.classList.add(t),localStorage.setItem("theme",t)},[t]);const a={theme:t,toggleTheme:()=>{n(i=>i==="light"?"dark":"light")}};return g.jsx(Bt.Provider,{value:a,children:e})},br=()=>{const e=I.useContext(Bt);if(e===void 0)throw new Error("useTheme must be used within a ThemeProvider");return e},wr="/assets/img_avatar-DYZE4tZ2.webp",vr=()=>{};var yt={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $t=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let a=e.charCodeAt(r);a<128?t[n++]=a:a<2048?(t[n++]=a>>6|192,t[n++]=a&63|128):(a&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(a=65536+((a&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=a>>18|240,t[n++]=a>>12&63|128,t[n++]=a>>6&63|128,t[n++]=a&63|128):(t[n++]=a>>12|224,t[n++]=a>>6&63|128,t[n++]=a&63|128)}return t},Tr=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const a=e[n++];if(a<128)t[r++]=String.fromCharCode(a);else if(a>191&&a<224){const i=e[n++];t[r++]=String.fromCharCode((a&31)<<6|i&63)}else if(a>239&&a<365){const i=e[n++],s=e[n++],o=e[n++],c=((a&7)<<18|(i&63)<<12|(s&63)<<6|o&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{const i=e[n++],s=e[n++];t[r++]=String.fromCharCode((a&15)<<12|(i&63)<<6|s&63)}}return t.join("")},Ft={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let a=0;a<e.length;a+=3){const i=e[a],s=a+1<e.length,o=s?e[a+1]:0,c=a+2<e.length,l=c?e[a+2]:0,f=i>>2,u=(i&3)<<4|o>>4;let d=(o&15)<<2|l>>6,m=l&63;c||(m=64,s||(d=64)),r.push(n[f],n[u],n[d],n[m])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray($t(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):Tr(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let a=0;a<e.length;){const i=n[e.charAt(a++)],o=a<e.length?n[e.charAt(a)]:0;++a;const l=a<e.length?n[e.charAt(a)]:64;++a;const u=a<e.length?n[e.charAt(a)]:64;if(++a,i==null||o==null||l==null||u==null)throw new Ir;const d=i<<2|o>>4;if(r.push(d),l!==64){const m=o<<4&240|l>>2;if(r.push(m),u!==64){const w=l<<6&192|u;r.push(w)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class Ir extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Er=function(e){const t=$t(e);return Ft.encodeByteArray(t,!0)},Ht=function(e){return Er(e).replace(/\./g,"")},Sr=function(e){try{return Ft.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ar(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cr=()=>Ar().__FIREBASE_DEFAULTS__,_r=()=>{if(typeof process=="undefined"||typeof yt=="undefined")return;const e=yt.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},Or=()=>{if(typeof document=="undefined")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&Sr(e[1]);return t&&JSON.parse(t)},kr=()=>{try{return vr()||Cr()||_r()||Or()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},qt=()=>{var e;return(e=kr())==null?void 0:e.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}function Dr(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function Ut(){try{return typeof indexedDB=="object"}catch(e){return!1}}function Vt(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(r);a.onsuccess=()=>{a.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},a.onupgradeneeded=()=>{n=!1},a.onerror=()=>{var i;t(((i=a.error)==null?void 0:i.message)||"")}}catch(n){t(n)}})}function Rr(){return!(typeof navigator=="undefined"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr="FirebaseError";class H extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=Pr,Object.setPrototypeOf(this,H.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,le.prototype.create)}}class le{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},a=`${this.service}/${t}`,i=this.errors[t],s=i?Mr(i,r):"Error",o=`${this.serviceName}: ${s} (${a}).`;return new H(a,o,r)}}function Mr(e,t){return e.replace(Nr,(n,r)=>{const a=t[r];return a!=null?String(a):`<${r}?>`})}const Nr=/\{\$([^}]+)}/g;function ie(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const a of n){if(!r.includes(a))return!1;const i=e[a],s=t[a];if(bt(i)&&bt(s)){if(!ie(i,s))return!1}else if(i!==s)return!1}for(const a of r)if(!n.includes(a))return!1;return!0}function bt(e){return e!==null&&typeof e=="object"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lr=1e3,jr=2,Br=14400*1e3,$r=.5;function wt(e,t=Lr,n=jr){const r=t*Math.pow(n,e),a=Math.round($r*r*(Math.random()-.5)*2);return Math.min(Br,r+a)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zt(e){return e&&e._delegate?e._delegate:e}class P{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new xr;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const a=this.getOrInitializeService({instanceIdentifier:n});a&&r.resolve(a)}catch(a){}}return this.instancesDeferred.get(n).promise}getImmediate(t){var a;const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(a=t==null?void 0:t.optional)!=null?a:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(qr(t))try{this.getOrInitializeService({instanceIdentifier:L})}catch(n){}for(const[n,r]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:a});r.resolve(i)}catch(i){}}}}clearInstance(t=L){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}delete(){return p(this,null,function*(){const t=Array.from(this.instances.values());yield Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])})}isComponentSet(){return this.component!=null}isInitialized(t=L){return this.instances.has(t)}getOptions(t=L){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,s]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(i);r===o&&s.resolve(a)}return a}onInit(t,n){var s;const r=this.normalizeInstanceIdentifier(n),a=(s=this.onInitCallbacks.get(r))!=null?s:new Set;a.add(t),this.onInitCallbacks.set(r,a);const i=this.instances.get(r);return i&&t(i,r),()=>{a.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const a of r)try{a(t,n)}catch(i){}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Hr(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch(a){}return r||null}normalizeInstanceIdentifier(t=L){return this.component?this.component.multipleInstances?t:L:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Hr(e){return e===L?void 0:e}function qr(e){return e.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new Fr(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var b;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(b||(b={}));const Vr={debug:b.DEBUG,verbose:b.VERBOSE,info:b.INFO,warn:b.WARN,error:b.ERROR,silent:b.SILENT},zr=b.INFO,Wr={[b.DEBUG]:"log",[b.VERBOSE]:"log",[b.INFO]:"info",[b.WARN]:"warn",[b.ERROR]:"error"},Gr=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),a=Wr[t];if(a)console[a](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Wt{constructor(t){this.name=t,this._logLevel=zr,this._logHandler=Gr,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in b))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Vr[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,b.DEBUG,...t),this._logHandler(this,b.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,b.VERBOSE,...t),this._logHandler(this,b.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,b.INFO,...t),this._logHandler(this,b.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,b.WARN,...t),this._logHandler(this,b.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,b.ERROR,...t),this._logHandler(this,b.ERROR,...t)}}const Kr=(e,t)=>t.some(n=>e instanceof n);let vt,Tt;function Yr(){return vt||(vt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Jr(){return Tt||(Tt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Gt=new WeakMap,Fe=new WeakMap,Kt=new WeakMap,ke=new WeakMap,Ge=new WeakMap;function Xr(e){const t=new Promise((n,r)=>{const a=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{n(x(e.result)),a()},s=()=>{r(e.error),a()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(n=>{n instanceof IDBCursor&&Gt.set(n,e)}).catch(()=>{}),Ge.set(t,e),t}function Zr(e){if(Fe.has(e))return;const t=new Promise((n,r)=>{const a=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{n(),a()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),a()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});Fe.set(e,t)}let He={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return Fe.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Kt.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return x(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Qr(e){He=e(He)}function ea(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(xe(this),t,...n);return Kt.set(r,t.sort?t.sort():[t]),x(r)}:Jr().includes(e)?function(...t){return e.apply(xe(this),t),x(Gt.get(this))}:function(...t){return x(e.apply(xe(this),t))}}function ta(e){return typeof e=="function"?ea(e):(e instanceof IDBTransaction&&Zr(e),Kr(e,Yr())?new Proxy(e,He):e)}function x(e){if(e instanceof IDBRequest)return Xr(e);if(ke.has(e))return ke.get(e);const t=ta(e);return t!==e&&(ke.set(e,t),Ge.set(t,e)),t}const xe=e=>Ge.get(e);function Yt(e,t,{blocked:n,upgrade:r,blocking:a,terminated:i}={}){const s=indexedDB.open(e,t),o=x(s);return r&&s.addEventListener("upgradeneeded",c=>{r(x(s.result),c.oldVersion,c.newVersion,x(s.transaction),c)}),n&&s.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),o.then(c=>{i&&c.addEventListener("close",()=>i()),a&&c.addEventListener("versionchange",l=>a(l.oldVersion,l.newVersion,l))}).catch(()=>{}),o}const na=["get","getKey","getAll","getAllKeys","count"],ra=["put","add","delete","clear"],De=new Map;function It(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(De.get(t))return De.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,a=ra.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(a||na.includes(n)))return;const i=function(s,...o){return p(this,null,function*(){const c=this.transaction(s,a?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(o.shift())),(yield Promise.all([l[n](...o),a&&c.done]))[0]})};return De.set(t,i),i}Qr(e=>N(_({},e),{get:(t,n,r)=>It(t,n)||e.get(t,n,r),has:(t,n)=>!!It(t,n)||e.has(t,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ia(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function ia(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const qe="@firebase/app",Et="0.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k=new Wt("@firebase/app"),sa="@firebase/app-compat",oa="@firebase/analytics-compat",ca="@firebase/analytics",la="@firebase/app-check-compat",ua="@firebase/app-check",fa="@firebase/auth",da="@firebase/auth-compat",ha="@firebase/database",pa="@firebase/data-connect",ma="@firebase/database-compat",ga="@firebase/functions",ya="@firebase/functions-compat",ba="@firebase/installations",wa="@firebase/installations-compat",va="@firebase/messaging",Ta="@firebase/messaging-compat",Ia="@firebase/performance",Ea="@firebase/performance-compat",Sa="@firebase/remote-config",Aa="@firebase/remote-config-compat",Ca="@firebase/storage",_a="@firebase/storage-compat",Oa="@firebase/firestore",ka="@firebase/ai",xa="@firebase/firestore-compat",Da="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ue="[DEFAULT]",Ra={[qe]:"fire-core",[sa]:"fire-core-compat",[ca]:"fire-analytics",[oa]:"fire-analytics-compat",[ua]:"fire-app-check",[la]:"fire-app-check-compat",[fa]:"fire-auth",[da]:"fire-auth-compat",[ha]:"fire-rtdb",[pa]:"fire-data-connect",[ma]:"fire-rtdb-compat",[ga]:"fire-fn",[ya]:"fire-fn-compat",[ba]:"fire-iid",[wa]:"fire-iid-compat",[va]:"fire-fcm",[Ta]:"fire-fcm-compat",[Ia]:"fire-perf",[Ea]:"fire-perf-compat",[Sa]:"fire-rc",[Aa]:"fire-rc-compat",[Ca]:"fire-gcs",[_a]:"fire-gcs-compat",[Oa]:"fire-fst",[xa]:"fire-fst-compat",[ka]:"fire-vertex","fire-js":"fire-js",[Da]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const se=new Map,Pa=new Map,Ve=new Map;function St(e,t){try{e.container.addComponent(t)}catch(n){k.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function B(e){const t=e.name;if(Ve.has(t))return k.debug(`There were multiple attempts to register component ${t}.`),!1;Ve.set(t,e);for(const n of se.values())St(n,e);for(const n of Pa.values())St(n,e);return!0}function ue(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},D=new le("app","Firebase",Ma);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{constructor(t,n,r){this._isDeleted=!1,this._options=_({},t),this._config=_({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new P("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw D.create("app-deleted",{appName:this._name})}}function Jt(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r=_({name:Ue,automaticDataCollectionEnabled:!0},t),a=r.name;if(typeof a!="string"||!a)throw D.create("bad-app-name",{appName:String(a)});if(n||(n=qt()),!n)throw D.create("no-options");const i=se.get(a);if(i){if(ie(n,i.options)&&ie(r,i.config))return i;throw D.create("duplicate-app",{appName:a})}const s=new Ur(a);for(const c of Ve.values())s.addComponent(c);const o=new Na(n,r,s);return se.set(a,o),o}function La(e=Ue){const t=se.get(e);if(!t&&e===Ue&&qt())return Jt();if(!t)throw D.create("no-app",{appName:e});return t}function R(e,t,n){var s;let r=(s=Ra[e])!=null?s:e;n&&(r+=`-${n}`);const a=r.match(/\s|\//),i=t.match(/\s|\//);if(a||i){const o=[`Unable to register library "${r}" with version "${t}":`];a&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),a&&i&&o.push("and"),i&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),k.warn(o.join(" "));return}B(new P(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja="firebase-heartbeat-database",Ba=1,J="firebase-heartbeat-store";let Re=null;function Xt(){return Re||(Re=Yt(ja,Ba,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(J)}catch(n){console.warn(n)}}}}).catch(e=>{throw D.create("idb-open",{originalErrorMessage:e.message})})),Re}function $a(e){return p(this,null,function*(){try{const n=(yield Xt()).transaction(J),r=yield n.objectStore(J).get(Zt(e));return yield n.done,r}catch(t){if(t instanceof H)k.warn(t.message);else{const n=D.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});k.warn(n.message)}}})}function At(e,t){return p(this,null,function*(){try{const r=(yield Xt()).transaction(J,"readwrite");yield r.objectStore(J).put(t,Zt(e)),yield r.done}catch(n){if(n instanceof H)k.warn(n.message);else{const r=D.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});k.warn(r.message)}}})}function Zt(e){return`${e.name}!${e.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fa=1024,Ha=30;class qa{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Va(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}triggerHeartbeat(){return p(this,null,function*(){var t,n;try{const a=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ct();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=yield this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:a}),this._heartbeatsCache.heartbeats.length>Ha){const s=za(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){k.warn(r)}})}getHeartbeatsHeader(){return p(this,null,function*(){var t;try{if(this._heartbeatsCache===null&&(yield this._heartbeatsCachePromise),((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ct(),{heartbeatsToSend:r,unsentEntries:a}=Ua(this._heartbeatsCache.heartbeats),i=Ht(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,a.length>0?(this._heartbeatsCache.heartbeats=a,yield this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return k.warn(n),""}})}}function Ct(){return new Date().toISOString().substring(0,10)}function Ua(e,t=Fa){const n=[];let r=e.slice();for(const a of e){const i=n.find(s=>s.agent===a.agent);if(i){if(i.dates.push(a.date),_t(n)>t){i.dates.pop();break}}else if(n.push({agent:a.agent,dates:[a.date]}),_t(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Va{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}runIndexedDBEnvironmentCheck(){return p(this,null,function*(){return Ut()?Vt().then(()=>!0).catch(()=>!1):!1})}read(){return p(this,null,function*(){if(yield this._canUseIndexedDBPromise){const n=yield $a(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}})}overwrite(t){return p(this,null,function*(){var r;if(yield this._canUseIndexedDBPromise){const a=yield this.read();return At(this.app,{lastSentHeartbeatDate:(r=t.lastSentHeartbeatDate)!=null?r:a.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return})}add(t){return p(this,null,function*(){var r;if(yield this._canUseIndexedDBPromise){const a=yield this.read();return At(this.app,{lastSentHeartbeatDate:(r=t.lastSentHeartbeatDate)!=null?r:a.lastSentHeartbeatDate,heartbeats:[...a.heartbeats,...t.heartbeats]})}else return})}}function _t(e){return Ht(JSON.stringify({version:2,heartbeats:e})).length}function za(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wa(e){B(new P("platform-logger",t=>new aa(t),"PRIVATE")),B(new P("heartbeat",t=>new qa(t),"PRIVATE")),R(qe,Et,e),R(qe,Et,"esm2020"),R("fire-js","")}Wa("");const Qt="@firebase/installations",Ke="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en=1e4,tn=`w:${Ke}`,nn="FIS_v2",Ga="https://firebaseinstallations.googleapis.com/v1",Ka=3600*1e3,Ya="installations",Ja="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xa={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},$=new le(Ya,Ja,Xa);function rn(e){return e instanceof H&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function an({projectId:e}){return`${Ga}/projects/${e}/installations`}function sn(e){return{token:e.token,requestStatus:2,expiresIn:Qa(e.expiresIn),creationTime:Date.now()}}function on(e,t){return p(this,null,function*(){const r=(yield t.json()).error;return $.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})})}function cn({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Za(e,{refreshToken:t}){const n=cn(e);return n.append("Authorization",ei(t)),n}function ln(e){return p(this,null,function*(){const t=yield e();return t.status>=500&&t.status<600?e():t})}function Qa(e){return Number(e.replace("s","000"))}function ei(e){return`${nn} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ti(r,a){return p(this,arguments,function*({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const i=an(e),s=cn(e),o=t.getImmediate({optional:!0});if(o){const u=yield o.getHeartbeatsHeader();u&&s.append("x-firebase-client",u)}const c={fid:n,authVersion:nn,appId:e.appId,sdkVersion:tn},l={method:"POST",headers:s,body:JSON.stringify(c)},f=yield ln(()=>fetch(i,l));if(f.ok){const u=yield f.json();return{fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:sn(u.authToken)}}else throw yield on("Create Installation",f)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function un(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ni(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ri=/^[cdef][\w-]{21}$/,ze="";function ai(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=ii(e);return ri.test(n)?n:ze}catch(e){return ze}}function ii(e){return ni(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn=new Map;function dn(e,t){const n=fe(e);hn(n,t),si(n,t)}function hn(e,t){const n=fn.get(e);if(n)for(const r of n)r(t)}function si(e,t){const n=oi();n&&n.postMessage({key:e,fid:t}),ci()}let j=null;function oi(){return!j&&"BroadcastChannel"in self&&(j=new BroadcastChannel("[Firebase] FID Change"),j.onmessage=e=>{hn(e.data.key,e.data.fid)}),j}function ci(){fn.size===0&&j&&(j.close(),j=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const li="firebase-installations-database",ui=1,F="firebase-installations-store";let Pe=null;function Ye(){return Pe||(Pe=Yt(li,ui,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(F)}}})),Pe}function oe(e,t){return p(this,null,function*(){const n=fe(e),a=(yield Ye()).transaction(F,"readwrite"),i=a.objectStore(F),s=yield i.get(n);return yield i.put(t,n),yield a.done,(!s||s.fid!==t.fid)&&dn(e,t.fid),t})}function pn(e){return p(this,null,function*(){const t=fe(e),r=(yield Ye()).transaction(F,"readwrite");yield r.objectStore(F).delete(t),yield r.done})}function de(e,t){return p(this,null,function*(){const n=fe(e),a=(yield Ye()).transaction(F,"readwrite"),i=a.objectStore(F),s=yield i.get(n),o=t(s);return o===void 0?yield i.delete(n):yield i.put(o,n),yield a.done,o&&(!s||s.fid!==o.fid)&&dn(e,o.fid),o})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(e){return p(this,null,function*(){let t;const n=yield de(e.appConfig,r=>{const a=fi(r),i=di(e,a);return t=i.registrationPromise,i.installationEntry});return n.fid===ze?{installationEntry:yield t}:{installationEntry:n,registrationPromise:t}})}function fi(e){const t=e||{fid:ai(),registrationStatus:0};return mn(t)}function di(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const a=Promise.reject($.create("app-offline"));return{installationEntry:t,registrationPromise:a}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=hi(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:pi(e)}:{installationEntry:t}}function hi(e,t){return p(this,null,function*(){try{const n=yield ti(e,t);return oe(e.appConfig,n)}catch(n){throw rn(n)&&n.customData.serverCode===409?yield pn(e.appConfig):yield oe(e.appConfig,{fid:t.fid,registrationStatus:0}),n}})}function pi(e){return p(this,null,function*(){let t=yield Ot(e.appConfig);for(;t.registrationStatus===1;)yield un(100),t=yield Ot(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=yield Je(e);return r||n}return t})}function Ot(e){return de(e,t=>{if(!t)throw $.create("installation-not-found");return mn(t)})}function mn(e){return mi(e)?{fid:e.fid,registrationStatus:0}:e}function mi(e){return e.registrationStatus===1&&e.registrationTime+en<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gi(r,a){return p(this,arguments,function*({appConfig:e,heartbeatServiceProvider:t},n){const i=yi(e,n),s=Za(e,n),o=t.getImmediate({optional:!0});if(o){const u=yield o.getHeartbeatsHeader();u&&s.append("x-firebase-client",u)}const c={installation:{sdkVersion:tn,appId:e.appId}},l={method:"POST",headers:s,body:JSON.stringify(c)},f=yield ln(()=>fetch(i,l));if(f.ok){const u=yield f.json();return sn(u)}else throw yield on("Generate Auth Token",f)})}function yi(e,{fid:t}){return`${an(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(e,t=!1){return p(this,null,function*(){let n;const r=yield de(e.appConfig,i=>{if(!gn(i))throw $.create("not-registered");const s=i.authToken;if(!t&&vi(s))return i;if(s.requestStatus===1)return n=bi(e,t),i;{if(!navigator.onLine)throw $.create("app-offline");const o=Ii(i);return n=wi(e,o),o}});return n?yield n:r.authToken})}function bi(e,t){return p(this,null,function*(){let n=yield kt(e.appConfig);for(;n.authToken.requestStatus===1;)yield un(100),n=yield kt(e.appConfig);const r=n.authToken;return r.requestStatus===0?Xe(e,t):r})}function kt(e){return de(e,t=>{if(!gn(t))throw $.create("not-registered");const n=t.authToken;return Ei(n)?N(_({},t),{authToken:{requestStatus:0}}):t})}function wi(e,t){return p(this,null,function*(){try{const n=yield gi(e,t),r=N(_({},t),{authToken:n});return yield oe(e.appConfig,r),n}catch(n){if(rn(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))yield pn(e.appConfig);else{const r=N(_({},t),{authToken:{requestStatus:0}});yield oe(e.appConfig,r)}throw n}})}function gn(e){return e!==void 0&&e.registrationStatus===2}function vi(e){return e.requestStatus===2&&!Ti(e)}function Ti(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Ka}function Ii(e){const t={requestStatus:1,requestTime:Date.now()};return N(_({},e),{authToken:t})}function Ei(e){return e.requestStatus===1&&e.requestTime+en<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Si(e){return p(this,null,function*(){const t=e,{installationEntry:n,registrationPromise:r}=yield Je(t);return r?r.catch(console.error):Xe(t).catch(console.error),n.fid})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ai(e,t=!1){return p(this,null,function*(){const n=e;return yield Ci(n),(yield Xe(n,t)).token})}function Ci(e){return p(this,null,function*(){const{registrationPromise:t}=yield Je(e);t&&(yield t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _i(e){if(!e||!e.options)throw Me("App Configuration");if(!e.name)throw Me("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Me(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function Me(e){return $.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn="installations",Oi="installations-internal",ki=e=>{const t=e.getProvider("app").getImmediate(),n=_i(t),r=ue(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},xi=e=>{const t=e.getProvider("app").getImmediate(),n=ue(t,yn).getImmediate();return{getId:()=>Si(n),getToken:a=>Ai(n,a)}};function Di(){B(new P(yn,ki,"PUBLIC")),B(new P(Oi,xi,"PRIVATE"))}Di();R(Qt,Ke);R(Qt,Ke,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce="analytics",Ri="firebase_id",Pi="origin",Mi=60*1e3,Ni="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Ze="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E=new Wt("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Li={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},S=new le("analytics","Analytics",Li);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(e){if(!e.startsWith(Ze)){const t=S.create("invalid-gtag-resource",{gtagURL:e});return E.warn(t.message),""}return e}function bn(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function Bi(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function $i(e,t){const n=Bi("firebase-js-sdk-policy",{createScriptURL:ji}),r=document.createElement("script"),a=`${Ze}?l=${e}&id=${t}`;r.src=n?n==null?void 0:n.createScriptURL(a):a,r.async=!0,document.head.appendChild(r)}function Fi(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}function Hi(e,t,n,r,a,i){return p(this,null,function*(){const s=r[a];try{if(s)yield t[s];else{const c=(yield bn(n)).find(l=>l.measurementId===a);c&&(yield t[c.appId])}}catch(o){E.error(o)}e("config",a,i)})}function qi(e,t,n,r,a){return p(this,null,function*(){try{let i=[];if(a&&a.send_to){let s=a.send_to;Array.isArray(s)||(s=[s]);const o=yield bn(n);for(const c of s){const l=o.find(u=>u.measurementId===c),f=l&&t[l.appId];if(f)i.push(f);else{i=[];break}}}i.length===0&&(i=Object.values(t)),yield Promise.all(i),e("event",r,a||{})}catch(i){E.error(i)}})}function Ui(e,t,n,r){function a(i,...s){return p(this,null,function*(){try{if(i==="event"){const[o,c]=s;yield qi(e,t,n,o,c)}else if(i==="config"){const[o,c]=s;yield Hi(e,t,n,r,o,c)}else if(i==="consent"){const[o,c]=s;e("consent",o,c)}else if(i==="get"){const[o,c,l]=s;e("get",o,c,l)}else if(i==="set"){const[o]=s;e("set",o)}else e(i,...s)}catch(o){E.error(o)}})}return a}function Vi(e,t,n,r,a){let i=function(...s){window[r].push(arguments)};return window[a]&&typeof window[a]=="function"&&(i=window[a]),window[a]=Ui(i,e,t,n),{gtagCore:i,wrappedGtag:window[a]}}function zi(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(Ze)&&n.src.includes(e))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wi=30,Gi=1e3;class Ki{constructor(t={},n=Gi){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const wn=new Ki;function Yi(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}function Ji(e){return p(this,null,function*(){var s;const{appId:t,apiKey:n}=e,r={method:"GET",headers:Yi(n)},a=Ni.replace("{app-id}",t),i=yield fetch(a,r);if(i.status!==200&&i.status!==304){let o="";try{const c=yield i.json();(s=c.error)!=null&&s.message&&(o=c.error.message)}catch(c){}throw S.create("config-fetch-failed",{httpStatus:i.status,responseMessage:o})}return i.json()})}function Xi(r){return p(this,arguments,function*(e,t=wn,n){const{appId:a,apiKey:i,measurementId:s}=e.options;if(!a)throw S.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:a};throw S.create("no-api-key")}const o=t.getThrottleMetadata(a)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new es;return setTimeout(()=>p(null,null,function*(){c.abort()}),Mi),vn({appId:a,apiKey:i,measurementId:s},o,c,t)})}function vn(i,s,o){return p(this,arguments,function*(e,{throttleEndTimeMillis:t,backoffCount:n},r,a=wn){var f;const{appId:c,measurementId:l}=e;try{yield Zi(r,t)}catch(u){if(l)return E.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:c,measurementId:l};throw u}try{const u=yield Ji(e);return a.deleteThrottleMetadata(c),u}catch(u){const d=u;if(!Qi(d)){if(a.deleteThrottleMetadata(c),l)return E.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${d==null?void 0:d.message}]`),{appId:c,measurementId:l};throw u}const m=Number((f=d==null?void 0:d.customData)==null?void 0:f.httpStatus)===503?wt(n,a.intervalMillis,Wi):wt(n,a.intervalMillis),w={throttleEndTimeMillis:Date.now()+m,backoffCount:n+1};return a.setThrottleMetadata(c,w),E.debug(`Calling attemptFetch again in ${m} millis`),vn(e,w,r,a)}})}function Zi(e,t){return new Promise((n,r)=>{const a=Math.max(t-Date.now(),0),i=setTimeout(n,a);e.addEventListener(()=>{clearTimeout(i),r(S.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function Qi(e){if(!(e instanceof H)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class es{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}function ts(e,t,n,r,a){return p(this,null,function*(){if(a&&a.global){e("event",n,r);return}else{const i=yield t,s=N(_({},r),{send_to:i});e("event",n,s)}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(){return p(this,null,function*(){if(Ut())try{yield Vt()}catch(e){return E.warn(S.create("indexeddb-unavailable",{errorInfo:e==null?void 0:e.toString()}).message),!1}else return E.warn(S.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0})}function rs(e,t,n,r,a,i,s){return p(this,null,function*(){var d;const o=Xi(e);o.then(m=>{n[m.measurementId]=m.appId,e.options.measurementId&&m.measurementId!==e.options.measurementId&&E.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>E.error(m)),t.push(o);const c=ns().then(m=>{if(m)return r.getId()}),[l,f]=yield Promise.all([o,c]);zi(i)||$i(i,l.measurementId),a("js",new Date);const u=(d=s==null?void 0:s.config)!=null?d:{};return u[Pi]="firebase",u.update=!0,f!=null&&(u[Ri]=f),a("config",l.measurementId,u),l.measurementId})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(t){this.app=t}_delete(){return delete Y[this.app.options.appId],Promise.resolve()}}let Y={},xt=[];const Dt={};let Ne="dataLayer",is="gtag",Rt,Tn,Pt=!1;function ss(){const e=[];if(Dr()&&e.push("This is a browser extension environment."),Rr()||e.push("Cookies are not available."),e.length>0){const t=e.map((r,a)=>`(${a+1}) ${r}`).join(" "),n=S.create("invalid-analytics-context",{errorInfo:t});E.warn(n.message)}}function os(e,t,n){ss();const r=e.options.appId;if(!r)throw S.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)E.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw S.create("no-api-key");if(Y[r]!=null)throw S.create("already-exists",{id:r});if(!Pt){Fi(Ne);const{wrappedGtag:i,gtagCore:s}=Vi(Y,xt,Dt,Ne,is);Tn=i,Rt=s,Pt=!0}return Y[r]=rs(e,xt,Dt,t,Rt,Ne,n),new as(e)}function cs(e=La()){e=zt(e);const t=ue(e,ce);return t.isInitialized()?t.getImmediate():ls(e)}function ls(e,t={}){const n=ue(e,ce);if(n.isInitialized()){const a=n.getImmediate();if(ie(t,n.getOptions()))return a;throw S.create("already-initialized")}return n.initialize({options:t})}function In(e,t,n,r){e=zt(e),ts(Tn,Y[e.app.options.appId],t,n,r).catch(a=>E.error(a))}const Mt="@firebase/analytics",Nt="0.10.18";function us(){B(new P(ce,(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),a=t.getProvider("installations-internal").getImmediate();return os(r,a,n)},"PUBLIC")),B(new P("analytics-internal",e,"PRIVATE")),R(Mt,Nt),R(Mt,Nt,"esm2020");function e(t){try{const n=t.getProvider(ce).getImmediate();return{logEvent:(r,a,i)=>In(n,r,a,i)}}catch(n){throw S.create("interop-component-reg-failed",{reason:n})}}}us();var fs="firebase",ds="12.1.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */R(fs,ds,"app");const hs={apiKey:"AIzaSyCSR2TiaMwWx-NY9BVpHM2PbxannEBzlNU",authDomain:"fakhry-showcase-v2.firebaseapp.com",projectId:"fakhry-showcase-v2",storageBucket:"fakhry-showcase-v2.firebasestorage.app",messagingSenderId:"686700373210",appId:"1:686700373210:web:5b9c63f4e214511ae171e3",measurementId:"G-29VSW7CMFR"},ps=Jt(hs),ms=cs(ps),En=()=>{const e=I.useRef(null);I.useEffect(()=>{e.current=ms},[]);const t=(s,o)=>{e.current&&In(e.current,s,o)};return{trackEvent:t,trackPageView:s=>{t("page_view",{page_name:s})},trackButtonClick:(s,o)=>{t("button_click",{button_name:s,location:o})},trackProjectView:s=>{t("project_view",{project_name:s})},trackContactClick:s=>{t("contact_click",{contact_method:s})}}},Rs=(e={})=>{const t=I.useRef(null),n=I.useCallback(()=>t.current?Array.from(t.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]')):[],[]),r=I.useCallback(a=>{const{key:i,target:s}=a,o=n();if(!o.length)return;const c=o.indexOf(s),l=c===0,f=c===o.length-1;switch(i){case"Escape":e.onEscape&&(a.preventDefault(),e.onEscape());break;case"Enter":e.onEnter&&(a.preventDefault(),e.onEnter());break;case" ":e.onSpace&&(a.preventDefault(),e.onSpace());break;case"Tab":e.trapFocus&&(a.shiftKey?l&&(a.preventDefault(),o[o.length-1].focus()):f&&(a.preventDefault(),o[0].focus()));break;case"ArrowDown":case"ArrowRight":a.preventDefault(),c<o.length-1?o[c+1].focus():e.trapFocus&&o[0].focus();break;case"ArrowUp":case"ArrowLeft":a.preventDefault(),c>0?o[c-1].focus():e.trapFocus&&o[o.length-1].focus();break}},[e,n]);return I.useEffect(()=>{if(t.current&&e.autoFocus){const i=n();i.length>0&&i[0].focus()}},[e.autoFocus,n]),{containerRef:t,getFocusableElements:n,handleKeyDown:r}},ne={announce:(e,t="polite")=>{const n=document.createElement("div");n.setAttribute("aria-live",t),n.setAttribute("aria-atomic","true"),n.className="sr-only",n.textContent=e,document.body.appendChild(n),window.setTimeout(()=>{document.body.contains(n)&&document.body.removeChild(n)},1e3)},skipToMain:()=>{const e=document.querySelector("main");e&&(e.focus(),ne.announce("Navigated to main content"))},focusFirstElement:e=>{const t=Array.from(e.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));t.length>0&&t[0].focus()},isElementVisible:e=>{const t=e.getBoundingClientRect(),n=window.getComputedStyle(e);return t.width>0&&t.height>0&&n.visibility!=="hidden"&&n.display!=="none"&&n.opacity!=="0"}},gs=()=>{const{theme:e,toggleTheme:t}=br(),[n,r]=I.useState(!1),{trackButtonClick:a}=En(),i=[{name:"Home",href:"#home"},{name:"Projects",href:"#projects"},{name:"Experience",href:"#experience"},{name:"Contact",href:"#contact"}],s=(l,f)=>{const u=document.querySelector(l);u&&(u.scrollIntoView({behavior:"smooth"}),ne.announce(`Navigated to ${f} section`)),a(`nav_${f.toLowerCase()}`,"header"),r(!1)},o=()=>{a("theme_toggle","header"),ne.announce(`Switched to ${e==="light"?"dark":"light"} mode`),t()},c=()=>{a("mobile_menu_toggle","header");const l=!n;r(l),ne.announce(`Mobile menu ${l?"opened":"closed"}`)};return g.jsx("header",{className:"fixed top-0 left-0 right-0 z-50 transition-all duration-300 'bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-md shadow-lg'",role:"banner",children:g.jsxs("div",{className:"container px-4 sm:px-6 lg:px-8",children:[g.jsxs("div",{className:"flex items-center justify-between h-16 min-w-0",children:[g.jsxs("div",{className:"flex items-center space-x-2 min-w-0 flex-shrink-0",children:[g.jsx("div",{className:"w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden",children:g.jsx("img",{src:wr,alt:"Fakhry Mubarak",className:"w-full h-full object-cover"})}),g.jsx("span",{className:"font-display font-semibold text-lg truncate",children:"Fakhry Mubarak"})]}),g.jsx("nav",{className:"hidden md:flex items-center space-x-8",role:"navigation","aria-label":"Main navigation",children:i.map(l=>g.jsx("button",{onClick:()=>s(l.href,l.name),className:"text-light-muted dark:text-dark-muted hover:text-primary-coral dark:hover:text-primary-coral transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2 rounded px-2 py-1","aria-label":`Navigate to ${l.name} section`,children:l.name},l.name))}),g.jsxs("div",{className:"flex items-center space-x-2 sm:space-x-4 flex-shrink-0",children:[g.jsx("button",{onClick:o,className:"p-1.5 sm:p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2","aria-label":`Switch to ${e==="light"?"dark":"light"} mode`,children:e==="light"?g.jsx(Mn,{className:"w-5 h-5 text-light-muted dark:text-dark-muted","aria-hidden":"true"}):g.jsx(Nn,{className:"w-5 h-5 text-light-muted dark:text-dark-muted","aria-hidden":"true"})}),g.jsx("button",{onClick:c,className:"md:hidden p-1.5 sm:p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2","aria-label":"Toggle mobile menu","aria-expanded":n,"aria-controls":"mobile-menu",children:n?g.jsx(Ln,{className:"w-5 h-5 text-light-muted dark:text-dark-muted","aria-hidden":"true"}):g.jsx(jn,{className:"w-5 h-5 text-light-muted dark:text-dark-muted","aria-hidden":"true"})})]})]}),n&&g.jsx("div",{id:"mobile-menu",className:"md:hidden py-4 border-t border-light-muted/20 dark:border-dark-muted/20",role:"navigation","aria-label":"Mobile navigation",children:g.jsx("nav",{className:"flex flex-col space-y-4",children:i.map(l=>g.jsx("button",{onClick:()=>s(l.href,l.name),className:"text-left text-light-muted dark:text-dark-muted hover:text-primary-coral dark:hover:text-primary-coral transition-colors font-medium py-2 focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2 rounded px-2","aria-label":`Navigate to ${l.name} section`,children:l.name},l.name))})})]})})},ys=({children:e})=>{const{trackPageView:t}=En();return I.useEffect(()=>{t(window.location.pathname)},[t]),g.jsxs("div",{className:"app",children:[g.jsx(gs,{}),g.jsx("main",{children:e})]})},bs=({size:e="md",color:t="primary",className:n=""})=>{const r={sm:"w-4 h-4",md:"w-8 h-8",lg:"w-12 h-12"},a={primary:"border-primary-coral",gray:"border-gray-400",white:"border-white"};return g.jsx("div",{className:`animate-spin rounded-full border-2 border-t-transparent ${r[e]} ${a[t]} ${n}`,role:"status","aria-label":"Loading","data-testid":"loading-spinner",children:g.jsx("span",{className:"sr-only",children:"Loading..."})})},ws=I.lazy(()=>gr(()=>import("../js/HomePage-Ill13Fb5.js"),__vite__mapDeps([0,1,2,3,4])));function vs(){return g.jsx(yr,{children:g.jsx(ys,{children:g.jsx(I.Suspense,{fallback:g.jsx(bs,{}),children:g.jsx(Dn,{children:g.jsx(Rn,{path:"/",element:g.jsx(ws,{})})})})})})}class Ts{constructor(){Z(this,"metrics",{fcp:null,lcp:null,fid:null,cls:null,ttfb:null});Z(this,"observers",[]);Z(this,"isInitialized",!1);typeof window!="undefined"&&setTimeout(()=>{this.initObservers(),this.measureTTFB()},100)}initObservers(){if(!(this.isInitialized||!("PerformanceObserver"in window))){this.isInitialized=!0;try{const t=new PerformanceObserver(n=>{const a=n.getEntries().find(i=>i.name==="first-contentful-paint");a&&(this.metrics.fcp=a.startTime,this.logMetric("FCP",a.startTime),t.disconnect())});t.observe({entryTypes:["paint"]}),this.observers.push(t)}catch(t){}try{const t=new PerformanceObserver(n=>{const r=n.getEntries(),a=r[r.length-1];a&&(this.metrics.lcp=a.startTime,this.logMetric("LCP",a.startTime))});t.observe({entryTypes:["largest-contentful-paint"]}),this.observers.push(t)}catch(t){}try{const t=new PerformanceObserver(n=>{n.getEntries().forEach(a=>{const i=a;this.metrics.fid=i.processingStart-i.startTime,this.logMetric("FID",this.metrics.fid),t.disconnect()})});t.observe({entryTypes:["first-input"]}),this.observers.push(t)}catch(t){}try{const t=Date.now(),n=new PerformanceObserver(r=>{r.getEntries().forEach(i=>{const s=i;s.hadRecentInput||(this.metrics.cls=(this.metrics.cls||0)+s.value,this.logMetric("CLS",this.metrics.cls))}),Date.now()-t>5e3&&n.disconnect()});n.observe({entryTypes:["layout-shift"]}),this.observers.push(n)}catch(t){}}}measureTTFB(){if("performance"in window){const t=performance.getEntriesByType("navigation")[0];t&&(this.metrics.ttfb=t.responseStart-t.requestStart,this.logMetric("TTFB",this.metrics.ttfb))}}logMetric(t,n){const r=window;typeof r.gtag!="undefined"&&r.gtag("event","performance_metric",{metric_name:t,metric_value:n})}getMetrics(){return _({},this.metrics)}getMetricScore(t){const n=this.metrics[t];if(n===null)return"needs-improvement";const a={fcp:{good:1800,poor:3e3},lcp:{good:2500,poor:4e3},fid:{good:100,poor:300},cls:{good:.1,poor:.25},ttfb:{good:800,poor:1800}}[t];return a?n<=a.good?"good":n<=a.poor?"needs-improvement":"poor":"needs-improvement"}disconnect(){this.observers.forEach(t=>t.disconnect()),this.observers=[]}}let Le=null;const Is=()=>(Le||(Le=new Ts),Le),Es=()=>{["/avatar.webp"].forEach(n=>{const r=document.createElement("link");r.rel="preload",r.as="image",r.href=n,r.type="image/webp",document.head.appendChild(r)}),["https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap","https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"].forEach(n=>{const r=document.createElement("link");r.rel="preload",r.as="style",r.href=n,document.head.appendChild(r)})},Ss=()=>{document.querySelectorAll("img:not([loading])").forEach(t=>{t.hasAttribute("loading")||(t.loading="lazy")})},As=()=>{if(typeof window!="undefined"&&(Es(),Ss(),"IntersectionObserver"in window)){const e=new IntersectionObserver(t=>{t.forEach(n=>{if(n.isIntersecting){const r=n.target;r.dataset.src&&(r.src=r.dataset.src,r.removeAttribute("data-src"),e.unobserve(r))}})});document.querySelectorAll("img[data-src]").forEach(t=>{e.observe(t)})}},Cs=()=>p(null,null,function*(){if("serviceWorker"in navigator)try{console.log("Registering Service Worker...");const e="/",t=yield navigator.serviceWorker.register(`${e}sw.js`,{scope:e,updateViaCache:"none"});return console.log("Service Worker registered successfully:",t),t.addEventListener("updatefound",()=>{console.log("Service Worker update found");const n=t.installing;n&&n.addEventListener("statechange",()=>{console.log("Service Worker state changed:",n.state),n.state==="installed"&&navigator.serviceWorker.controller&&_s(t)})}),navigator.serviceWorker.addEventListener("controllerchange",()=>{console.log("Service Worker controller changed")}),t}catch(e){return console.error("Service Worker registration failed:",e),null}else return console.log("Service Worker not supported in this browser"),null}),_s=e=>{console.log("New version available!"),"Notification"in window&&Notification.permission==="granted"&&new Notification("Portfolio Update",{body:"A new version is available. Refresh to update.",icon:"/icons/Icon-192.png"})};Is();As();Cs();qn.createRoot(document.getElementById("root")).render(g.jsx(O.StrictMode,{children:g.jsx(U,{children:g.jsx(Pn,{children:g.jsx(vs,{})})})}));export{bs as L,Oe as W,wr as a,ne as b,En as c,Rs as d,g as j,br as u};
