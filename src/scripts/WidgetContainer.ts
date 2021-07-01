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
   * Название класса HTML-элемента в заблокированном (неактивном) состоянии.
   * @type {string}
   * @private
   */
  private _classNameDisabled: string;


  /**
   * Название класса HTML-элемента в заблокированном (неактивном) состоянии.
   * @type {string}
   * @private
   */
  private _classNameVertical: string;


  /**
   * @constructor
   * @this   {WidgetContainer}
   * @param  {HTMLAbacusElement} htmlElement - HTML-элемент, в котором будут элементы слайдера.
   * @param  {AbacusClasses} classes - Объект с названиями классов.
   * @example new WidgetContainer({
   *  abacus: 'abacus',
   *  disabled: 'abacus_disabled'
   * });
   */
  constructor(htmlElement: HTMLAbacusElement, classes?: AbacusClasses){
    this._htmlElement = htmlElement;
		this._className = classes?.abacus ? classes.abacus : 'abacus';
		this._classNameDisabled = classes?.disabled ? classes.disabled : 'abacus_disabled';
    this._classNameVertical = classes?.vertical ? classes.vertical : 'abacus_vertical';
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


  /**
   * Геттер названия класса HTML-элемента в состоянии "выключен".
   */
  public get classNameDisabled() : string {
    return this._classNameDisabled;
  }


  /**
   * Сеттер названия класса HTML-элемента в состоянии "выключен".
   * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
   * @param {string} name - Название класса.
   */
  public set classNameDisabled(name : string) {
    if( !name || typeof name !== 'string' ){
      return;
    }

    if( this._htmlElement.classList.contains(this._classNameDisabled) ){
      this._htmlElement.classList.add(name);
    }
    if( this._classNameDisabled ){
      this._htmlElement.classList.remove(this._classNameDisabled);
    }

    this._classNameDisabled = name;
  }


  /**
   * Геттер названия класса HTML-элемента в состоянии "выключен".
   */
  public get classNameVertical() : string {
    return this._classNameVertical;
  }


  /**
   * Сеттер названия класса HTML-элемента в состоянии "выключен".
   * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
   * @param {string} name - Название класса.
   */
  public set classNameVertical(name : string) {
    if( !name || typeof name !== 'string' ){
      return;
    }

    if( this._htmlElement.classList.contains(this._classNameVertical) ){
      this._htmlElement.classList.add(name);
    }
    if( this._classNameVertical ){
      this._htmlElement.classList.remove(this._classNameVertical);
    }

    this._classNameVertical = name;
  }


  /**
   * Функция получения и установки активного/неактивного состояния.
   * Если функция получила параметр false, то у HTML-элемента слайдера удалаяется класс,
   * записанный в _classNameDisabled.
   * Если функция получила параметр true, то HTML-элементу слайдера добавляется класс,
   * записанный в _classNameDisabled.
   * @param {boolean} value - Если передать "true", то добавляется класс, иначе удалается класс.
   */
  isDisabled(value: boolean): void{
    if( value !== undefined && this._classNameDisabled){

      if( !!value ){
        this._htmlElement.classList.add(this._classNameDisabled);
      }
      else{
        this._htmlElement.classList.remove(this._classNameDisabled);
      }
    }
  }


  /**
   * Функция получения и установки активного/неактивного состояния.
   * Если функция получила параметр false, то у HTML-элемента слайдера удалаяется класс,
   * записанный в _classNameDisabled.
   * Если функция получила параметр true, то HTML-элементу слайдера добавляется класс,
   * записанный в _classNameDisabled.
   * @param {boolean} value - Если передать "true", то добавляется класс, иначе удалается класс.
   */
  isVertical(value: boolean): void{
    if( value !== undefined && this._classNameVertical){

      if( !!value ){
        this._htmlElement.classList.add(this._classNameVertical);
      }
      else{
        this._htmlElement.classList.remove(this._classNameVertical);
      }
    }
  }
}