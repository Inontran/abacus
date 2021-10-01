import $ from 'jquery';
import './demo-page.scss';
import '../src/abacus';

class AbacusDemo {
  private _$abacusSlider!: JQuery<HTMLAbacusElement>;
  private _$form!: JQuery<HTMLFormElement>;
  private _formInputs = new Map();

  constructor($abacusSlider: JQuery) {
    this._init($abacusSlider);
  }

  private _init($abacusSlider: JQuery) {
    this._$abacusSlider = $abacusSlider as JQuery<HTMLAbacusElement>;
    this._$form = this._$abacusSlider.closest('.js-form') as JQuery<HTMLFormElement>;
    this._searchFormInputs();

    this._handleAbacusChange = this._handleAbacusChange.bind(this);
    this._handleFormOptionsSubmit = this._handleFormOptionsSubmit.bind(this);

    this._initAbacus();
    this._handleAbacusChange();
    this._bindEventListeners();
  }

  private _initAbacus() {
    this._$abacusSlider.abacus({
      min: -10,
      max: 9,
      step: 2,
      values: [-4, 6],
      range: true,
      scale: true,
    });
  }

  private _searchFormInputs() {
    const abacusDemoInstance = this;
    $('input, select', this._$form).each(function () {
      const $input = $(this);
      const inputName = $input.attr('name');
      if (inputName){
        abacusDemoInstance._formInputs.set(inputName, $input);
      }
    });
  }

  private _bindEventListeners() {
    this._$abacusSlider.on('abacus-change', this._handleAbacusChange);
    this._$form.on('submit', this._handleFormOptionsSubmit);
  }

  private _handleFormOptionsSubmit(event: Event) {
    event.preventDefault();
    if (!event.currentTarget) {
      return null;
    }

    if (!this._$abacusSlider?.length) {
      return null;
    }

    const $destroySwitch = this._formInputs.get('destroy');

    if ($destroySwitch.length && $destroySwitch.prop('checked') === false) {
      this._$abacusSlider.abacus('destroy');
    } else {
      const abacusOptions = this.parseFormToProperty();

      if (!this._$abacusSlider[0].jqueryAbacusInstance) {
        this._$abacusSlider?.abacus(abacusOptions);
      } else {
        this._$abacusSlider?.abacus('option', abacusOptions);
      }
    }

    return null;
  }

  private _handleAbacusChange() {
    if (this._$form.length && this._$abacusSlider[0].jqueryAbacusInstance) {
      this._parsePropertyToForm(this._$abacusSlider.abacus('option') as AbacusOptions);
    }
  }

  private _parsePropertyToForm(abacusProperty: AbacusOptions) {
    const $inputAnimate = this._formInputs.get('animate');
    if (abacusProperty.animate !== undefined) {
      const stringValAnimate = abacusProperty.animate.toString();
      $inputAnimate.val(stringValAnimate);
    } else {
      $inputAnimate.val('false');
    }

    this._formInputs.get('disabled').prop('checked', !abacusProperty.disabled);

    if (abacusProperty.max !== undefined) {
      this._formInputs.get('max').val(abacusProperty.max);
    }

    if (abacusProperty.min !== undefined) {
      this._formInputs.get('min').val(abacusProperty.min);
    }

    if (abacusProperty.values) {
      if (abacusProperty.values[0] !== undefined || abacusProperty.values[0] !== null) {
        this._formInputs.get('value-first').val(abacusProperty.values[0]);
      } else {
        this._formInputs.get('value-first').val('');
      }
      if (abacusProperty.values[1] !== undefined || abacusProperty.values[1] !== null) {
        this._formInputs.get('value-second').val(abacusProperty.values[1]);
      } else {
        this._formInputs.get('value-second').val('');
      }
    }

    if (abacusProperty.orientation) {
      this._formInputs.get('orientation').val(abacusProperty.orientation);
    }

    if (abacusProperty.range !== undefined) {
      const stringValRange = abacusProperty.range.toString();
      this._formInputs.get('range').val(stringValRange);
    }

    this._formInputs.get('scale').prop('checked', !!abacusProperty.scale);

    this._formInputs.get('tooltip').prop('checked', !!abacusProperty.tooltip);

    if (abacusProperty.step !== undefined) {
      this._formInputs.get('step').val(abacusProperty.step);
    }
  }

  parseFormToProperty(): AbacusOptions {
    const abacusProperty = {} as AbacusOptions;

    const $inputAnimate = this._formInputs.get('animate');
    if ($inputAnimate.length) {
      switch ($inputAnimate.val()) {
        case 'false':
          abacusProperty.animate = false;
          break;

        case 'true':
          abacusProperty.animate = true;
          break;

        default:
          abacusProperty.animate = $inputAnimate.val() as string;
          break;
      }
    }

    const $inputDisabled = this._formInputs.get('disabled');
    if ($inputDisabled.length) {
      abacusProperty.disabled = !$inputDisabled.prop('checked');
    }

    const $inputMax = this._formInputs.get('max');
    if ($inputMax.val()) {
      abacusProperty.max = parseFloat($inputMax.val() as string);
    }

    const $inputMin = this._formInputs.get('min');
    if ($inputMin.val()) {
      abacusProperty.min = parseFloat($inputMin.val() as string);
    }

    abacusProperty.values = [];
    const $inputValueFirst = this._formInputs.get('value-first');
    if ($inputValueFirst.val()) {
      abacusProperty.values[0] = parseFloat($inputValueFirst.val() as string);
    }
    const $inputValueSecond = this._formInputs.get('value-second');
    if ($inputValueSecond.val()) {
      abacusProperty.values[1] = parseFloat($inputValueSecond.val() as string);
    }

    const $inputOrientation = this._formInputs.get('orientation');
    if ($inputOrientation.length) {
      abacusProperty.orientation = $inputOrientation.val() as string;
    }

    const $inputRange = this._formInputs.get('range');
    if ($inputRange.length) {
      const valRange = $inputRange.val() as string;
      switch (valRange) {
        case 'true':
          abacusProperty.range = true;
          break;

        case 'false':
          abacusProperty.range = false;
          break;

        case 'max':
          abacusProperty.range = 'max';
          break;

        case 'min':
          abacusProperty.range = 'min';
          break;

        default:
          abacusProperty.range = valRange;
          break;
      }
    }

    const $inputScale = this._formInputs.get('scale');
    if ($inputScale.length) {
      abacusProperty.scale = !!$inputScale.prop('checked');
    }

    const $inputTooltip = this._formInputs.get('tooltip');
    if ($inputTooltip.length) {
      abacusProperty.tooltip = !!$inputTooltip.prop('checked');
    }

    const $inputStep = this._formInputs.get('step');
    if ($inputStep.length) {
      abacusProperty.step = parseFloat($inputStep.val() as string);
    }

    return abacusProperty;
  }
}

export default AbacusDemo;