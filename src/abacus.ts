/**
 * @fileoverview В этом файле находится функция, реализующая внешний API плагина.
 */

import Presenter from './scripts/mvp/Presenter/Presenter';

import './styles/abacus.scss';

$.fn.abacus = function (paramOptions ? : AbacusOptions) {
  const returnResult: JQuery<HTMLElement> = this;

  this.each(function () {
    const abacusHtmlWrapper: HTMLElement = this;

    if (!$.data(this, 'abacus')) {
      let presenter: Presenter;

      if (typeof paramOptions === 'object') {
        presenter = new Presenter(abacusHtmlWrapper, paramOptions);
      } else {
        presenter = new Presenter(abacusHtmlWrapper);
      }

      $.data(this, 'abacus', presenter);
    }
  });

  return returnResult;
};
