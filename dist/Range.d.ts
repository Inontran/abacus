/**
 * Класс "Range" является оберткой для HTML-элемента индикатора (progress bar).
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
export declare class Range {
    /**
     * HTML-элемент индикатора.
     * @type {HTMLElement}
     * @private
     */
    private _htmlElement;
    /**
     * Ширина HTML-элемента от 0 до 100 в процентах.
     * @type {number | null}
     * @private
     */
    private _width;
    /**
     * Ширина HTML-элемента от 0 до 100 в процентах.
     * @type {number | null }
     * @private
     */
    private _height;
    /**
     * Название класса HTML-элемента.
     * @type {string}
     * @private
     */
    private _className;
    /**
     *
     * @param className
     */
    private _rangeType;
    /**
     * @constructor
     * @this   {Range}
     * @param  {AbacusClasses} classes - Объект с названиями классов.
     * @example new Handle({
     *  range: 'abacus__range'
     * });
     */
    constructor(classes?: AbacusClasses);
    /**
     * Геттер ширины HTML-элемента (_htmlElement).
     */
    get width(): number | null;
    /**
     * Сеттер ширины HTML-элемента (_htmlElement).
     * @param {number | null} width - ширина в процентах от 0 до 100.
     */
    set width(width: number | null);
    /**
     * Геттер высоты HTML-элемента (_htmlElement).
     */
    get height(): number | null;
    /**
     * Сеттер высоты HTML-элемента (_htmlElement).
     * @param {number | null} height - высота в процентах от 0 до 100.
     */
    set height(height: number | null);
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
    set className(value: string);
    /**
     *
     */
    get rangeType(): string;
    /**
     *
     */
    set rangeType(value: string);
}
