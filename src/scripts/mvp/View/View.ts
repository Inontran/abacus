import AbacusOrientationType from '../../utils/AbacusOrientationType';

import Presenter from '../Presenter/Presenter';

import WidgetContainer from './components/WidgetContainer/WidgetContainer';
import Handle from './components/Handle/Handle';
import Range from './components/Range/Range';
import Mark from './components/Mark/Mark';
import Tooltip from './components/Tooltip/Tooltip';

/**
 * Класс View реализует "Представление" или "Вид" паттерна проектирования MVP.
 * Соответственно, он отвечает за отрисовку интерфейса плагина, получение данных от пользователя и отображение данных,
 * находящихся в Модели.
 */
class View {
  /**
   * Ссылка на Представителя, который связывает объект класса View с объектом класса Model
   * по паттерну проектирования MVP.
   * @type {Presenter}
   * @private
   */
  private _presenter: Presenter;

  /**
   * Объект, в котором содержится ссылка на корневой HTML-элемент плагина с дополнительными свойствами.
   * @type {WidgetContainer}
   * @private
   */
  private _widgetContainer: WidgetContainer;

  /**
   * Объект, в котором содержится ссылка на HTML-элемент индикатора (progress bar) с дополнительными свойствами.
   * @type {Range}
   * @private
   */
  private _range: Range;

  /**
   * Массив, в котором содержатся объекты ручек (Handle) слайдера.
   * @type {Handle[]}
   * @private
   */
  private _handles: Handle[] = [];

  /**
   * Массив, в котором содержатся объекты подсказок (Tooltip) слайдера.
   * @type {Tooltip[]}
   * @private
   */
  private _tooltips: Tooltip[] = [];

  /**
   * Объект события изменения значения слайдера, как у браузерных полей ввода "input".
   * @type {CustomEvent}
   * @private
   */
  private _customEventChange: CustomEvent;

  /**
   * Объект события инициализации плагина.
   * @type {CustomEvent}
   * @private
   */
  private _customEventCreate: CustomEvent;

  /**
   * Объект события процесса перемещения бегунка.
   * @type {CustomEvent}
   * @private
   */
  private _customEventSlide: CustomEvent;

  /**
   * Объект события начала перемещения бегунка.
   * @type {CustomEvent}
   * @private
   */
  private _customEventStart: CustomEvent;

  /**
   * Объект события окончания перемещения бегунка.
   * @type {CustomEvent}
   * @private
   */
  private _customEventStop: CustomEvent;

  /**
   * Включен или выключен слайдер. Если равен false, то включен.
   * @type {boolean}
   * @private
   */
  private _isDisabled = false;

  /**
   * Перемещается ли бегунок в данный момент с помощью мыши.
   * @type {boolean}
   * @private
   */
  private _isDragHandle = false;

  /**
   * Смещение координаты клика по ручке слайдера относительно центра этой ручки.
   * @type {number}
   * @private
   */
  private _shiftClickOnHandle = 0;

  /**
   * Таймер перемещения мыши или пальца на экране.
   * @type {null | NodeJS.Timeout}
   * @private
   */
  private _handleMovingTimer: null | NodeJS.Timeout = null;

  /**
   * Коллекция меток разметки слайдера.
   */
  private _collectionMarks: Set<Mark> = new Set();

  /**
   * Кэш свойств сладйера из Модели.
   */
  private _cachedAbacusProperties?: AbacusProperties;

  /**
   * Если значение равно "true", то значит слайдер находиться в вертикальном состоянии.
   */
  private _isVertical = false;

  /**
   * Ручка слайдера, которая перемещается в данный момент.
   * @type {Handle}
   * @private
   */
  private _currentHandle?: Handle;

  /**
   * HTML-элемент, в котором будет находиться инициализированный слайдер.
   * @type {HTMLElement}
   * @private
   */
  private _abacusHtmlWrapper: HTMLElement;

  /**
   * @constructor
   * @this   {View}
   * @param  {HTMLElement} abacusHtmlWrapper HTML-элемент,
   * в котором будет находиться инициализированный слайдер.
   * @param  {AbacusOptions} options Параметры настройки слайдера.
   */
  constructor(abacusHtmlWrapper: HTMLElement, options?: AbacusOptions) {
    this._presenter = new Presenter(options);
    this._abacusHtmlWrapper = abacusHtmlWrapper;

    const abacusProperties = this._presenter.getModelAbacusProperties();

    this._widgetContainer = new WidgetContainer(abacusProperties.classes);
    this._abacusHtmlWrapper.append(this._widgetContainer.htmlElement);

    this._range = new Range(abacusProperties.classes);

    this._customEventChange = new CustomEvent('abacus-change', {
      bubbles: true,
      cancelable: true,
    });

    this._customEventCreate = new CustomEvent('abacus-create', {
      bubbles: true,
      cancelable: true,
    });

    this._customEventSlide = new CustomEvent('abacus-slide', {
      bubbles: true,
      cancelable: true,
    });

    this._customEventStart = new CustomEvent('abacus-start', {
      bubbles: true,
      cancelable: true,
    });

    this._customEventStop = new CustomEvent('abacus-stop', {
      bubbles: true,
      cancelable: true,
    });

    this._updateView();
    this._bindEventListeners();

    this._eventCreateWrapper();
  }

  /**
   * Функция, которая получает на входе координату клика по оси Х относительно окна браузера,
   * а возвращает количество процентов от начала (левого края) слайдера.
   * @private
   * @param {number} coordXY Координата клика по оси Х относительно окна браузера.
   * @returns {number} Количество процентов от начала (левого края) слайдера.
   */
  private _getPosPercent(coordXY: number): number {
    let result = 0;
    if (this._isVertical) {
      const posTopWidget: number = this._widgetContainer.htmlElement.getBoundingClientRect().top;
      const heigthWidget: number = this._widgetContainer.htmlElement.getBoundingClientRect().height;
      const topPx: number = coordXY - posTopWidget;
      result = (topPx / heigthWidget) * 100;
      result = 100 - result;
    } else {
      const posLeftWidget: number = this._widgetContainer.htmlElement.getBoundingClientRect().left;
      const widthWidget: number = this._widgetContainer.htmlElement.getBoundingClientRect().width;
      const leftPx: number = coordXY - posLeftWidget;
      result = (leftPx / widthWidget) * 100;
    }
    if (result < 0) {
      result = 0;
    }
    if (result > 100) {
      result = 100;
    }
    return result;
  }

