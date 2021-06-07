class Model{
	private initOptions: AbacusOptions = {
		animate: true,
		classes: {
			'abacus': 'abacus',
			'handle': 'abacus__handle',
			'range': 'abacus__range'
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


	constructor(data?: Object){
		if( data ){
			this.initOptions = $.extend({}, this.initOptions, data);
		}
	}
}

export default Model;