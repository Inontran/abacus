/**
 * Класс "Mark" является оберткой для HTML-элемента метки шкалы значений слайдера.
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
export class Mark{
  /**
   * HTML-элемент метки шкалы значений слайдера.
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
   * Название класса HTML-элемента метки, которая находится в диапозоне.
   * @type {string}
   * @private
   */
  private _classNameInrange: string;


  /**
   * Если параметр равен "true", то это значит, что метка находится в диапозоне.
   * @type {boolean}
   * @private
   */
  private _isInrange: boolean = false;


  /**
   * Название класса HTML-элемента метки, которая соответствует текущему значению слайдера.
   * @type {string}
   * @private
   */
  private _classNameSelected: string = '';


  /**
   * Если параметр равен "true", то это значит, что метка соответствует текущему значению слайдера.
   * @type {boolean}
   * @private
   */
  private _isSelected: boolean = false;


  /**
   * Позиция метки в процентах от 0 до 100 по горизонтали от левого края.
   * @type {number}
   * @private
   */
  private _posLeft: number = 0;

  /**
    * Позиция метки в процентах от 0 до 100 по вертикали от нижнего края.
    * @type {number}
    * @private
    */
  private _posBottom: number = 0;


  /**
   * @constructor
   * @this   {Mark}
   * @param  {string} className - Название класса HTML-элемента. По умолчанию равно "abacus__mark".
   */
  constructor(classes?: AbacusClasses){
    this._htmlElement = document.createElement('span');
    this._className = classes?.mark ? classes.mark : 'abacus__mark';
    this._classNameInrange = classes?.markInrange ? classes.markInrange : 'abacus__mark_inrange';
    this._classNameSelected = classes?.markSelected ? classes.markSelected : 'abacus__mark_selected';
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
  public get classNameInrange() : string {
    return this._classNameInrange;
  }


  /**
   * Сеттер названия класса HTML-элемента метки, которая находится в диапозоне.
   * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
   * @param {string} name - Название класса.
   */
  public set classNameInrange(name : string) {
    if( !name || typeof name !== 'string' ){
      return;
    }

    if( this._htmlElement.classList.contains(this._classNameInrange) ){
      this._htmlElement.classList.add(name);
    }
    if( this._classNameInrange ){
      this._htmlElement.classList.remove(this._classNameInrange);
    }

    this._classNameInrange = name;
  }


  /**
   * Геттер названия класса HTML-элемента метки, которая соответствует текущему значению слайдера.
   */
  public get classNameSelected() : string {
    return this._classNameSelected;
  }


  /**
   * Сеттер названия класса HTML-элемента метки, которая соответствует текущему значению слайдера.
   * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
   * @param {string} name - Название класса.
   */
  public set classNameSelected(name : string) {
    if( !name || typeof name !== 'string' ){
      return;
    }

    if( this._htmlElement.classList.contains(this._classNameSelected) ){
      this._htmlElement.classList.add(name);
    }
    if( this._classNameSelected ){
      this._htmlElement.classList.remove(this._classNameSelected);
    }

    this._classNameSelected = name;
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
   * Функция получения и установки состояния "в диапозоне". 
   * Если функция получила параметр false, то у метки удалаяется класс,
   * записанный в model.abacusProperty.classes.markInrange.
   * Если функция получила параметр true, то метке добавляется класс,
   * записанный в model.abacusProperty.classes.markInrange.
   * @param {boolean} value - Если передать "true", то добавляется класс, иначе удалается класс. Если ничего не передать,
   * то возвращается текущее состояние.
   * @returns {boolean} - Текущее состояние метки, а именно, в диапозоне она находится или нет.
   */
  isInrange(value?: boolean): boolean{
    if( value !== undefined && this._classNameInrange){
      this._isInrange = !!value;

      if( this._isInrange ){
        this._htmlElement.classList.add(this._classNameInrange);
      }
      else{
        this._htmlElement.classList.remove(this._classNameInrange);
      }
    }

    return this._isInrange;
  }


  /**
   * Функция получения и установки состояния "выбранная". 
   * Это значит, что напротив этой метки установлена одна из ручек слайдера.
   * Если функция получила параметр false, то у метки удалаяется класс,
   * записанный в model.abacusProperty.classes.markSelected.
   * Если функция получила параметр true, то метке добавляется класс,
   * записанный в model.abacusProperty.classes.markSelected.
   * @param {boolean} value - Если передать "true", то добавляется класс, иначе удалается класс. Если ничего не передать,
   * то возвращается текущее состояние.
   * @returns {boolean} - Текущее состояние метки.
   */
  isSelected(value?: boolean): boolean{
    if( value !== undefined && this._classNameSelected){
      this._isSelected = !!value;

      if( this._isSelected ){
        this._htmlElement.classList.add(this._classNameSelected);
      }
      else{
        this._htmlElement.classList.remove(this._classNameSelected);
      }
    }

    return this._isSelected;
  }
}