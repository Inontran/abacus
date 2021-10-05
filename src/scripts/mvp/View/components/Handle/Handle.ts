/**
 * Класс "Handle" является оберткой для HTML-элемента бегунка.
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
class Handle {
  /**
   * HTML-элемент бегунка.
   * @type {HTMLElement}
   * @private
   */
  private _htmlElement: HTMLElement;

  /**
   * Позиция бегунка в процентах от 0 до 100 по горизонтали от левого края.
   * @type {number}
   * @private
   */
  private _posLeft: number | null = null;

  /**
   * Позиция бегунка в процентах от 0 до 100 по вертикали от нижнего края.
   * @type {number}
   * @private
   */
  private _posBottom: number | null = null;

  /**
   * Номер (индекс) бегунка. Может принимать значение 0 или 1.
   * @type {number}
   * @private
   */
  private _handleIndex = 0;

  /**
   * Название класса HTML-элемента.
   * @type {string}
   * @private
   */
  private _className!: string;

  /**
   * @constructor
   * @this   {Handle}
   * @param  {AbacusClasses} classes Объект с названиями классов.
   * @example new Handle({
   *  handle: 'abacus__handle'
   * });
   */
  constructor(classes: AbacusClasses, handleIndex?: number) {
    this._htmlElement = document.createElement('span');
    this.className = classes.handle;

    if (handleIndex !== undefined && !Number.isNaN(handleIndex)) {
      this._handleIndex = handleIndex;
      this._htmlElement.setAttribute('data-handle-index', handleIndex.toString());
    }
  }

  /**
   * Геттер позиции бегунка в процентах от левого края.
   * @returns {number} Позиция бегунка в процентах от 0 до 100.
   */
  public get posLeft() : number | null {
    return this._posLeft;
  }

  /**
   * Сеттер позиции бегунка в процентах от левого края.
   * @param {number | null} left Позиция бегунка в процентах от 0 до 100.
   * Или null, если координты по горизонтиле быть не должно.
   */
  public set posLeft(left: number | null) {
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
   * Геттер позиции бегунка в процентах от нижнего края.
   * @returns {number | null} Позиция бегунка в процентах от 0 до 100.
   */
  public get posBottom() : number | null {
    return this._posBottom;
  }

  /**
   * Сеттер позиции бегунка в процентах от нижнего края.
   * @param {number | null} bottom Позиция бегунка в процентах от 0 до 100.
   * Или null, если координты по вертикале быть не должно.
   */
  public set posBottom(bottom: number | null) {
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
   * Геттер ссылки на HTML-элемент.
   */
  public get htmlElement() : HTMLElement {
    return this._htmlElement;
  }

  /**
   * Геттер номера (индекса) бегунка.
   */
  public get handleIndex() : number {
    return this._handleIndex;
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
  public set className(name: string) {
    if (!name || typeof name !== 'string') {
      return;
    }
    if (this._className) {
      this._htmlElement.classList.remove(this._className);
    }
    this._htmlElement.classList.add(name);
    this._className = name;
  }
}

export default Handle;
