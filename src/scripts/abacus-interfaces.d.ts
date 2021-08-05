/**
 * Список классов элементов и их состояний слайдера.
 */
interface AbacusClasses{
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
   * Класс HTML-элемента метки слайдера, которая находиться в диапозоне (напротив индикатор Range).
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
 * Свойства слайдера.
 */
interface AbacusOptions {
  /**
   * Следует ли плавно перемещать ручку, когда пользователь нажимает на дорожку ползунка.
   * Также принимает любую допустимую продолжительность анимации.
   * @type {boolean | string | number}
   */
  animate?: boolean | string | number;

  /**
   * Классы элементов виджета.
   * @type {AbacusClasses}
   */
  classes?: AbacusClasses;

  /**
   * Отключает ползунок, если установлено значение "true".
   * @type {boolean}
   */
  disabled?: boolean;

  /**
   * Максимальное значение ползунка.
   * @type {number}
   */
  max?: number;

  /**
   * Минимальное значение ползунка.
   * @type {number}
   */
  min?: number;

  /**
   * Определяет, перемещаются ли ручки ползунка по горизонтали (минимум слева, максимум справа)
   * или вертикально (минимум внизу, максимум вверху).
   * Возможные значения: "horizontal" (по горизонтали), "vertical" (по вертикали).
   * @type {string}
   */
  orientation?: string;

  /**
   * Включение или отключение элемента диапазона.
   * Если установлено значение false, то элемент отключен.
   * Если установлено значение true, ползунок определит, есть ли у вас две ручки,
   * и создаст между ними стилизуемый элемент диапазона.
   * Если установлено значение "min", диапазон идет от минимального значения ползунка до ручки.
   * Если установлено значение "max", диапазон идет от максимального значения ползунка до ручки.
   * @type {boolean | string}
   */
  range?: boolean | string;

  /**
   * Включение или отключение шкалы значений.
   * @type {boolean}
   */
  scale?: boolean;

  /**
   * Число, на которое увеличивается значение слайдера.
   * @type {number}
   */
  step?: number;

  /**
   * Включение или отключение подсказки с текущем значением, которое отображется над ручкой слайдера.
   * @type {boolean}
   */
  tooltip?: boolean;

  /**
   * Значение ползунка, если у слайдера только одна ручка и нет интервала.
   * Если у слайдера две ручки, тогда в свойстве храниться значение первой ручки.
   * @type {number}
   */
  value?: number;

  /**
   * Этот параметр можно использовать для указания значений двух ручек слайдера.
   * Если для параметра диапазона установлено значение true, длина массива со значениями должна быть 2.
   * @type {number[]}
   */
  values?: number[];

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
   * @returns {JQuery | AbacusOptions | number | number[] | boolean | null | undefined | AbacusClasses | View}
   */
  (funcName: string,
    param1 ? : AbacusOptions | number | string | number[],
    param2 ? : number | string | boolean | null | AbacusClasses
  ): JQuery | AbacusOptions | number | number[] | boolean | null | undefined | AbacusClasses | View | string;
}

/**
 * Добавление в интефейс JQuery поле с плагинов "abacus".
 */
interface JQuery {
  abacus: Abacus;
}

/**
 * Интерфейс, расширяющий HTMLElement, для хранения в нем экземпляр объекта слайдера.
 */
interface HTMLAbacusElement extends HTMLElement{
  /**
   * Экземпляр объекта слайдера.
   * @type {View}
   */
  jqueryAbacusInstance?: View;
}

interface EventUIData{
  handle: HTMLElement;
  handleIndex: number;
  abacusProperty: AbacusOptions;
}
