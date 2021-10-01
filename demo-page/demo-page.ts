import AbacusDemo from './AbacusDemo';

$(() => {
  const $cardList = $('.js-card-list');

  for (let i = 2; i <= 3; i += 1) {
    const $cloneCard = $('.js-card-list__item:first', $cardList).clone();
    $cardList.append($cloneCard);
    $('.js-card-list__number', $cloneCard).text(i);
  }

  $('.js-abacus', $cardList).each(function () {
    const $abacusItem = $(this);
    new AbacusDemo($abacusItem);
  });
});