import {Presenter} from './Presenter';
import {WidgetContainer} from './WidgetContainer';
import {Handle} from './Handle';
import {Range} from './Range';
import {Mark} from './Mark';

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
   * Объект, в котором содержится ссылка на HTML-элемент бегунка с дополнительными свойствами.
   * @type {Handle}
   * @private
   */
  private _handleItem: Handle;

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
  private _mapMarkup: Map<number, Mark> = new Map();


  /**
   * Кэш свойств сладйера из Модели.
   */
  private _cachedAbacusProperty: AbacusOptions = {};


  /**
   * @constructor
   * @this   {View}
   * @param  {HTMLAbacusElement} abacusHtmlContainer - HTML-элемент,
   * в котором будет находиться инициализированный плагин.
   * @param  {AbacusOptions} options - Параметры настройки плагина.
   * @param  {object} data - Другие данные.
   */
  constructor(abacusHtmlContainer: HTMLAbacusElement, options?: AbacusOptions, data?: object){
    const viewInstance = this;

    this._presenter = new Presenter(options);
    this._presenter.eventTarget.addEventListener('update-model', (event: Event) => {
      // console.log('Модель обновилась!');
      viewInstance.updateView();
    });

    const abacusProperty = this._presenter.getModelAbacusProperty();

    this._widgetContainer = new WidgetContainer(abacusHtmlContainer, abacusProperty.classes?.abacus);
    this._widgetContainer.htmlElement.innerHTML = '';
    this._handleItem = new Handle(abacusProperty.classes?.handle);
    this._range = new Range(abacusProperty.classes?.range);


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

    this._bindEventListeners();

    this.updateView();
    $.extend(this._cachedAbacusProperty, abacusProperty);

    this._eventCreateWrapper();
  }


  /**
   * Геттер (функция получения) ссылки объекта-обертки HTML-элемента контейнера плагина.
   * @public
   * @returns {WidgetContainer} Возвращает ссылку на объект-обертку HTML-элемента контейнера плагина.
   */
	public get widgetContainer() : WidgetContainer {
		return this._widgetContainer;
	}


  /**
   * Геттер (функция получения) ссылки объекта-обертки HTML-элемента индикатора (progress bar).
   * @public
   * @returns {Range} Возвращает ссылку на объект-обертку HTML-элемента индикатора (progress bar).
   */
	public get range() : Range {
		return this._range;
	}


  /**
   * Геттер (функция получения) ссылки объекта-обертки HTML-элемента бегунка.
   * @public
   * @returns {Handle} Возвращает ссылку на объект-обертку HTML-элемента бегунка.
   */
	public get handleItem() : Handle {
		return this._handleItem;
	}


  /**
   * Функция, которая получает на входе координату клика по оси Х относительно окна браузера,
   * а возвращает количество процентов от начала (левого края) слайдера.
   * @param {number} clientX - Координата клика по оси Х относительно окна браузера.
   * @returns {number} - Количество процентов от начала (левого края) слайдера.
   */
  getPosLeftPercent(clientX: number): number{
    let result: number = 0;
    const posLeftWidget: number = this._widgetContainer.htmlElement.getBoundingClientRect().left;
    const widthWidget: number = this._widgetContainer.htmlElement.getBoundingClientRect().width;
    const leftPx: number = clientX - posLeftWidget;
    result = (leftPx / widthWidget) * 100;
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
   * @param {number} percent - Позиция бегунка в процентах от начала слайдера.
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
   * @param {number} value - Значение слайдера.
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
   * @param {number} posPercent - Позиция бегунка в процентах от начала слайдера.
   * @returns {number} - Значение слайдера.
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
   * @param {AbacusOptions | string} optionName -
   * @param {any} value -
   * @returns {}
   */
  option(optionName?: string, value?: AbacusOptions | any): any{
    if( typeof optionName === 'string' ){
      switch (optionName) {
        case 'animate':
        case 'classes':
        case 'disabled':
        case 'max':
        case 'min':
        case 'orientation':
        case 'range':
        case 'step':
        case 'value':
        case 'values':
          if( value !== undefined ){
            // это условие для установки конкретного свойства слайдера
            const newProperty = {} as AbacusOptions;
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
   * @returns
   */
  updateView(): void{
    const abacusProperty: AbacusOptions = this._presenter.getModelAbacusProperty();

    // Добавляем или удалаем элементы инерфейса
    if( ! this._widgetContainer.htmlElement.contains(this._handleItem.htmlElement) ){
      this._widgetContainer.htmlElement.append(this._handleItem.htmlElement);
    }

    if( this._cachedAbacusProperty?.range !== abacusProperty.range ){
      switch (abacusProperty.range) {
        case 'max':
          this._range.rangeType = 'max';
          this._widgetContainer.htmlElement.prepend(this._range.htmlElement);
          break;

        case true:
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

    // Обновляем положение бегунка и индикатора
    if( this._cachedAbacusProperty?.value !== abacusProperty.value ){
      const currentValue: number = abacusProperty.value as number;
      const posHandle: number = this.getPosFromValue(currentValue);
      this._handleItem.posLeft = posHandle;

      switch (this._range.rangeType) {
        case 'min':
          this._range.htmlElement.style.left = '0';
          this._range.htmlElement.style.right = 'auto';
          this._range.width = posHandle;
          break;

        case 'max':
          this._range.htmlElement.style.left = 'auto';
          this._range.htmlElement.style.right = '0';
          this._range.width = 100 - posHandle;
          break;
      }

      if( this._mapMarkup.size ){
        this._highlightMarks();
      }
    }

    // Обновляем названия классов
    if( abacusProperty.classes?.abacus ){
      this._widgetContainer.className = abacusProperty.classes?.abacus;
    }
    if( abacusProperty.classes?.handle ){
      this._handleItem.className = abacusProperty.classes?.handle;
    }
    if( abacusProperty.classes?.range ){
      this._range.className = abacusProperty.classes?.range;
    }

    // Включаем или отключаем слайдер
    if( this._cachedAbacusProperty?.disabled !== abacusProperty.disabled ){
      this.toggleDisable(abacusProperty.disabled);
    }

    // Создаем шкалу значений
    if( (this._cachedAbacusProperty?.markup !== abacusProperty.markup)
    || (this._cachedAbacusProperty?.step !== abacusProperty.step) ){
      if( abacusProperty.markup ){
        this._createMarkup();
      }
      else{
        this._removeMarkup();
      }

      if( this._mapMarkup.size ){
        this._highlightMarks();
      }
    }

    $.extend(this._cachedAbacusProperty, abacusProperty);
  }


  toggleDisable(off?: boolean){
    if( off === undefined || off === null ){
      this._isDisabled = !this._isDisabled;
    }
    else{
      this._isDisabled = !!off;
    }

    const abacusPropertyClasses = this._presenter.getModelAbacusProperty().classes;
    if( this._isDisabled ){
      this._widgetContainer.classNameDisabled = abacusPropertyClasses?.disabled ? abacusPropertyClasses.disabled : 'abacus_disabled';
    }
    else{
      this._widgetContainer.classNameDisabled = '';
    }
  }


  /**
   * Функция упаковывает в объект некоторые данные о слайдере и бегунке для обработчиков событий.
   * @private
   * @returns {EventUIData} - Объект класса EventUIData.
   */
  private _getEventUIData(): EventUIData{
    const uiData: EventUIData = {} as EventUIData;
    uiData.handle = this._handleItem.htmlElement;
    uiData.handleIndex = this._handleItem.handleIndex;

    const modelData = this._presenter.getModelAbacusProperty();
    uiData.value = modelData.value as number;
    uiData.values = modelData.values;
    return uiData;
  }


  /**
   * Функция-обертка события "abacus-change". Генерирует событие "abacus-change" и вызывает callback "change".
   * @private
   * @param {Event} event - Объект события. По умолчанию равен объекту события изменения значения слайдера.
   * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
   * этого события вызвал Event.preventDefault(). В ином случае — true.
   * (Точно также, как у функции EventTarget.dispatchEvent()).
   */
  private _eventChangeWrapper(event?: Event): boolean{
    if( ! event ){
      event = this._customEventChange;
    }
    const dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventChange);
    const viewInstance = this;
    const abacusProperty: AbacusOptions = this._presenter.getModelAbacusProperty();
    if( typeof abacusProperty?.change === 'function' ){
      abacusProperty.change(event, viewInstance._getEventUIData());
    }

    return dispatchEventResult;
  }


  /**
   * Функция-обертка события "abacus-create". Генерирует событие "abacus-create" и вызывает callback "create".
   * @private
   * @param {Event} event - Объект события. По умолчанию равен объекту события инициализации плагина.
   * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
   * этого события вызвал Event.preventDefault().
   * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
   */
  private _eventCreateWrapper(event?: Event): boolean{
    if( ! event ){
      event = this._customEventCreate;
    }
    const dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventCreate);
    const viewInstance = this;
    const abacusProperty: AbacusOptions = this._presenter.getModelAbacusProperty();
    if( typeof abacusProperty?.create === 'function' ){
      abacusProperty.create(event, viewInstance._getEventUIData());
    }

    return dispatchEventResult;
  }


  /**
   * Функция-обертка события "abacus-slide". Генерирует событие "abacus-slide" и вызывает callback "slide".
   * @private
   * @param {Event} event - Объект события. По умолчанию равен объекту события перемещения бегунка слайдера.
   * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
   * этого события вызвал Event.preventDefault().
   * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
   */
  private _eventSlideWrapper(event?: Event): boolean{
    if( ! event ){
      event = this._customEventSlide;
    }
    const dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventSlide);
    const viewInstance = this;
    const abacusProperty: AbacusOptions = this._presenter.getModelAbacusProperty();
    if( typeof abacusProperty?.slide === 'function' ){
      abacusProperty.slide(event, viewInstance._getEventUIData());
    }

    return dispatchEventResult;
  }


  /**
   * Функция-обертка события "abacus-start". Генерирует событие "abacus-start" и вызывает callback "start".
   * @private
   * @param {Event} event - Объект события. По умолчанию равен объекту события начала перемещения бегунка слайдера.
   * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
   * этого события вызвал Event.preventDefault().
   * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
   */
  private _eventStartWrapper(event?: Event): boolean{
    if( ! event ){
      event = this._customEventStart;
    }
    const dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventStart);
    const viewInstance = this;
    const abacusProperty: AbacusOptions = this._presenter.getModelAbacusProperty();
    if( typeof abacusProperty?.start === 'function' ){
      abacusProperty.start(event, viewInstance._getEventUIData());
    }

    return dispatchEventResult;
  }


  /**
   * Функция-обертка события "abacus-stop". Генерирует событие "abacus-stop" и вызывает callback "stop".
   * @private
   * @param {Event} event - Объект события. По умолчанию равен объекту события окончания перемещения бегунка слайдера.
   * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков
   * этого события вызвал Event.preventDefault().
   * В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
   */
  private _eventStopWrapper(event?: Event): boolean{
    if( ! event ){
      event = this._customEventStop;
    }
    const dispatchEventResult = this._widgetContainer.htmlElement.dispatchEvent(this._customEventStop);
    const viewInstance = this;
    const abacusProperty: AbacusOptions = this._presenter.getModelAbacusProperty();
    if( typeof abacusProperty?.stop === 'function' ){
      abacusProperty.stop(event, viewInstance._getEventUIData());
    }

    return dispatchEventResult;
  }


  /**
   * Функция, обрабатывающая позицию мыши.
   * @param {MouseEvent} event - Объект события мыши.
   */
  private _mouseHandler(event: MouseEvent | TouchEvent): void{
    const viewInstance = this;
    const abacusProperty = viewInstance._presenter.getModelAbacusProperty();
    const oldValue = abacusProperty.value;

    let left: number = 0;
    if( event instanceof MouseEvent ){
      left = this.getPosLeftPercent(event.clientX);
    }
    else if(event instanceof TouchEvent){
      left = this.getPosLeftPercent(event.changedTouches[0].screenX);
    }

    const newAbacusValue: number = this.getValFromPosPercent(left);
    viewInstance._presenter.setAbacusValue(newAbacusValue);
    if( oldValue !== abacusProperty.value ){
      viewInstance.updateView();
      viewInstance._eventChangeWrapper(event);
    }
  }


  /**
   * Установка обработчиков событий.
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

    viewInstance._handleItem.htmlElement.addEventListener(
      'mousedown',
      viewInstance._handlerHandleItemClickStart.bind(viewInstance)
    );
    viewInstance._handleItem.htmlElement.addEventListener(
      'touchstart',
      viewInstance._handlerHandleItemClickStart.bind(viewInstance),
      {passive: true}
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


  private _handlerWidgetContainerClick(event: MouseEvent | TouchEvent): void{
    event.preventDefault();
    const viewInstance = this;
    if( viewInstance._isDisabled || event.target === this._handleItem.htmlElement ){
      return;
    }
    viewInstance._mouseHandler(event);
  }


  private _handlerHandleItemClickStart(event: MouseEvent | TouchEvent): void{
    event.preventDefault();
    const viewInstance = this;
    if( viewInstance._isDisabled ){
      return;
    }
    viewInstance._isDragHandle = true;
    viewInstance._eventStartWrapper(event);
  }


  private _handlerHandleItemClickMove(event: MouseEvent | TouchEvent): void{
    event.preventDefault();
    const viewInstance = this;
    if( viewInstance._isDisabled ){
      return;
    }

    if(viewInstance._handleMovingTimer !== null) {
      clearTimeout(viewInstance._handleMovingTimer);
    }
    viewInstance._handleMovingTimer = setTimeout(() => {
      if( viewInstance._isDragHandle ){
        viewInstance._mouseHandler(event);
        viewInstance._eventSlideWrapper(event);
      }
    }, 15);
  }


  private _handlerHandleItemClickStop(event: MouseEvent | TouchEvent): void{
    event.preventDefault();
    const viewInstance = this;
    if( viewInstance._isDragHandle ){
      viewInstance._eventStopWrapper(event);
    }
    viewInstance._isDragHandle = false;
  }


  private _createMarkup(): void{
    if( this._mapMarkup.size ){
      this._removeMarkup();
    }

    const abacusProperty = this._presenter.getModelAbacusProperty();
    if( abacusProperty.min !== undefined && abacusProperty.max !== undefined && abacusProperty.step !== undefined ){
      let value = abacusProperty.min;
      for (; value <= abacusProperty.max; value += abacusProperty.step) {
        const mark = new Mark(abacusProperty.classes);
        const left = this.getPosFromValue(value);
        mark.posLeft = left;
        this._mapMarkup.set(value, mark);
      }
      if( value !== abacusProperty.max ){
        const mark = new Mark(abacusProperty.classes);
        const left = this.getPosFromValue(value);
        mark.posLeft = left;
        this._mapMarkup.set(value, mark);
      }
    }

    for(let mark of this._mapMarkup.values()){
      if( this._widgetContainer.htmlElement.contains(this._handleItem.htmlElement) ){
        this._handleItem.htmlElement.before(mark.htmlElement);
      }
      else{
        this._widgetContainer.htmlElement.append(mark.htmlElement);
      }
    }
  }


  private _removeMarkup(): void{
    for(let mark of this._mapMarkup.values()){
      mark.htmlElement.remove();
    }
    this._mapMarkup.clear();
  }


  private _highlightMarks(): void{
    const abacusProperty = this._presenter.getModelAbacusProperty();
    const rangeType = abacusProperty.range;

    if( abacusProperty.min !== undefined
      && abacusProperty.max !== undefined
      && abacusProperty.step !== undefined
      && abacusProperty.value !== undefined )
    {
      for (const markItem of this._mapMarkup) {
        if( (rangeType === 'min' || rangeType === true) && markItem[0] <= abacusProperty.value){
          markItem[1].isInrange(true);
        }
        else if( rangeType === 'max' && markItem[0] >= abacusProperty.value){
          markItem[1].isInrange(true);
        }
        else{
          markItem[1].isInrange(false);
        }

        if( markItem[0] === abacusProperty.value){
          markItem[1].isSelected(true);
        }
        else{
          markItem[1].isSelected(false);
        }
      }
    }
  }
}