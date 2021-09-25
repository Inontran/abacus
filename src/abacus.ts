/**
 * @fileoverview В этом файле находится функция, реализующая внешний API плагина.
 */

import $ from 'jquery';
import View from './scripts/mvp/View/View';

import '../styles/abacus.scss';

$.fn.abacus = function (
  paramOptions ? : AbacusOptions | string,
  param1 ? : AbacusOptions | number | string | number[],
  param2 ? : number | string | boolean | null | AbacusClasses,
) {
  let returnResult: JQuery<HTMLAbacusElement> |
  AbacusProperty |
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
    } else {
      if (typeof paramOptions === 'object') {
        view = new View(instanceHTMLAbacus, paramOptions);
      } else if (!paramOptions) {
        view = new View(instanceHTMLAbacus);
      } else {
        return;
      }

      instanceHTMLAbacus.jqueryAbacusInstance = view;
    }

    if (typeof paramOptions === 'string') {
      let resultOption: JQuery<HTMLAbacusElement> |
      AbacusProperty |
      number |
      number[] |
      boolean |
      null |
      undefined |
      AbacusClasses |
      View |
      string;

      switch (paramOptions) {
        case 'destroy':
          view.destroy();
          instanceHTMLAbacus.jqueryAbacusInstance = null;
          break;

        case 'disable':
          view.option('disabled', true);
          break;

        case 'enable':
          view.option('disabled', false);
          break;

        case 'instance':
          returnResult = view;
          break;

        case 'option':
          if (typeof param1 === 'object') {
            resultOption = view.option(undefined, param1);
          } else if (typeof param1 === 'string') {
            resultOption = view.option(param1, param2);
          } else {
            resultOption = view.option();
          }

          if (typeof resultOption !== undefined) {
            returnResult = resultOption;
          }
          break;

        case 'value':
        case 'values':
          resultOption = view.option(paramOptions, param1);

          if (typeof resultOption !== undefined) {
            returnResult = resultOption;
          }
          break;

        case 'widget':
          resultOption = $(view.getHtmlWidget());
          break;

        default:
          break;
      }
    }
  });

  return returnResult;
};
