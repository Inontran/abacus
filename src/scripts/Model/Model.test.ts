import Model from './Model';

describe('roundValuePerStep', () => {
  const model: Model = new Model({
    min: -10,
    max: 11,
    step: 2,
    value: 0,
  });
  const arrSetValues: number[] = [-10, -9.7, -9.5, -9, -8.5, -7, -4, -1, -0.5, 0, 1, 2, 5, 7, 9.5, 10, 10.2];
  const arrRightValues: number[] = [-10, -10, -10, -8, -8, -6, -4, 0, 0, 0, 2, 2, 6, 8, 10, 10, 11];

  function makeTest(setValue: any, reciviedVal: any) {
    it(`значение ${setValue} должно быть равным ${reciviedVal}`, () => {
      model.setAbacusProperty({
        value: setValue,
      } as AbacusOptions);
      expect(model.abacusProperty.value).toEqual(reciviedVal);
    });
  }

  for (let i = 0; i < arrSetValues.length; i += 1) {
    // it(`значение ${arrSetValues[i]} должно быть равным ${arrRightValues[i]}`, () => {
    //   model.setAbacusProperty({
    //     value: arrSetValues[i],
    //   } as AbacusOptions);

    //   expect(model.abacusProperty.value).toEqual(arrRightValues[i]);
    // });
    makeTest(arrSetValues[i], arrRightValues[i]);
  }
});

describe('roundValuePerStep2', () => {
  const model: Model = new Model({
    min: -2,
    max: 10,
    step: 3,
    value: 4,
  });
  const arrSetValues: number[] = [-2, -1.9, -1.8, -1.7, -1.5, -1.3, -1, -0.7, -0.5, 0, 0.3, 0.5, 0.7, 0.8, 1];
  const arrRightValues: number[] = [-2, -2, -2, -2, -2, -2, -2, -2, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  function makeTest(setValue: any, reciviedVal: any) {
    it(`значение ${setValue} должно быть равным ${reciviedVal}`, () => {
      model.setAbacusProperty({
        value: setValue,
      } as AbacusOptions);
      expect(model.abacusProperty.value).toEqual(reciviedVal);
    });
  }

  for (let i = 0; i < arrSetValues.length; i += 1) {
    makeTest(arrSetValues[i], arrRightValues[i]);
  }
});

describe('set animate property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = [false, true, null, 'qwe', 'fast', 'slow', '1', 1, 0, '0', 0.1];
  const arrRightValues: any[] = [false, true, false, false, 'fast', 'slow', false, 1, 0, false, 0];

  function makeTest(setValue: any, reciviedVal: any) {
    it(`значение ${setValue} должно быть равным ${reciviedVal}`, () => {
      model.setAbacusProperty({
        animate: setValue,
      } as AbacusOptions);
      expect(model.abacusProperty.animate).toBe(reciviedVal);
    });
  }

  for (let i = 0; i < arrTestValues.length; i += 1) {
    makeTest(arrTestValues[i], arrRightValues[i]);
  }
});

describe('set classes property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = ['abacus', true, null, 'qwe', 'fast', 'slow', '1', 1, 0, '0'];
  const arrRightValues: any[] = ['abacus', 'abacus', 'abacus', 'qwe', 'fast', 'slow', '1', '1', '1', '0'];

  function makeTest(setValue: any, reciviedVal: any) {
    it(`значение ${setValue} должно быть равным ${reciviedVal}`, () => {
      model.setAbacusProperty({
        classes: {
          abacus: setValue,
        },
      } as AbacusOptions);
      expect(model.abacusProperty.classes.abacus).toBe(reciviedVal);
    });
  }

  for (let i = 0; i < arrTestValues.length; i += 1) {
    makeTest(arrTestValues[i], arrRightValues[i]);
  }
});

describe('set max property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = ['1', true, null, 'qwe', 2, undefined, 0.1, '0.2'];
  const arrRightValues: any[] = [100, 100, 100, 100, 2, 2, 0.1, 0.1];

  function makeTest(setValue: any, reciviedVal: any) {
    it(`значение ${setValue} должно быть равным ${reciviedVal}`, () => {
      model.setAbacusProperty({
        max: setValue,
      } as AbacusOptions);
      expect(model.abacusProperty.max).toBe(reciviedVal);
    });
  }

  for (let i = 0; i < arrTestValues.length; i += 1) {
    makeTest(arrTestValues[i], arrRightValues[i]);
  }
});

