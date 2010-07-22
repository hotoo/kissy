/*
Copyright 2010, KISSY UI Library v1.1.0
MIT Licensed
build: 896 Jul 22 10:02
*/
KISSY.add("dom",function(a){var r={_isSupportedNode:function(p){return r._isElementNode(p)||r._isTextNode(p)},_isElementNode:function(p){return p&&p.nodeType===1},_isTextNode:function(p){return p&&p.nodeType===3}};a.DOM=r});
KISSY.add("selector",function(a,r){function p(f,e){var c,b=[],i,n;e=s(e);if(a.isString(f)){f=a.trim(f);if(t.test(f)){if(f=v(f.slice(1)))b=[f]}else if(c=z.exec(f)){i=c[1];n=c[2];c=c[3];if(e=i?v(i):e)if(c)if(!i||f.indexOf(m)!==-1)b=j(c,n,e);else{if((f=v(i))&&w.hasClass(f,c))b=[f]}else if(n)b=u(e,n)}else if(a.ExternalSelector)return a.ExternalSelector(f,e);else h(f)}else if(f&&f.nodeType)b=[f];else if(f&&(a.isArray(f)||f.item||f.getDOMNode))b=f;if(b.item)b=a.makeArray(b);return b}function s(f){if(f===
r)f=k;else if(a.isString(f)&&t.test(f))f=v(f.slice(1));else if(f&&f.nodeType!==1&&f.nodeType!==9)f=null;return f}function v(f){return k.getElementById(f)}function u(f,e){return f.getElementsByTagName(e)}function j(f,e,c){c=f=c.getElementsByClassName(f);var b=0,i=0,n=f.length,x;if(e&&e!==o){c=[];for(e=e.toUpperCase();b<n;++b){x=f[b];if(x.tagName===e)c[i++]=x}}return c}function h(f){a.error("Unsupported selector: "+f)}var k=document,w=a.DOM,m=" ",o="*",t=/^#[\w-]+$/,z=/^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/;
(function(){var f=k.createElement("div");f.appendChild(k.createComment(""));if(f.getElementsByTagName(o).length>0)u=function(e,c){e=e.getElementsByTagName(c);if(c===o){c=[];for(var b=0,i=0,n;n=e[b++];)if(n.nodeType===1)c[i++]=n;e=c}return e}})();k.getElementsByClassName||(j=k.querySelectorAll?function(f,e,c){return c.querySelectorAll((e?e:"")+"."+f)}:function(f,e,c){e=c.getElementsByTagName(e||o);c=[];var b=0,i=0,n=e.length,x,l;for(f=m+f+m;b<n;++b){x=e[b];if((l=x.className)&&(m+l+m).indexOf(f)>-1)c[i++]=
x}return c});a.query=p;a.get=function(f,e){return p(f,e)[0]||null};a.mix(w,{query:p,get:a.get,filter:function(f,e){var c=p(f),b,i,n,x=[];if(a.isString(e)&&(b=z.exec(e))&&!b[1]){i=b[2];n=b[3];e=function(l){return!(i&&l.tagName!==i.toUpperCase()||n&&!w.hasClass(l,n))}}if(a.isFunction(e))x=a.filter(c,e);else if(e&&a.ExternalSelector)x=a.ExternalSelector._filter(f,e);else h(e);return x},test:function(f,e){f=p(f);return w.filter(f,e).length===f.length}})});
KISSY.add("dom-class",function(a,r){function p(j,h,k,w){if(!(h=a.trim(h)))return w?false:r;j=a.query(j);var m=0,o=j.length;h=h.split(v);for(var t;m<o;m++){t=j[m];if(s._isElementNode(t)){t=k(t,h,h.length);if(t!==r)return t}}if(w)return false}var s=a.DOM,v=/[\.\s]\s*\.?/,u=/[\n\t]/g;a.mix(s,{hasClass:function(j,h){return p(j,h,function(k,w,m){if(k=k.className){k=" "+k+" ";for(var o=0,t=true;o<m;o++)if(k.indexOf(" "+w[o]+" ")<0){t=false;break}if(t)return true}},true)},addClass:function(j,h){p(j,h,function(k,
w,m){var o=k.className;if(o){var t=" "+o+" ";o=o;for(var z=0;z<m;z++)if(t.indexOf(" "+w[z]+" ")<0)o+=" "+w[z];k.className=a.trim(o)}else k.className=h})},removeClass:function(j,h){p(j,h,function(k,w,m){var o=k.className;if(o)if(m){o=(" "+o+" ").replace(u," ");for(var t=0,z;t<m;t++)for(z=" "+w[t]+" ";o.indexOf(z)>=0;)o=o.replace(z," ");k.className=a.trim(o)}else k.className=""})},replaceClass:function(j,h,k){s.removeClass(j,h);s.addClass(j,k)},toggleClass:function(j,h,k){var w=a.isBoolean(k),m;p(j,
h,function(o,t,z){for(var f=0,e;f<z;f++){e=t[f];m=w?!k:s.hasClass(o,e);s[m?"removeClass":"addClass"](o,e)}})}})});
KISSY.add("dom-attr",function(a,r){function p(e,c){return c&&c.nodeName.toUpperCase()===e.toUpperCase()}var s=a.UA,v=s.ie,u=v&&v<8,j=document.documentElement.textContent!==r?"textContent":"innerText",h=a.DOM,k=h._isElementNode,w=h._isTextNode,m=/href|src|style/,o=/href|src|colspan|rowspan/,t=/\r/g,z=/radio|checkbox/,f={readonly:"readOnly"};u&&a.mix(f,{"for":"htmlFor","class":"className"});a.mix(h,{attr:function(e,c,b){if(c=a.trim(c)){c=c.toLowerCase();c=f[c]||c;if(b===r){e=a.get(e);if(!k(e))return r;
var i;m.test(c)||(i=e[c]);if(i===r)i=e.getAttribute(c);if(u)if(o.test(c))i=e.getAttribute(c,2);else if(c==="style")i=e.style.cssText;return i===null?r:i}a.each(a.query(e),function(n){if(k(n))if(u&&c==="style")n.style.cssText=b;else n.setAttribute(c,""+b)})}},removeAttr:function(e,c){a.each(a.query(e),function(b){k(b)&&b.removeAttribute(c)})},val:function(e,c){if(c===r){var b=a.get(e);if(!k(b))return r;if(p("option",b))return(b.attributes.value||{}).specified?b.value:b.text;if(p("select",b)){var i=
b.selectedIndex;e=b.options;if(i<0)return null;else if(b.type==="select-one")return h.val(e[i]);b=[];for(var n=0,x=e.length;n<x;++n)e[n].selected&&b.push(h.val(e[n]));return b}if(s.webkit&&z.test(b.type))return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(t,"")}a.each(a.query(e),function(l){if(p("select",l)){if(a.isNumber(c))c+="";var d=a.makeArray(c),g=l.options,q;n=0;for(x=g.length;n<x;++n){q=g[n];q.selected=a.inArray(h.val(q),d)}if(!d.length)l.selectedIndex=-1}else if(k(l))l.value=
c})},text:function(e,c){if(c===r){e=a.get(e);if(k(e))return e[j]||"";else if(w(e))return e.nodeValue}else a.each(a.query(e),function(b){if(k(b))b[j]=c;else if(w(b))b.nodeValue=c})}})});
KISSY.add("dom-style",function(a,r){function p(c,b){var i=a.get(c),n=b===k?i.offsetWidth:i.offsetHeight;a.each(b===k?["Left","Right"]:["Top","Bottom"],function(x){n-=parseFloat(v._getComputedStyle(i,"padding"+x))||0;n-=parseFloat(v._getComputedStyle(i,"border"+x+"Width"))||0});return n}function s(c,b,i){var n=i;if(i===w&&o.test(b)){n=0;if(v.css(c,"position")==="absolute"){i=c[b==="left"?"offsetLeft":"offsetTop"];if(u.ie===8||u.opera)i-=m(v.css(c.offsetParent,"border-"+b+"-width"))||0;n=i-(m(v.css(c,
"margin-"+b))||0)}}return n}var v=a.DOM,u=a.UA,j=document,h=j.documentElement,k="width",w="auto",m=parseInt,o=/^left|top$/,t=/width|height|top|left|right|bottom|margin|padding/i,z=/-([a-z])/ig,f=function(c,b){return b.toUpperCase()},e={};a.mix(v,{_CUSTOM_STYLES:e,_getComputedStyle:function(c,b){var i="",n=c.ownerDocument;if(c.style)i=n.defaultView.getComputedStyle(c,null)[b];return i},css:function(c,b,i){if(a.isPlainObject(b))for(var n in b)v.css(c,n,b[n]);else{if(b.indexOf("-")>0)b=b.replace(z,f);
b=e[b]||b;if(i===r){c=a.get(c);n="";if(c&&c.style){n=b.get?b.get(c):c.style[b];if(n===""&&!b.get)n=s(c,b,v._getComputedStyle(c,b))}return n===r?"":n}else{if(i===null||i==="")i="";else if(!isNaN(new Number(i))&&t.test(b))i+="px";(b===k||b==="height")&&parseFloat(i)<0||a.each(a.query(c),function(x){if(x&&x.style){b.set?b.set(x,i):(x.style[b]=i);if(i==="")x.style.cssText||x.removeAttribute("style")}})}}},width:function(c,b){if(b===r)return p(c,k);else v.css(c,k,b)},height:function(c,b){if(b===r)return p(c,
"height");else v.css(c,"height",b)},addStyleSheet:function(c,b){var i;if(b)i=a.get(b);i||(i=v.create("<style>",{id:b}));a.get("head").appendChild(i);if(i.styleSheet)i.styleSheet.cssText=c;else i.appendChild(j.createTextNode(c))}});if(h.style.cssFloat!==r)e["float"]="cssFloat";else if(h.style.styleFloat!==r)e["float"]="styleFloat"});
KISSY.add("dom-style-ie",function(a,r){if(a.UA.ie){var p=a.DOM,s=document,v=s.documentElement,u=p._CUSTOM_STYLES,j=/^-?\d+(?:px)?$/i,h=/^-?\d/,k=/^width|height$/;try{if(v.style.opacity===r&&v.filters)u.opacity={get:function(m){var o=100;try{o=m.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(t){try{o=m.filters("alpha").opacity}catch(z){}}return o/100+""},set:function(m,o){m=m.style;m.zoom=1;m.filter="alpha(opacity="+o*100+")"}}}catch(w){a.log("IE filters ActiveX is disabled. ex = "+w)}if(!(s.defaultView||
{}).getComputedStyle&&v.currentStyle)p._getComputedStyle=function(m,o){var t=m.style,z=m.currentStyle[o];if(k.test(o))z=p[o](m)+"px";else if(!j.test(z)&&h.test(z)){var f=t.left,e=m.runtimeStyle.left;m.runtimeStyle.left=m.currentStyle.left;t.left=o==="fontSize"?"1em":z||0;z=t.pixelLeft+"px";t.left=f;m.runtimeStyle.left=e}return z}}});
KISSY.add("dom-offset",function(a,r){function p(l){var d=0,g=0,q=v(l[e]);if(l[x]){l=l[x]();d=l[c]+u[i](q);g=l[b]+u[n](q)}return{left:d,top:g}}function s(l,d){if(u.css(l,t)==="static")l.style[t]=z;var g=p(l),q={},y,A;for(A in d){y=o(u.css(l,A),10)||0;q[A]=y+d[A]-g[A]}u.css(l,q)}function v(l){return l&&"scrollTo"in l&&l[f]?l:l&&l.nodeType===9?l.defaultView||l.parentWindow:false}var u=a.DOM,j=window,h=document,k=u._isElementNode,w=h.compatMode==="CSS1Compat",m=Math.max,o=parseInt,t="position",z="relative",
f="document",e="ownerDocument",c="left",b="top",i="scrollLeft",n="scrollTop",x="getBoundingClientRect";a.mix(u,{offset:function(l,d){if(!(l=a.get(l))||!l[e])return null;if(d===r)return p(l);s(l,d)},scrollIntoView:function(l,d,g,q){if((l=a.get(l))&&l[e]){d=a.get(d);q=q===r?true:!!q;g=g===r?true:!!g;if(!k(d))return l.scrollIntoView(g);var y=u.offset(l),A=u.offset(d),C={left:y[c]-A[c],top:y[b]-A[b]};y=d.clientHeight;A=d.clientWidth;var B=u[i](d),D=u[n](d),F=B+A,G=D+y,H=l.offsetHeight;l=l.offsetWidth;
var E=C.left+B-(o(u.css(d,"borderLeftWidth"))||0);C=C.top+D-(o(u.css(d,"borderTopWidth"))||0);var I=E+l,J=C+H;if(H>y||C<D||g)d[n]=C;else if(J>G)d[n]=J-y;if(q)if(l>A||E<B||g)d[i]=E;else if(I>F)d[i]=I-A}}});a.each(["Left","Top"],function(l,d){var g="scroll"+l;u[g]=function(q){var y=0,A=q===r?j:v(q),C;if(A&&(C=A[f]))y=A[d?"pageYOffset":"pageXOffset"]||C.documentElement[g]||C.body[g];else if(k(q=a.get(q)))y=q[g];return y}});a.each(["Width","Height"],function(l){u["doc"+l]=function(d){d=d||h;return m(w?
d.documentElement["scroll"+l]:d.body["scroll"+l],u["viewport"+l](d))};u["viewport"+l]=function(d){var g="inner"+l;d=v(d)||j;var q=d[f];return g in d?d[g]:w?q.documentElement["client"+l]:q.body["client"+l]}})});
KISSY.add("dom-traversal",function(a,r){function p(j,h,k,w){if(!(j=a.get(j)))return null;if(h===r)h=1;var m=null,o,t;if(a.isNumber(h)&&h>=0){if(h===0)return j;o=0;t=h;h=function(){return++o===t}}for(;j=j[k];)if(u(j)&&(!h||v.test(j,h))&&(!w||w(j))){m=j;break}return m}function s(j,h,k){var w=[];var m=j=a.get(j);if(j&&k)m=j.parentNode;if(m){k=0;for(m=m.firstChild;m;m=m.nextSibling)if(u(m)&&m!==j&&(!h||v.test(m,h)))w[k++]=m}return w}var v=a.DOM,u=v._isElementNode;a.mix(v,{parent:function(j,h){return p(j,
h,"parentNode",function(k){return k.nodeType!=11})},next:function(j,h){return p(j,h,"nextSibling")},prev:function(j,h){return p(j,h,"previousSibling")},siblings:function(j,h){return s(j,h,true)},children:function(j,h){return s(j,h)},contains:function(j,h){var k=false;if((j=a.get(j))&&(h=a.get(h)))if(j.contains)return j.contains(h);else if(j.compareDocumentPosition)return!!(j.compareDocumentPosition(h)&16);else for(;!k&&(h=h.parentNode);)k=h==j;return k}})});
KISSY.add("dom-create",function(a,r){function p(d,g){if(o(d)&&g)for(var q in g)h.attr(d,q,g[q]);return d}function s(d,g){var q=null,y;if(d&&(d.push||d.item)&&d[0]){g=g||d[0].ownerDocument;q=g.createDocumentFragment();if(d.item)d=a.makeArray(d);g=0;for(y=d.length;g<y;g++)q.appendChild(d[g])}else a.log("Unable to convert "+d+" to fragment.");return q}function v(d,g,q,y){if(q){var A=a.guid("ks-tmp-");g+='<span id="'+A+'"></span>';a.available(A,function(){var C=a.get("head"),B,D,F,G,H,E;for(e.lastIndex=
0;B=e.exec(g);)if((F=(D=B[1])?D.match(c):false)&&F[2]){B=j.createElement("script");B.src=F[2];if((G=D.match(b))&&G[2])B.charset=G[2];B.async=true;C.appendChild(B)}else if((E=B[2])&&E.length>0)a.globalEval(E);(H=j.getElementById(A))&&h.remove(H);a.isFunction(y)&&y()});u(d,g)}else{u(d,g);a.isFunction(y)&&y()}}function u(d,g){g=g.replace(e,"");try{d.innerHTML=g}catch(q){for(;d.firstChild;)d.removeChild(d.firstChild);g&&d.appendChild(h.create(g))}}var j=document,h=a.DOM,k=a.UA,w=k.ie,m=h._isSupportedNode,
o=h._isElementNode,t=j.createElement("div"),z=/<(\w+)/,f=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,e=/<script([^>]*)>([\s\S]*?)<\/script>/ig,c=/\ssrc=(['"])(.*?)\1/i,b=/\scharset=(['"])(.*?)\1/i;a.mix(h,{create:function(d,g,q){if(m(d))return d;if(!(d=a.trim(d)))return null;var y=null;y=h._creators;var A,C="div",B;if(A=f.exec(d))y=(q||j).createElement(A[1]);else{if((A=z.exec(d))&&(B=A[1])&&a.isFunction(y[B=B.toLowerCase()]))C=B;d=y[C](d,q).childNodes;y=d.length===1?d[0].parentNode.removeChild(d[0]):s(d,q||j)}return p(y,
g)},_creators:{div:function(d,g){g=g?g.createElement("div"):t;g.innerHTML=d;return g}},html:function(d,g,q,y){if(g===r){d=a.get(d);if(o(d))return d.innerHTML}else a.each(a.query(d),function(A){o(A)&&v(A,g,q,y)})},remove:function(d){a.each(a.query(d),function(g){o(g)&&g.parentNode&&g.parentNode.removeChild(g)})}});if(k.gecko||w){var i=h._creators,n=h.create,x=/(?:\/(?:thead|tfoot|caption|col|colgroup)>)+\s*<tbody/;k={option:"select",td:"tr",tr:"tbody",tbody:"table",col:"colgroup",legend:"fieldset"};
for(var l in k)(function(d){i[l]=function(g,q){return n("<"+d+">"+g+"</"+d+">",null,q)}})(k[l]);if(w){i.script=function(d,g){g=g?g.createElement("div"):t;g.innerHTML="-"+d;g.removeChild(g.firstChild);return g};if(w<8)i.tbody=function(d,g){g=n("<table>"+d+"</table>",null,g);var q=g.children.tags("tbody")[0];g.children.length>1&&q&&!x.test(d)&&q.parentNode.removeChild(q);return g}}a.mix(i,{optgroup:i.option,th:i.td,thead:i.tbody,tfoot:i.tbody,caption:i.tbody,colgroup:i.tbody})}});
KISSY.add("dom-insertion",function(a){var r=a.DOM;a.mix(r,{insertBefore:function(p,s){p=r.create(p);s=a.get(s);p&&s&&s.parentNode&&s.parentNode.insertBefore(p,s);return p},insertAfter:function(p,s){p=r.create(p);s=a.get(s);if(p&&s&&s.parentNode)s.nextSibling?s.parentNode.insertBefore(p,s.nextSibling):s.parentNode.appendChild(p);return p}})});
