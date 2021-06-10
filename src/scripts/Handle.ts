class Handle{
	private _htmlElement: HTMLElement;
	private _posLeft: number = 0;
	private _posBottom: number = 0;
	private _handleIndex: number = 0;

	constructor(className?: string, handleIndex?: number){
		this._htmlElement = document.createElement('span');
		this._htmlElement.classList.add(className ? className : 'abacus__handle');

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
	
}

export default Handle;