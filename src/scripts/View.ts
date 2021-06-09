import Presenter from './Presenter';
import WidgetContainer from './WidgetContainer';
import Handle from './Handle';
import Range from './Range';

class View{
	private _presenter: Presenter;
	private _widgetContainer: WidgetContainer;
	private _rangeItem: Range;
	private _handleItem: Handle;

	constructor(abacusHtmlContainer: HTMLAbacusElement, options?: object, data?: object){
		this._presenter = new Presenter(options);
		
		let classesAbacus = this._presenter.getModelInitOptions().classes;
		if( classesAbacus ){
			this._widgetContainer = new WidgetContainer(abacusHtmlContainer, classesAbacus.abacus);
			this._rangeItem = new Range(classesAbacus.range);
			this._handleItem = new Handle(classesAbacus.handle);
		}
		else{
			this._widgetContainer = new WidgetContainer(abacusHtmlContainer);
			this._rangeItem = new Range();
			this._handleItem = new Handle();
		}

		this._widgetContainer.htmlElement.innerHTML = '';
		this._widgetContainer.htmlElement.append(this._rangeItem.htmlElement);
		this._widgetContainer.htmlElement.append(this._handleItem.htmlElement);

		this._widgetContainer.htmlElement.addEventListener('click', (event: MouseEvent) => {
			event.preventDefault();
			let left = this.getPosLeftPercent(event.clientX);
			this._handleItem.posLeft = left;
		});
	}


	getPosLeftPercent(clientX: number): number{
		let result = 0;
		let offsetLeftWidget = this._widgetContainer.htmlElement.offsetLeft;
		let widthWidget = this._widgetContainer.htmlElement.offsetWidth;
		let leftPx = clientX - offsetLeftWidget;
		result = (leftPx / widthWidget) * 100;
		if( result < 0 ){
			result = 0;
		}
		if( result > 100 ){
			result = 100;
		}
		return result;
	}
}

export default View;