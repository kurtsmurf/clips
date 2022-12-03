(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerpolicy&&(l.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?l.credentials="include":s.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();const N={},Ie=(e,n)=>e===n,Re=Symbol("solid-track"),X={equals:Ie};let Qe=Se;const M=1,J=2,we={owned:null,cleanups:null,context:null,owner:null};var v=null;let F=null,b=null,x=null,B=null,se=0;function W(e,n){const t=b,i=v,s=e.length===0,l=s?we:{owned:null,cleanups:null,context:null,owner:n||i},r=s?e:()=>e(()=>q(()=>le(l)));v=l,b=null;try{return G(r,!0)}finally{b=t,v=i}}function H(e,n){n=n?Object.assign({},X,n):X;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},i=s=>(typeof s=="function"&&(s=s(t.value)),ve(t,s));return[$e.bind(t),i]}function U(e,n,t){const i=xe(e,n,!1,M);ee(i)}function Ue(e,n,t){t=t?Object.assign({},X,t):X;const i=xe(e,n,!0,0);return i.observers=null,i.observerSlots=null,i.comparator=t.equals||void 0,ee(i),$e.bind(i)}function q(e){const n=b;b=null;try{return e()}finally{b=n}}function qe(e){return v===null||(v.cleanups===null?v.cleanups=[e]:v.cleanups.push(e)),e}function $e(){const e=F;if(this.sources&&(this.state||e))if(this.state===M||e)ee(this);else{const n=x;x=null,G(()=>Z(this),!1),x=n}if(b){const n=this.observers?this.observers.length:0;b.sources?(b.sources.push(this),b.sourceSlots.push(n)):(b.sources=[this],b.sourceSlots=[n]),this.observers?(this.observers.push(b),this.observerSlots.push(b.sources.length-1)):(this.observers=[b],this.observerSlots=[b.sources.length-1])}return this.value}function ve(e,n,t){let i=e.value;return(!e.comparator||!e.comparator(i,n))&&(e.value=n,e.observers&&e.observers.length&&G(()=>{for(let s=0;s<e.observers.length;s+=1){const l=e.observers[s],r=F&&F.running;r&&F.disposed.has(l),(r&&!l.tState||!r&&!l.state)&&(l.pure?x.push(l):B.push(l),l.observers&&_e(l)),r||(l.state=M)}if(x.length>1e6)throw x=[],new Error},!1)),n}function ee(e){if(!e.fn)return;le(e);const n=v,t=b,i=se;b=v=e,Ge(e,e.value,i),b=t,v=n}function Ge(e,n,t){let i;try{i=e.fn(n)}catch(s){e.pure&&(e.state=M),Ee(s)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?ve(e,i):e.value=i,e.updatedAt=t)}function xe(e,n,t,i=M,s){const l={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:v,context:null,pure:t};return v===null||v!==we&&(v.owned?v.owned.push(l):v.owned=[l]),l}function Ce(e){const n=F;if(e.state===0||n)return;if(e.state===J||n)return Z(e);if(e.suspense&&q(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<se);)(e.state||n)&&t.push(e);for(let i=t.length-1;i>=0;i--)if(e=t[i],e.state===M||n)ee(e);else if(e.state===J||n){const s=x;x=null,G(()=>Z(e,t[0]),!1),x=s}}function G(e,n){if(x)return e();let t=!1;n||(x=[]),B?t=!0:B=[],se++;try{const i=e();return je(t),i}catch(i){x||(B=null),Ee(i)}}function je(e){if(x&&(Se(x),x=null),e)return;const n=B;B=null,n.length&&G(()=>Qe(n),!1)}function Se(e){for(let n=0;n<e.length;n++)Ce(e[n])}function Z(e,n){const t=F;e.state=0;for(let i=0;i<e.sources.length;i+=1){const s=e.sources[i];s.sources&&(s.state===M||t?s!==n&&Ce(s):(s.state===J||t)&&Z(s,n))}}function _e(e){const n=F;for(let t=0;t<e.observers.length;t+=1){const i=e.observers[t];(!i.state||n)&&(i.state=J,i.pure?x.push(i):B.push(i),i.observers&&_e(i))}}function le(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),i=e.sourceSlots.pop(),s=t.observers;if(s&&s.length){const l=s.pop(),r=t.observerSlots.pop();i<s.length&&(l.sourceSlots[r]=i,s[i]=l,t.observerSlots[i]=r)}}if(e.owned){for(n=0;n<e.owned.length;n++)le(e.owned[n]);e.owned=null}if(e.cleanups){for(n=0;n<e.cleanups.length;n++)e.cleanups[n]();e.cleanups=null}e.state=0,e.context=null}function Ve(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function Ee(e){throw e=Ve(e),e}const We=Symbol("fallback");function be(e){for(let n=0;n<e.length;n++)e[n]()}function Ke(e,n,t={}){let i=[],s=[],l=[],r=0,o=n.length>1?[]:null;return qe(()=>be(l)),()=>{let f=e()||[],c,u;return f[Re],q(()=>{let p=f.length,A,S,h,_,k,w,g,a,m;if(p===0)r!==0&&(be(l),l=[],i=[],s=[],r=0,o&&(o=[])),t.fallback&&(i=[We],s[0]=W(L=>(l[0]=L,t.fallback())),r=1);else if(r===0){for(s=new Array(p),u=0;u<p;u++)i[u]=f[u],s[u]=W(y);r=p}else{for(h=new Array(p),_=new Array(p),o&&(k=new Array(p)),w=0,g=Math.min(r,p);w<g&&i[w]===f[w];w++);for(g=r-1,a=p-1;g>=w&&a>=w&&i[g]===f[a];g--,a--)h[a]=s[g],_[a]=l[g],o&&(k[a]=o[g]);for(A=new Map,S=new Array(a+1),u=a;u>=w;u--)m=f[u],c=A.get(m),S[u]=c===void 0?-1:c,A.set(m,u);for(c=w;c<=g;c++)m=i[c],u=A.get(m),u!==void 0&&u!==-1?(h[u]=s[c],_[u]=l[c],o&&(k[u]=o[c]),u=S[u],A.set(m,u)):l[c]();for(u=w;u<p;u++)u in h?(s[u]=h[u],l[u]=_[u],o&&(o[u]=k[u],o[u](u))):s[u]=W(y);s=s.slice(0,r=p),i=f.slice(0)}return s});function y(p){if(l[u]=p,o){const[A,S]=H(u);return o[u]=S,n(f[u],A)}return n(f[u])}}}function Y(e,n){return q(()=>e(n||{}))}function Xe(e){const n="fallback"in e&&{fallback:()=>e.fallback};return Ue(Ke(()=>e.each,e.children,n||void 0))}function Je(e,n,t){let i=t.length,s=n.length,l=i,r=0,o=0,f=n[s-1].nextSibling,c=null;for(;r<s||o<l;){if(n[r]===t[o]){r++,o++;continue}for(;n[s-1]===t[l-1];)s--,l--;if(s===r){const u=l<i?o?t[o-1].nextSibling:t[l-o]:f;for(;o<l;)e.insertBefore(t[o++],u)}else if(l===o)for(;r<s;)(!c||!c.has(n[r]))&&n[r].remove(),r++;else if(n[r]===t[l-1]&&t[o]===n[s-1]){const u=n[--s].nextSibling;e.insertBefore(t[o++],n[r++].nextSibling),e.insertBefore(t[--l],u),n[s]=t[l]}else{if(!c){c=new Map;let y=o;for(;y<l;)c.set(t[y],y++)}const u=c.get(n[r]);if(u!=null)if(o<u&&u<l){let y=r,p=1,A;for(;++y<s&&y<l&&!((A=c.get(n[y]))==null||A!==u+p);)p++;if(p>u-o){const S=n[r];for(;o<u;)e.insertBefore(t[o++],S)}else e.replaceChild(t[o++],n[r++])}else r++;else n[r++].remove()}}}const ye="_$DX_DELEGATE";function Ze(e,n,t,i={}){let s;return W(l=>{s=l,n===document?e():Q(n,e(),n.firstChild?null:void 0,t)},i.owner),()=>{s(),n.textContent=""}}function oe(e,n,t){const i=document.createElement("template");i.innerHTML=e;let s=i.content.firstChild;return t&&(s=s.firstChild),s}function Ye(e,n=window.document){const t=n[ye]||(n[ye]=new Set);for(let i=0,s=e.length;i<s;i++){const l=e[i];t.has(l)||(t.add(l),n.addEventListener(l,tt))}}function ke(e,n,t){t==null?e.removeAttribute(n):e.setAttribute(n,t)}function ze(e,n){n==null?e.removeAttribute("class"):e.className=n}function j(e,n,t,i){if(i)Array.isArray(t)?(e[`$$${n}`]=t[0],e[`$$${n}Data`]=t[1]):e[`$$${n}`]=t;else if(Array.isArray(t)){const s=t[0];e.addEventListener(n,t[0]=l=>s.call(e,t[1],l))}else e.addEventListener(n,t)}function et(e,n,t){if(!n)return t?ke(e,"style"):n;const i=e.style;if(typeof n=="string")return i.cssText=n;typeof t=="string"&&(i.cssText=t=void 0),t||(t={}),n||(n={});let s,l;for(l in t)n[l]==null&&i.removeProperty(l),delete t[l];for(l in n)s=n[l],s!==t[l]&&(i.setProperty(l,s),t[l]=s);return t}function K(e,n,t){return q(()=>e(n,t))}function Q(e,n,t,i){if(t!==void 0&&!i&&(i=[]),typeof n!="function")return z(e,n,i,t);U(s=>z(e,n(),s,t),i)}function tt(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),N.registry&&!N.done&&(N.done=!0,document.querySelectorAll("[id^=pl-]").forEach(i=>i.remove()));t!==null;){const i=t[n];if(i&&!t.disabled){const s=t[`${n}Data`];if(s!==void 0?i.call(t,s,e):i.call(t,e),e.cancelBubble)return}t=t.host&&t.host!==t&&t.host instanceof Node?t.host:t.parentNode}}function z(e,n,t,i,s){for(N.context&&!t&&(t=[...e.childNodes]);typeof t=="function";)t=t();if(n===t)return t;const l=typeof n,r=i!==void 0;if(e=r&&t[0]&&t[0].parentNode||e,l==="string"||l==="number"){if(N.context)return t;if(l==="number"&&(n=n.toString()),r){let o=t[0];o&&o.nodeType===3?o.data=n:o=document.createTextNode(n),t=D(e,t,i,o)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n}else if(n==null||l==="boolean"){if(N.context)return t;t=D(e,t,i)}else{if(l==="function")return U(()=>{let o=n();for(;typeof o=="function";)o=o();t=z(e,o,t,i)}),()=>t;if(Array.isArray(n)){const o=[],f=t&&Array.isArray(t);if(ie(o,n,t,s))return U(()=>t=z(e,o,t,i,!0)),()=>t;if(N.context){if(!o.length)return t;for(let c=0;c<o.length;c++)if(o[c].parentNode)return t=o}if(o.length===0){if(t=D(e,t,i),r)return t}else f?t.length===0?Ae(e,o,i):Je(e,t,o):(t&&D(e),Ae(e,o));t=o}else if(n instanceof Node){if(N.context&&n.parentNode)return t=r?[n]:n;if(Array.isArray(t)){if(r)return t=D(e,t,i,n);D(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function ie(e,n,t,i){let s=!1;for(let l=0,r=n.length;l<r;l++){let o=n[l],f=t&&t[l];if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))s=ie(e,o,f)||s;else if(typeof o=="function")if(i){for(;typeof o=="function";)o=o();s=ie(e,Array.isArray(o)?o:[o],Array.isArray(f)?f:[f])||s}else e.push(o),s=!0;else{const c=String(o);f&&f.nodeType===3&&f.data===c?e.push(f):e.push(document.createTextNode(c))}}return s}function Ae(e,n,t=null){for(let i=0,s=n.length;i<s;i++)e.insertBefore(n[i],t)}function D(e,n,t,i){if(t===void 0)return e.textContent="";const s=i||document.createTextNode("");if(n.length){let l=!1;for(let r=n.length-1;r>=0;r--){const o=n[r];if(s!==o){const f=o.parentNode===e;!l&&!r?f?e.replaceChild(s,o):e.insertBefore(s,t):f&&o.remove()}else l=!0}}else e.insertBefore(s,t);return[s]}function nt(e,n=!1,t=!1){let i;document.hidden!==void 0?i={hidden:"hidden",visibilitychange:"visibilitychange"}:document.webkitHidden!==void 0?i={hidden:"webkitHidden",visibilitychange:"webkitvisibilitychange"}:document.mozHidden!==void 0?i={hidden:"mozHidden",visibilitychange:"mozvisibilitychange"}:document.msHidden!==void 0&&(i={hidden:"msHidden",visibilitychange:"msvisibilitychange"});function s(d,$,T,O,I){for(let E=0;E<$.length;++E)d.addEventListener($[E],T,{capture:O,passive:I})}function l(d,$,T,O,I){for(let E=0;E<$.length;++E)d.removeEventListener($[E],T,{capture:O,passive:I})}function r(){}let o=navigator.userAgent.toLowerCase(),f=t||o.indexOf("iphone")>=0&&o.indexOf("like iphone")<0||o.indexOf("ipad")>=0&&o.indexOf("like ipad")<0||o.indexOf("ipod")>=0&&o.indexOf("like ipod")<0||o.indexOf("mac os x")>=0&&navigator.maxTouchPoints>0,c=!0;function u(){let d=!!(n||(!i||!document[i.hidden])&&(!f||document.hasFocus()));d!==c&&(c=d,w(!1),A())}function y(){u()}i&&s(document,[i.visibilitychange],y,!0,!0);function p(d){d&&d.target!==window||u()}f&&s(window,["focus","blur"],p,!0,!0);function A(){if(c){if(e.state!=="running"&&e.state!=="closed"&&m){let d=e.resume();d&&d.then(r,r).catch(r)}}else if(e.state==="running"){let d=e.suspend();d&&d.then(r,r).catch(r)}}function S(d){(!d||!d.unmute_handled)&&(d.unmute_handled=!0,A())}s(e,["statechange"],S,!0,!0),e.onstatechange||(e.onstatechange=S);let h=null;function _(d,$){let T=$;for(;d>1;d--)T+=$;return T}let k="data:audio/mpeg;base64,//uQx"+_(23,"A")+"WGluZwAAAA8AAAACAAACcQCA"+_(16,"gICA")+_(66,"/")+"8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkI"+_(320,"A")+"//sQxAADgnABGiAAQBCqgCRMAAgEAH"+_(15,"/")+"7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq"+_(18,"/")+"9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAw"+_(97,"V")+"Q==";function w(d){if(f)if(c){if(d){if(!h){let $=document.createElement("div");$.innerHTML="<audio x-webkit-airplay='deny'></audio>",h=$.children.item(0),h.controls=!1,h.disableRemotePlayback=!0,h.preload="auto",h.src=k,h.loop=!0,h.load()}if(h.paused){let $=h.play();$&&$.then(r,g).catch(g)}}}else g()}function g(){h&&(h.src="about:blank",h.load(),h=null)}const a=["click","contextmenu","auxclick","dblclick","mousedown","mouseup","touchend","keydown","keyup"];let m=!1;function L(){m=!0,w(!0),A()}return s(window,a,L,!0,!0),{dispose:function(){g(),i&&l(document,[i.visibilitychange],y,!0,!0),f&&l(window,["focus","blur"],p,!0,!0),l(window,a,L,!0,!0),l(e,["statechange"],S,!0,!0),e.onstatechange===S&&(e.onstatechange=null)}}}const P=new AudioContext;nt(P);const Te=P.createDynamicsCompressor();Te.connect(P.destination);const it=oe('<label tabindex="0" class="audio-input"><svg viewBox="0 0 2 2" width="20"><title>add clips</title><path d="M 1 0 v 2 M 0 1 h 2" stroke="black" fill="none" stroke-width="0.25"></path></svg><input type="file" style="display: none;" accept=".mp3, .wav, .m4a" multiple></label>'),st=e=>{let n;return(()=>{const t=it.cloneNode(!0),i=t.firstChild,s=i.nextSibling;t.addEventListener("keypress",r=>{["Space","Enter"].includes(r.code)&&(r.preventDefault(),n?.click())}),s.addEventListener("change",r=>{const o=[...r.currentTarget.files||[]];Promise.all(o.map(lt)).then(e.onChange)});const l=n;return typeof l=="function"?K(l,s):n=s,t})()},lt=async e=>({name:e.name,buffer:await ot(e)}),ot=e=>new Promise((n,t)=>{const i=new FileReader;i.onloadend=s=>{if(!(s.target?.result instanceof ArrayBuffer)){t();return}P.decodeAudioData(s.target.result,n)},i.readAsArrayBuffer(e)}),Ne=64,rt=(e,{x:n,y:t})=>`${e} M ${n}, ${t} `,ut=(e,{x:n,y:t})=>`${e} L ${n}, ${t} `,ft=e=>{const[n,...t]=e;return t.reduce((i,s,l)=>ut(i,{x:(l+1)*(2/(Ne-1)),y:s}),rt("",{x:0,y:n}))},ct=oe('<article><figure><svg viewBox="0 -1 2 2"><path stroke="black" stroke-width=".03" fill="none"></path></svg><figcaption><p></p><p>s</p><p> channel</p></figcaption></figure><div class="controls"><label><span>Speed</span><input type="range" name="speed" min="0.5" max="2" step="0.001" value="1"></label><label><span>Gain</span><input type="range" name="gain" min="0" max="1" step="0.01" value="1"></label><label><span>Loop</span><input type="checkbox" name="loop"></label><label><span>Hold</span><input type="checkbox" name="hold"></label></div></article>'),V="ontouchstart"in window,at=e=>{const n=P.createAnalyser(),t=P.createGain();t.gain.value=1,t.connect(Te),t.connect(n);const i=new Float32Array(Ne);let s,l,r,o;const[f,c]=H(!1),[u,y]=H(void 0),[p,A]=H(""),[S,h]=H(0),_=()=>{const a=P.createBufferSource();return a.buffer=e.clip.buffer,a.playbackRate.value=l?parseFloat(l.value):1,a.loop=r?r.checked:!1,a.onended=g,a.connect(t),a.start(),a},k=()=>{n.getFloatTimeDomainData(i),A(ft(i)),h(dt(i)),o=requestAnimationFrame(k)},w=()=>{if(u())return g();y(_()),o=requestAnimationFrame(k)},g=()=>{const a=u();a&&a.stop(),y(void 0),cancelAnimationFrame(o),A(""),h(0)};return(()=>{const a=ct.cloneNode(!0),m=a.firstChild,L=m.firstChild,d=L.firstChild,$=L.nextSibling,T=$.firstChild,O=T.nextSibling,I=O.firstChild,E=O.nextSibling,Oe=E.firstChild,Fe=m.nextSibling,re=Fe.firstChild,Be=re.firstChild,te=Be.nextSibling,ue=re.nextSibling,Pe=ue.firstChild,ne=Pe.nextSibling,fe=ue.nextSibling,Me=fe.firstChild,ce=Me.nextSibling,De=fe.nextSibling,He=De.firstChild,ae=He.nextSibling;j(m,"mouseleave",V?void 0:()=>!f()&&g()),j(m,"mouseup",V?void 0:()=>!f()&&g(),!0),j(m,"mousedown",V?void 0:w,!0),j(m,"mouseenter",V?void 0:C=>C.buttons&&w()),m.$$touchend=()=>!f()&&g(),m.$$touchstart=w,Q(T,()=>e.clip.name),Q(O,()=>e.clip.buffer.duration.toFixed(2),I),Q(E,()=>e.clip.buffer.numberOfChannels,Oe),te.$$input=C=>y(R=>{if(!!R)return R.playbackRate.value=parseFloat(C.currentTarget.value),R});const de=l;typeof de=="function"?K(de,te):l=te,ne.$$input=C=>{t.gain.value=parseFloat(C.currentTarget.value)};const he=s;typeof he=="function"?K(he,ne):s=ne;const pe=r;return typeof pe=="function"?K(pe,ce):r=ce,ae.$$input=()=>c(C=>!C),U(C=>{const R=`--rms: ${S()}`,ge=u()?"active":void 0,me=p();return C._v$=et(m,R,C._v$),ge!==C._v$2&&ze(m,C._v$2=ge),me!==C._v$3&&ke(d,"d",C._v$3=me),C},{_v$:void 0,_v$2:void 0,_v$3:void 0}),U(()=>ae.checked=f()),a})()},dt=e=>e.reduce((n,t)=>n+Math.abs(t),0)/e.length;Ye(["touchstart","touchend","mousedown","mouseup","input"]);const ht=oe('<div class="clips"></div>'),pt=()=>[Y(st,{onChange:bt}),Y(gt,{})],gt=()=>(()=>{const e=ht.cloneNode(!0);return Q(e,Y(Xe,{get each(){return Le()},children:n=>Y(at,{clip:n})})),e})(),[Le,mt]=H([]),bt=e=>mt(yt(Le(),e)),yt=(e,n)=>{const t=i=>!e.find(s=>s.name===i.name&&s.buffer.length===i.buffer.length);return[...e,...n.filter(t)]};Ze(pt,document.getElementById("root"));