import EventTarget from '@ungap/event-target';

import AbacusOrientationType from '../../utils/AbacusOrientationType';

/**
 * Класс Model реализует "Модель" паттерна проектирования MVP.
 * В этом классе хранятся данные слайдера, а также логика работы с этими данными.
 */
class Model {
  /**
   * Свойства слайдера.
   * @private
   */
  private _abacusProperties: AbacusProperties = {
    animate: false,
    classes: {
      abacus: 'abacus',
      vertical: 'abacus_vertical',
      disabled: 'abacus_disabled',
      handle: 'abacus__handle',
      range: 'abacus__range',
      mark: 'abacus__mark',
      markSelected: 'abacus__mark_selected',
      markInrange: 'abacus__mark_in-range',
      tooltip: 'abacus__tooltip',
    },
    disabled: false,
    interval: false,
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
      this.setAbacusProperties(data);
    }

    this._eventTarget = new EventTarget();
    this._eventUpdateModel = new CustomEvent('update-model');
  }

  /**
   * Геттер свойств слайдера.
   * @returns {AbacusProperties} Свойства слайдера, хранящиеся в Модели.
   */
  public get abacusProperties() : AbacusProperties {
    return this._abacusProperties;
  }

  /**
   * @param {AbacusOptions} abacusProperties Свойства слайдера, которые нужно добавить в Модель.
   */
  public setAbacusProperties(newAbacusProperties: AbacusOptions | AbacusProperties) {
    const abacusProperties = newAbacusProperties;

    // animate
    if (abacusProperties.animate !== undefined) {
      const isAnimatePropFastOrSlow = abacusProperties.animate === 'fast' || abacusProperties.animate === 'slow';
      const isAnimatePropBoolean = typeof abacusProperties.animate === 'boolean';
      const isAnimatePropResult = isAnimatePropFastOrSlow || isAnimatePropBoolean;
      if (isAnimatePropResult) {
        this._abacusProperties.animate = abacusProperties.animate;
      } else if (parseInt(abacusProperties.animate as string, 10)) {
        this._abacusProperties.animate = Math.round(parseInt(abacusProperties.animate as string, 10));
      } else {
        this._abacusProperties.animate = false;
      }
    }

    // classes
    if (typeof abacusProperties.classes === 'object') {
      if (!this._abacusProperties.classes) {
        this._abacusProperties.classes = {} as AbacusClasses;
      }

      if (typeof abacusProperties.classes.abacus === 'string' && abacusProperties.classes.abacus) {
        this._abacusProperties.classes.abacus = abacusProperties.classes.abacus;
      }
      if (typeof abacusProperties.classes.disabled === 'string' && abacusProperties.classes.disabled) {
        this._abacusProperties.classes.disabled = abacusProperties.classes.disabled;
      }
      if (typeof abacusProperties.classes.range === 'string' && abacusProperties.classes.range) {
        this._abacusProperties.classes.range = abacusProperties.classes.range;
      }
      if (typeof abacusProperties.classes.handle === 'string' && abacusProperties.classes.handle) {
        this._abacusProperties.classes.handle = abacusProperties.classes.handle;
      }
      if (typeof abacusProperties.classes.mark === 'string' && abacusProperties.classes.mark) {
        this._abacusProperties.classes.mark = abacusProperties.classes.mark;
      }
      if (typeof abacusProperties.classes.markSelected === 'string' && abacusProperties.classes.markSelected) {
        this._abacusProperties.classes.markSelected = abacusProperties.classes.markSelected;
      }
      if (typeof abacusProperties.classes.markInrange === 'string' && abacusProperties.classes.markInrange) {
        this._abacusProperties.classes.markInrange = abacusProperties.classes.markInrange;
      }
      if (typeof abacusProperties.classes.tooltip === 'string' && abacusProperties.classes.tooltip) {
        this._abacusProperties.classes.tooltip = abacusProperties.classes.tooltip;
      }
    }

    // disabled
    if (abacusProperties.disabled !== undefined) {
      this._abacusProperties.disabled = !!abacusProperties.disabled;
    }

    // max
    if (abacusProperties.max !== undefined && abacusProperties.max !== null) {
      if (typeof abacusProperties.max === 'number') {
        this._abacusProperties.max = abacusProperties.max;
      }
    }

    // scale
    if (abacusProperties.scale !== undefined) {
      this._abacusProperties.scale = !!abacusProperties.scale;
    }

    // min
    if (abacusProperties.min !== undefined && abacusProperties.min !== null) {
      if (typeof abacusProperties.min === 'number') {
        this._abacusProperties.min = abacusProperties.min;
      }
    }

    if ((this._abacusProperties.max as number) < (this._abacusProperties.min as number)) {
      const tmpMax = this._abacusProperties.max;
      this._abacusProperties.max = this._abacusProperties.min;
      this._abacusProperties.min = tmpMax;
    }

    // step
    if (abacusProperties.step !== undefined && abacusProperties.step !== null) {
      if (typeof abacusProperties.step === 'number') {
        this._abacusProperties.step = abacusProperties.step;
      }
    }

    // tooltip
    if (abacusProperties.tooltip !== undefined) {
      this._abacusProperties.tooltip = !!abacusProperties.tooltip;
    }

    // value
    if (abacusProperties.value !== undefined && abacusProperties.value !== null) {
      if (!Number.isNaN(abacusProperties.value)) {
        if (typeof abacusProperties.value === 'string') {
          abacusProperties.value = parseFloat(abacusProperties.value);
        }
        abacusProperties.value = this.roundValuePerStep(abacusProperties.value);
        this._abacusProperties.value = abacusProperties.value;

        if (!this._abacusProperties.values?.length) {
          this._abacusProperties.values = [];
        }
        this._abacusProperties.values[0] = abacusProperties.value;
      }
    }

    // values
    if (abacusProperties.values?.length) {
      this._abacusProperties.values = [];

      for (let i = 0; i < abacusProperties.values.length; i += 1) {
        if (typeof abacusProperties.values[i] === 'string') {
          abacusProperties.values[i] = parseFloat(abacusProperties.values[i].toString());
        }
        abacusProperties.values[i] = this.roundValuePerStep(abacusProperties.values[i]);
        this._abacusProperties.values[i] = abacusProperties.values[i];

        if (i === 0) {
          this._abacusProperties.value = abacusProperties.values[i];
        }

        if (i > 1) break;
      }

      this._abacusProperties.values.sort((a, b) => {
        if (a > b) return 1;
        if (a === b) return 0;
        return -1;
      });

      if (this._abacusProperties.values.length < 2) this._abacusProperties.interval = false;
      else this._abacusProperties.interval = true;
    }

    for (let i = 0; i < this._abacusProperties.values.length; i += 1) {
      if (i === 0 && this._abacusProperties.values[0] < this._abacusProperties.min) {
        this._abacusProperties.values[0] = this._abacusProperties.min;
      }
      if (i === 1 && this._abacusProperties.values[1] > this._abacusProperties.max) {
        this._abacusProperties.values[1] = this._abacusProperties.max;
      }
    }

    // range
    if (abacusProperties.range !== undefined) {
      if (abacusProperties.range === false || abacusProperties.range === true) {
        this._abacusProperties.range = abacusProperties.range;
      } else if (abacusProperties.range === 'max') {
        this._abacusProperties.range = 'max';
      } else if (abacusProperties.range === 'min') {
        this._abacusProperties.range = 'min';
      }
    }

    // orientation
    if (abacusProperties.orientation !== undefined) {
      if (abacusProperties.orientation === 'vertical' || abacusProperties.orientation === AbacusOrientationType.VERTICAL) {
        this._abacusProperties.orientation = AbacusOrientationType.VERTICAL;
      } else {
        this._abacusProperties.orientation = AbacusOrientationType.HORIZONTAL;
      }
    }

    // change
    if (abacusProperties.change !== undefined) {
      this._abacusProperties.change = abacusProperties.change;
    }

    // create
    if (abacusProperties.create !== undefined) {
      this._abacusProperties.create = abacusProperties.create;
    }

    // slide
    if (abacusProperties.slide !== undefined) {
      this._abacusProperties.slide = abacusProperties.slide;
    }

    // start
    if (abacusProperties.start !== undefined) {
      this._abacusProperties.start = abacusProperties.start;
    }

    // stop
    if (abacusProperties.stop !== undefined) {
      this._abacusProperties.stop = abacusProperties.stop;
    }

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
    const minVal: number = this._abacusProperties.min as number;
    const maxVal: number = this._abacusProperties.max as number;
    const step: number = this._abacusProperties.step as number;

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
        const nextVal: number = valByStep + step;

        const deltaPrevValue: number = value - prevVal;
        const deltaNextValue: number = nextVal - value;

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

export default Model;
