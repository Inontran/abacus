import AbacusDemo from './AbacusDemo';
import SLIDER_CONFIGS from './constants';

$(() => {
  const $sliders = $('.js-sliders');

  for (let i = 2; i <= SLIDER_CONFIGS.length; i += 1) {
    const $newSliderCard = $('.js-sliders__item:first', $sliders).clone();
    $sliders.append($newSliderCard);
    $('.js-sliders__number', $newSliderCard).text(i);
  }

  $('.js-sliders__item-abacus-wrapper', $sliders).each(function (i) {
    const $abacusItem = $(this);
    new AbacusDemo($abacusItem, SLIDER_CONFIGS[i]);
  });
});
