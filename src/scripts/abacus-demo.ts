/**
 * @fileoverview Файл с примерами использования плагина Abacus.
 */
$(() => {
  const $cardList = $('.js-card-list');

  for (let i = 2; i <= 3; i++) {
    const $cloneCard = $('.js-card-list__item:first', $cardList).clone();
    $cardList.append($cloneCard);
    $('.js-card-list__number', $cloneCard).text(i);
  }

  $('.abacus', $cardList).abacus({
    min: -10,
    max: 9,
    step: 2,
    values: [-4, 6],
    range: true,
    scale: true
  });


  $('body').on('abacus-change', '.abacus', (event)=>{
    const $abacusItem = $(event.currentTarget);
    const $form = $abacusItem.closest('.js-card-list__item').find('form');
    if( $form.length && $abacusItem[0].jqueryAbacusInstance ){
      parsePropertyToForm($abacusItem.abacus('option') as AbacusOptions, $form);
    }
  });


  $('.abacus', $cardList).each(function(){
    const $abacusItem = $(this as HTMLAbacusElement);
    const $form = $abacusItem.closest('.js-card-list__item').find('form');
    if( $form.length && $abacusItem[0].jqueryAbacusInstance ){
      parsePropertyToForm($abacusItem.abacus('option') as AbacusOptions, $form);
    }
  });


  $('body').on('submit', '.form_modifier-options', (event: Event) =>{
    event.preventDefault();
    if( ! event.currentTarget ){
      return null;
    }
    const $form = $(event.currentTarget) as JQuery<HTMLElement>;
    const abacusOptions = parseFormToProperty($form);
    const $abacus = $form.closest('.js-card-list__item').find('.abacus');
    $abacus?.abacus('option', abacusOptions);
  });
});



function parsePropertyToForm(abacusProperty: AbacusOptions, $form: JQuery){
  if( abacusProperty.animate !== undefined ){
    const stringValAnimate = abacusProperty.animate.toString();
    $('[name="animate"]', $form).val(stringValAnimate);
  }
  else{
    $('[name="animate"]', $form).val('false');
  }

  $('[name="disabled"]', $form).prop('checked', !abacusProperty.disabled);

  if( abacusProperty.max !== undefined ){
    $('[name="max"]', $form).val(abacusProperty.max);
  }

  if( abacusProperty.min !== undefined ){
    $('[name="min"]', $form).val(abacusProperty.min);
  }

  if( abacusProperty.values ){
    for (let i = 0; i < 2; i++) {
      if( abacusProperty.values[i] !== undefined || abacusProperty.values[i] !== null ){
        $('[name="value[]"]', $form).eq(i).val(abacusProperty.values[i]);
      } 
      else{
        $('[name="value[]"]', $form).eq(i).val('');
      }
    }
  }

  if( abacusProperty.orientation ){
    $('[name="orientation"]', $form).val(abacusProperty.orientation);
  }

  if( abacusProperty.range !== undefined ){
    const stringValRange = abacusProperty.range.toString();
    $('[name="range"]', $form).val(stringValRange);
  }

  $('[name="scale"]', $form).prop('checked', !!abacusProperty.scale);

  $('[name="tooltip"]', $form).prop('checked', !!abacusProperty.tooltip);

  if( abacusProperty.step !== undefined ){
    $('[name="step"]', $form).val(abacusProperty.step);
  }
}


function parseFormToProperty($form: JQuery): AbacusOptions{
  const abacusProperty = {} as AbacusOptions;

  if( ! ($form instanceof jQuery) ){
    return abacusProperty;
  }

  const inputAnimate: JQuery<HTMLInputElement> = $('[name="animate"]', $form);
  if( inputAnimate.length ){
    switch (inputAnimate.val()) {
      case 'false':
        abacusProperty.animate = false;
        break;

      case 'true':
        abacusProperty.animate = true;
        break;

      default:
        abacusProperty.animate = inputAnimate.val() as string;
        break;
    }
  }

  if( $('[name="disabled"]', $form).length ){
    abacusProperty.disabled = ! $('[name="disabled"]', $form).prop('checked');
  }

  if( $('[name="max"]', $form).val() ){
    abacusProperty.max = $('[name="max"]', $form).val() as number;
  }

  if( $('[name="min"]', $form).val() ){
    abacusProperty.min = $('[name="min"]', $form).val() as number;
  }

  abacusProperty.values = [];
  for (let i = 0; i < 2; i++) {
    if( $('[name="value[]"]', $form).eq(i).val() ){
      abacusProperty.values[i] = $('[name="value[]"]', $form).eq(i).val() as number;
    }
  }

  if( $('[name="orientation"]', $form).length ){
    abacusProperty.orientation = $('[name="orientation"]', $form).val() as string;
  }

  if( $('[name="range"]', $form).length ){
    const valRange = $('[name="range"]', $form).val() as string;
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

  if( $('[name="scale"]', $form).length ){
    abacusProperty.scale = !! $('[name="scale"]', $form).prop('checked');
  }

  if( $('[name="tooltip"]', $form).length ){
    abacusProperty.tooltip = !! $('[name="tooltip"]', $form).prop('checked');
  }

  if( $('[name="step"]', $form).length ){
    abacusProperty.step = $('[name="step"]', $form).val() as number;
  }

  return abacusProperty;
}










// let a: number | undefined = Math.random();
// if( a < 0.5 ){
//   a = undefined;
// }
// let b = 0;
// const isNotEmpty = (a: number | undefined): a is number => a !== undefined;
// if(isNotEmpty(a)){
// // if( a !== undefined ){
//   b += a;
// }