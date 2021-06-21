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
      this.abacusProperty = data;
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
    // animate
    if( abacusProperty.animate !== undefined ){
      if (abacusProperty.animate == 'fast' 
      || abacusProperty.animate == 'slow' 
      || typeof abacusProperty.animate === 'boolean') 
      {
        this._abacusProperty.animate = abacusProperty.animate;
      }
      else if( abacusProperty.animate == null ){
        this._abacusProperty.animate = false;
      }
      else if( !isNaN(abacusProperty.animate as number) ){
        this._abacusProperty.animate = parseInt(abacusProperty.animate as string);
      }
    }

    // classes
    if( typeof abacusProperty.classes === 'object' ){
      const arrClassName: string[] = ['abacus', 'range', 'handle'];

      for (let i = 0; i < arrClassName.length; i++) {
        if( typeof abacusProperty.classes[arrClassName[i]] === 'string' && this._abacusProperty.classes ){
          this._abacusProperty.classes[arrClassName[i]] = abacusProperty.classes[arrClassName[i]];
        }
      }
    }

    // disabled
    if( abacusProperty.disabled !== undefined ){
      this._abacusProperty.disabled = !!abacusProperty.disabled;
    }

    //max
    if( abacusProperty.max !== undefined && abacusProperty.max !== null ){
      if( !isNaN(abacusProperty.max as number) ){
        if( typeof abacusProperty.max === 'string' ){
          this._abacusProperty.max = parseFloat(abacusProperty.max);
        }
        else{
          this._abacusProperty.max = abacusProperty.max;
        }
      }
    }

    //min
    if( abacusProperty.min !== undefined && abacusProperty.min !== null ){
      if( !isNaN(abacusProperty.min as number) ){
        if( typeof abacusProperty.min === 'string' ){
          this._abacusProperty.min = parseFloat(abacusProperty.min);
        }
        else{
          this._abacusProperty.min = abacusProperty.min;
        }
      }
    }

    if( (this._abacusProperty.max as number) < (this._abacusProperty.min as number) ){
      let tmpMax = this._abacusProperty.max;
      this._abacusProperty.max = this._abacusProperty.min;
      this._abacusProperty.min = tmpMax;
    }

    //step
    if( abacusProperty.step !== undefined && abacusProperty.step !== null ){
      if( !isNaN(abacusProperty.step as number) ){
        if( typeof abacusProperty.step === 'string' ){
          this._abacusProperty.step = parseFloat(abacusProperty.step);
        }
        else{
          this._abacusProperty.step = abacusProperty.step;
        }
      }
    }

    //value
    if( abacusProperty.value !== undefined && abacusProperty.value !== null ){
      if( !isNaN(abacusProperty.value as number) ){
        if( typeof abacusProperty.value === 'string' ){
          abacusProperty.value = parseFloat(abacusProperty.value);
        }
        abacusProperty.value = this.roundValuePerStep(abacusProperty.value);
        this._abacusProperty.value = abacusProperty.value;
      }
    }

    //orientation
    if( abacusProperty.orientation !== undefined ){
      if( abacusProperty.orientation == 'vertical' )
      {
        this._abacusProperty.orientation = 'vertical';
      }
      else{
        this._abacusProperty.orientation = 'horizontal';
      }
    }

    //range
    if( abacusProperty.range !== undefined ){
      if( abacusProperty.range === false || abacusProperty.range === true){
        this._abacusProperty.range = abacusProperty.range;
      }
      else if( abacusProperty.range == 'max' ){
        this._abacusProperty.range = 'max';
      }
      else if( abacusProperty.range == 'min' ){
        this._abacusProperty.range = 'min';
      }
    }

    //change
    if( abacusProperty.change !== undefined ){
      this._abacusProperty.change = abacusProperty.change;
    }

    //create
    if( abacusProperty.create !== undefined ){
      this._abacusProperty.create = abacusProperty.create;
    }

    //slide
    if( abacusProperty.slide !== undefined ){
      this._abacusProperty.slide = abacusProperty.slide;
    }

    //start
    if( abacusProperty.start !== undefined ){
      this._abacusProperty.start = abacusProperty.start;
    }

    //stop
    if( abacusProperty.stop !== undefined ){
      this._abacusProperty.stop = abacusProperty.stop;
    }

    if( this._eventTarget ){
      this._eventTarget.dispatchEvent(this._eventUpdateModel);
    }
  }


  /**
   * Сеттер текущего значения слайдера.
   * @param {number} value - Текущее значение слайдера.
   */
  public set value(value : number) {
    this._abacusProperty.value = this.roundValuePerStep(value);
    if( this._eventTarget ){
      this._eventTarget.dispatchEvent(this._eventUpdateModel);
    }
  }

  /**
   * Геттер объекта, который может генерировать события и может иметь подписчиков на эти события.
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