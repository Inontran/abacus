import AbacusDemo from './AbacusDemo';

$(() => {
  const $sliders = $('.js-sliders');
  const SLIDER_CONFIGS: Array<AbacusOptions> = [
    {
      min: -10,
      max: 9,
      step: 2,
      values: [-4, 6],
      range: true,
      scale: true,
      tooltip: true,
    },
    {
      animate: 'fast',
      max: 1000,
      step: 0.5,
      value: 500,
      range: 'max',
    },
    {
      min: 10,
      max: 100,
      step: 1,
      range: 'min',
      orientation: 'vertical',
      scale: true,
    },
  ];

  for (let i = 2; i <= SLIDER_CONFIGS.length; i += 1) {
    const $newSliderCard = $('.js-sliders__item:first', $sliders).clone();
    $sliders.append($newSliderCard);
    $('.js-sliders__number', $newSliderCard).text(i);
  }

  $('.js-abacus-wrapper', $sliders).each(function (i) {
    const $abacusItem = $(this);
    new AbacusDemo($abacusItem, SLIDER_CONFIGS[i]);
  });
});
