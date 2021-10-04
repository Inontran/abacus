/*! For license information please see abacus.js.LICENSE.txt */
(()=>{var e={1843:e=>{var t={};try{t.EventTarget=(new EventTarget).constructor}catch(e){!function(e,s){var a=e.create,i=e.defineProperty,n=l.prototype;function l(){"use strict";s.set(this,a(null))}function r(e,t,s){i(e,t,{configurable:!0,writable:!0,value:s})}function o(e){var t=e.options;t&&t.once&&e.target.removeEventListener(this.type,e.listener),"function"==typeof e.listener?e.listener.call(e.target,this):e.listener.handleEvent(this)}r(n,"addEventListener",(function(e,t,a){for(var i=s.get(this),n=i[e]||(i[e]=[]),l=0,r=n.length;l<r;l++)if(n[l].listener===t)return;n.push({target:this,listener:t,options:a})})),r(n,"dispatchEvent",(function(e){var t=s.get(this)[e.type];return t&&(r(e,"target",this),r(e,"currentTarget",this),t.slice(0).forEach(o,e),delete e.currentTarget,delete e.target),!0})),r(n,"removeEventListener",(function(e,t){for(var a=s.get(this),i=a[e]||(a[e]=[]),n=0,l=i.length;n<l;n++)if(i[n].listener===t)return void i.splice(n,1)})),t.EventTarget=l}(Object,new WeakMap)}e.exports=t.EventTarget},5160:(e,t,s)=>{"use strict";s.r(t)},4596:function(e,t,s){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=a(s(4081));s(5160),$.fn.abacus=function(e,t,s){var a=this;return this.each((function(){var n,l=this;if(l.jqueryAbacusInstance instanceof i.default)n=l.jqueryAbacusInstance;else{if("object"==typeof e)n=new i.default(l,e);else{if(e)return;n=new i.default(l)}l.jqueryAbacusInstance=n}if("string"==typeof e){var r=void 0;switch(e){case"destroy":n.destroy(),l.jqueryAbacusInstance=null;break;case"disable":n.option("disabled",!0);break;case"enable":n.option("disabled",!1);break;case"instance":a=n;break;case"option":void 0!==typeof(r="object"==typeof t?n.option(void 0,t):"string"==typeof t?n.option(t,s):n.option())&&(a=r);break;case"value":case"values":void 0!==typeof(r=n.option(e,t))&&(a=r);break;case"widget":r=$(n.getHtmlWidget())}}})),a}},6507:function(e,t,s){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=a(s(1843)),n=a(s(2716)),l=function(){function e(e){this._abacusProperty={animate:!1,classes:{abacus:"abacus",vertical:"abacus_vertical",disabled:"abacus_disabled",handle:"abacus__handle",range:"abacus__range",mark:"abacus__mark",markSelected:"abacus__mark_selected",markInrange:"abacus__mark_in-range",tooltip:"abacus__tooltip"},disabled:!1,interval:!1,max:100,min:0,orientation:n.default.HORIZONTAL,range:!1,scale:!1,step:1,tooltip:!1,value:0,values:[0]},e&&this.setAbacusProperty(e),this._eventTarget=new i.default,this._eventUpdateModel=new CustomEvent("update-model")}return Object.defineProperty(e.prototype,"abacusProperty",{get:function(){return this._abacusProperty},enumerable:!1,configurable:!0}),e.prototype.setAbacusProperty=function(e){var t,s,a=e;if(void 0!==a.animate){var i="fast"===a.animate||"slow"===a.animate,l="boolean"==typeof a.animate;i||l?this._abacusProperty.animate=a.animate:"number"==typeof a.animate?this._abacusProperty.animate=Math.round(a.animate):this._abacusProperty.animate=!1}if("object"==typeof a.classes&&(this._abacusProperty.classes||(this._abacusProperty.classes={}),"string"==typeof a.classes.abacus&&a.classes.abacus&&(this._abacusProperty.classes.abacus=a.classes.abacus),"string"==typeof a.classes.disabled&&a.classes.disabled&&(this._abacusProperty.classes.disabled=a.classes.disabled),"string"==typeof a.classes.range&&a.classes.range&&(this._abacusProperty.classes.range=a.classes.range),"string"==typeof a.classes.handle&&a.classes.handle&&(this._abacusProperty.classes.handle=a.classes.handle),"string"==typeof a.classes.mark&&a.classes.mark&&(this._abacusProperty.classes.mark=a.classes.mark),"string"==typeof a.classes.markSelected&&a.classes.markSelected&&(this._abacusProperty.classes.markSelected=a.classes.markSelected),"string"==typeof a.classes.markInrange&&a.classes.markInrange&&(this._abacusProperty.classes.markInrange=a.classes.markInrange),"string"==typeof a.classes.tooltip&&a.classes.tooltip&&(this._abacusProperty.classes.tooltip=a.classes.tooltip)),void 0!==a.disabled&&(this._abacusProperty.disabled=!!a.disabled),void 0!==a.max&&null!==a.max&&"number"==typeof a.max&&(this._abacusProperty.max=a.max),void 0!==a.scale&&(this._abacusProperty.scale=!!a.scale),void 0!==a.min&&null!==a.min&&"number"==typeof a.min&&(this._abacusProperty.min=a.min),this._abacusProperty.max<this._abacusProperty.min){var r=this._abacusProperty.max;this._abacusProperty.max=this._abacusProperty.min,this._abacusProperty.min=r}if(void 0!==a.step&&null!==a.step&&"number"==typeof a.step&&(this._abacusProperty.step=a.step),void 0!==a.tooltip&&(this._abacusProperty.tooltip=!!a.tooltip),void 0!==a.value&&null!==a.value&&(Number.isNaN(a.value)||("string"==typeof a.value&&(a.value=parseFloat(a.value)),a.value=this.roundValuePerStep(a.value),this._abacusProperty.value=a.value,(null===(t=this._abacusProperty.values)||void 0===t?void 0:t.length)||(this._abacusProperty.values=[]),this._abacusProperty.values[0]=a.value)),null===(s=a.values)||void 0===s?void 0:s.length){this._abacusProperty.values=[];for(var o=0;o<a.values.length&&("string"==typeof a.values[o]&&(a.values[o]=parseFloat(a.values[o].toString())),a.values[o]=this.roundValuePerStep(a.values[o]),this._abacusProperty.values[o]=a.values[o],0===o&&(this._abacusProperty.value=a.values[o]),!(o>1));o+=1);this._abacusProperty.values.sort((function(e,t){return e>t?1:e===t?0:-1})),this._abacusProperty.values.length<2?this._abacusProperty.interval=!1:this._abacusProperty.interval=!0}for(o=0;o<this._abacusProperty.values.length;o+=1)0===o&&this._abacusProperty.values[0]<this._abacusProperty.min&&(this._abacusProperty.values[0]=this._abacusProperty.min),1===o&&this._abacusProperty.values[1]>this._abacusProperty.max&&(this._abacusProperty.values[1]=this._abacusProperty.max);void 0!==a.range&&(!1===a.range||!0===a.range?this._abacusProperty.range=a.range:"max"===a.range?this._abacusProperty.range="max":"min"===a.range&&(this._abacusProperty.range="min")),void 0!==a.orientation&&("vertical"===a.orientation||a.orientation===n.default.VERTICAL?this._abacusProperty.orientation=n.default.VERTICAL:this._abacusProperty.orientation=n.default.HORIZONTAL),void 0!==a.change&&(this._abacusProperty.change=a.change),void 0!==a.create&&(this._abacusProperty.create=a.create),void 0!==a.slide&&(this._abacusProperty.slide=a.slide),void 0!==a.start&&(this._abacusProperty.start=a.start),void 0!==a.stop&&(this._abacusProperty.stop=a.stop),this._eventTarget&&this._eventTarget.dispatchEvent(this._eventUpdateModel)},Object.defineProperty(e.prototype,"eventTarget",{get:function(){return this._eventTarget},enumerable:!1,configurable:!0}),e.prototype.roundValuePerStep=function(t){var s=t,a=this._abacusProperty.min,i=this._abacusProperty.max,n=this._abacusProperty.step;if(t>=i)return i;if(t<=a)return a;for(var l=a;l<i;l+=n)if(t>l&&t<l+n){if(l+n>i){s=i;break}var r=l+n;s=t-l<r-t?l:r;break}return e.round(s,n)},e.countNumAfterPoint=function(e){var t=e.toString();return(""+t).indexOf(".")>=0?(""+t).split(".")[1].length:0},e.round=function(t,s){var a=e.countNumAfterPoint(s);return a>0?parseFloat(t.toFixed(a)):Math.round(t)},e}();t.default=l},6714:function(e,t,s){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=a(s(1843)),n=a(s(6507)),l=function(){function e(e){this._model=new n.default(e),this._eventTarget=new i.default,this._eventUpdateModel=new CustomEvent("update-model"),this._bindEventListeners()}return e.prototype.getModelAbacusProperty=function(){return this._model.abacusProperty},e.prototype.setModelAbacusProperty=function(e){this._model.setAbacusProperty(e)},e.prototype._bindEventListeners=function(){this._model.eventTarget.addEventListener("update-model",this._handleModelUpdate.bind(this))},e.prototype._handleModelUpdate=function(){this._eventTarget.dispatchEvent(this._eventUpdateModel)},Object.defineProperty(e.prototype,"eventTarget",{get:function(){return this._eventTarget},enumerable:!1,configurable:!0}),e}();t.default=l},4081:function(e,t,s){"use strict";var a=this&&this.__read||function(e,t){var s="function"==typeof Symbol&&e[Symbol.iterator];if(!s)return e;var a,i,n=s.call(e),l=[];try{for(;(void 0===t||t-- >0)&&!(a=n.next()).done;)l.push(a.value)}catch(e){i={error:e}}finally{try{a&&!a.done&&(s=n.return)&&s.call(n)}finally{if(i)throw i.error}}return l},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=i(s(2716)),l=i(s(6714)),r=i(s(5046)),o=i(s(8134)),c=i(s(3289)),h=i(s(2796)),u=i(s(5558)),d=function(){function e(e,t){this._handles=[],this._tooltips=[],this._isDisabled=!1,this._isDragHandle=!1,this._shiftClickOnHandle=0,this._handleMovingTimer=null,this._collectionMarks=new Set,this._isVertical=!1,this._presenter=new l.default(t);var s=this._presenter.getModelAbacusProperty();this._widgetContainer=new r.default(s.classes),e.append(this._widgetContainer.htmlElement),this._range=new c.default(s.classes),this._customEventChange=new CustomEvent("abacus-change",{bubbles:!0,cancelable:!0}),this._customEventCreate=new CustomEvent("abacus-create",{bubbles:!0,cancelable:!0}),this._customEventSlide=new CustomEvent("abacus-slide",{bubbles:!0,cancelable:!0}),this._customEventStart=new CustomEvent("abacus-start",{bubbles:!0,cancelable:!0}),this._customEventStop=new CustomEvent("abacus-stop",{bubbles:!0,cancelable:!0}),this.updateView(),this._bindEventListeners(),this._eventCreateWrapper()}return e.prototype.getPosPercent=function(e){var t=0;return(t=this._isVertical?100-(t=(e-this._widgetContainer.htmlElement.getBoundingClientRect().top)/this._widgetContainer.htmlElement.getBoundingClientRect().height*100):(e-this._widgetContainer.htmlElement.getBoundingClientRect().left)/this._widgetContainer.htmlElement.getBoundingClientRect().width*100)<0&&(t=0),t>100&&(t=100),t},e.prototype.getPosFromValue=function(e){var t,s=this._presenter.getModelAbacusProperty(),a=s.min,i=s.max,n=e;return a<0?(i+=-1*a,n+=-1*a):a>0&&(i-=a,n-=a),(t=n/i*100)<0?0:t>100?100:t},e.prototype.getValFromPosPercent=function(e){var t=0,s=this._presenter.getModelAbacusProperty(),a=s.min,i=s.max;return a<0?i+=-1*a:a>0&&(i-=a),t=i*e/100,a<0?t-=-1*a:a>0&&(t+=a),t},e.prototype.option=function(e,t){if("string"==typeof e)switch(e){case"animate":case"classes":case"disabled":case"max":case"scale":case"min":case"orientation":case"range":case"step":case"tooltip":case"value":case"values":if(void 0===t)return this._presenter.getModelAbacusProperty()[e];var s={};s[e]=t,this._presenter.setModelAbacusProperty(s)}else{if("object"!=typeof t)return this._presenter.getModelAbacusProperty();this._presenter.setModelAbacusProperty(t)}},e.prototype.updateView=function(){var t,s,a,i,l,r,o,c,h,u,d,m=this._presenter.getModelAbacusProperty(),_=(null===(t=this._cachedAbacusProperty)||void 0===t?void 0:t.range)!==m.range,p=(null===(s=this._cachedAbacusProperty)||void 0===s?void 0:s.orientation)!==m.orientation,v=(null===(a=this._cachedAbacusProperty)||void 0===a?void 0:a.tooltip)!==m.tooltip,f=(null===(i=this._cachedAbacusProperty)||void 0===i?void 0:i.animate)!==m.animate,g=(null===(l=this._cachedAbacusProperty)||void 0===l?void 0:l.max)!==m.max,b=(null===(r=this._cachedAbacusProperty)||void 0===r?void 0:r.min)!==m.min,y=!e.arrayCompare(null===(o=this._cachedAbacusProperty)||void 0===o?void 0:o.values,m.values),E=(null===(c=this._cachedAbacusProperty)||void 0===c?void 0:c.disabled)!==m.disabled,P=(null===(h=this._cachedAbacusProperty)||void 0===h?void 0:h.scale)!==m.scale,w=(null===(u=this._cachedAbacusProperty)||void 0===u?void 0:u.step)!==m.step,N=(null===(d=this._cachedAbacusProperty)||void 0===d?void 0:d.interval)!==m.interval;_&&this._createViewRange(m),N&&(this._createViewRange(m),this._createViewHandles(m)),p&&(m.orientation===n.default.VERTICAL?(this._isVertical=!0,this._widgetContainer.isVertical(!0)):(this._isVertical=!1,this._widgetContainer.isVertical(!1))),(v||N)&&(this._createViewTooltips(m),this._updateViewTooltips(m),this._setTransition()),f&&this._setTransition(),(_||g||b||p||y||N)&&(this._updateViewHandles(m),this._updateViewTooltips(m),this._updateViewRange(m),this._highlightMarks()),y&&(this._findMovedHandle(),this._eventSlideWrapper()),m.classes&&this._updateClassNames(m.classes),E&&this.toggleDisable(m.disabled),(P||w||g||b||p)&&(m.scale?(this._createScale(),this._setTransition()):this._removeScale(),this._highlightMarks()),this._cachedAbacusProperty=e.getCloneAbacusProperty(m)},e.prototype._createViewHandles=function(e){var t,s=this,i=[];if(!(null===(t=s._handles)||void 0===t?void 0:t.length)){s._handles=[],s._handles[0]=new o.default(e.classes,0);var n=a(s._handles,1)[0];s._widgetContainer.htmlElement.append(n.htmlElement),s._currentHandle=n,i.push(0)}var l=a(s._handles,1)[0];switch(e.interval){case!0:s._handles[1]=new o.default(e.classes,1),s._widgetContainer.htmlElement.append(s._handles[1].htmlElement),i.push(1);break;default:s._handles[1]&&(s._handles[1].htmlElement.remove(),s._handles=s._handles.slice(0,1)),s._currentHandle=l}s._handleHandleItemPointerdown=s._handleHandleItemPointerdown.bind(s);for(var r=0;r<i.length;r+=1){var c=i[r];s._handles[c].htmlElement.addEventListener("pointerdown",s._handleHandleItemPointerdown)}},e.prototype._updateViewHandles=function(e){if(e.values)for(var t=0;t<e.values.length;t+=1){var s=e.values[t],a=this.getPosFromValue(s);this._handles[t]&&(this._isVertical?(this._handles[t].posLeft=null,this._handles[t].posBottom=a):(this._handles[t].posBottom=null,this._handles[t].posLeft=a))}},e.prototype._createViewTooltips=function(e){for(var t=0;t<this._tooltips.length;t+=1)this._tooltips[t].htmlElement.remove();if(this._tooltips=[],e.tooltip){var s=!0===e.interval?2:1;for(t=0;t<s;t+=1)this._tooltips[t]=new u.default(e.classes,t),this._widgetContainer.htmlElement.append(this._tooltips[t].htmlElement)}},e.prototype._updateViewTooltips=function(e){if(e.values&&e.tooltip)for(var t=0;t<e.values.length;t+=1){var s=e.values[t],a=this.getPosFromValue(s);this._tooltips[t]&&(this._isVertical?(this._tooltips[t].posLeft=null,this._tooltips[t].posBottom=a):(this._tooltips[t].posBottom=null,this._tooltips[t].posLeft=a),this._tooltips[t].htmlElement.innerText=e.values[t].toString())}},e.prototype._createViewRange=function(e){switch(e.range){case"max":!0===e.interval?this._range.rangeType="between":this._range.rangeType="max",this._widgetContainer.htmlElement.prepend(this._range.htmlElement);break;case!0:!1===e.interval?this._range.rangeType="min":this._range.rangeType="between",this._widgetContainer.htmlElement.prepend(this._range.htmlElement);break;case"min":!0===e.interval?this._range.rangeType="between":this._range.rangeType="min",this._widgetContainer.htmlElement.prepend(this._range.htmlElement);break;default:this._range.rangeType="hidden",this._range.htmlElement.remove()}},e.prototype._updateViewRange=function(e){var t;if(null===(t=e.values)||void 0===t?void 0:t.length){var s=this.getPosFromValue(e.values[0]),a=this.getPosFromValue(e.values[1]);if(this._isVertical)switch(this._range.htmlElement.style.left="",this._range.htmlElement.style.right="",this._range.width=null,this._range.rangeType){case"min":this._range.htmlElement.style.top="auto",this._range.htmlElement.style.bottom="0",this._range.height=s;break;case"max":this._range.htmlElement.style.top="0",this._range.htmlElement.style.bottom="auto",this._range.height=100-s;break;case"between":this._range.htmlElement.style.bottom=s.toString()+"%",this._range.htmlElement.style.top="",this._range.height=a-s}else switch(this._range.htmlElement.style.top="",this._range.htmlElement.style.bottom="",this._range.height=null,this._range.rangeType){case"min":this._range.htmlElement.style.left="0",this._range.htmlElement.style.right="auto",this._range.width=s;break;case"max":this._range.htmlElement.style.left="auto",this._range.htmlElement.style.right="0",this._range.width=100-s;break;case"between":this._range.htmlElement.style.left=s.toString()+"%",this._range.htmlElement.style.right="",this._range.width=a-s}}},e.prototype._updateClassNames=function(e){var t,s,a,i,n,l,r,o,c,h,u=this;if((null===(s=null===(t=this._cachedAbacusProperty)||void 0===t?void 0:t.classes)||void 0===s?void 0:s.abacus)!==(null==e?void 0:e.abacus)&&(this._widgetContainer.className=null==e?void 0:e.abacus),(null===(i=null===(a=this._cachedAbacusProperty)||void 0===a?void 0:a.classes)||void 0===i?void 0:i.vertical)!==(null==e?void 0:e.vertical)&&(this._widgetContainer.classNameVertical=null==e?void 0:e.vertical),(null===(l=null===(n=this._cachedAbacusProperty)||void 0===n?void 0:n.classes)||void 0===l?void 0:l.disabled)!==(null==e?void 0:e.disabled)&&(this._widgetContainer.classNameDisabled=null==e?void 0:e.disabled),(null===(o=null===(r=this._cachedAbacusProperty)||void 0===r?void 0:r.classes)||void 0===o?void 0:o.handle)!==(null==e?void 0:e.handle))for(var d=0;d<this._handles.length;d+=1)this._handles[d].className=null==e?void 0:e.handle;(null===(h=null===(c=this._cachedAbacusProperty)||void 0===c?void 0:c.classes)||void 0===h?void 0:h.range)!==(null==e?void 0:e.range)&&(this._range.className=null==e?void 0:e.range),this._collectionMarks.forEach((function(t){var s,a,i,n,l,r,o=t;(null===(a=null===(s=u._cachedAbacusProperty)||void 0===s?void 0:s.classes)||void 0===a?void 0:a.mark)!==(null==e?void 0:e.mark)&&(null==e?void 0:e.mark)&&(o.className=e.mark),(null===(n=null===(i=u._cachedAbacusProperty)||void 0===i?void 0:i.classes)||void 0===n?void 0:n.markSelected)!==(null==e?void 0:e.markSelected)&&(null==e?void 0:e.markInrange)&&(o.classNameSelected=e.markSelected),(null===(r=null===(l=u._cachedAbacusProperty)||void 0===l?void 0:l.classes)||void 0===r?void 0:r.markInrange)!==(null==e?void 0:e.markInrange)&&(null==e?void 0:e.markInrange)&&(o.classNameInrange=e.markInrange)}))},e.prototype.toggleDisable=function(e){this._isDisabled=null==e?!this._isDisabled:!!e,this._widgetContainer.isDisabled(this._isDisabled)},e.prototype._getEventUIData=function(){var t={};this._currentHandle&&(t.handle=this._currentHandle.htmlElement,t.handleIndex=this._currentHandle.handleIndex);var s=this._presenter.getModelAbacusProperty();return t.abacusProperty=e.getCloneAbacusProperty(s),t},e.prototype._eventChangeWrapper=function(e){void 0===e&&(e=this._customEventChange);var t=this._widgetContainer.htmlElement.dispatchEvent(this._customEventChange),s=this._presenter.getModelAbacusProperty();return"function"==typeof(null==s?void 0:s.change)&&s.change(e,this._getEventUIData()),t},e.prototype._eventCreateWrapper=function(e){void 0===e&&(e=this._customEventCreate);var t=this._widgetContainer.htmlElement.dispatchEvent(this._customEventCreate),s=this._presenter.getModelAbacusProperty();return"function"==typeof(null==s?void 0:s.create)&&s.create(e,this._getEventUIData()),t},e.prototype._eventSlideWrapper=function(e){void 0===e&&(e=this._customEventSlide);var t=this._widgetContainer.htmlElement.dispatchEvent(this._customEventSlide),s=this._presenter.getModelAbacusProperty();return"function"==typeof(null==s?void 0:s.slide)&&s.slide(e,this._getEventUIData()),t},e.prototype._eventStartWrapper=function(e){void 0===e&&(e=this._customEventStart);var t=this._widgetContainer.htmlElement.dispatchEvent(this._customEventStart),s=this._presenter.getModelAbacusProperty();return"function"==typeof(null==s?void 0:s.start)&&s.start(e,this._getEventUIData()),t},e.prototype._eventStopWrapper=function(e){void 0===e&&(e=this._customEventStop);var t=this._widgetContainer.htmlElement.dispatchEvent(this._customEventStop),s=this._presenter.getModelAbacusProperty();return"function"==typeof(null==s?void 0:s.stop)&&s.stop(e,this._getEventUIData()),t},e.prototype._mousePositionHandler=function(e){var t,s,i=this,n=i._presenter.getModelAbacusProperty();if((null===(t=n.values)||void 0===t?void 0:t.length)&&i._currentHandle){var l=this._isVertical?e.clientY:e.clientX,r=this.getPosPercent(l-this._shiftClickOnHandle),o=this.getValFromPosPercent(r),c=null===(s=n.values)||void 0===s?void 0:s.slice(0),h=a(i._handles,2),u=h[0],d=h[1],m=a(n.values,2),_=m[0],p=m[1];0===i._currentHandle.handleIndex&&(o>=p?(c[0]=p,i._currentHandle=d):c[0]=o),1===i._currentHandle.handleIndex&&(o<=_?(c[1]=_,i._currentHandle=u):c[1]=o),i._presenter.setModelAbacusProperty({values:c})}},e.prototype._calcHandleValues=function(e){var t,s,a;if(!Number.isNaN(e)){var i=this._presenter.getModelAbacusProperty();if(null===(t=i.values)||void 0===t?void 0:t.length){var n=[];if(i.values&&(n=null===(s=i.values)||void 0===s?void 0:s.slice(0)),!0===i.interval&&(null===(a=i.values)||void 0===a?void 0:a.length)&&i.step){var l=i.values[0]-e;l=l<0?l*=-1:l;var r=i.values[1]-e;(r=r<0?r*=-1:r)<l?n[1]=e:n[0]=e}else n[0]=e;this._presenter.setModelAbacusProperty({values:n})}}},e.prototype._bindEventListeners=function(){var e=this;e._presenter.eventTarget.addEventListener("update-model",this._handleModelUpdate.bind(this)),e._handleWidgetContainerPointerdown=e._handleWidgetContainerPointerdown.bind(e),e._widgetContainer.htmlElement.addEventListener("pointerdown",e._handleWidgetContainerPointerdown),e._handleHandleItemPointermove=e._handleHandleItemPointermove.bind(e),document.addEventListener("pointermove",e._handleHandleItemPointermove,{passive:!0}),e._handleHandleItemPointerup=e._handleHandleItemPointerup.bind(e),document.addEventListener("pointerup",e._handleHandleItemPointerup),document.addEventListener("pointercancel",e._handleHandleItemPointerup)},e.prototype._handleModelUpdate=function(){this.updateView()},e.prototype._handleWidgetContainerPointerdown=function(t){var s,a,i,n,l,r,o;t.preventDefault();var c=this,h=c._presenter.getModelAbacusProperty(),u=t.target,d=(null===(s=h.classes)||void 0===s?void 0:s.handle)?null===(a=h.classes)||void 0===a?void 0:a.handle:"",m=(null===(i=h.classes)||void 0===i?void 0:i.mark)?null===(n=h.classes)||void 0===n?void 0:n.mark:"",_=(null===(l=h.classes)||void 0===l?void 0:l.tooltip)?null===(r=h.classes)||void 0===r?void 0:r.tooltip:"";if(!(c._isDisabled||u.classList.contains(d)||u.classList.contains(m)||u.classList.contains(_))){var p=this._isVertical?t.clientY:t.clientX,v=null===(o=c._cachedAbacusProperty)||void 0===o?void 0:o.values,f=this.getPosPercent(p),g=this.getValFromPosPercent(f);c._calcHandleValues(g),!e.arrayCompare(v,h.values)&&this._eventChangeWrapper(t)}},e.prototype._handleHandleItemPointerdown=function(e){e.preventDefault();var t=this;if(!t._isDisabled){var s=e.currentTarget,a=s.getAttribute("data-handle-index");if(a){var i=t._isVertical?e.pageY:e.clientX,n=$(s).offset();n?t._isVertical?t._shiftClickOnHandle=i-n.top-s.clientHeight/2:t._shiftClickOnHandle=i-n.left-s.clientWidth/2:t._shiftClickOnHandle=0;var l=parseInt(a,10);t._isDragHandle=!0,t._currentHandle=t._handles[l],t._eventStartWrapper(e)}}},e.prototype._handleHandleItemPointermove=function(e){var t=this;t._isDisabled||(null!==t._handleMovingTimer&&clearTimeout(t._handleMovingTimer),t._handleMovingTimer=setTimeout((function(){t._isDragHandle&&t._mousePositionHandler(e)}),5))},e.prototype._handleHandleItemPointerup=function(e){var t=this;t._isDragHandle&&(t._eventChangeWrapper(e),t._eventStopWrapper(e)),t._isDragHandle=!1},e.prototype._createScale=function(){var t=this;this._collectionMarks.size&&this._removeScale();var s=this._presenter.getModelAbacusProperty(),a=new h.default(s.min,s.classes);this._widgetContainer.htmlElement.append(a.htmlElement);var i=new h.default(s.max,s.classes);this._widgetContainer.htmlElement.append(i.htmlElement);var n,l=0,r=0,o=0;this._isVertical?(l=a.htmlElement.offsetHeight,r=i.htmlElement.offsetHeight):(l=a.htmlElement.offsetWidth,r=i.htmlElement.offsetWidth),o=l>r?l:r,o=this._isVertical?o+2:o+10,a.htmlElement.remove(),i.htmlElement.remove(),n=this._isVertical?this._widgetContainer.htmlElement.offsetHeight:this._widgetContainer.htmlElement.offsetWidth;var c=Math.floor(n/o),u=(s.max-s.min)/s.step;u=u<0?-1*u:u,u=Math.ceil(u),s.max%s.step!=0&&(c-=1),c>u&&(c=u);var d=(s.max-s.min)/c;s.step>d&&(d=s.step);for(var m=0,_=s.min;_<=s.max;_+=s.step)if((m+=s.step)>=d||_===s.min){_=e.round(_,s.step);var p=new h.default(_,s.classes),v=this.getPosFromValue(_);this._isVertical?p.posBottom=v:p.posLeft=v,this._collectionMarks.add(p),m=0}var f=new h.default(s.max,s.classes),g=this.getPosFromValue(s.max);this._isVertical?f.posBottom=g:f.posLeft=g,this._collectionMarks.add(f),this._collectionMarks.forEach((function(e){var s=e;t._widgetContainer.htmlElement.contains(t._handles[0].htmlElement)?t._handles[0].htmlElement.before(s.htmlElement):t._widgetContainer.htmlElement.append(s.htmlElement)})),this._thinOutScale(),this._bindEventListenersOnMarks()},e.prototype._removeScale=function(){this._collectionMarks.forEach((function(e){e.htmlElement.remove()})),this._collectionMarks.clear()},e.prototype._thinOutScale=function(){var e,t=this;e=this._isVertical?this._widgetContainer.htmlElement.offsetHeight:this._widgetContainer.htmlElement.offsetWidth;var s=0;this._collectionMarks.forEach((function(e){var a=e;t._isVertical?s+=a.htmlElement.offsetHeight+2:s+=a.htmlElement.offsetWidth+10}));var a,i,n=this._presenter.getModelAbacusProperty();if(e<s){var l=!1;this._collectionMarks.forEach((function(e){var s=e;s.associatedValue===n.min||s.associatedValue===n.max||l?l=!1:(null==s||s.htmlElement.remove(),t._collectionMarks.delete(s),l=!0)}))}if(this._collectionMarks.forEach((function(e){var t=e;t.associatedValue===n.max?i=t:a=t})),a&&i){a=a,i=i;var r=this._isVertical?a.htmlElement.offsetTop:a.htmlElement.offsetLeft,o=this._isVertical?a.htmlElement.offsetHeight:a.htmlElement.offsetWidth,c=this._isVertical?i.htmlElement.offsetTop:i.htmlElement.offsetLeft,h=this._isVertical?i.htmlElement.offsetHeight:i.htmlElement.offsetWidth;Math.abs(c-r)<=(h+o)/2&&(i.htmlElement.remove(),this._collectionMarks.delete(i))}s=0,this._collectionMarks.forEach((function(e){var a=e;t._isVertical?s+=a.htmlElement.offsetHeight+2:s+=a.htmlElement.offsetWidth+10})),e<s&&this._thinOutScale()},e.prototype._highlightMarks=function(){if(this._collectionMarks.size){var e=this._presenter.getModelAbacusProperty(),t=this._range.rangeType;this._collectionMarks.forEach((function(s){var a=s,i=a.associatedValue>=e.values[0]&&a.associatedValue<=e.values[1];"min"===t&&a.associatedValue<=e.values[0]||"max"===t&&a.associatedValue>=e.values[0]||"between"===t&&i?a.isInrange(!0):a.isInrange(!1),a.associatedValue===e.values[0]||a.associatedValue===e.values[1]?a.isSelected(!0):a.isSelected(!1)}))}},e.prototype._bindEventListenersOnMarks=function(){var e=this;this._handleMarksClick=this._handleMarksClick.bind(this),this._collectionMarks.forEach((function(t){t.htmlElement.addEventListener("pointerdown",e._handleMarksClick)}))},e.prototype._handleMarksClick=function(t){var s,a;t.preventDefault();var i=this;if(!i._isDisabled){var n=t.currentTarget.getAttribute("data-associated-value");if(n){var l=parseFloat(n),r=null===(s=i._cachedAbacusProperty)||void 0===s?void 0:s.values;(null===(a=i._cachedAbacusProperty)||void 0===a?void 0:a.value)!==l&&i._calcHandleValues(l);var o=i._presenter.getModelAbacusProperty();!e.arrayCompare(r,o.values)&&this._eventChangeWrapper(t)}}},e.prototype._setTransition=function(){var e="",t=this._presenter.getModelAbacusProperty().animate;"number"==typeof t&&t>0?e=t.toString():!0===t?e="400":"slow"===t?e="600":"fast"===t&&(e="200"),e=e?e+"ms":"";for(var s=0;s<this._handles.length;s+=1)this._handles[s].htmlElement.style.transition=e,this._tooltips[s]&&(this._tooltips[s].htmlElement.style.transition=e);this._range.htmlElement.style.transition=e,this._collectionMarks.forEach((function(t){t.htmlElement.style.transition=e}))},e.getCloneAbacusProperty=function(e){var t,s={};return Object.assign(s,e),s.values=null===(t=e.values)||void 0===t?void 0:t.slice(0),Object.assign(s.classes,e.classes),s},e.prototype._findMovedHandle=function(){var e=this._presenter.getModelAbacusProperty(),t=a(this._handles,2),s=t[0],i=t[1];return this._currentHandle=s,this._cachedAbacusProperty&&this._cachedAbacusProperty.values[1]!==e.values[1]&&(this._currentHandle=i),this._currentHandle},e.prototype.getHtmlWidget=function(){return this._widgetContainer.htmlElement},e.prototype.destroy=function(){this._widgetContainer.htmlElement.remove(),this._widgetContainer.htmlElement.removeEventListener("pointerdown",this._handleWidgetContainerPointerdown),document.removeEventListener("pointermove",this._handleHandleItemPointermove),document.removeEventListener("pointerup",this._handleHandleItemPointerup),document.removeEventListener("pointercancel",this._handleHandleItemPointerup)},e.countNumAfterPoint=function(e){var t=e.toString();return(""+t).indexOf(".")>=0?(""+t).split(".")[1].length:0},e.round=function(t,s){var a=e.countNumAfterPoint(s);return a>0?parseFloat(t.toFixed(a)):Math.round(t)},e.arrayCompare=function(e,t){if(!e||!t)return!1;if((null==e?void 0:e.length)!==(null==t?void 0:t.length))return!1;for(var s=0;s<e.length;s+=1)if(e[s]!==t[s])return!1;return!0},e}();t.default=d},8134:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){this._posLeft=null,this._posBottom=null,this._handleIndex=0,this._htmlElement=document.createElement("span"),this._className=(null==e?void 0:e.handle)?e.handle:"abacus__handle",this._htmlElement.classList.add(this._className),void 0===t||Number.isNaN(t)||(this._handleIndex=t,this._htmlElement.setAttribute("data-handle-index",t.toString()))}return Object.defineProperty(e.prototype,"posLeft",{get:function(){return this._posLeft},set:function(e){if(null===e)this._posLeft=e,this._htmlElement.style.left="";else{var t=e;e<0&&(t=0),e>100&&(t=100),this._posLeft=t,this._htmlElement.style.left=t.toString()+"%"}},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"posBottom",{get:function(){return this._posBottom},set:function(e){if(null===e)this._posBottom=e,this._htmlElement.style.bottom="";else{var t=e;e<0&&(t=0),e>100&&(t=100),this._posBottom=t,this._htmlElement.style.bottom=t.toString()+"%"}},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"htmlElement",{get:function(){return this._htmlElement},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"handleIndex",{get:function(){return this._handleIndex},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"className",{get:function(){return this._className},set:function(e){this._htmlElement.classList.remove(this._className),this._htmlElement.classList.add(e),this._className=e},enumerable:!1,configurable:!0}),e}();t.default=s},2796:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){this._isInrange=!1,this._classNameSelected="",this._isSelected=!1,this._posLeft=null,this._posBottom=null,this._htmlElement=document.createElement("span"),this._className=(null==t?void 0:t.mark)?t.mark:"abacus__mark",this._classNameInrange=(null==t?void 0:t.markInrange)?t.markInrange:"abacus__mark_inrange",this._classNameSelected=(null==t?void 0:t.markSelected)?t.markSelected:"abacus__mark_selected",this._htmlElement.classList.add(this._className),this._associatedValue=e,this.associatedValue=e}return Object.defineProperty(e.prototype,"htmlElement",{get:function(){return this._htmlElement},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"className",{get:function(){return this._className},set:function(e){this._className&&this._htmlElement.classList.remove(this._className),e&&this._htmlElement.classList.add(e),this._className=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"classNameInrange",{get:function(){return this._classNameInrange},set:function(e){e&&"string"==typeof e&&(this._htmlElement.classList.contains(this._classNameInrange)&&this._htmlElement.classList.add(e),this._classNameInrange&&this._htmlElement.classList.remove(this._classNameInrange),this._classNameInrange=e)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"classNameSelected",{get:function(){return this._classNameSelected},set:function(e){e&&"string"==typeof e&&(this._htmlElement.classList.contains(this._classNameSelected)&&this._htmlElement.classList.add(e),this._classNameSelected&&this._htmlElement.classList.remove(this._classNameSelected),this._classNameSelected=e)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"posLeft",{get:function(){return this._posLeft},set:function(e){if(null===e)this._posLeft=e,this._htmlElement.style.left="";else{var t=e;e<0&&(t=0),e>100&&(t=100),this._posLeft=t,this._htmlElement.style.left=t.toString()+"%"}},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"posBottom",{get:function(){return this._posBottom},set:function(e){if(null===e)this._posBottom=e,this._htmlElement.style.bottom="";else{var t=e;e<0&&(t=0),e>100&&(t=100),this._posBottom=t,this._htmlElement.style.bottom=t.toString()+"%"}},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"associatedValue",{get:function(){return this._associatedValue},set:function(e){this._associatedValue=e,this._htmlElement.innerText=e.toString(),this._htmlElement.setAttribute("data-associated-value",e.toString())},enumerable:!1,configurable:!0}),e.prototype.isInrange=function(e){return void 0!==e&&this._classNameInrange&&(this._isInrange=!!e,this._isInrange?this._htmlElement.classList.add(this._classNameInrange):this._htmlElement.classList.remove(this._classNameInrange)),this._isInrange},e.prototype.isSelected=function(e){return void 0!==e&&this._classNameSelected&&(this._isSelected=!!e,this._isSelected?this._htmlElement.classList.add(this._classNameSelected):this._htmlElement.classList.remove(this._classNameSelected)),this._isSelected},e}();t.default=s},3289:function(e,t,s){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=a(s(7462)),n=function(){function e(e){this._width=100,this._height=100,this._rangeType=i.default.HIDDEN,this._htmlElement=document.createElement("span"),this._className=(null==e?void 0:e.range)?e.range:"abacus__range",this._htmlElement.classList.add(this._className)}return Object.defineProperty(e.prototype,"width",{get:function(){return this._width},set:function(e){if(null===e)this._width=e,this._htmlElement.style.width="";else{var t=e;e<0&&(t=0),e>100&&(t=100),this._width=t,this._htmlElement.style.width=t.toString()+"%"}},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this._height},set:function(e){if(null===e)this._height=e,this._htmlElement.style.height="";else{var t=e;e<0&&(t=0),e>100&&(t=100),this._height=t,this._htmlElement.style.height=t.toString()+"%"}},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"htmlElement",{get:function(){return this._htmlElement},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"className",{get:function(){return this._className},set:function(e){this._htmlElement.classList.remove(this._className),this._htmlElement.classList.add(e),this._className=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"rangeType",{get:function(){return this._rangeType},set:function(e){"hidden"!==e&&"min"!==e&&"max"!==e&&"between"!==e&&(this._rangeType=i.default.HIDDEN),this._rangeType=e},enumerable:!1,configurable:!0}),e}();t.default=n},7462:(e,t)=>{"use strict";var s;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.HIDDEN="hidden",e.MIN="min",e.MAX="max",e.BETWEEN="between"}(s||(s={})),t.default=s},5558:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){this._tooltipIndex=0,this._isVisible=!1,this._posLeft=null,this._posBottom=null,this._htmlElement=document.createElement("span"),this._className=(null==e?void 0:e.tooltip)?e.tooltip:"abacus__tooltip",this._htmlElement.classList.add(this._className),void 0===t||Number.isNaN(t)||(this._tooltipIndex=t,this._htmlElement.setAttribute("data-handle-index",t.toString()))}return Object.defineProperty(e.prototype,"htmlElement",{get:function(){return this._htmlElement},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"className",{get:function(){return this._className},set:function(e){this._className&&this._htmlElement.classList.remove(this._className),e&&this._htmlElement.classList.add(e),this._className=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"posLeft",{get:function(){return this._posLeft},set:function(e){if(null===e)this._posLeft=e,this._htmlElement.style.left="";else{var t=e;e<0&&(t=0),e>100&&(t=100),this._posLeft=t,this._htmlElement.style.left=t.toString()+"%"}},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"posBottom",{get:function(){return this._posBottom},set:function(e){if(null===e)this._posBottom=e,this._htmlElement.style.bottom="";else{var t=e;e<0&&(t=0),e>100&&(t=100),this._posBottom=t,this._htmlElement.style.bottom=t.toString()+"%"}},enumerable:!1,configurable:!0}),e}();t.default=s},5046:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e){this._width=100,this._htmlElement=document.createElement("div"),this._className=(null==e?void 0:e.abacus)?e.abacus:"abacus",this._classNameDisabled=(null==e?void 0:e.disabled)?e.disabled:"abacus_disabled",this._classNameVertical=(null==e?void 0:e.vertical)?e.vertical:"abacus_vertical"}return Object.defineProperty(e.prototype,"width",{get:function(){return this._width},set:function(e){this._width=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"htmlElement",{get:function(){return this._htmlElement},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"className",{get:function(){return this._className},set:function(e){this._htmlElement.classList.remove(this._className),this._htmlElement.classList.remove("js-"+this._className),this._htmlElement.classList.add(e),this._htmlElement.classList.add("js-"+this._className),this._className=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"classNameDisabled",{get:function(){return this._classNameDisabled},set:function(e){e&&"string"==typeof e&&(this._htmlElement.classList.contains(this._classNameDisabled)&&this._htmlElement.classList.add(e),this._classNameDisabled&&this._htmlElement.classList.remove(this._classNameDisabled),this._classNameDisabled=e)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"classNameVertical",{get:function(){return this._classNameVertical},set:function(e){e&&"string"==typeof e&&(this._htmlElement.classList.contains(this._classNameVertical)&&this._htmlElement.classList.add(e),this._classNameVertical&&this._htmlElement.classList.remove(this._classNameVertical),this._classNameVertical=e)},enumerable:!1,configurable:!0}),e.prototype.isDisabled=function(e){void 0!==e&&this._classNameDisabled&&(e?this._htmlElement.classList.add(this._classNameDisabled):this._htmlElement.classList.remove(this._classNameDisabled))},e.prototype.isVertical=function(e){void 0!==e&&this._classNameVertical&&(e?this._htmlElement.classList.add(this._classNameVertical):this._htmlElement.classList.remove(this._classNameVertical))},e}();t.default=s},2716:(e,t)=>{"use strict";var s;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.HORIZONTAL="horizontal",e.VERTICAL="vertical"}(s||(s={})),t.default=s}},t={};function s(a){if(t[a])return t[a].exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,s),i.exports}s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s(4596)})();
//# sourceMappingURL=abacus.js.map?v=4817df693f232de31748