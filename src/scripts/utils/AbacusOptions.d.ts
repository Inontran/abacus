/**
 * Параметры для настройки слайдера.
 */
interface AbacusOptions {
  /**
   * @type {boolean | string | number}
   * @defaultvalue false
   * @description Следует ли добавить анимацию элементам слайдера при перемещении ручки.
   * Также принимает любую допустимую продолжительность анимации.
   *
   * **Поддерживается несколько типов данных:**
   *
   * - **boolean**: Если параметр равен ``true``, то элементы слайдера анимируются с продолжительностью в 400 мс.
   * - **string**: Название продолжительности анимации. Принимает значения ``fast``(200 мс) или ``slow``(600 мс).
   * - **number**: Продолжительность анимации в миллисекундах.
   *
   * @example
   * ```
   * // Инициализация слайдера с параметром animate
   * $('.selector').abacus({
   *    animate: 'fast',
   * });
   * 
   * abacusInstance = $('.selector').data('abacus');
   * 
   * // Получение значения
   * let animate = abacusInstance.getProperties('animate');
   *
   * // Установка значения
   * abacusInstance.getProperties('animate', 'fast');
   * ```
   */
  animate?: boolean | string | number = false;

  /**
   * @description Классы элементов виджета.
   * @type {AbacusClasses}
   * @example
   * ```
   * // Инициализация слайдера с параметром classes
   * $('.selector').abacus({
   *   classes: {
   *     abacus: 'slider',
   *   },
   * });
   * 
   * abacusInstance = $('.selector').data('abacus');
   * 
   * // Получение значения
   * let animate = abacusInstance.getProperties('classes');
   *
   * // Установка значения
   * abacusInstance.getProperties('classes', {vertical: 'slider_vertical'});
   * ```
   */
  classes?: AbacusClasses;

  /**
   * @type {boolean}
   * @defaultvalue false
   * @description Отключает слайдер, если установлено значение "true".
   * @example
   * ```
   * // Инициализация слайдера с параметром isDisabled
   * $('.selector').abacus({
   *    isDisabled: true,
   * });
   * 
   * abacusInstance = $('.selector').data('abacus');
   * 
   * // Получение значения
   * let animate = abacusInstance.getProperties('isDisabled');
   *
   * // Установка значения
   * abacusInstance.getProperties('isDisabled', true);
   * ```
   */
  isDisabled?: boolean = false;

  /**
   * @type {number}
   * @defaultvalue 100
   * @description Максимальное значение ползунка.
   * @example
   * ```
   * // Инициализация слайдера с параметром max
   * $('.selector').abacus({
   *    max: 50,
   * });
   * 
   * abacusInstance = $('.selector').data('abacus');
   * 
   * // Получение значения
   * let animate = abacusInstance.getProperties('max');
   *
   * // Установка значения
   * abacusInstance.getProperties('max', 50);
   * ```
   */
  max?: number = 100;

  /**
   * @type {number}
   * @defaultvalue 0
   * @description Минимальное значение ползунка.
   * @example
   * ```
   * // Инициализация слайдера с параметром min
   * $('.selector').abacus({
   *    min: 10,
   * });
   * 
   * abacusInstance = $('.selector').data('abacus');
   * 
   * // Получение значения
   * let animate = abacusInstance.getProperties('min');
   *
   * // Установка значения
   * abacusInstance.getProperties('min', 10);
   * ```
   */
  min?: number = 0;

  /**
   * @type {string}
   * @defaultvalue 'horizontal'
   * @description Определяет, перемещаются ли ручки ползунка по горизонтали (минимум слева, максимум справа)
   * или вертикально (минимум внизу, максимум вверху).
   * Возможные значения: "horizontal" (по горизонтали), "vertical" (по вертикали).
   * @example
   * ```
   * // Инициализация слайдера с параметром orientation
   * $('.selector').abacus({
   *    orientation: 'vertical',
   * });
   * 
   * abacusInstance = $('.selector').data('abacus');
   * 
   * // Получение значения
   * let animate = abacusInstance.getProperties('orientation');
   *
   * // Установка значения
   * abacusInstance.getProperties('orientation', 'vertical');
   * ```
   */
  orientation?: string = 'horizontal';

  /**
   * @type {boolean | string}
   * @defaultvalue false
   * @description Отображать или нет элемент диапазона.
   *
   * **Поддерживается несколько типов данных:**
   *
   * - **boolean**: Если параметр равен ``true`` и слайдер работает в режиме интервала,
   * то элемент диапазона появляется между ручками. Если у слайдера одна ручка,
   * то элемент диапазона отображается между минимальным значением и это ручкой.
   * - **string**: Если установлено значение ``min``, элемент диапазона идет от минимального значения ползунка до ручки.
   * Если установлено значение ``max``, элемент диапазона идет от максимального значения ползунка до ручки.
   * 
   * @example
   * ```
   * // Инициализация слайдера с параметром range
   * $('.selector').abacus({
   *    range: true,
   * });
   * 
   * abacusInstance = $('.selector').data('abacus');
   * 
   * // Получение значения
   * let animate = abacusInstance.getProperties('range');
   *
   * // Установка значения
   * abacusInstance.getProperties('range', true);
   * ```
   */
  range?: boolean | string = false;

