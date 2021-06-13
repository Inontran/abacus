export class Range{
  private _htmlElement: HTMLElement;
  private _width: number = 100;

  constructor(className?: string){
    this._htmlElement = document.createElement('span');
    this._htmlElement.classList.add(className ? className : 'abacus__range');
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

}