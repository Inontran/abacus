import Model from './Model';
import Presenter from './Presenter';

class View{
	private model: Model;
	private presenter: Presenter;

	constructor(options?: Object, data?: Object){
		this.model = new Model(options);
		this.presenter = new Presenter(this.model);
	}
}

export default View;