  /**
   * @type {boolean}
   * @defaultvalue false
   * @description Включение или отключение шкалы значений.
   * @example
   * ```
   * // Инициализация слайдера с параметром hasMarks
   * $('.selector').abacus({
   *    hasMarks: true,
   * });
   * 
   * abacusInstance = $('.selector').data('abacus');
   * 
   * // Получение значения
   * let animate = abacusInstance.getProperties('hasMarks');
   *
   * // Установка значения
   * abacusInstance.getProperties('hasMarks', true);
   * ```
   */
  hasMarks?: boolean = false;

  /**
   * @type {number}
   * @defaultvalue 1
   * @description Число, на которое увеличивается значение слайдера.
   * @example
   * ```
   * // Инициализация слайдера с параметром step
   * $('.selector').abacus({
   *    step: 5,
   * });
   * 
   * abacusInstance = $('.selector').data('abacus');
   * 
   * // Получение значения
   * let animate = abacusInstance.getProperties('step');
   *
   * // Установка значения
   * abacusInstance.getProperties('step', 5);
   * ```
   */
  step?: number = 1;

  /**
   * @type {boolean}
   * @defaultvalue false
   * @description Включение или отключение подсказки с текущем значением, которое отображется над ручкой слайдера.
   * @example
   * ```
   * // Инициализация слайдера с параметром hasTooltip
   * $('.selector').abacus({
   *    hasTooltip: true,
   * });
   * 
   * abacusInstance = $('.selector').data('abacus');
   * 
   * // Получение значения
   * let animate = abacusInstance.getProperties('hasTooltip');
   *
   * // Установка значения
   * abacusInstance.getProperties('hasTooltip', true);
   * ```
   */
  hasTooltip?: boolean = false;

  /**
   * @type {number[]}
   * @defaultvalue [0]
   * @description Свойство, в котором указано значения первой и второй ручки слайдера.
   * Если указано второе значение, то слайдер будет работать в режиме интервала.
   * Если слайдер работает не в режиме интервала, то в массиве хранится значение только первой ручки.
   * @example
   * ```
   * // Инициализация слайдера с параметром values
   * $('.selector').abacus({
   *    values: [10, 25],
   * });
   * 
   * abacusInstance = $('.selector').data('abacus');
   * 
   * // Получение значения
   * let animate = abacusInstance.getProperties('values');
   *
   * // Установка значения
   * abacusInstance.getProperties('values', [10, 25]);
   * ```
   */
  values?: number[] = [0];

  /**
   * @event change
   * @description Запускается после того, как пользователь переместит ручку слайдера, если значение изменилось.
   * Также если значение изменяется программно с помощью метода "value" или "values".
   * @example Инициализация слайдера с определением колбека события ``change``:
   * ```
   * $('.selector').abacus({
   *    change: function(event, ui){},
   * });
   * ```
   * @example Установка слушателя на событие ``abacus-change`` после инициализации:
   * ```
   * $('.selector').on('abacus-change', function(event){});
   * ```
   */
  change?: (event: Event, ui: EventUIData) => void;

  /**
   * @event create
   * @description Срабатывает после создания слайдера.
   * @example Инициализация слайдера с определением колбека события ``create``:
   * ```
   * $('.selector').abacus({
   *    create: function(event, ui){},
   * });
   * ```
   * @example Установка слушателя на событие ``abacus-create`` после инициализации:
   * ```
   * $('.selector').on('abacus-create', function(event){});
   * ```
   */
  create?: (event: Event, ui: EventUIData) => void;

  /**
   * @event slide
   * @description Срабатывает при каждом движении мыши во время перемещении ручки слайдреа.
   * Значение, указанное в событии как ui.value, представляет значение,
   * которое ручка будет иметь в результате текущего движения.
   * @example Инициализация слайдера с определением колбека события ``slide``:
   * ```
   * $('.selector').abacus({
   *    slide: function(event, ui){},
   * });
   * ```
   * @example Установка слушателя на событие ``abacus-slide`` после инициализации:
   * ```
   * $('.selector').on('abacus-slide', function(event){});
   * ```
   */
  slide?: (event: Event, ui: EventUIData) => void;

  /**
   * @event start
   * @description Событие, срабатывающее когда пользователь начинает перемещать ручку слайдера.
   * @example Инициализация слайдера с определением колбека события ``start``:
   * ```
   * $('.selector').abacus({
   *    start: function(event, ui){},
   * });
   * ```
   * @example Установка слушателя на событие ``abacus-start`` после инициализации:
   * ```
   * $('.selector').on('abacus-start', function(event){});
   * ```
   */
  start?: (event: Event, ui: EventUIData) => void;

  /**
   * @event stop
   * @description Событие, срабатывающее когда пользователь закончил перемещать ручку слайдера.
   * @example Инициализация слайдера с определением колбека события ``stop``:
   * ```
   * $('.selector').abacus({
   *    stop: function(event, ui){},
   * });
   * ```
   * @example Установка слушателя на событие ``abacus-stop`` после инициализации:
   * ```
   * $('.selector').on('abacus-stop', function(event){});
   * ```
   */
  stop?: (event: Event, ui: EventUIData) => void;
}
