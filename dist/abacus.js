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

/***/ "./src/scripts/Handle.ts":
/*!*******************************!*\
  !*** ./src/scripts/Handle.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Handle = void 0;
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
        if (handleIndex !== undefined && !isNaN(handleIndex)) {
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
                if (left < 0)
                    left = 0;
                if (left > 100)
                    left = 100;
                this._posLeft = left;
                this._htmlElement.style.left = left + '%';
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
                if (bottom < 0)
                    bottom = 0;
                if (bottom > 100)
                    bottom = 100;
                this._posBottom = bottom;
                this._htmlElement.style.bottom = bottom + '%';
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
exports.Handle = Handle;


/***/ }),

/***/ "./src/scripts/Mark.ts":
/*!*****************************!*\
  !*** ./src/scripts/Mark.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mark = void 0;
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
       * 	mark: 'abacus__mark',
       * 	markInrange: 'abacus__mark_inrange',
       * 	markSelected: 'abacus__mark_selected'
       * });
     */
    function Mark(classes) {
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
                if (left < 0)
                    left = 0;
                if (left > 100)
                    left = 100;
                this._posLeft = left;
                this._htmlElement.style.left = left + '%';
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
                if (bottom < 0)
                    bottom = 0;
                if (bottom > 100)
                    bottom = 100;
                this._posBottom = bottom;
                this._htmlElement.style.bottom = bottom + '%';
            }
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
exports.Mark = Mark;


/***/ }),

/***/ "./src/scripts/Model.ts":
/*!******************************!*\
  !*** ./src/scripts/Model.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Model = void 0;
var event_target_1 = __importDefault(__webpack_require__(/*! @ungap/event-target */ "./node_modules/@ungap/event-target/cjs/index.js"));
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
            orientation: 'horizontal',
            range: false,
            scale: false,
            step: 1,
            tooltip: false,
            value: 0,
            values: [0],
        };
        if (data) {
            this.abacusProperty = data;
        }
        this._eventTarget = new event_target_1.default();
        this._eventUpdateModel = new CustomEvent('update-model');
    }
    Object.defineProperty(Model.prototype, "abacusProperty", {
        /**
         * Геттер свойств слайдера.
         * @returns {AbacusOptions} Свойства слайдера, хранящиеся в Модели.
         */
        get: function () {
            return this._abacusProperty;
        },
        /**
         * Сеттер свойств слайдера.
         * @param {AbacusOptions} abacusProperty Свойства слайдера, которые нужно добавить в Модель.
         */
        set: function (abacusProperty) {
            var _a, _b, _c, _d, _e;
            // animate
            if (abacusProperty.animate !== undefined) {
                if (abacusProperty.animate === 'fast'
                    || abacusProperty.animate === 'slow'
                    || typeof abacusProperty.animate === 'boolean') {
                    this._abacusProperty.animate = abacusProperty.animate;
                }
                else if (abacusProperty.animate == null) {
                    this._abacusProperty.animate = false;
                }
                else if (!isNaN(abacusProperty.animate)) {
                    this._abacusProperty.animate = parseInt(abacusProperty.animate);
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
                if (!isNaN(abacusProperty.max)) {
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
                if (!isNaN(abacusProperty.min)) {
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
                if (!isNaN(abacusProperty.step)) {
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
                if (!isNaN(abacusProperty.value)) {
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
                for (var i = 0; i < abacusProperty.values.length; i++) {
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
                    else if (a === b)
                        return 0;
                    else
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
                if (abacusProperty.orientation === 'vertical') {
                    this._abacusProperty.orientation = 'vertical';
                }
                else {
                    this._abacusProperty.orientation = 'horizontal';
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
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "value", {
        /**
         * Сеттер текущего значения слайдера.
         * @param {number} value Текущее значение слайдера.
         */
        set: function (value) {
            var _a;
            value = this.roundValuePerStep(value);
            this._abacusProperty.value = value;
            if (!((_a = this._abacusProperty.values) === null || _a === void 0 ? void 0 : _a.length)) {
                this._abacusProperty.values = [];
            }
            this._abacusProperty.values[0] = value;
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
        return ~(x + '').indexOf('.') ? (x + '').split('.')[1].length : 0;
    };
    /**
     * Функция окргуления числа до того количества знаков после запятой, сколько этих знаков у числа fractionalNum.
     * @param {number} value Число, которое надо округлить.
     * @param {number} fractionalNum Число, у которого надо узнать количество знаков после запятой.
     * @returns {number} Округленное число.
     */
    Model.round = function (value, fractionalNum) {
        var numbersAfterPoint = Model.countNumAfterPoint(fractionalNum);
        if (numbersAfterPoint > 0) {
            value = parseFloat(value.toFixed(numbersAfterPoint));
        }
        else {
            value = Math.round(value);
        }
        return value;
    };
    return Model;
}());
exports.Model = Model;


/***/ }),

/***/ "./src/scripts/Presenter.ts":
/*!**********************************!*\
  !*** ./src/scripts/Presenter.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Presenter = void 0;
var event_target_1 = __importDefault(__webpack_require__(/*! @ungap/event-target */ "./node_modules/@ungap/event-target/cjs/index.js"));
var Model_1 = __webpack_require__(/*! ./Model */ "./src/scripts/Model.ts");
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
        var presenterInstance = this;
        this._model = new Model_1.Model(options);
        this._eventTarget = new event_target_1.default();
        this._eventUpdateModel = new CustomEvent('update-model');
        this._model.eventTarget.addEventListener('update-model', function (event) {
            presenterInstance._eventTarget.dispatchEvent(presenterInstance._eventUpdateModel);
        });
    }
    /**
     * Функция получения свойств слайдера, полученные из Модели.
     * @returns {AbacusOptions} Свойства слайдера, полученные из Модели.
     */
    Presenter.prototype.getModelAbacusProperty = function () {
        return this._model.abacusProperty;
    };
    /**
     * Функция получения свойств слайдера, полученные из Модели.
     * @returns {AbacusOptions} Свойства слайдера, полученные из Модели.
     */
    Presenter.prototype.setModelAbacusProperty = function (abacusProperty) {
        this._model.abacusProperty = abacusProperty;
    };
    /**
     * Функция установки текущих значений слайдера.
     * @param {number[]} values Текущее значения слайдера.
     */
    Presenter.prototype.setAbacusValue = function (values) {
        this._model.abacusProperty = {
            values: [values[0], values[1]]
        };
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
exports.Presenter = Presenter;


/***/ }),

/***/ "./src/scripts/Range.ts":
/*!******************************!*\
  !*** ./src/scripts/Range.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Range = void 0;
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
                if (width < 0)
                    width = 0;
                if (width > 100)
                    width = 100;
                this._width = width;
                this._htmlElement.style.width = width + '%';
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
                if (height < 0)
                    height = 0;
                if (height > 100)
                    height = 100;
                this._height = height;
                this._htmlElement.style.height = height + '%';
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
         *
         */
        get: function () {
            return this._rangeType;
        },
        /**
         *
         */
        set: function (value) {
            if (value !== 'hidden' && value !== 'min' && value !== 'max' && value !== 'between') {
                value = 'hidden';
            }
            this._rangeType = value;
        },
        enumerable: false,
        configurable: true
    });
    return Range;
}());
exports.Range = Range;
var RangeType;
(function (RangeType) {
    RangeType["HIDDEN"] = "hidden";
    RangeType["MIN"] = "min";
    RangeType["MAX"] = "max";
    RangeType["BETWEEN"] = "between";
})(RangeType || (RangeType = {}));


