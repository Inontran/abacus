(()=>{"use strict";var a={129:(a,e,t)=>{t.r(e)},613:function(a,e,t){var r=t(609),n=this&&this.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(e,"__esModule",{value:!0});var i=n(t(609));t(129);var l=function(){function a(a){this._$abacusSlider=a.eq(0),this._$abacusSlider.abacus({min:-10,max:9,step:2,values:[-4,6],range:!0,scale:!0}),this._$form=this._$abacusSlider.closest(".js-card-list__item").find("form"),this._handleAbacusChange(),this._bindEventListeners()}return a.prototype._bindEventListeners=function(){var a=i.default("body");this._handleAbacusChange=this._handleAbacusChange.bind(this),a.on("abacus-change",".js-card-list .js-abacus",this._handleAbacusChange),this._handleFormOptionsSubmit=this._handleFormOptionsSubmit.bind(this),a.on("submit",".js-form_options-modifier",this._handleFormOptionsSubmit)},a.prototype._handleFormOptionsSubmit=function(a){var e,t,r;if(a.preventDefault(),!a.currentTarget)return null;if(!(null===(e=this._$abacusSlider)||void 0===e?void 0:e.length))return null;var n=i.default('[name="destroy"]',this._$form);if(n.length&&!1===n.prop("checked"))this._$abacusSlider.abacus("destroy");else{var l=this.parseFormToProperty();this._$abacusSlider[0].jqueryAbacusInstance?null===(r=this._$abacusSlider)||void 0===r||r.abacus("option",l):null===(t=this._$abacusSlider)||void 0===t||t.abacus(l)}return null},a.prototype._handleAbacusChange=function(){this._$form.length&&this._$abacusSlider[0].jqueryAbacusInstance&&this._parsePropertyToForm(this._$abacusSlider.abacus("option"))},a.prototype._parsePropertyToForm=function(a){var e=this._$form,t=i.default('[name="animate"]',e);if(void 0!==a.animate){var r=a.animate.toString();t.val(r)}else t.val("false");if(i.default('[name="disabled"]',e).prop("checked",!a.disabled),void 0!==a.max&&i.default('[name="max"]',e).val(a.max),void 0!==a.min&&i.default('[name="min"]',e).val(a.min),a.values)for(var n=0;n<2;n+=1){var l=i.default('[name="value[]"]',e).eq(n);void 0!==a.values[n]||null!==a.values[n]?l.val(a.values[n]):l.val("")}if(a.orientation&&i.default('[name="orientation"]',e).val(a.orientation),void 0!==a.range){var s=a.range.toString();i.default('[name="range"]',e).val(s)}i.default('[name="scale"]',e).prop("checked",!!a.scale),i.default('[name="tooltip"]',e).prop("checked",!!a.tooltip),void 0!==a.step&&i.default('[name="step"]',e).val(a.step)},a.prototype.parseFormToProperty=function(){var a={},e=this._$form;if(!(e instanceof r))return a;var t=i.default('[name="animate"]',e);if(t.length)switch(t.val()){case"false":a.animate=!1;break;case"true":a.animate=!0;break;default:a.animate=t.val()}var n=i.default('[name="disabled"]',e);n.length&&(a.disabled=!n.prop("checked"));var l=i.default('[name="max"]',e);l.val()&&(a.max=parseFloat(l.val()));var s=i.default('[name="min"]',e);s.val()&&(a.min=parseFloat(s.val())),a.values=[];for(var o=0;o<2;o+=1){var u=i.default('[name="value[]"]',e).eq(o);u.val()&&(a.values[o]=parseFloat(u.val()))}var d=i.default('[name="orientation"]',e);d.length&&(a.orientation=d.val());var c=i.default('[name="range"]',e);if(c.length){var f=c.val();switch(f){case"true":a.range=!0;break;case"false":a.range=!1;break;case"max":a.range="max";break;case"min":a.range="min";break;default:a.range=f}}var v=i.default('[name="scale"]',e);v.length&&(a.scale=!!v.prop("checked"));var m=i.default('[name="tooltip"]',e);m.length&&(a.tooltip=!!m.prop("checked"));var p=i.default('[name="step"]',e);return p.length&&(a.step=parseFloat(p.val())),a},a}();i.default((function(){for(var a=i.default(".js-card-list"),e=2;e<=3;e+=1){var t=i.default(".js-card-list__item:first",a).clone();a.append(t),i.default(".js-card-list__number",t).text(e)}i.default(".js-abacus",a).each((function(){var a=i.default(this);new l(a)}))}))},609:a=>{a.exports=jQuery}},e={};function t(r){if(e[r])return e[r].exports;var n=e[r]={exports:{}};return a[r].call(n.exports,n,n.exports,t),n.exports}t.r=a=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})},t(613)})();
//# sourceMappingURL=abacus-demo.js.map?v=ecf66b2894e68e13e936