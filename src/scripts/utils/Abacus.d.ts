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
}
