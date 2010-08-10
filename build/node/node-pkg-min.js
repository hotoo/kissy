/*
Copyright 2010, KISSY UI Library v1.1.2dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("node",function(a){function f(b,c,h){var j;if(!(this instanceof f))return new f(b,c,h);if(b){if(o._isSupportedNode(b))j=b;else if(a.isString(b))j=o.create(b,c,h);this[0]=j}else this.length=0}var o=a.DOM;f.TYPE="-ks-Node";a.augment(f,{length:1,getDOMNode:function(){return this[0]},nodeType:f.TYPE});a.one=function(b,c){return(b=a.get(b,c))?new f(b):null};a.Node=f});
KISSY.add("nodelist",function(a){function f(c){if(!(this instanceof f))return new f(c);b.push.apply(this,c||[])}var o=a.DOM,b=Array.prototype;a.mix(f.prototype,{length:0,item:function(c){var h=null;if(o._isElementNode(this[c]))h=new a.Node(this[c]);return h},getDOMNodes:function(){return b.slice.call(this)},each:function(c,h){var j=this.length,p=0,k;for(k=new a.Node(this[0]);p<j&&c.call(h||k,k,p,this)!==false;k=new a.Node(this[++p]));return this}});a.all=function(c,h){return new f(a.query(c,h,true))};
a.NodeList=f});
KISSY.add("node-attach",function(a,f){function o(d,arguments,e,g){var m=[this[d?r:k]()].concat(a.makeArray(arguments));if(arguments[e]===f)return g.apply(c,m);else{g.apply(c,m);return this}}function b(d,e){a.each(d,function(g){a.each([j,p],function(m,i){m[g]=function(n){switch(e){case s:return function(){return o.call(this,i,arguments,1,n)};case q:return function(){return o.call(this,i,arguments,0,n)};case t:return function(){var l=this[i?r:k]();return(l=n.apply(c,[l].concat(a.makeArray(arguments))))?new (a[a.isArray(l)?
"NodeList":"Node"])(l):null};default:return function(){var l=this[i?r:k]();l=n.apply(c,[l].concat(a.makeArray(arguments)));return l===f?this:l}}}(c[g])})})}var c=a.DOM,h=a.Event,j=a.Node.prototype,p=a.NodeList.prototype,k="getDOMNode",r=k+"s",s=1,q=2,t=4;a.mix(j,{one:function(d){return a.one(d,this[0])},all:function(d){return a.all(d,this[0])}});b(["hasClass","addClass","removeClass","replaceClass","toggleClass"]);b(["attr","removeAttr"],s);b(["val","text"],q);b(["css"],s);b(["width","height"],q);
b(["offset"],q);b(["scrollIntoView"]);b(["parent","next","prev","siblings","children"],t);b(["contains"]);b(["html"],q);b(["remove"]);a.each(["insertBefore","insertAfter"],function(d){j[d]=function(e){c[d].call(c,this[0],e);return this}});a.each([j,p],function(d){a.mix(d,{append:function(e){e&&a.each(this,function(g){g.appendChild(c.create(e))});return this},appendTo:function(e){if((e=a.get(e))&&e.appendChild)a.each(this,function(g){e.appendChild(g)});return this}})});a.each([j,p],function(d){a.mix(d,
a.EventTarget,{_supportSpecialEvent:true});d._addEvent=function(e,g,m){for(var i=0,n=this.length;i<n;i++)h._simpleAdd(this[i],e,g,m)};d._removeEvent=function(e,g,m){for(var i=0,n=this.length;i<n;i++)h._simpleRemove(this[i],e,g,m)};delete d.fire})});
