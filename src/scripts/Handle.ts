class Handle{
	private _htmlElement: HTMLElement;
	private _posLeft: number = 0;
	private _posBottom: number = 0;

	constructor(className?: string){
		this._htmlElement = document.createElement('span');
		this._htmlElement.classList.add(className ? className : 'abacus__handle');
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
	
}

export default Handle;