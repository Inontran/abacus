/**
 * Класс "Tooltip" является оберткой для HTML-элемента подсказки со значением ручки слайдера.
 * Также класс является "subView", то есть частью Вида (Представления) согласно паттерну проектирования MVP.
 */
export declare class Tooltip {
    /**
     * HTML-элемент подсказки со значением ручки слайдера.
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
     * Название класса HTML-элемента подсказки, которая находится в состоянии видимости.
     * @type {string}
     * @private
     */
    private _classNameVisible;
    /**
     * Если параметр равен "true", то это значит, что подсказка отображается.
     * @type {boolean}
     * @private
     */
    private _isVisible;
    /**
     * Позиция подсказки в процентах от 0 до 100 по горизонтали от левого края.
     * @type {number}
     * @private
     */
    private _posLeft;
    /**
      * Позиция подсказки в процентах от 0 до 100 по вертикали от нижнего края.
      * @type {number}
      * @private
      */
    private _posBottom;
    /**
     * @constructor
     * @this   {Tooltip}
     * @param  {AbacusClasses} classes - Объект с названиями классов.
     * @example new Tooltip({
     *  tooltip: 'abacus__tooltip',
     *  tooltipVisible: 'abacus__tooltip_visible'
     * });
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
    get classNameVisible(): string;
    /**
     * Сеттер названия класса HTML-элемента метки, которая находится в диапозоне.
     * Удаляет предудыщее название у HTML-элемента, а затем ставит новое название.
     * @param {string} name - Название класса.
     */
    set classNameVisible(name: string);
    /**
     * Геттер позиции подсказки в процентах от левого края.
     * @returns {number} - Позиция подсказки в процентах от 0 до 100.
     */
    get posLeft(): number | null;
    /**
     * Сеттер позиции подсказки в процентах от левого края.
     * @param {number | null} - Позиция подсказки в процентах от 0 до 100.
     * Или null, если координты по горизонтиле быть не должно.
     */
    set posLeft(left: number | null);
    /**
     * Геттер позиции подсказки в процентах от нижнего края.
     * @returns {number | null} - Позиция подсказки в процентах от 0 до 100.
     */
    get posBottom(): number | null;
    /**
     * Сеттер позиции подсказки в процентах от нижнего края.
     * @param {number | null} - Позиция подсказки в процентах от 0 до 100.
     * Или null, если координты по вертикале быть не должно.
     */
    set posBottom(bottom: number | null);
    /**
     * Функция получения и установки состояния видимости подсказки.
     * Если функция получила параметр false, то у метки удалаяется класс,
     * записанный в _classNameVisible.
     * Если функция получила параметр true, то метке добавляется класс,
     * записанный в _classNameVisible.
     * @param {boolean} value - Если передать "true", то добавляется класс, иначе удалается класс.
       * Если ничего не передать, то возвращается текущее состояние.
     * @returns {boolean} - Текущее состояние метки, а именно, в диапозоне она находится или нет.
     */
    isVisible(value?: boolean): boolean;
}