/***/ }),

/***/ "./src/scripts/Tooltip.ts":
/*!********************************!*\
  !*** ./src/scripts/Tooltip.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tooltip = void 0;
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
        if (tooltipIndex !== undefined && !isNaN(tooltipIndex)) {
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
                if (left < 0)
                    left = 0;
                if (left > 100)
                    left = 100;
                this._posLeft = left;
                this._htmlElement.style.left = left + '%';
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
                if (bottom < 0)
                    bottom = 0;
                if (bottom > 100)
                    bottom = 100;
                this._posBottom = bottom;
                this._htmlElement.style.bottom = bottom + '%';
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
exports.Tooltip = Tooltip;


/***/ }),

/***/ "./src/scripts/View.ts":
/*!*****************************!*\
  !*** ./src/scripts/View.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.View = void 0;
var Presenter_1 = __webpack_require__(/*! ./Presenter */ "./src/scripts/Presenter.ts");
var WidgetContainer_1 = __webpack_require__(/*! ./WidgetContainer */ "./src/scripts/WidgetContainer.ts");
var Handle_1 = __webpack_require__(/*! ./Handle */ "./src/scripts/Handle.ts");
var Range_1 = __webpack_require__(/*! ./Range */ "./src/scripts/Range.ts");
var Mark_1 = __webpack_require__(/*! ./Mark */ "./src/scripts/Mark.ts");
var Tooltip_1 = __webpack_require__(/*! ./Tooltip */ "./src/scripts/Tooltip.ts");
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
     * @param  {object} data Другие данные.
     */
    function View(abacusHtmlContainer, options, data) {
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
        this._mapScale = new Map();
        /**
         * Кэш свойств сладйера из Модели.
         */
        this._cachedAbacusProperty = {};
        /**
         * Если значение равно "true", то значит слайдер находиться в вертикальном состоянии.
         */
        this._isVertical = false;
        var viewInstance = this;
        this._presenter = new Presenter_1.Presenter(options);
        this._presenter.eventTarget.addEventListener('update-model', function (event) {
            // console.log('Модель обновилась!');
            viewInstance.updateView();
        });
        var abacusProperty = this._presenter.getModelAbacusProperty();
        this._widgetContainer = new WidgetContainer_1.WidgetContainer(abacusHtmlContainer, abacusProperty.classes);
        this._widgetContainer.htmlElement.innerHTML = '';
        this._range = new Range_1.Range(abacusProperty.classes);
        this._tooltips[0] = new Tooltip_1.Tooltip(abacusProperty.classes, 0);
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
        result = result * sizeStepPercent;
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
        // если минимальное значение меньше ноля, то
        // "сдвигаем" переданное значение (value) и максимальное значение (maxVal)
        // на минимальное значение (minVal) по модулю
        if (minVal < 0) {
            maxVal += (minVal * -1);
            value += (minVal * -1);
        }
        result = (value / maxVal) * 100;
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
     * @param {any} value Значение свойства.
     * @returns {AbacusOptions | number | string | number[] | boolean | null | AbacusClasses | undefined}
     */
    View.prototype.option = function (optionName, value) {
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
                    if (value !== undefined) {
                        // это условие для установки конкретного свойства слайдера
                        var newProperty = {};
                        // newProperty[optionName] = value;
                        newProperty[optionName] = value;
                        this._presenter.setModelAbacusProperty(newProperty);
                    }
                    else {
                        // это условие для получения конкретного свойства слайдера
                        return this._presenter.getModelAbacusProperty()[optionName];
                    }
                    break;
            }
        }
        else if (typeof value === 'object') {
            // это условие для установки одного или несколько свойств слайдера в виде объекта
            this._presenter.setModelAbacusProperty(value);
        }
        else {
            // это условие для получения всех свойств слайдера в виде объекта
            return this._presenter.getModelAbacusProperty();
        }
    };
    /**
     * Функция обновления Вида плагина (в том числе пользовательского интерфейса).
     */
    View.prototype.updateView = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        var abacusProperty = this._presenter.getModelAbacusProperty();
        // Добавляем или удалаем элементы инерфейса
        // if( ! this._widgetContainer.htmlElement.contains(this._handles[0].htmlElement) ){
        //   this._widgetContainer.htmlElement.append(this._handles[0].htmlElement);
        // }
        if (((_a = this._cachedAbacusProperty) === null || _a === void 0 ? void 0 : _a.range) !== abacusProperty.range) {
            this._createViewHandles(abacusProperty);
            this._createViewRange(abacusProperty);
        }
        if (((_b = this._cachedAbacusProperty) === null || _b === void 0 ? void 0 : _b.orientation) !== abacusProperty.orientation) {
            if (abacusProperty.orientation === 'vertical') {
                this._isVertical = true;
                this._widgetContainer.isVertical(true);
            }
            else {
                this._isVertical = false;
                this._widgetContainer.isVertical(false);
            }
        }
        if (((_c = this._cachedAbacusProperty) === null || _c === void 0 ? void 0 : _c.tooltip) !== abacusProperty.tooltip
            || ((_d = this._cachedAbacusProperty) === null || _d === void 0 ? void 0 : _d.range) !== abacusProperty.range) {
            this._createViewTooltips(abacusProperty);
            this._updateViewTooltips(abacusProperty);
            this._setTransition();
        }
        if (((_e = this._cachedAbacusProperty) === null || _e === void 0 ? void 0 : _e.animate) !== abacusProperty.animate) {
            this._setTransition();
        }
        // Обновляем положение бегунка и индикатора
        if ((((_f = this._cachedAbacusProperty) === null || _f === void 0 ? void 0 : _f.range) !== abacusProperty.range)
            || (((_g = this._cachedAbacusProperty) === null || _g === void 0 ? void 0 : _g.max) !== abacusProperty.max)
            || (((_h = this._cachedAbacusProperty) === null || _h === void 0 ? void 0 : _h.min) !== abacusProperty.min)
            || (((_j = this._cachedAbacusProperty) === null || _j === void 0 ? void 0 : _j.orientation) !== abacusProperty.orientation)
            || !View.arrayCompare((_k = this._cachedAbacusProperty) === null || _k === void 0 ? void 0 : _k.values, abacusProperty.values)) {
            this._updateViewHandles(abacusProperty);
            this._updateViewTooltips(abacusProperty);
            this._updateViewRange(abacusProperty);
            this._highlightMarks();
        }
        if (!View.arrayCompare((_l = this._cachedAbacusProperty) === null || _l === void 0 ? void 0 : _l.values, abacusProperty.values)) {
            this._findMovedHandle();
            this._eventChangeWrapper();
        }
        // Обновляем названия классов
        if (abacusProperty.classes) {
            this._updateClassNames(abacusProperty.classes);
        }
        // Включаем или отключаем слайдер
        if (((_m = this._cachedAbacusProperty) === null || _m === void 0 ? void 0 : _m.disabled) !== abacusProperty.disabled) {
            this.toggleDisable(abacusProperty.disabled);
        }
        // Создаем шкалу значений
        if ((((_o = this._cachedAbacusProperty) === null || _o === void 0 ? void 0 : _o.scale) !== abacusProperty.scale)
            || (((_p = this._cachedAbacusProperty) === null || _p === void 0 ? void 0 : _p.step) !== abacusProperty.step)
            || (((_q = this._cachedAbacusProperty) === null || _q === void 0 ? void 0 : _q.max) !== abacusProperty.max)
            || (((_r = this._cachedAbacusProperty) === null || _r === void 0 ? void 0 : _r.min) !== abacusProperty.min)
            || (((_s = this._cachedAbacusProperty) === null || _s === void 0 ? void 0 : _s.orientation) !== abacusProperty.orientation)) {
            if (abacusProperty.scale) {
                this._createScale();
                this._setTransition();
            }
            else {
                this._removeScale();
            }
            this._highlightMarks();
        }
        this._cachedAbacusProperty = this._getCloneAbacusProperty(abacusProperty);
    };
    /**
     * Функция создания или удаления ручек слайдера.
     * @private
     * @param {AbacusOptions} abacusProperty Свойства плагина.
     */
    View.prototype._createViewHandles = function (abacusProperty) {
        var _a;
        var viewInstance = this;
        var handleIndexes = []; // массив с индексами ручек слайдера.
        if (!((_a = viewInstance._handles) === null || _a === void 0 ? void 0 : _a.length)) {
            viewInstance._handles = [];
            viewInstance._handles[0] = new Handle_1.Handle(abacusProperty.classes, 0);
            viewInstance._widgetContainer.htmlElement.append(viewInstance._handles[0].htmlElement);
            this._currentHandle = this._handles[0];
            handleIndexes.push(0);
        }
        switch (abacusProperty.range) {
            case true:
                viewInstance._handles[1] = new Handle_1.Handle(abacusProperty.classes, 1);
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
                viewInstance._currentHandle = viewInstance._handles[0];
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
        for (var i = 0; i < handleIndexes.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * Функция обновления ручек слайдера, а именно их местоположение.
     * @private
     * @param {AbacusOptions} abacusProperty Свойства плагина.
     */
    View.prototype._updateViewHandles = function (abacusProperty) {
        if (!abacusProperty.values) {
            return;
        }
        for (var i = 0; i < abacusProperty.values.length; i++) {
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
     * @param {AbacusOptions} abacusProperty Свойства плагина.
     */
    View.prototype._createViewTooltips = function (abacusProperty) {
        for (var i = 0; i < this._tooltips.length; i++) {
            this._tooltips[i].htmlElement.remove();
        }
        this._tooltips = [];
        if (abacusProperty.tooltip) {
            var countTooltips = abacusProperty.range === true ? 2 : 1;
            for (var i = 0; i < countTooltips; i++) {
                this._tooltips[i] = new Tooltip_1.Tooltip(abacusProperty.classes, i);
                this._widgetContainer.htmlElement.append(this._tooltips[i].htmlElement);
                this._tooltips[i].isVisible(true);
            }
        }
    };
    /**
     * Функция обновления подсказок слайдера, а именно местоположение и текст.
     * @private
     * @param {AbacusOptions} abacusProperty Свойства плагина.
     */
    View.prototype._updateViewTooltips = function (abacusProperty) {
        if (!abacusProperty.values || !abacusProperty.tooltip) {
            return;
        }
        for (var i = 0; i < abacusProperty.values.length; i++) {
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
     * @param {AbacusOptions} abacusProperty Свойства плагина.
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
     * @param {AbacusOptions} abacusProperty Свойства плагина.
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
                    this._range.htmlElement.style.bottom = posHandle0.toString() + '%';
                    this._range.htmlElement.style.top = '';
                    this._range.height = posHandle1 - posHandle0;
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
                    this._range.htmlElement.style.left = posHandle0.toString() + '%';
                    this._range.htmlElement.style.right = '';
                    this._range.width = posHandle1 - posHandle0;
                    break;
            }
        }
    };
    /**
     * Функция обновления индикатора (progress bar) слайдера, а именно местоположение и размер.
     * @private
     * @param {AbacusOptions} abacusProperty Свойства плагина.
     */
    View.prototype._updateClassNames = function (abacusClasses) {
        var e_1, _a, e_2, _b, e_3, _c;
        var _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        if (((_e = (_d = this._cachedAbacusProperty) === null || _d === void 0 ? void 0 : _d.classes) === null || _e === void 0 ? void 0 : _e.abacus) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.abacus)) {
            this._widgetContainer.className = abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.abacus;
        }
        if (((_g = (_f = this._cachedAbacusProperty) === null || _f === void 0 ? void 0 : _f.classes) === null || _g === void 0 ? void 0 : _g.vertical) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.vertical)) {
            this._widgetContainer.classNameVertical = abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.vertical;
        }
        if (((_j = (_h = this._cachedAbacusProperty) === null || _h === void 0 ? void 0 : _h.classes) === null || _j === void 0 ? void 0 : _j.disabled) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.disabled)) {
            this._widgetContainer.classNameDisabled = abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.disabled;
        }
        if (((_l = (_k = this._cachedAbacusProperty) === null || _k === void 0 ? void 0 : _k.classes) === null || _l === void 0 ? void 0 : _l.handle) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.handle)) {
            for (var i = 0; i < this._handles.length; i++) {
                this._handles[i].className = abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.handle;
            }
        }
        if (((_o = (_m = this._cachedAbacusProperty) === null || _m === void 0 ? void 0 : _m.classes) === null || _o === void 0 ? void 0 : _o.range) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.range)) {
            this._range.className = abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.range;
        }
        if (((_q = (_p = this._cachedAbacusProperty) === null || _p === void 0 ? void 0 : _p.classes) === null || _q === void 0 ? void 0 : _q.mark) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.mark)) {
            try {
                for (var _v = __values(this._mapScale), _w = _v.next(); !_w.done; _w = _v.next()) {
                    var markItem = _w.value;
                    if (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.mark) {
                        markItem[1].className = abacusClasses.mark;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_w && !_w.done && (_a = _v.return)) _a.call(_v);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (((_s = (_r = this._cachedAbacusProperty) === null || _r === void 0 ? void 0 : _r.classes) === null || _s === void 0 ? void 0 : _s.markSelected) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.markSelected)) {
            try {
                for (var _x = __values(this._mapScale), _y = _x.next(); !_y.done; _y = _x.next()) {
                    var markItem = _y.value;
                    if (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.markSelected) {
                        markItem[1].classNameSelected = abacusClasses.markSelected;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_y && !_y.done && (_b = _x.return)) _b.call(_x);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (((_u = (_t = this._cachedAbacusProperty) === null || _t === void 0 ? void 0 : _t.classes) === null || _u === void 0 ? void 0 : _u.markInrange) !== (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.markInrange)) {
            try {
                for (var _z = __values(this._mapScale), _0 = _z.next(); !_0.done; _0 = _z.next()) {
                    var markItem = _0.value;
                    if (abacusClasses === null || abacusClasses === void 0 ? void 0 : abacusClasses.markInrange) {
                        markItem[1].classNameInrange = abacusClasses.markInrange;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_0 && !_0.done && (_c = _z.return)) _c.call(_z);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
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
        uiData.abacusProperty = this._getCloneAbacusProperty(modelData);
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
        var viewInstance = this;
        if (!event) {
            event = viewInstance._customEventChange;
        }
        var dispatchEventResult = viewInstance._widgetContainer.htmlElement.dispatchEvent(viewInstance._customEventChange);
        var abacusProperty = viewInstance._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.change) === 'function') {
            abacusProperty.change(event, viewInstance._getEventUIData());
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
        var viewInstance = this;
        if (!event) {
            event = viewInstance._customEventCreate;
        }
        var dispatchEventResult = viewInstance._widgetContainer.htmlElement.dispatchEvent(viewInstance._customEventCreate);
        var abacusProperty = viewInstance._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.create) === 'function') {
            abacusProperty.create(event, viewInstance._getEventUIData());
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
        var viewInstance = this;
        if (!event) {
            event = viewInstance._customEventSlide;
        }
        var dispatchEventResult = viewInstance._widgetContainer.htmlElement.dispatchEvent(viewInstance._customEventSlide);
        var abacusProperty = viewInstance._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.slide) === 'function') {
            abacusProperty.slide(event, viewInstance._getEventUIData());
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
        var viewInstance = this;
        if (!event) {
            event = viewInstance._customEventStart;
        }
        var dispatchEventResult = viewInstance._widgetContainer.htmlElement.dispatchEvent(viewInstance._customEventStart);
        var abacusProperty = viewInstance._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.start) === 'function') {
            abacusProperty.start(event, viewInstance._getEventUIData());
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
        var viewInstance = this;
        if (!event) {
            event = viewInstance._customEventStop;
        }
        var dispatchEventResult = viewInstance._widgetContainer.htmlElement.dispatchEvent(viewInstance._customEventStop);
        var abacusProperty = viewInstance._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.stop) === 'function') {
            abacusProperty.stop(event, viewInstance._getEventUIData());
        }
        return dispatchEventResult;
    };
    /**
     * Функция, обрабатывающая позицию мыши или касания.
     * @deprecated
     * @private
     * @param {MouseEvent | TouchEvent} event Объект события мыши или касания.
     */
    View.prototype._mouseHandler = function (event) {
        var _a, _b;
        var viewInstance = this;
        var abacusProperty = viewInstance._presenter.getModelAbacusProperty();
        if (!((_a = abacusProperty.values) === null || _a === void 0 ? void 0 : _a.length)) {
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
        var newValues = [];
        if (abacusProperty.values) {
            newValues = (_b = abacusProperty.values) === null || _b === void 0 ? void 0 : _b.slice(0);
        }
        if (abacusProperty.range === true && abacusProperty.values) {
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
        viewInstance._presenter.setAbacusValue(newValues);
        if (!View.arrayCompare(this._cachedAbacusProperty.values, abacusProperty.values)) {
            viewInstance.updateView();
            viewInstance._eventChangeWrapper(event);
        }
    };
    /**
     * Функция, которая вычисляет, какие значения были изменены, и передает их через Представителя в Модель.
     * @private
     * @param {number} valueUnrounded Значение, полученное из позиции клика мыши или касания.
     */
    View.prototype._calcHandleValues = function (valueUnrounded) {
        var _a, _b;
        if (isNaN(valueUnrounded)) {
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
        if (abacusProperty.range === true && abacusProperty.values) {
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
        // if( ! View.arrayCompare(this._cachedAbacusProperty.values, abacusProperty.values) ){
        //   viewInstance.updateView();
        //   viewInstance._eventChangeWrapper(event);
        // }
        viewInstance._presenter.setAbacusValue(newValues);
    };
    /**
     * Установка обработчиков событий.
     * @private
     */
    View.prototype._bindEventListeners = function () {
        var viewInstance = this;
        viewInstance._widgetContainer.htmlElement.addEventListener('click', viewInstance._handlerWidgetContainerClick.bind(viewInstance));
        viewInstance._widgetContainer.htmlElement.addEventListener('touchend', viewInstance._handlerWidgetContainerClick.bind(viewInstance));
        document.addEventListener('mousemove', viewInstance._handlerHandleItemClickMove.bind(viewInstance), { passive: true });
        document.addEventListener('touchmove', viewInstance._handlerHandleItemClickMove.bind(viewInstance), { passive: true });
        document.addEventListener('mouseup', viewInstance._handlerHandleItemClickStop.bind(viewInstance));
        document.addEventListener('touchend', viewInstance._handlerHandleItemClickStop.bind(viewInstance));
        document.addEventListener('touchcancel', viewInstance._handlerHandleItemClickStop.bind(viewInstance));
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
        if (viewInstance._isDisabled
            || eventTarget.classList.contains(handleClass)
            || eventTarget.classList.contains(markClass)) {
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
        var _this = this;
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
                // viewInstance._mouseHandler(event);
                var coordinate = 0;
                if (event instanceof MouseEvent) {
                    coordinate = _this._isVertical ? event.clientY : event.clientX;
                }
                else if (event instanceof TouchEvent) {
                    coordinate = _this._isVertical ? event.changedTouches[0].screenY : event.changedTouches[0].screenX;
                }
                var percent = _this.getPosPercent(coordinate);
                var valueUnrounded = _this.getValFromPosPercent(percent);
                viewInstance._calcHandleValues(valueUnrounded);
                viewInstance._eventSlideWrapper(event);
            }
        }, 15);
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
        var e_4, _a, e_5, _b;
        if (this._mapScale.size) {
            this._removeScale();
        }
        var abacusProperty = this._presenter.getModelAbacusProperty();
        if (abacusProperty.min !== undefined && abacusProperty.max !== undefined && abacusProperty.step !== undefined) {
            var value = abacusProperty.min;
            for (; value <= abacusProperty.max; value += abacusProperty.step) {
                value = View.round(value, abacusProperty.step);
                var mark = new Mark_1.Mark(abacusProperty.classes);
                var left = this.getPosFromValue(value);
                if (this._isVertical)
                    mark.posBottom = left;
                else
                    mark.posLeft = left;
                mark.htmlElement.innerText = value.toString();
                this._mapScale.set(value, mark);
            }
            if (value !== abacusProperty.max) {
                var mark = new Mark_1.Mark(abacusProperty.classes);
                var left = this.getPosFromValue(abacusProperty.max);
                if (this._isVertical)
                    mark.posBottom = left;
                else
                    mark.posLeft = left;
                mark.htmlElement.innerText = abacusProperty.max.toString();
                this._mapScale.set(value, mark);
            }
        }
        if (this._widgetContainer.htmlElement.contains(this._handles[0].htmlElement)) {
            try {
                for (var _c = __values(this._mapScale.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var mark = _d.value;
                    this._handles[0].htmlElement.before(mark.htmlElement);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        else {
            try {
                for (var _e = __values(this._mapScale.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var mark = _f.value;
                    this._widgetContainer.htmlElement.append(mark.htmlElement);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        this._thinOutScale();
        this._bindEventListenersOnMarks();
    };
    /**
     * Удаляет шкалу значений.
     * @private
     */
    View.prototype._removeScale = function () {
        var e_6, _a;
        try {
            for (var _b = __values(this._mapScale.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mark = _c.value;
                mark.htmlElement.remove();
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        this._mapScale.clear();
    };
    /**
     * Функция удаления лишних меток на шкале значений для того, чтобы они не "слипались" друг с другом.
     * @private
     */
    View.prototype._thinOutScale = function () {
        var e_7, _a, e_8, _b, e_9, _c, e_10, _d, e_11, _e;
        var _f;
        var sizeWidget;
        if (this._isVertical) {
            sizeWidget = this._widgetContainer.htmlElement.offsetHeight;
        }
        else {
            sizeWidget = this._widgetContainer.htmlElement.offsetWidth;
        }
        var k = 7; // Минимальное расстояние между метка шкалы.
        var sizeMarks = 0;
        if (this._isVertical) {
            try {
                for (var _g = __values(this._mapScale.values()), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var mark = _h.value;
                    sizeMarks += mark.htmlElement.offsetHeight + k;
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_a = _g.return)) _a.call(_g);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        else {
            try {
                for (var _j = __values(this._mapScale.values()), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var mark = _k.value;
                    sizeMarks += mark.htmlElement.offsetWidth + k;
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_b = _j.return)) _b.call(_j);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
        if (sizeWidget < sizeMarks) {
            var abacusProperty = this._presenter.getModelAbacusProperty();
            if (abacusProperty.min !== undefined && abacusProperty.max !== undefined && abacusProperty.step !== undefined) {
                var isDelete = false;
                try {
                    for (var _l = __values(this._mapScale), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var mark = _m.value;
                        if (mark[0] === abacusProperty.min || mark[0] === abacusProperty.max || isDelete) {
                            isDelete = false;
                            continue;
                        }
                        (_f = mark[1]) === null || _f === void 0 ? void 0 : _f.htmlElement.remove();
                        this._mapScale.delete(mark[0]);
                        isDelete = true;
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_c = _l.return)) _c.call(_l);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
        }
        sizeMarks = 0;
        if (this._isVertical) {
            try {
                for (var _o = __values(this._mapScale.values()), _p = _o.next(); !_p.done; _p = _o.next()) {
                    var mark = _p.value;
                    sizeMarks += mark.htmlElement.offsetHeight + k;
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_p && !_p.done && (_d = _o.return)) _d.call(_o);
                }
                finally { if (e_10) throw e_10.error; }
            }
        }
        else {
            try {
                for (var _q = __values(this._mapScale.values()), _r = _q.next(); !_r.done; _r = _q.next()) {
                    var mark = _r.value;
                    sizeMarks += mark.htmlElement.offsetWidth + k;
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_r && !_r.done && (_e = _q.return)) _e.call(_q);
                }
                finally { if (e_11) throw e_11.error; }
            }
        }
        if (sizeWidget < sizeMarks) {
            this._thinOutScale();
        }
    };
    /**
     * Функция меняет состояния меток в шкале значений.
     * @private
     */
    View.prototype._highlightMarks = function () {
        var e_12, _a;
        var _b;
        if (!this._mapScale.size) {
            return;
        }
        var abacusProperty = this._presenter.getModelAbacusProperty();
        var rangeType = abacusProperty.range;
        if (abacusProperty.min !== undefined
            && abacusProperty.max !== undefined
            && abacusProperty.step !== undefined
            && ((_b = abacusProperty.values) === null || _b === void 0 ? void 0 : _b.length)) {
            try {
                for (var _c = __values(this._mapScale), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var markItem = _d.value;
                    if (rangeType === 'min' && markItem[0] <= abacusProperty.values[0]) {
                        markItem[1].isInrange(true);
                    }
                    else if (rangeType === 'max' && markItem[0] >= abacusProperty.values[0]) {
                        markItem[1].isInrange(true);
                    }
                    else if (rangeType === true
                        && markItem[0] >= abacusProperty.values[0]
                        && markItem[0] <= abacusProperty.values[1]) {
                        markItem[1].isInrange(true);
                    }
                    else {
                        markItem[1].isInrange(false);
                    }
                    if (markItem[0] === abacusProperty.values[0] || markItem[0] === abacusProperty.values[1]) {
                        markItem[1].isSelected(true);
                    }
                    else {
                        markItem[1].isSelected(false);
                    }
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_12) throw e_12.error; }
            }
        }
    };
    /**
     * Функция установки обработчиков на метки шкалы значений.
     * @private
     */
    View.prototype._bindEventListenersOnMarks = function () {
        var e_13, _a;
        var _this = this;
        var _loop_2 = function (mark) {
            // я оставил эти обработчики в таком виде,
            // так как мне нужна ссылка на объект View и значение метки, на которую кликнули.
            mark[1].htmlElement.addEventListener('click', function (event) {
                var _a;
                var viewInstance = _this;
                if (viewInstance._isDisabled) {
                    return;
                }
                var value = mark[0];
                if (((_a = viewInstance._cachedAbacusProperty) === null || _a === void 0 ? void 0 : _a.value) !== value) {
                    viewInstance._calcHandleValues(value);
                }
            });
            mark[1].htmlElement.addEventListener('touchend', function (event) {
                var _a;
                var viewInstance = _this;
                if (viewInstance._isDisabled) {
                    return;
                }
                var value = mark[0];
                if (((_a = viewInstance._cachedAbacusProperty) === null || _a === void 0 ? void 0 : _a.value) !== value) {
                    viewInstance._calcHandleValues(value);
                }
            });
        };
        try {
            for (var _b = __values(this._mapScale), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mark = _c.value;
                _loop_2(mark);
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_13) throw e_13.error; }
        }
    };
    /**
     * Установка css-свойства "transition" элементам интерфейса слайдера.
     * Первоначальное значение береться из model.abacusProperty.aniamte.
     * @private
     */
    View.prototype._setTransition = function () {
        var e_14, _a;
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
        duration = duration ? duration + 'ms' : '';
        for (var i = 0; i < this._handles.length; i++) {
            this._handles[i].htmlElement.style.transition = duration;
            if (this._tooltips[i]) {
                this._tooltips[i].htmlElement.style.transition = duration;
            }
        }
        this._range.htmlElement.style.transition = duration;
        if (this._mapScale) {
            try {
                for (var _b = __values(this._mapScale), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var markItem = _c.value;
                    markItem[1].htmlElement.style.transition = duration;
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_14) throw e_14.error; }
            }
        }
    };
    View.prototype._getCloneAbacusProperty = function (abacusProperty) {
        var _a;
        var cloneProperty = {};
        Object.assign(cloneProperty, abacusProperty);
        cloneProperty.values = (_a = abacusProperty.values) === null || _a === void 0 ? void 0 : _a.slice(0);
        Object.assign(cloneProperty.classes, abacusProperty.classes);
        return cloneProperty;
    };
    View.prototype._findMovedHandle = function () {
        var _a, _b;
        var abacusProperty = this._presenter.getModelAbacusProperty();
        this._currentHandle = this._handles[0];
        if (((_a = this._cachedAbacusProperty.values) === null || _a === void 0 ? void 0 : _a.length) && ((_b = abacusProperty.values) === null || _b === void 0 ? void 0 : _b.length)) {
            if (this._cachedAbacusProperty.values[1] !== abacusProperty.values[1]) {
                this._currentHandle = this._handles[1];
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
        return ~(x + '').indexOf('.') ? (x + '').split('.')[1].length : 0;
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
        if (numbersAfterPoint > 0) {
            value = parseFloat(value.toFixed(numbersAfterPoint));
        }
        else {
            value = Math.round(value);
        }
        return value;
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
        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    };
    return View;
}());
exports.View = View;


/***/ }),

/***/ "./src/scripts/WidgetContainer.ts":
/*!****************************************!*\
  !*** ./src/scripts/WidgetContainer.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WidgetContainer = void 0;
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
            if (!!value) {
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
            if (!!value) {
                this._htmlElement.classList.add(this._classNameVertical);
            }
            else {
                this._htmlElement.classList.remove(this._classNameVertical);
            }
        }
    };
    return WidgetContainer;
}());
exports.WidgetContainer = WidgetContainer;


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
var View_1 = __webpack_require__(/*! ./View */ "./src/scripts/View.ts");
jquery_1.default.fn.abacus = function (paramOptions, param1, param2) {
    var returnResult = this;
    this.each(function () {
        var instanceHTMLAbacus = this;
        var view;
        // получение или инициализация плагина
        if (instanceHTMLAbacus.jqueryAbacusInstance instanceof View_1.View) {
            view = instanceHTMLAbacus.jqueryAbacusInstance;
        }
        else {
            if (typeof paramOptions === 'object') {
                view = new View_1.View(instanceHTMLAbacus, paramOptions);
            }
            else {
                view = new View_1.View(instanceHTMLAbacus);
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
            }
        }
        // instanceHTMLAbacus.addEventListener('change', (event: Event) => {
        //   let input = event.currentTarget as HTMLInputElement;
        //   let value: string = input.value;
        //   console.log('value == ' + value);
        // });
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
//# sourceMappingURL=abacus.js.map?v=bdcb25bc20943a1d6a78