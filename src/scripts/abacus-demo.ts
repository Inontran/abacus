$(() => {
  let $abacus = $('#abacus-1').abacus({
    min: 0,
    max: 10,
    step: 2,
    value: 3,
  });

  console.log( $abacus );
})