import EventTarget from '@ungap/event-target';
import {Model} from './Model';

/**
 * Класс Presenter реализует "Представителя" паттерна проектирования MVP.
 * Соответственно, он отвечает за передачу данных от Вида к Модели и обратно.
 */
export class Presenter{
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
  constructor(options?: AbacusOptions){
    const presenterInstance = this;
    this._model = new Model(options);

    this._eventTarget = new EventTarget();
    this._eventUpdateModel = new CustomEvent('update-model');

    this._model.eventTarget.addEventListener('update-model', (event: Event) => {
      presenterInstance._eventTarget.dispatchEvent(presenterInstance._eventUpdateModel);
    });
  }


  /**
   * Функция получения свойств слайдера, полученные из Модели.
   * @returns {AbacusOptions} Свойства слайдера, полученные из Модели.
   */
  getModelAbacusProperty(): AbacusOptions{
    return this._model.abacusProperty;
  }


  /**
   * Функция получения свойств слайдера, полученные из Модели.
   * @returns {AbacusOptions} Свойства слайдера, полученные из Модели.
   */
  setModelAbacusProperty(abacusProperty: AbacusOptions): void{
    this._model.abacusProperty = abacusProperty;
  }


  /**
   * Функция установки текущего значения слайдера.
   * @param {number} value Текущее значение слайдера.
   */
  setAbacusValue(value: number): void{
    this._model.value = value;
  }


  /**
   * Геттер объекта, который может генерировать события и может иметь подписчиков на эти события.
   */
  public get eventTarget(): EventTarget{
    return this._eventTarget;
  }
}