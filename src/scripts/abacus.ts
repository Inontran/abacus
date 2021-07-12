/**
 * @fileoverview
 */

import $ from 'jquery';
import {View} from './View';

$.fn.abacus = function (
  paramOptions ? : AbacusOptions | string,
  param1 ? : AbacusOptions | number | string | number[],
  param2 ? : number | string | boolean | null | AbacusClasses
) {
  let returnResult: JQuery | 
                    AbacusOptions | 
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
    if( instanceHTMLAbacus.jqueryAbacusInstance instanceof View ){
      view = instanceHTMLAbacus.jqueryAbacusInstance;
    }
    else{
      if (typeof paramOptions === 'object') {
        view = new View(instanceHTMLAbacus, paramOptions);
      }
      else{
        view = new View(instanceHTMLAbacus);
      }

      instanceHTMLAbacus.jqueryAbacusInstance = view;
    }

    if( typeof paramOptions === 'string' ){
      let resultOption: AbacusOptions | number | string | number[] | boolean | null | AbacusClasses | undefined;

      switch (paramOptions) {
        case 'destroy':
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
          if( typeof param1 === 'object'){
            resultOption = view.option(undefined, param1);
          }
          else if( typeof param1 === 'string' ){
            resultOption = view.option(param1, param2);
          }
          else{
            resultOption = view.option();
          }

          if( typeof resultOption !== undefined ){
            returnResult = resultOption;
          }
          break;


        case 'value':
          resultOption = view.option('value', param2);

          if( typeof resultOption !== undefined ){
            returnResult = resultOption;
          }
          break;


        case 'values':
          break;


        case 'widget':
          break;
      }
    }
  });

  return returnResult;
};