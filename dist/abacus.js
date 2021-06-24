/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/abacus.scss":
/*!********************************!*\
  !*** ./src/styles/abacus.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scripts/Handle.ts":
/*!*******************************!*\
  !*** ./src/scripts/Handle.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


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
     * @param  {string} className - Название класса HTML-элемента. По умолчанию равно "abacus__handle".
     */
    function Handle(className, handleIndex) {
        /**
         * Позиция бегунка в процентах от 0 до 100 по горизонтали от левого края.
         * @type {number}
         * @private
         */
        this._posLeft = 0;
        /**
         * Позиция бегунка в процентах от 0 до 100 по вертикали от нижнего края.
         * @type {number}
         * @private
         */
        this._posBottom = 0;
        /**
         * Номер (индекс) бегунка. Может принимать значение 0 или 1.
         * @type {number}
         * @private
         */
        this._handleIndex = 0;
        this._htmlElement = document.createElement('span');
        this._className = className ? className : 'abacus__handle';
        this._htmlElement.classList.add(this._className);
        if (handleIndex != null) {
            this._handleIndex = handleIndex;
        }
    }
    Object.defineProperty(Handle.prototype, "posLeft", {
        /**
         * Геттер позиции бегунка в процентах от левого края.
         * @returns {number} - Позиция бегунка в процентах от 0 до 100.
         */
        get: function () {
            return this._posLeft;
        },
        /**
         * Сеттер позиции бегунка в процентах от левого края.
         * @param {number} - Позиция бегунка в процентах от 0 до 100.
         */
        set: function (left) {
            if (left < 0)
                left = 0;
            if (left > 100)
                left = 100;
            this._posLeft = left;
            this._htmlElement.style.left = left + '%';
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
         * @param {string} name - Название класса.
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

/***/ "./src/scripts/Model.ts":
/*!******************************!*\
  !*** ./src/scripts/Model.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Model = void 0;
/**
 * Класс Model реализует "Модель" паттерна проектирования MVP.
 * В этом классе хранится данные слайдера, а также бизнес логика работы с этими данными.
 */
var Model = /** @class */ (function () {
    /**
     * @this Model
     * @param {AbacusOptions} data - Свойства слайдера.
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
                handle: 'abacus__handle',
                range: 'abacus__range',
                disabled: 'abacus_disabled',
            },
            disabled: false,
            max: 100,
            min: 0,
            orientation: 'horizontal',
            range: false,
            step: 1,
            value: 0,
            values: null,
        };
        if (data) {
            this.abacusProperty = data;
        }
        this._eventTarget = new EventTarget();
        this._eventUpdateModel = new CustomEvent('update-model');
    }
    Object.defineProperty(Model.prototype, "abacusProperty", {
        /**
         * Геттер свойств слайдера.
         * @returns {AbacusOptions} - Свойства слайдера, хранящиеся в Модели.
         */
        get: function () {
            return this._abacusProperty;
        },
        /**
         * Сеттер свойств слайдера.
         * @param {AbacusOptions} abacusProperty - Свойства слайдера, которые нужно добавить в Модель.
         */
        set: function (abacusProperty) {
            // animate
            if (abacusProperty.animate !== undefined) {
                if (abacusProperty.animate == 'fast'
                    || abacusProperty.animate == 'slow'
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
                var arrClassName = ['abacus', 'range', 'handle', 'disabled'];
                for (var i = 0; i < arrClassName.length; i++) {
                    if (typeof abacusProperty.classes[arrClassName[i]] === 'string' && this._abacusProperty.classes) {
                        this._abacusProperty.classes[arrClassName[i]] = abacusProperty.classes[arrClassName[i]];
                    }
                }
            }
            // disabled
            if (abacusProperty.disabled !== undefined) {
                this._abacusProperty.disabled = !!abacusProperty.disabled;
            }
            //max
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
            //min
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
            //step
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
            //value
            if (abacusProperty.value !== undefined && abacusProperty.value !== null) {
                if (!isNaN(abacusProperty.value)) {
                    if (typeof abacusProperty.value === 'string') {
                        abacusProperty.value = parseFloat(abacusProperty.value);
                    }
                    abacusProperty.value = this.roundValuePerStep(abacusProperty.value);
                    this._abacusProperty.value = abacusProperty.value;
                }
            }
            //orientation
            if (abacusProperty.orientation !== undefined) {
                if (abacusProperty.orientation == 'vertical') {
                    this._abacusProperty.orientation = 'vertical';
                }
                else {
                    this._abacusProperty.orientation = 'horizontal';
                }
            }
            //range
            if (abacusProperty.range !== undefined) {
                if (abacusProperty.range === false || abacusProperty.range === true) {
                    this._abacusProperty.range = abacusProperty.range;
                }
                else if (abacusProperty.range == 'max') {
                    this._abacusProperty.range = 'max';
                }
                else if (abacusProperty.range == 'min') {
                    this._abacusProperty.range = 'min';
                }
            }
            //change
            if (abacusProperty.change !== undefined) {
                this._abacusProperty.change = abacusProperty.change;
            }
            //create
            if (abacusProperty.create !== undefined) {
                this._abacusProperty.create = abacusProperty.create;
            }
            //slide
            if (abacusProperty.slide !== undefined) {
                this._abacusProperty.slide = abacusProperty.slide;
            }
            //start
            if (abacusProperty.start !== undefined) {
                this._abacusProperty.start = abacusProperty.start;
            }
            //stop
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
         * @param {number} value - Текущее значение слайдера.
         */
        set: function (value) {
            this._abacusProperty.value = this.roundValuePerStep(value);
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
     * @param {number} value - Текущее значение слайдера.
     * @returns {number} - Значение слайдера, округленное до ближайшего шага.
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
        return result;
    };
    return Model;
}());
exports.Model = Model;


/***/ }),

/***/ "./src/scripts/Presenter.ts":
/*!**********************************!*\
  !*** ./src/scripts/Presenter.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Presenter = void 0;
var Model_1 = __webpack_require__(/*! ./Model */ "./src/scripts/Model.ts");
/**
 * Класс Presenter реализует "Представителя" паттерна проектирования MVP.
 * Соответственно, он отвечает за передачу данных от Вида к Модели и обратно.
 */
var Presenter = /** @class */ (function () {
    /**
     * @this Presenter
     * @param {AbacusOptions} options - Свойства слайдера. Например, минимальное, максимальное и текущее значения.
     */
    function Presenter(options) {
        var presenterInstance = this;
        this._model = new Model_1.Model(options);
        this._eventTarget = new EventTarget();
        this._eventUpdateModel = new CustomEvent('update-model');
        this._model.eventTarget.addEventListener('update-model', function (event) {
            presenterInstance._eventTarget.dispatchEvent(presenterInstance._eventUpdateModel);
        });
    }
    /**
     * Функция получения свойств слайдера, полученные из Модели.
     * @returns {AbacusOptions} - Свойства слайдера, полученные из Модели.
     */
    Presenter.prototype.getModelAbacusProperty = function () {
        return this._model.abacusProperty;
    };
    /**
     * Функция получения свойств слайдера, полученные из Модели.
     * @returns {AbacusOptions} - Свойства слайдера, полученные из Модели.
     */
    Presenter.prototype.setModelAbacusProperty = function (abacusProperty) {
        this._model.abacusProperty = abacusProperty;
    };
    /**
     * Функция установки текущего значения слайдера.
     * @param {number} value - Текущее значение слайдера.
     */
    Presenter.prototype.setAbacusValue = function (value) {
        this._model.value = value;
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
     * @param  {string} className - Название класса HTML-элемента. По умолчанию равно "abacus__range".
     */
    function Range(className) {
        /**
         * Ширина HTML-элемента от 0 до 100 в процентах.
         * @type {number}
         * @private
         */
        this._width = 100;
        /**
         *
         * @param className
         */
        this._rangeType = RangeType.HIDDEN;
        this._htmlElement = document.createElement('span');
        this._className = className ? className : 'abacus__range';
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
         * @param {number} width - ширина в процентах от 0 до 100.
         */
        set: function (width) {
            if (width < 0)
                width = 0;
            if (width > 100)
                width = 100;
            this._width = width;
            this._htmlElement.style.width = width + '%';
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
         * @param {string} name - Название класса.
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

/***/ "./src/scripts/View.ts":
/*!*****************************!*\
  !*** ./src/scripts/View.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.View = void 0;
var Presenter_1 = __webpack_require__(/*! ./Presenter */ "./src/scripts/Presenter.ts");
var WidgetContainer_1 = __webpack_require__(/*! ./WidgetContainer */ "./src/scripts/WidgetContainer.ts");
var Handle_1 = __webpack_require__(/*! ./Handle */ "./src/scripts/Handle.ts");
var Range_1 = __webpack_require__(/*! ./Range */ "./src/scripts/Range.ts");
/**
 * Класс View реализует "Представление" или "Вид" паттерна проектирования MVP.
 * Соответственно, он отвечает за отрисовку интерфейса плагина, получение данных от пользователя и отображение данных,
 * находящихся в Модели.
 */
var View = /** @class */ (function () {
    /**
     * @constructor
     * @this   {View}
     * @param  {HTMLAbacusElement} abacusHtmlContainer - HTML-элемент, в котором будет находиться инициализированный плагин.
     * @param  {AbacusOptions} options - Параметры настройки плагина.
     * @param  {object} data - Другие данные.
     */
    function View(abacusHtmlContainer, options, data) {
        var _this = this;
        var _a, _b, _c;
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
        var viewInstance = this;
        this._presenter = new Presenter_1.Presenter(options);
        this._presenter.eventTarget.addEventListener('update-model', function (event) {
            // console.log('Модель обновилась!');
            viewInstance.updateView();
        });
        var abacusProperty = this._presenter.getModelAbacusProperty();
        this._widgetContainer = new WidgetContainer_1.WidgetContainer(abacusHtmlContainer, (_a = abacusProperty.classes) === null || _a === void 0 ? void 0 : _a.abacus);
        this._widgetContainer.htmlElement.innerHTML = '';
        this._handleItem = new Handle_1.Handle((_b = abacusProperty.classes) === null || _b === void 0 ? void 0 : _b.handle);
        this._range = new Range_1.Range((_c = abacusProperty.classes) === null || _c === void 0 ? void 0 : _c.range);
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
        // обработчики ------
        this._widgetContainer.htmlElement.addEventListener('click', function (event) {
            event.preventDefault();
            if (viewInstance._isDisabled || event.target === _this._handleItem.htmlElement) {
                return;
            }
            viewInstance._mouseHandler(event);
        });
        this._handleItem.htmlElement.addEventListener('mousedown', function (event) {
            event.preventDefault();
            if (viewInstance._isDisabled) {
                return;
            }
            viewInstance._isDragHandle = true;
            viewInstance._eventStartWrapper(event);
        }, { passive: true });
        var handleMovingTimer = null;
        document.addEventListener('mousemove', function (event) {
            event.preventDefault();
            if (viewInstance._isDisabled) {
                return;
            }
            if (handleMovingTimer !== null) {
                clearTimeout(handleMovingTimer);
            }
            handleMovingTimer = setTimeout(function () {
                if (viewInstance._isDragHandle) {
                    viewInstance._mouseHandler(event);
                    viewInstance._eventSlideWrapper(event);
                }
            }, 15);
        }, { passive: true });
        document.addEventListener('mouseup', function (event) {
            event.preventDefault();
            if (viewInstance._isDragHandle) {
                viewInstance._eventStopWrapper(event);
            }
            viewInstance._isDragHandle = false;
        }, { passive: true });
        // ------
        this.updateView();
        this._eventCreateWrapper();
    }
    Object.defineProperty(View.prototype, "widgetContainer", {
        /**
         * Геттер (функция получения) ссылки объекта-обертки HTML-элемента контейнера плагина.
         * @public
         * @returns {WidgetContainer} Возвращает ссылку на объект-обертку HTML-элемента контейнера плагина.
         */
        get: function () {
            return this._widgetContainer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(View.prototype, "range", {
        /**
         * Геттер (функция получения) ссылки объекта-обертки HTML-элемента индикатора (progress bar).
         * @public
         * @returns {Range} Возвращает ссылку на объект-обертку HTML-элемента индикатора (progress bar).
         */
        get: function () {
            return this._range;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(View.prototype, "handleItem", {
        /**
         * Геттер (функция получения) ссылки объекта-обертки HTML-элемента бегунка.
         * @public
         * @returns {Handle} Возвращает ссылку на объект-обертку HTML-элемента бегунка.
         */
        get: function () {
            return this._handleItem;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Функция, которая получает на входе координату клика по оси Х относительно окна браузера,
     * а возвращает количество процентов от начала (левого края) слайдера.
     * @param {number} clientX - Координата клика по оси Х относительно окна браузера.
     * @returns {number} - Количество процентов от начала (левого края) слайдера.
     */
    View.prototype.getPosLeftPercent = function (clientX) {
        var result = 0;
        var posLeftWidget = this._widgetContainer.htmlElement.getBoundingClientRect().left;
        var widthWidget = this._widgetContainer.htmlElement.getBoundingClientRect().width;
        var leftPx = clientX - posLeftWidget;
        result = (leftPx / widthWidget) * 100;
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
     * @param {number} percent - Позиция бегунка в процентах от начала слайдера.
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
     * @param {number} value - Значение слайдера.
     * @returns {number} Позиция бегунка в процентах от начала слайдера.
     */
    View.prototype.getPosFromValue = function (value) {
        var result = 0;
        var options = this._presenter.getModelAbacusProperty();
        var minVal = options.min;
        var maxVal = options.max;
        // если минимальное значение меньше ноля, то 
        // "сдвигаем" переданное значение (value) и максимальное значение (maxVal) на минимальное значение (minVal) по модулю
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
     * @param {number} posPercent - Позиция бегунка в процентах от начала слайдера.
     * @returns {number} - Значение слайдера.
     */
    View.prototype.getValFromPosPercent = function (posPercent) {
        var abacusValue = 0;
        var options = this._presenter.getModelAbacusProperty();
        var minVal = options.min;
        var maxVal = options.max;
        // если минимальное значение меньше ноля, то 
        // "сдвигаем" переданное значение (value) и максимальное значение (maxVal) на минимальное значение (minVal) по модулю
        if (minVal < 0) {
            maxVal += (minVal * -1);
        }
        abacusValue = (maxVal * posPercent) / 100;
        abacusValue -= (minVal * -1);
        return abacusValue;
    };
    /**
     * Функция получения и установки свойств слайдера.
     * @param {AbacusOptions | string} optionName -
     * @param {any} value -
     * @returns {}
     */
    View.prototype.option = function (optionName, value) {
        if (typeof optionName === 'string') {
            switch (optionName) {
                case 'animate':
                case 'classes':
                case 'disabled':
                case 'max':
                case 'min':
                case 'orientation':
                case 'range':
                case 'step':
                case 'value':
                case 'values':
                    if (value !== undefined) {
                        // это условие для установки конкретного свойства слайдера
                        var newProperty = new Object;
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
     * @returns
     */
    View.prototype.updateView = function () {
        var _a, _b, _c, _d, _e, _f;
        var abacusProperty = this._presenter.getModelAbacusProperty();
        // Добавляем или удалаем элементы инерфейса
        this._widgetContainer.htmlElement.append(this._handleItem.htmlElement);
        if (abacusProperty.range) {
            switch (abacusProperty.range) {
                case 'max':
                    this._range.rangeType = 'max';
                    break;
                default:
                    this._range.rangeType = 'min';
                    break;
            }
            this._widgetContainer.htmlElement.prepend(this._range.htmlElement);
        }
        else {
            this._range.rangeType = 'hidden';
            this._range.htmlElement.remove();
        }
        // Обновляем положение бегунка и индикатора
        var currentValue = abacusProperty.value;
        var posHandle = this.getPosFromValue(currentValue);
        this._handleItem.posLeft = posHandle;
        switch (this._range.rangeType) {
            case 'min':
                this._range.htmlElement.style.left = '0';
                this._range.htmlElement.style.right = 'auto';
                this._range.width = posHandle;
                break;
            case 'max':
                this._range.htmlElement.style.left = 'auto';
                this._range.htmlElement.style.right = '0';
                this._range.width = 100 - posHandle;
                break;
            default:
                break;
        }
        // Обновляем названия классов
        if ((_a = abacusProperty.classes) === null || _a === void 0 ? void 0 : _a.abacus) {
            this._widgetContainer.className = (_b = abacusProperty.classes) === null || _b === void 0 ? void 0 : _b.abacus;
        }
        if ((_c = abacusProperty.classes) === null || _c === void 0 ? void 0 : _c.handle) {
            this._handleItem.className = (_d = abacusProperty.classes) === null || _d === void 0 ? void 0 : _d.handle;
        }
        if ((_e = abacusProperty.classes) === null || _e === void 0 ? void 0 : _e.range) {
            this._range.className = (_f = abacusProperty.classes) === null || _f === void 0 ? void 0 : _f.range;
        }
        // Включаем или отключаем слайдер
        this.toggleDisable(abacusProperty.disabled);
    };
    View.prototype.toggleDisable = function (off) {
        if (off === undefined || off === null) {
            this._isDisabled = !this._isDisabled;
        }
        else {
            this._isDisabled = !!off;
        }
        var abacusPropertyClasses = this._presenter.getModelAbacusProperty().classes;
        if (this._isDisabled) {
            this._widgetContainer.classNameDisabled = (abacusPropertyClasses === null || abacusPropertyClasses === void 0 ? void 0 : abacusPropertyClasses.disabled) ? abacusPropertyClasses.disabled : 'abacus_disabled';
        }
        else {
            this._widgetContainer.classNameDisabled = '';
        }
    };
    /**
     * Функция упаковывает в объект некоторые данные о слайдере и бегунке для обработчиков событий.
     * @private
     * @returns {EventUIData} - Объект класса EventUIData.
     */
    View.prototype._getEventUIData = function () {
        var uiData = {};
        uiData.handle = this._handleItem.htmlElement;
        uiData.handleIndex = this._handleItem.handleIndex;
        var modelData = this._presenter.getModelAbacusProperty();
        uiData.value = modelData.value;
        uiData.values = modelData.values;
        return uiData;
    };
    /**
     * Функция-обертка события "abacus-change". Генерирует событие "abacus-change" и вызывает callback "change".
     * @private
     * @param {Event} event - Объект события. По умолчанию равен объекту события изменения значения слайдера.
     * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков этого события вызвал Event.preventDefault(). В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    View.prototype._eventChangeWrapper = function (event) {
        if (!event) {
            event = this._customEventChange;
        }
        var dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventChange);
        var viewInstance = this;
        var abacusProperty = this._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.change) === 'function') {
            abacusProperty.change(event, viewInstance._getEventUIData());
        }
        return dispatchEventResult;
    };
    /**
     * Функция-обертка события "abacus-create". Генерирует событие "abacus-create" и вызывает callback "create".
     * @private
     * @param {Event} event - Объект события. По умолчанию равен объекту события инициализации плагина.
     * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков этого события вызвал Event.preventDefault(). В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    View.prototype._eventCreateWrapper = function (event) {
        if (!event) {
            event = this._customEventCreate;
        }
        var dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventCreate);
        var viewInstance = this;
        var abacusProperty = this._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.create) === 'function') {
            abacusProperty.create(event, viewInstance._getEventUIData());
        }
        return dispatchEventResult;
    };
    /**
     * Функция-обертка события "abacus-slide". Генерирует событие "abacus-slide" и вызывает callback "slide".
     * @private
     * @param {Event} event - Объект события. По умолчанию равен объекту события перемещения бегунка слайдера.
     * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков этого события вызвал Event.preventDefault(). В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    View.prototype._eventSlideWrapper = function (event) {
        if (!event) {
            event = this._customEventSlide;
        }
        var dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventSlide);
        var viewInstance = this;
        var abacusProperty = this._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.slide) === 'function') {
            abacusProperty.slide(event, viewInstance._getEventUIData());
        }
        return dispatchEventResult;
    };
    /**
     * Функция-обертка события "abacus-start". Генерирует событие "abacus-start" и вызывает callback "start".
     * @private
     * @param {Event} event - Объект события. По умолчанию равен объекту события начала перемещения бегунка слайдера.
     * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков этого события вызвал Event.preventDefault(). В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    View.prototype._eventStartWrapper = function (event) {
        if (!event) {
            event = this._customEventStart;
        }
        var dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventStart);
        var viewInstance = this;
        var abacusProperty = this._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.start) === 'function') {
            abacusProperty.start(event, viewInstance._getEventUIData());
        }
        return dispatchEventResult;
    };
    /**
     * Функция-обертка события "abacus-stop". Генерирует событие "abacus-stop" и вызывает callback "stop".
     * @private
     * @param {Event} event - Объект события. По умолчанию равен объекту события окончания перемещения бегунка слайдера.
     * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков этого события вызвал Event.preventDefault(). В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
     */
    View.prototype._eventStopWrapper = function (event) {
        if (!event) {
            event = this._customEventStop;
        }
        var dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventStop);
        var viewInstance = this;
        var abacusProperty = this._presenter.getModelAbacusProperty();
        if (typeof (abacusProperty === null || abacusProperty === void 0 ? void 0 : abacusProperty.stop) === 'function') {
            abacusProperty.stop(event, viewInstance._getEventUIData());
        }
        return dispatchEventResult;
    };
    /**
     * Функция, обрабатывающая позицию мыши.
     * @param {MouseEvent} event - Объект события мыши.
     */
    View.prototype._mouseHandler = function (event) {
        var viewInstance = this;
        var abacusProperty = viewInstance._presenter.getModelAbacusProperty();
        var oldValue = abacusProperty.value;
        var left = this.getPosLeftPercent(event.clientX);
        var newAbacusValue = this.getValFromPosPercent(left);
        viewInstance._presenter.setAbacusValue(newAbacusValue);
        if (oldValue !== abacusProperty.value) {
            viewInstance.updateView();
            viewInstance._eventChangeWrapper(event);
        }
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
     * @param  {string} className - Название класса HTML-элемента. По умолчанию равно "abacus".
     */
    function WidgetContainer(htmlElement, className) {
        /**
         * Ширина HTML-элемента от 0 до 100 в процентах.
         * @type {number}
         * @private
         */
        this._width = 100;
        this._htmlElement = htmlElement;
        this._className = className ? className : 'abacus';
        this._classNameDisabled = 'abacus_disabled';
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
            if (this._classNameDisabled) {
                this._htmlElement.classList.remove(this._classNameDisabled);
            }
            if (name) {
                this._htmlElement.classList.add(name);
            }
            this._classNameDisabled = name;
        },
        enumerable: false,
        configurable: true
    });
    return WidgetContainer;
}());
exports.WidgetContainer = WidgetContainer;


/***/ }),

/***/ "./src/scripts/abacus.ts":
/*!*******************************!*\
  !*** ./src/scripts/abacus.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * @fileoverview
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "jquery"));
var View_1 = __webpack_require__(/*! ./View */ "./src/scripts/View.ts");
jquery_1.default.fn.abacus = function (paramOptions, option, optionValue) {
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
                    if (typeof option === 'object') {
                        resultOption = view.option(undefined, option);
                    }
                    else {
                        resultOption = view.option(option, optionValue);
                    }
                    if (typeof resultOption !== undefined) {
                        returnResult = resultOption;
                    }
                    break;
                case 'value':
                    resultOption = view.option('value', optionValue);
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
//# sourceMappingURL=abacus.js.map?v=7abd40fe1b8719981382