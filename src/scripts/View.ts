import { Presenter } from './Presenter';
import { WidgetContainer } from './WidgetContainer';
import { Handle } from './Handle';
import { Range } from './Range';
import { Mark } from './Mark';
import { Tooltip } from './Tooltip';

/**
 * Класс View реализует "Представление" или "Вид" паттерна проектирования MVP.
 * Соответственно, он отвечает за отрисовку интерфейса плагина, получение данных от пользователя и отображение данных,
 * находящихся в Модели.
 */
export class View{
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
  private _isDisabled: boolean = false;

  /**
   * Перемещается ли бегунок в данный момент с помощью мыши.
   * @type {boolean}
   * @private
   */
  private _isDragHandle: boolean = false;


  /**
   * Таймер перемещения мыши или пальца на экране.
   * @type {null | NodeJS.Timeout}
   * @private
   */
  private _handleMovingTimer: null | NodeJS.Timeout = null;


  /**
   * Коллекция меток разметки слайдера.
   */
  private _mapScale: Map<number, Mark> = new Map();


  /**
   * Кэш свойств сладйера из Модели.
   */
  private _cachedAbacusProperty: AbacusOptions = {};


  /**
   * Если значение равно "true", то значит слайдер находиться в вертикальном состоянии.
   */
  private _isVertical: boolean = false;


  private _currentHandle?: Handle;


  /**
   * @constructor
   * @this   {View}
   * @param  {HTMLAbacusElement} abacusHtmlContainer HTML-элемент,
   * в котором будет находиться инициализированный плагин.
   * @param  {AbacusOptions} options Параметры настройки плагина.
   * @param  {object} data Другие данные.
   */
  constructor(abacusHtmlContainer: HTMLAbacusElement, options?: AbacusOptions, data?: object){
    const viewInstance = this;

    this._presenter = new Presenter(options);
    this._presenter.eventTarget.addEventListener('update-model', (event: Event) => {
      // console.log('Модель обновилась!');
      viewInstance.updateView();
    });

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
  getPosPercent(coordXY: number): number{
    let result: number = 0;
    if( this._isVertical ){
      const posTopWidget: number = this._widgetContainer.htmlElement.getBoundingClientRect().top;
      const heigthWidget: number = this._widgetContainer.htmlElement.getBoundingClientRect().height;
      const topPx: number = coordXY - posTopWidget;
      result = (topPx / heigthWidget) * 100;
      result = 100 - result;
    }
    else{
      const posLeftWidget: number = this._widgetContainer.htmlElement.getBoundingClientRect().left;
      const widthWidget: number = this._widgetContainer.htmlElement.getBoundingClientRect().width;
      const leftPx: number = coordXY - posLeftWidget;
      result = (leftPx / widthWidget) * 100;
    }
    if( result < 0 ){
      result = 0;
    }
    if( result > 100 ){
      result = 100;
    }
    return result;
  }


  /**
   * Функция, которая получает на вход процент от начала слайдера,
   * а возвращает соответствующее значение кратно заданному шагу.
   * @deprecated
   * @param {number} percent Позиция бегунка в процентах от начала слайдера.
   * @returns {number} Значение, соответствующее проценту и кратно шагу.
   */
  getPosPerStep(percent: number): number{
    let result: number = 0;
    const options: AbacusOptions = this._presenter.getModelAbacusProperty();
    const minVal: number = options.min as number;
    const maxVal: number = options.max as number;
    const step: number = options.step as number;
    const sizeStepPercent: number = (step / (maxVal - minVal)) * 100;
    result = percent / sizeStepPercent;
    result = Math.round(result);
    result = result * sizeStepPercent;
    return result;
  }


  /**
   * Функция, которая вычисляет позицию бегунка в процентах от начала слайдера.
   * @param {number} value Значение слайдера.
   * @returns {number} Позиция бегунка в процентах от начала слайдера.
   */
  getPosFromValue(value: number): number{
    let result: number = 0;
    const options: AbacusOptions = this._presenter.getModelAbacusProperty();
    const minVal: number = options.min as number;
    let maxVal: number = options.max as number;

    // если минимальное значение меньше ноля, то
    // "сдвигаем" переданное значение (value) и максимальное значение (maxVal)
    // на минимальное значение (minVal) по модулю
    if( minVal < 0 ){
      maxVal += (minVal * -1);
      value += (minVal * -1);
    }
    result = (value / maxVal) * 100;

    if( result < 0 ){
      return 0;
    }
    if( result > 100 ){
      return 100;
    }

    return result;
  }


  /**
   * Функция, которая получает на вход процент от начала слайдера,
   * а возвращает соответствующее значение.
   * @param {number} posPercent Позиция бегунка в процентах от начала слайдера.
   * @returns {number} Значение слайдера.
   */
  getValFromPosPercent(posPercent: number): number{
    let abacusValue: number = 0;
    const options: AbacusOptions = this._presenter.getModelAbacusProperty();
    const minVal: number = options.min as number;
    let maxVal: number = options.max as number;

    // если минимальное значение меньше ноля, то
    // "сдвигаем" переданное значение (value) и максимальное значение (maxVal)
    // на минимальное значение (minVal) по модулю
    if( minVal < 0 ){
      maxVal += (minVal * -1);
    }

    abacusValue = (maxVal * posPercent) / 100;
    abacusValue -= (minVal * -1);
    return abacusValue;
  }


  /**
   * Функция получения и установки свойств слайдера.
   * @param {string} optionName Название свойства, значение которого надо получить или изменить.
   * @param {any} value Значение свойства.
   * @returns {AbacusOptions | number | string | number[] | boolean | null | AbacusClasses | undefined}
   */
  option(
    optionName?: string, 
    value?: any
  ): AbacusOptions | number | string | number[] | boolean | null | AbacusClasses | undefined{
    if( typeof optionName === 'string' ){
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
          if( value !== undefined ){
            // это условие для установки конкретного свойства слайдера
            const newProperty = {} as AbacusOptions;
            // newProperty[optionName] = value;
            newProperty[optionName] = value;
            this._presenter.setModelAbacusProperty(newProperty);
          }
          else{
            // это условие для получения конкретного свойства слайдера
            return this._presenter.getModelAbacusProperty()[optionName];
          }
          break;
      }
    }
    else if( typeof value === 'object' ){
      // это условие для установки одного или несколько свойств слайдера в виде объекта
      this._presenter.setModelAbacusProperty(value as AbacusOptions);
    }
    else{
      // это условие для получения всех свойств слайдера в виде объекта
      return this._presenter.getModelAbacusProperty();
    }
  }


