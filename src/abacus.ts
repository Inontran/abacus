/**
 * @fileoverview В этом файле находится функция, реализующая внешний API плагина.
 */

import View from './scripts/mvp/View/View';

import './styles/abacus.scss';

$.fn.abacus = function (paramOptions ? : AbacusOptions) {
  let returnResult: JQuery<HTMLElement> = this;

  this.each(function () {
    const abacusHtmlWrapper: HTMLElement = this;
    
    if (!$.data(this, 'abacus')) {
      let view: View;

      if (typeof paramOptions === 'object') {
        view = new View(abacusHtmlWrapper, paramOptions);
      } else {
        view = new View(abacusHtmlWrapper);
      }

      $.data(this, 'abacus', view);
    }
  });

  return returnResult;
};
