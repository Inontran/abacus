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
     * @param  {AbacusClasses} classes - Объект с названиями классов.
     * @example new Mark({
       * 	mark: 'abacus__mark',
       * 	markInrange: 'abacus__mark_inrange',
       * 	markSelected: 'abacus__mark_selected'
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
     * Функция получения и установки состояния "в диапозоне".
     * Если функция получила параметр false, то у метки удалаяется класс,
     * записанный в _classNameInrange.
     * Если функция получила параметр true, то метке добавляется класс,
     * записанный в _classNameInrange.
     * @param {boolean} value - Если передать "true", то добавляется класс, иначе удалается класс. Если ничего не передать,
     * то возвращается текущее состояние.
     * @returns {boolean} - Текущее состояние метки, а именно, в диапозоне она находится или нет.
     */
    isInrange(value?: boolean): boolean;
    /**
     * Функция получения и установки состояния "выбранная".
     * Это значит, что напротив этой метки установлена одна из ручек слайдера.
     * Если функция получила параметр false, то у метки удалаяется класс,
     * записанный в _classNameSelected.
     * Если функция получила параметр true, то метке добавляется класс,
     * записанный в _classNameSelected.
     * @param {boolean} value - Если передать "true", то добавляется класс, иначе удалается класс. Если ничего не передать,
     * то возвращается текущее состояние.
     * @returns {boolean} - Текущее состояние метки.
     */
    isSelected(value?: boolean): boolean;
}
