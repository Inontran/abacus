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
     * @type {number}
     * @private
     */
    private _width;
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
     * @param  {string} className - Название класса HTML-элемента. По умолчанию равно "abacus__range".
     */
    constructor(className?: string);
    /**
     * Геттер ширины HTML-элемента (_htmlElement).
     */
    get width(): number;
    /**
     * Сеттер ширины HTML-элемента (_htmlElement).
     * @param {number} width - ширина в процентах от 0 до 100.
     */
    set width(width: number);
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
