export class Handle{
  private _htmlElement: HTMLElement;
  private _posLeft: number = 0;
  private _posBottom: number = 0;
  private _handleIndex: number = 0;
	private _className: string;

  constructor(className?: string, handleIndex?: number){
    this._htmlElement = document.createElement('span');
		this._className = className ? className : 'abacus__handle';
    this._htmlElement.classList.add(this._className);

    if( handleIndex != null ){
      this._handleIndex = handleIndex;
    }
  }


  public get posLeft() : number {
    return this._posLeft;
  }

  public set posLeft(left : number) {
    this._posLeft = left;
    this._htmlElement.style.left = left + '%';
  }


  public get htmlElement() : HTMLElement {
    return this._htmlElement;
  }



  public get handleIndex() : number {
    return this._handleIndex;
  }

  public set handleIndex(v : number) {
    this._handleIndex = v;
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