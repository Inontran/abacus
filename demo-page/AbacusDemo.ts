import './demo-page.scss';

class AbacusDemo {
  private _$abacusSlider: JQuery<HTMLAbacusElement>;
  private _$form: JQuery<HTMLFormElement>;

  constructor($abacusSlider: JQuery) {
    this._$abacusSlider = $abacusSlider.eq(0) as JQuery<HTMLAbacusElement>;

    this._$abacusSlider.abacus({
      min: -10,
      max: 9,
      step: 2,
      values: [-4, 6],
      range: true,
      scale: true,
    });

    this._$form = this._$abacusSlider.closest('.js-card-list__item').find('form');
    this._handleAbacusChange();
    
    this._bindEventListeners();
  }


  private _bindEventListeners() {
    const $body = $('body');
    this._handleAbacusChange = this._handleAbacusChange.bind(this);
    $body.on('abacus-change', '.js-card-list .js-abacus', this._handleAbacusChange);

    this._handleFormOptionsSubmit = this._handleFormOptionsSubmit.bind(this);
    $body.on('submit', '.js-form_options-modifier', this._handleFormOptionsSubmit);
  }


  private _handleFormOptionsSubmit(event: Event) {
    event.preventDefault();
    if (!event.currentTarget) {
      return null;
    }
  
    if (!this._$abacusSlider?.length) {
      return null;
    }
  
    const $destroySwitch = $('[name="destroy"]', this._$form);
  
    if ($destroySwitch.length && $destroySwitch.prop('checked') === false) {
      this._$abacusSlider.abacus('destroy');
    } else {
      const abacusOptions = this.parseFormToProperty(this._$form);
  
      if (!this._$abacusSlider[0].jqueryAbacusInstance) {
        this._$abacusSlider?.abacus(abacusOptions);
      } else {
        this._$abacusSlider?.abacus('option', abacusOptions);
      }
    }
  
    return null;
  }

  private _handleAbacusChange(event?: Event) {
    if (this._$form.length && this._$abacusSlider[0].jqueryAbacusInstance) {
      this._parsePropertyToForm(this._$abacusSlider.abacus('option') as AbacusOptions, this._$form);
    }
  }


  private _parsePropertyToForm(abacusProperty: AbacusOptions, $form: JQuery) {
    const $inputAnimate = $('[name="animate"]', $form);
    if (abacusProperty.animate !== undefined) {
      const stringValAnimate = abacusProperty.animate.toString();
      $inputAnimate.val(stringValAnimate);
    } else {
      $inputAnimate.val('false');
    }
  
    $('[name="disabled"]', $form).prop('checked', !abacusProperty.disabled);
  
    if (abacusProperty.max !== undefined) {
      $('[name="max"]', $form).val(abacusProperty.max);
    }
  
    if (abacusProperty.min !== undefined) {
      $('[name="min"]', $form).val(abacusProperty.min);
    }
  
    if (abacusProperty.values) {
      for (let i = 0; i < 2; i += 1) {
        const $inputValue = $('[name="value[]"]', $form).eq(i);
        if (abacusProperty.values[i] !== undefined || abacusProperty.values[i] !== null) {
          $inputValue.val(abacusProperty.values[i]);
        } else {
          $inputValue.val('');
        }
      }
    }
  
    if (abacusProperty.orientation) {
      $('[name="orientation"]', $form).val(abacusProperty.orientation);
    }
  
    if (abacusProperty.range !== undefined) {
      const stringValRange = abacusProperty.range.toString();
      $('[name="range"]', $form).val(stringValRange);
    }
  
    $('[name="scale"]', $form).prop('checked', !!abacusProperty.scale);
  
    $('[name="tooltip"]', $form).prop('checked', !!abacusProperty.tooltip);
  
    if (abacusProperty.step !== undefined) {
      $('[name="step"]', $form).val(abacusProperty.step);
    }
  }


  parseFormToProperty($form: JQuery): AbacusOptions {
    const abacusProperty = {} as AbacusOptions;
  
    if (!($form instanceof jQuery)) {
      return abacusProperty;
    }
  
    const $inputAnimate = $('[name="animate"]', $form);
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
  
    const $inputDisabled = $('[name="disabled"]', $form);
    if ($inputDisabled.length) {
      abacusProperty.disabled = !$inputDisabled.prop('checked');
    }
  
    const $inputMax = $('[name="max"]', $form);
    if ($inputMax.val()) {
      abacusProperty.max = parseFloat($inputMax.val() as string);
    }
  
    const $inputMin = $('[name="min"]', $form);
    if ($inputMin.val()) {
      abacusProperty.min = parseFloat($inputMin.val() as string);
    }
  
    abacusProperty.values = [];
    for (let i = 0; i < 2; i += 1) {
      const $inputValue = $('[name="value[]"]', $form).eq(i);
      if ($inputValue.val()) {
        abacusProperty.values[i] = parseFloat($inputValue.val() as string);
      }
    }
  
    const $inputOrientation = $('[name="orientation"]', $form);
    if ($inputOrientation.length) {
      abacusProperty.orientation = $inputOrientation.val() as string;
    }
  
    const $inputRange = $('[name="range"]', $form);
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
  
    const $inputScale = $('[name="scale"]', $form);
    if ($inputScale.length) {
      abacusProperty.scale = !!$inputScale.prop('checked');
    }
  
    const $inputTooltip = $('[name="tooltip"]', $form);
    if ($inputTooltip.length) {
      abacusProperty.tooltip = !!$inputTooltip.prop('checked');
    }
  
    const $inputStep = $('[name="step"]', $form);
    if ($inputStep.length) {
      abacusProperty.step = parseFloat($inputStep.val() as string);
    }
  
    return abacusProperty;
  }
}


$(() => {
  const $cardList = $('.js-card-list');

  for (let i = 2; i <= 3; i += 1) {
    const $cloneCard = $('.js-card-list__item:first', $cardList).clone();
    $cardList.append($cloneCard);
    $('.js-card-list__number', $cloneCard).text(i);
  }

  $('.js-abacus', $cardList).each(function(){
    const $abacusItem = $(this);
    new AbacusDemo($abacusItem);
  });
});
