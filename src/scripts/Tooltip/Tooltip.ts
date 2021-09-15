/**
 * Класс "Tooltip" является оберткой для HTML-элемента подсказки со значением ручки слайдера.
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
export default class Tooltip {
  /**
   * HTML-элемент подсказки со значением ручки слайдера.
   * @type {HTMLElement}
   * @private
   */
  private _htmlElement: HTMLElement;

  /**
   * Номер (индекс) подсказки. Может принимать значение 0 или 1.
   * @type {number}
   * @private
   */
  private _tooltipIndex = 0;

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
  private _isVisible = false;

  /**
   * Позиция подсказки в процентах от 0 до 100 по горизонтали от левого края.
   * @type {number}
   * @private
   */
  private _posLeft: number | null = null;

  /**
    * Позиция подсказки в процентах от 0 до 100 по вертикали от нижнего края.
    * @type {number}
    * @private
    */
  private _posBottom: number | null = null;

  /**
   * @constructor
   * @this   {Tooltip}
   * @param  {AbacusClasses} classes Объект с названиями классов.
   * @example new Tooltip({
   *  tooltip: 'abacus__tooltip',
   *  tooltipVisible: 'abacus__tooltip_visible'
   * });
   */
  constructor(classes?: AbacusClasses, tooltipIndex?: number) {
    this._htmlElement = document.createElement('span');
    this._className = classes?.tooltip ? classes.tooltip : 'abacus__tooltip';
    this._classNameVisible = classes?.tooltipVisible ? classes.tooltipVisible : 'abacus__tooltip_visible';
    this._htmlElement.classList.add(this._className);

    if (tooltipIndex !== undefined && !Number.isNaN(tooltipIndex)) {
      this._tooltipIndex = tooltipIndex;
      this._htmlElement.setAttribute('data-handle-index', tooltipIndex.toString());
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
   * @param {string} name Название класса.
   */
  public set className(name : string) {
    if (this._className) {
      this._htmlElement.classList.remove(this._className);
    }
    if (name) {
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
   * @param {string} name Название класса.
   */
  public set classNameVisible(name : string) {
    if (!name || typeof name !== 'string') {
      return;
    }

    if (this._htmlElement.classList.contains(this._classNameVisible)) {
      this._htmlElement.classList.add(name);
    }
    if (this._classNameVisible) {
      this._htmlElement.classList.remove(this._classNameVisible);
    }

    this._classNameVisible = name;
  }

  /**
   * Геттер позиции подсказки в процентах от левого края.
   * @returns {number} Позиция подсказки в процентах от 0 до 100.
   */
  public get posLeft() : number | null {
    return this._posLeft;
  }

  /**
   * Сеттер позиции подсказки в процентах от левого края.
   * @param {number | null} left Позиция подсказки в процентах от 0 до 100.
   * Или null, если координты по горизонтиле быть не должно.
   */
  public set posLeft(left : number | null) {
    if (left === null) {
      this._posLeft = left;
      this._htmlElement.style.left = '';
    } else {
      let newLeft = left;
      if (left < 0) newLeft = 0;
      if (left > 100) newLeft = 100;

      this._posLeft = newLeft;
      this._htmlElement.style.left = `${newLeft.toString()}%`;
    }
  }

  /**
   * Геттер позиции подсказки в процентах от нижнего края.
   * @returns {number | null} Позиция подсказки в процентах от 0 до 100.
   */
  public get posBottom() : number | null {
    return this._posBottom;
  }

  /**
   * Сеттер позиции подсказки в процентах от нижнего края.
   * @param {number | null} bottom Позиция подсказки в процентах от 0 до 100.
   * Или null, если координты по вертикале быть не должно.
   */
  public set posBottom(bottom : number | null) {
    if (bottom === null) {
      this._posBottom = bottom;
      this._htmlElement.style.bottom = '';
    } else {
      let newBottom = bottom;
      if (bottom < 0) newBottom = 0;
      if (bottom > 100) newBottom = 100;

      this._posBottom = newBottom;
      this._htmlElement.style.bottom = `${newBottom.toString()}%`;
    }
  }

  /**
   * Функция получения и установки состояния видимости подсказки.
   * Если функция получила параметр false, то у метки удалаяется класс,
   * записанный в _classNameVisible.
   * Если функция получила параметр true, то метке добавляется класс,
   * записанный в _classNameVisible.
   * @param {boolean} value Если передать "true", то добавляется класс, иначе удалается класс.
   * Если ничего не передать, то возвращается текущее состояние.
   * @returns {boolean} Текущее состояние метки, а именно, в диапозоне она находится или нет.
   */
  isVisible(value?: boolean): boolean {
    if (value !== undefined && this._classNameVisible) {
      this._isVisible = !!value;

      if (this._isVisible) {
        this._htmlElement.classList.add(this._classNameVisible);
      } else {
        this._htmlElement.classList.remove(this._classNameVisible);
      }
    }

    return this._isVisible;
  }
}
