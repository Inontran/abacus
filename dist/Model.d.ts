import EventTarget from '@ungap/event-target';
/**
 * Класс Model реализует "Модель" паттерна проектирования MVP.
 * В этом классе хранится данные слайдера, а также бизнес логика работы с этими данными.
 */
export declare class Model {
    /**
     * Свойства слайдера.
     * @private
     */
    private _abacusProperty;
    /**
     * Объект, который может генерировать события и может иметь подписчиков на эти события.
     * @private
     */
    private _eventTarget;
    /**
     * Событие изменения данных в Модели.
     * @private
     */
    private _eventUpdateModel;
    /**
     * @this Model
     * @param {AbacusOptions} data Свойства слайдера.
     */
    constructor(data?: AbacusOptions);
    /**
     * Геттер свойств слайдера.
     * @returns {AbacusOptions} Свойства слайдера, хранящиеся в Модели.
     */
    get abacusProperty(): AbacusOptions;
    /**
     * Сеттер свойств слайдера.
     * @param {AbacusOptions} abacusProperty Свойства слайдера, которые нужно добавить в Модель.
     */
    set abacusProperty(abacusProperty: AbacusOptions);
    /**
     * Сеттер текущего значения слайдера.
     * @param {number} value Текущее значение слайдера.
     */
    set value(value: number);
    /**
     * Геттер объекта, который может генерировать события и может иметь подписчиков на эти события.
     */
    get eventTarget(): EventTarget;
    /**
     * Функция, округляющее переданное значение до ближайшего шага.
     * @param {number} value Текущее значение слайдера.
     * @returns {number} Значение слайдера, округленное до ближайшего шага.
     */
    roundValuePerStep(value: number): number;
    /**
     * Функция получения количества знаков после запятой.
     * @param {number} x Число, у которого надо узнать количество знаков после запятой.
     * @returns {number} Количество знаков после запятой.
     */
    static countNumAfterPoint(x: number): number;
    /**
     * Функция окргуления числа до того количества знаков после запятой, сколько этих знаков у числа fractionalNum.
     * @param {number} value Число, которое надо округлить.
     * @param {number} fractionalNum Число, у которого надо узнать количество знаков после запятой.
     * @returns {number} Округленное число.
     */
    static round(value: number, fractionalNum: number): number;
}
