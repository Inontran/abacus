(()=>{"use strict";var a={609:a=>{a.exports=jQuery}},e={};function n(r){if(e[r])return e[r].exports;var t=e[r]={exports:{}};return a[r](t,t.exports,n),t.exports}(()=>{var a=n(609),e=n(609);function r(e,n){var r=a('[name="animate"]',n);if(void 0!==e.animate){var t=e.animate.toString();r.val(t)}else r.val("false");if(a('[name="disabled"]',n).prop("checked",!e.disabled),void 0!==e.max&&a('[name="max"]',n).val(e.max),void 0!==e.min&&a('[name="min"]',n).val(e.min),e.values)for(var s=0;s<2;s+=1){var l=a('[name="value[]"]',n).eq(s);void 0!==e.values[s]||null!==e.values[s]?l.val(e.values[s]):l.val("")}if(e.orientation&&a('[name="orientation"]',n).val(e.orientation),void 0!==e.range){var i=e.range.toString();a('[name="range"]',n).val(i)}a('[name="scale"]',n).prop("checked",!!e.scale),a('[name="tooltip"]',n).prop("checked",!!e.tooltip),void 0!==e.step&&a('[name="step"]',n).val(e.step)}a((function(){for(var n=a("body"),t=a(".js-card-list"),s=2;s<=3;s+=1){var l=a(".js-card-list__item:first",t).clone();t.append(l),a(".js-card-list__number",l).text(s)}var i=a(".js-abacus",t);i.abacus({min:-10,max:9,step:2,values:[-4,6],range:!0,scale:!0}),n.on("abacus-change",".js-card-list .js-abacus",(function(e){var n=a(e.currentTarget),t=n.closest(".js-card-list__item").find("form");t.length&&n[0].jqueryAbacusInstance&&r(n.abacus("option"),t)})),i.each((function(){var e=a(this),n=e.closest(".js-card-list__item").find("form");n.length&&e[0].jqueryAbacusInstance&&r(e.abacus("option"),n)})),n.on("submit",".js-form_modifier-options",(function(n){if(n.preventDefault(),!n.currentTarget)return null;var r=a(n.currentTarget),t=r.closest(".js-card-list__item").find(".js-abacus");if(null==t?void 0:t.length){var s=a('[name="destroy"]',r);if(s.length&&!1===s.prop("checked"))t.abacus("destroy");else{var l=function(n){var r={};if(!(n instanceof e))return r;var t=a('[name="animate"]',n);if(t.length)switch(t.val()){case"false":r.animate=!1;break;case"true":r.animate=!0;break;default:r.animate=t.val()}var s=a('[name="disabled"]',n);s.length&&(r.disabled=!s.prop("checked"));var l=a('[name="max"]',n);l.val()&&(r.max=parseFloat(l.val()));var i=a('[name="min"]',n);i.val()&&(r.min=parseFloat(i.val())),r.values=[];for(var o=0;o<2;o+=1){var c=a('[name="value[]"]',n).eq(o);c.val()&&(r.values[o]=parseFloat(c.val()))}var v=a('[name="orientation"]',n);v.length&&(r.orientation=v.val());var u=a('[name="range"]',n);if(u.length){var m=u.val();switch(m){case"true":r.range=!0;break;case"false":r.range=!1;break;case"max":r.range="max";break;case"min":r.range="min";break;default:r.range=m}}var p=a('[name="scale"]',n);p.length&&(r.scale=!!p.prop("checked"));var d=a('[name="tooltip"]',n);d.length&&(r.tooltip=!!d.prop("checked"));var f=a('[name="step"]',n);return f.length&&(r.step=parseFloat(f.val())),r}(r);t[0].jqueryAbacusInstance?null==t||t.abacus("option",l):null==t||t.abacus(l)}return null}}))}))})()})();
//# sourceMappingURL=abacus-demo.js.map?v=5d1874e37fe8235bb7e4