import {Presenter} from './Presenter';
import {WidgetContainer} from './WidgetContainer';
import {Handle} from './Handle';
import {Range} from './Range';

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
   * @constructor
   * @this   {View}
   * @param  {HTMLAbacusElement} abacusHtmlContainer - HTML-элемент, в котором будет находиться инициализированный плагин.
   * @param  {AbacusOptions} options - Параметры настройки плагина.
   * @param  {object} data - Другие данные.
   */
  constructor(abacusHtmlContainer: HTMLAbacusElement, options?: AbacusOptions, data?: object){
    let viewInstance = this;

    this._presenter = new Presenter(options);
    this._presenter.eventTarget.addEventListener('update-model', function(event: Event){
      // console.log('Модель обновилась!');
      viewInstance.updateView();
    });
    
    let abacusProperty = this._presenter.getModelAbacusProperty();
    
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

    this._widgetContainer.htmlElement.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      let left: number = this.getPosLeftPercent(event.clientX);
      let newAbacusValue: number = this.getValFromPosPercent(left);
      this._presenter.setAbacusValue(newAbacusValue);
      viewInstance.updateView();
      this._eventChangeWrapper(event);
    });

    this.updateView();

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
    let offsetLeftWidget: number = this._widgetContainer.htmlElement.offsetLeft;
    let widthWidget: number = this._widgetContainer.htmlElement.offsetWidth;
    let leftPx: number = clientX - offsetLeftWidget;
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
    let options: AbacusOptions = this._presenter.getModelAbacusProperty();
    let minVal: number = options.min as number;
    let maxVal: number = options.max as number;
    let step: number = options.step as number;
    let sizeStepPercent: number = (step / (maxVal - minVal)) * 100;
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
    let options: AbacusOptions = this._presenter.getModelAbacusProperty();
    let minVal: number = options.min as number;
    let maxVal: number = options.max as number;

    // если минимальное значение меньше ноля, то 
    // "сдвигаем" переданное значение (value) и максимальное значение (maxVal) на минимальное значение (minVal) по модулю
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
    let options: AbacusOptions = this._presenter.getModelAbacusProperty();
    let minVal: number = options.min as number;
    let maxVal: number = options.max as number;

    // если минимальное значение меньше ноля, то 
    // "сдвигаем" переданное значение (value) и максимальное значение (maxVal) на минимальное значение (minVal) по модулю
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
            let newProperty = new Object as AbacusOptions;
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
    this._widgetContainer.htmlElement.append(this._handleItem.htmlElement);
    
    if( abacusProperty.range ){
      switch (abacusProperty.range) {
        case 'max':
          this._range.rangeType = 'max';
          break;
      
        default:
          this._range.rangeType = 'min';
          break;
      }
      this._widgetContainer.htmlElement.prepend(this._range.htmlElement);
    }
    else{
      this._range.rangeType = 'hidden';
      this._range.htmlElement.remove();
    }

    // Обновляем положение бегунка и индикатора
    let currentValue: number = abacusProperty.value as number;
    let posHandle: number = this.getPosFromValue(currentValue);
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
    
      default:
        
        break;
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
  }


  /**
   * Функция упаковывает в объект некоторые данные о слайдере и бегунке для обработчиков событий.
   * @private
   * @returns {EventUIData} - Объект класса EventUIData.
   */
  private _getEventUIData(): EventUIData{
    let uiData: EventUIData = {} as EventUIData;
    uiData.handle = this._handleItem.htmlElement;
    uiData.handleIndex = this._handleItem.handleIndex;

    let modelData = this._presenter.getModelAbacusProperty();
    uiData.value = modelData.value as number;
    uiData.values = modelData.values;
    return uiData;
  }


  /**
   * Функция-обертка события "abacus-change". Генерирует событие "abacus-change" и вызывает callback "change".
   * @private
   * @param {Event} event - Объект события. По умолчанию равен объекту события изменения значения слайдера.
   * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков этого события вызвал Event.preventDefault(). В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
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
   * @returns {boolean} - Возвращаемое значение — false, если событие отменяемое и хотя бы один из обработчиков этого события вызвал Event.preventDefault(). В ином случае — true. (Точно также, как у функции EventTarget.dispatchEvent()).
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
}