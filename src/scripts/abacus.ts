/**
 * @fileoverview
 */

import $ from 'jquery';
import {View} from './View';

$.fn.abacus = function (paramOptions ? : AbacusOptions | string, option ? : any, optionValue ? : any): JQuery {
  let returnResult: any = this;

  this.each(function () {
    let instanceHTMLAbacus: HTMLAbacusElement = this;
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
      switch (paramOptions) {
        case 'destroy':
          break;


        case 'disable':
          break;


        case 'enable':
          break;

          
        case 'instance':
          break;


        case 'option':
          let resultOption: any;
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