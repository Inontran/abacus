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
