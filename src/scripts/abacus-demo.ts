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

  $abacus.abacus('option', 'orientation', 'eee');
  $abacus.abacus('option', {
    animate: 'eee',
  } as AbacusOptions);

  console.log( $abacus.abacus('option') );


  setTimeout(() => {
    // $abacus.abacus('option', {
    //   classes: {
    //     handle: 'qwe'
    //   },
    // } as AbacusOptions);
  }, 5000);
});