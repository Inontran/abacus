/**
 * Класс "Mark" является оберткой для HTML-элемента метки шкалы значений слайдера.
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
export declare class Mark {
    /**
     * HTML-элемент метки шкалы значений слайдера.
     * @type {HTMLElement}
     * @private
     */
    private _htmlElement;
    /**
     * Название класса HTML-элемента.
     * @type {string}
     * @private
     */
    private _className;
    /**
     * Название класса HTML-элемента метки, которая находится в диапозоне.
     * @type {string}
     * @private
     */
    private _classNameInrange;
    /**
     * Если параметр равен "true", то это значит, что метка находится в диапозоне.
     * @type {boolean}
     * @private
     */
    private _isInrange;
    /**
     * Название класса HTML-элемента метки, которая соответствует текущему значению слайдера.
     * @type {string}
     * @private
     */
    private _classNameSelected;
    /**
     * Если параметр равен "true", то это значит, что метка соответствует текущему значению слайдера.
     * @type {boolean}
     * @private
     */
    private _isSelected;
    /**
     * Позиция метки в процентах от 0 до 100 по горизонтали от левого края.
     * @type {number}
     * @private
     */
    private _posLeft;
    /**
      * Позиция метки в процентах от 0 до 100 по вертикали от нижнего края.
      * @type {number}
      * @private
      */
    private _posBottom;
    /**
     * @constructor
     * @this   {Mark}
     * @param  {string} className - Название класса HTML-элемента. По умолчанию равно "abacus__mark".
     */
    constructor(classes?: AbacusClasses);
    /**
     * Геттер ссылки на HTML-элемент.
     */
    get htmlElement(): HTMLElement;
    /**
     * Геттер названия класса HTML-элемента.
     */
    get className(): string;
    /**
     * Сеттер названия класса HTML-элемента. Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
     * @param {string} name - Название класса.
     */
    set className(name: string);
    /**
     * Геттер названия класса HTML-элемента метки, которая находится в диапозоне.
     */
    get classNameInrange(): string;
    /**
     * Сеттер названия класса HTML-элемента метки, которая находится в диапозоне.
     * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
     * @param {string} name - Название класса.
     */
    set classNameInrange(name: string);
    /**
     * Геттер названия класса HTML-элемента метки, которая соответствует текущему значению слайдера.
     */
    get classNameSelected(): string;
    /**
     * Сеттер названия класса HTML-элемента метки, которая соответствует текущему значению слайдера.
     * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
     * @param {string} name - Название класса.
     */
    set classNameSelected(name: string);
    /**
     * Геттер позиции метки в процентах от левого края.
     * @returns {number} - Позиция метки в процентах от 0 до 100.
     */
    get posLeft(): number;
    /**
     * Сеттер позиции метки в процентах от левого края.
     * @param {number} - Позиция метки в процентах от 0 до 100.
     */
    set posLeft(left: number);
    /**
     *
     * @param value
     * @returns
     */
    isInrange(value?: boolean): boolean;
    /**
     *
     * @param value
     * @returns
     */
    isSelected(value?: boolean): boolean;
}