  /**
   * Функция, которая на вход получает значение слайдера,
   * а возвращает количество процентов от начала слайдера (от левого или нижнего края).
   * Выполняет действие обратное функции ``_getValFromPosPercent``.
   * @private
   * @param {number} value Значение слайдера.
   * @returns {number} Количество процентов от начала слайдера.
   */
  private _getPosFromValue(value: number): number {
    let result = 0;
    const options: AbacusOptions = this._presenter.getModelAbacusProperties();
    const minVal: number = options.min as number;
    let maxVal: number = options.max as number;
    let valueAbacus = value;

    // если минимальное значение меньше или больше ноля, то
    // "сдвигаем" переданное значение (value) и максимальное значение (maxVal)
    // на минимальное значение (minVal) по модулю
    if (minVal < 0) {
      maxVal += (minVal * -1);
      valueAbacus += (minVal * -1);
    } else if (minVal > 0) {
      maxVal -= minVal;
      valueAbacus -= minVal;
    }

    result = (valueAbacus / maxVal) * 100;

    if (result < 0) {
      return 0;
    }
    if (result > 100) {
      return 100;
    }

    return result;
  }

  /**
   * Функция, которая получает на вход процент от начала слайдера,
   * а возвращает соответствующее значение.
   * Выполняет действие обратное функции ``_getPosFromValue``.
   * @private
   * @param {number} posPercent Позиция бегунка в процентах от начала слайдера.
   * @returns {number} Значение слайдера.
   */
  private _getValFromPosPercent(posPercent: number): number {
    let abacusValue = 0;
    const options: AbacusOptions = this._presenter.getModelAbacusProperties();
    const minVal: number = options.min as number;
    let maxVal: number = options.max as number;

    // если минимальное значение меньше или больше ноля, то
    // "сдвигаем" максимальное значение (maxVal)
    // на минимальное значение (minVal) по модулю
    if (minVal < 0) {
      maxVal += (minVal * -1);
    } else if (minVal > 0) {
      maxVal -= minVal;
    }

    abacusValue = (maxVal * posPercent) / 100;

    // если минимальное значение было меньше или больше ноля, то
    // "сдвигаем" результирующее значение (abacusValue) обратно
    // на минимальное значение (minVal) по модулю
    if (minVal < 0) {
      abacusValue -= (minVal * -1);
    } else if (minVal > 0) {
      abacusValue += minVal;
    }

    return abacusValue;
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
          const newProperties = {} as AbacusOptions;
          newProperties[param1] = propValue;
          this._presenter.setModelAbacusProperties(newProperties);
          break;
      }
    } else if (typeof param1 === 'object') {
      this._presenter.setModelAbacusProperties(param1);
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
        return this._presenter.getModelAbacusProperties()[optionName];

      default:
        return this._presenter.getModelAbacusProperties();
    }
  }

  /**
   * Функция обновления Вида плагина (в том числе пользовательского интерфейса).
   */
  private _updateView(): void{
    const abacusProperties: AbacusProperties = this._presenter.getModelAbacusProperties();

    const hasRangeChanged = this._cachedAbacusProperties?.range !== abacusProperties.range;
    const hasOrientationChanged = this._cachedAbacusProperties?.orientation !== abacusProperties.orientation;
    const hasTooltipChanged = this._cachedAbacusProperties?.hasTooltip !== abacusProperties.hasTooltip;
    const hasAnimateChanged = this._cachedAbacusProperties?.animate !== abacusProperties.animate;
    const hasMaxChanged = this._cachedAbacusProperties?.max !== abacusProperties.max;
    const hasMinChanged = this._cachedAbacusProperties?.min !== abacusProperties.min;
    const hasValuesChanged = !View.arrayCompare(this._cachedAbacusProperties?.values, abacusProperties.values);
    const hasDisabledChanged = this._cachedAbacusProperties?.isDisabled !== abacusProperties.isDisabled;
    const hasScaleChanged = this._cachedAbacusProperties?.hasMarks !== abacusProperties.hasMarks;
    const hasStepChanged = this._cachedAbacusProperties?.step !== abacusProperties.step;
    const hasIntervalChanged = this._cachedAbacusProperties?.interval !== abacusProperties.interval;

    if (hasRangeChanged) {
      this._createViewRange(abacusProperties);
    }

    if (hasIntervalChanged) {
      this._createViewRange(abacusProperties);
      this._createViewHandles(abacusProperties);
    }

    if (hasOrientationChanged) {
      if (abacusProperties.orientation === AbacusOrientationType.VERTICAL) {
        this._isVertical = true;
        this._widgetContainer.isVertical(true);
      } else {
        this._isVertical = false;
        this._widgetContainer.isVertical(false);
      }
    }

    const resultTooltipRangeChanged = hasTooltipChanged || hasIntervalChanged;
    if (resultTooltipRangeChanged) {
      this._createViewTooltips(abacusProperties);
      this._updateViewTooltips(abacusProperties);
      this._setTransition();
    }

    if (hasAnimateChanged) {
      this._setTransition();
    }

    // Обновляем положение бегунка и индикатора
    const resultRangeMaxMinOrientationValuesIntervalChanged = hasRangeChanged
                                                      || hasMaxChanged
                                                      || hasMinChanged
                                                      || hasOrientationChanged
                                                      || hasValuesChanged
                                                      || hasIntervalChanged;
    if (resultRangeMaxMinOrientationValuesIntervalChanged) {
      this._updateViewHandles(abacusProperties);
      this._updateViewTooltips(abacusProperties);
      this._updateViewRange(abacusProperties);
      this._highlightMarks();
    }

    if (hasValuesChanged) {
      this._findMovedHandle();
      this._eventSlideWrapper();
    }

    // Обновляем названия классов
    if (abacusProperties.classes) {
      this._updateClassNames(abacusProperties.classes);
    }

    // Включаем или отключаем слайдер
    if (hasDisabledChanged) {
      this._toggleDisable(abacusProperties.isDisabled);
    }

    // Создаем шкалу значений
    const resultScaleStepMaxMinOrientationChanged = hasScaleChanged
                                                    || hasStepChanged
                                                    || hasMaxChanged
                                                    || hasMinChanged
                                                    || hasOrientationChanged;
    if (resultScaleStepMaxMinOrientationChanged) {
      if (abacusProperties.hasMarks) {
        this._createScale();
        this._setTransition();
      } else {
        this._removeScale();
      }

      this._highlightMarks();
    }

    this._cachedAbacusProperties = View.getCloneAbacusProperties(abacusProperties);
  }

  /**
   * Функция создания или удаления ручек слайдера.
   * @private
   * @param {AbacusProperties} abacusProperties Свойства плагина.
   */
  private _createViewHandles(abacusProperties: AbacusProperties): void{
    const viewInstance = this;
    const handleIndexes: number[] = []; // массив с индексами ручек слайдера.
    if (!viewInstance._handles?.length) {
      viewInstance._handles = [];
      viewInstance._handles[0] = new Handle(abacusProperties.classes, 0);
      const [firstHandle] = viewInstance._handles;
      viewInstance._widgetContainer.htmlElement.append(firstHandle.htmlElement);
      viewInstance._currentHandle = firstHandle;
      handleIndexes.push(0);
    }

    const [firstHandle] = viewInstance._handles;

    switch (abacusProperties.interval) {
      case true:
        viewInstance._handles[1] = new Handle(abacusProperties.classes, 1);
        viewInstance._widgetContainer.htmlElement.append(viewInstance._handles[1].htmlElement);
        handleIndexes.push(1);
        break;

      default:
        if (viewInstance._handles[1]) {
          viewInstance._handles[1].htmlElement.remove();
          viewInstance._handles = viewInstance._handles.slice(0, 1);
        }
        viewInstance._currentHandle = firstHandle;
        break;
    }

    viewInstance._handleHandleItemPointerdown = viewInstance._handleHandleItemPointerdown.bind(viewInstance);
    for (let i = 0; i < handleIndexes.length; i += 1) {
      const handleIndex = handleIndexes[i];
      viewInstance._handles[handleIndex].htmlElement.addEventListener(
        'pointerdown',
        viewInstance._handleHandleItemPointerdown,
      );
    }
  }

  /**
   * Функция обновления ручек слайдера, а именно их местоположение.
   * @private
   * @param {AbacusProperties} abacusProperties Свойства плагина.
   */
  private _updateViewHandles(abacusProperties: AbacusProperties): void{
    if (!abacusProperties.values) {
      return;
    }

    for (let i = 0; i < abacusProperties.values.length; i += 1) {
      const currentValue: number = abacusProperties.values[i];
      const posHandle = this._getPosFromValue(currentValue);

      if (this._handles[i]) {
        if (this._isVertical) {
          this._handles[i].posLeft = null;
          this._handles[i].posBottom = posHandle;
        } else {
          this._handles[i].posBottom = null;
          this._handles[i].posLeft = posHandle;
        }
      }
    }
  }

  /**
   * Функция создания или удаления подсказок слайдера.
   * @private
   * @param {AbacusProperties} abacusProperties Свойства плагина.
   */
  private _createViewTooltips(abacusProperties: AbacusProperties): void{
    for (let i = 0; i < this._tooltips.length; i += 1) {
      this._tooltips[i].htmlElement.remove();
    }
    this._tooltips = [];

    if (abacusProperties.hasTooltip) {
      const countTooltips = abacusProperties.interval === true ? 2 : 1;
      for (let i = 0; i < countTooltips; i += 1) {
        this._tooltips[i] = new Tooltip(abacusProperties.classes, i);
        this._widgetContainer.htmlElement.append(this._tooltips[i].htmlElement);
      }
    }
  }

  /**
   * Функция обновления подсказок слайдера, а именно местоположение и текст.
   * @private
   * @param {AbacusProperties} abacusProperties Свойства плагина.
   */
  private _updateViewTooltips(abacusProperties: AbacusProperties): void{
    if (!abacusProperties.values || !abacusProperties.hasTooltip) {
      return;
    }

    for (let i = 0; i < abacusProperties.values.length; i += 1) {
      const currentValue: number = abacusProperties.values[i];
      const posHandle = this._getPosFromValue(currentValue);

      if (this._tooltips[i]) {
        if (this._isVertical) {
          this._tooltips[i].posLeft = null;
          this._tooltips[i].posBottom = posHandle;
        } else {
          this._tooltips[i].posBottom = null;
          this._tooltips[i].posLeft = posHandle;
        }

        this._tooltips[i].htmlElement.innerText = abacusProperties.values[i].toString();
      }
    }
  }

  /**
   * Функция создания или удаления индикатора (progress bar) слайдера.
   * @private
   * @param {AbacusProperties} abacusProperties Свойства плагина.
   */
  private _createViewRange(abacusProperties: AbacusProperties): void{
    switch (abacusProperties.range) {
      case 'max':
        if (abacusProperties.interval === true) this._range.rangeType = 'between';
        else this._range.rangeType = 'max';
        this._widgetContainer.htmlElement.prepend(this._range.htmlElement);
        break;

      case true:
        if (abacusProperties.interval === false) this._range.rangeType = 'min';
        else this._range.rangeType = 'between';
        this._widgetContainer.htmlElement.prepend(this._range.htmlElement);
        break;

      case 'min':
        if (abacusProperties.interval === true) this._range.rangeType = 'between';
        else this._range.rangeType = 'min';
        this._widgetContainer.htmlElement.prepend(this._range.htmlElement);
        break;

      default:
        this._range.rangeType = 'hidden';
        this._range.htmlElement.remove();
        break;
    }
  }

  /**
   * Функция обновления индикатора (progress bar) слайдера, а именно местоположение и размер.
   * @private
   * @param {AbacusProperties} abacusProperties Свойства плагина.
   */
  private _updateViewRange(abacusProperties: AbacusProperties): void{
    if (!abacusProperties.values?.length) {
      return;
    }

    const posHandle0 = this._getPosFromValue(abacusProperties.values[0]);
    const posHandle1 = this._getPosFromValue(abacusProperties.values[1]);

    if (this._isVertical) {
      this._range.htmlElement.style.left = '';
      this._range.htmlElement.style.right = '';
      this._range.width = null;

      switch (this._range.rangeType) {
        case 'min':
          this._range.htmlElement.style.top = 'auto';
          this._range.htmlElement.style.bottom = '0';
          this._range.height = posHandle0;
          break;

        case 'max':
          this._range.htmlElement.style.top = '0';
          this._range.htmlElement.style.bottom = 'auto';
          this._range.height = 100 - posHandle0;
          break;

        case 'between':
          this._range.htmlElement.style.bottom = `${posHandle0.toString()}%`;
          this._range.htmlElement.style.top = '';
          this._range.height = posHandle1 - posHandle0;
          break;

        default:
          break;
      }
    } else {
      this._range.htmlElement.style.top = '';
      this._range.htmlElement.style.bottom = '';
      this._range.height = null;

      switch (this._range.rangeType) {
        case 'min':
          this._range.htmlElement.style.left = '0';
          this._range.htmlElement.style.right = 'auto';
          this._range.width = posHandle0;
          break;

        case 'max':
          this._range.htmlElement.style.left = 'auto';
          this._range.htmlElement.style.right = '0';
          this._range.width = 100 - posHandle0;
          break;

        case 'between':
          this._range.htmlElement.style.left = `${posHandle0.toString()}%`;
          this._range.htmlElement.style.right = '';
          this._range.width = posHandle1 - posHandle0;
          break;

        default:
          break;
      }
    }
  }

  /**
   * Функция обновления классов слайдера и его элементов.
   * @private
   * @param {AbacusClasses} abacusClasses Объект с классами элементов плагина.
   */
  private _updateClassNames(abacusClasses: AbacusClasses) {
    if (this._cachedAbacusProperties?.classes?.abacus !== abacusClasses?.abacus) {
      this._widgetContainer.className = abacusClasses?.abacus;
    }
    if (this._cachedAbacusProperties?.classes?.vertical !== abacusClasses?.vertical) {
      this._widgetContainer.classNameVertical = abacusClasses?.vertical;
    }
    if (this._cachedAbacusProperties?.classes?.isDisabled !== abacusClasses?.isDisabled) {
      this._widgetContainer.classNameDisabled = abacusClasses?.isDisabled;
    }

    if (this._cachedAbacusProperties?.classes?.handle !== abacusClasses?.handle) {
      for (let i = 0; i < this._handles.length; i += 1) {
        this._handles[i].className = abacusClasses?.handle;
      }
    }

    if (this._cachedAbacusProperties?.classes?.range !== abacusClasses?.range) {
      this._range.className = abacusClasses?.range;
    }

    this._collectionMarks.forEach((mapItem) => {
      const mark = mapItem;

      if (this._cachedAbacusProperties?.classes?.mark !== abacusClasses?.mark) {
        if (abacusClasses?.mark) {
          mark.className = abacusClasses.mark;
        }
      }

      if (this._cachedAbacusProperties?.classes?.markSelected !== abacusClasses?.markSelected) {
        if (abacusClasses?.markInrange) {
          mark.classNameSelected = abacusClasses.markSelected;
        }
      }

      if (this._cachedAbacusProperties?.classes?.markInrange !== abacusClasses?.markInrange) {
        if (abacusClasses?.markInrange) {
          mark.classNameInrange = abacusClasses.markInrange;
        }
      }
    });
  }

  /**
   * Функция переключает состояние слайдера с активного на неактивный и обратно.
   * @private
   * @param {boolean} off "true" значит отключить. "false" значит активировать.
   */
  private _toggleDisable(off?: boolean): void{
    if (off === undefined || off === null) {
      this._isDisabled = !this._isDisabled;
    } else {
      this._isDisabled = !!off;
    }

    this._widgetContainer.isDisabled(this._isDisabled);
  }

  /**
   * Функция упаковывает в объект некоторые данные о слайдере и бегунке для обработчиков событий.
   * @private
   * @returns {EventUIData} Объект класса EventUIData.
   */
  private _getEventUIData(): EventUIData {
    const uiData: EventUIData = {} as EventUIData;
    if (this._currentHandle) {
      uiData.handle = this._currentHandle.htmlElement;
      uiData.handleIndex = this._currentHandle.handleIndex;
    }

    const modelData = this._presenter.getModelAbacusProperties();
    uiData.abacusProperties = View.getCloneAbacusProperties(modelData);
    return uiData;
  }

  /**
   * Функция-обертка события "abacus-change". Генерирует событие "abacus-change" и вызывает callback "change".
   * @private
   * @param {Event} event Объект события. По умолчанию равен объекту события изменения значения слайдера.
   * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
   * этого события вызвал Event.preventDefault(). В ином случае — true.
   * (Точно также, как у функции EventTarget.dispatchEvent()).
   */
  private _eventChangeWrapper(event: Event = this._customEventChange): boolean {
    const dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventChange);
    const abacusProperties = this._presenter.getModelAbacusProperties();
    if (typeof abacusProperties?.change === 'function') {
      abacusProperties.change(event, this._getEventUIData());
    }

    return dispatchEventResult;
  }

  /**
   * Функция-обертка события "abacus-create". Генерирует событие "abacus-create" и вызывает callback "create".
   * @private
   * @param {Event} event Объект события. По умолчанию равен объекту события инициализации плагина.
   * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
   * этого события вызвал Event.preventDefault().
   * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
   */
  private _eventCreateWrapper(event: Event = this._customEventCreate): boolean {
    const dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventCreate);
    const abacusProperties = this._presenter.getModelAbacusProperties();
    if (typeof abacusProperties?.create === 'function') {
      abacusProperties.create(event, this._getEventUIData());
    }

    return dispatchEventResult;
  }

  /**
   * Функция-обертка события "abacus-slide". Генерирует событие "abacus-slide" и вызывает callback "slide".
   * @private
   * @param {Event} event Объект события. По умолчанию равен объекту события перемещения бегунка слайдера.
   * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
   * этого события вызвал Event.preventDefault().
   * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
   */
  private _eventSlideWrapper(event: Event = this._customEventSlide): boolean {
    const dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventSlide);
    const abacusProperties = this._presenter.getModelAbacusProperties();
    if (typeof abacusProperties?.slide === 'function') {
      abacusProperties.slide(event, this._getEventUIData());
    }

    return dispatchEventResult;
  }

  /**
   * Функция-обертка события "abacus-start". Генерирует событие "abacus-start" и вызывает callback "start".
   * @private
   * @param {Event} event Объект события. По умолчанию равен объекту события начала перемещения бегунка слайдера.
   * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
   * этого события вызвал Event.preventDefault().
   * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
   */
  private _eventStartWrapper(event: Event = this._customEventStart): boolean {
    const dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventStart);
    const abacusProperties = this._presenter.getModelAbacusProperties();
    if (typeof abacusProperties?.start === 'function') {
      abacusProperties.start(event, this._getEventUIData());
    }

    return dispatchEventResult;
  }

  /**
   * Функция-обертка события "abacus-stop". Генерирует событие "abacus-stop" и вызывает callback "stop".
   * @private
   * @param {Event} event Объект события. По умолчанию равен объекту события окончания перемещения бегунка слайдера.
   * @returns {boolean} Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
   * этого события вызвал Event.preventDefault().
   * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
   */
  private _eventStopWrapper(event: Event = this._customEventStop): boolean {
    const dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventStop);
    const abacusProperties = this._presenter.getModelAbacusProperties();
    if (typeof abacusProperties?.stop === 'function') {
      abacusProperties.stop(event, this._getEventUIData());
    }

    return dispatchEventResult;
  }

  /**
   * Функция, обрабатывающая позицию мыши или касания и вычисляющая, какию ручку перемещать.
   * @private
   * @param {PointerEvent} event Объект события мыши или касания.
   */
  private _mousePositionHandler(event: PointerEvent): void{
    const viewInstance = this;
    const abacusProperties = viewInstance._presenter.getModelAbacusProperties();
    if (!abacusProperties.values?.length || !viewInstance._currentHandle) {
      return;
    }

    const coordinate = this._isVertical ? event.clientY : event.clientX;

    const percent = this._getPosPercent(coordinate - this._shiftClickOnHandle);
    const valueUnrounded: number = this._getValFromPosPercent(percent);

    const newValues: number[] = abacusProperties.values?.slice(0);
    const [firstHandle, secondHandle] = viewInstance._handles;
    const [firstValue, secondValue] = abacusProperties.values;

    if (viewInstance._currentHandle.handleIndex === 0) {
      if (valueUnrounded >= secondValue) {
        newValues[0] = secondValue;
        viewInstance._currentHandle = secondHandle;
      } else {
        newValues[0] = valueUnrounded;
      }
    }

    if (viewInstance._currentHandle.handleIndex === 1) {
      if (valueUnrounded <= firstValue) {
        newValues[1] = firstValue;
        viewInstance._currentHandle = firstHandle;
      } else {
        newValues[1] = valueUnrounded;
      }
    }

    viewInstance._presenter.setModelAbacusProperties({
      values: newValues,
    } as AbacusOptions);
  }

  /**
   * Функция, которая вычисляет, какие значения были изменены, и передает их через Представителя в Модель.
   * @private
   * @param {number} valueUnrounded Значение, полученное из позиции клика мыши или касания.
   */
  private _calcHandleValues(valueUnrounded: number): void{
    const viewInstance = this;
    const abacusProperties = viewInstance._presenter.getModelAbacusProperties();
    const newValues: number[] = abacusProperties.values?.slice(0);

    const checkNecessaryProps = abacusProperties.interval === true
                                && abacusProperties.step;
    if (checkNecessaryProps) {
      let deltaMin = abacusProperties.values[0] - valueUnrounded;
      deltaMin = deltaMin < 0 ? deltaMin *= -1 : deltaMin;
      let deltaMax = abacusProperties.values[1] - valueUnrounded;
      deltaMax = deltaMax < 0 ? deltaMax *= -1 : deltaMax;

      if (deltaMax < deltaMin) {
        newValues[1] = valueUnrounded;
      } else {
        newValues[0] = valueUnrounded;
      }
    } else {
      newValues[0] = valueUnrounded;
    }

    viewInstance._presenter.setModelAbacusProperties({
      values: newValues,
    } as AbacusOptions);
  }

  /**
   * Установка обработчиков событий.
   * @private
   */
  private _bindEventListeners(): void{
    const viewInstance = this;

    viewInstance._presenter.eventTarget.addEventListener('update-model', this._handleModelUpdate.bind(this));

    viewInstance._handleWidgetContainerPointerdown = viewInstance._handleWidgetContainerPointerdown.bind(viewInstance);
    viewInstance._widgetContainer.htmlElement.addEventListener(
      'pointerdown',
      viewInstance._handleWidgetContainerPointerdown,
    );

    viewInstance._handleHandleItemPointermove = viewInstance._handleHandleItemPointermove.bind(viewInstance);
    document.addEventListener(
      'pointermove',
      viewInstance._handleHandleItemPointermove,
      { passive: true },
    );

    viewInstance._handleHandleItemPointerup = viewInstance._handleHandleItemPointerup.bind(viewInstance);
    document.addEventListener(
      'pointerup',
      viewInstance._handleHandleItemPointerup,
    );
    document.addEventListener(
      'pointercancel',
      viewInstance._handleHandleItemPointerup,
    );
  }

  /**
   * Обработчик обновления модели.
   * @private
   * @param {Event} event Объект события.
   */
  private _handleModelUpdate(): void{
    this._updateView();
  }

  /**
   * Обработчик клика по слайдеру. По клику перемещает ручку слайдера.
   * @private
   */
  private _handleWidgetContainerPointerdown(event: PointerEvent): void{
    event.preventDefault();
    const viewInstance = this;
    const abacusProperties = viewInstance._presenter.getModelAbacusProperties();
    const eventTarget = event.target as HTMLElement;
    const handleClass = abacusProperties.classes?.handle ? abacusProperties.classes?.handle : '';
    const markClass = abacusProperties.classes?.mark ? abacusProperties.classes?.mark : '';
    const tooltipClass = abacusProperties.classes?.tooltip ? abacusProperties.classes?.tooltip : '';

    const dontProcessEvent = viewInstance._isDisabled
                    || eventTarget.classList.contains(handleClass)
                    || eventTarget.classList.contains(markClass)
                    || eventTarget.classList.contains(tooltipClass);
    if (dontProcessEvent) {
      return;
    }

    const coordinate = this._isVertical ? event.clientY : event.clientX;

    const currentValues = viewInstance._cachedAbacusProperties?.values;
    const percent = this._getPosPercent(coordinate);
    const valueUnrounded: number = this._getValFromPosPercent(percent);
    viewInstance._calcHandleValues(valueUnrounded);

    const hasValuesChanged = !View.arrayCompare(currentValues, abacusProperties.values);
    if (hasValuesChanged) {
      this._eventChangeWrapper(event);
    }
  }

  /**
   * Обработчик клика по ручке слайдера. Фиксирует нажатие на ручку и генерирует событие "start".
   * @private
   */
  private _handleHandleItemPointerdown(event: PointerEvent): void{
    event.preventDefault();
    const viewInstance = this;
    if (viewInstance._isDisabled) {
      return;
    }
    const handleHtml = event.currentTarget as HTMLElement;
    const handleIndexAttr = handleHtml.getAttribute('data-handle-index');
    if (!handleIndexAttr) {
      return;
    }

    // здесь при вертикальном режиме отображения слайдера берется pageY, а не clientY,
    // так как функция offset возвращает top элемента от края документа.
    const coordinateClick = viewInstance._isVertical ? event.pageY : event.clientX;

    // вычисляем смещение от центра ручки
    const postitonHandle = $(handleHtml).offset();
    if (postitonHandle) {
      if (viewInstance._isVertical) {
        viewInstance._shiftClickOnHandle = (coordinateClick - postitonHandle.top) - (handleHtml.clientHeight / 2);
      } else {
        viewInstance._shiftClickOnHandle = (coordinateClick - postitonHandle.left) - (handleHtml.clientWidth / 2);
      }
    } else {
      viewInstance._shiftClickOnHandle = 0;
    }

    const handleIndex = parseInt(handleIndexAttr, 10);
    viewInstance._isDragHandle = true;
    viewInstance._currentHandle = viewInstance._handles[handleIndex];
    viewInstance._eventStartWrapper(event);
  }

  /**
   * Обработчик перемещения курсора или пальца по экрану.
   * Нужен для того, чтобы вычислить, куда переместить ручку слайдера. Генерирует событие "slide".
   * @private
   */
  private _handleHandleItemPointermove(event: PointerEvent): void{
    const viewInstance = this;
    if (viewInstance._isDisabled) {
      return;
    }

    if (viewInstance._handleMovingTimer !== null) {
      clearTimeout(viewInstance._handleMovingTimer);
    }
    viewInstance._handleMovingTimer = setTimeout(() => {
      if (viewInstance._isDragHandle) {
        viewInstance._mousePositionHandler(event);
      }
    }, 5);
  }

  /**
   * Обработчик окончание перемещения курсора или пальца по экрану.
   * Генерирует событие "stop".
   * @private
   */
  private _handleHandleItemPointerup(event: PointerEvent): void{
    const viewInstance = this;
    if (viewInstance._isDragHandle) {
      viewInstance._eventChangeWrapper(event);
      viewInstance._eventStopWrapper(event);
    }
    viewInstance._isDragHandle = false;
  }

  /**
   * Создает шкалу значений и добавляет ее в слайдер.
   * @private
   */
  private _createScale(): void{
    if (this._collectionMarks.size) {
      this._removeScale();
    }

    const abacusProperties = this._presenter.getModelAbacusProperties();

    // 1. Добавляем первую и последнюю метку.
    const firstMark = new Mark(abacusProperties.min, abacusProperties.classes);
    this._widgetContainer.htmlElement.append(firstMark.htmlElement);
    const lastMark = new Mark(abacusProperties.max, abacusProperties.classes);
    this._widgetContainer.htmlElement.append(lastMark.htmlElement);

    // 2. Вычисляем максимальную длину метки.
    let lengthFirstMark = 0;
    let lengthLastMark = 0;
    let maxLengthMarkItem = 0;
    if (this._isVertical) {
      lengthFirstMark = firstMark.htmlElement.offsetHeight;
      lengthLastMark = lastMark.htmlElement.offsetHeight;
    } else {
      lengthFirstMark = firstMark.htmlElement.offsetWidth;
      lengthLastMark = lastMark.htmlElement.offsetWidth;
    }
    if (lengthFirstMark > lengthLastMark) maxLengthMarkItem = lengthFirstMark;
    else maxLengthMarkItem = lengthLastMark;
    const marginXMark = 10; // Минимальное расстояние между метками шкалы в пикселях по горизонтали.
    const marginYMark = 2; // Минимальное расстояние между метками шкалы в пикселях по вертикали.
    maxLengthMarkItem = this._isVertical ? maxLengthMarkItem + marginYMark : maxLengthMarkItem + marginXMark;
    firstMark.htmlElement.remove();
    lastMark.htmlElement.remove();

    // 3. Вычисляем, сколько меток поместится в слайдере.
    let lengthWidget: number;
    if (this._isVertical) lengthWidget = this._widgetContainer.htmlElement.offsetHeight;
    else lengthWidget = this._widgetContainer.htmlElement.offsetWidth;
    let countPossibleMarks = Math.floor(lengthWidget / maxLengthMarkItem);

    // 4. Вычисляем шаг, через который бедут добавляться метки.
    let countAllMarks = (abacusProperties.max - abacusProperties.min) / abacusProperties.step;
    countAllMarks = countAllMarks < 0 ? countAllMarks * -1 : countAllMarks;
    countAllMarks = Math.ceil(countAllMarks);
    if (abacusProperties.max % abacusProperties.step !== 0) {
      countPossibleMarks -= 1;
    }
    if (countPossibleMarks > countAllMarks) {
      countPossibleMarks = countAllMarks;
    }
    let stepToAddMarks = (abacusProperties.max - abacusProperties.min) / countPossibleMarks;
    if (abacusProperties.step > stepToAddMarks) {
      stepToAddMarks = abacusProperties.step;
    }

    // 5. Добавляем метки.
    let sumRealSteps = 0;
    let value = abacusProperties.min;
    for (; value <= abacusProperties.max; value += abacusProperties.step) {
      sumRealSteps += abacusProperties.step;
      const doAddMark = sumRealSteps >= stepToAddMarks
                      || value === abacusProperties.min;
      if (doAddMark) {
        value = View.round(value, abacusProperties.step);
        const mark = new Mark(value, abacusProperties.classes);
        const positionMark = this._getPosFromValue(value);

        if (this._isVertical) mark.posBottom = positionMark;
        else mark.posLeft = positionMark;

        this._collectionMarks.add(mark);
        sumRealSteps = 0;
      }
    }

    // 6. Добавляем последнюю метку с макс. значением
    const mark = new Mark(abacusProperties.max, abacusProperties.classes);
    const positionMark = this._getPosFromValue(abacusProperties.max);

    if (this._isVertical) mark.posBottom = positionMark;
    else mark.posLeft = positionMark;

    this._collectionMarks.add(mark);

    this._collectionMarks.forEach((mapItem) => {
      const markItem = mapItem;
      if (this._widgetContainer.htmlElement.contains(this._handles[0].htmlElement)) {
        this._handles[0].htmlElement.before(markItem.htmlElement);
      } else {
        this._widgetContainer.htmlElement.append(markItem.htmlElement);
      }
    });

    // 7. Удаляем лишние метки
    this._thinOutScale();

    // 8. Устанавливаем обработчики на метки
    this._bindEventListenersOnMarks();
  }

  /**
   * Удаляет шкалу значений.
   * @private
   */
  private _removeScale(): void{
    this._collectionMarks.forEach((mapItem) => {
      const mark = mapItem;
      mark.htmlElement.remove();
    });
    this._collectionMarks.clear();
  }

  /**
   * Функция удаления лишних меток на шкале значений для того, чтобы они не "слипались" друг с другом.
   * @private
   */
  private _thinOutScale(): void{
    let lengthWidget: number;
    if (this._isVertical) {
      lengthWidget = this._widgetContainer.htmlElement.offsetHeight;
    } else {
      lengthWidget = this._widgetContainer.htmlElement.offsetWidth;
    }

    const marginXMark = 10; // Минимальное расстояние между метками шкалы в пикселях по горизонтали.
    const marginYMark = 2; // Минимальное расстояние между метками шкалы в пикселях по вертикали.
    let lengthMarks = 0;
    this._collectionMarks.forEach((mapItem) => {
      const mark = mapItem;
      if (this._isVertical) lengthMarks += mark.htmlElement.offsetHeight + marginYMark;
      else lengthMarks += mark.htmlElement.offsetWidth + marginXMark;
    });

    const abacusProperties = this._presenter.getModelAbacusProperties();

    if (lengthWidget < lengthMarks) {
      let isDelete = false;
      this._collectionMarks.forEach((mapItem) => {
        const mark = mapItem;
        const dontDeleteMark = mark.associatedValue === abacusProperties.min
                              || mark.associatedValue === abacusProperties.max
                              || isDelete;
        if (dontDeleteMark) {
          isDelete = false;
        } else {
          mark?.htmlElement.remove();
          this._collectionMarks.delete(mark);
          isDelete = true;
        }
      });
    }

    // Проверяем и удаляем последнюю метку с макс. значением.
    let prevMarkMax;
    let markMax;
    this._collectionMarks.forEach((mapItem) => {
      const mark = mapItem;
      if (mark.associatedValue === abacusProperties.max) markMax = mark;
      else prevMarkMax = mark;
    });
    if (prevMarkMax && markMax) {
      prevMarkMax = prevMarkMax as Mark;
      markMax = markMax as Mark;
      const posPrevMarkMax = this._isVertical
        ? prevMarkMax.htmlElement.offsetTop : prevMarkMax.htmlElement.offsetLeft;
      const lengthPrevMarkMax = this._isVertical
        ? prevMarkMax.htmlElement.offsetHeight : prevMarkMax.htmlElement.offsetWidth;
      const posMarkMax = this._isVertical
        ? markMax.htmlElement.offsetTop : markMax.htmlElement.offsetLeft;
      const lengthMarkMax = this._isVertical
        ? markMax.htmlElement.offsetHeight : markMax.htmlElement.offsetWidth;

      // Удаляем последнюю метку.
      if (Math.abs(posMarkMax - posPrevMarkMax) <= (lengthMarkMax + lengthPrevMarkMax) / 2) {
        markMax.htmlElement.remove();
        this._collectionMarks.delete(markMax);
      }
    }

    // Проверяем еще раз, помещается ли метки на слайдере.
    lengthMarks = 0;
    this._collectionMarks.forEach((mapItem) => {
      const mark = mapItem;
      if (this._isVertical) lengthMarks += mark.htmlElement.offsetHeight + marginYMark;
      else lengthMarks += mark.htmlElement.offsetWidth + marginXMark;
    });

    if (lengthWidget < lengthMarks) {
      this._thinOutScale();
    }
  }

  /**
   * Функция меняет состояния меток в шкале значений.
   * @private
   */
  private _highlightMarks(): void{
    if (!this._collectionMarks.size) {
      return;
    }

    const abacusProperties = this._presenter.getModelAbacusProperties();
    const { rangeType } = this._range;

    this._collectionMarks.forEach((mapItem) => {
      const mark = mapItem;
      const isValBetween0And1 = mark.associatedValue >= abacusProperties.values[0]
                                && mark.associatedValue <= abacusProperties.values[1];
      if (rangeType === 'min' && mark.associatedValue <= abacusProperties.values[0]) {
        mark.isInrange(true);
      } else if (rangeType === 'max' && mark.associatedValue >= abacusProperties.values[0]) {
        mark.isInrange(true);
      } else if (rangeType === 'between' && isValBetween0And1) {
        mark.isInrange(true);
      } else {
        mark.isInrange(false);
      }

      if (mark.associatedValue === abacusProperties.values[0] || mark.associatedValue === abacusProperties.values[1]) {
        mark.isSelected(true);
      } else {
        mark.isSelected(false);
      }
    });
  }

  /**
   * Функция установки обработчиков на метки шкалы значений.
   * @private
   */
  private _bindEventListenersOnMarks(): void{
    this._handleMarksClick = this._handleMarksClick.bind(this);

    this._collectionMarks.forEach((mapItem) => {
      const mark = mapItem;
      mark.htmlElement.addEventListener('pointerdown', this._handleMarksClick);
    });
  }

  /**
   * Обработчик клика на метки шкалы.
   * @param {Event} event Объект события.
   */
  private _handleMarksClick(event: Event): void{
    event.preventDefault();
    const viewInstance = this;
    if (viewInstance._isDisabled) {
      return;
    }

    const markHtml = event.currentTarget as HTMLElement;
    const markValueAttr = markHtml.getAttribute('data-associated-value');
    if (!markValueAttr) {
      return;
    }
    const markAssociatedValue = parseFloat(markValueAttr);

    const currentValues = viewInstance._cachedAbacusProperties?.values;
    viewInstance._calcHandleValues(markAssociatedValue);

    const abacusProperties: AbacusProperties = viewInstance._presenter.getModelAbacusProperties();
    const hasValuesChanged = !View.arrayCompare(currentValues, abacusProperties.values);
    if (hasValuesChanged) {
      this._eventChangeWrapper(event);
    }
  }

  /**
   * Установка css-свойства "transition" элементам интерфейса слайдера.
   * Первоначальное значение берется из model.abacusProperties.aniamte.
   * @private
   */
  private _setTransition(): void{
    let duration = '';
    const { animate } = this._presenter.getModelAbacusProperties();
    if (typeof animate === 'number' && animate > 0) {
      duration = animate.toString();
    } else if (animate === true) {
      duration = '400';
    } else if (animate === 'slow') {
      duration = '600';
    } else if (animate === 'fast') {
      duration = '200';
    }

    duration = duration ? `${duration}ms` : '';

    for (let i = 0; i < this._handles.length; i += 1) {
      this._handles[i].htmlElement.style.transition = duration;
      if (this._tooltips[i]) {
        this._tooltips[i].htmlElement.style.transition = duration;
      }
    }

    this._range.htmlElement.style.transition = duration;

    this._collectionMarks.forEach((mapItem) => {
      const mark = mapItem;
      mark.htmlElement.style.transition = duration;
    });
  }

  /**
   * Функция, копирующая объект со свойствами слайдера.
   * @param {AbacusProperties} abacusProperties Свойства слайдера.
   * @returns {AbacusProperties} Новый объект со свойствами слайдера.
   */
  static getCloneAbacusProperties(abacusProperties: AbacusProperties): AbacusProperties {
    const cloneProperties = {} as AbacusProperties;
    Object.assign(cloneProperties, abacusProperties);
    cloneProperties.values = abacusProperties.values?.slice(0);
    Object.assign(cloneProperties.classes, abacusProperties.classes);
    return cloneProperties;
  }

  /**
   * Функция, которая определяет, какая ручка слайдера сдвинулась.
   * @returns {Handle} Возвращает ссылку на объект ручкы слайдера, которая передвинулась.
   */
  private _findMovedHandle(): Handle {
    const abacusProperties = this._presenter.getModelAbacusProperties();
    const [firstHandle, secondHandle] = this._handles;
    this._currentHandle = firstHandle;

    if (this._cachedAbacusProperties) {
      if (this._cachedAbacusProperties.values[1] !== abacusProperties.values[1]) {
        this._currentHandle = secondHandle;
      }
    }

    return this._currentHandle;
  }

  /**
   * Возвращает HTML-элемент контейнера слайдера.
   * @returns {HTMLElement} Контейнер слайдера.
   */
  getWidget(): HTMLElement {
    return this._widgetContainer.htmlElement;
  }

  /**
   * Удаляет слайдер со страницы.
   */
  destroy() {
    this._widgetContainer.htmlElement.remove();
    this._widgetContainer.htmlElement.removeEventListener('pointerdown', this._handleWidgetContainerPointerdown);

    document.removeEventListener('pointermove', this._handleHandleItemPointermove);
    document.removeEventListener('pointerup', this._handleHandleItemPointerup);
    document.removeEventListener('pointercancel', this._handleHandleItemPointerup);

    $.data(this._abacusHtmlWrapper, 'abacus', null);
  }

  /**
   * Функция получения количества знаков после запятой.
   * @static
   * @param {number} x Число, у которого надо узнать количество знаков после запятой.
   * @returns {number} Количество знаков после запятой.
   */
  static countNumAfterPoint(x: number): number {
    const xStr = x.toString();
    return (`${xStr}`).indexOf('.') >= 0 ? (`${xStr}`).split('.')[1].length : 0;
  }

  /**
   * Функция окргуления числа до того количества знаков после запятой, сколько этих знаков у числа fractionalNum.
   * @static
   * @param {number} value Число, которое надо округлить.
   * @param {number} fractionalNum Число, у которого надо узнать количество знаков после запятой.
   * @returns {number} Округленное число.
   */
  static round(value: number, fractionalNum: number): number {
    const numbersAfterPoint = View.countNumAfterPoint(fractionalNum);
    let roundedValue = value;
    if (numbersAfterPoint > 0) {
      roundedValue = parseFloat(value.toFixed(numbersAfterPoint));
    } else {
      roundedValue = Math.round(value);
    }

    return roundedValue;
  }

  /**
   * Функция сравнения двух массивов с произвольними примитивными значениями.
   * @static
   * @param {Array<any>} a Массив
   * @param {Array<any>} b Массив
   * @returns {boolean} Возвращает "true" если массивы одинаковые. Иначе "false".
   */
  static arrayCompare(a?: Array<any>, b?: Array<any>): boolean {
    if (!a || !b) return false;

    if (a?.length !== b?.length) return false;

    for (let i = 0; i < a.length; i += 1) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }
}

export default View;
