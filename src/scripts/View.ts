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

		this._widgetContainer.htmlElement.addEventListener('mousedown', (event: Event) => {
			event.preventDefault();
			console.log(event);
			// let left = (event.layerX / this._widgetContainer.htmlElement.offsetWidth) * 100;
			// this._handleItem.posLeft = left;
		});
	}
}

export default View;