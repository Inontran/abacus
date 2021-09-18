import Presenter from '../Presenter/Presenter';
import WidgetContainer from '../WidgetContainer/WidgetContainer';
import Handle from '../Handle/Handle';
import Range from '../Range/Range';
import Mark from '../Mark/Mark';
import Tooltip from '../Tooltip/Tooltip';
import AbacusOrientationType from '../AbacusOrientationType';

/**
 * Класс View реализует "Представление" или "Вид" паттерна проектирования MVP.
 * Соответственно, он отвечает за отрисовку интерфейса плагина, получение данных от пользователя и отображение данных,
 * находящихся в Модели.
 */
export default class View {
  /**
   * Ссылка на Представителя, который связывает объект класса View с объектом класса Model
   * по паттерну проектирования MVP.
   * @type  {Presenter}
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
  private _cachedAbacusProperty?: AbacusProperty;

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
   * @constructor
   * @this   {View}
   * @param  {HTMLAbacusElement} abacusHtmlContainer HTML-элемент,
   * в котором будет находиться инициализированный плагин.
   * @param  {AbacusOptions} options Параметры настройки плагина.
   */
  constructor(abacusHtmlContainer: HTMLAbacusElement, options?: AbacusOptions) {
    this._presenter = new Presenter(options);

    const abacusProperty = this._presenter.getModelAbacusProperty();

    this._widgetContainer = new WidgetContainer(abacusHtmlContainer, abacusProperty.classes);
    this._widgetContainer.htmlElement.innerHTML = '';

    this._range = new Range(abacusProperty.classes);
    this._tooltips[0] = new Tooltip(abacusProperty.classes, 0);

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

    this.updateView();
    this._bindEventListeners();

    this._eventCreateWrapper();
  }

