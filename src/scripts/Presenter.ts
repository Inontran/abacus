import {Model} from './Model';

/**
 * Класс Presenter реализует "Представителя" паттерна проектирования MVP.
 * Соответственно, он отвечает за передачу данных от Вида к Модели и обратно.
 */
export class Presenter{
  /**
   * Ссылка на Модель, которая содержит данные слайдера.
   * @private
   */
  private _model: Model;

  /**
   * @this Presenter
   * @param {AbacusOptions} options - Свойства слайдера. Например, минимальное, максимальное и текущее значения.
   */
  constructor(options?: AbacusOptions){
    this._model = new Model(options);
  }


  /**
   * Функция получения свойств слайдера, полученные из Модели.
   * @returns {AbacusOptions} - Свойства слайдера, полученные из Модели.
   */
  getModelAbacusProperty(): AbacusOptions{
    return this._model.abacusProperty;
  }


  /**
   * Функция установки текущего значения слайдера.
   * @param {number} value - Текущее значение слайдера.
   */
  setAbacusValue(value: number): void{
    this._model.value = value;
  }
}