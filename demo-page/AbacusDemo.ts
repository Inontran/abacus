import View from '../src/scripts/mvp/View/View';

import './demo-page.scss';

class AbacusDemo {
  private _$abacusSliderWrapper!: JQuery<HTMLElement>;

  private _abacusSlider!: View | null;

  private _$form!: JQuery<HTMLFormElement>;

  private _formInputs: Map<string, JQuery<HTMLElement>> = new Map();

  constructor($abacusSliderWrapper: JQuery<HTMLElement>, sliderConfig: AbacusOptions) {
    this._init($abacusSliderWrapper, sliderConfig);
  }

  private _init($abacusSliderWrapper: JQuery<HTMLElement>, sliderConfig: AbacusOptions) {
    this._$abacusSliderWrapper = $abacusSliderWrapper;

    this._initAbacus(sliderConfig);

    if (this._abacusSlider) {
      this._searchDOMElements();
      this._updateFormInputs(this._abacusSlider.getProperties());
      this._bindEventListeners();
      this._addEventListeners();
    }
  }

  private _initAbacus(config: AbacusOptions) {
    this._$abacusSliderWrapper.abacus(config);
    this._abacusSlider = this._$abacusSliderWrapper.data('abacus');
  }

  private _searchDOMElements() {
    this._$form = this._$abacusSliderWrapper.closest('.js-form') as JQuery<HTMLFormElement>;
    const abacusDemoInstance = this;

    $('input, select', this._$form).each(function () {
      const $input = $(this);
      const inputName = $input.attr('name');
      if (inputName) {
        abacusDemoInstance._formInputs.set(inputName, $input);
      }
    });
  }

  private _bindEventListeners() {
    this._handleAbacusChange = this._handleAbacusChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  private _addEventListeners() {
    this._$abacusSliderWrapper.on('abacus-change', this._handleAbacusChange);
    this._$form.on('submit', this._handleFormSubmit);
  }

  private _handleFormSubmit(event: Event) {
    event.preventDefault();
    const $doDestroyAbacus = this._formInputs.get('destroy')?.prop('checked') === false;

    if ($doDestroyAbacus) {
      this._abacusSlider?.destroy();
      this._abacusSlider = null;
    } else {
      const newSliderConfig = this._parseFormInAbacusOptions();

      if (this._abacusSlider) {
        this._abacusSlider.setProperties(newSliderConfig);
      } else {
        this._initAbacus(newSliderConfig);
      }
    }

    return;
  }

  private _handleAbacusChange() {
    if (this._abacusSlider) {
      this._updateFormInputs(this._abacusSlider.getProperties());
    }
  }

  private _updateFormInputs(abacusProperties: AbacusProperties) {
    this._formInputs.get('animate')?.val(abacusProperties.animate.toString());

    this._formInputs.get('disabled')?.prop('checked', !abacusProperties.isDisabled);

    this._formInputs.get('max')?.val(abacusProperties.max);

    this._formInputs.get('min')?.val(abacusProperties.min);

    this._formInputs.get('value-first')?.val(abacusProperties.values[0]);

    if (typeof abacusProperties.values[1] === 'number') {
      this._formInputs.get('value-second')?.val(abacusProperties.values[1]);
    } else {
      this._formInputs.get('value-second')?.val('');
    }

    this._formInputs.get('orientation')?.val(abacusProperties.orientation);

    this._formInputs.get('range')?.val(abacusProperties.range.toString());

    this._formInputs.get('scale')?.prop('checked', !!abacusProperties.hasMarks);

    this._formInputs.get('tooltip')?.prop('checked', !!abacusProperties.hasTooltip);

    this._formInputs.get('step')?.val(abacusProperties.step);
  }

  private _parseFormInAbacusOptions(): AbacusOptions {
    const abacusProperties: AbacusOptions = {};

    const inputAnimateValue = this._formInputs.get('animate')?.val();
    switch (inputAnimateValue) {
      case 'false':
        abacusProperties.animate = false;
        break;

      case 'true':
        abacusProperties.animate = true;
        break;

      default:
        abacusProperties.animate = inputAnimateValue as string;
        break;
    }

    const $inputDisabled = this._formInputs.get('disabled');
    if ($inputDisabled) {
      abacusProperties.isDisabled = !$inputDisabled.prop('checked');
    }

    const $inputMax = this._formInputs.get('max');
    if ($inputMax) {
      abacusProperties.max = parseFloat($inputMax.val() as string);
    }

    const $inputMin = this._formInputs.get('min');
    if ($inputMin) {
      abacusProperties.min = parseFloat($inputMin.val() as string);
    }

    abacusProperties.values = [];
    const inputValueFirst = this._formInputs.get('value-first')?.val();
    if (inputValueFirst) {
      abacusProperties.values[0] = parseFloat(inputValueFirst as string);
    }
    const inputValueSecond = this._formInputs.get('value-second')?.val();
    if (inputValueSecond) {
      abacusProperties.values[1] = parseFloat(inputValueSecond as string);
    }

    const $inputOrientation = this._formInputs.get('orientation');
    if ($inputOrientation) {
      abacusProperties.orientation = $inputOrientation.val() as string;
    }

    const inputRangeValue = this._formInputs.get('range')?.val();
    switch (inputRangeValue) {
      case 'true':
        abacusProperties.range = true;
        break;

      case 'false':
        abacusProperties.range = false;
        break;

      case 'max':
        abacusProperties.range = 'max';
        break;

      case 'min':
        abacusProperties.range = 'min';
        break;
    }

    const $inputScale = this._formInputs.get('scale');
    if ($inputScale) {
      abacusProperties.hasMarks = !!$inputScale.prop('checked');
    }

    const $inputTooltip = this._formInputs.get('tooltip');
    if ($inputTooltip) {
      abacusProperties.hasTooltip = !!$inputTooltip.prop('checked');
    }

    const $inputStep = this._formInputs.get('step');
    if ($inputStep) {
      abacusProperties.step = parseFloat($inputStep.val() as string);
    }

    return abacusProperties;
  }
}

export default AbacusDemo;
