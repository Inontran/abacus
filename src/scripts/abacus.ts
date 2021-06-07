import $ from 'jquery';
import View from './View';

$.fn.abacus = function (paramOptions ? : AbacusOptions | string, option ? : string, optionValue ? : any): JQuery {
  // Merge the global options with the options given as argument.
  // if (typeof paramOptions === 'object') {
  //   paramOptions = $.extend({}, $.fn.abacus.options, paramOptions);
  // }

  this.each(function () {
    let instance: HTMLElement = this;

    let view: View;

    if (typeof paramOptions === 'object') {
      view = new View(paramOptions);
    }
    else{
      view = new View();
    }

    instance.addEventListener('change', (event: Event) => {
      let input = event.currentTarget as HTMLInputElement;
      let value: string = input.value;
      console.log('value == ' + value);
    });
  });

  return this;
};