/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@ungap/event-target/cjs/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@ungap/event-target/cjs/index.js ***!
  \*******************************************************/
/***/ ((module) => {

/*! (c) Andrea Giammarchi - ISC */
var self = {};
try {
  self.EventTarget = (new EventTarget).constructor;
} catch(EventTarget) {
  (function (Object, wm) {
    var create = Object.create;
    var defineProperty = Object.defineProperty;
    var proto = EventTarget.prototype;
    define(proto, 'addEventListener', function (type, listener, options) {
      for (var
        secret = wm.get(this),
        listeners = secret[type] || (secret[type] = []),
        i = 0, length = listeners.length; i < length; i++
      ) {
        if (listeners[i].listener === listener)
          return;
      }
      listeners.push({target: this, listener: listener, options: options});
    });
    define(proto, 'dispatchEvent', function (event) {
      var secret = wm.get(this);
      var listeners = secret[event.type];
      if (listeners) {
        define(event, 'target', this);
        define(event, 'currentTarget', this);
        listeners.slice(0).forEach(dispatch, event);
        delete event.currentTarget;
        delete event.target;
      }
      return true;
    });
    define(proto, 'removeEventListener', function (type, listener) {
      for (var
        secret = wm.get(this),
        /* istanbul ignore next */
        listeners = secret[type] || (secret[type] = []),
        i = 0, length = listeners.length; i < length; i++
      ) {
        if (listeners[i].listener === listener) {
          listeners.splice(i, 1);
          return;
        }
      }
    });
    self.EventTarget = EventTarget;
    function EventTarget() {'use strict';
      wm.set(this, create(null));
    }
    function define(target, name, value) {
      defineProperty(
        target,
        name,
        {
          configurable: true,
          writable: true,
          value: value
        }
      );
    }
    function dispatch(info) {
      var options = info.options;
      if (options && options.once)
        info.target.removeEventListener(this.type, info.listener);
      if (typeof info.listener === 'function')
        info.listener.call(info.target, this);
      else
        info.listener.handleEvent(this);
    }
  }(Object, new WeakMap));
}
module.exports = self.EventTarget;


/***/ }),

/***/ "./src/styles/abacus.scss":
/*!********************************!*\
  !*** ./src/styles/abacus.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scripts/AbacusOrientationType.ts":
/*!**********************************************!*\
  !*** ./src/scripts/AbacusOrientationType.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var AbacusOrientationType;
(function (AbacusOrientationType) {
    AbacusOrientationType["HORIZONTAL"] = "horizontal";
    AbacusOrientationType["VERTICAL"] = "vertical";
})(AbacusOrientationType || (AbacusOrientationType = {}));
exports.default = AbacusOrientationType;


/***/ }),

