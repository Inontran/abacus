/**
 * Класс Model реализует "Модель" паттерна проектирования MVP.
 * В этом классе хранится данные слайдера, а также бизнес логика работы с этими данными.
 */
export class Model{
  /**
   * Свойства слайдера.
   * @private
   */
  private _abacusProperty: AbacusOptions = {
    animate: true,
    classes: {
      abacus: 'abacus',
      handle: 'abacus__handle',
      range: 'abacus__range',
    },
    disabled: false,
    max: 100,
    min: 0,
    orientation: 'horizontal',
    range: false,
    step: 1,
    value: 0,
    values: null,
  }

  /**
   * Объект, который может генерировать события и может иметь подписчиков на эти события.
   * @private
   */
  private _eventTarget: EventTarget;

  /**
   * Событие изменения данных в Модели.
   * @private 
   */
  private _eventUpdateModel: CustomEvent;

  /**
   * @this Model
   * @param {AbacusOptions} data - Свойства слайдера.
   */
  constructor(data?: AbacusOptions){
    if( data ){
      this._abacusProperty = $.extend({}, this._abacusProperty, data);
    }

    this._abacusProperty.value = this._abacusProperty.value ? this._abacusProperty.value : 0;
    this._abacusProperty.value = this.roundValuePerStep( this._abacusProperty.value );
    this._abacusProperty.max = this._abacusProperty.max ? this._abacusProperty.max : 100;
    this._abacusProperty.min = this._abacusProperty.min ? this._abacusProperty.min : 0;

    if( this._abacusProperty.max < this._abacusProperty.min ){
      let tmpMax = this._abacusProperty.max;
      this._abacusProperty.max = this._abacusProperty.min;
      this._abacusProperty.min = tmpMax;
    }
    
    this._eventTarget = new EventTarget();
    this._eventUpdateModel = new CustomEvent('update-model');
  }


  /**
   * Геттер свойств слайдера.
   * @returns {AbacusOptions} - Свойства слайдера, хранящиеся в Модели.
   */
  public get abacusProperty() : AbacusOptions {
    return this._abacusProperty;
  }

  /**
   * Сеттер свойств слайдера.
   * @param {AbacusOptions} abacusProperty - Свойства слайдера, которые нужно добавить в Модель.
   */
  public set abacusProperty(abacusProperty: AbacusOptions) {
    this._abacusProperty = $.extend({}, this._abacusProperty, abacusProperty);
    this._eventTarget.dispatchEvent(this._eventUpdateModel);
  }


  /**
   * Сеттер текущего значения слайдера.
   * @param {number} value - Текущее значение слайдера.
   */
  public set value(value : number) {
    this._abacusProperty.value = this.roundValuePerStep(value);
    this._eventTarget.dispatchEvent(this._eventUpdateModel);
  }

  /**
   * 
   */
  public get eventTarget(): EventTarget{
    return this._eventTarget;
  }


  /**
   * Функция, округляющее переданное значение до ближайшего шага.
   * @param {number} value - Текущее значение слайдера.
   * @returns {number} - Значение слайдера, округленное до ближайшего шага.
   */
  roundValuePerStep(value: number): number{
    let result: number = value;
    let minVal: number = this._abacusProperty.min as number;
    let maxVal: number = this._abacusProperty.max as number;
    let step: number = this._abacusProperty.step as number;

    if( value >= maxVal ){
      return maxVal;
    }
    if( value <= minVal ){
      return minVal;
    }

    for (let valByStep = minVal; valByStep < maxVal; valByStep += step){
      if( value > valByStep && value < valByStep + step ){
        if( valByStep + step > maxVal ){
          result = maxVal;
          break;
        }
        
        let prevVal: number = valByStep;
        let	positivePrevVal: number = prevVal < 0 ? prevVal * -1 : prevVal;// берем предыдущее значение по модулю
        let nextVal: number = valByStep + step;
        let	positiveNextVal: number = nextVal < 0 ? nextVal * -1 : nextVal;// берем следующее значение по модулю
        let positiveValue: number = value < 0 ? value * -1 : value;// берем переданное значение по модулю

        let deltaPrevValue: number;
        let deltaNextValue: number;

        if( value < 0 ){
          deltaPrevValue = positivePrevVal - positiveValue;
          deltaNextValue = positiveValue - positiveNextVal;
        }
        else{
          deltaPrevValue = positiveValue - positivePrevVal;
          deltaNextValue = positiveNextVal - positiveValue;
        }

        if( deltaPrevValue < deltaNextValue ){
          result = prevVal;
        } else{
          result = nextVal;
        }
        break;
      }
    }
    
    return result;
  }

}