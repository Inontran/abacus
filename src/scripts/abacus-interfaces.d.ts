interface AbacusClasses{
  abacus: string;
  handle: string;
  range: string;
}

/**
 * Options for the abacus plugin.
 */
interface AbacusOptions {
  animate?: boolean | string | number;
  classes?: AbacusClasses;
  disabled?: boolean;
  max?: number;
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
  // (options?: AbacusOptions): JQuery;
  // (fucnName: string, option?: string, value?: any): JQuery;
  (options ? : AbacusOptions | string, option ? : any, value ? : any): JQuery;
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