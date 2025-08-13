const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["js/HomePage--te8ZGV1.js","js/chunk-BDipPQm_.js","js/chunk-3JDXIiR8.js","js/chunk-DomL0yj5.js","js/chunk-D8qEskI5.js"])))=>i.map(i=>d[i]);
var An=Object.defineProperty,Cn=Object.defineProperties;var _n=Object.getOwnPropertyDescriptors;var et=Object.getOwnPropertySymbols;var xn=Object.prototype.hasOwnProperty,kn=Object.prototype.propertyIsEnumerable;var ge=(e,t,n)=>t in e?An(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,_=(e,t)=>{for(var n in t||(t={}))xn.call(t,n)&&ge(e,n,t[n]);if(et)for(var n of et(t))kn.call(t,n)&&ge(e,n,t[n]);return e},N=(e,t)=>Cn(e,_n(t));var Z=(e,t,n)=>ge(e,typeof t!="symbol"?t+"":t,n);var p=(e,t,n)=>new Promise((r,a)=>{var i=c=>{try{s(n.next(c))}catch(l){a(l)}},o=c=>{try{s(n.throw(c))}catch(l){a(l)}},s=c=>c.done?r(c.value):Promise.resolve(c.value).then(i,o);s((n=n.apply(e,t)).next())});import{r as On,a as Dn,g as X}from"../js/chunk-DomL0yj5.js";import{R as x,r as I,a as Rn,b as Pn,B as Mn}from"../js/chunk-3JDXIiR8.js";import{M as Nn,S as Ln,X as Bn,a as jn}from"../js/chunk-D8qEskI5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();var ye={exports:{}},W={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tt;function $n(){if(tt)return W;tt=1;var e=On(),t=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function o(s,c,l){var d,u={},f=null,m=null;l!==void 0&&(f=""+l),c.key!==void 0&&(f=""+c.key),c.ref!==void 0&&(m=c.ref);for(d in c)r.call(c,d)&&!i.hasOwnProperty(d)&&(u[d]=c[d]);if(s&&s.defaultProps)for(d in c=s.defaultProps,c)u[d]===void 0&&(u[d]=c[d]);return{$$typeof:t,type:s,key:f,ref:m,props:u,_owner:a.current}}return W.Fragment=n,W.jsx=o,W.jsxs=o,W}var nt;function Fn(){return nt||(nt=1,ye.exports=$n()),ye.exports}var g=Fn(),Q={},rt;function Hn(){if(rt)return Q;rt=1;var e=Dn();return Q.createRoot=e.createRoot,Q.hydrateRoot=e.hydrateRoot,Q}var qn=Hn();const Un=X(qn);var be={exports:{}},we,at;function Vn(){if(at)return we;at=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return we=e,we}var ve,it;function zn(){if(it)return ve;it=1;var e=Vn();function t(){}function n(){}return n.resetWarningCache=t,ve=function(){function r(o,s,c,l,d,u){if(u!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}r.isRequired=r;function a(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:a,element:r,elementType:r,instanceOf:a,node:r,objectOf:a,oneOf:a,oneOfType:a,shape:a,exact:a,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},ve}var ot;function Wn(){return ot||(ot=1,be.exports=zn()()),be.exports}var Gn=Wn();const y=X(Gn);var Te,st;function Kn(){if(st)return Te;st=1;var e=typeof Element!="undefined",t=typeof Map=="function",n=typeof Set=="function",r=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function a(i,o){if(i===o)return!0;if(i&&o&&typeof i=="object"&&typeof o=="object"){if(i.constructor!==o.constructor)return!1;var s,c,l;if(Array.isArray(i)){if(s=i.length,s!=o.length)return!1;for(c=s;c--!==0;)if(!a(i[c],o[c]))return!1;return!0}var d;if(t&&i instanceof Map&&o instanceof Map){if(i.size!==o.size)return!1;for(d=i.entries();!(c=d.next()).done;)if(!o.has(c.value[0]))return!1;for(d=i.entries();!(c=d.next()).done;)if(!a(c.value[1],o.get(c.value[0])))return!1;return!0}if(n&&i instanceof Set&&o instanceof Set){if(i.size!==o.size)return!1;for(d=i.entries();!(c=d.next()).done;)if(!o.has(c.value[0]))return!1;return!0}if(r&&ArrayBuffer.isView(i)&&ArrayBuffer.isView(o)){if(s=i.length,s!=o.length)return!1;for(c=s;c--!==0;)if(i[c]!==o[c])return!1;return!0}if(i.constructor===RegExp)return i.source===o.source&&i.flags===o.flags;if(i.valueOf!==Object.prototype.valueOf&&typeof i.valueOf=="function"&&typeof o.valueOf=="function")return i.valueOf()===o.valueOf();if(i.toString!==Object.prototype.toString&&typeof i.toString=="function"&&typeof o.toString=="function")return i.toString()===o.toString();if(l=Object.keys(i),s=l.length,s!==Object.keys(o).length)return!1;for(c=s;c--!==0;)if(!Object.prototype.hasOwnProperty.call(o,l[c]))return!1;if(e&&i instanceof Element)return!1;for(c=s;c--!==0;)if(!((l[c]==="_owner"||l[c]==="__v"||l[c]==="__o")&&i.$$typeof)&&!a(i[l[c]],o[l[c]]))return!1;return!0}return i!==i&&o!==o}return Te=function(o,s){try{return a(o,s)}catch(c){if((c.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw c}},Te}var Yn=Kn();const Jn=X(Yn);var Ie,ct;function Xn(){if(ct)return Ie;ct=1;var e=function(t,n,r,a,i,o,s,c){if(!t){var l;if(n===void 0)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var d=[r,a,i,o,s,c],u=0;l=new Error(n.replace(/%s/g,function(){return d[u++]})),l.name="Invariant Violation"}throw l.framesToPop=1,l}};return Ie=e,Ie}var Zn=Xn();const lt=X(Zn);var Ee,ut;function Qn(){return ut||(ut=1,Ee=function(t,n,r,a){var i=r?r.call(a,t,n):void 0;if(i!==void 0)return!!i;if(t===n)return!0;if(typeof t!="object"||!t||typeof n!="object"||!n)return!1;var o=Object.keys(t),s=Object.keys(n);if(o.length!==s.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(n),l=0;l<o.length;l++){var d=o[l];if(!c(d))return!1;var u=t[d],f=n[d];if(i=r?r.call(a,u,f,d):void 0,i===!1||i===void 0&&u!==f)return!1}return!0}),Ee}var er=Qn();const tr=X(er);function v(){return v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},v.apply(this,arguments)}function Ge(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Be(e,t)}function Be(e,t){return Be=Object.setPrototypeOf||function(n,r){return n.__proto__=r,n},Be(e,t)}function dt(e,t){if(e==null)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(n=i[r])>=0||(a[n]=e[n]);return a}var h={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title",FRAGMENT:"Symbol(react.fragment)"},nr={rel:["amphtml","canonical","alternate"]},rr={type:["application/ld+json"]},ar={charset:"",name:["robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]},ft=Object.keys(h).map(function(e){return h[e]}),re={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},ir=Object.keys(re).reduce(function(e,t){return e[re[t]]=t,e},{}),V=function(e,t){for(var n=e.length-1;n>=0;n-=1){var r=e[n];if(Object.prototype.hasOwnProperty.call(r,t))return r[t]}return null},or=function(e){var t=V(e,h.TITLE),n=V(e,"titleTemplate");if(Array.isArray(t)&&(t=t.join("")),n&&t)return n.replace(/%s/g,function(){return t});var r=V(e,"defaultTitle");return t||r||void 0},sr=function(e){return V(e,"onChangeClientState")||function(){}},Se=function(e,t){return t.filter(function(n){return n[e]!==void 0}).map(function(n){return n[e]}).reduce(function(n,r){return v({},n,r)},{})},cr=function(e,t){return t.filter(function(n){return n[h.BASE]!==void 0}).map(function(n){return n[h.BASE]}).reverse().reduce(function(n,r){if(!n.length)for(var a=Object.keys(r),i=0;i<a.length;i+=1){var o=a[i].toLowerCase();if(e.indexOf(o)!==-1&&r[o])return n.concat(r)}return n},[])},G=function(e,t,n){var r={};return n.filter(function(a){return!!Array.isArray(a[e])||(a[e]!==void 0&&console&&typeof console.warn=="function"&&console.warn("Helmet: "+e+' should be of type "Array". Instead found type "'+typeof a[e]+'"'),!1)}).map(function(a){return a[e]}).reverse().reduce(function(a,i){var o={};i.filter(function(u){for(var f,m=Object.keys(u),w=0;w<m.length;w+=1){var T=m[w],C=T.toLowerCase();t.indexOf(C)===-1||f==="rel"&&u[f].toLowerCase()==="canonical"||C==="rel"&&u[C].toLowerCase()==="stylesheet"||(f=C),t.indexOf(T)===-1||T!=="innerHTML"&&T!=="cssText"&&T!=="itemprop"||(f=T)}if(!f||!u[f])return!1;var M=u[f].toLowerCase();return r[f]||(r[f]={}),o[f]||(o[f]={}),!r[f][M]&&(o[f][M]=!0,!0)}).reverse().forEach(function(u){return a.push(u)});for(var s=Object.keys(o),c=0;c<s.length;c+=1){var l=s[c],d=v({},r[l],o[l]);r[l]=d}return a},[]).reverse()},lr=function(e,t){if(Array.isArray(e)&&e.length){for(var n=0;n<e.length;n+=1)if(e[n][t])return!0}return!1},Bt=function(e){return Array.isArray(e)?e.join(""):e},Ae=function(e,t){return Array.isArray(e)?e.reduce(function(n,r){return function(a,i){for(var o=Object.keys(a),s=0;s<o.length;s+=1)if(i[o[s]]&&i[o[s]].includes(a[o[s]]))return!0;return!1}(r,t)?n.priority.push(r):n.default.push(r),n},{priority:[],default:[]}):{default:e}},ht=function(e,t){var n;return v({},e,((n={})[t]=void 0,n))},ur=[h.NOSCRIPT,h.SCRIPT,h.STYLE],Ce=function(e,t){return t===void 0&&(t=!0),t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},pt=function(e){return Object.keys(e).reduce(function(t,n){var r=e[n]!==void 0?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r},"")},mt=function(e,t){return t===void 0&&(t={}),Object.keys(e).reduce(function(n,r){return n[re[r]||r]=e[r],n},t)},te=function(e,t){return t.map(function(n,r){var a,i=((a={key:r})["data-rh"]=!0,a);return Object.keys(n).forEach(function(o){var s=re[o]||o;s==="innerHTML"||s==="cssText"?i.dangerouslySetInnerHTML={__html:n.innerHTML||n.cssText}:i[s]=n[o]}),x.createElement(e,i)})},A=function(e,t,n){switch(e){case h.TITLE:return{toComponent:function(){return a=t.titleAttributes,(i={key:r=t.title})["data-rh"]=!0,o=mt(a,i),[x.createElement(h.TITLE,o,r)];var r,a,i,o},toString:function(){return function(r,a,i,o){var s=pt(i),c=Bt(a);return s?"<"+r+' data-rh="true" '+s+">"+Ce(c,o)+"</"+r+">":"<"+r+' data-rh="true">'+Ce(c,o)+"</"+r+">"}(e,t.title,t.titleAttributes,n)}};case"bodyAttributes":case"htmlAttributes":return{toComponent:function(){return mt(t)},toString:function(){return pt(t)}};default:return{toComponent:function(){return te(e,t)},toString:function(){return function(r,a,i){return a.reduce(function(o,s){var c=Object.keys(s).filter(function(u){return!(u==="innerHTML"||u==="cssText")}).reduce(function(u,f){var m=s[f]===void 0?f:f+'="'+Ce(s[f],i)+'"';return u?u+" "+m:m},""),l=s.innerHTML||s.cssText||"",d=ur.indexOf(r)===-1;return o+"<"+r+' data-rh="true" '+c+(d?"/>":">"+l+"</"+r+">")},"")}(e,t,n)}}}},je=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,a=e.htmlAttributes,i=e.noscriptTags,o=e.styleTags,s=e.title,c=s===void 0?"":s,l=e.titleAttributes,d=e.linkTags,u=e.metaTags,f=e.scriptTags,m={toComponent:function(){},toString:function(){return""}};if(e.prioritizeSeoTags){var w=function(T){var C=T.linkTags,M=T.scriptTags,z=T.encode,he=Ae(T.metaTags,ar),pe=Ae(C,nr),me=Ae(M,rr);return{priorityMethods:{toComponent:function(){return[].concat(te(h.META,he.priority),te(h.LINK,pe.priority),te(h.SCRIPT,me.priority))},toString:function(){return A(h.META,he.priority,z)+" "+A(h.LINK,pe.priority,z)+" "+A(h.SCRIPT,me.priority,z)}},metaTags:he.default,linkTags:pe.default,scriptTags:me.default}}(e);m=w.priorityMethods,d=w.linkTags,u=w.metaTags,f=w.scriptTags}return{priority:m,base:A(h.BASE,t,r),bodyAttributes:A("bodyAttributes",n,r),htmlAttributes:A("htmlAttributes",a,r),link:A(h.LINK,d,r),meta:A(h.META,u,r),noscript:A(h.NOSCRIPT,i,r),script:A(h.SCRIPT,f,r),style:A(h.STYLE,o,r),title:A(h.TITLE,{title:c,titleAttributes:l},r)}},ee=[],$e=function(e,t){var n=this;t===void 0&&(t=typeof document!="undefined"),this.instances=[],this.value={setHelmet:function(r){n.context.helmet=r},helmetInstances:{get:function(){return n.canUseDOM?ee:n.instances},add:function(r){(n.canUseDOM?ee:n.instances).push(r)},remove:function(r){var a=(n.canUseDOM?ee:n.instances).indexOf(r);(n.canUseDOM?ee:n.instances).splice(a,1)}}},this.context=e,this.canUseDOM=t,t||(e.helmet=je({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))},jt=x.createContext({}),dr=y.shape({setHelmet:y.func,helmetInstances:y.shape({get:y.func,add:y.func,remove:y.func})}),fr=typeof document!="undefined",U=function(e){function t(n){var r;return(r=e.call(this,n)||this).helmetData=new $e(r.props.context,t.canUseDOM),r}return Ge(t,e),t.prototype.render=function(){return x.createElement(jt.Provider,{value:this.helmetData.value},this.props.children)},t}(I.Component);U.canUseDOM=fr,U.propTypes={context:y.shape({helmet:y.shape()}),children:y.node.isRequired},U.defaultProps={context:{}},U.displayName="HelmetProvider";var q=function(e,t){var n,r=document.head||document.querySelector(h.HEAD),a=r.querySelectorAll(e+"[data-rh]"),i=[].slice.call(a),o=[];return t&&t.length&&t.forEach(function(s){var c=document.createElement(e);for(var l in s)Object.prototype.hasOwnProperty.call(s,l)&&(l==="innerHTML"?c.innerHTML=s.innerHTML:l==="cssText"?c.styleSheet?c.styleSheet.cssText=s.cssText:c.appendChild(document.createTextNode(s.cssText)):c.setAttribute(l,s[l]===void 0?"":s[l]));c.setAttribute("data-rh","true"),i.some(function(d,u){return n=u,c.isEqualNode(d)})?i.splice(n,1):o.push(c)}),i.forEach(function(s){return s.parentNode.removeChild(s)}),o.forEach(function(s){return r.appendChild(s)}),{oldTags:i,newTags:o}},_e=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute("data-rh"),a=r?r.split(","):[],i=[].concat(a),o=Object.keys(t),s=0;s<o.length;s+=1){var c=o[s],l=t[c]||"";n.getAttribute(c)!==l&&n.setAttribute(c,l),a.indexOf(c)===-1&&a.push(c);var d=i.indexOf(c);d!==-1&&i.splice(d,1)}for(var u=i.length-1;u>=0;u-=1)n.removeAttribute(i[u]);a.length===i.length?n.removeAttribute("data-rh"):n.getAttribute("data-rh")!==o.join(",")&&n.setAttribute("data-rh",o.join(","))}},gt=function(e,t){var n=e.baseTag,r=e.htmlAttributes,a=e.linkTags,i=e.metaTags,o=e.noscriptTags,s=e.onChangeClientState,c=e.scriptTags,l=e.styleTags,d=e.title,u=e.titleAttributes;_e(h.BODY,e.bodyAttributes),_e(h.HTML,r),function(T,C){T!==void 0&&document.title!==T&&(document.title=Bt(T)),_e(h.TITLE,C)}(d,u);var f={baseTag:q(h.BASE,n),linkTags:q(h.LINK,a),metaTags:q(h.META,i),noscriptTags:q(h.NOSCRIPT,o),scriptTags:q(h.SCRIPT,c),styleTags:q(h.STYLE,l)},m={},w={};Object.keys(f).forEach(function(T){var C=f[T],M=C.newTags,z=C.oldTags;M.length&&(m[T]=M),z.length&&(w[T]=f[T].oldTags)}),t&&t(),s(e,m,w)},K=null,ae=function(e){function t(){for(var r,a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(r=e.call.apply(e,[this].concat(i))||this).rendered=!1,r}Ge(t,e);var n=t.prototype;return n.shouldComponentUpdate=function(r){return!tr(r,this.props)},n.componentDidUpdate=function(){this.emitChange()},n.componentWillUnmount=function(){this.props.context.helmetInstances.remove(this),this.emitChange()},n.emitChange=function(){var r,a,i=this.props.context,o=i.setHelmet,s=null,c=(r=i.helmetInstances.get().map(function(l){var d=v({},l.props);return delete d.context,d}),{baseTag:cr(["href"],r),bodyAttributes:Se("bodyAttributes",r),defer:V(r,"defer"),encode:V(r,"encodeSpecialCharacters"),htmlAttributes:Se("htmlAttributes",r),linkTags:G(h.LINK,["rel","href"],r),metaTags:G(h.META,["name","charset","http-equiv","property","itemprop"],r),noscriptTags:G(h.NOSCRIPT,["innerHTML"],r),onChangeClientState:sr(r),scriptTags:G(h.SCRIPT,["src","innerHTML"],r),styleTags:G(h.STYLE,["cssText"],r),title:or(r),titleAttributes:Se("titleAttributes",r),prioritizeSeoTags:lr(r,"prioritizeSeoTags")});U.canUseDOM?(a=c,K&&cancelAnimationFrame(K),a.defer?K=requestAnimationFrame(function(){gt(a,function(){K=null})}):(gt(a),K=null)):je&&(s=je(c)),o(s)},n.init=function(){this.rendered||(this.rendered=!0,this.props.context.helmetInstances.add(this),this.emitChange())},n.render=function(){return this.init(),null},t}(I.Component);ae.propTypes={context:dr.isRequired},ae.displayName="HelmetDispatcher";var hr=["children"],pr=["children"],xe=function(e){function t(){return e.apply(this,arguments)||this}Ge(t,e);var n=t.prototype;return n.shouldComponentUpdate=function(r){return!Jn(ht(this.props,"helmetData"),ht(r,"helmetData"))},n.mapNestedChildrenToProps=function(r,a){if(!a)return null;switch(r.type){case h.SCRIPT:case h.NOSCRIPT:return{innerHTML:a};case h.STYLE:return{cssText:a};default:throw new Error("<"+r.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")}},n.flattenArrayTypeChildren=function(r){var a,i=r.child,o=r.arrayTypeChildren;return v({},o,((a={})[i.type]=[].concat(o[i.type]||[],[v({},r.newChildProps,this.mapNestedChildrenToProps(i,r.nestedChildren))]),a))},n.mapObjectTypeChildren=function(r){var a,i,o=r.child,s=r.newProps,c=r.newChildProps,l=r.nestedChildren;switch(o.type){case h.TITLE:return v({},s,((a={})[o.type]=l,a.titleAttributes=v({},c),a));case h.BODY:return v({},s,{bodyAttributes:v({},c)});case h.HTML:return v({},s,{htmlAttributes:v({},c)});default:return v({},s,((i={})[o.type]=v({},c),i))}},n.mapArrayTypeChildrenToProps=function(r,a){var i=v({},a);return Object.keys(r).forEach(function(o){var s;i=v({},i,((s={})[o]=r[o],s))}),i},n.warnOnInvalidChildren=function(r,a){return lt(ft.some(function(i){return r.type===i}),typeof r.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":"Only elements types "+ft.join(", ")+" are allowed. Helmet does not support rendering <"+r.type+"> elements. Refer to our API for more information."),lt(!a||typeof a=="string"||Array.isArray(a)&&!a.some(function(i){return typeof i!="string"}),"Helmet expects a string as a child of <"+r.type+">. Did you forget to wrap your children in braces? ( <"+r.type+">{``}</"+r.type+"> ) Refer to our API for more information."),!0},n.mapChildrenToProps=function(r,a){var i=this,o={};return x.Children.forEach(r,function(s){if(s&&s.props){var c=s.props,l=c.children,d=dt(c,hr),u=Object.keys(d).reduce(function(m,w){return m[ir[w]||w]=d[w],m},{}),f=s.type;switch(typeof f=="symbol"?f=f.toString():i.warnOnInvalidChildren(s,l),f){case h.FRAGMENT:a=i.mapChildrenToProps(l,a);break;case h.LINK:case h.META:case h.NOSCRIPT:case h.SCRIPT:case h.STYLE:o=i.flattenArrayTypeChildren({child:s,arrayTypeChildren:o,newChildProps:u,nestedChildren:l});break;default:a=i.mapObjectTypeChildren({child:s,newProps:a,newChildProps:u,nestedChildren:l})}}}),this.mapArrayTypeChildrenToProps(o,a)},n.render=function(){var r=this.props,a=r.children,i=dt(r,pr),o=v({},i),s=i.helmetData;return a&&(o=this.mapChildrenToProps(a,o)),!s||s instanceof $e||(s=new $e(s.context,s.instances)),s?x.createElement(ae,v({},o,{context:s.value,helmetData:void 0})):x.createElement(jt.Consumer,null,function(c){return x.createElement(ae,v({},o,{context:c}))})},t}(I.Component);xe.propTypes={base:y.object,bodyAttributes:y.object,children:y.oneOfType([y.arrayOf(y.node),y.node]),defaultTitle:y.string,defer:y.bool,encodeSpecialCharacters:y.bool,htmlAttributes:y.object,link:y.arrayOf(y.object),meta:y.arrayOf(y.object),noscript:y.arrayOf(y.object),onChangeClientState:y.func,script:y.arrayOf(y.object),style:y.arrayOf(y.object),title:y.string,titleAttributes:y.object,titleTemplate:y.string,prioritizeSeoTags:y.bool,helmetData:y.object},xe.defaultProps={defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1},xe.displayName="Helmet";const mr="modulepreload",gr=function(e){return"/"+e},yt={},yr=function(t,n,r){let a=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),s=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));a=c(n.map(l=>{if(l=gr(l),l in yt)return;yt[l]=!0;const d=l.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":mr,d||(f.as="script"),f.crossOrigin="",f.href=l,s&&f.setAttribute("nonce",s),document.head.appendChild(f),d)return new Promise((m,w)=>{f.addEventListener("load",m),f.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(o){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=o,window.dispatchEvent(s),!s.defaultPrevented)throw o}return a.then(o=>{for(const s of o||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})},$t=I.createContext(void 0),br=({children:e})=>{const[t,n]=I.useState(()=>{const i=localStorage.getItem("theme");return i||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")});I.useEffect(()=>{const i=window.document.documentElement;i.classList.remove("light","dark"),i.classList.add(t),localStorage.setItem("theme",t)},[t]);const a={theme:t,toggleTheme:()=>{n(i=>i==="light"?"dark":"light")}};return g.jsx($t.Provider,{value:a,children:e})},wr=()=>{const e=I.useContext($t);if(e===void 0)throw new Error("useTheme must be used within a ThemeProvider");return e},vr="/assets/img_avatar-DYZE4tZ2.webp",Tr=()=>{};var bt={};/**
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
 */const Ft=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let a=e.charCodeAt(r);a<128?t[n++]=a:a<2048?(t[n++]=a>>6|192,t[n++]=a&63|128):(a&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(a=65536+((a&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=a>>18|240,t[n++]=a>>12&63|128,t[n++]=a>>6&63|128,t[n++]=a&63|128):(t[n++]=a>>12|224,t[n++]=a>>6&63|128,t[n++]=a&63|128)}return t},Ir=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const a=e[n++];if(a<128)t[r++]=String.fromCharCode(a);else if(a>191&&a<224){const i=e[n++];t[r++]=String.fromCharCode((a&31)<<6|i&63)}else if(a>239&&a<365){const i=e[n++],o=e[n++],s=e[n++],c=((a&7)<<18|(i&63)<<12|(o&63)<<6|s&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{const i=e[n++],o=e[n++];t[r++]=String.fromCharCode((a&15)<<12|(i&63)<<6|o&63)}}return t.join("")},Ht={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let a=0;a<e.length;a+=3){const i=e[a],o=a+1<e.length,s=o?e[a+1]:0,c=a+2<e.length,l=c?e[a+2]:0,d=i>>2,u=(i&3)<<4|s>>4;let f=(s&15)<<2|l>>6,m=l&63;c||(m=64,o||(f=64)),r.push(n[d],n[u],n[f],n[m])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Ft(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):Ir(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let a=0;a<e.length;){const i=n[e.charAt(a++)],s=a<e.length?n[e.charAt(a)]:0;++a;const l=a<e.length?n[e.charAt(a)]:64;++a;const u=a<e.length?n[e.charAt(a)]:64;if(++a,i==null||s==null||l==null||u==null)throw new Er;const f=i<<2|s>>4;if(r.push(f),l!==64){const m=s<<4&240|l>>2;if(r.push(m),u!==64){const w=l<<6&192|u;r.push(w)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class Er extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Sr=function(e){const t=Ft(e);return Ht.encodeByteArray(t,!0)},qt=function(e){return Sr(e).replace(/\./g,"")},Ar=function(e){try{return Ht.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function Cr(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}/**
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
 */const _r=()=>Cr().__FIREBASE_DEFAULTS__,xr=()=>{if(typeof process=="undefined"||typeof bt=="undefined")return;const e=bt.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},kr=()=>{if(typeof document=="undefined")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&Ar(e[1]);return t&&JSON.parse(t)},Or=()=>{try{return Tr()||_r()||xr()||kr()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},Ut=()=>{var e;return(e=Or())==null?void 0:e.config};/**
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
 */class Dr{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}function Rr(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function Vt(){try{return typeof indexedDB=="object"}catch(e){return!1}}function zt(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(r);a.onsuccess=()=>{a.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},a.onupgradeneeded=()=>{n=!1},a.onerror=()=>{var i;t(((i=a.error)==null?void 0:i.message)||"")}}catch(n){t(n)}})}function Pr(){return!(typeof navigator=="undefined"||!navigator.cookieEnabled)}/**
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
 */const Mr="FirebaseError";class H extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=Mr,Object.setPrototypeOf(this,H.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,le.prototype.create)}}class le{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},a=`${this.service}/${t}`,i=this.errors[t],o=i?Nr(i,r):"Error",s=`${this.serviceName}: ${o} (${a}).`;return new H(a,s,r)}}function Nr(e,t){return e.replace(Lr,(n,r)=>{const a=t[r];return a!=null?String(a):`<${r}?>`})}const Lr=/\{\$([^}]+)}/g;function ie(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const a of n){if(!r.includes(a))return!1;const i=e[a],o=t[a];if(wt(i)&&wt(o)){if(!ie(i,o))return!1}else if(i!==o)return!1}for(const a of r)if(!n.includes(a))return!1;return!0}function wt(e){return e!==null&&typeof e=="object"}/**
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
 */const Br=1e3,jr=2,$r=14400*1e3,Fr=.5;function vt(e,t=Br,n=jr){const r=t*Math.pow(n,e),a=Math.round(Fr*r*(Math.random()-.5)*2);return Math.min($r,r+a)}/**
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
 */function Wt(e){return e&&e._delegate?e._delegate:e}class P{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */class Hr{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new Dr;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const a=this.getOrInitializeService({instanceIdentifier:n});a&&r.resolve(a)}catch(a){}}return this.instancesDeferred.get(n).promise}getImmediate(t){var a;const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(a=t==null?void 0:t.optional)!=null?a:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Ur(t))try{this.getOrInitializeService({instanceIdentifier:L})}catch(n){}for(const[n,r]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:a});r.resolve(i)}catch(i){}}}}clearInstance(t=L){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}delete(){return p(this,null,function*(){const t=Array.from(this.instances.values());yield Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])})}isComponentSet(){return this.component!=null}isInitialized(t=L){return this.instances.has(t)}getOptions(t=L){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(i);r===s&&o.resolve(a)}return a}onInit(t,n){var o;const r=this.normalizeInstanceIdentifier(n),a=(o=this.onInitCallbacks.get(r))!=null?o:new Set;a.add(t),this.onInitCallbacks.set(r,a);const i=this.instances.get(r);return i&&t(i,r),()=>{a.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const a of r)try{a(t,n)}catch(i){}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:qr(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch(a){}return r||null}normalizeInstanceIdentifier(t=L){return this.component?this.component.multipleInstances?t:L:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function qr(e){return e===L?void 0:e}function Ur(e){return e.instantiationMode==="EAGER"}/**
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
 */class Vr{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new Hr(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var b;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(b||(b={}));const zr={debug:b.DEBUG,verbose:b.VERBOSE,info:b.INFO,warn:b.WARN,error:b.ERROR,silent:b.SILENT},Wr=b.INFO,Gr={[b.DEBUG]:"log",[b.VERBOSE]:"log",[b.INFO]:"info",[b.WARN]:"warn",[b.ERROR]:"error"},Kr=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),a=Gr[t];if(a)console[a](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Gt{constructor(t){this.name=t,this._logLevel=Wr,this._logHandler=Kr,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in b))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?zr[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,b.DEBUG,...t),this._logHandler(this,b.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,b.VERBOSE,...t),this._logHandler(this,b.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,b.INFO,...t),this._logHandler(this,b.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,b.WARN,...t),this._logHandler(this,b.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,b.ERROR,...t),this._logHandler(this,b.ERROR,...t)}}const Yr=(e,t)=>t.some(n=>e instanceof n);let Tt,It;function Jr(){return Tt||(Tt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Xr(){return It||(It=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Kt=new WeakMap,Fe=new WeakMap,Yt=new WeakMap,ke=new WeakMap,Ke=new WeakMap;function Zr(e){const t=new Promise((n,r)=>{const a=()=>{e.removeEventListener("success",i),e.removeEventListener("error",o)},i=()=>{n(O(e.result)),a()},o=()=>{r(e.error),a()};e.addEventListener("success",i),e.addEventListener("error",o)});return t.then(n=>{n instanceof IDBCursor&&Kt.set(n,e)}).catch(()=>{}),Ke.set(t,e),t}function Qr(e){if(Fe.has(e))return;const t=new Promise((n,r)=>{const a=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",o),e.removeEventListener("abort",o)},i=()=>{n(),a()},o=()=>{r(e.error||new DOMException("AbortError","AbortError")),a()};e.addEventListener("complete",i),e.addEventListener("error",o),e.addEventListener("abort",o)});Fe.set(e,t)}let He={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return Fe.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Yt.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return O(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function ea(e){He=e(He)}function ta(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(Oe(this),t,...n);return Yt.set(r,t.sort?t.sort():[t]),O(r)}:Xr().includes(e)?function(...t){return e.apply(Oe(this),t),O(Kt.get(this))}:function(...t){return O(e.apply(Oe(this),t))}}function na(e){return typeof e=="function"?ta(e):(e instanceof IDBTransaction&&Qr(e),Yr(e,Jr())?new Proxy(e,He):e)}function O(e){if(e instanceof IDBRequest)return Zr(e);if(ke.has(e))return ke.get(e);const t=na(e);return t!==e&&(ke.set(e,t),Ke.set(t,e)),t}const Oe=e=>Ke.get(e);function Jt(e,t,{blocked:n,upgrade:r,blocking:a,terminated:i}={}){const o=indexedDB.open(e,t),s=O(o);return r&&o.addEventListener("upgradeneeded",c=>{r(O(o.result),c.oldVersion,c.newVersion,O(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),s.then(c=>{i&&c.addEventListener("close",()=>i()),a&&c.addEventListener("versionchange",l=>a(l.oldVersion,l.newVersion,l))}).catch(()=>{}),s}const ra=["get","getKey","getAll","getAllKeys","count"],aa=["put","add","delete","clear"],De=new Map;function Et(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(De.get(t))return De.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,a=aa.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(a||ra.includes(n)))return;const i=function(o,...s){return p(this,null,function*(){const c=this.transaction(o,a?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(s.shift())),(yield Promise.all([l[n](...s),a&&c.done]))[0]})};return De.set(t,i),i}ea(e=>N(_({},e),{get:(t,n,r)=>Et(t,n)||e.get(t,n,r),has:(t,n)=>!!Et(t,n)||e.has(t,n)}));/**
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
 */class ia{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(oa(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function oa(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const qe="@firebase/app",St="0.14.1";/**
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
 */const k=new Gt("@firebase/app"),sa="@firebase/app-compat",ca="@firebase/analytics-compat",la="@firebase/analytics",ua="@firebase/app-check-compat",da="@firebase/app-check",fa="@firebase/auth",ha="@firebase/auth-compat",pa="@firebase/database",ma="@firebase/data-connect",ga="@firebase/database-compat",ya="@firebase/functions",ba="@firebase/functions-compat",wa="@firebase/installations",va="@firebase/installations-compat",Ta="@firebase/messaging",Ia="@firebase/messaging-compat",Ea="@firebase/performance",Sa="@firebase/performance-compat",Aa="@firebase/remote-config",Ca="@firebase/remote-config-compat",_a="@firebase/storage",xa="@firebase/storage-compat",ka="@firebase/firestore",Oa="@firebase/ai",Da="@firebase/firestore-compat",Ra="firebase";/**
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
 */const Ue="[DEFAULT]",Pa={[qe]:"fire-core",[sa]:"fire-core-compat",[la]:"fire-analytics",[ca]:"fire-analytics-compat",[da]:"fire-app-check",[ua]:"fire-app-check-compat",[fa]:"fire-auth",[ha]:"fire-auth-compat",[pa]:"fire-rtdb",[ma]:"fire-data-connect",[ga]:"fire-rtdb-compat",[ya]:"fire-fn",[ba]:"fire-fn-compat",[wa]:"fire-iid",[va]:"fire-iid-compat",[Ta]:"fire-fcm",[Ia]:"fire-fcm-compat",[Ea]:"fire-perf",[Sa]:"fire-perf-compat",[Aa]:"fire-rc",[Ca]:"fire-rc-compat",[_a]:"fire-gcs",[xa]:"fire-gcs-compat",[ka]:"fire-fst",[Da]:"fire-fst-compat",[Oa]:"fire-vertex","fire-js":"fire-js",[Ra]:"fire-js-all"};/**
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
 */const oe=new Map,Ma=new Map,Ve=new Map;function At(e,t){try{e.container.addComponent(t)}catch(n){k.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function j(e){const t=e.name;if(Ve.has(t))return k.debug(`There were multiple attempts to register component ${t}.`),!1;Ve.set(t,e);for(const n of oe.values())At(n,e);for(const n of Ma.values())At(n,e);return!0}function ue(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}/**
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
 */const Na={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},D=new le("app","Firebase",Na);/**
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
 */class La{constructor(t,n,r){this._isDeleted=!1,this._options=_({},t),this._config=_({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new P("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw D.create("app-deleted",{appName:this._name})}}function Xt(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r=_({name:Ue,automaticDataCollectionEnabled:!0},t),a=r.name;if(typeof a!="string"||!a)throw D.create("bad-app-name",{appName:String(a)});if(n||(n=Ut()),!n)throw D.create("no-options");const i=oe.get(a);if(i){if(ie(n,i.options)&&ie(r,i.config))return i;throw D.create("duplicate-app",{appName:a})}const o=new Vr(a);for(const c of Ve.values())o.addComponent(c);const s=new La(n,r,o);return oe.set(a,s),s}function Ba(e=Ue){const t=oe.get(e);if(!t&&e===Ue&&Ut())return Xt();if(!t)throw D.create("no-app",{appName:e});return t}function R(e,t,n){var o;let r=(o=Pa[e])!=null?o:e;n&&(r+=`-${n}`);const a=r.match(/\s|\//),i=t.match(/\s|\//);if(a||i){const s=[`Unable to register library "${r}" with version "${t}":`];a&&s.push(`library name "${r}" contains illegal characters (whitespace or "/")`),a&&i&&s.push("and"),i&&s.push(`version name "${t}" contains illegal characters (whitespace or "/")`),k.warn(s.join(" "));return}j(new P(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
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
 */const ja="firebase-heartbeat-database",$a=1,J="firebase-heartbeat-store";let Re=null;function Zt(){return Re||(Re=Jt(ja,$a,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(J)}catch(n){console.warn(n)}}}}).catch(e=>{throw D.create("idb-open",{originalErrorMessage:e.message})})),Re}function Fa(e){return p(this,null,function*(){try{const n=(yield Zt()).transaction(J),r=yield n.objectStore(J).get(Qt(e));return yield n.done,r}catch(t){if(t instanceof H)k.warn(t.message);else{const n=D.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});k.warn(n.message)}}})}function Ct(e,t){return p(this,null,function*(){try{const r=(yield Zt()).transaction(J,"readwrite");yield r.objectStore(J).put(t,Qt(e)),yield r.done}catch(n){if(n instanceof H)k.warn(n.message);else{const r=D.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});k.warn(r.message)}}})}function Qt(e){return`${e.name}!${e.options.appId}`}/**
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
 */const Ha=1024,qa=30;class Ua{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new za(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}triggerHeartbeat(){return p(this,null,function*(){var t,n;try{const a=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=_t();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=yield this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:a}),this._heartbeatsCache.heartbeats.length>qa){const o=Wa(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){k.warn(r)}})}getHeartbeatsHeader(){return p(this,null,function*(){var t;try{if(this._heartbeatsCache===null&&(yield this._heartbeatsCachePromise),((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=_t(),{heartbeatsToSend:r,unsentEntries:a}=Va(this._heartbeatsCache.heartbeats),i=qt(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,a.length>0?(this._heartbeatsCache.heartbeats=a,yield this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return k.warn(n),""}})}}function _t(){return new Date().toISOString().substring(0,10)}function Va(e,t=Ha){const n=[];let r=e.slice();for(const a of e){const i=n.find(o=>o.agent===a.agent);if(i){if(i.dates.push(a.date),xt(n)>t){i.dates.pop();break}}else if(n.push({agent:a.agent,dates:[a.date]}),xt(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class za{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}runIndexedDBEnvironmentCheck(){return p(this,null,function*(){return Vt()?zt().then(()=>!0).catch(()=>!1):!1})}read(){return p(this,null,function*(){if(yield this._canUseIndexedDBPromise){const n=yield Fa(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}})}overwrite(t){return p(this,null,function*(){var r;if(yield this._canUseIndexedDBPromise){const a=yield this.read();return Ct(this.app,{lastSentHeartbeatDate:(r=t.lastSentHeartbeatDate)!=null?r:a.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return})}add(t){return p(this,null,function*(){var r;if(yield this._canUseIndexedDBPromise){const a=yield this.read();return Ct(this.app,{lastSentHeartbeatDate:(r=t.lastSentHeartbeatDate)!=null?r:a.lastSentHeartbeatDate,heartbeats:[...a.heartbeats,...t.heartbeats]})}else return})}}function xt(e){return qt(JSON.stringify({version:2,heartbeats:e})).length}function Wa(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}/**
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
 */function Ga(e){j(new P("platform-logger",t=>new ia(t),"PRIVATE")),j(new P("heartbeat",t=>new Ua(t),"PRIVATE")),R(qe,St,e),R(qe,St,"esm2020"),R("fire-js","")}Ga("");const en="@firebase/installations",Ye="0.6.19";/**
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
 */const tn=1e4,nn=`w:${Ye}`,rn="FIS_v2",Ka="https://firebaseinstallations.googleapis.com/v1",Ya=3600*1e3,Ja="installations",Xa="Installations";/**
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
 */const Za={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},$=new le(Ja,Xa,Za);function an(e){return e instanceof H&&e.code.includes("request-failed")}/**
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
 */function on({projectId:e}){return`${Ka}/projects/${e}/installations`}function sn(e){return{token:e.token,requestStatus:2,expiresIn:ei(e.expiresIn),creationTime:Date.now()}}function cn(e,t){return p(this,null,function*(){const r=(yield t.json()).error;return $.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})})}function ln({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Qa(e,{refreshToken:t}){const n=ln(e);return n.append("Authorization",ti(t)),n}function un(e){return p(this,null,function*(){const t=yield e();return t.status>=500&&t.status<600?e():t})}function ei(e){return Number(e.replace("s","000"))}function ti(e){return`${rn} ${e}`}/**
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
 */function ni(r,a){return p(this,arguments,function*({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const i=on(e),o=ln(e),s=t.getImmediate({optional:!0});if(s){const u=yield s.getHeartbeatsHeader();u&&o.append("x-firebase-client",u)}const c={fid:n,authVersion:rn,appId:e.appId,sdkVersion:nn},l={method:"POST",headers:o,body:JSON.stringify(c)},d=yield un(()=>fetch(i,l));if(d.ok){const u=yield d.json();return{fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:sn(u.authToken)}}else throw yield cn("Create Installation",d)})}/**
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
 */function dn(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */function ri(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const ai=/^[cdef][\w-]{21}$/,ze="";function ii(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=oi(e);return ai.test(n)?n:ze}catch(e){return ze}}function oi(e){return ri(e).substr(0,22)}/**
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
 */function de(e){return`${e.appName}!${e.appId}`}/**
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
 */const fn=new Map;function hn(e,t){const n=de(e);pn(n,t),si(n,t)}function pn(e,t){const n=fn.get(e);if(n)for(const r of n)r(t)}function si(e,t){const n=ci();n&&n.postMessage({key:e,fid:t}),li()}let B=null;function ci(){return!B&&"BroadcastChannel"in self&&(B=new BroadcastChannel("[Firebase] FID Change"),B.onmessage=e=>{pn(e.data.key,e.data.fid)}),B}function li(){fn.size===0&&B&&(B.close(),B=null)}/**
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
 */const ui="firebase-installations-database",di=1,F="firebase-installations-store";let Pe=null;function Je(){return Pe||(Pe=Jt(ui,di,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(F)}}})),Pe}function se(e,t){return p(this,null,function*(){const n=de(e),a=(yield Je()).transaction(F,"readwrite"),i=a.objectStore(F),o=yield i.get(n);return yield i.put(t,n),yield a.done,(!o||o.fid!==t.fid)&&hn(e,t.fid),t})}function mn(e){return p(this,null,function*(){const t=de(e),r=(yield Je()).transaction(F,"readwrite");yield r.objectStore(F).delete(t),yield r.done})}function fe(e,t){return p(this,null,function*(){const n=de(e),a=(yield Je()).transaction(F,"readwrite"),i=a.objectStore(F),o=yield i.get(n),s=t(o);return s===void 0?yield i.delete(n):yield i.put(s,n),yield a.done,s&&(!o||o.fid!==s.fid)&&hn(e,s.fid),s})}/**
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
 */function Xe(e){return p(this,null,function*(){let t;const n=yield fe(e.appConfig,r=>{const a=fi(r),i=hi(e,a);return t=i.registrationPromise,i.installationEntry});return n.fid===ze?{installationEntry:yield t}:{installationEntry:n,registrationPromise:t}})}function fi(e){const t=e||{fid:ii(),registrationStatus:0};return gn(t)}function hi(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const a=Promise.reject($.create("app-offline"));return{installationEntry:t,registrationPromise:a}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=pi(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:mi(e)}:{installationEntry:t}}function pi(e,t){return p(this,null,function*(){try{const n=yield ni(e,t);return se(e.appConfig,n)}catch(n){throw an(n)&&n.customData.serverCode===409?yield mn(e.appConfig):yield se(e.appConfig,{fid:t.fid,registrationStatus:0}),n}})}function mi(e){return p(this,null,function*(){let t=yield kt(e.appConfig);for(;t.registrationStatus===1;)yield dn(100),t=yield kt(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=yield Xe(e);return r||n}return t})}function kt(e){return fe(e,t=>{if(!t)throw $.create("installation-not-found");return gn(t)})}function gn(e){return gi(e)?{fid:e.fid,registrationStatus:0}:e}function gi(e){return e.registrationStatus===1&&e.registrationTime+tn<Date.now()}/**
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
 */function yi(r,a){return p(this,arguments,function*({appConfig:e,heartbeatServiceProvider:t},n){const i=bi(e,n),o=Qa(e,n),s=t.getImmediate({optional:!0});if(s){const u=yield s.getHeartbeatsHeader();u&&o.append("x-firebase-client",u)}const c={installation:{sdkVersion:nn,appId:e.appId}},l={method:"POST",headers:o,body:JSON.stringify(c)},d=yield un(()=>fetch(i,l));if(d.ok){const u=yield d.json();return sn(u)}else throw yield cn("Generate Auth Token",d)})}function bi(e,{fid:t}){return`${on(e)}/${t}/authTokens:generate`}/**
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
 */function Ze(e,t=!1){return p(this,null,function*(){let n;const r=yield fe(e.appConfig,i=>{if(!yn(i))throw $.create("not-registered");const o=i.authToken;if(!t&&Ti(o))return i;if(o.requestStatus===1)return n=wi(e,t),i;{if(!navigator.onLine)throw $.create("app-offline");const s=Ei(i);return n=vi(e,s),s}});return n?yield n:r.authToken})}function wi(e,t){return p(this,null,function*(){let n=yield Ot(e.appConfig);for(;n.authToken.requestStatus===1;)yield dn(100),n=yield Ot(e.appConfig);const r=n.authToken;return r.requestStatus===0?Ze(e,t):r})}function Ot(e){return fe(e,t=>{if(!yn(t))throw $.create("not-registered");const n=t.authToken;return Si(n)?N(_({},t),{authToken:{requestStatus:0}}):t})}function vi(e,t){return p(this,null,function*(){try{const n=yield yi(e,t),r=N(_({},t),{authToken:n});return yield se(e.appConfig,r),n}catch(n){if(an(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))yield mn(e.appConfig);else{const r=N(_({},t),{authToken:{requestStatus:0}});yield se(e.appConfig,r)}throw n}})}function yn(e){return e!==void 0&&e.registrationStatus===2}function Ti(e){return e.requestStatus===2&&!Ii(e)}function Ii(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Ya}function Ei(e){const t={requestStatus:1,requestTime:Date.now()};return N(_({},e),{authToken:t})}function Si(e){return e.requestStatus===1&&e.requestTime+tn<Date.now()}/**
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
 */function Ai(e){return p(this,null,function*(){const t=e,{installationEntry:n,registrationPromise:r}=yield Xe(t);return r?r.catch(console.error):Ze(t).catch(console.error),n.fid})}/**
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
 */function Ci(e,t=!1){return p(this,null,function*(){const n=e;return yield _i(n),(yield Ze(n,t)).token})}function _i(e){return p(this,null,function*(){const{registrationPromise:t}=yield Xe(e);t&&(yield t)})}/**
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
 */function xi(e){if(!e||!e.options)throw Me("App Configuration");if(!e.name)throw Me("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Me(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function Me(e){return $.create("missing-app-config-values",{valueName:e})}/**
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
 */const bn="installations",ki="installations-internal",Oi=e=>{const t=e.getProvider("app").getImmediate(),n=xi(t),r=ue(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Di=e=>{const t=e.getProvider("app").getImmediate(),n=ue(t,bn).getImmediate();return{getId:()=>Ai(n),getToken:a=>Ci(n,a)}};function Ri(){j(new P(bn,Oi,"PUBLIC")),j(new P(ki,Di,"PRIVATE"))}Ri();R(en,Ye);R(en,Ye,"esm2020");/**
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
 */const ce="analytics",Pi="firebase_id",Mi="origin",Ni=60*1e3,Li="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Qe="https://www.googletagmanager.com/gtag/js";/**
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
 */const E=new Gt("@firebase/analytics");/**
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
 */const Bi={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},S=new le("analytics","Analytics",Bi);/**
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
 */function ji(e){if(!e.startsWith(Qe)){const t=S.create("invalid-gtag-resource",{gtagURL:e});return E.warn(t.message),""}return e}function wn(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function $i(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function Fi(e,t){const n=$i("firebase-js-sdk-policy",{createScriptURL:ji}),r=document.createElement("script"),a=`${Qe}?l=${e}&id=${t}`;r.src=n?n==null?void 0:n.createScriptURL(a):a,r.async=!0,document.head.appendChild(r)}function Hi(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}function qi(e,t,n,r,a,i){return p(this,null,function*(){const o=r[a];try{if(o)yield t[o];else{const c=(yield wn(n)).find(l=>l.measurementId===a);c&&(yield t[c.appId])}}catch(s){E.error(s)}e("config",a,i)})}function Ui(e,t,n,r,a){return p(this,null,function*(){try{let i=[];if(a&&a.send_to){let o=a.send_to;Array.isArray(o)||(o=[o]);const s=yield wn(n);for(const c of o){const l=s.find(u=>u.measurementId===c),d=l&&t[l.appId];if(d)i.push(d);else{i=[];break}}}i.length===0&&(i=Object.values(t)),yield Promise.all(i),e("event",r,a||{})}catch(i){E.error(i)}})}function Vi(e,t,n,r){function a(i,...o){return p(this,null,function*(){try{if(i==="event"){const[s,c]=o;yield Ui(e,t,n,s,c)}else if(i==="config"){const[s,c]=o;yield qi(e,t,n,r,s,c)}else if(i==="consent"){const[s,c]=o;e("consent",s,c)}else if(i==="get"){const[s,c,l]=o;e("get",s,c,l)}else if(i==="set"){const[s]=o;e("set",s)}else e(i,...o)}catch(s){E.error(s)}})}return a}function zi(e,t,n,r,a){let i=function(...o){window[r].push(arguments)};return window[a]&&typeof window[a]=="function"&&(i=window[a]),window[a]=Vi(i,e,t,n),{gtagCore:i,wrappedGtag:window[a]}}function Wi(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(Qe)&&n.src.includes(e))return n;return null}/**
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
 */const Gi=30,Ki=1e3;class Yi{constructor(t={},n=Ki){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const vn=new Yi;function Ji(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}function Xi(e){return p(this,null,function*(){var o;const{appId:t,apiKey:n}=e,r={method:"GET",headers:Ji(n)},a=Li.replace("{app-id}",t),i=yield fetch(a,r);if(i.status!==200&&i.status!==304){let s="";try{const c=yield i.json();(o=c.error)!=null&&o.message&&(s=c.error.message)}catch(c){}throw S.create("config-fetch-failed",{httpStatus:i.status,responseMessage:s})}return i.json()})}function Zi(r){return p(this,arguments,function*(e,t=vn,n){const{appId:a,apiKey:i,measurementId:o}=e.options;if(!a)throw S.create("no-app-id");if(!i){if(o)return{measurementId:o,appId:a};throw S.create("no-api-key")}const s=t.getThrottleMetadata(a)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new to;return setTimeout(()=>p(null,null,function*(){c.abort()}),Ni),Tn({appId:a,apiKey:i,measurementId:o},s,c,t)})}function Tn(i,o,s){return p(this,arguments,function*(e,{throttleEndTimeMillis:t,backoffCount:n},r,a=vn){var d;const{appId:c,measurementId:l}=e;try{yield Qi(r,t)}catch(u){if(l)return E.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:c,measurementId:l};throw u}try{const u=yield Xi(e);return a.deleteThrottleMetadata(c),u}catch(u){const f=u;if(!eo(f)){if(a.deleteThrottleMetadata(c),l)return E.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${f==null?void 0:f.message}]`),{appId:c,measurementId:l};throw u}const m=Number((d=f==null?void 0:f.customData)==null?void 0:d.httpStatus)===503?vt(n,a.intervalMillis,Gi):vt(n,a.intervalMillis),w={throttleEndTimeMillis:Date.now()+m,backoffCount:n+1};return a.setThrottleMetadata(c,w),E.debug(`Calling attemptFetch again in ${m} millis`),Tn(e,w,r,a)}})}function Qi(e,t){return new Promise((n,r)=>{const a=Math.max(t-Date.now(),0),i=setTimeout(n,a);e.addEventListener(()=>{clearTimeout(i),r(S.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function eo(e){if(!(e instanceof H)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class to{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}function no(e,t,n,r,a){return p(this,null,function*(){if(a&&a.global){e("event",n,r);return}else{const i=yield t,o=N(_({},r),{send_to:i});e("event",n,o)}})}/**
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
 */function ro(){return p(this,null,function*(){if(Vt())try{yield zt()}catch(e){return E.warn(S.create("indexeddb-unavailable",{errorInfo:e==null?void 0:e.toString()}).message),!1}else return E.warn(S.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0})}function ao(e,t,n,r,a,i,o){return p(this,null,function*(){var f;const s=Zi(e);s.then(m=>{n[m.measurementId]=m.appId,e.options.measurementId&&m.measurementId!==e.options.measurementId&&E.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>E.error(m)),t.push(s);const c=ro().then(m=>{if(m)return r.getId()}),[l,d]=yield Promise.all([s,c]);Wi(i)||Fi(i,l.measurementId),a("js",new Date);const u=(f=o==null?void 0:o.config)!=null?f:{};return u[Mi]="firebase",u.update=!0,d!=null&&(u[Pi]=d),a("config",l.measurementId,u),l.measurementId})}/**
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
 */class io{constructor(t){this.app=t}_delete(){return delete Y[this.app.options.appId],Promise.resolve()}}let Y={},Dt=[];const Rt={};let Ne="dataLayer",oo="gtag",Pt,In,Mt=!1;function so(){const e=[];if(Rr()&&e.push("This is a browser extension environment."),Pr()||e.push("Cookies are not available."),e.length>0){const t=e.map((r,a)=>`(${a+1}) ${r}`).join(" "),n=S.create("invalid-analytics-context",{errorInfo:t});E.warn(n.message)}}function co(e,t,n){so();const r=e.options.appId;if(!r)throw S.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)E.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw S.create("no-api-key");if(Y[r]!=null)throw S.create("already-exists",{id:r});if(!Mt){Hi(Ne);const{wrappedGtag:i,gtagCore:o}=zi(Y,Dt,Rt,Ne,oo);In=i,Pt=o,Mt=!0}return Y[r]=ao(e,Dt,Rt,t,Pt,Ne,n),new io(e)}function lo(e=Ba()){e=Wt(e);const t=ue(e,ce);return t.isInitialized()?t.getImmediate():uo(e)}function uo(e,t={}){const n=ue(e,ce);if(n.isInitialized()){const a=n.getImmediate();if(ie(t,n.getOptions()))return a;throw S.create("already-initialized")}return n.initialize({options:t})}function En(e,t,n,r){e=Wt(e),no(In,Y[e.app.options.appId],t,n,r).catch(a=>E.error(a))}const Nt="@firebase/analytics",Lt="0.10.18";function fo(){j(new P(ce,(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),a=t.getProvider("installations-internal").getImmediate();return co(r,a,n)},"PUBLIC")),j(new P("analytics-internal",e,"PRIVATE")),R(Nt,Lt),R(Nt,Lt,"esm2020");function e(t){try{const n=t.getProvider(ce).getImmediate();return{logEvent:(r,a,i)=>En(n,r,a,i)}}catch(n){throw S.create("interop-component-reg-failed",{reason:n})}}}fo();var ho="firebase",po="12.1.0";/**
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
 */R(ho,po,"app");const mo={apiKey:"AIzaSyCSR2TiaMwWx-NY9BVpHM2PbxannEBzlNU",authDomain:"fakhry-showcase-v2.firebaseapp.com",projectId:"fakhry-showcase-v2",storageBucket:"fakhry-showcase-v2.firebasestorage.app",messagingSenderId:"686700373210",appId:"1:686700373210:web:5b9c63f4e214511ae171e3",measurementId:"G-29VSW7CMFR"},go=Xt(mo),yo=lo(go),Sn=()=>{const e=I.useRef(null);I.useEffect(()=>{e.current=yo},[]);const t=(o,s)=>{e.current&&En(e.current,o,s)};return{trackEvent:t,trackPageView:o=>{t("page_view",{page_name:o})},trackButtonClick:(o,s)=>{t("button_click",{button_name:o,location:s})},trackProjectView:o=>{t("project_view",{project_name:o})},trackContactClick:o=>{t("contact_click",{contact_method:o})}}},Lo=(e={})=>{const t=I.useRef(null),n=I.useCallback(()=>t.current?Array.from(t.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]')):[],[]),r=I.useCallback(a=>{const{key:i,target:o}=a,s=n();if(!s.length)return;const c=s.indexOf(o),l=c===0,d=c===s.length-1;switch(i){case"Escape":e.onEscape&&(a.preventDefault(),e.onEscape());break;case"Enter":e.onEnter&&(a.preventDefault(),e.onEnter());break;case" ":e.onSpace&&(a.preventDefault(),e.onSpace());break;case"Tab":e.trapFocus&&(a.shiftKey?l&&(a.preventDefault(),s[s.length-1].focus()):d&&(a.preventDefault(),s[0].focus()));break;case"ArrowDown":case"ArrowRight":a.preventDefault(),c<s.length-1?s[c+1].focus():e.trapFocus&&s[0].focus();break;case"ArrowUp":case"ArrowLeft":a.preventDefault(),c>0?s[c-1].focus():e.trapFocus&&s[s.length-1].focus();break}},[e,n]);return I.useEffect(()=>{if(t.current&&e.autoFocus){const i=n();i.length>0&&i[0].focus()}},[e.autoFocus,n]),{containerRef:t,getFocusableElements:n,handleKeyDown:r}},ne={announce:(e,t="polite")=>{const n=document.createElement("div");n.setAttribute("aria-live",t),n.setAttribute("aria-atomic","true"),n.className="sr-only",n.textContent=e,document.body.appendChild(n),window.setTimeout(()=>{document.body.contains(n)&&document.body.removeChild(n)},1e3)},skipToMain:()=>{const e=document.querySelector("main");e&&(e.focus(),ne.announce("Navigated to main content"))},focusFirstElement:e=>{const t=Array.from(e.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));t.length>0&&t[0].focus()},isElementVisible:e=>{const t=e.getBoundingClientRect(),n=window.getComputedStyle(e);return t.width>0&&t.height>0&&n.visibility!=="hidden"&&n.display!=="none"&&n.opacity!=="0"}},bo=()=>{const{theme:e,toggleTheme:t}=wr(),[n,r]=I.useState(!1),{trackButtonClick:a}=Sn(),i=[{name:"Home",href:"#home"},{name:"Projects",href:"#projects"},{name:"Experience",href:"#experience"},{name:"Contact",href:"#contact"}],o=(l,d)=>{const u=document.querySelector(l);u&&(u.scrollIntoView({behavior:"smooth"}),ne.announce(`Navigated to ${d} section`)),a(`nav_${d.toLowerCase()}`,"header"),r(!1)},s=()=>{a("theme_toggle","header"),ne.announce(`Switched to ${e==="light"?"dark":"light"} mode`),t()},c=()=>{a("mobile_menu_toggle","header");const l=!n;r(l),ne.announce(`Mobile menu ${l?"opened":"closed"}`)};return g.jsx("header",{className:"fixed top-0 left-0 right-0 z-50 transition-all duration-300 'bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-md shadow-lg'",role:"banner",children:g.jsxs("div",{className:"container px-4 sm:px-6 lg:px-8",children:[g.jsxs("div",{className:"flex items-center justify-between h-16 min-w-0",children:[g.jsxs("div",{className:"flex items-center space-x-2 min-w-0 flex-shrink-0",children:[g.jsx("div",{className:"w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden",children:g.jsx("img",{src:vr,alt:"Fakhry Mubarak",className:"w-full h-full object-cover"})}),g.jsx("span",{className:"font-display font-semibold text-lg truncate",children:"Fakhry Mubarak"})]}),g.jsx("nav",{className:"hidden md:flex items-center space-x-8",role:"navigation","aria-label":"Main navigation",children:i.map(l=>g.jsx("button",{onClick:()=>o(l.href,l.name),className:"text-light-muted dark:text-dark-muted hover:text-primary-coral dark:hover:text-primary-coral transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2 rounded px-2 py-1","aria-label":`Navigate to ${l.name} section`,children:l.name},l.name))}),g.jsxs("div",{className:"flex items-center space-x-2 sm:space-x-4 flex-shrink-0",children:[g.jsx("button",{onClick:s,className:"p-1.5 sm:p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2","aria-label":`Switch to ${e==="light"?"dark":"light"} mode`,children:e==="light"?g.jsx(Nn,{className:"w-5 h-5 text-light-muted dark:text-dark-muted","aria-hidden":"true"}):g.jsx(Ln,{className:"w-5 h-5 text-light-muted dark:text-dark-muted","aria-hidden":"true"})}),g.jsx("button",{onClick:c,className:"md:hidden p-1.5 sm:p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2","aria-label":"Toggle mobile menu","aria-expanded":n,"aria-controls":"mobile-menu",children:n?g.jsx(Bn,{className:"w-5 h-5 text-light-muted dark:text-dark-muted","aria-hidden":"true"}):g.jsx(jn,{className:"w-5 h-5 text-light-muted dark:text-dark-muted","aria-hidden":"true"})})]})]}),n&&g.jsx("div",{id:"mobile-menu",className:"md:hidden py-4 border-t border-light-muted/20 dark:border-dark-muted/20",role:"navigation","aria-label":"Mobile navigation",children:g.jsx("nav",{className:"flex flex-col space-y-4",children:i.map(l=>g.jsx("button",{onClick:()=>o(l.href,l.name),className:"text-left text-light-muted dark:text-dark-muted hover:text-primary-coral dark:hover:text-primary-coral transition-colors font-medium py-2 focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2 rounded px-2","aria-label":`Navigate to ${l.name} section`,children:l.name},l.name))})})]})})},wo=({children:e})=>{const{trackPageView:t}=Sn();return I.useEffect(()=>{t(window.location.pathname)},[t]),g.jsxs("div",{className:"app",children:[g.jsx(bo,{}),g.jsx("main",{children:e})]})},vo=({size:e="md",color:t="primary",className:n=""})=>{const r={sm:"w-4 h-4",md:"w-8 h-8",lg:"w-12 h-12"},a={primary:"border-primary-coral",gray:"border-gray-400",white:"border-white"};return g.jsx("div",{className:`animate-spin rounded-full border-2 border-t-transparent ${r[e]} ${a[t]} ${n}`,role:"status","aria-label":"Loading","data-testid":"loading-spinner",children:g.jsx("span",{className:"sr-only",children:"Loading..."})})},To=I.lazy(()=>yr(()=>import("../js/HomePage--te8ZGV1.js"),__vite__mapDeps([0,1,2,3,4])));function Io(){return g.jsx(br,{children:g.jsx(wo,{children:g.jsx(I.Suspense,{fallback:g.jsx(vo,{}),children:g.jsx(Rn,{children:g.jsx(Pn,{path:"/",element:g.jsx(To,{})})})})})})}class Eo{constructor(){Z(this,"metrics",{fcp:null,lcp:null,fid:null,cls:null,ttfb:null});Z(this,"observers",[]);Z(this,"isInitialized",!1);typeof window!="undefined"&&setTimeout(()=>{this.initObservers(),this.measureTTFB()},100)}initObservers(){if(!(this.isInitialized||!("PerformanceObserver"in window))){this.isInitialized=!0;try{const t=new PerformanceObserver(n=>{const a=n.getEntries().find(i=>i.name==="first-contentful-paint");a&&(this.metrics.fcp=a.startTime,this.logMetric("FCP",a.startTime),t.disconnect())});t.observe({entryTypes:["paint"]}),this.observers.push(t)}catch(t){}try{const t=new PerformanceObserver(n=>{const r=n.getEntries(),a=r[r.length-1];a&&(this.metrics.lcp=a.startTime,this.logMetric("LCP",a.startTime))});t.observe({entryTypes:["largest-contentful-paint"]}),this.observers.push(t)}catch(t){}try{const t=new PerformanceObserver(n=>{n.getEntries().forEach(a=>{const i=a;this.metrics.fid=i.processingStart-i.startTime,this.logMetric("FID",this.metrics.fid),t.disconnect()})});t.observe({entryTypes:["first-input"]}),this.observers.push(t)}catch(t){}try{const t=Date.now(),n=new PerformanceObserver(r=>{r.getEntries().forEach(i=>{const o=i;o.hadRecentInput||(this.metrics.cls=(this.metrics.cls||0)+o.value,this.logMetric("CLS",this.metrics.cls))}),Date.now()-t>5e3&&n.disconnect()});n.observe({entryTypes:["layout-shift"]}),this.observers.push(n)}catch(t){}}}measureTTFB(){if("performance"in window){const t=performance.getEntriesByType("navigation")[0];t&&(this.metrics.ttfb=t.responseStart-t.requestStart,this.logMetric("TTFB",this.metrics.ttfb))}}logMetric(t,n){const r=window;typeof r.gtag!="undefined"&&r.gtag("event","performance_metric",{metric_name:t,metric_value:n})}getMetrics(){return _({},this.metrics)}getMetricScore(t){const n=this.metrics[t];if(n===null)return"needs-improvement";const a={fcp:{good:1800,poor:3e3},lcp:{good:2500,poor:4e3},fid:{good:100,poor:300},cls:{good:.1,poor:.25},ttfb:{good:800,poor:1800}}[t];return a?n<=a.good?"good":n<=a.poor?"needs-improvement":"poor":"needs-improvement"}disconnect(){this.observers.forEach(t=>t.disconnect()),this.observers=[]}}let Le=null;const So=()=>(Le||(Le=new Eo),Le),Ao=()=>{["/avatar.webp"].forEach(n=>{const r=document.createElement("link");r.rel="preload",r.as="image",r.href=n,r.type="image/webp",document.head.appendChild(r)}),["https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap","https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"].forEach(n=>{const r=document.createElement("link");r.rel="preload",r.as="style",r.href=n,document.head.appendChild(r)})},Co=()=>{document.querySelectorAll("img:not([loading])").forEach(t=>{t.hasAttribute("loading")||(t.loading="lazy")})},_o=()=>{if(typeof window!="undefined"&&(Ao(),Co(),"IntersectionObserver"in window)){const e=new IntersectionObserver(t=>{t.forEach(n=>{if(n.isIntersecting){const r=n.target;r.dataset.src&&(r.src=r.dataset.src,r.removeAttribute("data-src"),e.unobserve(r))}})});document.querySelectorAll("img[data-src]").forEach(t=>{e.observe(t)})}},xo=()=>p(null,null,function*(){if("serviceWorker"in navigator)try{console.log("Registering Service Worker...");const e="/",t=yield navigator.serviceWorker.register(`${e}sw.js?v=${Date.now()}`,{scope:e,updateViaCache:"none"});return console.log("Service Worker registered successfully:",t),t.addEventListener("updatefound",()=>{console.log("Service Worker update found");const n=t.installing;n&&n.addEventListener("statechange",()=>{console.log("Service Worker state changed:",n.state),n.state==="installed"&&navigator.serviceWorker.controller&&ko(t)})}),navigator.serviceWorker.addEventListener("controllerchange",()=>{console.log("Service Worker controller changed")}),t}catch(e){return console.error("Service Worker registration failed:",e),null}else return console.log("Service Worker not supported in this browser"),null}),ko=e=>{console.log("New version available!"),"Notification"in window&&Notification.permission==="granted"&&new Notification("Portfolio Update",{body:"A new version is available. Refresh to update.",icon:"/icons/Icon-192.png"})},Oo=()=>p(null,null,function*(){if("serviceWorker"in navigator&&"caches"in window)try{yield(yield navigator.serviceWorker.ready).unregister(),console.log("Service Worker unregistered");const t=yield window.caches.keys();yield Promise.all(t.map(n=>(console.log("Deleting cache:",n),window.caches.delete(n)))),console.log("All caches cleared"),window.location.reload()}catch(e){console.error("Failed to clear cache:",e)}}),We=()=>{new PerformanceObserver(t=>{t.getEntries().forEach(n=>{if(n.entryType==="resource"&&n.name.includes(".js")){const r=n;r.transferSize===0&&r.decodedBodySize===0&&(console.warn("Detected potential 404 for JS file:",n.name),Do())}})}).observe({entryTypes:["resource"]})},Do=()=>{const e=document.createElement("div");e.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ff6b6b;
    color: white;
    padding: 12px;
    text-align: center;
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `,e.innerHTML=`
    <span>⚠️ Page resources not loading properly. 
    <button onclick="window.clearCacheAndReload()" style="
      background: white;
      color: #ff6b6b;
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 8px;
    ">Clear Cache & Reload</button>
    <button onclick="this.parentElement.remove()" style="
      background: transparent;
      color: white;
      border: 1px solid white;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 8px;
    ">Dismiss</button>
    </span>
  `,document.body.appendChild(e),window.clearCacheAndReload=Oo};typeof window!="undefined"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",We):We());So();_o();xo();We();Un.createRoot(document.getElementById("root")).render(g.jsx(x.StrictMode,{children:g.jsx(U,{children:g.jsx(Mn,{children:g.jsx(Io,{})})})}));export{vo as L,xe as W,vr as a,ne as b,Sn as c,Lo as d,g as j,wr as u};
