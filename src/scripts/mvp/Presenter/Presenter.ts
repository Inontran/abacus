import EventTarget from '@ungap/event-target';

import Model from '../Model/Model';
import View from '../View/View';

/**
 * Класс Presenter реализует "Представителя" паттерна проектирования MVP.
 * Соответственно, он отвечает за передачу данных от Вида к Модели и обратно.
 */
class Presenter {
  /**
   * Модель, которая содержит данные слайдера.
   * @type {Model}
   * @private
   */
  private _model: Model;

  /**
   * Вид, который отвечает за отображение слайдера.
   * @type {View}
   * @private
   */
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

    if (options) {
      this.setProperties(options);
    }

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
      switch (param1) {
        case 'animate':
          this._view.animate = propValue;
          break;

        case 'classes':
          this._view.classes = propValue;
          break;
          
        case 'isDisabled':
          this._view.isDisabled = propValue;
          break;

        case 'max':
          this._model.maxValue = propValue;
          break;

        case 'hasMarks':
          this._view.hasMarks = propValue;
          break;

        case 'min':
          this._model.minValue = propValue;
          break;

        case 'orientation':
          this._view.orientation = propValue;
          break;

        case 'range':
          this._view.rangeOption = propValue;
          break;

        case 'step':
          this._model.valChangeStep = propValue;
          break;

        case 'hasTooltip':
          this._view.hasTooltip = propValue;
          break;
          
        case 'values':
          this._model.values = propValue;
          break;

        default:
          break;
      }

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
      for (const propName in param1) {
        if (Object.prototype.hasOwnProperty.call(param1, propName)) {
          if (param1.animate !== undefined) {
            this._view.animate = param1.animate;
          }
          if (typeof param1.classes === 'object') {
            this._view.classes = param1.classes;
          }
          if (param1.isDisabled !== undefined) {
            this._view.isDisabled = param1.isDisabled;
          }
          if (typeof param1.max === 'number') {
            this._model.maxValue = param1.max;
          }
          if (param1.hasMarks !== undefined) {
            this._view.hasMarks = param1.hasMarks;
          }
          if (typeof param1.min === 'number') {
            this._model.minValue = param1.min;
          }
          if (param1.orientation !== undefined) {
            this._view.orientation = param1.orientation;
          }
          if (param1.range !== undefined) {
            this._view.rangeOption = param1.range;
          }
          if (typeof param1.step === 'number') {
            this._model.valChangeStep = param1.step;
          }
          if (param1.hasTooltip !== undefined) {
            this._view.hasTooltip = param1.hasTooltip;
          }
          if (param1.values?.length) {
            this._model.values = param1.values;
          }
        }
      }

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
    let resultGettingProp: AbacusProperties | number | string | number[] | boolean | AbacusClasses | undefined;

    switch (optionName) {
      case 'animate':
        resultGettingProp = this._view.animate;
        break;

      case 'classes':
        resultGettingProp = this._view.classes;
        break;
        
      case 'isDisabled':
        resultGettingProp = this._view.isDisabled;
        break;

      case 'max':
        resultGettingProp = this._model.maxValue;
        break;

      case 'hasMarks':
        resultGettingProp = this._view.hasMarks;
        break;

      case 'min':
        resultGettingProp = this._model.minValue;
        break;

      case 'orientation':
        resultGettingProp = this._view.orientation;
        break;

      case 'range':
        resultGettingProp = this._view.rangeOption;
        break;

      case 'step':
        resultGettingProp = this._model.valChangeStep;
        break;

      case 'hasTooltip':
        resultGettingProp = this._view.hasTooltip;
        break;
        
      case 'values':
        resultGettingProp = this._model.values;
        break;

      default:
        const abacusProperties: AbacusProperties = {} as AbacusProperties;
        abacusProperties.animate = this._view.animate;
        abacusProperties.classes = this._view.classes;
        abacusProperties.isDisabled = this._view.isDisabled;
        abacusProperties.max = this._model.maxValue;
        abacusProperties.hasMarks = this._view.hasMarks;
        abacusProperties.min = this._model.minValue;
        abacusProperties.orientation = this._view.orientation;
        abacusProperties.range = this._view.rangeOption;
        abacusProperties.step = this._model.valChangeStep;
        abacusProperties.hasTooltip = this._view.hasTooltip;
        abacusProperties.values = this._model.values;
        return abacusProperties;
        break;
    }

    return resultGettingProp;

    // switch (optionName) {
    //   case 'animate':
    //   case 'classes':
    //   case 'isDisabled':
    //   case 'max':
    //   case 'hasMarks':
    //   case 'min':
    //   case 'orientation':
    //   case 'range':
    //   case 'step':
    //   case 'hasTooltip':
    //   case 'values':
    //     return this._model.abacusProperties[optionName];

    //   default:
    //     return this._model.abacusProperties;
    // }
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
