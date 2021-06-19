/**
 * Класс "Range" является оберткой для HTML-элемента индикатора (progress bar).
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
export class Range{
  /**
   * HTML-элемент индикатора.
   * @type {HTMLElement}
   * @private
   */
  private _htmlElement: HTMLElement;

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
   * 
   * @param className 
   */
  private _rangeType: RangeType = RangeType.HIDDEN;

  /**
   * @constructor
   * @this   {Range}
   * @param  {string} className - Название класса HTML-элемента. По умолчанию равно "abacus__range".
   */
  constructor(className?: string){
    this._htmlElement = document.createElement('span');
    this._className = className ? className : 'abacus__range';
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
    if( width < 0 ) width = 0;
    if( width > 100 ) width = 100;

    this._width = width;
    this._htmlElement.style.width = width + '%';
  }


  /**
   * Геттер ссылки на HTML-элемент.
   */
  public get htmlElement() : HTMLElement {
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
  public set className(value : string) {
    this._htmlElement.classList.remove(this._className);
    this._htmlElement.classList.add(value);
    this._className = value;
  }


  /**
   * 
   */
  public get rangeType() : string {
    return this._rangeType;
  }
  
  /**
   * 
   */
  public set rangeType(value : string) {
    if( value !== 'hidden' && value !== 'min' && value !== 'max' && value !== 'between' ){
      value = 'hidden';
    }
    this._rangeType = value as RangeType;
  }
  
}

enum RangeType {
  HIDDEN = 'hidden',
  MIN = 'min',
  MAX = 'max',
  BETWEEN = 'between'
}