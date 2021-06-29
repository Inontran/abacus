/**
 * Класс "Handle" является оберткой для HTML-элемента бегунка.
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
export declare class Handle {
    /**
     * HTML-элемент бегунка.
     * @type {HTMLElement}
     * @private
     */
    private _htmlElement;
    /**
     * Позиция бегунка в процентах от 0 до 100 по горизонтали от левого края.
     * @type {number}
     * @private
     */
    private _posLeft;
    /**
     * Позиция бегунка в процентах от 0 до 100 по вертикали от нижнего края.
     * @type {number}
     * @private
     */
    private _posBottom;
    /**
     * Номер (индекс) бегунка. Может принимать значение 0 или 1.
     * @type {number}
     * @private
     */
    private _handleIndex;
    /**
     * Название класса HTML-элемента.
     * @type {string}
     * @private
     */
    private _className;
    /**
     * @constructor
     * @this   {Handle}
     * @param  {AbacusClasses} classes - Объект с названиями классов.
     * @example new Handle({
     *  handle: 'abacus__handle'
     * });
     */
    constructor(classes?: AbacusClasses, handleIndex?: number);
    /**
     * Геттер позиции бегунка в процентах от левого края.
     * @returns {number} - Позиция бегунка в процентах от 0 до 100.
     */
    get posLeft(): number;
    /**
     * Сеттер позиции бегунка в процентах от левого края.
     * @param {number} - Позиция бегунка в процентах от 0 до 100.
     */
    set posLeft(left: number);
    /**
     * Геттер ссылки на HTML-элемент.
     */
    get htmlElement(): HTMLElement;
    /**
     * Геттер номера (индекса) бегунка.
     */
    get handleIndex(): number;
    /**
     * Геттер названия класса HTML-элемента.
     */
    get className(): string;
    /**
     * Сеттер названия класса HTML-элемента. Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
     * @param {string} name - Название класса.
     */
    set className(value: string);
}
