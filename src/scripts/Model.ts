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


	constructor(data?: AbacusOptions){
		if( data ){
			this._initOptions = $.extend({}, this._initOptions, data);
		}

		this._initOptions.value = this._initOptions.value ? this._initOptions.value : 0;
		this._initOptions.value = this.roundValuePerStep( this._initOptions.value );
		this._initOptions.max = this._initOptions.max ? this._initOptions.max : 100;
		this._initOptions.min = this._initOptions.min ? this._initOptions.min : 0;

		if( this._initOptions.max < this._initOptions.min ){
			let tmpMax = this._initOptions.max;
			this._initOptions.max = this._initOptions.min;
			this._initOptions.min = tmpMax;
		}
	}

	
	public get initOptions() : AbacusOptions {
		return this._initOptions;
	}
	
	
	public set value(v : number) {
		this._initOptions.value = this.roundValuePerStep(v);
	}


	roundValuePerStep(value: number): number{
		let result: number = value;
		let minVal: number = this._initOptions.min as number;
		let maxVal: number = this._initOptions.max as number;
		let step: number = this._initOptions.step as number;

		if( value >= maxVal ){
			return maxVal;
		}
		if( value <= minVal ){
			return minVal;
		}

		for (let valByStep = minVal; valByStep < maxVal; valByStep += step){
			if( value > valByStep && value < valByStep + step ){
				if( valByStep + step > maxVal ){
					result = maxVal;
					break;
				}
				
				let prevVal: number = valByStep;
				let	positivePrevVal: number = prevVal < 0 ? prevVal * -1 : prevVal;// берем предыдущее значение по модулю
				let nextVal: number = valByStep + step;
				let	positiveNextVal: number = nextVal < 0 ? nextVal * -1 : nextVal;// берем следующее значение по модулю
				let positiveValue: number = value < 0 ? value * -1 : value;// берем переданное значение по модулю

				let deltaPrevValue: number;
				let deltaNextValue: number;

				if( value < 0 ){
					deltaPrevValue = positivePrevVal - positiveValue;
					deltaNextValue = positiveValue - positiveNextVal;
				}
				else{
					deltaPrevValue = positiveValue - positivePrevVal;
					deltaNextValue = positiveNextVal - positiveValue;
				}

				if( deltaPrevValue < deltaNextValue ){
					result = prevVal;
				} else{
					result = nextVal;
				}
				break;
			}
		}
		
		return result;
	}
	
}

export default Model;