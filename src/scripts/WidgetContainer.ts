class WidgetContainer{
	private _htmlElement: HTMLAbacusElement;
	private _width: number = 100;

	constructor(htmlElement: HTMLAbacusElement, className?: string){
		this._htmlElement = htmlElement;
		this._htmlElement.classList.add(className ? className : 'abacus');
	}

	
	public get width() : number {
		return this._width;
	}

	public set width(width : number) {
		this._width = width;
	}
	

	public get htmlElement() : HTMLAbacusElement {
		return this._htmlElement;
	}
	
}

export default WidgetContainer;