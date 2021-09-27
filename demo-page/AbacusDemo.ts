import './abacus-demo.scss';
import * as Utils from './utils';

class AbacusDemo {
  constructor() {
    const $body = $('body');
    const $cardList = $('.js-card-list');

    for (let i = 2; i <= 3; i += 1) {
      const $cloneCard = $('.js-card-list__item:first', $cardList).clone();
      $cardList.append($cloneCard);
      $('.js-card-list__number', $cloneCard).text(i);
    }

    const $abacus = $('.js-abacus', $cardList);

    $abacus.abacus({
      min: -10,
      max: 9,
      step: 2,
      values: [-4, 6],
      range: true,
      scale: true,
    });

    $body.on('abacus-change', '.js-card-list .js-abacus', Utils.handleAbacusChange);

    $abacus.each(function () {
      const $abacusItem = $(this as HTMLAbacusElement);
      const $form = $abacusItem.closest('.js-card-list__item').find('form');
      if ($form.length && $abacusItem[0].jqueryAbacusInstance) {
        Utils.parsePropertyToForm($abacusItem.abacus('option') as AbacusOptions, $form);
      }
    });

    $body.on('submit', '.js-form_options-modifier', Utils.handleFormOptionsSubmit);
  }
}

$(new AbacusDemo());
