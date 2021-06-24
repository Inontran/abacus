/**
 * Класс "WidgetContainer" является оберткой для HTML-элемента, в котором содержатся элементы слайдера.
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
export declare class WidgetContainer {
    /**
     * HTML-элемент, в котором содержатся элементы слайдера.
     * @type {HTMLAbacusElement}
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
     * Название класса HTML-элемента.
     * @type {string}
     * @private
     */
    private _classNameDisabled;
    /**
     * @constructor
     * @this   {WidgetContainer}
     * @param  {HTMLAbacusElement} htmlElement - HTML-элемент, в котором будут элементы слайдера.
     * @param  {string} className - Название класса HTML-элемента. По умолчанию равно "abacus".
     */
    constructor(htmlElement: HTMLAbacusElement, className?: string);
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
    get htmlElement(): HTMLAbacusElement;
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
     * Геттер названия класса HTML-элемента в состоянии "выключен".
     */
    get classNameDisabled(): string;
    /**
     * Сеттер названия класса HTML-элемента в состоянии "выключен".
     * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
     * @param {string} name - Название класса.
     */
    set classNameDisabled(name: string);
}
