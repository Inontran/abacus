import EventTarget from '@ungap/event-target';
import AbacusOrientationType from '../AbacusOrientationType';

/**
 * Класс Model реализует "Модель" паттерна проектирования MVP.
 * В этом классе хранится данные слайдера, а также бизнес логика работы с этими данными.
 */
export default class Model {
  /**
   * Свойства слайдера.
   * @private
   */
  private _abacusProperty: AbacusProperty = {
    animate: false,
    classes: {
      abacus: 'abacus',
      vertical: 'abacus_vertical',
      disabled: 'abacus_disabled',
      handle: 'abacus__handle',
      range: 'abacus__range',
      mark: 'abacus__mark',
      markSelected: 'abacus__mark_selected',
      markInrange: 'abacus__mark_inrange',
      tooltip: 'abacus__tooltip',
      tooltipVisible: 'abacus__tooltip_visible',
    },
    disabled: false,
    max: 100,
    min: 0,
    orientation: AbacusOrientationType.HORIZONTAL,
    range: false,
    scale: false,
    step: 1,
    tooltip: false,
    value: 0,
    values: [0],
  };

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
   * @param {AbacusOptions} data Свойства слайдера.
   */
  constructor(data?: AbacusOptions) {
    if (data) {
      this.setAbacusProperty(data);
    }

    this._eventTarget = new EventTarget();
    this._eventUpdateModel = new CustomEvent('update-model');
  }

  /**
   * Геттер свойств слайдера.
   * @returns {AbacusProperty} Свойства слайдера, хранящиеся в Модели.
   */
  public get abacusProperty() : AbacusProperty {
    return this._abacusProperty;
  }

