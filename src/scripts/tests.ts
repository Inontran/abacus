import { assert } from 'chai';
import { View } from './View';
import { Model } from './Model';

document.addEventListener('DOMContentLoaded', () => {
  // console.log( Object.prototype.toString.call(mocha) );

  mocha.setup('bdd');

  describe('getPosFromValue', () => {
    const abacusHtmlContainer: HTMLAbacusElement = document.querySelectorAll('#abacus-test')[0] as HTMLAbacusElement;
    const view = new View(abacusHtmlContainer, {
      min: -10,
      max: 10,
      step: 2,
      value: -8,
    });
    const arrAbacusSetValues: number[] = [-12, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12];
    const arrPercent: number[] = [0, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 100];

    for (let i = 0; i < arrAbacusSetValues.length; i += 1) {
      it(`значение ${arrAbacusSetValues[i]} в процентах получается ${arrPercent[i]}%`, () => {
        assert.equal(arrPercent[i], view.getPosFromValue(arrAbacusSetValues[i]));
      });
    }
  });

  // describe('calcCountMarkItems', () => {
  //   const abacusHtmlContainer: HTMLAbacusElement = document.querySelectorAll('#abacus-test')[0] as HTMLAbacusElement;
  //   const view = new View(abacusHtmlContainer, {
  //     min: -10,
  //     max: 10,
  //     step: 2,
  //     value: -8,
  //   });
  //   const arrAbacusSetValues: number[] = [-12, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12];
  //   const arrPercent: number[] = [0, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 100]

  //   for (let i = 0; i < arrAbacusSetValues.length; i += 1) {
  //     it(`значение ${arrAbacusSetValues[i]} в процентах получается ${arrPercent[i]}%`, ()=>{
  //       assert.equal(arrPercent[i], view.getPosFromValue(arrAbacusSetValues[i]));
  //     });
  //   }
  // });

  describe('roundValuePerStep', () => {
    const model: Model = new Model({
      min: -10,
      max: 11,
      step: 2,
      value: 0,
    });
    const arrSetValues: number[] = [-10, -9.7, -9.5, -9, -8.5, -7, -4, -1, -0.5, 0, 1, 2, 5, 7, 9.5, 10, 10.2];
    const arrRightValues: number[] = [-10, -10, -10, -8, -8, -6, -4, 0, 0, 0, 2, 2, 6, 8, 10, 10, 11];

    for (let i = 0; i < arrSetValues.length; i += 1) {
      it(`значение ${arrSetValues[i]} окргуляется до ${arrRightValues[i]}`, () => {
        model.value = arrSetValues[i];
        assert.equal(arrRightValues[i], model.abacusProperty.value);
      });
    }
  });

  describe('set animate property', () => {
    const model: Model = new Model();
    const arrTestValues: any[] = [false, true, null, 'qwe', 'fast', 'slow', '1', 1, 0, '0', 0.1];
    const arrRightValues: any[] = [false, true, false, false, 'fast', 'slow', 1, 1, 0, 0, 0];

    for (let i = 0; i < arrTestValues.length; i += 1) {
      it(`значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`, () => {
        model.abacusProperty = { animate: arrTestValues[i] } as AbacusOptions;
        assert.equal(arrRightValues[i], model.abacusProperty.animate);
      });
    }
  });

  describe('set classes property', () => {
    const model: Model = new Model();
    const arrTestValues: any[] = ['abacus', true, null, 'qwe', 'fast', 'slow', '1', 1, 0, '0'];
    const arrRightValues: any[] = ['abacus', 'abacus', 'abacus', 'qwe', 'fast', 'slow', '1', '1', '1', '0'];

    for (let i = 0; i < arrTestValues.length; i += 1) {
      it(`значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`, () => {
        model.abacusProperty = {
          classes: {
            abacus: arrTestValues[i],
          },
        } as AbacusOptions;
        assert.equal(arrRightValues[i], model.abacusProperty.classes?.abacus);
      });
    }
  });

  describe('set max property', () => {
    const model: Model = new Model();
    const arrTestValues: any[] = ['1', true, null, 'qwe', 2, undefined, 0.1, '0.2'];
    const arrRightValues: any[] = [1, 1, 1, 1, 2, 2, 0.1, 0.2];

    for (let i = 0; i < arrTestValues.length; i += 1) {
      it(`значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`, () => {
        model.abacusProperty = {
          max: arrTestValues[i],
        } as AbacusOptions;
        assert.equal(arrRightValues[i], model.abacusProperty.max);
      });
    }
  });

  describe('set min property', () => {
    const model: Model = new Model();
    const arrTestValues: any[] = ['1', true, null, 'qwe', 2, undefined, 0.1, '0.2'];
    const arrRightValues: any[] = [1, 1, 1, 1, 2, 2, 0.1, 0.2];

    for (let i = 0; i < arrTestValues.length; i += 1) {
      it(`значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`, () => {
        model.abacusProperty = {
          min: arrTestValues[i],
        } as AbacusOptions;
        assert.equal(arrRightValues[i], model.abacusProperty.min);
      });
    }
  });

  describe('set step property', () => {
    const model: Model = new Model();
    const arrTestValues: any[] = ['1', true, null, 'qwe', 2, undefined, 0.1, '0.2'];
    const arrRightValues: any[] = [1, 1, 1, 1, 2, 2, 0.1, 0.2];

    for (let i = 0; i < arrTestValues.length; i += 1) {
      it(`значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`, () => {
        model.abacusProperty = {
          step: arrTestValues[i],
        } as AbacusOptions;
        assert.equal(arrRightValues[i], model.abacusProperty.step);
      });
    }
  });

  describe('set orientation property', () => {
    const model: Model = new Model();
    const arrTestValues: any[] = ['1', true, null, 'qwe', 2,
      undefined, 'vertical', 'horizontal'];
    const arrRightValues: any[] = ['horizontal', 'horizontal', 'horizontal', 'horizontal', 'horizontal',
      'horizontal', 'vertical', 'horizontal'];

    for (let i = 0; i < arrTestValues.length; i += 1) {
      it(`значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`, () => {
        model.abacusProperty = {
          orientation: arrTestValues[i],
        } as AbacusOptions;
        assert.equal(arrRightValues[i], model.abacusProperty.orientation);
      });
    }
  });

  describe('set range property', () => {
    const model: Model = new Model();
    const arrTestValues: any[] = ['1', true, null, 'qwe', 2, undefined, 'max', 'min'];
    const arrRightValues: any[] = [false, true, true, true, true, true, 'max', 'min'];

    for (let i = 0; i < arrTestValues.length; i += 1) {
      it(`значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`, () => {
        model.abacusProperty = {
          range: arrTestValues[i],
        } as AbacusOptions;
        assert.equal(arrRightValues[i], model.abacusProperty.range);
      });
    }
  });

  mocha.run();
});
