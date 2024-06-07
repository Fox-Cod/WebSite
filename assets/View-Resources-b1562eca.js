import{r as x,_ as b,l as Ke,c as B,m as We,h as Xe,u as Ye,j as o,L as E,o as qe}from"./index-6c9d4048.js";import{p as Je}from"./index-d11bc173.js";var Ze=function(t,r,a){var n=document.head||document.getElementsByTagName("head")[0],s=document.createElement("script");typeof r=="function"&&(a=r,r={}),r=r||{},a=a||function(){},s.type=r.type||"text/javascript",s.charset=r.charset||"utf8",s.async="async"in r?!!r.async:!0,s.src=t,r.attrs&&Qe(s,r.attrs),r.text&&(s.text=""+r.text);var y="onload"in s?ae:Ge;y(s,a),s.onload||ae(s,a),n.appendChild(s)};function Qe(e,t){for(var r in t)e.setAttribute(r,t[r])}function ae(e,t){e.onload=function(){this.onerror=this.onload=null,t(null,e)},e.onerror=function(){this.onerror=this.onload=null,t(new Error("Failed to load "+this.src),e)}}function Ge(e,t){e.onreadystatechange=function(){this.readyState!="complete"&&this.readyState!="loaded"||(this.onreadystatechange=null,t(null,e))}}var et=function(t){return tt(t)&&!rt(t)};function tt(e){return!!e&&typeof e=="object"}function rt(e){var t=Object.prototype.toString.call(e);return t==="[object RegExp]"||t==="[object Date]"||st(e)}var at=typeof Symbol=="function"&&Symbol.for,nt=at?Symbol.for("react.element"):60103;function st(e){return e.$$typeof===nt}function ot(e){return Array.isArray(e)?[]:{}}function L(e,t){return t.clone!==!1&&t.isMergeableObject(e)?A(ot(e),e,t):e}function it(e,t,r){return e.concat(t).map(function(a){return L(a,r)})}function lt(e,t){if(!t.customMerge)return A;var r=t.customMerge(e);return typeof r=="function"?r:A}function ct(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter(function(t){return Object.propertyIsEnumerable.call(e,t)}):[]}function ne(e){return Object.keys(e).concat(ct(e))}function ue(e,t){try{return t in e}catch{return!1}}function ut(e,t){return ue(e,t)&&!(Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))}function pt(e,t,r){var a={};return r.isMergeableObject(e)&&ne(e).forEach(function(n){a[n]=L(e[n],r)}),ne(t).forEach(function(n){ut(e,n)||(ue(e,n)&&r.isMergeableObject(t[n])?a[n]=lt(n,r)(e[n],t[n],r):a[n]=L(t[n],r))}),a}function A(e,t,r){r=r||{},r.arrayMerge=r.arrayMerge||it,r.isMergeableObject=r.isMergeableObject||et,r.cloneUnlessOtherwiseSpecified=L;var a=Array.isArray(t),n=Array.isArray(e),s=a===n;return s?a?r.arrayMerge(e,t,r):pt(e,t,r):L(t,r)}A.all=function(t,r){if(!Array.isArray(t))throw new Error("first argument should be an array");return t.reduce(function(a,n){return A(a,n,r)},{})};var dt=A,pe=dt,ft=Object.create,k=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,ht=Object.getOwnPropertyNames,mt=Object.getPrototypeOf,_t=Object.prototype.hasOwnProperty,vt=(e,t)=>{for(var r in t)k(e,r,{get:t[r],enumerable:!0})},de=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ht(t))!_t.call(e,n)&&n!==r&&k(e,n,{get:()=>t[n],enumerable:!(a=yt(t,n))||a.enumerable});return e},Z=(e,t,r)=>(r=e!=null?ft(mt(e)):{},de(t||!e||!e.__esModule?k(r,"default",{value:e,enumerable:!0}):r,e)),Pt=e=>de(k({},"__esModule",{value:!0}),e),fe={};vt(fe,{callPlayer:()=>It,getConfig:()=>Lt,getSDK:()=>Nt,isBlobUrl:()=>$t,isMediaStream:()=>Dt,lazy:()=>wt,omit:()=>Ct,parseEndTime:()=>At,parseStartTime:()=>xt,queryString:()=>Mt,randomString:()=>Rt,supportsWebKitPresentationMode:()=>kt});var U=Pt(fe),gt=Z(x),bt=Z(Ze),Ot=Z(pe);const wt=e=>gt.default.lazy(async()=>{const t=await e();return typeof t.default=="function"?t:t.default}),Et=/[?&#](?:start|t)=([0-9hms]+)/,Tt=/[?&#]end=([0-9hms]+)/,X=/(\d+)(h|m|s)/g,St=/^\d+$/;function ye(e,t){if(e instanceof Array)return;const r=e.match(t);if(r){const a=r[1];if(a.match(X))return jt(a);if(St.test(a))return parseInt(a)}}function jt(e){let t=0,r=X.exec(e);for(;r!==null;){const[,a,n]=r;n==="h"&&(t+=parseInt(a,10)*60*60),n==="m"&&(t+=parseInt(a,10)*60),n==="s"&&(t+=parseInt(a,10)),r=X.exec(e)}return t}function xt(e){return ye(e,Et)}function At(e){return ye(e,Tt)}function Rt(){return Math.random().toString(36).substr(2,5)}function Mt(e){return Object.keys(e).map(t=>`${t}=${e[t]}`).join("&")}function F(e){return window[e]?window[e]:window.exports&&window.exports[e]?window.exports[e]:window.module&&window.module.exports&&window.module.exports[e]?window.module.exports[e]:null}const T={},Nt=function(t,r,a=null,n=()=>!0,s=bt.default){const y=F(r);return y&&n(y)?Promise.resolve(y):new Promise((h,i)=>{if(T[t]){T[t].push({resolve:h,reject:i});return}T[t]=[{resolve:h,reject:i}];const p=_=>{T[t].forEach(w=>w.resolve(_))};if(a){const _=window[a];window[a]=function(){_&&_(),p(F(r))}}s(t,_=>{_?(T[t].forEach(w=>w.reject(_)),T[t]=null):a||p(F(r))})})};function Lt(e,t){return(0,Ot.default)(t.config,e.config)}function Ct(e,...t){const r=[].concat(...t),a={},n=Object.keys(e);for(const s of n)r.indexOf(s)===-1&&(a[s]=e[s]);return a}function It(e,...t){if(!this.player||!this.player[e]){let r=`ReactPlayer: ${this.constructor.displayName} player could not call %c${e}%c – `;return this.player?this.player[e]||(r+="The method was not available"):r+="The player was not available",console.warn(r,"font-weight: bold",""),null}return this.player[e](...t)}function Dt(e){return typeof window<"u"&&typeof window.MediaStream<"u"&&e instanceof window.MediaStream}function $t(e){return/^blob:/.test(e)}function kt(e=document.createElement("video")){const t=/iPhone|iPod/.test(navigator.userAgent)===!1;return e.webkitSupportsPresentationMode&&typeof e.webkitSetPresentationMode=="function"&&t}var Q=Object.defineProperty,Ut=Object.getOwnPropertyDescriptor,Ht=Object.getOwnPropertyNames,Vt=Object.prototype.hasOwnProperty,zt=(e,t)=>{for(var r in t)Q(e,r,{get:t[r],enumerable:!0})},Bt=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Ht(t))!Vt.call(e,n)&&n!==r&&Q(e,n,{get:()=>t[n],enumerable:!(a=Ut(t,n))||a.enumerable});return e},Ft=e=>Bt(Q({},"__esModule",{value:!0}),e),he={};zt(he,{AUDIO_EXTENSIONS:()=>G,DASH_EXTENSIONS:()=>Ae,FLV_EXTENSIONS:()=>Re,HLS_EXTENSIONS:()=>te,MATCH_URL_DAILYMOTION:()=>Te,MATCH_URL_FACEBOOK:()=>Pe,MATCH_URL_FACEBOOK_WATCH:()=>ge,MATCH_URL_KALTURA:()=>xe,MATCH_URL_MIXCLOUD:()=>Se,MATCH_URL_MUX:()=>ve,MATCH_URL_SOUNDCLOUD:()=>me,MATCH_URL_STREAMABLE:()=>be,MATCH_URL_TWITCH_CHANNEL:()=>Ee,MATCH_URL_TWITCH_VIDEO:()=>we,MATCH_URL_VIDYARD:()=>je,MATCH_URL_VIMEO:()=>_e,MATCH_URL_WISTIA:()=>Oe,MATCH_URL_YOUTUBE:()=>Y,VIDEO_EXTENSIONS:()=>ee,canPlay:()=>Wt});var Kt=Ft(he),se=U;const Y=/(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//,me=/(?:soundcloud\.com|snd\.sc)\/[^.]+$/,_e=/vimeo\.com\/(?!progressive_redirect).+/,ve=/stream\.mux\.com\/(?!\w+\.m3u8)(\w+)/,Pe=/^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/,ge=/^https?:\/\/fb\.watch\/.+$/,be=/streamable\.com\/([a-z0-9]+)$/,Oe=/(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?([^?]+)/,we=/(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/,Ee=/(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/,Te=/^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?(?:[\w.#_-]+)?/,Se=/mixcloud\.com\/([^/]+\/[^/]+)/,je=/vidyard.com\/(?:watch\/)?([a-zA-Z0-9-_]+)/,xe=/^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_].*)$/,G=/\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i,ee=/\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i,te=/\.(m3u8)($|\?)/i,Ae=/\.(mpd)($|\?)/i,Re=/\.(flv)($|\?)/i,q=e=>{if(e instanceof Array){for(const t of e)if(typeof t=="string"&&q(t)||q(t.src))return!0;return!1}return(0,se.isMediaStream)(e)||(0,se.isBlobUrl)(e)?!0:G.test(e)||ee.test(e)||te.test(e)||Ae.test(e)||Re.test(e)},Wt={youtube:e=>e instanceof Array?e.every(t=>Y.test(t)):Y.test(e),soundcloud:e=>me.test(e)&&!G.test(e),vimeo:e=>_e.test(e)&&!ee.test(e)&&!te.test(e),mux:e=>ve.test(e),facebook:e=>Pe.test(e)||ge.test(e),streamable:e=>be.test(e),wistia:e=>Oe.test(e),twitch:e=>we.test(e)||Ee.test(e),dailymotion:e=>Te.test(e),mixcloud:e=>Se.test(e),vidyard:e=>je.test(e),kaltura:e=>xe.test(e),file:q};var re=Object.defineProperty,Xt=Object.getOwnPropertyDescriptor,Yt=Object.getOwnPropertyNames,qt=Object.prototype.hasOwnProperty,Jt=(e,t)=>{for(var r in t)re(e,r,{get:t[r],enumerable:!0})},Zt=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Yt(t))!qt.call(e,n)&&n!==r&&re(e,n,{get:()=>t[n],enumerable:!(a=Xt(t,n))||a.enumerable});return e},Qt=e=>Zt(re({},"__esModule",{value:!0}),e),Me={};Jt(Me,{default:()=>er});var Gt=Qt(Me),g=U,v=Kt,er=[{key:"youtube",name:"YouTube",canPlay:v.canPlay.youtube,lazyPlayer:(0,g.lazy)(()=>b(()=>import("./YouTube-bd137dbb.js").then(e=>e.Y),["assets/YouTube-bd137dbb.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"]))},{key:"soundcloud",name:"SoundCloud",canPlay:v.canPlay.soundcloud,lazyPlayer:(0,g.lazy)(()=>b(()=>import("./SoundCloud-8d22cb7e.js").then(e=>e.S),["assets/SoundCloud-8d22cb7e.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"]))},{key:"vimeo",name:"Vimeo",canPlay:v.canPlay.vimeo,lazyPlayer:(0,g.lazy)(()=>b(()=>import("./Vimeo-18dd08f5.js").then(e=>e.V),["assets/Vimeo-18dd08f5.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"]))},{key:"mux",name:"Mux",canPlay:v.canPlay.mux,lazyPlayer:(0,g.lazy)(()=>b(()=>import("./Mux-79301c64.js").then(e=>e.M),["assets/Mux-79301c64.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"]))},{key:"facebook",name:"Facebook",canPlay:v.canPlay.facebook,lazyPlayer:(0,g.lazy)(()=>b(()=>import("./Facebook-5eb78062.js").then(e=>e.F),["assets/Facebook-5eb78062.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"]))},{key:"streamable",name:"Streamable",canPlay:v.canPlay.streamable,lazyPlayer:(0,g.lazy)(()=>b(()=>import("./Streamable-623bf386.js").then(e=>e.S),["assets/Streamable-623bf386.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"]))},{key:"wistia",name:"Wistia",canPlay:v.canPlay.wistia,lazyPlayer:(0,g.lazy)(()=>b(()=>import("./Wistia-5275c530.js").then(e=>e.W),["assets/Wistia-5275c530.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"]))},{key:"twitch",name:"Twitch",canPlay:v.canPlay.twitch,lazyPlayer:(0,g.lazy)(()=>b(()=>import("./Twitch-abb9ee88.js").then(e=>e.T),["assets/Twitch-abb9ee88.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"]))},{key:"dailymotion",name:"DailyMotion",canPlay:v.canPlay.dailymotion,lazyPlayer:(0,g.lazy)(()=>b(()=>import("./DailyMotion-7c65a3f5.js").then(e=>e.D),["assets/DailyMotion-7c65a3f5.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"]))},{key:"mixcloud",name:"Mixcloud",canPlay:v.canPlay.mixcloud,lazyPlayer:(0,g.lazy)(()=>b(()=>import("./Mixcloud-b55c3b26.js").then(e=>e.M),["assets/Mixcloud-b55c3b26.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"]))},{key:"vidyard",name:"Vidyard",canPlay:v.canPlay.vidyard,lazyPlayer:(0,g.lazy)(()=>b(()=>import("./Vidyard-31078b48.js").then(e=>e.V),["assets/Vidyard-31078b48.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"]))},{key:"kaltura",name:"Kaltura",canPlay:v.canPlay.kaltura,lazyPlayer:(0,g.lazy)(()=>b(()=>import("./Kaltura-0e88604e.js").then(e=>e.K),["assets/Kaltura-0e88604e.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"]))},{key:"file",name:"FilePlayer",canPlay:v.canPlay.file,canEnablePIP:e=>v.canPlay.file(e)&&(document.pictureInPictureEnabled||(0,g.supportsWebKitPresentationMode)())&&!v.AUDIO_EXTENSIONS.test(e),lazyPlayer:(0,g.lazy)(()=>b(()=>import("./FilePlayer-6d300c99.js").then(e=>e.F),["assets/FilePlayer-6d300c99.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"]))}],oe=Number.isNaN||function(t){return typeof t=="number"&&t!==t};function tr(e,t){return!!(e===t||oe(e)&&oe(t))}function rr(e,t){if(e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(!tr(e[r],t[r]))return!1;return!0}function ar(e,t){t===void 0&&(t=rr);var r,a=[],n,s=!1;function y(){for(var h=[],i=0;i<arguments.length;i++)h[i]=arguments[i];return s&&r===this&&t(h,a)||(n=e.apply(this,h),s=!0,r=this,a=h),n}return y}const nr=Object.freeze(Object.defineProperty({__proto__:null,default:ar},Symbol.toStringTag,{value:"Module"})),sr=Ke(nr);var or=typeof Element<"u",ir=typeof Map=="function",lr=typeof Set=="function",cr=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function $(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var r,a,n;if(Array.isArray(e)){if(r=e.length,r!=t.length)return!1;for(a=r;a--!==0;)if(!$(e[a],t[a]))return!1;return!0}var s;if(ir&&e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(s=e.entries();!(a=s.next()).done;)if(!t.has(a.value[0]))return!1;for(s=e.entries();!(a=s.next()).done;)if(!$(a.value[1],t.get(a.value[0])))return!1;return!0}if(lr&&e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(s=e.entries();!(a=s.next()).done;)if(!t.has(a.value[0]))return!1;return!0}if(cr&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if(r=e.length,r!=t.length)return!1;for(a=r;a--!==0;)if(e[a]!==t[a])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf&&typeof e.valueOf=="function"&&typeof t.valueOf=="function")return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString&&typeof e.toString=="function"&&typeof t.toString=="function")return e.toString()===t.toString();if(n=Object.keys(e),r=n.length,r!==Object.keys(t).length)return!1;for(a=r;a--!==0;)if(!Object.prototype.hasOwnProperty.call(t,n[a]))return!1;if(or&&e instanceof Element)return!1;for(a=r;a--!==0;)if(!((n[a]==="_owner"||n[a]==="__v"||n[a]==="__o")&&e.$$typeof)&&!$(e[n[a]],t[n[a]]))return!1;return!0}return e!==e&&t!==t}var Ne=function(t,r){try{return $(t,r)}catch(a){if((a.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw a}},ur=Object.create,H=Object.defineProperty,pr=Object.getOwnPropertyDescriptor,dr=Object.getOwnPropertyNames,fr=Object.getPrototypeOf,yr=Object.prototype.hasOwnProperty,hr=(e,t)=>{for(var r in t)H(e,r,{get:t[r],enumerable:!0})},Le=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of dr(t))!yr.call(e,n)&&n!==r&&H(e,n,{get:()=>t[n],enumerable:!(a=pr(t,n))||a.enumerable});return e},mr=(e,t,r)=>(r=e!=null?ur(fr(e)):{},Le(t||!e||!e.__esModule?H(r,"default",{value:e,enumerable:!0}):r,e)),_r=e=>Le(H({},"__esModule",{value:!0}),e),Ce={};hr(Ce,{defaultProps:()=>gr,propTypes:()=>Pr});var Ie=_r(Ce),vr=mr(Je);const{string:d,bool:P,number:S,array:K,oneOfType:R,shape:O,object:m,func:u,node:ie}=vr.default,Pr={url:R([d,K,m]),playing:P,loop:P,controls:P,volume:S,muted:P,playbackRate:S,width:R([d,S]),height:R([d,S]),style:m,progressInterval:S,playsinline:P,pip:P,stopOnUnmount:P,light:R([P,d,m]),playIcon:ie,previewTabIndex:S,previewAriaLabel:d,fallback:ie,oEmbedUrl:d,wrapper:R([d,u,O({render:u.isRequired})]),config:O({soundcloud:O({options:m}),youtube:O({playerVars:m,embedOptions:m,onUnstarted:u}),facebook:O({appId:d,version:d,playerId:d,attributes:m}),dailymotion:O({params:m}),vimeo:O({playerOptions:m,title:d}),mux:O({attributes:m,version:d}),file:O({attributes:m,tracks:K,forceVideo:P,forceAudio:P,forceHLS:P,forceSafariHLS:P,forceDisableHls:P,forceDASH:P,forceFLV:P,hlsOptions:m,hlsVersion:d,dashVersion:d,flvVersion:d}),wistia:O({options:m,playerId:d,customControls:K}),mixcloud:O({options:m}),twitch:O({options:m,playerId:d}),vidyard:O({options:m})}),onReady:u,onStart:u,onPlay:u,onPause:u,onBuffer:u,onBufferEnd:u,onEnded:u,onError:u,onDuration:u,onSeek:u,onPlaybackRateChange:u,onPlaybackQualityChange:u,onProgress:u,onClickPreview:u,onEnablePIP:u,onDisablePIP:u},f=()=>{},gr={playing:!1,loop:!1,controls:!1,volume:null,muted:!1,playbackRate:1,width:"640px",height:"360px",style:{},progressInterval:1e3,playsinline:!1,pip:!1,stopOnUnmount:!0,light:!1,fallback:null,wrapper:"div",previewTabIndex:0,previewAriaLabel:"",oEmbedUrl:"https://noembed.com/embed?url={url}",config:{soundcloud:{options:{visual:!0,buying:!1,liking:!1,download:!1,sharing:!1,show_comments:!1,show_playcount:!1}},youtube:{playerVars:{playsinline:1,showinfo:0,rel:0,iv_load_policy:3,modestbranding:1},embedOptions:{},onUnstarted:f},facebook:{appId:"1309697205772819",version:"v3.3",playerId:null,attributes:{}},dailymotion:{params:{api:1,"endscreen-enable":!1}},vimeo:{playerOptions:{autopause:!1,byline:!1,portrait:!1,title:!1},title:null},mux:{attributes:{},version:"2"},file:{attributes:{},tracks:[],forceVideo:!1,forceAudio:!1,forceHLS:!1,forceDASH:!1,forceFLV:!1,hlsOptions:{},hlsVersion:"1.1.4",dashVersion:"3.1.3",flvVersion:"1.5.0",forceDisableHls:!1},wistia:{options:{},playerId:null,customControls:null},mixcloud:{options:{hide_cover:1}},twitch:{options:{},playerId:null},vidyard:{options:{}}},onReady:f,onStart:f,onPlay:f,onPause:f,onBuffer:f,onBufferEnd:f,onEnded:f,onError:f,onDuration:f,onSeek:f,onPlaybackRateChange:f,onPlaybackQualityChange:f,onProgress:f,onClickPreview:f,onEnablePIP:f,onDisablePIP:f};var br=Object.create,C=Object.defineProperty,Or=Object.getOwnPropertyDescriptor,wr=Object.getOwnPropertyNames,Er=Object.getPrototypeOf,Tr=Object.prototype.hasOwnProperty,Sr=(e,t,r)=>t in e?C(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,jr=(e,t)=>{for(var r in t)C(e,r,{get:t[r],enumerable:!0})},De=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of wr(t))!Tr.call(e,n)&&n!==r&&C(e,n,{get:()=>t[n],enumerable:!(a=Or(t,n))||a.enumerable});return e},$e=(e,t,r)=>(r=e!=null?br(Er(e)):{},De(t||!e||!e.__esModule?C(r,"default",{value:e,enumerable:!0}):r,e)),xr=e=>De(C({},"__esModule",{value:!0}),e),c=(e,t,r)=>(Sr(e,typeof t!="symbol"?t+"":t,r),r),ke={};jr(ke,{default:()=>V});var Ar=xr(ke),le=$e(x),Rr=$e(Ne),Ue=Ie,Mr=U;const Nr=5e3;class V extends le.Component{constructor(){super(...arguments),c(this,"mounted",!1),c(this,"isReady",!1),c(this,"isPlaying",!1),c(this,"isLoading",!0),c(this,"loadOnReady",null),c(this,"startOnPlay",!0),c(this,"seekOnPlay",null),c(this,"onDurationCalled",!1),c(this,"handlePlayerMount",t=>{if(this.player){this.progress();return}this.player=t,this.player.load(this.props.url),this.progress()}),c(this,"getInternalPlayer",t=>this.player?this.player[t]:null),c(this,"progress",()=>{if(this.props.url&&this.player&&this.isReady){const t=this.getCurrentTime()||0,r=this.getSecondsLoaded(),a=this.getDuration();if(a){const n={playedSeconds:t,played:t/a};r!==null&&(n.loadedSeconds=r,n.loaded=r/a),(n.playedSeconds!==this.prevPlayed||n.loadedSeconds!==this.prevLoaded)&&this.props.onProgress(n),this.prevPlayed=n.playedSeconds,this.prevLoaded=n.loadedSeconds}}this.progressTimeout=setTimeout(this.progress,this.props.progressFrequency||this.props.progressInterval)}),c(this,"handleReady",()=>{if(!this.mounted)return;this.isReady=!0,this.isLoading=!1;const{onReady:t,playing:r,volume:a,muted:n}=this.props;t(),!n&&a!==null&&this.player.setVolume(a),this.loadOnReady?(this.player.load(this.loadOnReady,!0),this.loadOnReady=null):r&&this.player.play(),this.handleDurationCheck()}),c(this,"handlePlay",()=>{this.isPlaying=!0,this.isLoading=!1;const{onStart:t,onPlay:r,playbackRate:a}=this.props;this.startOnPlay&&(this.player.setPlaybackRate&&a!==1&&this.player.setPlaybackRate(a),t(),this.startOnPlay=!1),r(),this.seekOnPlay&&(this.seekTo(this.seekOnPlay),this.seekOnPlay=null),this.handleDurationCheck()}),c(this,"handlePause",t=>{this.isPlaying=!1,this.isLoading||this.props.onPause(t)}),c(this,"handleEnded",()=>{const{activePlayer:t,loop:r,onEnded:a}=this.props;t.loopOnEnded&&r&&this.seekTo(0),r||(this.isPlaying=!1,a())}),c(this,"handleError",(...t)=>{this.isLoading=!1,this.props.onError(...t)}),c(this,"handleDurationCheck",()=>{clearTimeout(this.durationCheckTimeout);const t=this.getDuration();t?this.onDurationCalled||(this.props.onDuration(t),this.onDurationCalled=!0):this.durationCheckTimeout=setTimeout(this.handleDurationCheck,100)}),c(this,"handleLoaded",()=>{this.isLoading=!1})}componentDidMount(){this.mounted=!0}componentWillUnmount(){clearTimeout(this.progressTimeout),clearTimeout(this.durationCheckTimeout),this.isReady&&this.props.stopOnUnmount&&(this.player.stop(),this.player.disablePIP&&this.player.disablePIP()),this.mounted=!1}componentDidUpdate(t){if(!this.player)return;const{url:r,playing:a,volume:n,muted:s,playbackRate:y,pip:h,loop:i,activePlayer:p,disableDeferredLoading:_}=this.props;if(!(0,Rr.default)(t.url,r)){if(this.isLoading&&!p.forceLoad&&!_&&!(0,Mr.isMediaStream)(r)){console.warn(`ReactPlayer: the attempt to load ${r} is being deferred until the player has loaded`),this.loadOnReady=r;return}this.isLoading=!0,this.startOnPlay=!0,this.onDurationCalled=!1,this.player.load(r,this.isReady)}!t.playing&&a&&!this.isPlaying&&this.player.play(),t.playing&&!a&&this.isPlaying&&this.player.pause(),!t.pip&&h&&this.player.enablePIP&&this.player.enablePIP(),t.pip&&!h&&this.player.disablePIP&&this.player.disablePIP(),t.volume!==n&&n!==null&&this.player.setVolume(n),t.muted!==s&&(s?this.player.mute():(this.player.unmute(),n!==null&&setTimeout(()=>this.player.setVolume(n)))),t.playbackRate!==y&&this.player.setPlaybackRate&&this.player.setPlaybackRate(y),t.loop!==i&&this.player.setLoop&&this.player.setLoop(i)}getDuration(){return this.isReady?this.player.getDuration():null}getCurrentTime(){return this.isReady?this.player.getCurrentTime():null}getSecondsLoaded(){return this.isReady?this.player.getSecondsLoaded():null}seekTo(t,r,a){if(!this.isReady){t!==0&&(this.seekOnPlay=t,setTimeout(()=>{this.seekOnPlay=null},Nr));return}if(r?r==="fraction":t>0&&t<1){const s=this.player.getDuration();if(!s){console.warn("ReactPlayer: could not seek using fraction – duration not yet available");return}this.player.seekTo(s*t,a);return}this.player.seekTo(t,a)}render(){const t=this.props.activePlayer;return t?le.default.createElement(t,{...this.props,onMount:this.handlePlayerMount,onReady:this.handleReady,onPlay:this.handlePlay,onPause:this.handlePause,onEnded:this.handleEnded,onLoaded:this.handleLoaded,onError:this.handleError}):null}}c(V,"displayName","Player");c(V,"propTypes",Ue.propTypes);c(V,"defaultProps",Ue.defaultProps);var Lr=Object.create,I=Object.defineProperty,Cr=Object.getOwnPropertyDescriptor,Ir=Object.getOwnPropertyNames,Dr=Object.getPrototypeOf,$r=Object.prototype.hasOwnProperty,kr=(e,t,r)=>t in e?I(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ur=(e,t)=>{for(var r in t)I(e,r,{get:t[r],enumerable:!0})},He=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Ir(t))!$r.call(e,n)&&n!==r&&I(e,n,{get:()=>t[n],enumerable:!(a=Cr(t,n))||a.enumerable});return e},D=(e,t,r)=>(r=e!=null?Lr(Dr(e)):{},He(t||!e||!e.__esModule?I(r,"default",{value:e,enumerable:!0}):r,e)),Hr=e=>He(I({},"__esModule",{value:!0}),e),l=(e,t,r)=>(kr(e,typeof t!="symbol"?t+"":t,r),r),Ve={};Ur(Ve,{createReactPlayer:()=>qr});var Vr=Hr(Ve),j=D(x),zr=D(pe),W=D(sr),ce=D(Ne),N=Ie,ze=U,Br=D(Ar);const Fr=(0,ze.lazy)(()=>b(()=>import("./Preview-4641e5d9.js").then(e=>e.P),["assets/Preview-4641e5d9.js","assets/index-6c9d4048.js","assets/index-33cfb15c.css"])),Kr=typeof window<"u"&&window.document&&typeof document<"u",Wr=typeof B<"u"&&B.window&&B.window.document,Xr=Object.keys(N.propTypes),Yr=Kr||Wr?j.Suspense:()=>null,M=[],qr=(e,t)=>{var r;return r=class extends j.Component{constructor(){super(...arguments),l(this,"state",{showPreview:!!this.props.light}),l(this,"references",{wrapper:a=>{this.wrapper=a},player:a=>{this.player=a}}),l(this,"handleClickPreview",a=>{this.setState({showPreview:!1}),this.props.onClickPreview(a)}),l(this,"showPreview",()=>{this.setState({showPreview:!0})}),l(this,"getDuration",()=>this.player?this.player.getDuration():null),l(this,"getCurrentTime",()=>this.player?this.player.getCurrentTime():null),l(this,"getSecondsLoaded",()=>this.player?this.player.getSecondsLoaded():null),l(this,"getInternalPlayer",(a="player")=>this.player?this.player.getInternalPlayer(a):null),l(this,"seekTo",(a,n,s)=>{if(!this.player)return null;this.player.seekTo(a,n,s)}),l(this,"handleReady",()=>{this.props.onReady(this)}),l(this,"getActivePlayer",(0,W.default)(a=>{for(const n of[...M,...e])if(n.canPlay(a))return n;return t||null})),l(this,"getConfig",(0,W.default)((a,n)=>{const{config:s}=this.props;return zr.default.all([N.defaultProps.config,N.defaultProps.config[n]||{},s,s[n]||{}])})),l(this,"getAttributes",(0,W.default)(a=>(0,ze.omit)(this.props,Xr))),l(this,"renderActivePlayer",a=>{if(!a)return null;const n=this.getActivePlayer(a);if(!n)return null;const s=this.getConfig(a,n.key);return j.default.createElement(Br.default,{...this.props,key:n.key,ref:this.references.player,config:s,activePlayer:n.lazyPlayer||n,onReady:this.handleReady})})}shouldComponentUpdate(a,n){return!(0,ce.default)(this.props,a)||!(0,ce.default)(this.state,n)}componentDidUpdate(a){const{light:n}=this.props;!a.light&&n&&this.setState({showPreview:!0}),a.light&&!n&&this.setState({showPreview:!1})}renderPreview(a){if(!a)return null;const{light:n,playIcon:s,previewTabIndex:y,oEmbedUrl:h,previewAriaLabel:i}=this.props;return j.default.createElement(Fr,{url:a,light:n,playIcon:s,previewTabIndex:y,previewAriaLabel:i,oEmbedUrl:h,onClick:this.handleClickPreview})}render(){const{url:a,style:n,width:s,height:y,fallback:h,wrapper:i}=this.props,{showPreview:p}=this.state,_=this.getAttributes(a),w=typeof i=="string"?this.references.wrapper:void 0;return j.default.createElement(i,{ref:w,style:{...n,width:s,height:y},..._},j.default.createElement(Yr,{fallback:h},p?this.renderPreview(a):this.renderActivePlayer(a)))}},l(r,"displayName","ReactPlayer"),l(r,"propTypes",N.propTypes),l(r,"defaultProps",N.defaultProps),l(r,"addCustomPlayer",a=>{M.push(a)}),l(r,"removeCustomPlayers",()=>{M.length=0}),l(r,"canPlay",a=>{for(const n of[...M,...e])if(n.canPlay(a))return!0;return!1}),l(r,"canEnablePIP",a=>{for(const n of[...M,...e])if(n.canEnablePIP&&n.canEnablePIP(a))return!0;return!1}),r};var Jr=Object.create,z=Object.defineProperty,Zr=Object.getOwnPropertyDescriptor,Qr=Object.getOwnPropertyNames,Gr=Object.getPrototypeOf,ea=Object.prototype.hasOwnProperty,ta=(e,t)=>{for(var r in t)z(e,r,{get:t[r],enumerable:!0})},Be=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Qr(t))!ea.call(e,n)&&n!==r&&z(e,n,{get:()=>t[n],enumerable:!(a=Zr(t,n))||a.enumerable});return e},ra=(e,t,r)=>(r=e!=null?Jr(Gr(e)):{},Be(t||!e||!e.__esModule?z(r,"default",{value:e,enumerable:!0}):r,e)),aa=e=>Be(z({},"__esModule",{value:!0}),e),Fe={};ta(Fe,{default:()=>ia});var na=aa(Fe),J=ra(Gt),sa=Vr;const oa=J.default[J.default.length-1];var ia=(0,sa.createReactPlayer)(J.default,oa);const la=We(na);function ca(){const[e,t]=x.useState({}),[r,a]=x.useState(!0),{resourceId:n}=Xe(),{t:s}=Ye();x.useEffect(()=>{async function i(){try{const p=await qe(n);t(p),a(!1)}catch(p){console.error("Erro durante o carregamento de dados:",p),setError("Erro ao carregar dados. Por favor, tente novamente."),a(!1)}}i()},[n]);const y=i=>{const p=new Date(i),_=new Date;return p.toDateString()===_.toDateString()?p.toLocaleTimeString("default",{hour:"numeric",minute:"numeric"}):p.toLocaleDateString("default",{day:"numeric",month:"long",year:"numeric"})},h=i=>{if(i===0)return"0 Bytes";const p=1024,_=["Bytes","KB","MB","GB","TB"],w=Math.floor(Math.log(i)/Math.log(p));return parseFloat((i/Math.pow(p,w)).toFixed(2))+" "+_[w]};return r?o.jsx("div",{children:"Loading..."}):e?o.jsxs("div",{className:"container mt-4",children:[o.jsx("header",{id:"header",className:"navbar navbar-expand-lg navbar-spacer-y-0 flex-lg-column",children:o.jsx("nav",{className:"js-mega-menu flex-grow-1",children:o.jsx("div",{className:"collapse navbar-collapse",id:"navbarDoubleLineContainerNavDropdown",children:o.jsxs("ul",{className:"nav nav-tabs align-items-center",children:[o.jsx("li",{className:"nav-item",children:o.jsxs(E,{className:"nav-link",to:"/form","data-placement":"left",children:[o.jsx("i",{className:"bi bi-house dropdown-item-icon"})," ",s("home")]})}),o.jsx("li",{className:"nav-item",children:o.jsxs(E,{className:"nav-link",to:"/activity","data-placement":"left",children:[o.jsx("i",{className:"bi bi-activity dropdown-item-icon"})," ",s("activity")]})}),o.jsx("li",{className:"nav-item",children:o.jsxs(E,{className:"nav-link active",to:"/resources","data-placement":"left",children:[o.jsx("i",{className:"bi bi-file-earmark-arrow-down dropdown-item-icon"})," ",s("resources")]})}),o.jsx("li",{className:"nav-item",children:o.jsxs(E,{className:"nav-link",to:"/tools","data-placement":"left",children:[o.jsx("i",{className:"bi bi-tools dropdown-item-icon"})," ",s("tool")]})})]})})})}),o.jsx("main",{className:"card card-body",children:o.jsx("div",{className:"my-3 p-3 rounded shadow-sm card",style:{borderRadius:"10px",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"},children:o.jsxs("div",{className:"d-flex align-items-start",children:[o.jsx("div",{className:"avatar avatar-sm avatar-circle me-2",children:o.jsx("span",{className:"avatar-soft-dark",title:e.users.name,children:o.jsx("span",{className:"bd-placeholder-img flex-shrink-0 me-2 rounded avatar-initials",children:e.users.name.charAt(0).toUpperCase()})})}),o.jsxs("div",{className:"flex-grow-1",children:[o.jsx("div",{className:"d-flex justify-content-between align-items-center",children:o.jsx("h5",{className:"mb-1",children:o.jsxs("small",{className:"text-muted",children:[o.jsx(E,{to:"/profile/view-profile/",children:e.users.name})," | ",y(e.publishDate)," | favorites "]})})}),o.jsx("div",{className:"d-flex justify-content-between",children:o.jsx("strong",{className:"text-gray-dark",children:e.title})}),o.jsx("div",{className:"d-flex justify-content-between",children:o.jsx("span",{className:"text-gray-dark",children:e.description})}),o.jsx("div",{className:"d-flex justify-content-between",children:o.jsx("span",{className:"badge bg-secondary mb-2",children:e.type})}),e.type==="Ficheiro"?o.jsx("div",{className:"card p-3",children:o.jsx("li",{className:"list-group-item",children:o.jsxs("div",{className:"row align-items-center",children:[o.jsx("div",{className:"col-auto",children:o.jsx("img",{className:"avatar avatar-xs avatar-4x3",src:"/assets/svg/components/placeholder-img-format.svg",alt:"Img"})}),o.jsxs("div",{className:"col",children:[o.jsx("h5",{className:"mb-0",title:s("download"),children:o.jsx(E,{to:`http://localhost:8081/api/files/${e.fileName}`,download:!0,children:e.fileName})}),o.jsx("ul",{className:"list-inline list-separator small text-body",children:o.jsxs("li",{className:"list-inline-item",children:[s("file_size")," ",h(e.fileSize)]})})]})]})})}):e.type==="Video"?o.jsx("div",{className:"d-flex justify-content-center align-items-center my-3",children:o.jsx(la,{url:e.link,className:"video-player",controls:!0,width:"50%"})}):o.jsx("div",{className:"d-flex justify-content-end align-items-center",children:o.jsx(E,{to:e.link,className:"btn btn-outline-primary btn-sm me-2",children:"Link"})})]})]})})})]}):o.jsx("div",{children:"Resource not found"})}const da=Object.freeze(Object.defineProperty({__proto__:null,default:ca},Symbol.toStringTag,{value:"Module"}));export{da as V,Kt as p,U as u};
