/**
 * Класс "Tooltip" является оберткой для HTML-элемента подсказки со значением ручки слайдера.
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
export class Tooltip{
  /**
   * HTML-элемент подсказки со значением ручки слайдера.
   * @type {HTMLElement}
   * @private
   */
  private _htmlElement: HTMLElement;

  /**
   * Название класса HTML-элемента.
   * @type {string}
   * @private
   */
  private _className: string;


  /**
   * Название класса HTML-элемента подсказки, которая находится в состоянии видимости.
   * @type {string}
   * @private
   */
  private _classNameVisible: string;


  /**
   * Если параметр равен "true", то это значит, что подсказка отображается.
   * @type {boolean}
   * @private
   */
  private _isVisible: boolean = false;


  /**
   * Позиция подсказки в процентах от 0 до 100 по горизонтали от левого края.
   * @type {number}
   * @private
   */
  private _posLeft: number = 0;

  /**
    * Позиция подсказки в процентах от 0 до 100 по вертикали от нижнего края.
    * @type {number}
    * @private
    */
  private _posBottom: number = 0;


  /**
   * @constructor
   * @this   {Tooltip}
   * @param  {AbacusClasses} classes - Объект с названиями классов.
   * @example new Tooltip({
   *  tooltip: 'abacus__tooltip',
   *  tooltipVisible: 'abacus__tooltip_visible'
   * });
   */
  constructor(classes?: AbacusClasses){
    this._htmlElement = document.createElement('span');
    this._className = classes?.tooltip ? classes.tooltip : 'abacus__tooltip';
    this._classNameVisible = classes?.tooltipVisible ? classes.tooltipVisible : 'abacus__tooltip_visible';
    this._htmlElement.classList.add(this._className);
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
  public set className(name : string) {
    if( this._className ){
      this._htmlElement.classList.remove(this._className);
    }
    if( name ){
      this._htmlElement.classList.add(name);
    }
    this._className = name;
  }


  /**
   * Геттер названия класса HTML-элемента метки, которая находится в диапозоне.
   */
  public get classNameVisible() : string {
    return this._classNameVisible;
  }


  /**
   * Сеттер названия класса HTML-элемента метки, которая находится в диапозоне.
   * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
   * @param {string} name - Название класса.
   */
  public set classNameVisible(name : string) {
    if( !name || typeof name !== 'string' ){
      return;
    }

    if( this._htmlElement.classList.contains(this._classNameVisible) ){
      this._htmlElement.classList.add(name);
    }
    if( this._classNameVisible ){
      this._htmlElement.classList.remove(this._classNameVisible);
    }

    this._classNameVisible = name;
  }


  /**
   * Геттер позиции метки в процентах от левого края.
   * @returns {number} - Позиция метки в процентах от 0 до 100.
   */
  public get posLeft() : number {
    return this._posLeft;
  }
  
  /**
   * Сеттер позиции метки в процентах от левого края.
   * @param {number} - Позиция метки в процентах от 0 до 100.
   */
  public set posLeft(left : number) {
    if( left < 0 ) left = 0;
    if( left > 100 ) left = 100;

    this._posLeft = left;
    this._htmlElement.style.left = left + '%';
  }


  /**
   * Функция получения и установки состояния видимости подсказки. 
   * Если функция получила параметр false, то у метки удалаяется класс,
   * записанный в _classNameVisible.
   * Если функция получила параметр true, то метке добавляется класс,
   * записанный в _classNameVisible.
   * @param {boolean} value - Если передать "true", то добавляется класс, иначе удалается класс. Если ничего не передать,
   * то возвращается текущее состояние.
   * @returns {boolean} - Текущее состояние метки, а именно, в диапозоне она находится или нет.
   */
  isVisible(value?: boolean): boolean{
    if( value !== undefined && this._classNameVisible){
      this._isVisible = !!value;

      if( this._isVisible ){
        this._htmlElement.classList.add(this._classNameVisible);
      }
      else{
        this._htmlElement.classList.remove(this._classNameVisible);
      }
    }

    return this._isVisible;
  }
}