  /**
   * Функция, которая получает на входе координату клика по оси Х относительно окна браузера,
   * а возвращает количество процентов от начала (левого края) слайдера.
   * @param {number} coordXY Координата клика по оси Х относительно окна браузера.
   * @returns {number} Количество процентов от начала (левого края) слайдера.
   */
  getPosPercent(coordXY: number): number {
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
   * Выполняет действие обратное функции ``getValFromPosPercent``.
   * @param {number} value Значение слайдера.
   * @returns {number} Количество процентов от начала слайдера.
   */
  getPosFromValue(value: number): number {
    let result = 0;
    const options: AbacusOptions = this._presenter.getModelAbacusProperty();
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
   * Выполняет действие обратное функции ``getPosFromValue``.
   * @param {number} posPercent Позиция бегунка в процентах от начала слайдера.
   * @returns {number} Значение слайдера.
   */
  getValFromPosPercent(posPercent: number): number {
    let abacusValue = 0;
    const options: AbacusOptions = this._presenter.getModelAbacusProperty();
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
   * Функция получения и установки свойств слайдера.
   * @param {string} optionName Название свойства, значение которого надо получить или изменить.
   * @param {any} propValue Значение свойства.
   * @returns {AbacusProperty | number | string | number[] | boolean | AbacusClasses | undefined}
   */
  option(
    optionName?: string,
    propValue?: any,
  ): AbacusProperty | number | string | number[] | boolean | AbacusClasses | undefined {
    if (typeof optionName === 'string') {
      switch (optionName) {
        case 'animate':
        case 'classes':
        case 'disabled':
        case 'max':
        case 'scale':
        case 'min':
        case 'orientation':
        case 'range':
        case 'step':
        case 'tooltip':
        case 'value':
        case 'values':
          if (propValue !== undefined) {
            // это условие для установки конкретного свойства слайдера
            const newProperty = {} as AbacusOptions;
            newProperty[optionName] = propValue;
            this._presenter.setModelAbacusProperty(newProperty);
          } else {
            // это условие для получения конкретного свойства слайдера
            return this._presenter.getModelAbacusProperty()[optionName];
          }
          break;

        default:
          break;
      }
    } else if (typeof propValue === 'object') {
      // это условие для установки одного или несколько свойств слайдера в виде объекта
      this._presenter.setModelAbacusProperty(propValue as AbacusOptions);
    } else {
      // это условие для получения всех свойств слайдера в виде объекта
      return this._presenter.getModelAbacusProperty();
    }

    return undefined;
  }

  /**
   * Функция обновления Вида плагина (в том числе пользовательского интерфейса).
   */
  updateView(): void{
    const abacusProperty: AbacusProperty = this._presenter.getModelAbacusProperty();

    const hasRangeChanged = this._cachedAbacusProperty?.range !== abacusProperty.range;
    const hasOrientationChanged = this._cachedAbacusProperty?.orientation !== abacusProperty.orientation;
    const hasTooltipChanged = this._cachedAbacusProperty?.tooltip !== abacusProperty.tooltip;
    const hasAnimateChanged = this._cachedAbacusProperty?.animate !== abacusProperty.animate;
    const hasMaxChanged = this._cachedAbacusProperty?.max !== abacusProperty.max;
    const hasMinChanged = this._cachedAbacusProperty?.min !== abacusProperty.min;
    const hasValuesChanged = !View.arrayCompare(this._cachedAbacusProperty?.values, abacusProperty.values);
    const hasDisabledChanged = this._cachedAbacusProperty?.disabled !== abacusProperty.disabled;
    const hasScaleChanged = this._cachedAbacusProperty?.scale !== abacusProperty.scale;
    const hasStepChanged = this._cachedAbacusProperty?.step !== abacusProperty.step;
    const hasIntervalChanged = this._cachedAbacusProperty?.interval !== abacusProperty.interval;

    if (hasRangeChanged) {
      this._createViewRange(abacusProperty);
    }

    if (hasIntervalChanged) {
      this._createViewRange(abacusProperty);
      this._createViewHandles(abacusProperty);
    }

    if (hasOrientationChanged) {
      if (abacusProperty.orientation === AbacusOrientationType.VERTICAL) {
        this._isVertical = true;
        this._widgetContainer.isVertical(true);
      } else {
        this._isVertical = false;
        this._widgetContainer.isVertical(false);
      }
    }

    const resultTooltipRangeChanged = hasTooltipChanged || hasIntervalChanged;
    if (resultTooltipRangeChanged) {
      this._createViewTooltips(abacusProperty);
      this._updateViewTooltips(abacusProperty);
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
      this._updateViewHandles(abacusProperty);
      this._updateViewTooltips(abacusProperty);
      this._updateViewRange(abacusProperty);
      this._highlightMarks();
    }

    if (hasValuesChanged) {
      this._findMovedHandle();
      this._eventChangeWrapper();
    }

    // Обновляем названия классов
    if (abacusProperty.classes) {
      this._updateClassNames(abacusProperty.classes);
    }

    // Включаем или отключаем слайдер
    if (hasDisabledChanged) {
      this.toggleDisable(abacusProperty.disabled);
    }

    // Создаем шкалу значений
    const resultScaleStepMaxMinOrientationChanged = hasScaleChanged
                                                    || hasStepChanged
                                                    || hasMaxChanged
                                                    || hasMinChanged
                                                    || hasOrientationChanged;
    if (resultScaleStepMaxMinOrientationChanged) {
      if (abacusProperty.scale) {
        this._createScale();
        this._setTransition();
      } else {
        this._removeScale();
      }

      this._highlightMarks();
    }

    this._cachedAbacusProperty = View.getCloneAbacusProperty(abacusProperty);
  }

  /**
   * Функция создания или удаления ручек слайдера.
   * @private
   * @param {AbacusProperty} abacusProperty Свойства плагина.
   */
  private _createViewHandles(abacusProperty: AbacusProperty): void{
    const viewInstance = this;
    const handleIndexes: number[] = []; // массив с индексами ручек слайдера.
    if (!viewInstance._handles?.length) {
      viewInstance._handles = [];
      viewInstance._handles[0] = new Handle(abacusProperty.classes, 0);
      const [firstHandle] = viewInstance._handles;
      viewInstance._widgetContainer.htmlElement.append(firstHandle.htmlElement);
      viewInstance._currentHandle = firstHandle;
      handleIndexes.push(0);
    }

    const [firstHandle] = viewInstance._handles;

    switch (abacusProperty.interval) {
      case true:
        viewInstance._handles[1] = new Handle(abacusProperty.classes, 1);
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

    viewInstance._handlerHandleItemClickStart = viewInstance._handlerHandleItemClickStart.bind(viewInstance);
    for (let i = 0; i < handleIndexes.length; i += 1) {
      const handleIndex = handleIndexes[i];
      viewInstance._handles[handleIndex].htmlElement.addEventListener(
        'pointerdown',
        viewInstance._handlerHandleItemClickStart,
      );
    }
  }

  /**
   * Функция обновления ручек слайдера, а именно их местоположение.
   * @private
   * @param {AbacusProperty} abacusProperty Свойства плагина.
   */
  private _updateViewHandles(abacusProperty: AbacusProperty): void{
    if (!abacusProperty.values) {
      return;
    }

    for (let i = 0; i < abacusProperty.values.length; i += 1) {
      const currentValue: number = abacusProperty.values[i];
      const posHandle = this.getPosFromValue(currentValue);

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
   * @param {AbacusProperty} abacusProperty Свойства плагина.
   */
  private _createViewTooltips(abacusProperty: AbacusProperty): void{
    for (let i = 0; i < this._tooltips.length; i += 1) {
      this._tooltips[i].htmlElement.remove();
    }
    this._tooltips = [];

    if (abacusProperty.tooltip) {
      const countTooltips = abacusProperty.interval === true ? 2 : 1;
      for (let i = 0; i < countTooltips; i += 1) {
        this._tooltips[i] = new Tooltip(abacusProperty.classes, i);
        this._widgetContainer.htmlElement.append(this._tooltips[i].htmlElement);
      }
    }
  }

  /**
   * Функция обновления подсказок слайдера, а именно местоположение и текст.
   * @private
   * @param {AbacusProperty} abacusProperty Свойства плагина.
   */
  private _updateViewTooltips(abacusProperty: AbacusProperty): void{
    if (!abacusProperty.values || !abacusProperty.tooltip) {
      return;
    }

    for (let i = 0; i < abacusProperty.values.length; i += 1) {
      const currentValue: number = abacusProperty.values[i];
      const posHandle = this.getPosFromValue(currentValue);

      if (this._tooltips[i]) {
        if (this._isVertical) {
          this._tooltips[i].posLeft = null;
          this._tooltips[i].posBottom = posHandle;
        } else {
          this._tooltips[i].posBottom = null;
          this._tooltips[i].posLeft = posHandle;
        }

        this._tooltips[i].htmlElement.innerText = abacusProperty.values[i].toString();
      }
    }
  }

  /**
   * Функция создания или удаления индикатора (progress bar) слайдера.
   * @private
   * @param {AbacusProperty} abacusProperty Свойства плагина.
   */
  private _createViewRange(abacusProperty: AbacusProperty): void{
    switch (abacusProperty.range) {
      case 'max':
        if (abacusProperty.interval === true) this._range.rangeType = 'between';
        else this._range.rangeType = 'max';
        this._widgetContainer.htmlElement.prepend(this._range.htmlElement);
        break;

      case true:
        if (abacusProperty.interval === false) this._range.rangeType = 'min';
        else this._range.rangeType = 'between';
        this._widgetContainer.htmlElement.prepend(this._range.htmlElement);
        break;

      case 'min':
        if (abacusProperty.interval === true) this._range.rangeType = 'between';
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
   * @param {AbacusProperty} abacusProperty Свойства плагина.
   */
  private _updateViewRange(abacusProperty: AbacusProperty): void{
    if (!abacusProperty.values?.length) {
      return;
    }

    const posHandle0 = this.getPosFromValue(abacusProperty.values[0]);
    const posHandle1 = this.getPosFromValue(abacusProperty.values[1]);

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
   * Функция обновления индикатора (progress bar) слайдера, а именно местоположение и размер.
   * @private
   * @param {AbacusClasses} abacusClasses Объект с классами элементов плагина.
   */
  private _updateClassNames(abacusClasses: AbacusClasses) {
    if (this._cachedAbacusProperty?.classes?.abacus !== abacusClasses?.abacus) {
      this._widgetContainer.className = abacusClasses?.abacus;
    }
    if (this._cachedAbacusProperty?.classes?.vertical !== abacusClasses?.vertical) {
      this._widgetContainer.classNameVertical = abacusClasses?.vertical;
    }
    if (this._cachedAbacusProperty?.classes?.disabled !== abacusClasses?.disabled) {
      this._widgetContainer.classNameDisabled = abacusClasses?.disabled;
    }

    if (this._cachedAbacusProperty?.classes?.handle !== abacusClasses?.handle) {
      for (let i = 0; i < this._handles.length; i += 1) {
        this._handles[i].className = abacusClasses?.handle;
      }
    }

    if (this._cachedAbacusProperty?.classes?.range !== abacusClasses?.range) {
      this._range.className = abacusClasses?.range;
    }

    this._collectionMarks.forEach((mapItem) => {
      const mark = mapItem;

      if (this._cachedAbacusProperty?.classes?.mark !== abacusClasses?.mark) {
        if (abacusClasses?.mark) {
          mark.className = abacusClasses.mark;
        }
      }

      if (this._cachedAbacusProperty?.classes?.markSelected !== abacusClasses?.markSelected) {
        if (abacusClasses?.markInrange) {
          mark.classNameSelected = abacusClasses.markSelected;
        }
      }

      if (this._cachedAbacusProperty?.classes?.markInrange !== abacusClasses?.markInrange) {
        if (abacusClasses?.markInrange) {
          mark.classNameInrange = abacusClasses.markInrange;
        }
      }
    });
  }

  /**
   * Функция переключает состояние слайдера с активного на неактивный и обратно.
   * @param {boolean} off "true" значит отключить. "false" значит активировать.
   */
  toggleDisable(off?: boolean): void{
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

    const modelData = this._presenter.getModelAbacusProperty();
    uiData.abacusProperty = View.getCloneAbacusProperty(modelData);
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
    const abacusProperty = this._presenter.getModelAbacusProperty();
    if (typeof abacusProperty?.change === 'function') {
      abacusProperty.change(event, this._getEventUIData());
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
    const abacusProperty = this._presenter.getModelAbacusProperty();
    if (typeof abacusProperty?.create === 'function') {
      abacusProperty.create(event, this._getEventUIData());
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
    const abacusProperty = this._presenter.getModelAbacusProperty();
    if (typeof abacusProperty?.slide === 'function') {
      abacusProperty.slide(event, this._getEventUIData());
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
    const abacusProperty = this._presenter.getModelAbacusProperty();
    if (typeof abacusProperty?.start === 'function') {
      abacusProperty.start(event, this._getEventUIData());
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
    const abacusProperty = this._presenter.getModelAbacusProperty();
    if (typeof abacusProperty?.stop === 'function') {
      abacusProperty.stop(event, this._getEventUIData());
    }

    return dispatchEventResult;
  }

  /**
   * Функция, обрабатывающая позицию мыши или касания и вычисляющая, какию ручку перемещать.
   * @private
   * @param {PointerEvent} event Объект события мыши или касания.
   */
  private _mouseHandler(event: PointerEvent): void{
    const viewInstance = this;
    const abacusProperty = viewInstance._presenter.getModelAbacusProperty();
    if (!abacusProperty.values?.length || !viewInstance._currentHandle) {
      return;
    }

    let coordinate = this._isVertical ? event.clientY : event.clientX;

    const percent = this.getPosPercent(coordinate - this._shiftClickOnHandle);
    const valueUnrounded: number = this.getValFromPosPercent(percent);

    const newValues: number[] = abacusProperty.values?.slice(0);
    const [firstHandle, secondHandle] = viewInstance._handles;
    const [firstValue, secondValue] = abacusProperty.values;

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

    viewInstance._presenter.setModelAbacusProperty({
      values: newValues,
    } as AbacusOptions);
  }

  /**
   * Функция, которая вычисляет, какие значения были изменены, и передает их через Представителя в Модель.
   * @private
   * @param {number} valueUnrounded Значение, полученное из позиции клика мыши или касания.
   */
  private _calcHandleValues(valueUnrounded: number): void{
    if (Number.isNaN(valueUnrounded)) {
      return;
    }

    const viewInstance = this;
    const abacusProperty = viewInstance._presenter.getModelAbacusProperty();
    if (!abacusProperty.values?.length) {
      return;
    }

    let newValues: number[] = [];
    if (abacusProperty.values) {
      newValues = abacusProperty.values?.slice(0);
    }

    const checkNecessaryProps = abacusProperty.interval === true
                                && abacusProperty.values?.length
                                && abacusProperty.step;
    if (checkNecessaryProps) {
      let deltaMin = abacusProperty.values[0] - valueUnrounded;
      deltaMin = deltaMin < 0 ? deltaMin *= -1 : deltaMin;
      let deltaMax = abacusProperty.values[1] - valueUnrounded;
      deltaMax = deltaMax < 0 ? deltaMax *= -1 : deltaMax;

      if (deltaMax < deltaMin) {
        newValues[1] = valueUnrounded;
      } else {
        newValues[0] = valueUnrounded;
      }
    } else {
      newValues[0] = valueUnrounded;
    }

    viewInstance._presenter.setModelAbacusProperty({
      values: newValues,
    } as AbacusOptions);
  }

  /**
   * Установка обработчиков событий.
   * @private
   */
  private _bindEventListeners(): void{
    const viewInstance = this;

    viewInstance._presenter.eventTarget.addEventListener('update-model', this._updateModelHandler.bind(this));

    viewInstance._handlerWidgetContainerClick = viewInstance._handlerWidgetContainerClick.bind(viewInstance);
    viewInstance._widgetContainer.htmlElement.addEventListener(
      'pointerdown',
      viewInstance._handlerWidgetContainerClick,
    );

    viewInstance._handlerHandleItemClickMove = viewInstance._handlerHandleItemClickMove.bind(viewInstance);
    document.addEventListener(
      'pointermove',
      viewInstance._handlerHandleItemClickMove,
      { passive: true },
    );

    viewInstance._handlerHandleItemClickStop = viewInstance._handlerHandleItemClickStop.bind(viewInstance);
    document.addEventListener(
      'pointerup',
      viewInstance._handlerHandleItemClickStop,
    );
    document.addEventListener(
      'pointercancel',
      viewInstance._handlerHandleItemClickStop,
    );
  }

  /**
   * Обработчик обновления модели.
   * @private
   * @param {Event} event Объект события.
   */
  private _updateModelHandler(): void{
    this.updateView();
  }

  /**
   * Обработчик клика по слайдеру. По клику перемещает ручку слайдера.
   * @private
   */
  private _handlerWidgetContainerClick(event: PointerEvent): void{
    event.preventDefault();
    const viewInstance = this;
    const abacusProperty = viewInstance._presenter.getModelAbacusProperty();
    const eventTarget = event.target as HTMLElement;
    const handleClass = abacusProperty.classes?.handle ? abacusProperty.classes?.handle : '';
    const markClass = abacusProperty.classes?.mark ? abacusProperty.classes?.mark : '';
    const tooltipClass = abacusProperty.classes?.tooltip ? abacusProperty.classes?.tooltip : '';

    const dontProcessEvent = viewInstance._isDisabled
                    || eventTarget.classList.contains(handleClass)
                    || eventTarget.classList.contains(markClass)
                    || eventTarget.classList.contains(tooltipClass);
    if (dontProcessEvent) {
      return;
    }

    let coordinate = this._isVertical ? event.clientY : event.clientX;

    const percent = this.getPosPercent(coordinate);
    const valueUnrounded: number = this.getValFromPosPercent(percent);
    viewInstance._calcHandleValues(valueUnrounded);
  }

  /**
   * Обработчик клика по ручке слайдера. Фиксирует нажатие на ручку и генерирует событие "start".
   * @private
   */
  private _handlerHandleItemClickStart(event: PointerEvent): void{
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
    let coordinateClick = viewInstance._isVertical ? event.pageY : event.clientX;

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
  private _handlerHandleItemClickMove(event: PointerEvent): void{
    const viewInstance = this;
    if (viewInstance._isDisabled) {
      return;
    }

    if (viewInstance._handleMovingTimer !== null) {
      clearTimeout(viewInstance._handleMovingTimer);
    }
    viewInstance._handleMovingTimer = setTimeout(() => {
      if (viewInstance._isDragHandle) {
        viewInstance._mouseHandler(event);
      }
    }, 5);
  }

  /**
   * Обработчик окончание пересещения курсора или пальца по экрану.
   * Генерирует событие "stop".
   * @private
   */
  private _handlerHandleItemClickStop(event: PointerEvent): void{
    const viewInstance = this;
    if (viewInstance._isDragHandle) {
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

    const abacusProperty = this._presenter.getModelAbacusProperty();

    // 1. Добавляем первую и последнюю метку.
    const firstMark = new Mark(abacusProperty.min, abacusProperty.classes);
    this._widgetContainer.htmlElement.append(firstMark.htmlElement);
    const lastMark = new Mark(abacusProperty.max, abacusProperty.classes);
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
    let countAllMarks = (abacusProperty.max - abacusProperty.min) / abacusProperty.step;
    countAllMarks = countAllMarks < 0 ? countAllMarks * -1 : countAllMarks;
    countAllMarks = Math.ceil(countAllMarks);
    if (abacusProperty.max % abacusProperty.step !== 0) {
      countPossibleMarks -= 1;
    }
    if (countPossibleMarks > countAllMarks) {
      countPossibleMarks = countAllMarks;
    }
    let stepToAddMarks = (abacusProperty.max - abacusProperty.min) / countPossibleMarks;
    if (abacusProperty.step > stepToAddMarks) {
      stepToAddMarks = abacusProperty.step;
    }

    // 5. Добавляем метки.
    let sumRealSteps = 0;
    let value = abacusProperty.min;
    for (; value <= abacusProperty.max; value += abacusProperty.step) {
      sumRealSteps += abacusProperty.step;
      const doAddMark = sumRealSteps >= stepToAddMarks
                      || value === abacusProperty.min;
      if (doAddMark) {
        value = View.round(value, abacusProperty.step);
        const mark = new Mark(value, abacusProperty.classes);
        const positionMark = this.getPosFromValue(value);

        if (this._isVertical) mark.posBottom = positionMark;
        else mark.posLeft = positionMark;

        this._collectionMarks.add(mark);
        sumRealSteps = 0;
      }
    }

    this._collectionMarks.forEach((mapItem) => {
      const mark = mapItem;
      if (this._widgetContainer.htmlElement.contains(this._handles[0].htmlElement)) {
        this._handles[0].htmlElement.before(mark.htmlElement);
      } else {
        this._widgetContainer.htmlElement.append(mark.htmlElement);
      }
    });

    this._thinOutScale();
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

    if (lengthWidget < lengthMarks) {
      const abacusProperty = this._presenter.getModelAbacusProperty();

      let isDelete = false;
      this._collectionMarks.forEach((mapItem) => {
        const mark = mapItem;
        const dontDeleteMark = mark.associatedValue === abacusProperty.min
                              || mark.associatedValue === abacusProperty.max
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

    const abacusProperty = this._presenter.getModelAbacusProperty();
    const { rangeType } = this._range;

    this._collectionMarks.forEach((mapItem) => {
      const mark = mapItem;
      const isValBetween0And1 = mark.associatedValue >= abacusProperty.values[0]
                                && mark.associatedValue <= abacusProperty.values[1];
      if (rangeType === 'min' && mark.associatedValue <= abacusProperty.values[0]) {
        mark.isInrange(true);
      } else if (rangeType === 'max' && mark.associatedValue >= abacusProperty.values[0]) {
        mark.isInrange(true);
      } else if (rangeType === 'between' && isValBetween0And1) {
        mark.isInrange(true);
      } else {
        mark.isInrange(false);
      }

      if (mark.associatedValue === abacusProperty.values[0] || mark.associatedValue === abacusProperty.values[1]) {
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
    this._handlerClickMarks = this._handlerClickMarks.bind(this);

    this._collectionMarks.forEach((mapItem) => {
      const mark = mapItem;
      mark.htmlElement.addEventListener('click', this._handlerClickMarks);
      mark.htmlElement.addEventListener('touchend', this._handlerClickMarks);
    });
  }

  /**
   * Обработчик клика на метки шкалы.
   * @param {Event} event Объект события.
   */
  private _handlerClickMarks(event: Event): void{
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

    if (viewInstance._cachedAbacusProperty?.value !== markAssociatedValue) {
      viewInstance._calcHandleValues(markAssociatedValue);
    }
  }

  /**
   * Установка css-свойства "transition" элементам интерфейса слайдера.
   * Первоначальное значение береться из model.abacusProperty.aniamte.
   * @private
   */
  private _setTransition(): void{
    let duration = '';
    const { animate } = this._presenter.getModelAbacusProperty();
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
   * @param {AbacusProperty} abacusProperty Свойства слайдера.
   * @returns {AbacusProperty} Новый объект со свойствами слайдера.
   */
  static getCloneAbacusProperty(abacusProperty: AbacusProperty): AbacusProperty {
    const cloneProperty = {} as AbacusProperty;
    Object.assign(cloneProperty, abacusProperty);
    cloneProperty.values = abacusProperty.values?.slice(0);
    Object.assign(cloneProperty.classes, abacusProperty.classes);
    return cloneProperty;
  }

  /**
   * Функция, которая определяет, какая ручка слайдера сдвинулась.
   * @returns {Handle} Возвращает ссылку на объект ручкы слайдера, которая передвинулась.
   */
  private _findMovedHandle(): Handle {
    const abacusProperty = this._presenter.getModelAbacusProperty();
    const [firstHandle, secondHandle] = this._handles;
    this._currentHandle = firstHandle;

    if (this._cachedAbacusProperty) {
      if (this._cachedAbacusProperty.values[1] !== abacusProperty.values[1]) {
        this._currentHandle = secondHandle;
      }
    }

    return this._currentHandle;
  }

  /**
   * Возвращает HTML-элемент контейнера слайдера.
   * @returns {HTMLAbacusElement} Контейнер слайдера.
   */
  getHtmlWidget(): HTMLAbacusElement {
    return this._widgetContainer.htmlElement;
  }

  /**
   * Возвращет контейнер слайдера в исходное состояние.
   */
  destroy() {
    this._widgetContainer.htmlElement.innerHTML = '';

    this._widgetContainer.htmlElement.removeEventListener('pointerdown', this._handlerWidgetContainerClick);

    document.removeEventListener('pointermove', this._handlerHandleItemClickMove);

    document.removeEventListener('pointerup', this._handlerHandleItemClickStop);
    document.removeEventListener('pointercancel', this._handlerHandleItemClickStop);

    this._widgetContainer.restoreOldClasses();
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
