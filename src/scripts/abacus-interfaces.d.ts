/**
 * Список классов элементов слайдера и их состояний.
 */
interface AbacusClasses {
  /**
   * Класс HTML-элемента контейнера слайдера.
   * @type {string}
   */
  abacus: string;

  /**
   * Класс HTML-элемента контейнера слайдера в вертикальном состоянии.
   * @type {string}
   */
  vertical: string;

  /**
   * Класс HTML-элемента контейнера слайдера в неактивном состоянии.
   */
  disabled: string;

  /**
   * Класс HTML-элемента ручек слайдера.
   */
  handle: string;

  /**
   * Класс HTML-элемента индикатора (progress bar) слайдера.
   */
  range: string;

  /**
   * Класс HTML-элемента метки слайдера.
   */
  mark: string;

  /**
   * Класс HTML-элемента метки слайдера, которая соответствует текущему значению.
   */
  markSelected: string;

  /**
   * Класс HTML-элемента метки слайдера, которая находиться в диапазоне (напротив индикатор Range).
   */
  markInrange: string;

  /**
   * Класс HTML-элемента подсказки со значением.
   */
  tooltip: string;

  /**
   * Класс HTML-элемента подсказки со значением в видимом состоянии.
   */
  tooltipVisible: string;
}

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
   * @description Работает ли слайдер в режиме интервала значений.
   * 
   * **Поддерживается несколько типов данных:**
   * 
   * - **boolean**: Если параметр равен ``true``, то слайдер работает в режиме интервала значений.
   * В этом режиме появляется вторая ручка и стилизованный элемент диапазона между этими ручками.
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
   * @description Свойство, в котором указано значения первой и второй ручки слайдера, если он работает в режиме интервала.
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
   * Запускается после того, как пользователь переместит ручку слайдера, если значение изменилось.
   * Также если значение изменяется программно с помощью метода "value" или "values".
   * Тип события - "change".
   */
  change?: (event: Event, ui: EventUIData) => void;

  /**
   * Срабатывает после создания слайдера.
   * Тип события - "create".
   */
  create?: (event: Event, ui: EventUIData) => void;

  /**
   * Срабатывает при каждом движении мыши во время перемещении ручки слайдреа.
   * Значение, указанное в событии как ui.value, представляет значение,
   * которое ручка будет иметь в результате текущего движения.
   * Тип события - "slide".
   */
  slide?: (event: Event, ui: EventUIData) => void;

  /**
   * Событие, срабатывающее когда пользователь начинает перемещать ручку слайдера.
   * Тип события - "start".
   */
  start?: (event: Event, ui: EventUIData) => void;

  /**
   * Событие, срабатывающее когда пользователь закончил перемещать ручку слайдера.
   * Тип события - "stop".
   */
  stop?: (event: Event, ui: EventUIData) => void;
}

/**
 * Свойства слайдера.
 */
interface AbacusProperty extends AbacusOptions {
  animate: boolean | string | number;
  classes: AbacusClasses;
  disabled: boolean;
  max: number;
  min: number;

  /**
   * Определяет, перемещаются ли ручки ползунка по горизонтали (минимум слева, максимум справа)
   * или вертикально (минимум внизу, максимум вверху).
   * @type {AbacusOrientationType}
   */
  orientation: AbacusOrientationType;

  range: boolean | string;
  scale: boolean;
  step: number;
  tooltip: boolean;
  value: number;
  values: number[];
}

/**
 * Интерфейс объекта плагина.
 */
interface Abacus {
  /**
   * Функция инициализации плагина на выбранных JQuery-элементов.
   * @param {AbacusOptions} options Свойства слайдера.
   * @returns {JQuery}
   */
  (options ? : AbacusOptions): JQuery;

  /**
   * Функция вызова методов слайдера в том числе,
   * для получения или установки значений свойств на выбранных JQuery-элементах.
   * @param {string} funcName Название функции, которую надо выполнить.
   * @param {any} param1 Это может быть название свойства слайдера или значение свойства.
   * @param {any} param2 Значение свойства слайдера.
   * @returns {JQuery | AbacusProperty | number | number[] | boolean | null | undefined | AbacusClasses | View}
   */
  (funcName: string,
    param1 ? : AbacusOptions | number | string | number[],
    param2 ? : number | string | boolean | null | AbacusClasses
  ): JQuery | AbacusProperty | number | number[] | boolean | null | undefined | AbacusClasses | View | string;
}

/**
 * Добавление в интефейс JQuery поле с плагином "abacus".
 */
interface JQuery {
  abacus: Abacus;
}

/**
 * Интерфейс, расширяющий HTMLElement, для хранения в нем экземпляра объекта слайдера.
 */
interface HTMLAbacusElement extends HTMLElement {
  /**
   * Экземпляр объекта слайдера.
   * @type {View}
   */
  jqueryAbacusInstance?: View;
}

/**
 * Интерфейс, описывающий объект, который передается обработчикам событий слайдера.
 */
interface EventUIData {
  /**
   * Ссылка на HTML-элемент ручки слайдера, которая учавствовала при срабатывания события.
   * Например, при движении ручки мышью.
   * @type {HTMLElement}
   */
  handle: HTMLElement;

  /**
   * Номер ручки слайдера, которая учавствовала при срабатывания события.
   * @type {number}
   */
  handleIndex: number;

  /**
   * Свойства слайдера.
   * @type {AbacusProperty}
   */
  abacusProperty: AbacusProperty;
}
