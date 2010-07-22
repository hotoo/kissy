/*
Copyright 2010, KISSY UI Library v1.1.0
MIT Licensed
build: 896 Jul 22 10:00
*/
(function(){function x(a,b,c,d,e,f){e=0;for(var h=d.length;e<h;e++){var g=d[e];if(g){g=g[a];for(var k=false;g;){if(g.sizcache===c){k=d[g.sizset];break}if(g.nodeType===1&&!f){g.sizcache=c;g.sizset=e}if(g.nodeName.toLowerCase()===b){k=g;break}g=g[a]}d[e]=k}}}function y(a,b,c,d,e,f){e=0;for(var h=d.length;e<h;e++){var g=d[e];if(g){g=g[a];for(var k=false;g;){if(g.sizcache===c){k=d[g.sizset];break}if(g.nodeType===1){if(!f){g.sizcache=c;g.sizset=e}if(typeof b!=="string"){if(g===b){k=true;break}}else if(j.filter(b,
[g]).length>0){k=g;break}}g=g[a]}d[e]=k}}}var v=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,w=0,z=Object.prototype.toString,m=false,A=true;[0,0].sort(function(){A=false;return 0});var j=function(a,b,c,d){c=c||[];var e=b=b||document;if(b.nodeType!==1&&b.nodeType!==9)return[];if(!a||typeof a!=="string")return c;var f=[],h,g,k,q,n=true,p=j.isXML(b),o=a,l;do{v.exec("");if(h=v.exec(o)){o=h[3];f.push(h[1]);if(h[2]){q=
h[3];break}}}while(h);if(f.length>1&&D.exec(a))if(f.length===2&&i.relative[f[0]])g=B(f[0]+f[1],b);else for(g=i.relative[f[0]]?[b]:j(f.shift(),b);f.length;){a=f.shift();if(i.relative[a])a+=f.shift();g=B(a,g)}else{if(!d&&f.length>1&&b.nodeType===9&&!p&&i.match.ID.test(f[0])&&!i.match.ID.test(f[f.length-1])){h=j.find(f.shift(),b,p);b=h.expr?j.filter(h.expr,h.set)[0]:h.set[0]}if(b){h=d?{expr:f.pop(),set:r(d)}:j.find(f.pop(),f.length===1&&(f[0]==="~"||f[0]==="+")&&b.parentNode?b.parentNode:b,p);g=h.expr?
j.filter(h.expr,h.set):h.set;if(f.length>0)k=r(g);else n=false;for(;f.length;){h=l=f.pop();if(i.relative[l])h=f.pop();else l="";if(h==null)h=b;i.relative[l](k,h,p)}}else k=[]}k||(k=g);k||j.error(l||a);if(z.call(k)==="[object Array]")if(n)if(b&&b.nodeType===1)for(a=0;k[a]!=null;a++){if(k[a]&&(k[a]===true||k[a].nodeType===1&&j.contains(b,k[a])))c.push(g[a])}else for(a=0;k[a]!=null;a++)k[a]&&k[a].nodeType===1&&c.push(g[a]);else c.push.apply(c,k);else r(k,c);if(q){j(q,e,c,d);j.uniqueSort(c)}return c};
j.uniqueSort=function(a){if(s){m=A;a.sort(s);if(m)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a};j.matches=function(a,b){return j(a,null,null,b)};j.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=i.order.length;e<f;e++){var h=i.order[e],g;if(g=i.leftMatch[h].exec(a)){var k=g[1];g.splice(1,1);if(k.substr(k.length-1)!=="\\"){g[1]=(g[1]||"").replace(/\\/g,"");d=i.find[h](g,b,c);if(d!=null){a=a.replace(i.match[h],"");break}}}}d||(d=b.getElementsByTagName("*"));return{set:d,
expr:a}};j.filter=function(a,b,c,d){for(var e=a,f=[],h=b,g,k,q=b&&b[0]&&j.isXML(b[0]);a&&b.length;){for(var n in i.filter)if((g=i.leftMatch[n].exec(a))!=null&&g[2]){var p=i.filter[n],o,l;l=g[1];k=false;g.splice(1,1);if(l.substr(l.length-1)!=="\\"){if(h===f)f=[];if(i.preFilter[n])if(g=i.preFilter[n](g,h,c,f,d,q)){if(g===true)continue}else k=o=true;if(g)for(var t=0;(l=h[t])!=null;t++)if(l){o=p(l,g,t,h);var C=d^!!o;if(c&&o!=null)if(C)k=true;else h[t]=false;else if(C){f.push(l);k=true}}if(o!==undefined){c||
(h=f);a=a.replace(i.match[n],"");if(!k)return[];break}}}if(a===e)if(k==null)j.error(a);else break;e=a}return h};j.error=function(a){throw"Syntax error, unrecognized expression: "+a;};var i=j.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")}},relative:{"+":function(a,b){var c=typeof b==="string",d=c&&!/\W/.test(b);c=c&&!d;if(d)b=b.toLowerCase();d=0;for(var e=a.length,f;d<e;d++)if(f=a[d]){for(;(f=f.previousSibling)&&f.nodeType!==1;);a[d]=c||f&&f.nodeName.toLowerCase()===
b?f||false:f===b}c&&j.filter(b,a,true)},">":function(a,b){var c=typeof b==="string",d,e=0,f=a.length;if(c&&!/\W/.test(b))for(b=b.toLowerCase();e<f;e++){if(d=a[e]){c=d.parentNode;a[e]=c.nodeName.toLowerCase()===b?c:false}}else{for(;e<f;e++)if(d=a[e])a[e]=c?d.parentNode:d.parentNode===b;c&&j.filter(b,a,true)}},"":function(a,b,c){var d=w++,e=y,f;if(typeof b==="string"&&!/\W/.test(b)){f=b=b.toLowerCase();e=x}e("parentNode",b,d,a,f,c)},"~":function(a,b,c){var d=w++,e=y,f;if(typeof b==="string"&&!/\W/.test(b)){f=
b=b.toLowerCase();e=x}e("previousSibling",b,d,a,f,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c)return(a=b.getElementById(a[1]))?[a]:[]},NAME:function(a,b){if(typeof b.getElementsByName!=="undefined"){var c=[];b=b.getElementsByName(a[1]);for(var d=0,e=b.length;d<e;d++)b[d].getAttribute("name")===a[1]&&c.push(b[d]);return c.length===0?null:c}},TAG:function(a,b){return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(/\\/g,"")+" ";
if(f)return a;f=0;for(var h;(h=b[f])!=null;f++)if(h)if(e^(h.className&&(" "+h.className+" ").replace(/[\t\n]/g," ").indexOf(a)>=0))c||d.push(h);else if(c)b[f]=false;return false},ID:function(a){return a[1].replace(/\\/g,"")},TAG:function(a){return a[1].toLowerCase()},CHILD:function(a){if(a[1]==="nth"){var b=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0;a[3]=b[3]-0}a[0]=w++;return a},ATTR:function(a,b,c,d,e,f){b=
a[1].replace(/\\/g,"");if(!f&&i.attrMap[b])a[1]=i.attrMap[b];if(a[2]==="~=")a[4]=" "+a[4]+" ";return a},PSEUDO:function(a,b,c,d,e){if(a[1]==="not")if((v.exec(a[3])||"").length>1||/^\w/.test(a[3]))a[3]=j(a[3],null,null,b);else{a=j.filter(a[3],b,c,true^e);c||d.push.apply(d,a);return false}else if(i.match.POS.test(a[0])||i.match.CHILD.test(a[0]))return true;return a},POS:function(a){a.unshift(true);return a}},filters:{enabled:function(a){return a.disabled===false&&a.type!=="hidden"},disabled:function(a){return a.disabled===
true},checked:function(a){return a.checked===true},selected:function(a){return a.selected===true},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!j(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){return"text"===a.type},radio:function(a){return"radio"===a.type},checkbox:function(a){return"checkbox"===a.type},file:function(a){return"file"===a.type},password:function(a){return"password"===a.type},submit:function(a){return"submit"===
a.type},image:function(a){return"image"===a.type},reset:function(a){return"reset"===a.type},button:function(a){return"button"===a.type||a.nodeName.toLowerCase()==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-
0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=i.filters[e];if(f)return f(a,c,b,d);else if(e==="contains")return(a.textContent||a.innerText||j.getText([a])||"").indexOf(b[3])>=0;else if(e==="not"){b=b[3];c=0;for(d=b.length;c<d;c++)if(b[c]===a)return false;return true}else j.error("Syntax error, unrecognized expression: "+e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case "only":case "first":for(;d=d.previousSibling;)if(d.nodeType===1)return false;if(c===
"first")return true;d=a;case "last":for(;d=d.nextSibling;)if(d.nodeType===1)return false;return true;case "nth":c=b[2];var e=b[3];if(c===1&&e===0)return true;b=b[0];var f=a.parentNode;if(f&&(f.sizcache!==b||!a.nodeIndex)){var h=0;for(d=f.firstChild;d;d=d.nextSibling)if(d.nodeType===1)d.nodeIndex=++h;f.sizcache=b}a=a.nodeIndex-e;return c===0?a===0:a%c===0&&a/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===
b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1];a=i.attrHandle[c]?i.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c);c=a+"";var d=b[2];b=b[4];return a==null?d==="!=":d==="="?c===b:d==="*="?c.indexOf(b)>=0:d==="~="?(" "+c+" ").indexOf(b)>=0:!b?c&&a!==false:d==="!="?c!==b:d==="^="?c.indexOf(b)===0:d==="$="?c.substr(c.length-b.length)===b:d==="|="?c===b||c.substr(0,b.length+1)===b+"-":false},POS:function(a,b,c,d){var e=i.setFilters[b[2]];
if(e)return e(a,c,b,d)}}},D=i.match.POS,E=function(a,b){return"\\"+(b-0+1)};for(var u in i.match){i.match[u]=new RegExp(i.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source);i.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+i.match[u].source.replace(/\\(\d+)/g,E))}var r=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(document.documentElement.childNodes,0)}catch(F){r=function(a,b){b=b||[];var c=0;if(z.call(a)==="[object Array]")Array.prototype.push.apply(b,
a);else if(typeof a.length==="number")for(var d=a.length;c<d;c++)b.push(a[c]);else for(;a[c];c++)b.push(a[c]);return b}}var s;if(document.documentElement.compareDocumentPosition)s=function(a,b){if(!a.compareDocumentPosition||!b.compareDocumentPosition){if(a==b)m=true;return a.compareDocumentPosition?-1:1}a=a.compareDocumentPosition(b)&4?-1:a===b?0:1;if(a===0)m=true;return a};else if("sourceIndex"in document.documentElement)s=function(a,b){if(!a.sourceIndex||!b.sourceIndex){if(a==b)m=true;return a.sourceIndex?
-1:1}a=a.sourceIndex-b.sourceIndex;if(a===0)m=true;return a};else if(document.createRange)s=function(a,b){if(!a.ownerDocument||!b.ownerDocument){if(a==b)m=true;return a.ownerDocument?-1:1}var c=a.ownerDocument.createRange(),d=b.ownerDocument.createRange();c.setStart(a,0);c.setEnd(a,0);d.setStart(b,0);d.setEnd(b,0);a=c.compareBoundaryPoints(Range.START_TO_END,d);if(a===0)m=true;return a};j.getText=function(a){for(var b="",c,d=0;a[d];d++){c=a[d];if(c.nodeType===3||c.nodeType===4)b+=c.nodeValue;else if(c.nodeType!==
8)b+=j.getText(c.childNodes)}return b};(function(){var a=document.createElement("div"),b="script"+(new Date).getTime();a.innerHTML="<a name='"+b+"'/>";var c=document.documentElement;c.insertBefore(a,c.firstChild);if(document.getElementById(b)){i.find.ID=function(d,e,f){if(typeof e.getElementById!=="undefined"&&!f)return(e=e.getElementById(d[1]))?e.id===d[1]||typeof e.getAttributeNode!=="undefined"&&e.getAttributeNode("id").nodeValue===d[1]?[e]:undefined:[]};i.filter.ID=function(d,e){var f=typeof d.getAttributeNode!==
"undefined"&&d.getAttributeNode("id");return d.nodeType===1&&f&&f.nodeValue===e}}c.removeChild(a);c=a=null})();(function(){var a=document.createElement("div");a.appendChild(document.createComment(""));if(a.getElementsByTagName("*").length>0)i.find.TAG=function(b,c){c=c.getElementsByTagName(b[1]);if(b[1]==="*"){b=[];for(var d=0;c[d];d++)c[d].nodeType===1&&b.push(c[d]);c=b}return c};a.innerHTML="<a href='#'></a>";if(a.firstChild&&typeof a.firstChild.getAttribute!=="undefined"&&a.firstChild.getAttribute("href")!==
"#")i.attrHandle.href=function(b){return b.getAttribute("href",2)};a=null})();document.querySelectorAll&&function(){var a=j,b=document.createElement("div");b.innerHTML="<p class='TEST'></p>";if(!(b.querySelectorAll&&b.querySelectorAll(".TEST").length===0)){j=function(d,e,f,h){e=e||document;if(!h&&e.nodeType===9&&!j.isXML(e))try{return r(e.querySelectorAll(d),f)}catch(g){}return a(d,e,f,h)};for(var c in a)j[c]=a[c];b=null}}();(function(){var a=document.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";
if(!(!a.getElementsByClassName||a.getElementsByClassName("e").length===0)){a.lastChild.className="e";if(a.getElementsByClassName("e").length!==1){i.order.splice(1,0,"CLASS");i.find.CLASS=function(b,c,d){if(typeof c.getElementsByClassName!=="undefined"&&!d)return c.getElementsByClassName(b[1])};a=null}}})();j.contains=document.compareDocumentPosition?function(a,b){return!!(a.compareDocumentPosition(b)&16)}:function(a,b){return a!==b&&(a.contains?a.contains(b):true)};j.isXML=function(a){return(a=(a?
a.ownerDocument||a:0).documentElement)?a.nodeName!=="HTML":false};var B=function(a,b){var c=[],d="",e;for(b=b.nodeType?[b]:b;e=i.match.PSEUDO.exec(a);){d+=e[0];a=a.replace(i.match.PSEUDO,"")}a=i.relative[a]?a+"*":a;e=0;for(var f=b.length;e<f;e++)j(a,b[e],c);return j.filter(d,c)};KISSY.ExternalSelector=j;KISSY.ExternalSelector._filter=function(a,b){return j.matches(b,KISSY.query(a))}})();
