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
   * @type {AbacusProperties}
   */
  abacusProperties: AbacusProperties;
}
