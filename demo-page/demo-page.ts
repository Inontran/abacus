import AbacusDemo from './AbacusDemo';

$(() => {
  const $cardList = $('.js-sliders');

  for (let i = 2; i <= 3; i += 1) {
    const $cloneCard = $('.js-sliders__item:first', $cardList).clone();
    $cardList.append($cloneCard);
    $('.js-sliders__number', $cloneCard).text(i);
  }

  $('.js-abacus-wrapper', $cardList).each(function () {
    const $abacusItem = $(this);
    new AbacusDemo($abacusItem);
  });
});