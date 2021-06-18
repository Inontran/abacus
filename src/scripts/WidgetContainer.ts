/**
 * Класс "WidgetContainer" является оберткой для HTML-элемента, в котором содержатся элементы слайдера.
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
export class WidgetContainer{
  /**
   * HTML-элемент, в котором содержатся элементы слайдера.
   * @type {HTMLAbacusElement}
   * @private
   */
  private _htmlElement: HTMLAbacusElement;

  /**
   * Ширина HTML-элемента от 0 до 100 в процентах.
   * @type {number}
   * @private
   */
  private _width: number = 100;

  /**
   * Название класса HTML-элемента.
   * @type {string}
   * @private
   */
  private _className: string;


  /**
   * @constructor
   * @this   {WidgetContainer}
   * @param  {HTMLAbacusElement} htmlElement - HTML-элемент, в котором будут элементы слайдера.
   * @param  {string} className - Название класса HTML-элемента. По умолчанию равно "abacus".
   */
  constructor(htmlElement: HTMLAbacusElement, className?: string){
    this._htmlElement = htmlElement;
    this._className = className ? className : 'abacus';
    this._htmlElement.classList.add(this._className);
  }


  /**
   * Геттер ширины HTML-элемента (_htmlElement).
   */
  public get width() : number {
    return this._width;
  }

  /**
   * Сеттер ширины HTML-элемента (_htmlElement).
   * @param {number} width - ширина в процентах от 0 до 100.
   */
  public set width(width : number) {
    this._width = width;
  }


  /**
   * Геттер ссылки на HTML-элемент.
   */
  public get htmlElement() : HTMLAbacusElement {
    return this._htmlElement;
  }


  /**
   * Геттер названия класса HTML-элемента.
   */
  public get className() : string {
    return this._className;
  }


  /**
   * Сеттер названия класса HTML-элемента. Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
   * @param {string} name - Название класса.
   */
  public set className(name : string) {
    this._htmlElement.classList.remove(this._className);
    this._htmlElement.classList.add(name);
    this._className = name;
  }
}