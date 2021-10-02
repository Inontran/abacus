import EventTarget from '@ungap/event-target';

import Model from '../Model/Model';

/**
 * Класс Presenter реализует "Представителя" паттерна проектирования MVP.
 * Соответственно, он отвечает за передачу данных от Вида к Модели и обратно.
 */
class Presenter {
  /**
   * Ссылка на Модель, которая содержит данные слайдера.
   * @type {Model}
   * @private
   */
  private _model: Model;

  /**
   * Объект, который может генерировать события и может иметь подписчиков на эти события.
   * @type {EventTarget}
   * @private
   */
  private _eventTarget: EventTarget;

  /**
   * Событие изменения данных в Модели.
   * @type {CustomEvent}
   * @private
   */
  private _eventUpdateModel: CustomEvent;

  /**
   * @this Presenter
   * @param {AbacusOptions} options Свойства слайдера. Например, минимальное, максимальное и текущее значения.
   */
  constructor(options?: AbacusOptions) {
    this._model = new Model(options);
    this._eventTarget = new EventTarget();
    this._eventUpdateModel = new CustomEvent('update-model');
    this._bindEventListeners();
  }

  /**
   * Функция получения свойств слайдера, полученные из Модели.
   * @returns {AbacusProperty} Свойства слайдера, полученные из Модели.
   */
  getModelAbacusProperty(): AbacusProperty {
    return this._model.abacusProperty;
  }

  /**
   * Функция установки свойств слайдера.
   */
  setModelAbacusProperty(abacusProperty: AbacusOptions | AbacusProperty): void{
    this._model.setAbacusProperty(abacusProperty);
  }

  /**
   * Установка обработчиков событий.
   * @private
   */
  private _bindEventListeners(): void{
    this._model.eventTarget.addEventListener('update-model', this._handleModelUpdate.bind(this));
  }

  /**
   * Обработчик обновления модели.
   * @private
   * @param {Event} event Объект события.
   */
  private _handleModelUpdate(): void{
    this._eventTarget.dispatchEvent(this._eventUpdateModel);
  }

  /**
   * Геттер объекта, который может генерировать события и может иметь подписчиков на эти события.
   */
  public get eventTarget(): EventTarget {
    return this._eventTarget;
  }
}

export default Presenter;
