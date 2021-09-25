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
