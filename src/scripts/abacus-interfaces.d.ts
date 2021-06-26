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
   * Класс HTML-элемента ручек слайдера.
   */
  handle: string;

  /**
   * Класс HTML-элемента индикатора (progress bar) слайдера.
   */
  range: string;

  /**
   * Класс HTML-элемента контейнера слайдера в неактивном состоянии.
   */
	disabled: string;

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
}

/**
 * Свойства слайдера.
 */
interface AbacusOptions {
  /**
   * Следует ли плавно перемещать ручку, когда пользователь нажимает на дорожку ползунка.
   * Также принимает любую допустимую продолжительность анимации. 
   */
  animate?: boolean | string | number;
  classes?: AbacusClasses;
  disabled?: boolean;
  max?: number;
  markup?: boolean;
  min?: number;
  orientation?: string;
  range?: boolean | string;
  step?: number;
  value?: number;
  values?: Array<number> | null;

  //Events
  change?: (event: Event, ui: EventUIData) => void;
  create?: (event: Event, ui: EventUIData) => void;
  slide?: (event: Event, ui: EventUIData) => void;
  start?: (event: Event, ui: EventUIData) => void;
  stop?: (event: Event, ui: EventUIData) => void;
}

/**
 * Function to apply the abacus plugin to the selected elements of a jQuery result.
 */
interface AbacusFunction {
  /**
   * Apply the abacus plugin to the elements selected in the jQuery result.
   *
   * @param options Options to use for this application of the abacus plugin.
   * @returns jQuery result.
   */
  (options ? : AbacusOptions): JQuery;
  (options: string, option ? : any, value ? : any): JQuery | AbacusOptions | number | number[] | boolean | null | undefined | object;
}

/**
 * Declaration of the abacus plugin.
 */
interface Abacus extends AbacusFunction {}

/**
 * Extend the jQuery result declaration with the abacus plugin.
 */
interface JQuery {
  /**
   * Extension of the abacus plugin.
   */
  abacus: Abacus;
}


interface HTMLAbacusElement extends HTMLElement{
  jqueryAbacusInstance?: View;
}

interface EventUIData{
  handle: Element;
  handleIndex: number;
  value: number;
  values?: Array<number> | null;
}