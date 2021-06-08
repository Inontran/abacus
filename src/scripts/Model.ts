class Model{
	private _initOptions: AbacusOptions = {
		animate: true,
		classes: {
			abacus: 'abacus',
			handle: 'abacus__handle',
			range: 'abacus__range'
		},
		disabled: false,
		max: 100,
		min: 0,
		orientation: 'horizontal',
		range: false,
		step: 1,
		value: 0,
		values: null,
	}


	constructor(data?: object){
		if( data ){
			this._initOptions = $.extend({}, this._initOptions, data);
		}
	}

	
	public get initOptions() : AbacusOptions {
		return this._initOptions;
	}
	
}

export default Model;