  /**
   * Функция обновления Вида плагина (в том числе пользовательского интерфейса).
   */
  updateView(): void{
    const abacusProperty: AbacusOptions = this._presenter.getModelAbacusProperty();

    // Добавляем или удалаем элементы инерфейса
    // if( ! this._widgetContainer.htmlElement.contains(this._handles[0].htmlElement) ){
    //   this._widgetContainer.htmlElement.append(this._handles[0].htmlElement);
    // }


    if( this._cachedAbacusProperty?.range !== abacusProperty.range ){
      this._createViewHandles(abacusProperty);
      this._createViewRange(abacusProperty);
    }


    if( this._cachedAbacusProperty?.orientation !== abacusProperty.orientation ){
      if( abacusProperty.orientation === 'vertical' ){
        this._isVertical = true;
        this._widgetContainer.isVertical(true);
      }
      else{
        this._isVertical = false;
        this._widgetContainer.isVertical(false);
      }
    }


    if( this._cachedAbacusProperty?.tooltip !== abacusProperty.tooltip
      || this._cachedAbacusProperty?.range !== abacusProperty.range 
    ){
      this._createViewTooltips(abacusProperty);
      this._updateViewTooltips(abacusProperty);
      this._setTransition();
    }


    if( this._cachedAbacusProperty?.animate !== abacusProperty.animate ){
      this._setTransition();
    }


    // Обновляем положение бегунка и индикатора
    if( (this._cachedAbacusProperty?.range !== abacusProperty.range)
      || (this._cachedAbacusProperty?.max !== abacusProperty.max)
      || (this._cachedAbacusProperty?.min !== abacusProperty.min)
      || (this._cachedAbacusProperty?.orientation !== abacusProperty.orientation)
      || !View.arrayCompare(this._cachedAbacusProperty?.values, abacusProperty.values) 
    ){
      this._updateViewHandles(abacusProperty);
      this._updateViewTooltips(abacusProperty);
      this._updateViewRange(abacusProperty);
      this._highlightMarks();
    }

    if( !View.arrayCompare(this._cachedAbacusProperty?.values, abacusProperty.values) ){
      this._findMovedHandle();
      this._eventChangeWrapper();
    }


    // Обновляем названия классов
    if( abacusProperty.classes ){
      this._updateClassNames(abacusProperty.classes);
    }


    // Включаем или отключаем слайдер
    if( this._cachedAbacusProperty?.disabled !== abacusProperty.disabled ){
      this.toggleDisable(abacusProperty.disabled);
    }


    // Создаем шкалу значений
    if( (this._cachedAbacusProperty?.scale !== abacusProperty.scale)
      || (this._cachedAbacusProperty?.step !== abacusProperty.step)
      || (this._cachedAbacusProperty?.max !== abacusProperty.max)
      || (this._cachedAbacusProperty?.min !== abacusProperty.min)
      || (this._cachedAbacusProperty?.orientation !== abacusProperty.orientation) )
    {
      if( abacusProperty.scale ){
        this._createScale();
        this._setTransition();
      }
      else{
        this._removeScale();
      }

      this._highlightMarks();
    }

    this._cachedAbacusProperty = this._getCloneAbacusProperty(abacusProperty);
  }


