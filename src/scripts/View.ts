import {Presenter} from './Presenter';
import {WidgetContainer} from './WidgetContainer';
import {Handle} from './Handle';
import {Range} from './Range';

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
   * Объект, в котором содержится ссылка на progress bar.
   * @type {Range}
   * @private
   */
  private _range: Range;

  /**
   * Бегунок
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
    
    let classesAbacus = this._presenter.getModelInitOptions().classes;
    if( classesAbacus ){
      this._widgetContainer = new WidgetContainer(abacusHtmlContainer, classesAbacus.abacus);
      this._range = new Range(classesAbacus.range);
      this._handleItem = new Handle(classesAbacus.handle);
    }
    else{
      this._widgetContainer = new WidgetContainer(abacusHtmlContainer);
      this._range = new Range();
      this._handleItem = new Handle();
    }

    this._widgetContainer.htmlElement.innerHTML = '';
    this._widgetContainer.htmlElement.append(this._range.htmlElement);
    this._widgetContainer.htmlElement.append(this._handleItem.htmlElement);


    // установка callbacks
    // create change
    this._customEventChange = new CustomEvent('abacus-change', {
      bubbles: true,
      cancelable: true,
    });

    if( options?.change ){
      this._widgetContainer.htmlElement.addEventListener('abacus-change', function(event: Event){
        if( typeof options?.change === 'function' ){
          options.change(event, viewInstance.getEventUIData());
        }
      });
    }

    // create event
    this._customEventCreate = new CustomEvent('abacus-create', {
      bubbles: true,
      cancelable: true,
    });

    if( options?.create ){
      this._widgetContainer.htmlElement.addEventListener('abacus-create', function(event: Event){
        if( typeof options?.create === 'function' ){
          options.create(event, viewInstance.getEventUIData());
        }
      });
    }

    // slide event
    this._customEventSlide = new CustomEvent('abacus-slide', {
      bubbles: true,
      cancelable: true,
    });

    if( options?.slide ){
      this._widgetContainer.htmlElement.addEventListener('abacus-slide', function(event: Event){
        if( typeof options?.slide === 'function' ){
          options.slide(event, viewInstance.getEventUIData());
        }
      });
    }
    
    // create start
    this._customEventStart = new CustomEvent('abacus-start', {
      bubbles: true,
      cancelable: true,
    });

    if( options?.start ){
      this._widgetContainer.htmlElement.addEventListener('abacus-start', function(event: Event){
        if( typeof options?.start === 'function' ){
          options.start(event, viewInstance.getEventUIData());
        }
      });
    }

    // create stop
    this._customEventStop = new CustomEvent('abacus-stop', {
      bubbles: true,
      cancelable: true,
    });

    if( options?.stop ){
      this._widgetContainer.htmlElement.addEventListener('abacus-stop', function(event: Event){
        if( typeof options?.stop === 'function' ){
          options.stop(event, viewInstance.getEventUIData());
        }
      });
    }


    this._widgetContainer.htmlElement.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      let left: number = this.getPosLeftPercent(event.clientX);
      let newAbacusValue: number = this.getValFromPosPercent(left);
      this._presenter.setAbacusValue(newAbacusValue);
      newAbacusValue = this._presenter.getModelInitOptions().value as number;
      let percent: number = this.getPosFromValue(newAbacusValue);
      this._handleItem.posLeft = percent;
      this._widgetContainer.htmlElement.dispatchEvent(this._customEventChange);
    });
    //---------------


    let currentValue: number = this._presenter.getModelInitOptions().value as number;
    let startPosHandle: number = this.getPosFromValue(currentValue);
    this._handleItem.posLeft = startPosHandle;


    this._widgetContainer.htmlElement.dispatchEvent(this._customEventCreate);
  }

	
	public get widgetContainer() : WidgetContainer {
		return this._widgetContainer;
	}
	
	
	public get range() : Range {
		return this._range;
	}
	
	
	public get handleItem() : Handle {
		return this._handleItem;
	}
	


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


  getPosPerStep(persent: number): number{
    let result: number = 0;
    let options: AbacusOptions = this._presenter.getModelInitOptions();
    let minVal: number = options.min as number;
    let maxVal: number = options.max as number;
    let step: number = options.step as number;
    let sizeStepPercent: number = (step / (maxVal - minVal)) * 100;
    result = persent / sizeStepPercent;
    result = Math.round(result);
    result = result * sizeStepPercent;
    return result;
  }


  getPosFromValue(value: number): number{
    let result: number = 0;
    let options: AbacusOptions = this._presenter.getModelInitOptions();
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


  getValFromPosPercent(posPercent: number): number{
    let result: number = 0;
    let options: AbacusOptions = this._presenter.getModelInitOptions();
    let minVal: number = options.min as number;
    let maxVal: number = options.max as number;

    // если минимальное значение меньше ноля, то 
    // "сдвигаем" переданное значение (value) и максимальное значение (maxVal) на минимальное значение (minVal) по модулю
    if( minVal < 0 ){
      maxVal += (minVal * -1);
    }

    result = (maxVal * posPercent) / 100;
    result -= (minVal * -1);
    return result;
  }



  private getEventUIData(): EventUIData{
    let uiData: EventUIData = {} as EventUIData;
    uiData.handle = this._handleItem.htmlElement;
    uiData.handleIndex = this._handleItem.handleIndex;

    let modelData = this._presenter.getModelInitOptions();
    uiData.value = modelData.value as number;
    uiData.values = modelData.values;
    return uiData;
  }
}