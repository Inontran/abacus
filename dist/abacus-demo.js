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
$(function () {
    $('#abacus-1').on('abacus-change', function () {
        // console.log('abacus-change');
    });
    $('#abacus-1').on('abacus-create', function () {
        // console.log('abacus-create');
    });
    $('#abacus-1').on('abacus-slide', function () {
        // console.log('abacus-slide');
    });
    $('#abacus-1').on('abacus-start', function () {
        // console.log('abacus-start');
    });
    $('#abacus-1').on('abacus-stop', function () {
        // console.log('abacus-stop');
    });
    var $abacus = $('#abacus-1').abacus({
        min: -10,
        max: 9,
        step: 2,
        value: 0,
        range: true,
        markup: true,
        change: function (event, ui) {
            // console.log('change');
        },
        create: function (event, ui) {
            // console.log('create');
            // console.log( event );
        },
        slide: function (event, ui) {
            // console.log('slide');
            // console.log( ui );
        },
        start: function (event, ui) {
            // console.log('start');
            // console.log( ui );
        },
        stop: function (event, ui) {
            // console.log('stop');
            // console.log( ui );
        },
    });
    setTimeout(function () {
        // $abacus.abacus('option', {
        //   classes: {
        //     handle: 'qwe'
        //   },
        // } as AbacusOptions);
    }, 5000);
    $('body').on('abacus-change', '.abacus', function (event) {
        var _a;
        var $abacus = $(event === null || event === void 0 ? void 0 : event.currentTarget);
        var value = (_a = $abacus.abacus('value')) === null || _a === void 0 ? void 0 : _a.toString();
        var $inputTarget = $abacus.closest('.card').find('input[name="value[]"]:first');
        $inputTarget.val(value);
    });
    $('body .abacus').each(function () {
        var $abacusItem = $(this);
        var $form = $abacusItem.closest('.card').find('form');
        if ($form.length && $abacusItem[0].jqueryAbacusInstance) {
            parsePropertyToForm($abacusItem.abacus('option'), $form);
        }
    });
    $('body').on('submit', '.form_modifier-options', function (event) {
        event.preventDefault();
        if (!event.currentTarget) {
            return null;
        }
        var $form = $(event.currentTarget);
        var abacusOptions = parseFormToProperty($form);
        $abacus === null || $abacus === void 0 ? void 0 : $abacus.abacus('option', abacusOptions);
    });
});
function parsePropertyToForm(abacusProperty, $form) {
    if (abacusProperty.animate !== undefined) {
        var stringValAnimate = abacusProperty.animate.toString();
        $('[name="animate"]', $form).val(stringValAnimate);
    }
    else {
        $('[name="animate"]', $form).val('false');
    }
    $('[name="disabled"]', $form).prop('checked', !abacusProperty.disabled);
    if (abacusProperty.max !== undefined) {
        $('[name="max"]', $form).val(abacusProperty.max);
    }
    if (abacusProperty.min !== undefined) {
        $('[name="min"]', $form).val(abacusProperty.min);
    }
    if (abacusProperty.value !== undefined) {
        $('[name="value[]"]:first', $form).val(abacusProperty.value);
    }
    if (abacusProperty.orientation) {
        $('[name="orientation"]', $form).val(abacusProperty.orientation);
    }
    if (abacusProperty.range !== undefined) {
        var stringValRange = abacusProperty.range.toString();
        $('[name="range"]', $form).val(stringValRange);
    }
    $('[name="markup"]', $form).prop('checked', !!abacusProperty.markup);
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
    var inputAnimate = $('[name="animate"]', $form);
    if (inputAnimate.length) {
        switch (inputAnimate.val()) {
            case 'false':
                abacusProperty.animate = false;
                break;
            case 'true':
                abacusProperty.animate = true;
                break;
            default:
                abacusProperty.animate = inputAnimate.val();
                break;
        }
    }
    if ($('[name="disabled"]', $form).length) {
        abacusProperty.disabled = !$('[name="disabled"]', $form).prop('checked');
    }
    if ($('[name="max"]', $form).val()) {
        abacusProperty.max = $('[name="max"]', $form).val();
    }
    if ($('[name="min"]', $form).val()) {
        abacusProperty.min = $('[name="min"]', $form).val();
    }
    if ($('[name="value[]"]', $form).val()) {
        abacusProperty.value = $('[name="value[]"]', $form).val();
    }
    if ($('[name="orientation"]', $form).length) {
        abacusProperty.orientation = $('[name="orientation"]', $form).val();
    }
    if ($('[name="range"]', $form).length) {
        var valRange = $('[name="range"]', $form).val();
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
    if ($('[name="markup"]', $form).length) {
        abacusProperty.markup = !!$('[name="markup"]', $form).prop('checked');
    }
    if ($('[name="tooltip"]', $form).length) {
        abacusProperty.tooltip = !!$('[name="tooltip"]', $form).prop('checked');
    }
    if ($('[name="step"]', $form).length) {
        abacusProperty.step = $('[name="step"]', $form).val();
    }
    return abacusProperty;
}


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
//# sourceMappingURL=abacus-demo.js.map?v=941055774bdc3f3ddc3e