  /**
   * Функция создания или удаления ручек слайдера.
   * @private
   * @param {AbacusOptions} abacusProperty Свойства плагина. 
   */
  private _createViewHandles(abacusProperty: AbacusOptions): void{
    const viewInstance = this;
    const handleIndexes: number[] = []; // массив с индексами ручек слайдера.

    if( ! viewInstance._handles?.length ){
      viewInstance._handles = [];
      viewInstance._handles[0] = new Handle(abacusProperty.classes, 0);
      viewInstance._widgetContainer.htmlElement.append(viewInstance._handles[0].htmlElement);
      this._currentHandle = this._handles[0];
      handleIndexes.push(0);
    }

    switch (abacusProperty.range) {
      case true:
        viewInstance._handles[1] = new Handle(abacusProperty.classes, 1);
        viewInstance._widgetContainer.htmlElement.append(viewInstance._handles[1].htmlElement);
        handleIndexes.push(1);
        break;

      case 'max':
      case 'min':
      default:
        if( viewInstance._handles[1] ){
          viewInstance._handles[1].htmlElement.remove();
          viewInstance._handles = viewInstance._handles.slice(0, 1);
        }
        viewInstance._currentHandle = viewInstance._handles[0];
        break;
    }

    for (let i = 0; i < handleIndexes.length; i++) {
      const handleIndex = handleIndexes[i];
      viewInstance._handles[handleIndex].htmlElement.addEventListener(
        'mousedown',
        // viewInstance._handlerHandleItemClickStart.bind(viewInstance)
        (event: MouseEvent) => {
          event.preventDefault();
          if( viewInstance._isDisabled ){
            return;
          }
          viewInstance._isDragHandle = true;
          viewInstance._currentHandle = viewInstance._handles[handleIndex];
          viewInstance._eventStartWrapper(event);
        }
      );

      viewInstance._handles[handleIndex].htmlElement.addEventListener(
        'touchstart',
        // viewInstance._handlerHandleItemClickStart.bind(viewInstance),
        (event: TouchEvent) => {
          event.preventDefault();
          if( viewInstance._isDisabled ){
            return;
          }
          viewInstance._isDragHandle = true;
          viewInstance._currentHandle = viewInstance._handles[handleIndex];
          viewInstance._eventStartWrapper(event);
        },
        {passive: true}
      );
    }
  }


  /**
   * Функция обновления ручек слайдера, а именно их местоположение.
   * @private
   * @param {AbacusOptions} abacusProperty Свойства плагина. 
   */
  private _updateViewHandles(abacusProperty: AbacusOptions): void{
    if( ! abacusProperty.values ){
      return;
    }

    for (let i = 0; i < abacusProperty.values.length; i++) {
      const currentValue: number = abacusProperty.values[i];
      const posHandle = this.getPosFromValue(currentValue);

      if( this._handles[i] ) {
        if( this._isVertical ){
          this._handles[i].posLeft = null;
          this._handles[i].posBottom = posHandle;
        }
        else{
          this._handles[i].posBottom = null;
          this._handles[i].posLeft = posHandle;
        }
      }
    }
  }


  /**
   * Функция создания или удаления подсказок слайдера.
   * @private
   * @param {AbacusOptions} abacusProperty Свойства плагина. 
   */
  private _createViewTooltips(abacusProperty: AbacusOptions): void{
    for (let i = 0; i < this._tooltips.length; i++){
      this._tooltips[i].htmlElement.remove();
    }
    this._tooltips = [];

    if( abacusProperty.tooltip ){
      const countTooltips = abacusProperty.range === true ? 2 : 1;
      for (let i = 0; i < countTooltips; i++) {
        this._tooltips[i] = new Tooltip(abacusProperty.classes, i);
        this._widgetContainer.htmlElement.append(this._tooltips[i].htmlElement);
        this._tooltips[i].isVisible(true);
      }
    }
  }