  /**
   * @param {AbacusOptions} abacusProperty Свойства слайдера, которые нужно добавить в Модель.
   */
  public setAbacusProperty(newAbacusProperty: AbacusOptions | AbacusProperty) {
    const abacusProperty = newAbacusProperty;

    // animate
    if (abacusProperty.animate !== undefined) {
      const isAnimatePropFastOrSlow = abacusProperty.animate === 'fast' || abacusProperty.animate === 'slow';
      const isAnimatePropBoolean = typeof abacusProperty.animate === 'boolean';
      const isAnimatePropResult = isAnimatePropFastOrSlow || isAnimatePropBoolean;
      if (isAnimatePropResult) {
        this._abacusProperty.animate = abacusProperty.animate;
      } else if (typeof abacusProperty.animate === 'number') {
        this._abacusProperty.animate = Math.round(abacusProperty.animate);
      } else {
        this._abacusProperty.animate = false;
      }
    }

    // classes
    if (typeof abacusProperty.classes === 'object') {
      if (!this._abacusProperty.classes) {
        this._abacusProperty.classes = {} as AbacusClasses;
      }

      if (typeof abacusProperty.classes.abacus === 'string' && abacusProperty.classes.abacus) {
        this._abacusProperty.classes.abacus = abacusProperty.classes.abacus;
      }
      if (typeof abacusProperty.classes.disabled === 'string' && abacusProperty.classes.disabled) {
        this._abacusProperty.classes.disabled = abacusProperty.classes.disabled;
      }
      if (typeof abacusProperty.classes.range === 'string' && abacusProperty.classes.range) {
        this._abacusProperty.classes.range = abacusProperty.classes.range;
      }
      if (typeof abacusProperty.classes.handle === 'string' && abacusProperty.classes.handle) {
        this._abacusProperty.classes.handle = abacusProperty.classes.handle;
      }
      if (typeof abacusProperty.classes.mark === 'string' && abacusProperty.classes.mark) {
        this._abacusProperty.classes.mark = abacusProperty.classes.mark;
      }
      if (typeof abacusProperty.classes.markSelected === 'string' && abacusProperty.classes.markSelected) {
        this._abacusProperty.classes.markSelected = abacusProperty.classes.markSelected;
      }
      if (typeof abacusProperty.classes.markInrange === 'string' && abacusProperty.classes.markInrange) {
        this._abacusProperty.classes.markInrange = abacusProperty.classes.markInrange;
      }
      if (typeof abacusProperty.classes.tooltip === 'string' && abacusProperty.classes.tooltip) {
        this._abacusProperty.classes.tooltip = abacusProperty.classes.tooltip;
      }
      if (typeof abacusProperty.classes.tooltipVisible === 'string' && abacusProperty.classes.tooltipVisible) {
        this._abacusProperty.classes.tooltipVisible = abacusProperty.classes.tooltipVisible;
      }
    }

    // disabled
    if (abacusProperty.disabled !== undefined) {
      this._abacusProperty.disabled = !!abacusProperty.disabled;
    }

    // max
    if (abacusProperty.max !== undefined && abacusProperty.max !== null) {
      if (typeof abacusProperty.max === 'number') {
        this._abacusProperty.max = abacusProperty.max;
      }
    }

    // scale
    if (abacusProperty.scale !== undefined) {
      this._abacusProperty.scale = !!abacusProperty.scale;
    }

    // min
    if (abacusProperty.min !== undefined && abacusProperty.min !== null) {
      if (typeof abacusProperty.min === 'number') {
        this._abacusProperty.min = abacusProperty.min;
      }
    }

    if ((this._abacusProperty.max as number) < (this._abacusProperty.min as number)) {
      const tmpMax = this._abacusProperty.max;
      this._abacusProperty.max = this._abacusProperty.min;
      this._abacusProperty.min = tmpMax;
    }

    // step
    if (abacusProperty.step !== undefined && abacusProperty.step !== null) {
      if (typeof abacusProperty.step === 'number') {
        this._abacusProperty.step = abacusProperty.step;
      }
    }

    // tooltip
    if (abacusProperty.tooltip !== undefined) {
      this._abacusProperty.tooltip = !!abacusProperty.tooltip;
    }

    // range
    if (abacusProperty.range !== undefined) {
      if (abacusProperty.range === false || abacusProperty.range === true) {
        this._abacusProperty.range = abacusProperty.range;
      } else if (abacusProperty.range === 'max') {
        this._abacusProperty.range = 'max';
      } else if (abacusProperty.range === 'min') {
        this._abacusProperty.range = 'min';
      }
    }

    // value
    if (abacusProperty.value !== undefined && abacusProperty.value !== null) {
      if (!Number.isNaN(abacusProperty.value)) {
        if (typeof abacusProperty.value === 'string') {
          abacusProperty.value = parseFloat(abacusProperty.value);
        }
        abacusProperty.value = this.roundValuePerStep(abacusProperty.value);
        this._abacusProperty.value = abacusProperty.value;

        if (!this._abacusProperty.values?.length) {
          this._abacusProperty.values = [];
        }
        this._abacusProperty.values[0] = abacusProperty.value;
      }
    }

    // values
    if (abacusProperty.values?.length) {
      this._abacusProperty.values = [];

      for (let i = 0; i < abacusProperty.values.length; i += 1) {
        if (typeof abacusProperty.values[i] === 'string') {
          abacusProperty.values[i] = parseFloat(abacusProperty.values[i].toString());
        }
        abacusProperty.values[i] = this.roundValuePerStep(abacusProperty.values[i]);
        this._abacusProperty.values[i] = abacusProperty.values[i];

        if (i === 0) {
          this._abacusProperty.value = abacusProperty.values[i];
        }

        if (i > 1) break;
      }

      this._abacusProperty.values.sort((a, b) => {
        if (a > b) return 1;
        if (a === b) return 0;
        return -1;
      });
    }

    if (this._abacusProperty.range === true) {
      if (!this._abacusProperty.values?.length) {
        this._abacusProperty.values = [];
        this._abacusProperty.values[0] = this._abacusProperty.min ? this._abacusProperty.min : 0;
        this._abacusProperty.values[1] = this._abacusProperty.max ? this._abacusProperty.max : 100;
      } else if (this._abacusProperty.values?.length === 1) {
        this._abacusProperty.values[1] = this._abacusProperty.max ? this._abacusProperty.max : 100;
      }
    } else {
      this._abacusProperty.values = this._abacusProperty.values?.slice(0, 1);
    }

    // orientation
    if (abacusProperty.orientation !== undefined) {
      if (abacusProperty.orientation === 'vertical' || abacusProperty.orientation === AbacusOrientationType.VERTICAL) {
        this._abacusProperty.orientation = AbacusOrientationType.VERTICAL;
      } else {
        this._abacusProperty.orientation = AbacusOrientationType.HORIZONTAL;
      }
    }

    // change
    if (abacusProperty.change !== undefined) {
      this._abacusProperty.change = abacusProperty.change;
    }

    // create
    if (abacusProperty.create !== undefined) {
      this._abacusProperty.create = abacusProperty.create;
    }

    // slide
    if (abacusProperty.slide !== undefined) {
      this._abacusProperty.slide = abacusProperty.slide;
    }

    // start
    if (abacusProperty.start !== undefined) {
      this._abacusProperty.start = abacusProperty.start;
    }

    // stop
    if (abacusProperty.stop !== undefined) {
      this._abacusProperty.stop = abacusProperty.stop;
    }

    if (this._eventTarget) {
      this._eventTarget.dispatchEvent(this._eventUpdateModel);
    }
  }

