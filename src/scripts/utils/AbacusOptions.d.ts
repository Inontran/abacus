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
   * @example Инициализация слайдера с параметром ``animate``:
   * ```
   * $('.selector').abacus({
   *    animate: 'fast',
   * });
   * ```
   *
   * @example Получение или установка значения опции ``animate`` после инициализации:
   * ```
   * // Получение значения
   * let animate = $('.selector').abacus('option', 'animate');
   *
   * // Установка значения
   * $('.selector').abacus('option', 'animate', 'fast');
   * ```
   */
  animate?: boolean | string | number = false;

  /**
   * Классы элементов виджета.
   * @type {AbacusClasses}
   * @example Инициализация слайдера с параметром ``classes``:
   * ```
   * $('.selector').abacus({
   *   classes: {
   *     abacus: 'slider',
   *   },
   * });
   * ```
   *
   * @example Получение или установка значения опции ``classes`` после инициализации:
   * ```
   * // Получение значения
   * let classes = $('.selector').abacus('option', 'classes');
   *
   * // Установка значения
   * $('.selector').abacus('option', 'classes', {vertical: 'slider_vertical'});
   * ```
   */
  classes?: AbacusClasses;

  /**
   * @type {boolean}
   * @defaultvalue false
   * @description Отключает ползунок, если установлено значение "true".
   * @example Инициализация слайдера с параметром ``disabled``:
   * ```
   * $('.selector').abacus({
   *    disabled: true,
   * });
   * ```
   *
   * @example Получение или установка значения опции ``disabled`` после инициализации:
   * ```
   * // Получение значения
   * let disabled = $('.selector').abacus('option', 'disabled');
   *
   * // Установка значения
   * $('.selector').abacus('option', 'disabled', true);
   * ```
   */
  disabled?: boolean = false;

  /**
   * @type {number}
   * @defaultvalue 100
   * @description Максимальное значение ползунка.
   * @example Инициализация слайдера с параметром ``max``:
   * ```
   * $('.selector').abacus({
   *    max: 50,
   * });
   * ```
   *
   * @example Получение или установка значения опции ``max`` после инициализации:
   * ```
   * // Получение значения
   * let max = $('.selector').abacus('option', 'max');
   *
   * // Установка значения
   * $('.selector').abacus('option', 'max', 50);
   * ```
   */
  max?: number = 100;

  /**
   * @type {number}
   * @defaultvalue 0
   * @description Минимальное значение ползунка.
   * @example Инициализация слайдера с параметром ``min``:
   * ```
   * $('.selector').abacus({
   *    min: 10,
   * });
   * ```
   *
   * @example Получение или установка значения опции ``min`` после инициализации:
   * ```
   * // Получение значения
   * let min = $('.selector').abacus('option', 'min');
   *
   * // Установка значения
   * $('.selector').abacus('option', 'min', 10);
   * ```
   */
  min?: number = 0;

  /**
   * @type {string}
   * @defaultvalue 'horizontal'
   * @description Определяет, перемещаются ли ручки ползунка по горизонтали (минимум слева, максимум справа)
   * или вертикально (минимум внизу, максимум вверху).
   * Возможные значения: "horizontal" (по горизонтали), "vertical" (по вертикали).
   * @example Инициализация слайдера с параметром ``orientation``:
   * ```
   * $('.selector').abacus({
   *    orientation: 'vertical',
   * });
   * ```
   *
   * @example Получение или установка значения опции ``orientation`` после инициализации:
   * ```
   * // Получение значения
   * let orientation = $('.selector').abacus('option', 'orientation');
   *
   * // Установка значения
   * $('.selector').abacus('option', 'orientation', 'vertical');
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
   * @example Инициализация слайдера с параметром ``range``:
   * ```
   * $('.selector').abacus({
   *    range: true,
   * });
   * ```
   *
   * @example Получение или установка значения опции ``range`` после инициализации:
   * ```
   * // Получение значения
   * let range = $('.selector').abacus('option', 'range');
   *
   * // Установка значения
   * $('.selector').abacus('option', 'range', true);
   * ```
   */
  range?: boolean | string = false;

  /**
   * @type {boolean}
   * @defaultvalue false
   * @description Включение или отключение шкалы значений.
   * @example Инициализация слайдера с параметром ``scale``:
   * ```
   * $('.selector').abacus({
   *    scale: true,
   * });
   * ```
   *
   * @example Получение или установка значения опции ``scale`` после инициализации:
   * ```
   * // Получение значения
   * let scale = $('.selector').abacus('option', 'scale');
   *
   * // Установка значения
   * $('.selector').abacus('option', 'scale', true);
   * ```
   */
  scale?: boolean = false;

  /**
   * @type {number}
   * @defaultvalue 1
   * @description Число, на которое увеличивается значение слайдера.
   * @example Инициализация слайдера с параметром ``step``:
   * ```
   * $('.selector').abacus({
   *    step: 5,
   * });
   * ```
   *
   * @example Получение или установка значения опции ``step`` после инициализации:
   * ```
   * // Получение значения
   * let step = $('.selector').abacus('option', 'step');
   *
   * // Установка значения
   * $('.selector').abacus('option', 'step', 5);
   * ```
   */
  step?: number = 1;

  /**
   * @type {boolean}
   * @defaultvalue false
   * @description Включение или отключение подсказки с текущем значением, которое отображется над ручкой слайдера.
   * @example Инициализация слайдера с параметром ``tooltip``:
   * ```
   * $('.selector').abacus({
   *    tooltip: true,
   * });
   * ```
   *
   * @example Получение или установка значения опции ``tooltip`` после инициализации:
   * ```
   * // Получение значения
   * let tooltip = $('.selector').abacus('option', 'tooltip');
   *
   * // Установка значения
   * $('.selector').abacus('option', 'tooltip', true);
   * ```
   */
  tooltip?: boolean = false;

  /**
   * @type {number}
   * @default 0
   * @description Значение ползунка, если у слайдера только одна ручка и нет интервала.
   * Если у слайдера две ручки, тогда в свойстве хранится значение первой ручки.
   * @example Инициализация слайдера с параметром ``value``:
   * ```
   * $('.selector').abacus({
   *    value: 10,
   * });
   * ```
   *
   * @example Получение или установка значения опции ``value`` после инициализации:
   * ```
   * // Получение значения
   * let value = $('.selector').abacus('option', 'value');
   *
   * // Установка значения
   * $('.selector').abacus('option', 'value', 10);
   * ```
   */
  value?: number = 0;

  /**
   * @type {number[]}
   * @defaultvalue [0]
   * @description Свойство, в котором указано значения первой и второй ручки слайдера.
   * Если указано второе значение, то слайдер будет работать в режиме интервала.
   * Если слайдер работает не в режиме интервала, то в массиве хранится значение только первой ручки.
   * @example Инициализация слайдера с параметром ``values``:
   * ```
   * $('.selector').abacus({
   *    values: [10, 25],
   * });
   * ```
   *
   * @example Получение или установка значения опции ``values`` после инициализации:
   * ```
   * // Получение значения
   * let values = $('.selector').abacus('option', 'values');
   *
   * // Установка значения
   * $('.selector').abacus('option', 'values', [10, 25]);
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
   * $('.selector').on('abacus-change', function(event, ui){});
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
   * $('.selector').on('abacus-create', function(event, ui){});
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
   * $('.selector').on('abacus-slide', function(event, ui){});
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
   * $('.selector').on('abacus-start', function(event, ui){});
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
   * $('.selector').on('abacus-stop', function(event, ui){});
   * ```
   */
  stop?: (event: Event, ui: EventUIData) => void;
}
