(()=>{"use strict";var t={3129:(t,e,a)=>{a.r(e)},5613:(t,e,a)=>{Object.defineProperty(e,"__esModule",{value:!0}),a(3129);var s=function(){function t(t,e){this._formInputs=new Map,this._init(t,e)}return t.prototype._init=function(t,e){this._sliderConfig=e,this._$abacusSliderWrapper=t,this._initAbacus(),this._searchDOMElements(),this._updateFormInputs(this._$abacusSlider.abacus("option")),this._bindEventListeners(),this._addEventListeners()},t.prototype._initAbacus=function(){this._$abacusSliderWrapper.abacus(this._sliderConfig),this._$abacusSlider=$(".js-abacus",this._$abacusSliderWrapper).abacus("widget")},t.prototype._searchDOMElements=function(){this._$form=this._$abacusSlider.closest(".js-form");var t=this;$("input, select",this._$form).each((function(){var e=$(this),a=e.attr("name");a&&t._formInputs.set(a,e)}))},t.prototype._bindEventListeners=function(){this._handleAbacusChange=this._handleAbacusChange.bind(this),this._handleFormSubmit=this._handleFormSubmit.bind(this)},t.prototype._addEventListeners=function(){this._$abacusSliderWrapper.on("abacus-change",this._handleAbacusChange),this._$form.on("submit",this._handleFormSubmit)},t.prototype._handleFormSubmit=function(t){t.preventDefault();var e=this._formInputs.get("destroy");if(!1===(null==e?void 0:e.prop("checked")))this._$abacusSlider.abacus("destroy");else{var a=this.parseFormToProperties();this._$abacusSlider[0].jqueryAbacusInstance?this._$abacusSlider.abacus("option",a):(this._$abacusSliderWrapper.abacus(a),this._$abacusSlider=$(".js-abacus",this._$abacusSliderWrapper).abacus("widget"))}return null},t.prototype._handleAbacusChange=function(){this._$abacusSlider[0].jqueryAbacusInstance&&this._updateFormInputs(this._$abacusSlider.abacus("option"))},t.prototype._updateFormInputs=function(t){var e,a,s,i,r,n,o,u,l,p,c,d;null===(e=this._formInputs.get("animate"))||void 0===e||e.val(t.animate.toString()),null===(a=this._formInputs.get("disabled"))||void 0===a||a.prop("checked",!t.disabled),null===(s=this._formInputs.get("max"))||void 0===s||s.val(t.max),null===(i=this._formInputs.get("min"))||void 0===i||i.val(t.min),null===(r=this._formInputs.get("value-first"))||void 0===r||r.val(t.values[0]),void 0!==t.values[1]||null!==t.values[1]?null===(n=this._formInputs.get("value-second"))||void 0===n||n.val(t.values[1]):null===(o=this._formInputs.get("value-second"))||void 0===o||o.val(""),null===(u=this._formInputs.get("orientation"))||void 0===u||u.val(t.orientation),null===(l=this._formInputs.get("range"))||void 0===l||l.val(t.range.toString()),null===(p=this._formInputs.get("scale"))||void 0===p||p.prop("checked",!!t.scale),null===(c=this._formInputs.get("tooltip"))||void 0===c||c.prop("checked",!!t.tooltip),null===(d=this._formInputs.get("step"))||void 0===d||d.val(t.step)},t.prototype.parseFormToProperties=function(){var t={},e=this._formInputs.get("animate");if(e)switch(e.val()){case"false":t.animate=!1;break;case"true":t.animate=!0;break;default:t.animate=e.val()}var a=this._formInputs.get("disabled");a&&(t.disabled=!a.prop("checked"));var s=this._formInputs.get("max");s&&(t.max=parseFloat(s.val()));var i=this._formInputs.get("min");i&&(t.min=parseFloat(i.val())),t.values=[];var r=this._formInputs.get("value-first");(null==r?void 0:r.val())&&(t.values[0]=parseFloat(r.val()));var n=this._formInputs.get("value-second");(null==n?void 0:n.val())&&(t.values[1]=parseFloat(n.val()));var o=this._formInputs.get("orientation");o&&(t.orientation=o.val());var u=this._formInputs.get("range");if(u){var l=u.val();switch(l){case"true":t.range=!0;break;case"false":t.range=!1;break;case"max":t.range="max";break;case"min":t.range="min";break;default:t.range=l}}var p=this._formInputs.get("scale");p&&(t.scale=!!p.prop("checked"));var c=this._formInputs.get("tooltip");c&&(t.tooltip=!!c.prop("checked"));var d=this._formInputs.get("step");return d&&(t.step=parseFloat(d.val())),t},t}();e.default=s},8816:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=[{min:-10,max:9,step:2,values:[-4,6],range:!0,scale:!0,tooltip:!0},{animate:"fast",max:1e3,step:.5,value:500,range:"max"},{min:10,max:100,step:1,range:"min",orientation:"vertical",scale:!0}]},7356:function(t,e,a){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=s(a(5613)),r=s(a(8816));$((function(){for(var t=$(".js-sliders"),e=2;e<=r.default.length;e+=1){var a=$(".js-sliders__item:first",t).clone();t.append(a),$(".js-sliders__number",a).text(e)}$(".js-sliders__item-abacus-wrapper",t).each((function(t){var e=$(this);new i.default(e,r.default[t])}))}))}},e={};function a(s){if(e[s])return e[s].exports;var i=e[s]={exports:{}};return t[s].call(i.exports,i,i.exports,a),i.exports}a.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a(7356)})();
//# sourceMappingURL=demo-page.js.map?v=d211d411d495e9796f52