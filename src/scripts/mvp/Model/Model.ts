import EventTarget from '@ungap/event-target';

import AbacusOrientationType from '../../utils/AbacusOrientationType';
import { round } from '../../utils/helpers';

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
      isDisabled: 'abacus_disabled',
      handle: 'abacus__handle',
      range: 'abacus__range',
      mark: 'abacus__mark',
      markSelected: 'abacus__mark_selected',
      markInrange: 'abacus__mark_in-range',
      tooltip: 'abacus__tooltip',
    },
    isDisabled: false,
    interval: false,
    max: 100,
    min: 0,
    orientation: AbacusOrientationType.HORIZONTAL,
    range: false,
    hasMarks: false,
    step: 1,
    hasTooltip: false,
    values: [0],
  };

  /**
   * Свойство, указывающее на то, работает ли слайдер в режиме интервала или нет.
   * @type {boolean}
   */
  private _interval: boolean = false;

  private _maxValue: number = 100;

  private _minValue: number = 0;

  private _valChangeStep: number = 1;

  private _values: number[] = [0];

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
      if (typeof abacusProperties.classes.isDisabled === 'string' && abacusProperties.classes.isDisabled) {
        this._abacusProperties.classes.isDisabled = abacusProperties.classes.isDisabled;
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

    // isDisabled
    if (abacusProperties.isDisabled !== undefined) {
      this._abacusProperties.isDisabled = !!abacusProperties.isDisabled;
    }

    // max
    if (abacusProperties.max !== undefined && abacusProperties.max !== null) {
      if (typeof abacusProperties.max === 'number') {
        this._abacusProperties.max = abacusProperties.max;
      }
    }

    // hasMarks
    if (abacusProperties.hasMarks !== undefined) {
      this._abacusProperties.hasMarks = !!abacusProperties.hasMarks;
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

    // hasTooltip
    if (abacusProperties.hasTooltip !== undefined) {
      this._abacusProperties.hasTooltip = !!abacusProperties.hasTooltip;
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
      if (abacusProperties.orientation === 'vertical'
        || abacusProperties.orientation === AbacusOrientationType.VERTICAL) {
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
  get eventTarget(): EventTarget {
    return this._eventTarget;
  }

  get interval(): boolean {
    return this._interval;
  }

  set maxValue(propValue: number) {
    this._maxValue = propValue;
  }

  get maxValue(): number {
    return this._maxValue;
  }

  set minValue(propValue: number) {
    this._minValue = propValue;
  }

  get minValue(): number {
    return this._minValue;
  }

  set valChangeStep(propValue: number) {
    this._valChangeStep = propValue;
  }

  get valChangeStep(): number {
    return this._valChangeStep;
  }

  set values(propValue: number[]) {
    if (propValue?.length) {
      this._values = [] as number[];

      for (let i = 0; i < propValue.length; i += 1) {
        if (typeof propValue[i] === 'string') {
          propValue[i] = parseFloat(propValue[i].toString());
        }
        propValue[i] = this.roundValuePerStep(propValue[i]);
        this._values[i] = propValue[i];

        if (i > 1) break;
      }

      this._values.sort((a, b) => {
        if (a > b) return 1;
        if (a === b) return 0;
        return -1;
      });

      if (this._values.length < 2) this._interval = false;
      else this._interval = true;
    }

    for (let i = 0; i < this._values.length; i += 1) {
      if (i === 0 && this._values[0] < this._minValue) {
        this._values[0] = this._minValue;
      }
      if (i === 1 && this._values[1] > this._maxValue) {
        this._values[1] = this._maxValue;
      }
    }
  }

  get values(): number[] {
    return this._values;
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

    result = round(result, step);
    return result;
  }
}

export default Model;
