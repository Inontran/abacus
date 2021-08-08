/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/abacus-demo.scss":
/*!*************************************!*\
  !*** ./src/styles/abacus-demo.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scripts/abacus-demo.ts":
/*!************************************!*\
  !*** ./src/scripts/abacus-demo.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "jquery");

/**
 * @fileoverview Файл с примерами использования плагина Abacus.
 */
function parsePropertyToForm(abacusProperty, $form) {
    var $inputAnimate = $('[name="animate"]', $form);
    if (abacusProperty.animate !== undefined) {
        var stringValAnimate = abacusProperty.animate.toString();
        $inputAnimate.val(stringValAnimate);
    }
    else {
        $inputAnimate.val('false');
    }
    $('[name="disabled"]', $form).prop('checked', !abacusProperty.disabled);
    if (abacusProperty.max !== undefined) {
        $('[name="max"]', $form).val(abacusProperty.max);
    }
    if (abacusProperty.min !== undefined) {
        $('[name="min"]', $form).val(abacusProperty.min);
    }
    if (abacusProperty.values) {
        for (var i = 0; i < 2; i += 1) {
            var $inputValue = $('[name="value[]"]', $form).eq(i);
            if (abacusProperty.values[i] !== undefined || abacusProperty.values[i] !== null) {
                $inputValue.val(abacusProperty.values[i]);
            }
            else {
                $inputValue.val('');
            }
        }
    }
    if (abacusProperty.orientation) {
        $('[name="orientation"]', $form).val(abacusProperty.orientation);
    }
    if (abacusProperty.range !== undefined) {
        var stringValRange = abacusProperty.range.toString();
        $('[name="range"]', $form).val(stringValRange);
    }
    $('[name="scale"]', $form).prop('checked', !!abacusProperty.scale);
    $('[name="tooltip"]', $form).prop('checked', !!abacusProperty.tooltip);
    if (abacusProperty.step !== undefined) {
        $('[name="step"]', $form).val(abacusProperty.step);
    }
}
function parseFormToProperty($form) {
    var abacusProperty = {};
    if (!($form instanceof jQuery)) {
        return abacusProperty;
    }
    var $inputAnimate = $('[name="animate"]', $form);
    if ($inputAnimate.length) {
        switch ($inputAnimate.val()) {
            case 'false':
                abacusProperty.animate = false;
                break;
            case 'true':
                abacusProperty.animate = true;
                break;
            default:
                abacusProperty.animate = $inputAnimate.val();
                break;
        }
    }
    var $inputDisabled = $('[name="disabled"]', $form);
    if ($inputDisabled.length) {
        abacusProperty.disabled = !$inputDisabled.prop('checked');
    }
    var $inputMax = $('[name="max"]', $form);
    if ($inputMax.val()) {
        abacusProperty.max = $inputMax.val();
    }
    var $inputMin = $('[name="min"]', $form);
    if ($inputMin.val()) {
        abacusProperty.min = $inputMin.val();
    }
    abacusProperty.values = [];
    for (var i = 0; i < 2; i += 1) {
        var $inputValue = $('[name="value[]"]', $form).eq(i);
        if ($inputValue.val()) {
            abacusProperty.values[i] = $inputValue.val();
        }
    }
    var $inputOrientation = $('[name="orientation"]', $form);
    if ($inputOrientation.length) {
        abacusProperty.orientation = $inputOrientation.val();
    }
    var $inputRange = $('[name="range"]', $form);
    if ($inputRange.length) {
        var valRange = $inputRange.val();
        switch (valRange) {
            case 'true':
                abacusProperty.range = true;
                break;
            case 'false':
                abacusProperty.range = false;
                break;
            case 'max':
                abacusProperty.range = 'max';
                break;
            case 'min':
                abacusProperty.range = 'min';
                break;
            default:
                abacusProperty.range = valRange;
                break;
        }
    }
    var $inputScale = $('[name="scale"]', $form);
    if ($inputScale.length) {
        abacusProperty.scale = !!$inputScale.prop('checked');
    }
    var $inputTooltip = $('[name="tooltip"]', $form);
    if ($inputTooltip.length) {
        abacusProperty.tooltip = !!$inputTooltip.prop('checked');
    }
    var $inputStep = $('[name="step"]', $form);
    if ($inputStep.length) {
        abacusProperty.step = $inputStep.val();
    }
    return abacusProperty;
}
$(function () {
    var $body = $('body');
    var $cardList = $('.js-card-list');
    for (var i = 2; i <= 3; i += 1) {
        var $cloneCard = $('.js-card-list__item:first', $cardList).clone();
        $cardList.append($cloneCard);
        $('.js-card-list__number', $cloneCard).text(i);
    }
    var $abacus = $('.js-abacus', $cardList);
    $abacus.abacus({
        min: -10,
        max: 9,
        step: 2,
        values: [-4, 6],
        range: true,
        scale: true,
    });
    $body.on('abacus-change', '.js-card-list .js-abacus', function (event) {
        var $abacusItem = $(event.currentTarget);
        var $form = $abacusItem.closest('.js-card-list__item').find('form');
        if ($form.length && $abacusItem[0].jqueryAbacusInstance) {
            parsePropertyToForm($abacusItem.abacus('option'), $form);
        }
    });
    $abacus.each(function () {
        var $abacusItem = $(this);
        var $form = $abacusItem.closest('.js-card-list__item').find('form');
        if ($form.length && $abacusItem[0].jqueryAbacusInstance) {
            parsePropertyToForm($abacusItem.abacus('option'), $form);
        }
    });
    $body.on('submit', '.js-form_modifier-options', function (event) {
        event.preventDefault();
        if (!event.currentTarget) {
            return null;
        }
        var $form = $(event.currentTarget);
        var abacusOptions = parseFormToProperty($form);
        var $abacusItem = $form.closest('.js-card-list__item').find('.abacus');
        $abacusItem === null || $abacusItem === void 0 ? void 0 : $abacusItem.abacus('option', abacusOptions);
        return null;
    });
});
// let a: number | undefined = Math.random();
// if( a < 0.5 ){
//   a = undefined;
// }
// let b = 0;
// const isNotEmpty = (a: number | undefined): a is number => a !== undefined;
// if(isNotEmpty(a)){
// // if( a !== undefined ){
//   b += a;
// }


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/scripts/abacus-demo.ts");
/******/ 	__webpack_require__("./src/styles/abacus-demo.scss");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=abacus-demo.js.map?v=14056417501dae2deb4a