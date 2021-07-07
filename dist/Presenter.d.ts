import EventTarget from '@ungap/event-target';
/**
 * Класс Presenter реализует "Представителя" паттерна проектирования MVP.
 * Соответственно, он отвечает за передачу данных от Вида к Модели и обратно.
 */
export declare class Presenter {
    /**
     * Ссылка на Модель, которая содержит данные слайдера.
     * @type {Model}
     * @private
     */
    private _model;
    /**
     * Объект, который может генерировать события и может иметь подписчиков на эти события.
     * @type {EventTarget}
     * @private
     */
    private _eventTarget;
    /**
     * Событие изменения данных в Модели.
     * @type {CustomEvent}
     * @private
     */
    private _eventUpdateModel;
    /**
     * @this Presenter
     * @param {AbacusOptions} options Свойства слайдера. Например, минимальное, максимальное и текущее значения.
     */
    constructor(options?: AbacusOptions);
    /**
     * Функция получения свойств слайдера, полученные из Модели.
     * @returns {AbacusOptions} Свойства слайдера, полученные из Модели.
     */
    getModelAbacusProperty(): AbacusOptions;
    /**
     * Функция получения свойств слайдера, полученные из Модели.
     * @returns {AbacusOptions} Свойства слайдера, полученные из Модели.
     */
    setModelAbacusProperty(abacusProperty: AbacusOptions): void;
    /**
     * Функция установки текущих значений слайдера.
     * @param {number[]} values Текущее значения слайдера.
     */
    setAbacusValue(values: number[]): void;
    /**
     * Геттер объекта, который может генерировать события и может иметь подписчиков на эти события.
     */
    get eventTarget(): EventTarget;
}
