/**
 * @fileoverview В этом файле находится функция, реализующая внешний API плагина.
 */

import View from './scripts/mvp/View/View';
import './styles/abacus.scss';

$.fn.abacus = function (
  paramOptions ? : AbacusOptions | string,
  param1 ? : AbacusOptions | number | string | number[],
  param2 ? : number | string | boolean | null | AbacusClasses,
) {
  let returnResult: JQuery<HTMLAbacusElement> |
  AbacusProperties |
  number |
  number[] |
  boolean |
  null |
  undefined |
  AbacusClasses |
  View |
  string = this;

  this.each(function () {
    const instanceHTMLAbacus: HTMLAbacusElement = this;
    let view: View;

    // получение или инициализация плагина
    if (instanceHTMLAbacus.jqueryAbacusInstance instanceof View) {
      view = instanceHTMLAbacus.jqueryAbacusInstance;
    } else if (typeof paramOptions === 'object') {
      view = new View(instanceHTMLAbacus, paramOptions);
    } else if (!paramOptions) {
      view = new View(instanceHTMLAbacus);
    } else {
      return;
    }

    if (typeof paramOptions === 'string') {
      switch (paramOptions) {
        case 'destroy':
          view.destroy();
          instanceHTMLAbacus.jqueryAbacusInstance = null;
          break;

        case 'disable':
          view.setProperties('disabled', true);
          break;

        case 'enable':
          view.setProperties('disabled', false);
          break;

        case 'getInstance':
          returnResult = view;
          break;

        case 'getProperties':
          if (typeof param1 === 'string') {
            returnResult = view.getProperties(param1);
          } else {
            returnResult = view.getProperties();
          }
          break;

        case 'setProperties':
          if (typeof param1 === 'object') {
            view.setProperties('', param1);
          } else if (typeof param1 === 'string') {
            view.setProperties(param1, param2);
          }
          break;

        case 'getValue':
        case 'getValues':
          returnResult = view.getProperties(paramOptions);
          break;

        case 'setValue':
        case 'setValues':
          view.setProperties(paramOptions, param1);
          break;

        case 'getWidget':
          returnResult = $(view.getHtmlWidget());
          break;
      }
    }
  });

  return returnResult;
};
