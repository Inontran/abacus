/**
 * Options for the abacus plugin.
 */
interface AbacusOptions {
  animate: boolean | string | number;
  classes: object;
  disabled: boolean;
  max: number;
  min: number;
  orientation: string;
  range: boolean | string;
  step: number;
  value: number;
  values: Array<number> | null;
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
  (options ? : AbacusOptions | string, option ? : string, value ? : any): JQuery;
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