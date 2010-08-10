/*
Copyright 2010, KISSY UI Library v1.1.2dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("dom",function(c){var r={_isSupportedNode:function(m){return r._isElementNode(m)||r._isTextNode(m)},_isElementNode:function(m){return m&&m.nodeType===1},_isTextNode:function(m){return m&&m.nodeType===3},_isKSNode:function(m){return m&&c.Node&&m.nodeType===c.Node.TYPE}};c.DOM=r});
KISSY.add("selector",function(c,r){function m(a,b){var e,g=[],o,y;b=B(b);if(c.isString(a)){a=c.trim(a);if(C.test(a)){if(a=t(a.slice(1),b))g=[a]}else if(e=q.exec(a)){o=e[1];y=e[2];e=e[3];if(b=o?t(o,b):b)if(e)if(!o||a.indexOf(l)!==-1)g=k(e,y,b);else{if((a=t(o,b))&&u.hasClass(a,e))g=[a]}else if(y)g=v(y,b)}else if(c.ExternalSelector)return c.ExternalSelector(a,b);else f(a)}else if(a&&(a[s]||a[x]))g=a[s]?[a[s]()]:a[x]();else if(a&&a.nodeType)g=[a];else if(a&&(c.isArray(a)||a.item))g=a;if(g.item)g=c.makeArray(g);
g.each=function(j,n){return c.each(g,j,n)};return g}function B(a){if(a===r)a=i;else if(c.isString(a)&&C.test(a))a=t(a.slice(1),i);else if(a&&a.nodeType!==1&&a.nodeType!==9)a=null;return a}function t(a,b){if(b.nodeType!==9)b=b.ownerDocument;return b.getElementById(a)}function v(a,b){return b.getElementsByTagName(a)}function k(a,b,e){e=a=e.getElementsByClassName(a);var g=0,o=0,y=a.length,j;if(b&&b!==p){e=[];for(b=b.toUpperCase();g<y;++g){j=a[g];if(j.tagName===b)e[o++]=j}}return e}function f(a){c.error("Unsupported selector: "+
a)}var i=document,u=c.DOM,l=" ",p="*",s="getDOMNode",x=s+"s",C=/^#[\w-]+$/,q=/^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/;(function(){var a=i.createElement("div");a.appendChild(i.createComment(""));if(a.getElementsByTagName(p).length>0)v=function(b,e){e=e.getElementsByTagName(b);if(b===p){b=[];for(var g=0,o=0,y;y=e[g++];)if(y.nodeType===1)b[o++]=y;e=b}return e}})();i.getElementsByClassName||(k=i.querySelectorAll?function(a,b,e){return e.querySelectorAll((b?b:"")+"."+a)}:function(a,b,e){b=e.getElementsByTagName(b||
p);e=[];var g=0,o=0,y=b.length,j,n;for(a=l+a+l;g<y;++g){j=b[g];if((n=j.className)&&(l+n+l).indexOf(a)>-1)e[o++]=j}return e});c.query=m;c.get=function(a,b){return m(a,b)[0]||null};c.mix(u,{query:m,get:c.get,filter:function(a,b){var e=m(a),g,o,y,j=[];if(c.isString(b)&&(g=q.exec(b))&&!g[1]){o=g[2];y=g[3];b=function(n){return!(o&&n.tagName!==o.toUpperCase()||y&&!u.hasClass(n,y))}}if(c.isFunction(b))j=c.filter(e,b);else if(b&&c.ExternalSelector)j=c.ExternalSelector._filter(a,b);else f(b);return j},test:function(a,
b){a=m(a);return u.filter(a,b).length===a.length}})});
KISSY.add("dom-class",function(c,r){function m(k,f,i,u){if(!(f=c.trim(f)))return u?false:r;k=c.query(k);var l=0,p=k.length;f=f.split(t);for(var s;l<p;l++){s=k[l];if(B._isElementNode(s)){s=i(s,f,f.length);if(s!==r)return s}}if(u)return false}var B=c.DOM,t=/[\.\s]\s*\.?/,v=/[\n\t]/g;c.mix(B,{hasClass:function(k,f){return m(k,f,function(i,u,l){if(i=i.className){i=" "+i+" ";for(var p=0,s=true;p<l;p++)if(i.indexOf(" "+u[p]+" ")<0){s=false;break}if(s)return true}},true)},addClass:function(k,f){m(k,f,function(i,
u,l){var p=i.className;if(p){var s=" "+p+" ";p=p;for(var x=0;x<l;x++)if(s.indexOf(" "+u[x]+" ")<0)p+=" "+u[x];i.className=c.trim(p)}else i.className=f})},removeClass:function(k,f){m(k,f,function(i,u,l){var p=i.className;if(p)if(l){p=(" "+p+" ").replace(v," ");for(var s=0,x;s<l;s++)for(x=" "+u[s]+" ";p.indexOf(x)>=0;)p=p.replace(x," ");i.className=c.trim(p)}else i.className=""})},replaceClass:function(k,f,i){B.removeClass(k,f);B.addClass(k,i)},toggleClass:function(k,f,i){var u=c.isBoolean(i),l;m(k,
f,function(p,s,x){for(var C=0,q;C<x;C++){q=s[C];l=u?!i:B.hasClass(p,q);B[l?"removeClass":"addClass"](p,q)}})}})});
KISSY.add("dom-attr",function(c,r){function m(q,a){return a&&a.nodeName.toUpperCase()===q.toUpperCase()}var B=c.UA,t=B.ie,v=t&&t<8,k=document.documentElement.textContent!==r?"textContent":"innerText",f=c.DOM,i=f._isElementNode,u=f._isTextNode,l=/href|src|style/,p=/href|src|colspan|rowspan/,s=/\r/g,x=/radio|checkbox/,C={readonly:"readOnly"};v&&c.mix(C,{"for":"htmlFor","class":"className"});c.mix(f,{attr:function(q,a,b){if(c.isPlainObject(a))for(var e in a)f.attr(q,e,a[e]);else if(a=c.trim(a)){a=a.toLowerCase();
a=C[a]||a;if(b===r){q=c.get(q);if(!i(q))return r;var g;l.test(a)||(g=q[a]);if(g===r)g=q.getAttribute(a);if(v)if(p.test(a))g=q.getAttribute(a,2);else if(a==="style")g=q.style.cssText;return g===null?r:g}c.each(c.query(q),function(o){if(i(o))if(a==="style")o.style.cssText=b;else{if(a==="checked")o[a]=!!b;o.setAttribute(a,""+b)}})}},removeAttr:function(q,a){c.each(c.query(q),function(b){if(i(b)){f.attr(b,a,"");b.removeAttribute(a)}})},val:function(q,a){if(a===r){var b=c.get(q);if(!i(b))return r;if(m("option",
b))return(b.attributes.value||{}).specified?b.value:b.text;if(m("select",b)){var e=b.selectedIndex;q=b.options;if(e<0)return null;else if(b.type==="select-one")return f.val(q[e]);b=[];for(var g=0,o=q.length;g<o;++g)q[g].selected&&b.push(f.val(q[g]));return b}if(B.webkit&&x.test(b.type))return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(s,"")}c.each(c.query(q),function(y){if(m("select",y)){if(c.isNumber(a))a+="";var j=c.makeArray(a),n=y.options,z;g=0;for(o=n.length;g<o;++g){z=
n[g];z.selected=c.inArray(f.val(z),j)}if(!j.length)y.selectedIndex=-1}else if(i(y))y.value=a})},text:function(q,a){if(a===r){q=c.get(q);if(i(q))return q[k]||"";else if(u(q))return q.nodeValue}else c.each(c.query(q),function(b){if(i(b))b[k]=a;else if(u(b))b.nodeValue=a})}})});
KISSY.add("dom-style",function(c,r){function m(a,b){var e=c.get(a),g=b===i?e.offsetWidth:e.offsetHeight;c.each(b===i?["Left","Right"]:["Top","Bottom"],function(o){g-=parseFloat(t._getComputedStyle(e,"padding"+o))||0;g-=parseFloat(t._getComputedStyle(e,"border"+o+"Width"))||0});return g}function B(a,b,e){var g=e;if(e===u&&p.test(b)){g=0;if(t.css(a,"position")==="absolute"){e=a[b==="left"?"offsetLeft":"offsetTop"];if(v.ie===8||v.opera)e-=l(t.css(a.offsetParent,"border-"+b+"-width"))||0;g=e-(l(t.css(a,
"margin-"+b))||0)}}return g}var t=c.DOM,v=c.UA,k=document,f=k.documentElement,i="width",u="auto",l=parseInt,p=/^left|top$/,s=/width|height|top|left|right|bottom|margin|padding/i,x=/-([a-z])/ig,C=function(a,b){return b.toUpperCase()},q={};c.mix(t,{_CUSTOM_STYLES:q,_getComputedStyle:function(a,b){var e="",g=a.ownerDocument;if(a.style)e=g.defaultView.getComputedStyle(a,null)[b];return e},css:function(a,b,e){if(c.isPlainObject(b))for(var g in b)t.css(a,g,b[g]);else{if(b.indexOf("-")>0)b=b.replace(x,C);
b=q[b]||b;if(e===r){a=c.get(a);g="";if(a&&a.style){g=b.get?b.get(a):a.style[b];if(g===""&&!b.get)g=B(a,b,t._getComputedStyle(a,b))}return g===r?"":g}else{if(e===null||e==="")e="";else if(!isNaN(new Number(e))&&s.test(b))e+="px";(b===i||b==="height")&&parseFloat(e)<0||c.each(c.query(a),function(o){if(o&&o.style){b.set?b.set(o,e):(o.style[b]=e);if(e==="")o.style.cssText||o.removeAttribute("style")}})}}},width:function(a,b){if(b===r)return m(a,i);else t.css(a,i,b)},height:function(a,b){if(b===r)return m(a,
"height");else t.css(a,"height",b)},addStyleSheet:function(a,b){var e;if(b)e=c.get(b);e||(e=t.create("<style>",{id:b}));c.get("head").appendChild(e);if(e.styleSheet)e.styleSheet.cssText=a;else e.appendChild(k.createTextNode(a))}});if(f.style.cssFloat!==r)q["float"]="cssFloat";else if(f.style.styleFloat!==r)q["float"]="styleFloat"});
KISSY.add("dom-style-ie",function(c,r){if(c.UA.ie){var m=c.DOM,B=document,t=B.documentElement,v=m._CUSTOM_STYLES,k=/^-?\d+(?:px)?$/i,f=/^-?\d/,i=/^width|height$/;try{if(t.style.opacity===r&&t.filters)v.opacity={get:function(l){var p=100;try{p=l.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(s){try{p=l.filters("alpha").opacity}catch(x){}}return p/100+""},set:function(l,p){l=l.style;l.zoom=1;l.filter="alpha(opacity="+p*100+")"}}}catch(u){c.log("IE filters ActiveX is disabled. ex = "+u)}if(!(B.defaultView||
{}).getComputedStyle&&t.currentStyle)m._getComputedStyle=function(l,p){var s=l.style,x=l.currentStyle[p];if(i.test(p))x=m[p](l)+"px";else if(!k.test(x)&&f.test(x)){var C=s.left,q=l.runtimeStyle.left;l.runtimeStyle.left=l.currentStyle.left;s.left=p==="fontSize"?"1em":x||0;x=s.pixelLeft+"px";s.left=C;l.runtimeStyle.left=q}return x}}});
KISSY.add("dom-offset",function(c,r){function m(j){var n=0,z=0,d=t(j[a]);if(j[y]){j=j[y]();n=j[b];z=j[e];if(k.mobile!=="Apple"){n+=v[g](d);z+=v[o](d)}}return{left:n,top:z}}function B(j,n){if(v.css(j,x)==="static")j.style[x]=C;var z=m(j),d={},h,w;for(w in n){h=s(v.css(j,w),10)||0;d[w]=h+n[w]-z[w]}v.css(j,d)}function t(j){return j&&"scrollTo"in j&&j[q]?j:j&&j.nodeType===9?j.defaultView||j.parentWindow:false}var v=c.DOM,k=c.UA,f=window,i=document,u=v._isElementNode,l=i.compatMode==="CSS1Compat",p=Math.max,
s=parseInt,x="position",C="relative",q="document",a="ownerDocument",b="left",e="top",g="scrollLeft",o="scrollTop",y="getBoundingClientRect";c.mix(v,{offset:function(j,n){if(!(j=c.get(j))||!j[a])return null;if(n===r)return m(j);B(j,n)},scrollIntoView:function(j,n,z,d){if((j=c.get(j))&&j[a]){n=c.get(n);d=d===r?true:!!d;z=z===r?true:!!z;if(!u(n))return j.scrollIntoView(z);var h=v.offset(j),w=v.offset(n),A={left:h[b]-w[b],top:h[e]-w[e]};h=n.clientHeight;w=n.clientWidth;var D=v[g](n),F=v[o](n),G=D+w,E=
F+h,I=j.offsetHeight;j=j.offsetWidth;var H=A.left+D-(s(v.css(n,"borderLeftWidth"))||0);A=A.top+F-(s(v.css(n,"borderTopWidth"))||0);var J=H+j,K=A+I;if(I>h||A<F||z)n[o]=A;else if(K>E)n[o]=K-h;if(d)if(j>w||H<D||z)n[g]=H;else if(J>G)n[g]=J-w}}});c.each(["Left","Top"],function(j,n){var z="scroll"+j;v[z]=function(d){var h=0,w=d===r?f:t(d),A;if(w&&(A=w[q]))h=w[n?"pageYOffset":"pageXOffset"]||A.documentElement[z]||A.body[z];else if(u(d=c.get(d)))h=d[z];return h}});c.each(["Width","Height"],function(j){v["doc"+
j]=function(n){n=n||i;return p(l?n.documentElement["scroll"+j]:n.body["scroll"+j],v["viewport"+j](n))};v["viewport"+j]=function(n){var z="inner"+j;n=t(n)||f;var d=n[q];return z in n?n[z]:l?d.documentElement["client"+j]:d.body["client"+j]}})});
KISSY.add("dom-traversal",function(c,r){function m(k,f,i,u){if(!(k=c.get(k)))return null;if(f===r)f=1;var l=null,p,s;if(c.isNumber(f)&&f>=0){if(f===0)return k;p=0;s=f;f=function(){return++p===s}}for(;k=k[i];)if(v(k)&&(!f||t.test(k,f))&&(!u||u(k))){l=k;break}return l}function B(k,f,i){var u=[];var l=k=c.get(k);if(k&&i)l=k.parentNode;if(l){i=0;for(l=l.firstChild;l;l=l.nextSibling)if(v(l)&&l!==k&&(!f||t.test(l,f)))u[i++]=l}return u}var t=c.DOM,v=t._isElementNode;c.mix(t,{parent:function(k,f){return m(k,
f,"parentNode",function(i){return i.nodeType!=11})},next:function(k,f){return m(k,f,"nextSibling")},prev:function(k,f){return m(k,f,"previousSibling")},siblings:function(k,f){return B(k,f,true)},children:function(k,f){return B(k,f)},contains:function(k,f){var i=false;if((k=c.get(k))&&(f=c.get(f)))if(k.contains)return k.contains(f);else if(k.compareDocumentPosition)return!!(k.compareDocumentPosition(f)&16);else for(;!i&&(f=f.parentNode);)i=f==k;return i}})});
KISSY.add("dom-create",function(c,r){function m(d,h){s(d)&&c.isPlainObject(h)&&i.attr(d,h);return d}function B(d,h){var w=null,A;if(d&&(d.push||d.item)&&d[0]){h=h||d[0].ownerDocument;w=h.createDocumentFragment();if(d.item)d=c.makeArray(d);h=0;for(A=d.length;h<A;h++)w.appendChild(d[h])}else c.log("Unable to convert "+d+" to fragment.");return w}function t(d){var h=d.cloneNode(true);if(u.ie<8)h.innerHTML=d.innerHTML;return h}function v(d,h,w,A){if(w){var D=c.guid("ks-tmp-"),F=new RegExp(a);h+='<span id="'+
D+'"></span>';c.available(D,function(){var G=c.get("head"),E,I,H,J,K,L;for(F.lastIndex=0;E=F.exec(h);)if((H=(I=E[1])?I.match(e):false)&&H[2]){E=f.createElement("script");E.src=H[2];if((J=I.match(g))&&J[2])E.charset=J[2];E.async=true;G.appendChild(E)}else if((L=E[2])&&L.length>0)c.globalEval(L);(K=f.getElementById(D))&&i.remove(K);c.isFunction(A)&&A()});k(d,h)}else{k(d,h);c.isFunction(A)&&A()}}function k(d,h){h=(h+"").replace(a,"");try{d.innerHTML=h}catch(w){for(;d.firstChild;)d.removeChild(d.firstChild);
h&&d.appendChild(i.create(h))}}var f=document,i=c.DOM,u=c.UA,l=u.ie,p=i._isSupportedNode,s=i._isElementNode,x=i._isKSNode,C=f.createElement("div"),q=/<(\w+)/,a=/<script([^>]*)>([\s\S]*?)<\/script>/ig,b=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,e=/\ssrc=(['"])(.*?)\1/i,g=/\scharset=(['"])(.*?)\1/i;c.mix(i,{create:function(d,h,w){if(p(d))return t(d);if(x(d))return t(d[0]);if(!(d=c.trim(d)))return null;var A=null;A=i._creators;var D,F="div",G;if(D=b.exec(d))A=(w||f).createElement(D[1]);else{if((D=q.exec(d))&&(G=
D[1])&&c.isFunction(A[G=G.toLowerCase()]))F=G;d=A[F](d,w).childNodes;A=d.length===1?d[0].parentNode.removeChild(d[0]):B(d,w||f)}return m(A,h)},_creators:{div:function(d,h){h=h?h.createElement("div"):C;h.innerHTML=d;return h}},html:function(d,h,w,A){if(h===r){d=c.get(d);if(s(d))return d.innerHTML}else c.each(c.query(d),function(D){s(D)&&v(D,h,w,A)})},remove:function(d){c.each(c.query(d),function(h){s(h)&&h.parentNode&&h.parentNode.removeChild(h)})}});if(u.gecko||l){var o=i._creators,y=i.create,j=/(?:\/(?:thead|tfoot|caption|col|colgroup)>)+\s*<tbody/,
n={option:"select",td:"tr",tr:"tbody",tbody:"table",col:"colgroup",legend:"fieldset"};for(var z in n)(function(d){o[z]=function(h,w){return y("<"+d+">"+h+"</"+d+">",null,w)}})(n[z]);if(l){o.script=function(d,h){h=h?h.createElement("div"):C;h.innerHTML="-"+d;h.removeChild(h.firstChild);return h};if(l<8)o.tbody=function(d,h){h=y("<table>"+d+"</table>",null,h);var w=h.children.tags("tbody")[0];h.children.length>1&&w&&!j.test(d)&&w.parentNode.removeChild(w);return h}}c.mix(o,{optgroup:o.option,th:o.td,
thead:o.tbody,tfoot:o.tbody,caption:o.tbody,colgroup:o.tbody})}});KISSY.add("dom-insertion",function(c){c.mix(c.DOM,{insertBefore:function(r,m){if((r=c.get(r))&&(m=c.get(m))&&m.parentNode)m.parentNode.insertBefore(r,m);return r},insertAfter:function(r,m){if((r=c.get(r))&&(m=c.get(m))&&m.parentNode)m.nextSibling?m.parentNode.insertBefore(r,m.nextSibling):m.parentNode.appendChild(r);return r}})});
