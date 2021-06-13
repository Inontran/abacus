/**
 * @fileoverview
 */

import {assert} from 'chai';
import {View} from './View';
import {Model} from './Model';

document.addEventListener('DOMContentLoaded', ()=>{
  // console.log( Object.prototype.toString.call(mocha) );

  mocha.setup('bdd');

  describe('getPosFromValue', () => {
    let abacusHtmlContainer: HTMLAbacusElement = document.querySelectorAll('#abacus-test')[0] as HTMLAbacusElement;
    let view = new View(abacusHtmlContainer, {
      min: -10,
      max: 10,
      step: 2,
      value: -8,
    });
    let arrAbacusSetValues: number[] = [-12, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12];
    let arrPercent: number[] = [0, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 100]

    for (let i = 0; i < arrAbacusSetValues.length; i++) {
      it(`значение ${arrAbacusSetValues[i]} в процентах получается ${arrPercent[i]}%`, ()=>{
        assert.equal(arrPercent[i], view.getPosFromValue(arrAbacusSetValues[i]));
      });
    }
  });


  describe('roundValuePerStep', () => {
    let model: Model = new Model({
      min: -10,
      max: 11,
      step: 2,
      value: 0,
    });
    let arrSetValues: number[] = [-10, -9.7, -9.5, -9, -8.5, -7, -4, -1, -0.5, 0, 1, 2, 5, 7, 9.5, 10, 10.2];
    let arrRightValues: number[] = [-10, -10, -10, -8, -8, -6, -4, 0, 0, 0, 2, 2, 6, 8, 10, 10, 11]

    for (let i = 0; i < arrSetValues.length; i++) {
      it(`значение ${arrSetValues[i]} окргуляется до ${arrRightValues[i]}`, ()=>{
        model.value = arrSetValues[i];
        assert.equal(arrRightValues[i], model.initOptions.value);
      });
    }
  });


  mocha.run();
});