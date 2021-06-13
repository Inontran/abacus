/**
 * @fileoverview
 */

import $ from 'jquery';
import {View} from './View';

$.fn.abacus = function (paramOptions ? : AbacusOptions | string, option ? : string, optionValue ? : any): JQuery {

  this.each(function () {
    let instanceHTMLAbacus: HTMLAbacusElement = this;
    let view: View;

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

    // instanceHTMLAbacus.addEventListener('change', (event: Event) => {
    //   let input = event.currentTarget as HTMLInputElement;
    //   let value: string = input.value;
    //   console.log('value == ' + value);
    // });
  });

  return this;
};