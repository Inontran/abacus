import $ from 'jquery';
import View from './View';

$.fn.abacus = function (paramOptions ? : AbacusOptions | string, option ? : string, optionValue ? : any): JQuery {

  this.each(function () {
    let instance: HTMLAbacusElement = this;
    let view: View;

    if( instance.jqueryAbacusInstance instanceof View ){
      view = instance.jqueryAbacusInstance;
    }
    else{
      if (typeof paramOptions === 'object') {
        view = new View(instance, paramOptions);
      }
      else{
        view = new View(instance);
      }

      instance.jqueryAbacusInstance = view;
    }


    // instance.addEventListener('change', (event: Event) => {
    //   let input = event.currentTarget as HTMLInputElement;
    //   let value: string = input.value;
    //   console.log('value == ' + value);
    // });
  });

  return this;
};