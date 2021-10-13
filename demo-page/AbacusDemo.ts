import './demo-page.scss';

class AbacusDemo {
  private _$abacusSliderWrapper!: JQuery<HTMLElement>;

  private _$abacusSlider!: JQuery<HTMLAbacusElement>;

  private _$form!: JQuery<HTMLFormElement>;

  private _formInputs: Map<string, JQuery<HTMLElement>> = new Map();

  private _sliderConfig!: AbacusOptions;

  constructor($abacusSliderWrapper: JQuery<HTMLElement>, sliderConfig: AbacusOptions) {
    this._init($abacusSliderWrapper, sliderConfig);
  }

  private _init($abacusSliderWrapper: JQuery<HTMLElement>, sliderConfig: AbacusOptions) {
    this._sliderConfig = sliderConfig;
    this._$abacusSliderWrapper = $abacusSliderWrapper;

    this._initAbacus();
    this._searchDOMElements();
    this._updateFormInputs(this._$abacusSlider.abacus('getProperties'));
    this._bindEventListeners();
    this._addEventListeners();
  }

  private _initAbacus() {
    this._$abacusSliderWrapper.abacus(this._sliderConfig);
    this._$abacusSlider = $('.js-abacus', this._$abacusSliderWrapper).abacus('getWidget');
  }

  private _searchDOMElements() {
    this._$form = this._$abacusSlider.closest('.js-form') as JQuery<HTMLFormElement>;
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
    const $destroySwitch = this._formInputs.get('destroy');

    if ($destroySwitch?.prop('checked') === false) {
      this._$abacusSlider.abacus('destroy');
    } else {
      const abacusOptions = this.parseFormToProperties();

      if (!this._$abacusSlider[0].jqueryAbacusInstance) {
        this._$abacusSliderWrapper.abacus(abacusOptions);
        this._$abacusSlider = $('.js-abacus', this._$abacusSliderWrapper).abacus('getWidget');
      } else {
        this._$abacusSlider.abacus('setProperties', abacusOptions);
      }
    }

    return null;
  }

  private _handleAbacusChange() {
    if (this._$abacusSlider[0].jqueryAbacusInstance) {
      this._updateFormInputs(this._$abacusSlider.abacus('getProperties'));
    }
  }

  private _updateFormInputs(abacusProperties: AbacusProperties) {
    this._formInputs.get('animate')?.val(abacusProperties.animate.toString());

    this._formInputs.get('disabled')?.prop('checked', !abacusProperties.disabled);

    this._formInputs.get('max')?.val(abacusProperties.max);

    this._formInputs.get('min')?.val(abacusProperties.min);

    this._formInputs.get('value-first')?.val(abacusProperties.values[0]);

    if (abacusProperties.values[1] !== undefined || abacusProperties.values[1] !== null) {
      this._formInputs.get('value-second')?.val(abacusProperties.values[1]);
    } else {
      this._formInputs.get('value-second')?.val('');
    }

    this._formInputs.get('orientation')?.val(abacusProperties.orientation);

    this._formInputs.get('range')?.val(abacusProperties.range.toString());

    this._formInputs.get('scale')?.prop('checked', !!abacusProperties.scale);

    this._formInputs.get('tooltip')?.prop('checked', !!abacusProperties.tooltip);

    this._formInputs.get('step')?.val(abacusProperties.step);
  }

  parseFormToProperties(): AbacusOptions {
    const abacusProperties: AbacusOptions = {};

    const $inputAnimate = this._formInputs.get('animate');
    if ($inputAnimate) {
      switch ($inputAnimate.val()) {
        case 'false':
          abacusProperties.animate = false;
          break;

        case 'true':
          abacusProperties.animate = true;
          break;

        default:
          abacusProperties.animate = $inputAnimate.val() as string;
          break;
      }
    }

    const $inputDisabled = this._formInputs.get('disabled');
    if ($inputDisabled) {
      abacusProperties.disabled = !$inputDisabled.prop('checked');
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
    const $inputValueFirst = this._formInputs.get('value-first');
    if ($inputValueFirst?.val()) {
      abacusProperties.values[0] = parseFloat($inputValueFirst.val() as string);
    }
    const $inputValueSecond = this._formInputs.get('value-second');
    if ($inputValueSecond?.val()) {
      abacusProperties.values[1] = parseFloat($inputValueSecond.val() as string);
    }

    const $inputOrientation = this._formInputs.get('orientation');
    if ($inputOrientation) {
      abacusProperties.orientation = $inputOrientation.val() as string;
    }

    const $inputRange = this._formInputs.get('range');
    if ($inputRange) {
      const valRange = $inputRange.val() as string;
      switch (valRange) {
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

        default:
          abacusProperties.range = valRange;
          break;
      }
    }

    const $inputScale = this._formInputs.get('scale');
    if ($inputScale) {
      abacusProperties.scale = !!$inputScale.prop('checked');
    }

    const $inputTooltip = this._formInputs.get('tooltip');
    if ($inputTooltip) {
      abacusProperties.tooltip = !!$inputTooltip.prop('checked');
    }

    const $inputStep = this._formInputs.get('step');
    if ($inputStep) {
      abacusProperties.step = parseFloat($inputStep.val() as string);
    }

    return abacusProperties;
  }
}

export default AbacusDemo;