  /**
   * Функция обновления подсказок слайдера, а именно местоположение и текст.
   * @private
   * @param {AbacusOptions} abacusProperty Свойства плагина. 
   */
  private _updateViewTooltips(abacusProperty: AbacusOptions): void{
    if( ! abacusProperty.values || ! abacusProperty.tooltip ){
      return;
    }

    for (let i = 0; i < abacusProperty.values.length; i++) {
      const currentValue: number = abacusProperty.values[i];
      const posHandle = this.getPosFromValue(currentValue);

      if( this._tooltips[i] ) {
        if( this._isVertical ){
          this._tooltips[i].posLeft = null;
          this._tooltips[i].posBottom = posHandle;
        }
        else{
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
   * @param {AbacusOptions} abacusProperty Свойства плагина. 
   */
  private _createViewRange(abacusProperty: AbacusOptions): void{
    switch (abacusProperty.range) {
      case 'max':
        this._range.rangeType = 'max';
        this._widgetContainer.htmlElement.prepend(this._range.htmlElement);
        break;


      case true:
        this._range.rangeType = 'between';
        this._widgetContainer.htmlElement.prepend(this._range.htmlElement);
        break;


      case 'min':
        this._range.rangeType = 'min';
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
   * @param {AbacusOptions} abacusProperty Свойства плагина. 
   */
  private _updateViewRange(abacusProperty: AbacusOptions): void{
    if( ! abacusProperty.values?.length ){
      return;
    }

    const posHandle0 = this.getPosFromValue(abacusProperty.values[0]);
    const posHandle1 = this.getPosFromValue(abacusProperty.values[1]);

    if( this._isVertical ){
      this._range.htmlElement.style.left = '';
      this._range.htmlElement.style.right = '';
      this._range.width = null;

      switch (this._range.rangeType){
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
          this._range.htmlElement.style.bottom = posHandle0.toString() + '%';
          this._range.htmlElement.style.top = '';
          this._range.height = posHandle1 - posHandle0;
          break;
      }
    }
    else{
      this._range.htmlElement.style.top = '';
      this._range.htmlElement.style.bottom = '';
      this._range.height = null;

      switch (this._range.rangeType){
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
          this._range.htmlElement.style.left = posHandle0.toString() + '%';
          this._range.htmlElement.style.right = '';
          this._range.width = posHandle1 - posHandle0;
          break;
      }
    }
  }


  /**
   * Функция обновления индикатора (progress bar) слайдера, а именно местоположение и размер.
   * @private
   * @param {AbacusOptions} abacusProperty Свойства плагина. 
   */
  private _updateClassNames(abacusClasses: AbacusClasses){
    if( this._cachedAbacusProperty?.classes?.abacus !== abacusClasses?.abacus ){
      this._widgetContainer.className = abacusClasses?.abacus;
    }
    if( this._cachedAbacusProperty?.classes?.vertical !== abacusClasses?.vertical ){
      this._widgetContainer.classNameVertical = abacusClasses?.vertical;
    }
    if( this._cachedAbacusProperty?.classes?.disabled !== abacusClasses?.disabled ){
      this._widgetContainer.classNameDisabled = abacusClasses?.disabled;
    }

    if( this._cachedAbacusProperty?.classes?.handle !== abacusClasses?.handle ){
      for (let i = 0; i < this._handles.length; i++) {
        this._handles[i].className = abacusClasses?.handle;
      }
    }

    if( this._cachedAbacusProperty?.classes?.range !== abacusClasses?.range ){
      this._range.className = abacusClasses?.range;
    }

    if( this._cachedAbacusProperty?.classes?.mark !== abacusClasses?.mark ){
      for (const markItem of this._mapScale) {
        if(abacusClasses?.mark) {
          markItem[1].className = abacusClasses.mark;
        }
      }
    }

    if( this._cachedAbacusProperty?.classes?.markSelected !== abacusClasses?.markSelected ){
      for (const markItem of this._mapScale) {
        if(abacusClasses?.markSelected) {
          markItem[1].classNameSelected = abacusClasses.markSelected;
        }
      }
    }

    if( this._cachedAbacusProperty?.classes?.markInrange !== abacusClasses?.markInrange ){
      for (const markItem of this._mapScale) {
        if(abacusClasses?.markInrange) {
          markItem[1].classNameInrange = abacusClasses.markInrange;
        }
      }
    }
  }


  /**
   * Функция переключает состояние слайдера с активного на неактивный и обратно.
   * @param {boolean} off "true" значит отключить. "false" значит активировать.
   */
  toggleDisable(off?: boolean){
    if( off === undefined || off === null ){
      this._isDisabled = !this._isDisabled;
    }
    else{
      this._isDisabled = !!off;
    }

    this._widgetContainer.isDisabled(this._isDisabled);
  }


  /**
   * Функция упаковывает в объект некоторые данные о слайдере и бегунке для обработчиков событий.
   * @private
   * @returns {EventUIData} Объект класса EventUIData.
   */
  private _getEventUIData(): EventUIData{
    const uiData: EventUIData = {} as EventUIData;
    if( this._currentHandle ){
      uiData.handle = this._currentHandle.htmlElement;
      uiData.handleIndex = this._currentHandle.handleIndex;
    }

    const modelData = this._presenter.getModelAbacusProperty();
    uiData.abacusProperty = this._getCloneAbacusProperty(modelData);
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
  private _eventChangeWrapper(event?: Event): boolean{
    const viewInstance = this;
    if( ! event ){
      event = viewInstance._customEventChange;
    }
    const dispatchEventResult = viewInstance._widgetContainer.htmlElement.dispatchEvent(viewInstance._customEventChange);
    const abacusProperty: AbacusOptions = viewInstance._presenter.getModelAbacusProperty();
    if( typeof abacusProperty?.change === 'function' ){
      abacusProperty.change(event, viewInstance._getEventUIData());
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
  private _eventCreateWrapper(event?: Event): boolean{
    const viewInstance = this;
    if( ! event ){
      event = viewInstance._customEventCreate;
    }
    const dispatchEventResult = viewInstance._widgetContainer.htmlElement.dispatchEvent(viewInstance._customEventCreate);
    const abacusProperty: AbacusOptions = viewInstance._presenter.getModelAbacusProperty();
    if( typeof abacusProperty?.create === 'function' ){
      abacusProperty.create(event, viewInstance._getEventUIData());
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
  private _eventSlideWrapper(event?: Event): boolean{
    const viewInstance = this;
    if( ! event ){
      event = viewInstance._customEventSlide;
    }
    const dispatchEventResult = viewInstance._widgetContainer.htmlElement.dispatchEvent(viewInstance._customEventSlide);
    const abacusProperty: AbacusOptions = viewInstance._presenter.getModelAbacusProperty();
    if( typeof abacusProperty?.slide === 'function' ){
      abacusProperty.slide(event, viewInstance._getEventUIData());
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
  private _eventStartWrapper(event?: Event): boolean{
    const viewInstance = this;
    if( ! event ){
      event = viewInstance._customEventStart;
    }
    const dispatchEventResult = viewInstance._widgetContainer.htmlElement.dispatchEvent(viewInstance._customEventStart);
    const abacusProperty: AbacusOptions = viewInstance._presenter.getModelAbacusProperty();
    if( typeof abacusProperty?.start === 'function' ){
      abacusProperty.start(event, viewInstance._getEventUIData());
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
  private _eventStopWrapper(event?: Event): boolean{
    const viewInstance = this;
    if( ! event ){
      event = viewInstance._customEventStop;
    }
    const dispatchEventResult = viewInstance._widgetContainer.htmlElement.dispatchEvent(viewInstance._customEventStop);
    const abacusProperty: AbacusOptions = viewInstance._presenter.getModelAbacusProperty();
    if( typeof abacusProperty?.stop === 'function' ){
      abacusProperty.stop(event, viewInstance._getEventUIData());
    }

    return dispatchEventResult;
  }


  /**
   * Функция, обрабатывающая позицию мыши или касания и вычисляющая, какию ручку перемещать.
   * @private
   * @param {MouseEvent | TouchEvent} event Объект события мыши или касания.
   */
  private _mouseHandler(event: MouseEvent | TouchEvent): void{
    const viewInstance = this;
    const abacusProperty = viewInstance._presenter.getModelAbacusProperty();
		if( ! abacusProperty.values?.length || ! viewInstance._currentHandle ){
			return;
		}

    let coordinate: number = 0;
    if( event instanceof MouseEvent ){
      coordinate = this._isVertical ? event.clientY : event.clientX;
    }
    else if(event instanceof TouchEvent){
      coordinate = this._isVertical ? event.changedTouches[0].screenY : event.changedTouches[0].screenX;
    }

    const percent = this.getPosPercent(coordinate);
    const valueUnrounded: number = this.getValFromPosPercent(percent);

    let newValues: number[] = abacusProperty.values?.slice(0);

    if( viewInstance._currentHandle.handleIndex === 0 ){
      if( valueUnrounded >= abacusProperty.values[1] ){
        newValues[0] = abacusProperty.values[1];
        viewInstance._currentHandle = viewInstance._handles[1];
      }
      else{
        newValues[0] = valueUnrounded;
      }
    }

    if( viewInstance._currentHandle.handleIndex === 1 ){
      if( valueUnrounded <= abacusProperty.values[0] ){
        newValues[1] = abacusProperty.values[0];
        viewInstance._currentHandle = viewInstance._handles[0];
      }
      else{
        newValues[1] = valueUnrounded;
      }
    }

    viewInstance._presenter.setAbacusValue(newValues);
  }


  /**
   * Функция, которая вычисляет, какие значения были изменены, и передает их через Представителя в Модель.
   * @private
   * @param {number} valueUnrounded Значение, полученное из позиции клика мыши или касания.
   */
  private _calcHandleValues(valueUnrounded: number): void{
    if( isNaN(valueUnrounded) ){
      return;
    }

    const viewInstance = this;
    let abacusProperty = viewInstance._presenter.getModelAbacusProperty();
		if( ! abacusProperty.values?.length ){
			return;
		}

    let newValues: number[] = [];
    if( abacusProperty.values ){
      newValues = abacusProperty.values?.slice(0);
    }

    if( abacusProperty.range === true 
      && abacusProperty.values?.length 
      && abacusProperty.step
    ){
      let deltaMin = abacusProperty.values[0] - valueUnrounded;
          deltaMin = deltaMin < 0 ? deltaMin *= -1 : deltaMin;
      let deltaMax = abacusProperty.values[1] - valueUnrounded;
          deltaMax = deltaMax < 0 ? deltaMax *= -1 : deltaMax;

      if( deltaMax < deltaMin ){
        newValues[1] = valueUnrounded;

        // это условие нужно, чтобы можно было сократить интервал до ноля. 
        // if( View.round(abacusProperty.values[0] + abacusProperty.step, abacusProperty.step) === abacusProperty.values[1]
        //   && valueUnrounded < abacusProperty.values[1]
        // ){
        //   newValues[0] = abacusProperty.values[1];
        // }
        // else{
        //   newValues[1] = valueUnrounded;
        // }
      }
      else{
        newValues[0] = valueUnrounded;

        // это условие нужно, чтобы можно было сократить интервал до ноля. 
        // if( View.round(abacusProperty.values[1] - abacusProperty.step, abacusProperty.step) === abacusProperty.values[0]
        //   && valueUnrounded > abacusProperty.values[0]){
        //   newValues[1] = abacusProperty.values[0];
        // }
        // else{
        //   newValues[0] = valueUnrounded;
        // }
      }
    }
    else{
      newValues[0] = valueUnrounded;
    }

    viewInstance._presenter.setAbacusValue(newValues);
  }


  /**
   * Установка обработчиков событий.
   * @private
   */
  private _bindEventListeners(): void{
    const viewInstance = this;

    viewInstance._widgetContainer.htmlElement.addEventListener(
      'click',
      viewInstance._handlerWidgetContainerClick.bind(viewInstance)
    );
    viewInstance._widgetContainer.htmlElement.addEventListener(
      'touchend',
      viewInstance._handlerWidgetContainerClick.bind(viewInstance)
    );

    document.addEventListener(
      'mousemove',
      viewInstance._handlerHandleItemClickMove.bind(viewInstance),
      {passive: true}
    );
    document.addEventListener(
      'touchmove',
      viewInstance._handlerHandleItemClickMove.bind(viewInstance),
      {passive: true}
    );

    document.addEventListener(
      'mouseup',
      viewInstance._handlerHandleItemClickStop.bind(viewInstance)
    );
    document.addEventListener(
      'touchend',
      viewInstance._handlerHandleItemClickStop.bind(viewInstance)
    );
    document.addEventListener(
      'touchcancel',
      viewInstance._handlerHandleItemClickStop.bind(viewInstance)
    );
  }


  /**
   * Обработчик клика по слайдеру. По клику перемещает ручку слайдера.
   * @private
   */
  private _handlerWidgetContainerClick(event: MouseEvent | TouchEvent): void{
    event.preventDefault();
    const viewInstance = this;
    const abacusProperty = viewInstance._presenter.getModelAbacusProperty();
    const eventTarget = event.target as HTMLElement;
    const handleClass = abacusProperty.classes?.handle ? abacusProperty.classes?.handle : '';
    const markClass = abacusProperty.classes?.mark ? abacusProperty.classes?.mark : '';

    if( viewInstance._isDisabled
      || eventTarget.classList.contains(handleClass)
      || eventTarget.classList.contains(markClass)
    ){
      return;
    }

    // viewInstance._mouseHandler(event);

    let coordinate: number = 0;
    if( event instanceof MouseEvent ){
      coordinate = this._isVertical ? event.clientY : event.clientX;
    }
    else if(event instanceof TouchEvent){
      coordinate = this._isVertical ? event.changedTouches[0].screenY : event.changedTouches[0].screenX;
    }

    const percent = this.getPosPercent(coordinate);
    const valueUnrounded: number = this.getValFromPosPercent(percent);
    viewInstance._calcHandleValues(valueUnrounded);
  }


  /**
   * Обработчик клика по ручке слайдера. Фиксирует нажатие на ручку и генерирует событие "start".
   * @private
   */
  private _handlerHandleItemClickStart(event: MouseEvent | TouchEvent): void{
    event.preventDefault();
    // console.log('_handlerHandleItemClickStart');
    const viewInstance = this;
    if( viewInstance._isDisabled ){
      return;
    }
    viewInstance._isDragHandle = true;
    viewInstance._eventStartWrapper(event);
  }


  /**
   * Обработчик пересещения курсора или пальца по экрану.
   * Нужен для того, чтобы вычислить, куда переместить ручку слайдера. Генерирует событие "slide".
   * @private
   */
  private _handlerHandleItemClickMove(event: MouseEvent | TouchEvent): void{
    const viewInstance = this;
    if( viewInstance._isDisabled ){
      return;
    }
    
    if(viewInstance._handleMovingTimer !== null) {
      clearTimeout(viewInstance._handleMovingTimer);
    }
    viewInstance._handleMovingTimer = setTimeout(() => {
      if( viewInstance._isDragHandle ){
        // console.log('_handlerHandleItemClickMove');
        viewInstance._mouseHandler(event);
        // let coordinate: number = 0;
        // if( event instanceof MouseEvent ){
        //   coordinate = this._isVertical ? event.clientY : event.clientX;
        // }
        // else if(event instanceof TouchEvent){
        //   coordinate = this._isVertical ? event.changedTouches[0].screenY : event.changedTouches[0].screenX;
        // }
    
        // const percent = this.getPosPercent(coordinate);
        // const valueUnrounded: number = this.getValFromPosPercent(percent);
        // viewInstance._calcHandleValues(valueUnrounded);

        // viewInstance._eventSlideWrapper(event);
      }
    }, 5);
  }


  /**
   * Обработчик окончание пересещения курсора или пальца по экрану.
   * Генерирует событие "stop".
   * @private
   */
  private _handlerHandleItemClickStop(event: MouseEvent | TouchEvent): void{
    const viewInstance = this;
    if( viewInstance._isDragHandle ){
      // console.log('_handlerHandleItemClickStop');
      viewInstance._eventStopWrapper(event);
    }
    viewInstance._isDragHandle = false;
  }


  /**
   * Создает шкалу значений и добавляет ее в слайдер.
   * @private
   */
  private _createScale(): void{
    if( this._mapScale.size ){
      this._removeScale();
    }

    const abacusProperty = this._presenter.getModelAbacusProperty();
    if( abacusProperty.min !== undefined && abacusProperty.max !== undefined && abacusProperty.step !== undefined ){
      let value = abacusProperty.min;
      for (; value <= abacusProperty.max; value += abacusProperty.step) {
        value = View.round(value, abacusProperty.step);
        const mark = new Mark(abacusProperty.classes);
        const left = this.getPosFromValue(value);

        if( this._isVertical ) mark.posBottom = left;
        else mark.posLeft = left;

        mark.htmlElement.innerText = value.toString();
        this._mapScale.set(value, mark);
      }

      if( value !== abacusProperty.max ){
        const mark = new Mark(abacusProperty.classes);
        const left = this.getPosFromValue(abacusProperty.max);

        if( this._isVertical ) mark.posBottom = left;
        else mark.posLeft = left;

        mark.htmlElement.innerText = abacusProperty.max.toString();
        this._mapScale.set(value, mark);
      }
    }

    if( this._widgetContainer.htmlElement.contains(this._handles[0].htmlElement) ){
      for(const mark of this._mapScale.values()){
        this._handles[0].htmlElement.before(mark.htmlElement);
      }
    }
    else{
      for(const mark of this._mapScale.values()){
        this._widgetContainer.htmlElement.append(mark.htmlElement);
      }
    }

    this._thinOutScale();
    this._bindEventListenersOnMarks();
  }


  /**
   * Удаляет шкалу значений.
   * @private
   */
  private _removeScale(): void{
    for(const mark of this._mapScale.values()){
      mark.htmlElement.remove();
    }
    this._mapScale.clear();
  }


  /**
   * Функция удаления лишних меток на шкале значений для того, чтобы они не "слипались" друг с другом.
   * @private
   */
  private _thinOutScale(): void{
    let sizeWidget: number;
    if( this._isVertical ){
      sizeWidget = this._widgetContainer.htmlElement.offsetHeight;
    }
    else{
      sizeWidget = this._widgetContainer.htmlElement.offsetWidth;
    }

    const k = 7; // Минимальное расстояние между метка шкалы.
    let sizeMarks: number = 0;
    if( this._isVertical ){
      for(const mark of this._mapScale.values()){
        sizeMarks += mark.htmlElement.offsetHeight + k;
      }
    }
    else{
      for(const mark of this._mapScale.values()){
        sizeMarks += mark.htmlElement.offsetWidth + k;
      }
    }

    if( sizeWidget < sizeMarks ){
      const abacusProperty = this._presenter.getModelAbacusProperty();
      if( abacusProperty.min !== undefined && abacusProperty.max !== undefined && abacusProperty.step !== undefined ){
        let isDelete: boolean = false;
        for (const mark of this._mapScale) {
          if( mark[0] === abacusProperty.min || mark[0] === abacusProperty.max || isDelete ){
            isDelete = false;
            continue;
          }

          mark[1]?.htmlElement.remove();
          this._mapScale.delete(mark[0]);
          isDelete = true;
        }
      }
    }

    sizeMarks = 0;

    if( this._isVertical ){
      for(const mark of this._mapScale.values()){
        sizeMarks += mark.htmlElement.offsetHeight + k;
      }
    }
    else{
      for(const mark of this._mapScale.values()){
        sizeMarks += mark.htmlElement.offsetWidth + k;
      }
    }

    if( sizeWidget < sizeMarks ){
      this._thinOutScale();
    }
  }


  /**
   * Функция меняет состояния меток в шкале значений.
   * @private
   */
  private _highlightMarks(): void{
    if( ! this._mapScale.size ){
      return;
    }

    const abacusProperty = this._presenter.getModelAbacusProperty();
    const rangeType = abacusProperty.range;

    if( abacusProperty.min !== undefined
      && abacusProperty.max !== undefined
      && abacusProperty.step !== undefined
      && abacusProperty.values?.length 
    ){
      for (const markItem of this._mapScale) {
        if( rangeType === 'min' && markItem[0] <= abacusProperty.values[0]){
          markItem[1].isInrange(true);
        }
        else if( rangeType === 'max' && markItem[0] >= abacusProperty.values[0]){
          markItem[1].isInrange(true);
        }
        else if( rangeType === true 
          && markItem[0] >= abacusProperty.values[0] 
          && markItem[0] <= abacusProperty.values[1] 
        ){
          markItem[1].isInrange(true);
        }
        else{
          markItem[1].isInrange(false);
        }

        if( markItem[0] === abacusProperty.values[0] || markItem[0] === abacusProperty.values[1] ){
          markItem[1].isSelected(true);
        }
        else{
          markItem[1].isSelected(false);
        }
      }
    }
  }


  /**
   * Функция установки обработчиков на метки шкалы значений.
   * @private
   */
  private _bindEventListenersOnMarks(): void{
    for (const mark of this._mapScale) {
      // я оставил эти обработчики в таком виде,
      // так как мне нужна ссылка на объект View и значение метки, на которую кликнули.
      mark[1].htmlElement.addEventListener('click', (event: MouseEvent) => {
        const viewInstance = this;
        if( viewInstance._isDisabled ){
          return;
        }

        const value = mark[0];
        if( viewInstance._cachedAbacusProperty?.value !== value ){
          viewInstance._calcHandleValues(value);
        }
      });

      mark[1].htmlElement.addEventListener('touchend', (event: TouchEvent) => {
        const viewInstance = this;
        if( viewInstance._isDisabled ){
          return;
        }

        const value = mark[0];
        if( viewInstance._cachedAbacusProperty?.value !== value ){
          viewInstance._calcHandleValues(value);
        }
      });
    }
  }


  /**
   * Установка css-свойства "transition" элементам интерфейса слайдера.
   * Первоначальное значение береться из model.abacusProperty.aniamte.
   * @private
   */
  private _setTransition(): void{
    let duration: string = '';
    const animate = this._presenter.getModelAbacusProperty().animate;
    if( typeof animate === 'number' && animate > 0 ){
      duration = animate.toString();
    }
    else if( animate === true ){
      duration = '400';
    }
    else if( animate === 'slow' ){
      duration = '600';
    }
    else if( animate === 'fast' ){
      duration = '200';
    }

    duration = duration ? duration + 'ms' : '';

    for (let i = 0; i < this._handles.length; i++) {
      this._handles[i].htmlElement.style.transition = duration;
      if( this._tooltips[i] ) {
        this._tooltips[i].htmlElement.style.transition = duration;
      }
    }

    this._range.htmlElement.style.transition = duration;
    if( this._mapScale ){
      for (const markItem of this._mapScale) {
        markItem[1].htmlElement.style.transition = duration;
      }
    }
  }


  private _getCloneAbacusProperty(abacusProperty: AbacusOptions): AbacusOptions{
    const cloneProperty = {} as AbacusOptions;
    Object.assign(cloneProperty, abacusProperty);
    cloneProperty.values = abacusProperty.values?.slice(0);
    Object.assign(cloneProperty.classes, abacusProperty.classes);
    return cloneProperty;
  }


  private _findMovedHandle(): Handle{
    const abacusProperty = this._presenter.getModelAbacusProperty();
    
    this._currentHandle = this._handles[0];
    
    if( this._cachedAbacusProperty.values?.length && abacusProperty.values?.length ){
      if( this._cachedAbacusProperty.values[1] !== abacusProperty.values[1] ){
        this._currentHandle = this._handles[1];
      }
    }

    return this._currentHandle;
  }


  /**
   * Функция получения количества знаков после запятой.
   * @static
   * @param {number} x Число, у которого надо узнать количество знаков после запятой.
   * @returns {number} Количество знаков после запятой.
   */
  static countNumAfterPoint(x: number): number{
    return ~(x + '').indexOf('.') ? (x + '').split('.')[1].length : 0;
  }


  /**
   * Функция окргуления числа до того количества знаков после запятой, сколько этих знаков у числа fractionalNum.
   * @static
   * @param {number} value Число, которое надо округлить.
   * @param {number} fractionalNum Число, у которого надо узнать количество знаков после запятой.
   * @returns {number} Округленное число.
   */
  static round(value: number, fractionalNum: number): number{
    const numbersAfterPoint = View.countNumAfterPoint(fractionalNum);
    if( numbersAfterPoint > 0 ){
      value = parseFloat(value.toFixed(numbersAfterPoint));
    }
    else{
      value = Math.round(value);
    }

    return value;
  }


  /**
   * Функция сравнения двух массивов с произвольними примитивными значениями.
   * @static
   * @param {Array<any>} a Массив
   * @param {Array<any>} b Массив
   * @returns {boolean} Возвращает "true" если массивы одинаковые. Иначе "false".
   */
  static arrayCompare(a?: Array<any>, b?: Array<any>): boolean{
    if( !a || !b)
      return false;

    if( a?.length !== b?.length )
      return false;

    for(let i = 0; i < a.length; i++){
      if( a[i] !== b[i] ){
        return false;
      }
    }

    return true;
  }
}