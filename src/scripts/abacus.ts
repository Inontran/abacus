/**
 * @fileoverview
 */

import $ from 'jquery';
import {View} from './View';

$.fn.abacus = function (paramOptions ? : AbacusOptions | string, option ? : any, optionValue ? : any): JQuery {
  let returnResult: any = this;

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
      let resultOption: any;

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
          if( typeof option === 'object'){
            resultOption = view.option(undefined, option);
          }
          else{
            resultOption = view.option(option, optionValue);
          }

          if( typeof resultOption !== undefined ){
            returnResult = resultOption;
          }
          break;


        case 'value':
          resultOption = view.option('value', optionValue);

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

    // instanceHTMLAbacus.addEventListener('change', (event: Event) => {
    //   let input = event.currentTarget as HTMLInputElement;
    //   let value: string = input.value;
    //   console.log('value == ' + value);
    // });
  });

  return returnResult;
};