/**
 * @fileoverview Файл с примерами использования плагина Abacus.
 */
$(() => {
  $('#abacus-1').on('abacus-change', ()=>{
    console.log('abacus-change');
  });

  $('#abacus-1').on('abacus-create', ()=>{
    console.log('abacus-create');
  });

  $('#abacus-1').on('abacus-slide', ()=>{
    console.log('abacus-slide');
  });

  $('#abacus-1').on('abacus-start', ()=>{
    console.log('abacus-start');
  });

  $('#abacus-1').on('abacus-stop', ()=>{
    console.log('abacus-stop');
  });

  const $abacus = $('#abacus-1').abacus({
    min: -10,
    max: 9,
    step: 2,
    value: 0,
    range: true,
    change: (event, ui) =>{
      $('#abacus-1_input').val(ui.value);
    },
    create: (event, ui) =>{
      console.log('create');
      console.log( event );
    },
    slide: (event, ui) =>{
      console.log('slide');
      console.log( ui );
    },
    start: (event, ui) =>{
      console.log('start');
      console.log( ui );
    },
    stop: (event, ui) =>{
      console.log('stop');
      console.log( ui );
    },
  });


  setTimeout(() => {
    // $abacus.abacus('option', {
    //   classes: {
    //     handle: 'qwe'
    //   },
    // } as AbacusOptions);
  }, 5000);


  $('body .abacus').each(function(){
    const $abacusItem = $(this as HTMLAbacusElement);
    const $form = $abacusItem.closest('.card').find('form');
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

  if( abacusProperty.value !== undefined ){
    $('[name="value[]"]:first', $form).val(abacusProperty.value);
  }

  if( abacusProperty.orientation ){
    $('[name="orientation"]', $form).val(abacusProperty.orientation);
  }

  if( abacusProperty.range !== undefined ){
    const stringValRange = abacusProperty.range.toString();
    $('[name="range"]', $form).val(stringValRange);
  }

  if( abacusProperty.step !== undefined ){
    $('[name="step"]', $form).val(abacusProperty.step);
  }
}


function parseFormToProperty($form: JQuery): AbacusOptions{
  const abacusProperty = {} as AbacusOptions;

  if( ! ($form instanceof jQuery) ){
    return abacusProperty;
  }

  if( $('[name="animate"]', $form).length ){
    abacusProperty.animate = $('[name="animate"]', $form).val() as string;
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

  if( $('[name="value[]"]', $form).val() ){
    abacusProperty.value = $('[name="value[]"]', $form).val() as number;
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

  if( $('[name="step"]', $form).length ){
    abacusProperty.step = $('[name="step"]', $form).val() as number;
  }

  return abacusProperty;
}