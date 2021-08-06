enum RangeType {
  HIDDEN = 'hidden',
  MIN = 'min',
  MAX = 'max',
  BETWEEN = 'between',
}

/**
 * Класс "Range" является оберткой для HTML-элемента индикатора (progress bar).
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
export default class Range {
  /**
   * HTML-элемент индикатора.
   * @type {HTMLElement}
   * @private
   */
  private _htmlElement: HTMLElement;

  /**
   * Ширина HTML-элемента от 0 до 100 в процентах.
   * @type {number | null}
   * @private
   */
  private _width: number | null = 100;

  /**
   * Ширина HTML-элемента от 0 до 100 в процентах.
   * @type {number | null }
   * @private
   */
  private _height: number | null = 100;

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
   * @param  {AbacusClasses} classes Объект с названиями классов.
   * @example new Handle({
   *  range: 'abacus__range'
   * });
   */
  constructor(classes?: AbacusClasses) {
    this._htmlElement = document.createElement('span');
    this._className = classes?.range ? classes.range : 'abacus__range';
    this._htmlElement.classList.add(this._className);
  }

  /**
   * Геттер ширины HTML-элемента (_htmlElement).
   */
  public get width() : number | null {
    return this._width;
  }

  /**
   * Сеттер ширины HTML-элемента (_htmlElement).
   * @param {number | null} width ширина в процентах от 0 до 100.
   */
  public set width(width : number | null) {
    if (width === null) {
      this._width = width;
      this._htmlElement.style.width = '';
    } else {
      let newWidth = width;
      if (width < 0) newWidth = 0;
      if (width > 100) newWidth = 100;

      this._width = newWidth;
      this._htmlElement.style.width = `${newWidth.toString()}%`;
    }
  }

  /**
   * Геттер высоты HTML-элемента (_htmlElement).
   */
  public get height() : number | null {
    return this._height;
  }

  /**
   * Сеттер высоты HTML-элемента (_htmlElement).
   * @param {number | null} height высота в процентах от 0 до 100.
   */
  public set height(height : number | null) {
    if (height === null) {
      this._height = height;
      this._htmlElement.style.height = '';
    } else {
      let newHeight = height;
      if (height < 0) newHeight = 0;
      if (height > 100) newHeight = 100;

      this._height = newHeight;
      this._htmlElement.style.height = `${newHeight.toString()}%`;
    }
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
   * @param {string} value Название класса.
   */
  public set className(value : string) {
    this._htmlElement.classList.remove(this._className);
    this._htmlElement.classList.add(value);
    this._className = value;
  }

  /**
   * Получение типа диапозона слайдера.
   */
  public get rangeType() : string {
    return this._rangeType;
  }

  /**
   * Установка типа диапозона слайдера.
   */
  public set rangeType(value : string) {
    const isValueEqualRangeType = value !== 'hidden' && value !== 'min' && value !== 'max' && value !== 'between';
    if (isValueEqualRangeType) {
      this._rangeType = RangeType.HIDDEN;
    }
    this._rangeType = value as RangeType;
  }
}
