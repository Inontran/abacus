/**
 * @fileoverview Файл с примерами использования плагина Abacus.
 */
$(() => {
  $('body').on('submit', '.form_modifier-options', function(event: Event){
    event.preventDefault();
    if( ! event.currentTarget ){
      return null;
    }
    let $form = $(event.currentTarget);
    let abacusOptions = {} as AbacusOptions;
    
    if( $('[name="animate"]', $form).length ){
      abacusOptions.animate = $('[name="animate"]', $form).val() as string;
    }
    
    if( $('[name="disabled"]', $form).length ){
      abacusOptions.disabled = ! $('[name="disabled"]', $form).prop('checked');
    }

    if( $('[name="max"]', $form).val() ){
      abacusOptions.max = $('[name="max"]', $form).val() as number;
    }

    if( $('[name="min"]', $form).val() ){
      abacusOptions.min = $('[name="min"]', $form).val() as number;
    }

    if( $('[name="value[]"]', $form).val() ){
      abacusOptions.value = $('[name="value[]"]', $form).val() as number;
    }

    if( $('[name="orientation"]', $form).length ){
      abacusOptions.orientation = $('[name="orientation"]', $form).val() as string;
    }

    if( $('[name="range"]', $form).length ){
      let valRange = $('[name="range"]', $form).val() as string;
      switch (valRange) {
        case 'true':
          abacusOptions.range = true;
          break;

        case 'false':
          abacusOptions.range = false;
          break;

        case 'max':
          abacusOptions.range = 'max';
          break;

        case 'min':
          abacusOptions.range = 'min';
          break;
      
        default:
          abacusOptions.range = valRange;
          break;
      }
    }

    if( $('[name="step"]', $form).length ){
      abacusOptions.step = $('[name="step"]', $form).val() as number;
    }

    // console.log(abacusOptions);
    $abacus.abacus('option', abacusOptions);
  });


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

  let $abacus = $('#abacus-1').abacus({
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

  console.log( $abacus.abacus('option') );


  setTimeout(() => {
    // $abacus.abacus('option', {
    //   classes: {
    //     handle: 'qwe'
    //   },
    // } as AbacusOptions);
  }, 5000);
});