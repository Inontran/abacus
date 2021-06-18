export class Range{
  private _htmlElement: HTMLElement;
  private _width: number = 100;
	private _className: string;

  constructor(className?: string){
    this._htmlElement = document.createElement('span');
		this._className = className ? className : 'abacus__range';
    this._htmlElement.classList.add(this._className);
  }


  public get width() : number {
    return this._width;
  }

  public set width(width : number) {
    this._width = width;
  }


  public get htmlElement() : HTMLElement {
    return this._htmlElement;
  }


	public get className() : string {
		return this._className;
	}
	
	
	public set className(value : string) {
		this._htmlElement.classList.remove(this._className);
		this._htmlElement.classList.add(value);
		this._className = value;
	}

}