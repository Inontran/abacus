/**
 * @fileoverview
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
    min: 0,
    max: 10,
    step: 2,
    value: 3,
    change: (event, ui) =>{
      console.log('change');
      console.log( ui );
    },
    create: (event, ui) =>{
      console.log('create');
      console.log( ui );
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

  console.log( $abacus );
})