  /**
   * Сеттер текущего значения слайдера.
   * @param {number} value Текущее значение слайдера.
   */
  public set value(value : number) {
    this._abacusProperty.value = this.roundValuePerStep(value);
    if (!this._abacusProperty.values?.length) {
      this._abacusProperty.values = [];
    }
    this._abacusProperty.values[0] = this._abacusProperty.value;

    if (this._eventTarget) {
      this._eventTarget.dispatchEvent(this._eventUpdateModel);
    }
  }

  /**
   * Геттер объекта, который может генерировать события и может иметь подписчиков на эти события.
   */
  public get eventTarget(): EventTarget {
    return this._eventTarget;
  }

  /**
   * Функция, округляющее переданное значение до ближайшего шага.
   * @param {number} value Текущее значение слайдера.
   * @returns {number} Значение слайдера, округленное до ближайшего шага.
   */
  roundValuePerStep(value: number): number {
    let result: number = value;
    const minVal: number = this._abacusProperty.min as number;
    const maxVal: number = this._abacusProperty.max as number;
    const step: number = this._abacusProperty.step as number;

    if (value >= maxVal) {
      return maxVal;
    }
    if (value <= minVal) {
      return minVal;
    }

    for (let valByStep = minVal; valByStep < maxVal; valByStep += step) {
      if (value > valByStep && value < valByStep + step) {
        if (valByStep + step > maxVal) {
          result = maxVal;
          break;
        }

        const prevVal: number = valByStep;
        const positivePrevVal: number = prevVal < 0 ? prevVal * -1 : prevVal;// берем предыдущее значение по модулю
        const nextVal: number = valByStep + step;
        const positiveNextVal: number = nextVal < 0 ? nextVal * -1 : nextVal;// берем следующее значение по модулю
        const positiveValue: number = value < 0 ? value * -1 : value;// берем переданное значение по модулю

        let deltaPrevValue: number;
        let deltaNextValue: number;

        if (value < 0) {
          deltaPrevValue = positivePrevVal - positiveValue;
          deltaNextValue = positiveValue - positiveNextVal;
        } else {
          deltaPrevValue = positiveValue - positivePrevVal;
          deltaNextValue = positiveNextVal - positiveValue;
        }

        if (deltaPrevValue < deltaNextValue) {
          result = prevVal;
        } else {
          result = nextVal;
        }
        break;
      }
    }

    result = Model.round(result, step);
    return result;
  }

  /**
   * Функция получения количества знаков после запятой.
   * @param {number} x Число, у которого надо узнать количество знаков после запятой.
   * @returns {number} Количество знаков после запятой.
   */
  static countNumAfterPoint(x: number): number {
    const xStr = x.toString();
    return (`${xStr}`).indexOf('.') >= 0 ? (`${xStr}`).split('.')[1].length : 0;
  }

  /**
   * Функция окргуления числа до того количества знаков после запятой, сколько этих знаков у числа fractionalNum.
   * @param {number} value Число, которое надо округлить.
   * @param {number} fractionalNum Число, у которого надо узнать количество знаков после запятой.
   * @returns {number} Округленное число.
   */
  static round(value: number, fractionalNum: number): number {
    const numbersAfterPoint = Model.countNumAfterPoint(fractionalNum);
    let roundedValue = value;
    if (numbersAfterPoint > 0) {
      roundedValue = parseFloat(value.toFixed(numbersAfterPoint));
    } else {
      roundedValue = Math.round(value);
    }

    return roundedValue;
  }
}