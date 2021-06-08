import Model from './Model';

class Presenter{
	private _model: Model;

	constructor(options?: object){
		this._model = new Model(options);
	}

	getModelInitOptions(): AbacusOptions{
		return this._model.initOptions;
	}
}

export default Presenter;