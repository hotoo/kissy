/*
Copyright 2010, KISSY UI Library v1.0.5
MIT Licensed
build: 521 Apr 5 12:27
*/
KISSY.add("datalazyload",function(i,n){function l(f,a){if(!(this instanceof l))return new l(f,a);if(a===n){a=f;f=[d]}m.isArray(f)||(f=[g.get(f)||d]);this.containers=f;this.config=i.merge(k,a||{});this.callbacks={els:[],fns:[]};this._init()}var q=YAHOO.util,g=q.Dom,j=q.Event,m=YAHOO.lang,s=window,d=document,e={AUTO:"auto",MANUAL:"manual"},k={mod:e.MANUAL,diff:"default",placeholder:"http://a.tbcdn.cn/kissy/1.0.4/build/datalazyload/dot.gif"};i.mix(l.prototype,{_init:function(){this.threshold=this._getThreshold();
this._filterItems();this._getItemsLength()&&this._initLoadEvent()},_initLoadEvent:function(){function f(){b||(b=setTimeout(function(){a();b=null},100))}function a(){c._loadItems();if(c._getItemsLength()===0){j.removeListener(s,"scroll",f);j.removeListener(s,"resize",f)}}var b,c=this;j.on(s,"scroll",f);j.on(s,"resize",function(){c.threshold=c._getThreshold();f()});c._getItemsLength()&&j.onDOMReady(function(){a()})},_filterItems:function(){var f=this.containers,a=this.threshold,b=this.config.placeholder,
c=this.config.mod===e.MANUAL,h,o,r,t,p,u,v,w=[],x=[];h=0;for(o=f.length;h<o;++h){r=f[h].getElementsByTagName("img");t=0;for(p=r.length;t<p;++t){u=r[t];v=u.getAttribute("data-lazyload-src");if(c){if(v){u.src=b;w.push(u)}}else if(g.getY(u)>a&&!v){u.setAttribute("data-lazyload-src",u.src);u.src=b;w.push(u)}}r=f[h].getElementsByTagName("textarea");t=0;for(p=r.length;t<p;++t){u=r[t];g.hasClass(u,"ks-datalazyload")&&x.push(u)}}this.images=w;this.areaes=x},_loadItems:function(){this._loadImgs();this._loadAreaes();
this._fireCallbacks()},_loadImgs:function(){var f=this.images,a=this.threshold+g.getDocumentScrollTop(),b,c,h=[];for(b=0;c=f[b++];)g.getY(c)<=a?this._loadImgSrc(c):h.push(c);this.images=h},_loadImgSrc:function(f,a){a=a||"data-lazyload-src";var b=f.getAttribute(a);if(b&&f.src!=b){f.src=b;f.removeAttribute(a)}},_loadAreaes:function(){var f=this.areaes,a=this.threshold+g.getDocumentScrollTop(),b,c,h,o=[];for(b=0;c=f[b++];){h=c.parentNode;g.getY(h)<=a?this._loadDataFromArea(h,c):o.push(c)}this.areaes=
o},_loadDataFromArea:function(f,a){var b=document.createElement("DIV");b.innerHTML=a.value;a.style.display="none";a.className="";f.appendChild(b)},_fireCallbacks:function(){var f=this.callbacks,a=f.els,b=f.fns,c=this.threshold+g.getDocumentScrollTop(),h,o,r,t=[],p=[];for(h=0;(o=a[h])&&(r=b[h++]);)if(g.getY(o)<=c)r.call(o);else{t.push(o);p.push(r)}f.els=t;f.fns=p},addCallback:function(f,a){if((f=g.get(f))&&typeof a==="function"){this.callbacks.els.push(f);this.callbacks.fns.push(a)}},_getThreshold:function(){var f=
this.config.diff,a=g.getViewportHeight();return f==="default"?2*a:a+f},_getItemsLength:function(){return this.images.length+this.areaes.length+this.callbacks.els.length},loadCustomLazyData:function(f,a,b){var c=this,h,o;m.isArray(f)||(f=[g.get(f)]);i.each(f,function(r){switch(a){case "textarea-data":if((h=r.getElementsByTagName("textarea")[0])&&g.hasClass(h,b||"ks-datalazyload-custom"))c._loadDataFromArea(r,h);break;default:o=r.nodeName==="IMG"?[r]:r.getElementsByTagName("img");r=0;for(var t=o.length;r<
t;r++)c._loadImgSrc(o[r],b||"data-lazyload-src-custom")}})}});i.mix(l,l.prototype,true,["loadCustomLazyData","_loadImgSrc","_loadDataFromArea"]);i.DataLazyload=l});
KISSY.add("suggest",function(i,n){function l(a,b,c){if(!(this instanceof l))return new l(a,b,c);this.textInput=g.get(a);this.dataSource=b;this.JSONDataSource=m.isObject(b)?b:null;this.returnedData=null;this.config=m.merge(f,c||{});this.container=null;this.queryParams=this.query="";this._timer=null;this._isRunning=false;this.dataScript=null;this._dataCache={};this._latestScriptTime="";this._onKeyboardSelecting=this._scriptDataIsOut=false;this.selectedItem=null;this._init()}var q=YAHOO.util,g=q.Dom,
j=q.Event,m=YAHOO.lang,s=window,d=document,e=d.getElementsByTagName("head")[0],k=YAHOO.env.ua.ie,f={containerClass:"",containerWidth:"auto",resultFormat:"约%result%条结果",showCloseBtn:false,closeBtnText:"关闭",useShim:k===6,timerDelay:200,autoFocus:false,submitFormOnClickSelect:true};i.mix(l.prototype,{_init:function(){this._initTextInput();this._initContainer();this.config.useShim&&this._initShim();this._initStyle();this.createEvent("beforeDataRequest");this.createEvent("onDataReturn");this.createEvent("beforeShow");
this.createEvent("onItemSelect");this._initResizeEvent()},_initTextInput:function(){var a=this;a.textInput.setAttribute("autocomplete","off");j.on(a.textInput,"blur",function(){a.stop();a.hide()});a.config.autoFocus&&a.textInput.focus();var b=0;j.on(a.textInput,"keydown",function(c){c=c.keyCode;switch(c){case 27:a.hide();a.textInput.value=a.query;break;case 13:a.textInput.blur();a._onKeyboardSelecting&&a.textInput.value==a._getSelectedItemKey()&&a.fireEvent("onItemSelect",a.textInput.value);a._submitForm();
break;case 40:case 38:if(b++==0){a._isRunning&&a.stop();a._onKeyboardSelecting=true;a.selectItem(c==40)}else if(b==3)b=0;break}if(c!=40&&c!=38){a._isRunning||a.start();a._onKeyboardSelecting=false}});j.on(a.textInput,"keyup",function(){b=0})},_initContainer:function(){var a=d.createElement("div"),b=this.config.containerClass;a.className="suggest-container";if(b)a.className+=" "+b;a.style.position="absolute";a.style.visibility="hidden";this.container=a;this._setContainerRegion();this._initContainerEvent();
d.body.insertBefore(a,d.body.firstChild)},_setContainerRegion:function(){var a=g.getRegion(this.textInput),b=a.left,c=a.right-b-2;c=c>0?c:0;if(d.documentMode===7&&(k===7||k===8))b-=2;else YAHOO.env.ua.gecko&&b++;this.container.style.left=b+"px";this.container.style.top=a.bottom+"px";this.container.style.width=this.config.containerWidth=="auto"?c+"px":this.config.containerWidth},_initContainerEvent:function(){var a=this;j.on(a.container,"mousemove",function(c){c=j.getTarget(c);if(c.nodeName!="LI")c=
g.getAncestorByTagName(c,"li");if(g.isAncestor(a.container,c))if(c!=a.selectedItem){a._removeSelectedItem();a._setSelectedItem(c)}});var b=null;a.container.onmousedown=function(c){c=c||s.event;b=c.target||c.srcElement;a.textInput.onbeforedeactivate=function(){s.event.returnValue=false;a.textInput.onbeforedeactivate=null};return false};j.on(a.container,"mouseup",function(c){if(a._isInContainer(j.getXY(c))){c=j.getTarget(c);if(c==b)if(c.className=="suggest-close-btn")a.hide();else{if(c.nodeName!="LI")c=
g.getAncestorByTagName(c,"li");if(g.isAncestor(a.container,c)){a._updateInputFromSelectItem(c);a.fireEvent("onItemSelect",a.textInput.value);a.textInput.blur();a._submitForm()}}}})},_submitForm:function(){if(this.config.submitFormOnClickSelect){var a=this.textInput.form;if(a){if(d.createEvent){var b=d.createEvent("MouseEvents");b.initEvent("submit",true,false);a.dispatchEvent(b)}else d.createEventObject&&a.fireEvent("onsubmit");a.submit()}}},_isInContainer:function(a){var b=g.getRegion(this.container);
return a[0]>=b.left&&a[0]<=b.right&&a[1]>=b.top&&a[1]<=b.bottom},_initShim:function(){var a=d.createElement("iframe");a.src="about:blank";a.className="suggest-shim";a.style.position="absolute";a.style.visibility="hidden";a.style.border="none";this.container.shim=a;this._setShimRegion();d.body.insertBefore(a,d.body.firstChild)},_setShimRegion:function(){var a=this.container,b=a.shim;if(b){b.style.left=parseInt(a.style.left)-2+"px";b.style.top=a.style.top;b.style.width=parseInt(a.style.width)+2+"px"}},
_initStyle:function(){var a=g.get("suggest-style");if(!a){a=d.createElement("style");a.id="suggest-style";e.appendChild(a);if(a.styleSheet)a.styleSheet.cssText=".suggest-container{background:white;border:1px solid #999;z-index:99999}.suggest-shim{z-index:99998}.suggest-container li{color:#404040;padding:1px 0 2px;font-size:12px;line-height:18px;float:left;width:100%}.suggest-container li.selected{background-color:#39F;cursor:default}.suggest-key{float:left;text-align:left;padding-left:5px}.suggest-result{float:right;text-align:right;padding-right:5px;color:green}.suggest-container li.selected span{color:#FFF;cursor:default}.suggest-bottom{padding:0 5px 5px}.suggest-close-btn{float:right}.suggest-container li,.suggest-bottom{overflow:hidden;zoom:1;clear:both}.suggest-container{*margin-left:2px;_margin-left:-2px;_margin-top:-3px}";
else a.appendChild(d.createTextNode(".suggest-container{background:white;border:1px solid #999;z-index:99999}.suggest-shim{z-index:99998}.suggest-container li{color:#404040;padding:1px 0 2px;font-size:12px;line-height:18px;float:left;width:100%}.suggest-container li.selected{background-color:#39F;cursor:default}.suggest-key{float:left;text-align:left;padding-left:5px}.suggest-result{float:right;text-align:right;padding-right:5px;color:green}.suggest-container li.selected span{color:#FFF;cursor:default}.suggest-bottom{padding:0 5px 5px}.suggest-close-btn{float:right}.suggest-container li,.suggest-bottom{overflow:hidden;zoom:1;clear:both}.suggest-container{*margin-left:2px;_margin-left:-2px;_margin-top:-3px}"))}},
_initResizeEvent:function(){var a=this,b;j.on(s,"resize",function(){b&&clearTimeout(b);b=setTimeout(function(){a._setContainerRegion();a._setShimRegion()},50)})},start:function(){var a=this;l.focusInstance=a;a._timer=setTimeout(function(){a.updateContent();a._timer=setTimeout(arguments.callee,a.config.timerDelay)},a.config.timerDelay);a._isRunning=true},stop:function(){l.focusInstance=null;clearTimeout(this._timer);this._isRunning=false},show:function(){if(!this.isVisible()){var a=this.container,
b=a.shim;a.style.visibility="";if(b){if(!b.style.height){a=g.getRegion(a);b.style.height=a.bottom-a.top-2+"px"}b.style.visibility=""}}},hide:function(){if(this.isVisible()){var a=this.container,b=a.shim;if(b)b.style.visibility="hidden";a.style.visibility="hidden"}},isVisible:function(){return this.container.style.visibility!="hidden"},updateContent:function(){if(this._needUpdate()){this._updateQueryValueFromInput();var a=this.query;if(m.trim(a).length)if(this._dataCache[a]!==n){this.returnedData=
"using cache";this._fillContainer(this._dataCache[a]);this._displayContainer()}else this.JSONDataSource?this.handleResponse(this.JSONDataSource[a]):this.requestData();else{this._fillContainer("");this.hide()}}},_needUpdate:function(){return this.textInput.value!=this.query},requestData:function(){var a=this;if(!k)a.dataScript=null;if(!a.dataScript){var b=d.createElement("script");b.type="text/javascript";b.charset="utf-8";e.insertBefore(b,e.firstChild);a.dataScript=b;if(!k){var c=(new Date).getTime();
a._latestScriptTime=c;b.setAttribute("time",c);j.on(b,"load",function(){a._scriptDataIsOut=b.getAttribute("time")!=a._latestScriptTime})}}a.queryParams="q="+encodeURIComponent(a.query)+"&code=utf-8&callback=g_ks_suggest_callback";a.fireEvent("beforeDataRequest",a.query);a.dataScript.src=a.dataSource+"?"+a.queryParams},handleResponse:function(a){if(!this._scriptDataIsOut){this.returnedData=a;this.fireEvent("onDataReturn",a);this.returnedData=this.formatData(this.returnedData);var b="";a=this.returnedData.length;
if(a>0){b=d.createElement("ol");for(var c=0;c<a;++c){var h=this.returnedData[c],o=this.formatItem(h.key,h.result);o.setAttribute("key",h.key);b.appendChild(o)}b=b}this._fillContainer(b);a>0&&this.appendBottom();m.trim(this.container.innerHTML)&&this.fireEvent("beforeShow",this.container);this._dataCache[this.query]=this.container.innerHTML;this._displayContainer()}},formatData:function(a){var b=[];if(!a)return b;if(m.isArray(a.result))a=a.result;var c=a.length;if(!c)return b;for(var h,o=0;o<c;++o){h=
a[o];b[o]=m.isString(h)?{key:h}:m.isArray(h)&&h.length>=2?{key:h[0],result:h[1]}:h}return b},formatItem:function(a,b){var c=d.createElement("li"),h=d.createElement("span");h.className="suggest-key";h.appendChild(d.createTextNode(a));c.appendChild(h);if(b!==n){a=this.config.resultFormat.replace("%result%",b);if(m.trim(a)){b=d.createElement("span");b.className="suggest-result";b.appendChild(d.createTextNode(a));c.appendChild(b)}}return c},appendBottom:function(){var a=d.createElement("div");a.className=
"suggest-bottom";if(this.config.showCloseBtn){var b=d.createElement("a");b.href="javascript: void(0)";b.setAttribute("target","_self");b.className="suggest-close-btn";b.appendChild(d.createTextNode(this.config.closeBtnText));a.appendChild(b)}m.trim(a.innerHTML)&&this.container.appendChild(a)},_fillContainer:function(a){if(a.nodeType==1){this.container.innerHTML="";this.container.appendChild(a)}else this.container.innerHTML=a;this.selectedItem=null},_displayContainer:function(){i.trim(this.container.innerHTML)?
this.show():this.hide()},selectItem:function(a){var b=this.container.getElementsByTagName("li");if(b.length!=0)if(this.isVisible()){if(this.selectedItem){a=g[a?"getNextSibling":"getPreviousSibling"](this.selectedItem);if(!a)this.textInput.value=this.query}else a=b[a?0:b.length-1];this._removeSelectedItem();if(a){this._setSelectedItem(a);this._updateInputFromSelectItem()}}else this.show()},_removeSelectedItem:function(){g.removeClass(this.selectedItem,"selected");this.selectedItem=null},_setSelectedItem:function(a){g.addClass(a,
"selected");this.selectedItem=a},_getSelectedItemKey:function(){if(!this.selectedItem)return"";return this.selectedItem.getAttribute("key")},_updateQueryValueFromInput:function(){this.query=this.textInput.value},_updateInputFromSelectItem:function(){this.textInput.value=this._getSelectedItemKey(this.selectedItem)}});i.augment(l,q.EventProvider);s.g_ks_suggest_callback=function(a){l.focusInstance&&setTimeout(function(){l.focusInstance.handleResponse(a)},0)};i.Suggest=l});
KISSY.add("switchable",function(i,n){function l(d,e){e=e||{};if(!("mackupType"in e))if(e.panelCls)e.mackupType=1;else if(e.panels)e.mackupType=2;e=i.merge(l.Config,e);this.container=i.get(d);this.config=e;this.triggers=this.triggers||[];this.panels=this.panels||[];if(this.activeIndex===n)this.activeIndex=e.activeIndex;this._init()}var q=YAHOO.util,g=q.Dom,j=q.Event,m=YAHOO.lang,s=document;l.Config={mackupType:0,navCls:"ks-switchable-nav",contentCls:"ks-switchable-content",triggerCls:"ks-switchable-trigger",
panelCls:"ks-switchable-panel",triggers:[],panels:[],hasTriggers:true,triggerType:"mouse",delay:0.1,activeIndex:0,activeTriggerCls:"active",steps:1,viewSize:[]};l.Plugins=[];i.mix(l.prototype,{_init:function(){var d=this,e=d.config;d.panels.length===0&&d._parseMackup();d.createEvent("beforeSwitch");d.createEvent("onSwitch");e.hasTriggers&&d._bindTriggers();i.each(l.Plugins,function(k){k.init&&k.init(d)})},_parseMackup:function(){var d=this.container,e=this.config,k=e.hasTriggers,f,a=[],b=[];switch(e.mackupType){case 0:if(f=
i.get("."+e.navCls,d))a=g.getChildren(f);f=i.get("."+e.contentCls,d);b=g.getChildren(f);break;case 1:a=i.query("."+e.triggerCls,d);b=i.query("."+e.panelCls,d);break;case 2:a=e.triggers;b=e.panels;break}d=b.length;this.length=d/e.steps;if(k&&d>0&&a.length===0)a=this._generateTriggersMackup(this.length);if(k){e=0;for(k=a.length;e<k;e++)this.triggers.push(a[e])}for(e=0;e<d;e++)this.panels.push(b[e]);this.content=f||b[0].parentNode},_generateTriggersMackup:function(d){var e=this.config,k=s.createElement("UL"),
f,a;k.className=e.navCls;for(a=0;a<d;a++){f=s.createElement("LI");if(a===this.activeIndex)f.className=e.activeTriggerCls;f.innerHTML=a+1;k.appendChild(f)}this.container.appendChild(k);return g.getChildren(k)},_bindTriggers:function(){var d=this,e=d.config,k=d.triggers,f,a,b=k.length;for(a=0;a<b;a++)(function(c){f=k[c];j.on(f,"click",function(){d._onFocusTrigger(c)});j.on(f,"focus",function(){d._onFocusTrigger(c)});if(e.triggerType==="mouse"){j.on(f,"mouseenter",function(){d._onMouseEnterTrigger(c)});
j.on(f,"mouseleave",function(){d._onMouseLeaveTrigger(c)})}})(a)},_onFocusTrigger:function(d){if(this.activeIndex!==d){this.switchTimer&&this.switchTimer.cancel();this.switchTo(d)}},_onMouseEnterTrigger:function(d){var e=this;if(e.activeIndex!==d)e.switchTimer=m.later(e.config.delay*1E3,e,function(){e.switchTo(d)})},_onMouseLeaveTrigger:function(){this.switchTimer&&this.switchTimer.cancel()},switchTo:function(d,e){var k=this.config,f=this.triggers,a=this.panels,b=this.activeIndex,c=k.steps,h=b*c,
o=d*c;if(d===b)return this;if(!this.fireEvent("beforeSwitch",d))return this;if(k.hasTriggers)this._switchTrigger(b>-1?f[b]:null,f[d]);if(e===n)e=d>b?"forward":"forward";this._switchView(a.slice(h,h+c),a.slice(o,o+c),d,e);this.activeIndex=d;return this},_switchTrigger:function(d,e){var k=this.config.activeTriggerCls;d&&g.removeClass(d,k);g.addClass(e,k)},_switchView:function(d,e,k){g.setStyle(d,"display","none");g.setStyle(e,"display","block");this.fireEvent("onSwitch",k)},prev:function(){var d=this.activeIndex;
this.switchTo(d>0?d-1:this.length-1,"backward")},next:function(){var d=this.activeIndex;this.switchTo(d<this.length-1?d+1:0,"forward")}});i.augment(l,q.EventProvider);i.Switchable=l});
KISSY.add("switchable-autoplay",function(i){var n=YAHOO.util.Event,l=YAHOO.lang,q=i.Switchable;i.mix(q.Config,{autoplay:false,interval:5,pauseOnHover:true});q.Plugins.push({name:"autoplay",init:function(g){var j=g.config;if(j.autoplay){if(j.pauseOnHover){n.on(g.container,"mouseenter",function(){g.paused=true});n.on(g.container,"mouseleave",function(){setTimeout(function(){g.paused=false},j.interval*1E3)})}g.autoplayTimer=l.later(j.interval*1E3,g,function(){g.paused||g.switchTo(g.activeIndex<g.length-
1?g.activeIndex+1:0)},null,true)}}})});
KISSY.add("switchable-effect",function(i){var n=YAHOO.util,l=n.Dom,q=i.Switchable,g;i.mix(q.Config,{effect:"none",duration:0.5,easing:n.Easing.easeNone});q.Effects={none:function(j,m,s){l.setStyle(j,"display","none");l.setStyle(m,"display","block");s()},fade:function(j,m,s){if(j.length!==1)throw new Error("fade effect only supports steps == 1.");var d=this,e=d.config,k=j[0],f=m[0];d.anim&&d.anim.stop();l.setStyle(f,"opacity",1);d.anim=new n.Anim(k,{opacity:{to:0}},e.duration,e.easing);d.anim.onComplete.subscribe(function(){d.anim=
null;l.setStyle(f,"z-index",9);l.setStyle(k,"z-index",1);s()});d.anim.animate()},scroll:function(j,m,s,d){var e=this;j=e.config;m=j.effect==="scrollx";var k={};k[m?"left":"top"]={to:-(e.viewSize[m?0:1]*d)};e.anim&&e.anim.stop();e.anim=new n.Anim(e.content,k,j.duration,j.easing);e.anim.onComplete.subscribe(function(){e.anim=null;s()});e.anim.animate()}};g=q.Effects;g.scrollx=g.scrolly=g.scroll;q.Plugins.push({name:"effect",init:function(j){var m=j.config,s=m.effect,d=j.panels,e=m.steps,k=j.activeIndex*
e,f=k+e-1,a=d.length;j.viewSize=[m.viewSize[0]||d[0].offsetWidth*e,m.viewSize[0]||d[0].offsetHeight*e];if(s!=="none"){for(m=0;m<a;m++)d[m].style.display="block";switch(s){case "scrollx":case "scrolly":j.content.style.position="absolute";j.content.parentNode.style.position="relative";if(s==="scrollx"){l.setStyle(d,"float","left");j.content.style.width=j.viewSize[0]*(a/e)+"px"}break;case "fade":for(m=0;m<a;m++){l.setStyle(d[m],"opacity",m>=k&&m<=f?1:0);d[m].style.position="absolute";d[m].style.zIndex=
m>=k&&m<=f?9:1}break}}}});i.mix(q.prototype,{_switchView:function(j,m,s,d){var e=this,k=e.config.effect;(typeof k==="function"?k:g[k]).call(e,j,m,function(){e.fireEvent("onSwitch",s)},s,d)}})});
KISSY.add("switchable-circular",function(i){function n(c,h,o,r,t){var p=this;c=p.config;h=p.length;var u=p.activeIndex,v=c.scrollType===a,w=v?m:s,x=p.viewSize[v?0:1];v=-x*r;var z={},A,y=t===f;if(A=y&&u===0&&r===h-1||t===k&&u===h-1&&r===0)v=l.call(p,p.panels,r,y,w,x);z[w]={to:v};p.anim&&p.anim.stop();p.anim=new g.Anim(p.content,z,c.duration,c.easing);p.anim.onComplete.subscribe(function(){A&&q.call(p,p.panels,r,y,w,x);p.anim=null;o()});p.anim.animate()}function l(c,h,o,r,t){var p=this.config.steps;
h=this.length;var u=o?h-1:0,v=(u+1)*p;for(p=u*p;p<v;p++){c[p].style.position=j;c[p].style[r]=(o?"-":e)+t*h+d}return o?t:-t*h}function q(c,h,o,r,t){var p=this.config.steps;h=this.length;var u=o?h-1:0,v=(u+1)*p;for(p=u*p;p<v;p++){c[p].style.position=e;c[p].style[r]=e}this.content.style[r]=o?-t*(h-1)+d:e}var g=YAHOO.util,j="relative",m="left",s="top",d="px",e="",k="forward",f="backward",a="scrollx",b=i.Switchable;i.mix(b.Config,{circular:false});b.Plugins.push({name:"circular",init:function(c){c=c.config;
if(c.circular&&(c.effect===a||c.effect==="scrolly")){c.scrollType=c.effect;c.effect=n}}})});
KISSY.add("switchable-lazyload",function(i){var n=YAHOO.util.Dom,l="beforeSwitch",q="img-src",g="textarea-data",j={},m=i.Switchable,s=i.DataLazyload;j[q]="data-lazyload-src-custom";j[g]="ks-datalazyload-custom";i.mix(m.Config,{lazyDataType:"",lazyDataFlag:""});m.Plugins.push({name:"autoplay",init:function(d){function e(c){var h=f.steps;c=c*h;s.loadCustomLazyData(d.panels.slice(c,c+h),a,b);k()&&d.unsubscribe(l,e)}function k(){var c,h,o;if(a===q){c=d.container.getElementsByTagName("img");h=0;for(o=
c.length;h<o;h++)if(c[h].getAttribute(b))return false}else if(a===g){c=d.container.getElementsByTagName("textarea");h=0;for(o=c.length;h<o;h++)if(n.hasClass(c[h],b))return false}return true}var f=d.config,a=f.lazyDataType,b=f.lazyDataFlag||j[a];!s||!a||!b||d.subscribe(l,e)}})});KISSY.add("tabs",function(i){function n(l,q){if(!(this instanceof n))return new n(l,q);n.superclass.constructor.call(this,l,q)}i.extend(n,i.Switchable);i.Tabs=n});
KISSY.add("slide",function(i){function n(q,g){if(!(this instanceof n))return new n(q,g);g=i.merge(l,g||{});n.superclass.constructor.call(this,q,g)}var l={autoplay:true,circular:true};i.extend(n,i.Switchable);i.Slide=n});KISSY.add("carousel",function(i){function n(q,g){if(!(this instanceof n))return new n(q,g);g=i.merge(l,g||{});n.superclass.constructor.call(this,q,g)}var l={circular:true};i.extend(n,i.Switchable);i.Carousel=n});
KISSY.add("album",function(i){function n(q,g){if(!(this instanceof n))return new n(q,g);g=i.merge(l,g||{});n.superclass.constructor.call(this,q,g)}var l={circular:true};i.extend(n,i.Switchable);i.Album=n});
