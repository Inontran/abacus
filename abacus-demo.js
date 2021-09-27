(()=>{"use strict";var e={708:(e,a,r)=>{r.r(a)},613:function(e,a,r){var t=r(609),n=this&&this.__createBinding||(Object.create?function(e,a,r,t){void 0===t&&(t=r),Object.defineProperty(e,t,{enumerable:!0,get:function(){return a[r]}})}:function(e,a,r,t){void 0===t&&(t=r),e[t]=a[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,a){Object.defineProperty(e,"default",{enumerable:!0,value:a})}:function(e,a){e.default=a}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var a={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(a,e,r);return o(a,e),a};Object.defineProperty(a,"__esModule",{value:!0}),r(708);var l=i(r(539));t(new function(){for(var e=t("body"),a=t(".js-card-list"),r=2;r<=3;r+=1){var n=t(".js-card-list__item:first",a).clone();a.append(n),t(".js-card-list__number",n).text(r)}var o=t(".js-abacus",a);o.abacus({min:-10,max:9,step:2,values:[-4,6],range:!0,scale:!0}),e.on("abacus-change",".js-card-list .js-abacus",l.handleAbacusChange),o.each((function(){var e=t(this),a=e.closest(".js-card-list__item").find("form");a.length&&e[0].jqueryAbacusInstance&&l.parsePropertyToForm(e.abacus("option"),a)})),e.on("submit",".js-form_options-modifier",l.handleFormOptionsSubmit)})},539:(e,a,r)=>{var t=r(609),n=r(609);function o(e,a){var r=t('[name="animate"]',a);if(void 0!==e.animate){var n=e.animate.toString();r.val(n)}else r.val("false");if(t('[name="disabled"]',a).prop("checked",!e.disabled),void 0!==e.max&&t('[name="max"]',a).val(e.max),void 0!==e.min&&t('[name="min"]',a).val(e.min),e.values)for(var o=0;o<2;o+=1){var i=t('[name="value[]"]',a).eq(o);void 0!==e.values[o]||null!==e.values[o]?i.val(e.values[o]):i.val("")}if(e.orientation&&t('[name="orientation"]',a).val(e.orientation),void 0!==e.range){var l=e.range.toString();t('[name="range"]',a).val(l)}t('[name="scale"]',a).prop("checked",!!e.scale),t('[name="tooltip"]',a).prop("checked",!!e.tooltip),void 0!==e.step&&t('[name="step"]',a).val(e.step)}function i(e){var a={};if(!(e instanceof n))return a;var r=t('[name="animate"]',e);if(r.length)switch(r.val()){case"false":a.animate=!1;break;case"true":a.animate=!0;break;default:a.animate=r.val()}var o=t('[name="disabled"]',e);o.length&&(a.disabled=!o.prop("checked"));var i=t('[name="max"]',e);i.val()&&(a.max=parseFloat(i.val()));var l=t('[name="min"]',e);l.val()&&(a.min=parseFloat(l.val())),a.values=[];for(var s=0;s<2;s+=1){var u=t('[name="value[]"]',e).eq(s);u.val()&&(a.values[s]=parseFloat(u.val()))}var c=t('[name="orientation"]',e);c.length&&(a.orientation=c.val());var v=t('[name="range"]',e);if(v.length){var m=v.val();switch(m){case"true":a.range=!0;break;case"false":a.range=!1;break;case"max":a.range="max";break;case"min":a.range="min";break;default:a.range=m}}var d=t('[name="scale"]',e);d.length&&(a.scale=!!d.prop("checked"));var p=t('[name="tooltip"]',e);p.length&&(a.tooltip=!!p.prop("checked"));var f=t('[name="step"]',e);return f.length&&(a.step=parseFloat(f.val())),a}Object.defineProperty(a,"__esModule",{value:!0}),a.handleFormOptionsSubmit=a.handleAbacusChange=a.parseFormToProperty=a.parsePropertyToForm=void 0,a.parsePropertyToForm=o,a.parseFormToProperty=i,a.handleAbacusChange=function(e){var a=t(e.currentTarget),r=a.closest(".js-card-list__item").find("form");r.length&&a[0].jqueryAbacusInstance&&o(a.abacus("option"),r)},a.handleFormOptionsSubmit=function(e){if(e.preventDefault(),!e.currentTarget)return null;var a=t(e.currentTarget),r=a.closest(".js-card-list__item").find(".js-abacus");if(!(null==r?void 0:r.length))return null;var n=t('[name="destroy"]',a);if(n.length&&!1===n.prop("checked"))r.abacus("destroy");else{var o=i(a);r[0].jqueryAbacusInstance?null==r||r.abacus("option",o):null==r||r.abacus(o)}return null}},609:e=>{e.exports=jQuery}},a={};function r(t){if(a[t])return a[t].exports;var n=a[t]={exports:{}};return e[t].call(n.exports,n,n.exports,r),n.exports}r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(613)})();
//# sourceMappingURL=abacus-demo.js.map?v=f53bb3648ca40a19f5c2