describe('set min property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = ['1', true, null, 'qwe', 2, undefined, 0.1, '0.2'];
  const arrRightValues: any[] = [0, 0, 0, 0, 2, 2, 0.1, 0.1];

  function makeTest(setValue: any, reciviedVal: any) {
    it(`значение ${setValue} должно быть равным ${reciviedVal}`, () => {
      model.setAbacusProperty({
        min: setValue,
      } as AbacusOptions);
      expect(model.abacusProperty.min).toBe(reciviedVal);
    });
  }

  for (let i = 0; i < arrTestValues.length; i += 1) {
    makeTest(arrTestValues[i], arrRightValues[i]);
  }
});

describe('set step property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = ['1', true, null, 'qwe', 2, undefined, 0.1, '0.2'];
  const arrRightValues: any[] = [1, 1, 1, 1, 2, 2, 0.1, 0.1];

  function makeTest(setValue: any, reciviedVal: any) {
    it(`значение ${setValue} должно быть равным ${reciviedVal}`, () => {
      model.setAbacusProperty({
        step: setValue,
      } as AbacusOptions);
      expect(model.abacusProperty.step).toBe(reciviedVal);
    });
  }

  for (let i = 0; i < arrTestValues.length; i += 1) {
    makeTest(arrTestValues[i], arrRightValues[i]);
  }
});

describe('set orientation property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = ['1', true, null, 'qwe', 2,
    undefined, 'vertical', 'horizontal'];
  const arrRightValues: any[] = ['horizontal', 'horizontal', 'horizontal', 'horizontal', 'horizontal',
    'horizontal', 'vertical', 'horizontal'];

  function makeTest(setValue: any, reciviedVal: any) {
    it(`значение ${setValue} должно быть равным ${reciviedVal}`, () => {
      model.setAbacusProperty({
        orientation: setValue,
      } as AbacusOptions);
      expect(model.abacusProperty.orientation).toBe(reciviedVal);
    });
  }

  for (let i = 0; i < arrTestValues.length; i += 1) {
    makeTest(arrTestValues[i], arrRightValues[i]);
  }
});

describe('set range property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = ['1', true, null, 'qwe', 2, undefined, 'max', 'min'];
  const arrRightValues: any[] = [false, true, true, true, true, true, 'max', 'min'];

  function makeTest(setValue: any, reciviedVal: any) {
    it(`значение ${setValue} должно быть равным ${reciviedVal}`, () => {
      model.setAbacusProperty({
        range: setValue,
      } as AbacusOptions);
      expect(model.abacusProperty.range).toBe(reciviedVal);
    });
  }

  for (let i = 0; i < arrTestValues.length; i += 1) {
    makeTest(arrTestValues[i], arrRightValues[i]);
  }
});

describe('set interval property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = [
    [1],
    [1, 2],
    ['3', 5],
    [null, 6],
    [-1, 200],
    [],
  ];
  const arrRightValues: any[] = [
    false,
    true,
    true,
    true,
    true,
    true,
  ];

  function makeTest(setValue: any, reciviedVal: any) {
    it(`значение ${setValue} должно быть равным ${reciviedVal}`, () => {
      model.setAbacusProperty({
        values: setValue,
      } as AbacusOptions);
      expect(model.abacusProperty.interval).toBe(reciviedVal);
    });
  }

  for (let i = 0; i < arrTestValues.length; i += 1) {
    makeTest(arrTestValues[i], arrRightValues[i]);
  }
});

describe('set values property', () => {
  const model: Model = new Model({
    min: 0,
    max: 100,
    step: 1,
  } as AbacusOptions);

  const arrTestValues: any[] = [
    [1],
    [1, 2],
    ['3', 5],
    [null, 6],
    [-1, 200],
    [],
  ];
  const arrRightValues: any[] = [
    [1],
    [1, 2],
    [3, 5],
    [0, 6],
    [0, 100],
    [0, 100],
  ];

  function makeTest(setValue: any, reciviedVal: any) {
    it(`значение ${setValue} должно быть равным ${reciviedVal}`, () => {
      model.setAbacusProperty({
        values: setValue,
      } as AbacusOptions);
      expect(model.abacusProperty.values).toEqual(expect.arrayContaining(reciviedVal));
    });
  }

  for (let i = 0; i < arrTestValues.length; i += 1) {
    makeTest(arrTestValues[i], arrRightValues[i]);
  }
});
