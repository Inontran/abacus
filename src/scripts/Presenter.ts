import {Model} from './Model';

export class Presenter{
  private _model: Model;

  constructor(options?: object){
    this._model = new Model(options);
  }

  getModelInitOptions(): AbacusOptions{
    return this._model.initOptions;
  }

  setAbacusValue(value: number): void{
    this._model.value = value;
  }
}