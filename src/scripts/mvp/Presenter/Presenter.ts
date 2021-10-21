import EventTarget from '@ungap/event-target';

import Model from '../Model/Model';
import View from '../View/View';

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

  private _view: View;

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
  constructor(abacusHtmlWrapper: HTMLElement, options?: AbacusOptions) {
    this._eventTarget = new EventTarget();
    this._eventUpdateModel = new CustomEvent('update-model');
    
    this._model = new Model(options);
    this._view = new View(abacusHtmlWrapper, this, options);

    this._bindEventListeners();
  }

  /**
   * Функция установки свойств слайдера.
   * @param {string} optionName Название свойства, значение которого надо получить или изменить.
   * @param {any} propValue Значение свойства.
   */
  setProperties(
    abacusOptions: AbacusOptions,
  ): void;
  setProperties(
    optionName: string,
    propValue: any,
  ): void;
  setProperties(
    param1: string | AbacusOptions,
    propValue?: any,
  ): void {
    if (typeof param1 === 'string') {
      const newProperties = {} as AbacusOptions;

      switch (param1) {
        case 'animate':
        case 'classes':
        case 'isDisabled':
        case 'max':
        case 'hasMarks':
        case 'min':
        case 'orientation':
        case 'range':
        case 'step':
        case 'hasTooltip':
        case 'values':
          newProperties[param1] = propValue;
          this._model.setAbacusProperties(newProperties);
          break;

        default:
          break;
      }
    } else if (typeof param1 === 'object') {
      this._model.setAbacusProperties(param1);
    }
  }

  /**
   * Функция получения свойств слайдера.
   * @param {string} optionName Название свойства, значение которого надо получить или изменить.
   * @returns {AbacusProperties | number | string | number[] | boolean | AbacusClasses | undefined}
   */
  getProperties(): AbacusProperties;
  getProperties(
    optionName: string,
  ): number | string | number[] | boolean | AbacusClasses | undefined;
  getProperties(
    optionName?: string,
  ): AbacusProperties | number | string | number[] | boolean | AbacusClasses | undefined {
    switch (optionName) {
      case 'animate':
      case 'classes':
      case 'isDisabled':
      case 'max':
      case 'hasMarks':
      case 'min':
      case 'orientation':
      case 'range':
      case 'step':
      case 'hasTooltip':
      case 'values':
        return this._model.abacusProperties[optionName];

      default:
        return this._model.abacusProperties;
    }
  }

  /**
   * Возвращает HTML-элемент контейнера слайдера.
   * @returns {HTMLElement} Контейнер слайдера.
   */
  getWidget(): HTMLElement {
    return this._view.getWidget();
  }

  /**
   * Удаляет слайдер со страницы.
   */
  destroy() {
    this._view.destroy();
  }

  /**
   * Функция получения свойств слайдера, полученные из Модели.
   * @returns {AbacusProperties} Свойства слайдера, полученные из Модели.
   */
  getModelAbacusProperties(): AbacusProperties {
    return this._model.abacusProperties;
  }

  /**
   * Функция установки свойств слайдера.
   */
  setModelAbacusProperties(abacusProperties: AbacusOptions | AbacusProperties): void{
    this._model.setAbacusProperties(abacusProperties);
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