/***/ "./src/scripts/Handle/Handle.ts":
/*!**************************************!*\
  !*** ./src/scripts/Handle/Handle.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Класс "Handle" является оберткой для HTML-элемента бегунка.
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
var Handle = /** @class */ (function () {
    /**
     * @constructor
     * @this   {Handle}
     * @param  {AbacusClasses} classes Объект с названиями классов.
     * @example new Handle({
     *  handle: 'abacus__handle'
     * });
     */
    function Handle(classes, handleIndex) {
        /**
         * Позиция бегунка в процентах от 0 до 100 по горизонтали от левого края.
         * @type {number}
         * @private
         */
        this._posLeft = null;
        /**
         * Позиция бегунка в процентах от 0 до 100 по вертикали от нижнего края.
         * @type {number}
         * @private
         */
        this._posBottom = null;
        /**
         * Номер (индекс) бегунка. Может принимать значение 0 или 1.
         * @type {number}
         * @private
         */
        this._handleIndex = 0;
        this._htmlElement = document.createElement('span');
        this._className = (classes === null || classes === void 0 ? void 0 : classes.handle) ? classes.handle : 'abacus__handle';
        this._htmlElement.classList.add(this._className);
        if (handleIndex !== undefined && !Number.isNaN(handleIndex)) {
            this._handleIndex = handleIndex;
        }
    }
    Object.defineProperty(Handle.prototype, "posLeft", {
        /**
         * Геттер позиции бегунка в процентах от левого края.
         * @returns {number} Позиция бегунка в процентах от 0 до 100.
         */
        get: function () {
            return this._posLeft;
        },
        /**
         * Сеттер позиции бегунка в процентах от левого края.
         * @param {number | null} left Позиция бегунка в процентах от 0 до 100.
         * Или null, если координты по горизонтиле быть не должно.
         */
        set: function (left) {
            if (left === null) {
                this._posLeft = left;
                this._htmlElement.style.left = '';
            }
            else {
                var newLeft = left;
                if (left < 0)
                    newLeft = 0;
                if (left > 100)
                    newLeft = 100;
                this._posLeft = newLeft;
                this._htmlElement.style.left = newLeft.toString() + "%";
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Handle.prototype, "posBottom", {
        /**
         * Геттер позиции бегунка в процентах от нижнего края.
         * @returns {number | null} Позиция бегунка в процентах от 0 до 100.
         */
        get: function () {
            return this._posBottom;
        },
        /**
         * Сеттер позиции бегунка в процентах от нижнего края.
         * @param {number | null} bottom Позиция бегунка в процентах от 0 до 100.
         * Или null, если координты по вертикале быть не должно.
         */
        set: function (bottom) {
            if (bottom === null) {
                this._posBottom = bottom;
                this._htmlElement.style.bottom = '';
            }
            else {
                var newBottom = bottom;
                if (bottom < 0)
                    newBottom = 0;
                if (bottom > 100)
                    newBottom = 100;
                this._posBottom = newBottom;
                this._htmlElement.style.bottom = newBottom.toString() + "%";
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Handle.prototype, "htmlElement", {
        /**
         * Геттер ссылки на HTML-элемент.
         */
        get: function () {
            return this._htmlElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Handle.prototype, "handleIndex", {
        /**
         * Геттер номера (индекса) бегунка.
         */
        get: function () {
            return this._handleIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Handle.prototype, "className", {
        /**
         * Геттер названия класса HTML-элемента.
         */
        get: function () {
            return this._className;
        },
        /**
         * Сеттер названия класса HTML-элемента. Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
         * @param {string} value Название класса.
         */
        set: function (value) {
            this._htmlElement.classList.remove(this._className);
            this._htmlElement.classList.add(value);
            this._className = value;
        },
        enumerable: false,
        configurable: true
    });
    return Handle;
}());
exports.default = Handle;


/***/ }),

/***/ "./src/scripts/Mark/Mark.ts":
/*!**********************************!*\
  !*** ./src/scripts/Mark/Mark.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Класс "Mark" является оберткой для HTML-элемента метки шкалы значений слайдера.
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
var Mark = /** @class */ (function () {
    /**
     * @constructor
     * @this   {Mark}
     * @param  {AbacusClasses} classes Объект с названиями классов.
     * @example new Mark({
     *  mark: 'abacus__mark',
     *  markInrange: 'abacus__mark_inrange',
     *  markSelected: 'abacus__mark_selected'
     * });
     */
    function Mark(associatedValue, classes) {
        /**
         * Если параметр равен "true", то это значит, что метка находится в диапозоне.
         * @type {boolean}
         * @private
         */
        this._isInrange = false;
        /**
         * Название класса HTML-элемента метки, которая соответствует текущему значению слайдера.
         * @type {string}
         * @private
         */
        this._classNameSelected = '';
        /**
         * Если параметр равен "true", то это значит, что метка соответствует текущему значению слайдера.
         * @type {boolean}
         * @private
         */
        this._isSelected = false;
        /**
         * Позиция метки в процентах от 0 до 100 по горизонтали от левого края.
         * @type {number | null}
         * @private
         */
        this._posLeft = null;
        /**
         * Позиция метки в процентах от 0 до 100 по вертикали от нижнего края.
         * @type {number | null}
         * @private
         */
        this._posBottom = null;
        this._htmlElement = document.createElement('span');
        this._className = (classes === null || classes === void 0 ? void 0 : classes.mark) ? classes.mark : 'abacus__mark';
        this._classNameInrange = (classes === null || classes === void 0 ? void 0 : classes.markInrange) ? classes.markInrange : 'abacus__mark_inrange';
        this._classNameSelected = (classes === null || classes === void 0 ? void 0 : classes.markSelected) ? classes.markSelected : 'abacus__mark_selected';
        this._htmlElement.classList.add(this._className);
        this._associatedValue = associatedValue;
        this._htmlElement.innerText = associatedValue.toString();
    }
    Object.defineProperty(Mark.prototype, "htmlElement", {
        /**
         * Геттер ссылки на HTML-элемент.
         */
        get: function () {
            return this._htmlElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mark.prototype, "className", {
        /**
         * Геттер названия класса HTML-элемента.
         */
        get: function () {
            return this._className;
        },
        /**
         * Сеттер названия класса HTML-элемента. Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
         * @param {string} name Название класса.
         */
        set: function (name) {
            if (this._className) {
                this._htmlElement.classList.remove(this._className);
            }
            if (name) {
                this._htmlElement.classList.add(name);
            }
            this._className = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mark.prototype, "classNameInrange", {
        /**
         * Геттер названия класса HTML-элемента метки, которая находится в диапозоне.
         */
        get: function () {
            return this._classNameInrange;
        },
        /**
         * Сеттер названия класса HTML-элемента метки, которая находится в диапозоне.
         * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
         * @param {string} name Название класса.
         */
        set: function (name) {
            if (!name || typeof name !== 'string') {
                return;
            }
            if (this._htmlElement.classList.contains(this._classNameInrange)) {
                this._htmlElement.classList.add(name);
            }
            if (this._classNameInrange) {
                this._htmlElement.classList.remove(this._classNameInrange);
            }
            this._classNameInrange = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mark.prototype, "classNameSelected", {
        /**
         * Геттер названия класса HTML-элемента метки, которая соответствует текущему значению слайдера.
         */
        get: function () {
            return this._classNameSelected;
        },
        /**
         * Сеттер названия класса HTML-элемента метки, которая соответствует текущему значению слайдера.
         * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
         * @param {string} name Название класса.
         */
        set: function (name) {
            if (!name || typeof name !== 'string') {
                return;
            }
            if (this._htmlElement.classList.contains(this._classNameSelected)) {
                this._htmlElement.classList.add(name);
            }
            if (this._classNameSelected) {
                this._htmlElement.classList.remove(this._classNameSelected);
            }
            this._classNameSelected = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mark.prototype, "posLeft", {
        /**
         * Геттер позиции метки в процентах от левого края.
         * @returns {number | null} Позиция метки в процентах от 0 до 100.
         * Или null, если координты по вертикале быть не должно.
         */
        get: function () {
            return this._posLeft;
        },
        /**
         * Сеттер позиции метки в процентах от левого края.
         * @param {number | null} left Позиция метки в процентах от 0 до 100.
         */
        set: function (left) {
            if (left === null) {
                this._posLeft = left;
                this._htmlElement.style.left = '';
            }
            else {
                var newLeft = left;
                if (left < 0)
                    newLeft = 0;
                if (left > 100)
                    newLeft = 100;
                this._posLeft = newLeft;
                this._htmlElement.style.left = newLeft.toString() + "%";
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mark.prototype, "posBottom", {
        /**
         * Геттер позиции метки в процентах от нижнего края.
         * @returns {number | null} Позиция метки в процентах от 0 до 100.
         */
        get: function () {
            return this._posBottom;
        },
        /**
         * Сеттер позиции метки в процентах от нижнего края.
         * @param {number | null} bottom Позиция метки в процентах от 0 до 100.
         * Или null, если координты по вертикале быть не должно.
         */
        set: function (bottom) {
            if (bottom === null) {
                this._posBottom = bottom;
                this._htmlElement.style.bottom = '';
            }
            else {
                var newBottom = bottom;
                if (bottom < 0)
                    newBottom = 0;
                if (bottom > 100)
                    newBottom = 100;
                this._posBottom = newBottom;
                this._htmlElement.style.bottom = newBottom.toString() + "%";
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mark.prototype, "associatedValue", {
        /**
         * Геттер значения, ассоциированное с этом меткой.
         * @returns {number} Значение, связанное с этой меткой.
         */
        get: function () {
            return this._associatedValue;
        },
        /**
         * Сеттер значения, ассоциированное с этом меткой.
         * @param {number} bottom Позиция метки в процентах от 0 до 100.
         * Или null, если координты по вертикале быть не должно.
         */
        set: function (value) {
            this._associatedValue = value;
            this._htmlElement.innerText = value.toString();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Функция получения и установки состояния "в диапозоне".
     * Если функция получила параметр false, то у метки удалаяется класс,
     * записанный в _classNameInrange.
     * Если функция получила параметр true, то метке добавляется класс,
     * записанный в _classNameInrange.
     * @param {boolean} value Если передать "true", то добавляется класс, иначе удалается класс.
     * Если ничего не передать, то возвращается текущее состояние.
     * @returns {boolean} Текущее состояние метки, а именно, в диапозоне она находится или нет.
     */
    Mark.prototype.isInrange = function (value) {
        if (value !== undefined && this._classNameInrange) {
            this._isInrange = !!value;
            if (this._isInrange) {
                this._htmlElement.classList.add(this._classNameInrange);
            }
            else {
                this._htmlElement.classList.remove(this._classNameInrange);
            }
        }
        return this._isInrange;
    };
    /**
     * Функция получения и установки состояния "выбранная".
     * Это значит, что напротив этой метки установлена одна из ручек слайдера.
     * Если функция получила параметр false, то у метки удалаяется класс,
     * записанный в _classNameSelected.
     * Если функция получила параметр true, то метке добавляется класс,
     * записанный в _classNameSelected.
     * @param {boolean} value Если передать "true", то добавляется класс, иначе удалается класс.
     * Если ничего не передать, то возвращается текущее состояние.
     * @returns {boolean} Текущее состояние метки.
     */
    Mark.prototype.isSelected = function (value) {
        if (value !== undefined && this._classNameSelected) {
            this._isSelected = !!value;
            if (this._isSelected) {
                this._htmlElement.classList.add(this._classNameSelected);
            }
            else {
                this._htmlElement.classList.remove(this._classNameSelected);
            }
        }
        return this._isSelected;
    };
    return Mark;
}());
exports.default = Mark;


/***/ }),

/***/ "./src/scripts/Model/Model.ts":
/*!************************************!*\
  !*** ./src/scripts/Model/Model.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var event_target_1 = __importDefault(__webpack_require__(/*! @ungap/event-target */ "./node_modules/@ungap/event-target/cjs/index.js"));
var AbacusOrientationType_1 = __importDefault(__webpack_require__(/*! ../AbacusOrientationType */ "./src/scripts/AbacusOrientationType.ts"));
/**
 * Класс Model реализует "Модель" паттерна проектирования MVP.
 * В этом классе хранится данные слайдера, а также бизнес логика работы с этими данными.
 */
var Model = /** @class */ (function () {
    /**
     * @this Model
     * @param {AbacusOptions} data Свойства слайдера.
     */
    function Model(data) {
        /**
         * Свойства слайдера.
         * @private
         */
        this._abacusProperty = {
            animate: false,
            classes: {
                abacus: 'abacus',
                vertical: 'abacus_vertical',
                disabled: 'abacus_disabled',
                handle: 'abacus__handle',
                range: 'abacus__range',
                mark: 'abacus__mark',
                markSelected: 'abacus__mark_selected',
                markInrange: 'abacus__mark_inrange',
                tooltip: 'abacus__tooltip',
                tooltipVisible: 'abacus__tooltip_visible',
            },
            disabled: false,
            max: 100,
            min: 0,
            orientation: AbacusOrientationType_1.default.HORIZONTAL,
            range: false,
            scale: false,
            step: 1,
            tooltip: false,
            value: 0,
            values: [0],
        };
        if (data) {
            this.setAbacusProperty(data);
        }
        this._eventTarget = new event_target_1.default();
        this._eventUpdateModel = new CustomEvent('update-model');
    }
    Object.defineProperty(Model.prototype, "abacusProperty", {
        /**
         * Геттер свойств слайдера.
         * @returns {AbacusProperty} Свойства слайдера, хранящиеся в Модели.
         */
        get: function () {
            return this._abacusProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param {AbacusOptions} abacusProperty Свойства слайдера, которые нужно добавить в Модель.
     */
    Model.prototype.setAbacusProperty = function (newAbacusProperty) {
        var _a, _b, _c, _d, _e;
        var abacusProperty = newAbacusProperty;
        // animate
        if (abacusProperty.animate !== undefined) {
            var isAnimatePropFastOrSlow = abacusProperty.animate === 'fast' || abacusProperty.animate === 'slow';
            var isAnimatePropBoolean = typeof abacusProperty.animate === 'boolean';
            var isAnimatePropResult = isAnimatePropFastOrSlow || isAnimatePropBoolean;
            if (isAnimatePropResult) {
                this._abacusProperty.animate = abacusProperty.animate;
            }
            else if (typeof abacusProperty.animate === 'number') {
                this._abacusProperty.animate = abacusProperty.animate;
            }
            else if (typeof abacusProperty.animate === 'string') {
                this._abacusProperty.animate = parseInt(abacusProperty.animate, 10);
            }
            else {
                this._abacusProperty.animate = false;
            }
        }
        // classes
        if (typeof abacusProperty.classes === 'object') {
            if (!this._abacusProperty.classes) {
                this._abacusProperty.classes = {};
            }
            if (typeof abacusProperty.classes.abacus === 'string' && abacusProperty.classes.abacus) {
                this._abacusProperty.classes.abacus = abacusProperty.classes.abacus;
            }
            if (typeof abacusProperty.classes.disabled === 'string' && abacusProperty.classes.disabled) {
                this._abacusProperty.classes.disabled = abacusProperty.classes.disabled;
            }
            if (typeof abacusProperty.classes.range === 'string' && abacusProperty.classes.range) {
                this._abacusProperty.classes.range = abacusProperty.classes.range;
            }
            if (typeof abacusProperty.classes.handle === 'string' && abacusProperty.classes.handle) {
                this._abacusProperty.classes.handle = abacusProperty.classes.handle;
            }
            if (typeof abacusProperty.classes.mark === 'string' && abacusProperty.classes.mark) {
                this._abacusProperty.classes.mark = abacusProperty.classes.mark;
            }
            if (typeof abacusProperty.classes.markSelected === 'string' && abacusProperty.classes.markSelected) {
                this._abacusProperty.classes.markSelected = abacusProperty.classes.markSelected;
            }
            if (typeof abacusProperty.classes.markInrange === 'string' && abacusProperty.classes.markInrange) {
                this._abacusProperty.classes.markInrange = abacusProperty.classes.markInrange;
            }
            if (typeof abacusProperty.classes.tooltip === 'string' && abacusProperty.classes.tooltip) {
                this._abacusProperty.classes.tooltip = abacusProperty.classes.tooltip;
            }
            if (typeof abacusProperty.classes.tooltipVisible === 'string' && abacusProperty.classes.tooltipVisible) {
                this._abacusProperty.classes.tooltipVisible = abacusProperty.classes.tooltipVisible;
            }
        }
        // disabled
        if (abacusProperty.disabled !== undefined) {
            this._abacusProperty.disabled = !!abacusProperty.disabled;
        }
        // max
        if (abacusProperty.max !== undefined && abacusProperty.max !== null) {
            if (!Number.isNaN(abacusProperty.max)) {
                if (typeof abacusProperty.max === 'string') {
                    this._abacusProperty.max = parseFloat(abacusProperty.max);
                }
                else {
                    this._abacusProperty.max = abacusProperty.max;
                }
            }
        }
        // scale
        if (abacusProperty.scale !== undefined) {
            this._abacusProperty.scale = !!abacusProperty.scale;
        }
        // min
        if (abacusProperty.min !== undefined && abacusProperty.min !== null) {
            if (!Number.isNaN(abacusProperty.min)) {
                if (typeof abacusProperty.min === 'string') {
                    this._abacusProperty.min = parseFloat(abacusProperty.min);
                }
                else {
                    this._abacusProperty.min = abacusProperty.min;
                }
            }
        }
        if (this._abacusProperty.max < this._abacusProperty.min) {
            var tmpMax = this._abacusProperty.max;
            this._abacusProperty.max = this._abacusProperty.min;
            this._abacusProperty.min = tmpMax;
        }
        // step
        if (abacusProperty.step !== undefined && abacusProperty.step !== null) {
            if (!Number.isNaN(abacusProperty.step)) {
                if (typeof abacusProperty.step === 'string') {
                    this._abacusProperty.step = parseFloat(abacusProperty.step);
                }
                else {
                    this._abacusProperty.step = abacusProperty.step;
                }
            }
        }
        // tooltip
        if (abacusProperty.tooltip !== undefined) {
            this._abacusProperty.tooltip = !!abacusProperty.tooltip;
        }
        // range
        if (abacusProperty.range !== undefined) {
            if (abacusProperty.range === false || abacusProperty.range === true) {
                this._abacusProperty.range = abacusProperty.range;
            }
            else if (abacusProperty.range === 'max') {
                this._abacusProperty.range = 'max';
            }
            else if (abacusProperty.range === 'min') {
                this._abacusProperty.range = 'min';
            }
        }
        // value
        if (abacusProperty.value !== undefined && abacusProperty.value !== null) {
            if (!Number.isNaN(abacusProperty.value)) {
                if (typeof abacusProperty.value === 'string') {
                    abacusProperty.value = parseFloat(abacusProperty.value);
                }
                abacusProperty.value = this.roundValuePerStep(abacusProperty.value);
                this._abacusProperty.value = abacusProperty.value;
                if (!((_a = this._abacusProperty.values) === null || _a === void 0 ? void 0 : _a.length)) {
                    this._abacusProperty.values = [];
                }
                this._abacusProperty.values[0] = abacusProperty.value;
            }
        }
        // values
        if ((_b = abacusProperty.values) === null || _b === void 0 ? void 0 : _b.length) {
            this._abacusProperty.values = [];
            for (var i = 0; i < abacusProperty.values.length; i += 1) {
                if (typeof abacusProperty.values[i] === 'string') {
                    abacusProperty.values[i] = parseFloat(abacusProperty.values[i].toString());
                }
                abacusProperty.values[i] = this.roundValuePerStep(abacusProperty.values[i]);
                this._abacusProperty.values[i] = abacusProperty.values[i];
                if (i === 0) {
                    this._abacusProperty.value = abacusProperty.values[i];
                }
                if (i > 1)
                    break;
            }
            this._abacusProperty.values.sort(function (a, b) {
                if (a > b)
                    return 1;
                if (a === b)
                    return 0;
                return -1;
            });
        }
        if (this._abacusProperty.range === true) {
            if (!((_c = this._abacusProperty.values) === null || _c === void 0 ? void 0 : _c.length)) {
                this._abacusProperty.values = [];
                this._abacusProperty.values[0] = this._abacusProperty.min ? this._abacusProperty.min : 0;
                this._abacusProperty.values[1] = this._abacusProperty.max ? this._abacusProperty.max : 100;
            }
            else if (((_d = this._abacusProperty.values) === null || _d === void 0 ? void 0 : _d.length) === 1) {
                this._abacusProperty.values[1] = this._abacusProperty.max ? this._abacusProperty.max : 100;
            }
        }
        else {
            this._abacusProperty.values = (_e = this._abacusProperty.values) === null || _e === void 0 ? void 0 : _e.slice(0, 1);
        }
        // orientation
        if (abacusProperty.orientation !== undefined) {
            if (abacusProperty.orientation === 'vertical' || abacusProperty.orientation === AbacusOrientationType_1.default.VERTICAL) {
                this._abacusProperty.orientation = AbacusOrientationType_1.default.VERTICAL;
            }
            else {
                this._abacusProperty.orientation = AbacusOrientationType_1.default.HORIZONTAL;
            }
        }
        // change
        if (abacusProperty.change !== undefined) {
            this._abacusProperty.change = abacusProperty.change;
        }
        // create
        if (abacusProperty.create !== undefined) {
            this._abacusProperty.create = abacusProperty.create;
        }
        // slide
        if (abacusProperty.slide !== undefined) {
            this._abacusProperty.slide = abacusProperty.slide;
        }
        // start
        if (abacusProperty.start !== undefined) {
            this._abacusProperty.start = abacusProperty.start;
        }
        // stop
        if (abacusProperty.stop !== undefined) {
            this._abacusProperty.stop = abacusProperty.stop;
        }
        if (this._eventTarget) {
            this._eventTarget.dispatchEvent(this._eventUpdateModel);
        }
    };
    Object.defineProperty(Model.prototype, "value", {
        /**
         * Сеттер текущего значения слайдера.
         * @param {number} value Текущее значение слайдера.
         */
        set: function (value) {
            var _a;
            this._abacusProperty.value = this.roundValuePerStep(value);
            if (!((_a = this._abacusProperty.values) === null || _a === void 0 ? void 0 : _a.length)) {
                this._abacusProperty.values = [];
            }
            this._abacusProperty.values[0] = this._abacusProperty.value;
            if (this._eventTarget) {
                this._eventTarget.dispatchEvent(this._eventUpdateModel);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "eventTarget", {
        /**
         * Геттер объекта, который может генерировать события и может иметь подписчиков на эти события.
         */
        get: function () {
            return this._eventTarget;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Функция, округляющее переданное значение до ближайшего шага.
     * @param {number} value Текущее значение слайдера.
     * @returns {number} Значение слайдера, округленное до ближайшего шага.
     */
    Model.prototype.roundValuePerStep = function (value) {
        var result = value;
        var minVal = this._abacusProperty.min;
        var maxVal = this._abacusProperty.max;
        var step = this._abacusProperty.step;
        if (value >= maxVal) {
            return maxVal;
        }
        if (value <= minVal) {
            return minVal;
        }
        for (var valByStep = minVal; valByStep < maxVal; valByStep += step) {
            if (value > valByStep && value < valByStep + step) {
                if (valByStep + step > maxVal) {
                    result = maxVal;
                    break;
                }
                var prevVal = valByStep;
                var positivePrevVal = prevVal < 0 ? prevVal * -1 : prevVal; // берем предыдущее значение по модулю
                var nextVal = valByStep + step;
                var positiveNextVal = nextVal < 0 ? nextVal * -1 : nextVal; // берем следующее значение по модулю
                var positiveValue = value < 0 ? value * -1 : value; // берем переданное значение по модулю
                var deltaPrevValue = void 0;
                var deltaNextValue = void 0;
                if (value < 0) {
                    deltaPrevValue = positivePrevVal - positiveValue;
                    deltaNextValue = positiveValue - positiveNextVal;
                }
                else {
                    deltaPrevValue = positiveValue - positivePrevVal;
                    deltaNextValue = positiveNextVal - positiveValue;
                }
                if (deltaPrevValue < deltaNextValue) {
                    result = prevVal;
                }
                else {
                    result = nextVal;
                }
                break;
            }
        }
        result = Model.round(result, step);
        return result;
    };
    /**
     * Функция получения количества знаков после запятой.
     * @param {number} x Число, у которого надо узнать количество знаков после запятой.
     * @returns {number} Количество знаков после запятой.
     */
    Model.countNumAfterPoint = function (x) {
        var xStr = x.toString();
        return ("" + xStr).indexOf('.') >= 0 ? ("" + xStr).split('.')[1].length : 0;
    };
    /**
     * Функция окргуления числа до того количества знаков после запятой, сколько этих знаков у числа fractionalNum.
     * @param {number} value Число, которое надо округлить.
     * @param {number} fractionalNum Число, у которого надо узнать количество знаков после запятой.
     * @returns {number} Округленное число.
     */
    Model.round = function (value, fractionalNum) {
        var numbersAfterPoint = Model.countNumAfterPoint(fractionalNum);
        var roundedValue = value;
        if (numbersAfterPoint > 0) {
            roundedValue = parseFloat(value.toFixed(numbersAfterPoint));
        }
        else {
            roundedValue = Math.round(value);
        }
        return roundedValue;
    };
    return Model;
}());
exports.default = Model;


/***/ }),

/***/ "./src/scripts/Presenter/Presenter.ts":
/*!********************************************!*\
  !*** ./src/scripts/Presenter/Presenter.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var event_target_1 = __importDefault(__webpack_require__(/*! @ungap/event-target */ "./node_modules/@ungap/event-target/cjs/index.js"));
var Model_1 = __importDefault(__webpack_require__(/*! ../Model/Model */ "./src/scripts/Model/Model.ts"));
/**
 * Класс Presenter реализует "Представителя" паттерна проектирования MVP.
 * Соответственно, он отвечает за передачу данных от Вида к Модели и обратно.
 */
var Presenter = /** @class */ (function () {
    /**
     * @this Presenter
     * @param {AbacusOptions} options Свойства слайдера. Например, минимальное, максимальное и текущее значения.
     */
    function Presenter(options) {
        this._model = new Model_1.default(options);
        this._eventTarget = new event_target_1.default();
        this._eventUpdateModel = new CustomEvent('update-model');
        this._bindEventListeners();
    }
    /**
     * Функция получения свойств слайдера, полученные из Модели.
     * @returns {AbacusProperty} Свойства слайдера, полученные из Модели.
     */
    Presenter.prototype.getModelAbacusProperty = function () {
        return this._model.abacusProperty;
    };
    /**
     * Функция установки свойств слайдера.
     */
    Presenter.prototype.setModelAbacusProperty = function (abacusProperty) {
        this._model.setAbacusProperty(abacusProperty);
    };
    /**
     * Установка обработчиков событий.
     * @private
     */
    Presenter.prototype._bindEventListeners = function () {
        this._model.eventTarget.addEventListener('update-model', this._updateModelHandler.bind(this));
    };
    /**
     * Обработчик обновления модели.
     * @private
     * @param {Event} event Объект события.
     */
    Presenter.prototype._updateModelHandler = function () {
        this._eventTarget.dispatchEvent(this._eventUpdateModel);
    };
    Object.defineProperty(Presenter.prototype, "eventTarget", {
        /**
         * Геттер объекта, который может генерировать события и может иметь подписчиков на эти события.
         */
        get: function () {
            return this._eventTarget;
        },
        enumerable: false,
        configurable: true
    });
    return Presenter;
}());
exports.default = Presenter;


/***/ }),

/***/ "./src/scripts/Range/Range.ts":
/*!************************************!*\
  !*** ./src/scripts/Range/Range.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var RangeType;
(function (RangeType) {
    RangeType["HIDDEN"] = "hidden";
    RangeType["MIN"] = "min";
    RangeType["MAX"] = "max";
    RangeType["BETWEEN"] = "between";
})(RangeType || (RangeType = {}));
/**
 * Класс "Range" является оберткой для HTML-элемента индикатора (progress bar).
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
var Range = /** @class */ (function () {
    /**
     * @constructor
     * @this   {Range}
     * @param  {AbacusClasses} classes Объект с названиями классов.
     * @example new Handle({
     *  range: 'abacus__range'
     * });
     */
    function Range(classes) {
        /**
         * Ширина HTML-элемента от 0 до 100 в процентах.
         * @type {number | null}
         * @private
         */
        this._width = 100;
        /**
         * Ширина HTML-элемента от 0 до 100 в процентах.
         * @type {number | null }
         * @private
         */
        this._height = 100;
        /**
         *
         * @param className
         */
        this._rangeType = RangeType.HIDDEN;
        this._htmlElement = document.createElement('span');
        this._className = (classes === null || classes === void 0 ? void 0 : classes.range) ? classes.range : 'abacus__range';
        this._htmlElement.classList.add(this._className);
    }
    Object.defineProperty(Range.prototype, "width", {
        /**
         * Геттер ширины HTML-элемента (_htmlElement).
         */
        get: function () {
            return this._width;
        },
        /**
         * Сеттер ширины HTML-элемента (_htmlElement).
         * @param {number | null} width ширина в процентах от 0 до 100.
         */
        set: function (width) {
            if (width === null) {
                this._width = width;
                this._htmlElement.style.width = '';
            }
            else {
                var newWidth = width;
                if (width < 0)
                    newWidth = 0;
                if (width > 100)
                    newWidth = 100;
                this._width = newWidth;
                this._htmlElement.style.width = newWidth.toString() + "%";
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "height", {
        /**
         * Геттер высоты HTML-элемента (_htmlElement).
         */
        get: function () {
            return this._height;
        },
        /**
         * Сеттер высоты HTML-элемента (_htmlElement).
         * @param {number | null} height высота в процентах от 0 до 100.
         */
        set: function (height) {
            if (height === null) {
                this._height = height;
                this._htmlElement.style.height = '';
            }
            else {
                var newHeight = height;
                if (height < 0)
                    newHeight = 0;
                if (height > 100)
                    newHeight = 100;
                this._height = newHeight;
                this._htmlElement.style.height = newHeight.toString() + "%";
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "htmlElement", {
        /**
         * Геттер ссылки на HTML-элемент.
         */
        get: function () {
            return this._htmlElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "className", {
        /**
         * Геттер названия класса HTML-элемента.
         */
        get: function () {
            return this._className;
        },
        /**
         * Сеттер названия класса HTML-элемента. Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
         * @param {string} value Название класса.
         */
        set: function (value) {
            this._htmlElement.classList.remove(this._className);
            this._htmlElement.classList.add(value);
            this._className = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "rangeType", {
        /**
         * Получение типа диапозона слайдера.
         */
        get: function () {
            return this._rangeType;
        },
        /**
         * Установка типа диапозона слайдера.
         */
        set: function (value) {
            var isValueEqualRangeType = value !== 'hidden' && value !== 'min' && value !== 'max' && value !== 'between';
            if (isValueEqualRangeType) {
                this._rangeType = RangeType.HIDDEN;
            }
            this._rangeType = value;
        },
        enumerable: false,
        configurable: true
    });
    return Range;
}());
exports.default = Range;


/***/ }),

/***/ "./src/scripts/Tooltip/Tooltip.ts":
/*!****************************************!*\
  !*** ./src/scripts/Tooltip/Tooltip.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Класс "Tooltip" является оберткой для HTML-элемента подсказки со значением ручки слайдера.
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
var Tooltip = /** @class */ (function () {
    /**
     * @constructor
     * @this   {Tooltip}
     * @param  {AbacusClasses} classes Объект с названиями классов.
     * @example new Tooltip({
     *  tooltip: 'abacus__tooltip',
     *  tooltipVisible: 'abacus__tooltip_visible'
     * });
     */
    function Tooltip(classes, tooltipIndex) {
        /**
         * Номер (индекс) подсказки. Может принимать значение 0 или 1.
         * @type {number}
         * @private
         */
        this._tooltipIndex = 0;
        /**
         * Если параметр равен "true", то это значит, что подсказка отображается.
         * @type {boolean}
         * @private
         */
        this._isVisible = false;
        /**
         * Позиция подсказки в процентах от 0 до 100 по горизонтали от левого края.
         * @type {number}
         * @private
         */
        this._posLeft = null;
        /**
          * Позиция подсказки в процентах от 0 до 100 по вертикали от нижнего края.
          * @type {number}
          * @private
          */
        this._posBottom = null;
        this._htmlElement = document.createElement('span');
        this._className = (classes === null || classes === void 0 ? void 0 : classes.tooltip) ? classes.tooltip : 'abacus__tooltip';
        this._classNameVisible = (classes === null || classes === void 0 ? void 0 : classes.tooltipVisible) ? classes.tooltipVisible : 'abacus__tooltip_visible';
        this._htmlElement.classList.add(this._className);
        if (tooltipIndex !== undefined && !Number.isNaN(tooltipIndex)) {
            this._tooltipIndex = tooltipIndex;
        }
    }
    Object.defineProperty(Tooltip.prototype, "htmlElement", {
        /**
         * Геттер ссылки на HTML-элемент.
         */
        get: function () {
            return this._htmlElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "className", {
        /**
         * Геттер названия класса HTML-элемента.
         */
        get: function () {
            return this._className;
        },
        /**
         * Сеттер названия класса HTML-элемента. Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
         * @param {string} name Название класса.
         */
        set: function (name) {
            if (this._className) {
                this._htmlElement.classList.remove(this._className);
            }
            if (name) {
                this._htmlElement.classList.add(name);
            }
            this._className = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "classNameVisible", {
        /**
         * Геттер названия класса HTML-элемента метки, которая находится в диапозоне.
         */
        get: function () {
            return this._classNameVisible;
        },
        /**
         * Сеттер названия класса HTML-элемента метки, которая находится в диапозоне.
         * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
         * @param {string} name Название класса.
         */
        set: function (name) {
            if (!name || typeof name !== 'string') {
                return;
            }
            if (this._htmlElement.classList.contains(this._classNameVisible)) {
                this._htmlElement.classList.add(name);
            }
            if (this._classNameVisible) {
                this._htmlElement.classList.remove(this._classNameVisible);
            }
            this._classNameVisible = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "posLeft", {
        /**
         * Геттер позиции подсказки в процентах от левого края.
         * @returns {number} Позиция подсказки в процентах от 0 до 100.
         */
        get: function () {
            return this._posLeft;
        },
        /**
         * Сеттер позиции подсказки в процентах от левого края.
         * @param {number | null} left Позиция подсказки в процентах от 0 до 100.
         * Или null, если координты по горизонтиле быть не должно.
         */
        set: function (left) {
            if (left === null) {
                this._posLeft = left;
                this._htmlElement.style.left = '';
            }
            else {
                var newLeft = left;
                if (left < 0)
                    newLeft = 0;
                if (left > 100)
                    newLeft = 100;
                this._posLeft = newLeft;
                this._htmlElement.style.left = newLeft.toString() + "%";
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "posBottom", {
        /**
         * Геттер позиции подсказки в процентах от нижнего края.
         * @returns {number | null} Позиция подсказки в процентах от 0 до 100.
         */
        get: function () {
            return this._posBottom;
        },
        /**
         * Сеттер позиции подсказки в процентах от нижнего края.
         * @param {number | null} bottom Позиция подсказки в процентах от 0 до 100.
         * Или null, если координты по вертикале быть не должно.
         */
        set: function (bottom) {
            if (bottom === null) {
                this._posBottom = bottom;
                this._htmlElement.style.bottom = '';
            }
            else {
                var newBottom = bottom;
                if (bottom < 0)
                    newBottom = 0;
                if (bottom > 100)
                    newBottom = 100;
                this._posBottom = newBottom;
                this._htmlElement.style.bottom = newBottom.toString() + "%";
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Функция получения и установки состояния видимости подсказки.
     * Если функция получила параметр false, то у метки удалаяется класс,
     * записанный в _classNameVisible.
     * Если функция получила параметр true, то метке добавляется класс,
     * записанный в _classNameVisible.
     * @param {boolean} value Если передать "true", то добавляется класс, иначе удалается класс.
     * Если ничего не передать, то возвращается текущее состояние.
     * @returns {boolean} Текущее состояние метки, а именно, в диапозоне она находится или нет.
     */
    Tooltip.prototype.isVisible = function (value) {
        if (value !== undefined && this._classNameVisible) {
            this._isVisible = !!value;
            if (this._isVisible) {
                this._htmlElement.classList.add(this._classNameVisible);
            }
            else {
                this._htmlElement.classList.remove(this._classNameVisible);
            }
        }
        return this._isVisible;
    };
    return Tooltip;
}());
exports.default = Tooltip;


/***/ }),

/***/ "./src/scripts/View/View.ts":
/*!**********************************!*\
  !*** ./src/scripts/View/View.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Presenter_1 = __importDefault(__webpack_require__(/*! ../Presenter/Presenter */ "./src/scripts/Presenter/Presenter.ts"));
var WidgetContainer_1 = __importDefault(__webpack_require__(/*! ../WidgetContainer/WidgetContainer */ "./src/scripts/WidgetContainer/WidgetContainer.ts"));
var Handle_1 = __importDefault(__webpack_require__(/*! ../Handle/Handle */ "./src/scripts/Handle/Handle.ts"));
var Range_1 = __importDefault(__webpack_require__(/*! ../Range/Range */ "./src/scripts/Range/Range.ts"));
var Mark_1 = __importDefault(__webpack_require__(/*! ../Mark/Mark */ "./src/scripts/Mark/Mark.ts"));
var Tooltip_1 = __importDefault(__webpack_require__(/*! ../Tooltip/Tooltip */ "./src/scripts/Tooltip/Tooltip.ts"));
var AbacusOrientationType_1 = __importDefault(__webpack_require__(/*! ../AbacusOrientationType */ "./src/scripts/AbacusOrientationType.ts"));
/**
 * Класс View реализует "Представление" или "Вид" паттерна проектирования MVP.
 * Соответственно, он отвечает за отрисовку интерфейса плагина, получение данных от пользователя и отображение данных,
 * находящихся в Модели.
 */
var View = /** @class */ (function () {
    /**
     * @constructor
     * @this   {View}
     * @param  {HTMLAbacusElement} abacusHtmlContainer HTML-элемент,
     * в котором будет находиться инициализированный плагин.
     * @param  {AbacusOptions} options Параметры настройки плагина.
     */
    function View(abacusHtmlContainer, options) {
        /**
         * Массив, в котором содержатся объекты ручек (Handle) слайдера.
         * @type {Handle[]}
         * @private
         */
        this._handles = [];
        /**
         * Массив, в котором содержатся объекты подсказок (Tooltip) слайдера.
         * @type {Tooltip[]}
         * @private
         */
        this._tooltips = [];
        /**
         * Включен или выключен слайдер. Если равен false, то включен.
         * @type {boolean}
         * @private
         */
        this._isDisabled = false;
        /**
         * Перемещается ли бегунок в данный момент с помощью мыши.
         * @type {boolean}
         * @private
         */
        this._isDragHandle = false;
        /**
         * Таймер перемещения мыши или пальца на экране.
         * @type {null | NodeJS.Timeout}
         * @private
         */
        this._handleMovingTimer = null;
        /**
         * Коллекция меток разметки слайдера.
         */
        this._collectionMarks = new Set();
        /**
         * Если значение равно "true", то значит слайдер находиться в вертикальном состоянии.
         */
        this._isVertical = false;
        this._presenter = new Presenter_1.default(options);
        var abacusProperty = this._presenter.getModelAbacusProperty();
        this._widgetContainer = new WidgetContainer_1.default(abacusHtmlContainer, abacusProperty.classes);
        this._widgetContainer.htmlElement.innerHTML = '';
        this._range = new Range_1.default(abacusProperty.classes);
        this._tooltips[0] = new Tooltip_1.default(abacusProperty.classes, 0);
        this._customEventChange = new CustomEvent('abacus-change', {
            bubbles: true,
            cancelable: true,
        });
        this._customEventCreate = new CustomEvent('abacus-create', {
            bubbles: true,
            cancelable: true,
        });
        this._customEventSlide = new CustomEvent('abacus-slide', {
            bubbles: true,
            cancelable: true,
        });
        this._customEventStart = new CustomEvent('abacus-start', {
            bubbles: true,
            cancelable: true,
        });
        this._customEventStop = new CustomEvent('abacus-stop', {
            bubbles: true,
            cancelable: true,
        });
        this.updateView();
        this._bindEventListeners();
        this._eventCreateWrapper();
    }
    /**
     * Функция, которая получает на входе координату клика по оси Х относительно окна браузера,
     * а возвращает количество процентов от начала (левого края) слайдера.
     * @param {number} coordXY Координата клика по оси Х относительно окна браузера.
     * @returns {number} Количество процентов от начала (левого края) слайдера.
     */
    View.prototype.getPosPercent = function (coordXY) {
        var result = 0;
        if (this._isVertical) {
            var posTopWidget = this._widgetContainer.htmlElement.getBoundingClientRect().top;
            var heigthWidget = this._widgetContainer.htmlElement.getBoundingClientRect().height;
            var topPx = coordXY - posTopWidget;
            result = (topPx / heigthWidget) * 100;
            result = 100 - result;
        }
        else {
            var posLeftWidget = this._widgetContainer.htmlElement.getBoundingClientRect().left;
            var widthWidget = this._widgetContainer.htmlElement.getBoundingClientRect().width;
            var leftPx = coordXY - posLeftWidget;
            result = (leftPx / widthWidget) * 100;
        }
        if (result < 0) {
            result = 0;
        }
        if (result > 100) {
            result = 100;
        }
        return result;
    };
    /**
     * Функция, которая получает на вход процент от начала слайдера,
     * а возвращает соответствующее значение кратно заданному шагу.
     * @deprecated
     * @param {number} percent Позиция бегунка в процентах от начала слайдера.
     * @returns {number} Значение, соответствующее проценту и кратно шагу.
     */
    View.prototype.getPosPerStep = function (percent) {
        var result = 0;
        var options = this._presenter.getModelAbacusProperty();
        var minVal = options.min;
        var maxVal = options.max;
        var step = options.step;
        var sizeStepPercent = (step / (maxVal - minVal)) * 100;
        result = percent / sizeStepPercent;
        result = Math.round(result);
        result *= sizeStepPercent;
        return result;
    };
    /**
     * Функция, которая вычисляет позицию бегунка в процентах от начала слайдера.
     * @param {number} value Значение слайдера.
     * @returns {number} Позиция бегунка в процентах от начала слайдера.
     */
    View.prototype.getPosFromValue = function (value) {
        var result = 0;
        var options = this._presenter.getModelAbacusProperty();
        var minVal = options.min;
        var maxVal = options.max;
        var valueAbacus = value;
        // если минимальное значение меньше ноля, то
        // "сдвигаем" переданное значение (value) и максимальное значение (maxVal)
        // на минимальное значение (minVal) по модулю
        if (minVal < 0) {
            maxVal += (minVal * -1);
            valueAbacus += (minVal * -1);
        }
        result = (valueAbacus / maxVal) * 100;
        if (result < 0) {
            return 0;
        }
        if (result > 100) {
            return 100;
        }
        return result;
    };
    /**
     * Функция, которая получает на вход процент от начала слайдера,
     * а возвращает соответствующее значение.
     * @param {number} posPercent Позиция бегунка в процентах от начала слайдера.
     * @returns {number} Значение слайдера.
     */
    View.prototype.getValFromPosPercent = function (posPercent) {
        var abacusValue = 0;
        var options = this._presenter.getModelAbacusProperty();
        var minVal = options.min;
        var maxVal = options.max;
        // если минимальное значение меньше ноля, то
        // "сдвигаем" переданное значение (value) и максимальное значение (maxVal)
        // на минимальное значение (minVal) по модулю
        if (minVal < 0) {
            maxVal += (minVal * -1);
        }
        abacusValue = (maxVal * posPercent) / 100;
        abacusValue -= (minVal * -1);
        return abacusValue;
    };
    /**
     * Функция получения и установки свойств слайдера.
     * @param {string} optionName Название свойства, значение которого надо получить или изменить.
     * @param {any} propValue Значение свойства.
     * @returns {AbacusProperty | number | string | number[] | boolean | AbacusClasses | undefined}
     */
    View.prototype.option = function (optionName, propValue) {
        if (typeof optionName === 'string') {
            switch (optionName) {
                case 'animate':
                case 'classes':
                case 'disabled':
                case 'max':
                case 'scale':
                case 'min':
                case 'orientation':
                case 'range':
                case 'step':
                case 'tooltip':
                case 'value':
                case 'values':
                    if (propValue !== undefined) {
                        // это условие для установки конкретного свойства слайдера
                        var newProperty = {};
                        newProperty[optionName] = propValue;
                        this._presenter.setModelAbacusProperty(newProperty);
                    }
                    else {
                        // это условие для получения конкретного свойства слайдера
                        return this._presenter.getModelAbacusProperty()[optionName];
                    }
                    break;
                default:
                    break;
            }
        }
        else if (typeof propValue === 'object') {
            // это условие для установки одного или несколько свойств слайдера в виде объекта
            this._presenter.setModelAbacusProperty(propValue);
        }
        else {
            // это условие для получения всех свойств слайдера в виде объекта
            return this._presenter.getModelAbacusProperty();
        }
        return undefined;
    };
    /**
     * Функция обновления Вида плагина (в том числе пользовательского интерфейса).
     */
    View.prototype.updateView = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var abacusProperty = this._presenter.getModelAbacusProperty();
        var hasRangeChanged = ((_a = this._cachedAbacusProperty) === null || _a === void 0 ? void 0 : _a.range) !== abacusProperty.range;
        var hasOrientationChanged = ((_b = this._cachedAbacusProperty) === null || _b === void 0 ? void 0 : _b.orientation) !== abacusProperty.orientation;
        var hasTooltipChanged = ((_c = this._cachedAbacusProperty) === null || _c === void 0 ? void 0 : _c.tooltip) !== abacusProperty.tooltip;
        var hasAnimateChanged = ((_d = this._cachedAbacusProperty) === null || _d === void 0 ? void 0 : _d.animate) !== abacusProperty.animate;
        var hasMaxChanged = ((_e = this._cachedAbacusProperty) === null || _e === void 0 ? void 0 : _e.max) !== abacusProperty.max;
        var hasMinChanged = ((_f = this._cachedAbacusProperty) === null || _f === void 0 ? void 0 : _f.min) !== abacusProperty.min;
        var hasValuesChanged = !View.arrayCompare((_g = this._cachedAbacusProperty) === null || _g === void 0 ? void 0 : _g.values, abacusProperty.values);
        var hasDisabledChanged = ((_h = this._cachedAbacusProperty) === null || _h === void 0 ? void 0 : _h.disabled) !== abacusProperty.disabled;
        var hasScaleChanged = ((_j = this._cachedAbacusProperty) === null || _j === void 0 ? void 0 : _j.scale) !== abacusProperty.scale;
        var hasStepChanged = ((_k = this._cachedAbacusProperty) === null || _k === void 0 ? void 0 : _k.step) !== abacusProperty.step;
        if (hasRangeChanged) {
            this._createViewHandles(abacusProperty);
            this._createViewRange(abacusProperty);
        }
        if (hasOrientationChanged) {
            if (abacusProperty.orientation === AbacusOrientationType_1.default.VERTICAL) {
                this._isVertical = true;
                this._widgetContainer.isVertical(true);
            }
            else {
                this._isVertical = false;
                this._widgetContainer.isVertical(false);
            }
        }
        var resultTooltipRangeChanged = hasTooltipChanged || hasRangeChanged;
        if (resultTooltipRangeChanged) {
            this._createViewTooltips(abacusProperty);
            this._updateViewTooltips(abacusProperty);
            this._setTransition();
        }
        if (hasAnimateChanged) {
            this._setTransition();
        }
        // Обновляем положение бегунка и индикатора
        var resultRangeMaxMinOrientationValuesChanged = hasRangeChanged
            || hasMaxChanged
            || hasMinChanged
            || hasOrientationChanged
            || hasValuesChanged;
        if (resultRangeMaxMinOrientationValuesChanged) {
            this._updateViewHandles(abacusProperty);
            this._updateViewTooltips(abacusProperty);
            this._updateViewRange(abacusProperty);
            this._highlightMarks();
        }
        if (hasValuesChanged) {
            this._findMovedHandle();
            this._eventChangeWrapper();
        }
        // Обновляем названия классов
        if (abacusProperty.classes) {
            this._updateClassNames(abacusProperty.classes);
        }
        // Включаем или отключаем слайдер
        if (hasDisabledChanged) {
            this.toggleDisable(abacusProperty.disabled);
        }
        // Создаем шкалу значений
        var resultScaleStepMaxMinOrientationChanged = hasScaleChanged
            || hasStepChanged
            || hasMaxChanged
            || hasMinChanged
            || hasOrientationChanged;
        if (resultScaleStepMaxMinOrientationChanged) {
            if (abacusProperty.scale) {
                this._createScale();
                this._setTransition();
            }
            else {
                this._removeScale();
            }
            this._highlightMarks();
        }
        this._cachedAbacusProperty = View.getCloneAbacusProperty(abacusProperty);
    };
    /**
     * Функция создания или удаления ручек слайдера.
     * @private
     * @param {AbacusProperty} abacusProperty Свойства плагина.
     */
    View.prototype._createViewHandles = function (abacusProperty) {
        var _a;
        var viewInstance = this;
        var handleIndexes = []; // массив с индексами ручек слайдера.
        if (!((_a = viewInstance._handles) === null || _a === void 0 ? void 0 : _a.length)) {
            viewInstance._handles = [];
            viewInstance._handles[0] = new Handle_1.default(abacusProperty.classes, 0);
            var _b = __read(viewInstance._handles, 1), firstHandle_1 = _b[0];
            viewInstance._widgetContainer.htmlElement.append(firstHandle_1.htmlElement);
            viewInstance._currentHandle = firstHandle_1;
            handleIndexes.push(0);
        }
        var _c = __read(viewInstance._handles, 1), firstHandle = _c[0];
        switch (abacusProperty.range) {
            case true:
                viewInstance._handles[1] = new Handle_1.default(abacusProperty.classes, 1);
                viewInstance._widgetContainer.htmlElement.append(viewInstance._handles[1].htmlElement);
                handleIndexes.push(1);
                break;
            case 'max':
            case 'min':
            default:
                if (viewInstance._handles[1]) {
                    viewInstance._handles[1].htmlElement.remove();
                    viewInstance._handles = viewInstance._handles.slice(0, 1);
                }
                viewInstance._currentHandle = firstHandle;
                break;
        }
        var _loop_1 = function (i) {
            var handleIndex = handleIndexes[i];
            viewInstance._handles[handleIndex].htmlElement.addEventListener('mousedown', 
            // viewInstance._handlerHandleItemClickStart.bind(viewInstance)
            function (event) {
                event.preventDefault();
                if (viewInstance._isDisabled) {
                    return;
                }
                viewInstance._isDragHandle = true;
                viewInstance._currentHandle = viewInstance._handles[handleIndex];
                viewInstance._eventStartWrapper(event);
            });
            viewInstance._handles[handleIndex].htmlElement.addEventListener('touchstart', 
            // viewInstance._handlerHandleItemClickStart.bind(viewInstance),
            function (event) {
                event.preventDefault();
                if (viewInstance._isDisabled) {
                    return;
                }
                viewInstance._isDragHandle = true;
                viewInstance._currentHandle = viewInstance._handles[handleIndex];
                viewInstance._eventStartWrapper(event);
            }, { passive: true });
        };
        for (var i = 0; i < handleIndexes.length; i += 1) {
            _loop_1(i);
        }
    };
    /**
     * Функция обновления ручек слайдера, а именно их местоположение.
     * @private
     * @param {AbacusProperty} abacusProperty Свойства плагина.
     */
    View.prototype._updateViewHandles = function (abacusProperty) {
        if (!abacusProperty.values) {
            return;
        }
        for (var i = 0; i < abacusProperty.values.length; i += 1) {
            var currentValue = abacusProperty.values[i];
            var posHandle = this.getPosFromValue(currentValue);
            if (this._handles[i]) {
                if (this._isVertical) {
                    this._handles[i].posLeft = null;
                    this._handles[i].posBottom = posHandle;
                }
                else {
                    this._handles[i].posBottom = null;
                    this._handles[i].posLeft = posHandle;
                }
            }
        }
    };
    /**
     * Функция создания или удаления подсказок слайдера.
     * @private
     * @param {AbacusProperty} abacusProperty Свойства плагина.
     */
    View.prototype._createViewTooltips = function (abacusProperty) {
        for (var i = 0; i < this._tooltips.length; i += 1) {
            this._tooltips[i].htmlElement.remove();
        }
        this._tooltips = [];
        if (abacusProperty.tooltip) {
            var countTooltips = abacusProperty.range === true ? 2 : 1;
            for (var i = 0; i < countTooltips; i += 1) {
                this._tooltips[i] = new Tooltip_1.default(abacusProperty.classes, i);
                this._widgetContainer.htmlElement.append(this._tooltips[i].htmlElement);
                this._tooltips[i].isVisible(true);
            }
        }
    };
    /**
     * Функция обновления подсказок слайдера, а именно местоположение и текст.
     * @private
     * @param {AbacusProperty} abacusProperty Свойства плагина.
     */
    View.prototype._updateViewTooltips = function (abacusProperty) {
        if (!abacusProperty.values || !abacusProperty.tooltip) {
            return;
        }
        for (var i = 0; i < abacusProperty.values.length; i += 1) {
            var currentValue = abacusProperty.values[i];
            var posHandle = this.getPosFromValue(currentValue);
            if (this._tooltips[i]) {
                if (this._isVertical) {
                    this._tooltips[i].posLeft = null;
                    this._tooltips[i].posBottom = posHandle;
                }
                else {
                    this._tooltips[i].posBottom = null;
                    this._tooltips[i].posLeft = posHandle;
                }
                this._tooltips[i].htmlElement.innerText = abacusProperty.values[i].toString();
            }
        }
    };
    /**
     * Функция создания или удаления индикатора (progress bar) слайдера.
     * @private
     * @param {AbacusProperty} abacusProperty Свойства плагина.
     */
    View.prototype._createViewRange = function (abacusProperty) {
        switch (abacusProperty.range) {
            case 'max':
                this._range.rangeType = 'max';
                this._widgetContainer.htmlElement.prepend(this._range.htmlElement);
                break;
            case true:
                this._range.rangeType = 'between';
                this._widgetContainer.htmlElement.prepend(this._range.htmlElement);
                break;
            case 'min':
                this._range.rangeType = 'min';
                this._widgetContainer.htmlElement.prepend(this._range.htmlElement);
                break;
            default:
                this._range.rangeType = 'hidden';
                this._range.htmlElement.remove();
                break;
        }
    };
    /**
     * Функция обновления индикатора (progress bar) слайдера, а именно местоположение и размер.
     * @private
     * @param {AbacusProperty} abacusProperty Свойства плагина.
     */
    View.prototype._updateViewRange = function (abacusProperty) {
        var _a;
        if (!((_a = abacusProperty.values) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        var posHandle0 = this.getPosFromValue(abacusProperty.values[0]);
        var posHandle1 = this.getPosFromValue(abacusProperty.values[1]);
        if (this._isVertical) {
            this._range.htmlElement.style.left = '';
            this._range.htmlElement.style.right = '';
            this._range.width = null;
            switch (this._range.rangeType) {
                case 'min':
                    this._range.htmlElement.style.top = 'auto';
                    this._range.htmlElement.style.bottom = '0';
                    this._range.height = posHandle0;
                    break;
                case 'max':
                    this._range.htmlElement.style.top = '0';
                    this._range.htmlElement.style.bottom = 'auto';
                    this._range.height = 100 - posHandle0;
                    break;
                case 'between':
                    this._range.htmlElement.style.bottom = posHandle0.toString() + "%";
                    this._range.htmlElement.style.top = '';
                    this._range.height = posHandle1 - posHandle0;
                    break;
                default:
                    break;
            }
        }
        else {
            this._range.htmlElement.style.top = '';
            this._range.htmlElement.style.bottom = '';
            this._range.height = null;
            switch (this._range.rangeType) {
                case 'min':
                    this._range.htmlElement.style.left = '0';
                    this._range.htmlElement.style.right = 'auto';
                    this._range.width = posHandle0;
                    break;
                case 'max':
                    this._range.htmlElement.style.left = 'auto';
                    this._range.htmlElement.style.right = '0';
                    this._range.width = 100 - posHandle0;
                    break;
                case 'between':
                    this._range.htmlElement.style.left = posHandle0.toString() + "%";
                    this._range.htmlElement.style.right = '';
                    this._range.width = posHandle1 - posHandle0;
                    break;
                default:
                    break;
            }
        }
    };
    /**
     * Функция обновления индикатора (progress bar) слайдера, а именно местоположение и размер.
     * @private
     * @param {AbacusClasses} abacusClasses Объект с классами элементов плагина.
     */
    View.prototype._updateClassNames = function (abacusClasses) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (((_b = (_a = this._cachedAbacusProperty) === null || _a === void 0 ? void 0 : _a.classes) === null || _b === void 0 ? void 0 : _b.abacus) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.abacus)) {
            this._widgetContainer.className = abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.abacus;
        }
        if (((_d = (_c = this._cachedAbacusProperty) === null || _c === void 0 ? void 0 : _c.classes) === null || _d === void 0 ? void 0 : _d.vertical) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.vertical)) {
            this._widgetContainer.classNameVertical = abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.vertical;
        }
        if (((_f = (_e = this._cachedAbacusProperty) === null || _e === void 0 ? void 0 : _e.classes) === null || _f === void 0 ? void 0 : _f.disabled) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.disabled)) {
            this._widgetContainer.classNameDisabled = abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.disabled;
        }
        if (((_h = (_g = this._cachedAbacusProperty) === null || _g === void 0 ? void 0 : _g.classes) === null || _h === void 0 ? void 0 : _h.handle) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.handle)) {
            for (var i = 0; i < this._handles.length; i += 1) {
                this._handles[i].className = abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.handle;
            }
        }
        if (((_k = (_j = this._cachedAbacusProperty) === null || _j === void 0 ? void 0 : _j.classes) === null || _k === void 0 ? void 0 : _k.range) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.range)) {
            this._range.className = abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.range;
        }
        this._collectionMarks.forEach(function (mapItem) {
            var _a, _b, _c, _d, _e, _f;
            var mark = mapItem;
            if (((_b = (_a = _this._cachedAbacusProperty) === null || _a === void 0 ? void 0 : _a.classes) === null || _b === void 0 ? void 0 : _b.mark) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.mark)) {
                if (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.mark) {
                    mark.className = abacusClasses.mark;
                }
            }
            if (((_d = (_c = _this._cachedAbacusProperty) === null || _c === void 0 ? void 0 : _c.classes) === null || _d === void 0 ? void 0 : _d.markSelected) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.markSelected)) {
                if (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.markInrange) {
                    mark.classNameSelected = abacusClasses.markSelected;
                }
            }
            if (((_f = (_e = _this._cachedAbacusProperty) === null || _e === void 0 ? void 0 : _e.classes) === null || _f === void 0 ? void 0 : _f.markInrange) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.markInrange)) {
                if (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.markInrange) {
                    mark.classNameInrange = abacusClasses.markInrange;
                }
            }
        });
    };
    /**
     * Функция переключает состояние слайдера с активного на неактивный и обратно.
     * @param {boolean} off "true" значит отключить. "false" значит активировать.
     */
    View.prototype.toggleDisable = function (off) {
        if (off === undefined || off === null) {
            this._isDisabled = !this._isDisabled;
        }
        else {
            this._isDisabled = !!off;
        }
        this._widgetContainer.isDisabled(this._isDisabled);
    };
    /**
     * Функция упаковывает в объект некоторые данные о слайдере и бегунке для обработчиков событий.
     * @private
     * @returns {EventUIData} Объект класса EventUIData.
     */
    View.prototype._getEventUIData = function () {
        var uiData = {};
        if (this._currentHandle) {
            uiData.handle = this._currentHandle.htmlElement;
            uiData.handleIndex = this._currentHandle.handleIndex;
        }
        var modelData = this._presenter.getModelAbacusProperty();
        uiData.abacusProperty = View.getCloneAbacusProperty(modelData);
        return uiData;
    };
    /**
     * Функция-обертка события "abacus-change". Генерирует событие "abacus-change" и вызывает callback "change".
     * @private
     * @param {Event} event Объект события. По умолчанию равен объекту события изменения значения слайдера.
     * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
     * этого события вызвал Event.preventDefault(). В ином случае — true.
     * (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    View.prototype._eventChangeWrapper = function (event) {
        if (event === void 0) { event = this._customEventChange; }
        var dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventChange);
        var abacusProperty = this._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.change) === 'function') {
            abacusProperty.change(event, this._getEventUIData());
        }
        return dispatchEventResult;
    };
    /**
     * Функция-обертка события "abacus-create". Генерирует событие "abacus-create" и вызывает callback "create".
     * @private
     * @param {Event} event Объект события. По умолчанию равен объекту события инициализации плагина.
     * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
     * этого события вызвал Event.preventDefault().
     * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    View.prototype._eventCreateWrapper = function (event) {
        if (event === void 0) { event = this._customEventCreate; }
        var dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventCreate);
        var abacusProperty = this._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.create) === 'function') {
            abacusProperty.create(event, this._getEventUIData());
        }
        return dispatchEventResult;
    };
    /**
     * Функция-обертка события "abacus-slide". Генерирует событие "abacus-slide" и вызывает callback "slide".
     * @private
     * @param {Event} event Объект события. По умолчанию равен объекту события перемещения бегунка слайдера.
     * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
     * этого события вызвал Event.preventDefault().
     * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    View.prototype._eventSlideWrapper = function (event) {
        if (event === void 0) { event = this._customEventSlide; }
        var dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventSlide);
        var abacusProperty = this._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.slide) === 'function') {
            abacusProperty.slide(event, this._getEventUIData());
        }
        return dispatchEventResult;
    };
    /**
     * Функция-обертка события "abacus-start". Генерирует событие "abacus-start" и вызывает callback "start".
     * @private
     * @param {Event} event Объект события. По умолчанию равен объекту события начала перемещения бегунка слайдера.
     * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
     * этого события вызвал Event.preventDefault().
     * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    View.prototype._eventStartWrapper = function (event) {
        if (event === void 0) { event = this._customEventStart; }
        var dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventStart);
        var abacusProperty = this._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.start) === 'function') {
            abacusProperty.start(event, this._getEventUIData());
        }
        return dispatchEventResult;
    };
    /**
     * Функция-обертка события "abacus-stop". Генерирует событие "abacus-stop" и вызывает callback "stop".
     * @private
     * @param {Event} event Объект события. По умолчанию равен объекту события окончания перемещения бегунка слайдера.
     * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
     * этого события вызвал Event.preventDefault().
     * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    View.prototype._eventStopWrapper = function (event) {
        if (event === void 0) { event = this._customEventStop; }
        var dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventStop);
        var abacusProperty = this._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.stop) === 'function') {
            abacusProperty.stop(event, this._getEventUIData());
        }
        return dispatchEventResult;
    };
    /**
     * Функция, обрабатывающая позицию мыши или касания и вычисляющая, какию ручку перемещать.
     * @private
     * @param {MouseEvent | TouchEvent} event Объект события мыши или касания.
     */
    View.prototype._mouseHandler = function (event) {
        var _a, _b;
        var viewInstance = this;
        var abacusProperty = viewInstance._presenter.getModelAbacusProperty();
        if (!((_a = abacusProperty.values) === null || _a === void 0 ? void 0 : _a.length) || !viewInstance._currentHandle) {
            return;
        }
        var coordinate = 0;
        if (event instanceof MouseEvent) {
            coordinate = this._isVertical ? event.clientY : event.clientX;
        }
        else if (event instanceof TouchEvent) {
            coordinate = this._isVertical ? event.changedTouches[0].screenY : event.changedTouches[0].screenX;
        }
        var percent = this.getPosPercent(coordinate);
        var valueUnrounded = this.getValFromPosPercent(percent);
        var newValues = (_b = abacusProperty.values) === null || _b === void 0 ? void 0 : _b.slice(0);
        var _c = __read(viewInstance._handles, 2), firstHandle = _c[0], secondHandle = _c[1];
        var _d = __read(abacusProperty.values, 2), firstValue = _d[0], secondValue = _d[1];
        if (viewInstance._currentHandle.handleIndex === 0) {
            if (valueUnrounded >= secondValue) {
                newValues[0] = secondValue;
                viewInstance._currentHandle = secondHandle;
            }
            else {
                newValues[0] = valueUnrounded;
            }
        }
        if (viewInstance._currentHandle.handleIndex === 1) {
            if (valueUnrounded <= firstValue) {
                newValues[1] = firstValue;
                viewInstance._currentHandle = firstHandle;
            }
            else {
                newValues[1] = valueUnrounded;
            }
        }
        viewInstance._presenter.setModelAbacusProperty({
            values: newValues,
        });
    };
    /**
     * Функция, которая вычисляет, какие значения были изменены, и передает их через Представителя в Модель.
     * @private
     * @param {number} valueUnrounded Значение, полученное из позиции клика мыши или касания.
     */
    View.prototype._calcHandleValues = function (valueUnrounded) {
        var _a, _b, _c;
        if (Number.isNaN(valueUnrounded)) {
            return;
        }
        var viewInstance = this;
        var abacusProperty = viewInstance._presenter.getModelAbacusProperty();
        if (!((_a = abacusProperty.values) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        var newValues = [];
        if (abacusProperty.values) {
            newValues = (_b = abacusProperty.values) === null || _b === void 0 ? void 0 : _b.slice(0);
        }
        var checkNecessaryProps = abacusProperty.range === true && ((_c = abacusProperty.values) === null || _c === void 0 ? void 0 : _c.length) && abacusProperty.step;
        if (checkNecessaryProps) {
            var deltaMin = abacusProperty.values[0] - valueUnrounded;
            deltaMin = deltaMin < 0 ? deltaMin *= -1 : deltaMin;
            var deltaMax = abacusProperty.values[1] - valueUnrounded;
            deltaMax = deltaMax < 0 ? deltaMax *= -1 : deltaMax;
            if (deltaMax < deltaMin) {
                newValues[1] = valueUnrounded;
            }
            else {
                newValues[0] = valueUnrounded;
            }
        }
        else {
            newValues[0] = valueUnrounded;
        }
        viewInstance._presenter.setModelAbacusProperty({
            values: newValues,
        });
    };
    /**
     * Установка обработчиков событий.
     * @private
     */
    View.prototype._bindEventListeners = function () {
        var viewInstance = this;
        viewInstance._presenter.eventTarget.addEventListener('update-model', this._updateModelHandler.bind(this));
        viewInstance._widgetContainer.htmlElement.addEventListener('click', viewInstance._handlerWidgetContainerClick.bind(viewInstance));
        viewInstance._widgetContainer.htmlElement.addEventListener('touchend', viewInstance._handlerWidgetContainerClick.bind(viewInstance));
        document.addEventListener('mousemove', viewInstance._handlerHandleItemClickMove.bind(viewInstance), { passive: true });
        document.addEventListener('touchmove', viewInstance._handlerHandleItemClickMove.bind(viewInstance), { passive: true });
        document.addEventListener('mouseup', viewInstance._handlerHandleItemClickStop.bind(viewInstance));
        document.addEventListener('touchend', viewInstance._handlerHandleItemClickStop.bind(viewInstance));
        document.addEventListener('touchcancel', viewInstance._handlerHandleItemClickStop.bind(viewInstance));
    };
    /**
     * Обработчик обновления модели.
     * @private
     * @param {Event} event Объект события.
     */
    View.prototype._updateModelHandler = function () {
        this.updateView();
    };
    /**
     * Обработчик клика по слайдеру. По клику перемещает ручку слайдера.
     * @private
     */
    View.prototype._handlerWidgetContainerClick = function (event) {
        var _a, _b, _c, _d;
        event.preventDefault();
        var viewInstance = this;
        var abacusProperty = viewInstance._presenter.getModelAbacusProperty();
        var eventTarget = event.target;
        var handleClass = ((_a = abacusProperty.classes) === null || _a === void 0 ? void 0 : _a.handle) ? (_b = abacusProperty.classes) === null || _b === void 0 ? void 0 : _b.handle : '';
        var markClass = ((_c = abacusProperty.classes) === null || _c === void 0 ? void 0 : _c.mark) ? (_d = abacusProperty.classes) === null || _d === void 0 ? void 0 : _d.mark : '';
        var condition = viewInstance._isDisabled
            || eventTarget.classList.contains(handleClass)
            || eventTarget.classList.contains(markClass);
        if (condition) {
            return;
        }
        // viewInstance._mouseHandler(event);
        var coordinate = 0;
        if (event instanceof MouseEvent) {
            coordinate = this._isVertical ? event.clientY : event.clientX;
        }
        else if (event instanceof TouchEvent) {
            coordinate = this._isVertical ? event.changedTouches[0].screenY : event.changedTouches[0].screenX;
        }
        var percent = this.getPosPercent(coordinate);
        var valueUnrounded = this.getValFromPosPercent(percent);
        viewInstance._calcHandleValues(valueUnrounded);
    };
    /**
     * Обработчик клика по ручке слайдера. Фиксирует нажатие на ручку и генерирует событие "start".
     * @private
     */
    View.prototype._handlerHandleItemClickStart = function (event) {
        event.preventDefault();
        // console.log('_handlerHandleItemClickStart');
        var viewInstance = this;
        if (viewInstance._isDisabled) {
            return;
        }
        viewInstance._isDragHandle = true;
        viewInstance._eventStartWrapper(event);
    };
    /**
     * Обработчик пересещения курсора или пальца по экрану.
     * Нужен для того, чтобы вычислить, куда переместить ручку слайдера. Генерирует событие "slide".
     * @private
     */
    View.prototype._handlerHandleItemClickMove = function (event) {
        var viewInstance = this;
        if (viewInstance._isDisabled) {
            return;
        }
        if (viewInstance._handleMovingTimer !== null) {
            clearTimeout(viewInstance._handleMovingTimer);
        }
        viewInstance._handleMovingTimer = setTimeout(function () {
            if (viewInstance._isDragHandle) {
                // console.log('_handlerHandleItemClickMove');
                viewInstance._mouseHandler(event);
                // let coordinate = 0;
                // if( event instanceof MouseEvent ){
                //   coordinate = this._isVertical ? event.clientY : event.clientX;
                // }
                // else if(event instanceof TouchEvent){
                //   coordinate = this._isVertical ? event.changedTouches[0].screenY : event.changedTouches[0].screenX;
                // }
                // const percent = this.getPosPercent(coordinate);
                // const valueUnrounded: number = this.getValFromPosPercent(percent);
                // viewInstance._calcHandleValues(valueUnrounded);
                // viewInstance._eventSlideWrapper(event);
            }
        }, 5);
    };
    /**
     * Обработчик окончание пересещения курсора или пальца по экрану.
     * Генерирует событие "stop".
     * @private
     */
    View.prototype._handlerHandleItemClickStop = function (event) {
        var viewInstance = this;
        if (viewInstance._isDragHandle) {
            // console.log('_handlerHandleItemClickStop');
            viewInstance._eventStopWrapper(event);
        }
        viewInstance._isDragHandle = false;
    };
    /**
     * Создает шкалу значений и добавляет ее в слайдер.
     * @private
     */
    View.prototype._createScale = function () {
        var _this = this;
        if (this._collectionMarks.size) {
            this._removeScale();
        }
        var abacusProperty = this._presenter.getModelAbacusProperty();
        var value = abacusProperty.min;
        for (; value <= abacusProperty.max; value += abacusProperty.step) {
            value = View.round(value, abacusProperty.step);
            var mark = new Mark_1.default(value, abacusProperty.classes);
            var left = this.getPosFromValue(value);
            if (this._isVertical)
                mark.posBottom = left;
            else
                mark.posLeft = left;
            this._collectionMarks.add(mark);
        }
        if (value !== abacusProperty.max) {
            var mark = new Mark_1.default(abacusProperty.max, abacusProperty.classes);
            var left = this.getPosFromValue(abacusProperty.max);
            if (this._isVertical)
                mark.posBottom = left;
            else
                mark.posLeft = left;
            this._collectionMarks.add(mark);
        }
        this._collectionMarks.forEach(function (mapItem) {
            var mark = mapItem;
            if (_this._widgetContainer.htmlElement.contains(_this._handles[0].htmlElement)) {
                _this._handles[0].htmlElement.before(mark.htmlElement);
            }
            else {
                _this._widgetContainer.htmlElement.append(mark.htmlElement);
            }
        });
        this._thinOutScale();
        this._bindEventListenersOnMarks();
    };
    /**
     * Удаляет шкалу значений.
     * @private
     */
    View.prototype._removeScale = function () {
        this._collectionMarks.forEach(function (mapItem) {
            var mark = mapItem;
            mark.htmlElement.remove();
        });
        this._collectionMarks.clear();
    };
    /**
     * Функция удаления лишних меток на шкале значений для того, чтобы они не "слипались" друг с другом.
     * @private
     */
    View.prototype._thinOutScale = function () {
        var _this = this;
        var sizeWidget;
        if (this._isVertical) {
            sizeWidget = this._widgetContainer.htmlElement.offsetHeight;
        }
        else {
            sizeWidget = this._widgetContainer.htmlElement.offsetWidth;
        }
        var k = 7; // Минимальное расстояние между метка шкалы.
        var sizeMarks = 0;
        this._collectionMarks.forEach(function (mapItem) {
            var mark = mapItem;
            if (_this._isVertical) {
                sizeMarks += mark.htmlElement.offsetHeight + k;
            }
            else {
                sizeMarks += mark.htmlElement.offsetWidth + k;
            }
        });
        if (sizeWidget < sizeMarks) {
            var abacusProperty_1 = this._presenter.getModelAbacusProperty();
            var isDelete_1 = false;
            this._collectionMarks.forEach(function (mapItem) {
                var mark = mapItem;
                var dontDeleteMark = mark.associatedValue === abacusProperty_1.min
                    || mark.associatedValue === abacusProperty_1.max
                    || isDelete_1;
                if (dontDeleteMark) {
                    isDelete_1 = false;
                }
                else {
                    mark === null || mark === void 0 ? void 0 : mark.htmlElement.remove();
                    _this._collectionMarks.delete(mark);
                    isDelete_1 = true;
                }
            });
        }
        sizeMarks = 0;
        this._collectionMarks.forEach(function (mapItem) {
            var mark = mapItem;
            if (_this._isVertical) {
                sizeMarks += mark.htmlElement.offsetHeight + k;
            }
            else {
                sizeMarks += mark.htmlElement.offsetWidth + k;
            }
        });
        if (sizeWidget < sizeMarks) {
            this._thinOutScale();
        }
    };
    /**
     * Функция меняет состояния меток в шкале значений.
     * @private
     */
    View.prototype._highlightMarks = function () {
        if (!this._collectionMarks.size) {
            return;
        }
        var abacusProperty = this._presenter.getModelAbacusProperty();
        var rangeType = abacusProperty.range;
        this._collectionMarks.forEach(function (mapItem) {
            var mark = mapItem;
            var isValBetween0And1 = mark.associatedValue >= abacusProperty.values[0]
                && mark.associatedValue <= abacusProperty.values[1];
            if (rangeType === 'min' && mark.associatedValue <= abacusProperty.values[0]) {
                mark.isInrange(true);
            }
            else if (rangeType === 'max' && mark.associatedValue >= abacusProperty.values[0]) {
                mark.isInrange(true);
            }
            else if (rangeType === true && isValBetween0And1) {
                mark.isInrange(true);
            }
            else {
                mark.isInrange(false);
            }
            if (mark.associatedValue === abacusProperty.values[0] || mark.associatedValue === abacusProperty.values[1]) {
                mark.isSelected(true);
            }
            else {
                mark.isSelected(false);
            }
        });
    };
    /**
     * Функция установки обработчиков на метки шкалы значений.
     * @private
     */
    View.prototype._bindEventListenersOnMarks = function () {
        var _this = this;
        this._collectionMarks.forEach(function (mapItem) {
            var mark = mapItem;
            mark.htmlElement.addEventListener('click', function () {
                var _a;
                var viewInstance = _this;
                if (viewInstance._isDisabled) {
                    return;
                }
                if (((_a = viewInstance._cachedAbacusProperty) === null || _a === void 0 ? void 0 : _a.value) !== mark.associatedValue) {
                    viewInstance._calcHandleValues(mark.associatedValue);
                }
            });
            mark.htmlElement.addEventListener('touchend', function () {
                var _a;
                var viewInstance = _this;
                if (viewInstance._isDisabled) {
                    return;
                }
                if (((_a = viewInstance._cachedAbacusProperty) === null || _a === void 0 ? void 0 : _a.value) !== mark.associatedValue) {
                    viewInstance._calcHandleValues(mark.associatedValue);
                }
            });
        });
    };
    /**
     * Установка css-свойства "transition" элементам интерфейса слайдера.
     * Первоначальное значение береться из model.abacusProperty.aniamte.
     * @private
     */
    View.prototype._setTransition = function () {
        var duration = '';
        var animate = this._presenter.getModelAbacusProperty().animate;
        if (typeof animate === 'number' && animate > 0) {
            duration = animate.toString();
        }
        else if (animate === true) {
            duration = '400';
        }
        else if (animate === 'slow') {
            duration = '600';
        }
        else if (animate === 'fast') {
            duration = '200';
        }
        duration = duration ? duration + "ms" : '';
        for (var i = 0; i < this._handles.length; i += 1) {
            this._handles[i].htmlElement.style.transition = duration;
            if (this._tooltips[i]) {
                this._tooltips[i].htmlElement.style.transition = duration;
            }
        }
        this._range.htmlElement.style.transition = duration;
        this._collectionMarks.forEach(function (mapItem) {
            var mark = mapItem;
            mark.htmlElement.style.transition = duration;
        });
    };
    /**
     *
     * @param abacusProperty
     * @returns
     */
    View.getCloneAbacusProperty = function (abacusProperty) {
        var _a;
        var cloneProperty = {};
        Object.assign(cloneProperty, abacusProperty);
        cloneProperty.values = (_a = abacusProperty.values) === null || _a === void 0 ? void 0 : _a.slice(0);
        Object.assign(cloneProperty.classes, abacusProperty.classes);
        return cloneProperty;
    };
    /**
     *
     * @returns
     */
    View.prototype._findMovedHandle = function () {
        var abacusProperty = this._presenter.getModelAbacusProperty();
        var _a = __read(this._handles, 2), firstHandle = _a[0], secondHandle = _a[1];
        this._currentHandle = firstHandle;
        if (this._cachedAbacusProperty) {
            if (this._cachedAbacusProperty.values[1] !== abacusProperty.values[1]) {
                this._currentHandle = secondHandle;
            }
        }
        return this._currentHandle;
    };
    /**
     * Функция получения количества знаков после запятой.
     * @static
     * @param {number} x Число, у которого надо узнать количество знаков после запятой.
     * @returns {number} Количество знаков после запятой.
     */
    View.countNumAfterPoint = function (x) {
        var xStr = x.toString();
        return ("" + xStr).indexOf('.') >= 0 ? ("" + xStr).split('.')[1].length : 0;
    };
    /**
     * Функция окргуления числа до того количества знаков после запятой, сколько этих знаков у числа fractionalNum.
     * @static
     * @param {number} value Число, которое надо округлить.
     * @param {number} fractionalNum Число, у которого надо узнать количество знаков после запятой.
     * @returns {number} Округленное число.
     */
    View.round = function (value, fractionalNum) {
        var numbersAfterPoint = View.countNumAfterPoint(fractionalNum);
        var roundedValue = value;
        if (numbersAfterPoint > 0) {
            roundedValue = parseFloat(value.toFixed(numbersAfterPoint));
        }
        else {
            roundedValue = Math.round(value);
        }
        return roundedValue;
    };
    /**
     * Функция сравнения двух массивов с произвольними примитивными значениями.
     * @static
     * @param {Array<any>} a Массив
     * @param {Array<any>} b Массив
     * @returns {boolean} Возвращает "true" если массивы одинаковые. Иначе "false".
     */
    View.arrayCompare = function (a, b) {
        if (!a || !b)
            return false;
        if ((a === null || a === void 0 ? void 0 : a.length) !== (b === null || b === void 0 ? void 0 : b.length))
            return false;
        for (var i = 0; i < a.length; i += 1) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    };
    return View;
}());
exports.default = View;


/***/ }),

/***/ "./src/scripts/WidgetContainer/WidgetContainer.ts":
/*!********************************************************!*\
  !*** ./src/scripts/WidgetContainer/WidgetContainer.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Класс "WidgetContainer" является оберткой для HTML-элемента, в котором содержатся элементы слайдера.
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
var WidgetContainer = /** @class */ (function () {
    /**
     * @constructor
     * @this   {WidgetContainer}
     * @param  {HTMLAbacusElement} htmlElement - HTML-элемент, в котором будут элементы слайдера.
     * @param  {AbacusClasses} classes - Объект с названиями классов.
     * @example new WidgetContainer({
     *  abacus: 'abacus',
     *  disabled: 'abacus_disabled'
     * });
     */
    function WidgetContainer(htmlElement, classes) {
        /**
         * Ширина HTML-элемента от 0 до 100 в процентах.
         * @type {number}
         * @private
         */
        this._width = 100;
        this._htmlElement = htmlElement;
        this._className = (classes === null || classes === void 0 ? void 0 : classes.abacus) ? classes.abacus : 'abacus';
        this._classNameDisabled = (classes === null || classes === void 0 ? void 0 : classes.disabled) ? classes.disabled : 'abacus_disabled';
        this._classNameVertical = (classes === null || classes === void 0 ? void 0 : classes.vertical) ? classes.vertical : 'abacus_vertical';
        this._htmlElement.classList.add(this._className);
        this._htmlElement.classList.add("js-" + this._className);
    }
    Object.defineProperty(WidgetContainer.prototype, "width", {
        /**
         * Геттер ширины HTML-элемента (_htmlElement).
         */
        get: function () {
            return this._width;
        },
        /**
         * Сеттер ширины HTML-элемента (_htmlElement).
         * @param {number} width - ширина в процентах от 0 до 100.
         */
        set: function (width) {
            this._width = width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WidgetContainer.prototype, "htmlElement", {
        /**
         * Геттер ссылки на HTML-элемент.
         */
        get: function () {
            return this._htmlElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WidgetContainer.prototype, "className", {
        /**
         * Геттер названия класса HTML-элемента.
         */
        get: function () {
            return this._className;
        },
        /**
         * Сеттер названия класса HTML-элемента. Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
         * @param {string} name - Название класса.
         */
        set: function (name) {
            this._htmlElement.classList.remove(this._className);
            this._htmlElement.classList.add(name);
            this._className = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WidgetContainer.prototype, "classNameDisabled", {
        /**
         * Геттер названия класса HTML-элемента в состоянии "выключен".
         */
        get: function () {
            return this._classNameDisabled;
        },
        /**
         * Сеттер названия класса HTML-элемента в состоянии "выключен".
         * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
         * @param {string} name - Название класса.
         */
        set: function (name) {
            if (!name || typeof name !== 'string') {
                return;
            }
            if (this._htmlElement.classList.contains(this._classNameDisabled)) {
                this._htmlElement.classList.add(name);
            }
            if (this._classNameDisabled) {
                this._htmlElement.classList.remove(this._classNameDisabled);
            }
            this._classNameDisabled = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WidgetContainer.prototype, "classNameVertical", {
        /**
         * Геттер названия класса HTML-элемента в состоянии "выключен".
         */
        get: function () {
            return this._classNameVertical;
        },
        /**
         * Сеттер названия класса HTML-элемента в состоянии "выключен".
         * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
         * @param {string} name - Название класса.
         */
        set: function (name) {
            if (!name || typeof name !== 'string') {
                return;
            }
            if (this._htmlElement.classList.contains(this._classNameVertical)) {
                this._htmlElement.classList.add(name);
            }
            if (this._classNameVertical) {
                this._htmlElement.classList.remove(this._classNameVertical);
            }
            this._classNameVertical = name;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Функция получения и установки активного/неактивного состояния.
     * Если функция получила параметр false, то у HTML-элемента слайдера удалаяется класс,
     * записанный в _classNameDisabled.
     * Если функция получила параметр true, то HTML-элементу слайдера добавляется класс,
     * записанный в _classNameDisabled.
     * @param {boolean} value - Если передать "true", то добавляется класс, иначе удалается класс.
     */
    WidgetContainer.prototype.isDisabled = function (value) {
        if (value !== undefined && this._classNameDisabled) {
            if (value) {
                this._htmlElement.classList.add(this._classNameDisabled);
            }
            else {
                this._htmlElement.classList.remove(this._classNameDisabled);
            }
        }
    };
    /**
     * Функция получения и установки активного/неактивного состояния.
     * Если функция получила параметр false, то у HTML-элемента слайдера удалаяется класс,
     * записанный в _classNameDisabled.
     * Если функция получила параметр true, то HTML-элементу слайдера добавляется класс,
     * записанный в _classNameDisabled.
     * @param {boolean} value - Если передать "true", то добавляется класс, иначе удалается класс.
     */
    WidgetContainer.prototype.isVertical = function (value) {
        if (value !== undefined && this._classNameVertical) {
            if (value) {
                this._htmlElement.classList.add(this._classNameVertical);
            }
            else {
                this._htmlElement.classList.remove(this._classNameVertical);
            }
        }
    };
    return WidgetContainer;
}());
exports.default = WidgetContainer;


/***/ }),

/***/ "./src/scripts/abacus.ts":
/*!*******************************!*\
  !*** ./src/scripts/abacus.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "jquery"));
var View_1 = __importDefault(__webpack_require__(/*! ./View/View */ "./src/scripts/View/View.ts"));
jquery_1.default.fn.abacus = function (paramOptions, param1, param2) {
    var returnResult = this;
    this.each(function () {
        var instanceHTMLAbacus = this;
        var view;
        // получение или инициализация плагина
        if (instanceHTMLAbacus.jqueryAbacusInstance instanceof View_1.default) {
            view = instanceHTMLAbacus.jqueryAbacusInstance;
        }
        else {
            if (typeof paramOptions === 'object') {
                view = new View_1.default(instanceHTMLAbacus, paramOptions);
            }
            else {
                view = new View_1.default(instanceHTMLAbacus);
            }
            instanceHTMLAbacus.jqueryAbacusInstance = view;
        }
        if (typeof paramOptions === 'string') {
            var resultOption = void 0;
            switch (paramOptions) {
                case 'destroy':
                    break;
                case 'disable':
                    view.option('disabled', true);
                    break;
                case 'enable':
                    view.option('disabled', false);
                    break;
                case 'instance':
                    returnResult = view;
                    break;
                case 'option':
                    if (typeof param1 === 'object') {
                        resultOption = view.option(undefined, param1);
                    }
                    else if (typeof param1 === 'string') {
                        resultOption = view.option(param1, param2);
                    }
                    else {
                        resultOption = view.option();
                    }
                    if (typeof resultOption !== undefined) {
                        returnResult = resultOption;
                    }
                    break;
                case 'value':
                    resultOption = view.option('value', param2);
                    if (typeof resultOption !== undefined) {
                        returnResult = resultOption;
                    }
                    break;
                case 'values':
                    break;
                case 'widget':
                    break;
                default:
                    break;
            }
        }
    });
    return returnResult;
};


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/scripts/abacus.ts");
/******/ 	__webpack_require__("./src/styles/abacus.scss");
/******/ })()
;
//# sourceMappingURL=abacus.js.map?v=7bc6040bd1b144c15a75