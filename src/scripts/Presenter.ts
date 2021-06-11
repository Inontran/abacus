import Model from './Model';

class Presenter{
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

export default Presenter;