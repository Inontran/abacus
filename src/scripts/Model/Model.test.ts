import Model from './Model';

function makeTest(testInfo: string, expectedVal: any, reciviedVal: any) {
  it(testInfo, () => {
    expect(expectedVal).toBe(reciviedVal);
  });
}

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
    it(`значение ${arrSetValues[i]} должно быть равным ${arrRightValues[i]}`, () => {
      model.setAbacusProperty({
        value: arrSetValues[i],
      } as AbacusOptions);

      expect(model.abacusProperty.value).toEqual(arrRightValues[i]);
    });
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

  for (let i = 0; i < arrSetValues.length; i += 1) {
    it(`значение ${arrSetValues[i]} должно быть равным ${arrRightValues[i]}`, () => {
      model.setAbacusProperty({
        value: arrSetValues[i],
      } as AbacusOptions);

      expect(model.abacusProperty.value).toEqual(arrRightValues[i]);
    });
  }
});

describe('set animate property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = [false, true, null, 'qwe', 'fast', 'slow', '1', 1, 0, '0', 0.1];
  const arrRightValues: any[] = [false, true, false, false, 'fast', 'slow', false, 1, 0, false, 0];

  for (let i = 0; i < arrTestValues.length; i += 1) {
    model.setAbacusProperty({
      animate: arrTestValues[i],
    } as AbacusOptions);

    makeTest(
      `значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`,
      model.abacusProperty.animate,
      arrRightValues[i],
    );
  }
});

describe('set classes property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = ['abacus', true, null, 'qwe', 'fast', 'slow', '1', 1, 0, '0'];
  const arrRightValues: any[] = ['abacus', 'abacus', 'abacus', 'qwe', 'fast', 'slow', '1', '1', '1', '0'];

  for (let i = 0; i < arrTestValues.length; i += 1) {
    model.setAbacusProperty({
      classes: {
        abacus: arrTestValues[i],
      },
    } as AbacusOptions);

    makeTest(
      `значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`,
      model.abacusProperty.classes?.abacus,
      arrRightValues[i],
    );
  }
});

describe('set max property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = ['1', true, null, 'qwe', 2, undefined, 0.1, '0.2'];
  const arrRightValues: any[] = [100, 100, 100, 100, 2, 2, 0.1, 0.1];

  for (let i = 0; i < arrTestValues.length; i += 1) {
    model.setAbacusProperty({
      max: arrTestValues[i],
    } as AbacusOptions);

    makeTest(
      `значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`,
      model.abacusProperty.max,
      arrRightValues[i],
    );
  }
});

describe('set min property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = ['1', true, null, 'qwe', 2, undefined, 0.1, '0.2'];
  const arrRightValues: any[] = [0, 0, 0, 0, 2, 2, 0.1, 0.1];

  for (let i = 0; i < arrTestValues.length; i += 1) {
    model.setAbacusProperty({
      min: arrTestValues[i],
    } as AbacusOptions);

    makeTest(
      `значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`,
      model.abacusProperty.min,
      arrRightValues[i],
    );
  }
});

describe('set step property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = ['1', true, null, 'qwe', 2, undefined, 0.1, '0.2'];
  const arrRightValues: any[] = [1, 1, 1, 1, 2, 2, 0.1, 0.1];

  for (let i = 0; i < arrTestValues.length; i += 1) {
    model.setAbacusProperty({
      step: arrTestValues[i],
    } as AbacusOptions);

    makeTest(
      `значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`,
      model.abacusProperty.step,
      arrRightValues[i],
    );
  }
});

describe('set orientation property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = ['1', true, null, 'qwe', 2,
    undefined, 'vertical', 'horizontal'];
  const arrRightValues: any[] = ['horizontal', 'horizontal', 'horizontal', 'horizontal', 'horizontal',
    'horizontal', 'vertical', 'horizontal'];

  for (let i = 0; i < arrTestValues.length; i += 1) {
    model.setAbacusProperty({
      orientation: arrTestValues[i],
    } as AbacusOptions);

    makeTest(
      `значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`,
      model.abacusProperty.orientation,
      arrRightValues[i],
    );
  }
});

describe('set range property', () => {
  const model: Model = new Model();
  const arrTestValues: any[] = ['1', true, null, 'qwe', 2, undefined, 'max', 'min'];
  const arrRightValues: any[] = [false, true, true, true, true, true, 'max', 'min'];

  for (let i = 0; i < arrTestValues.length; i += 1) {
    model.setAbacusProperty({
      range: arrTestValues[i],
    } as AbacusOptions);

    makeTest(
      `значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`,
      model.abacusProperty.range,
      arrRightValues[i],
    );
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

  for (let i = 0; i < arrTestValues.length; i += 1) {
    model.setAbacusProperty({
      values: arrTestValues[i],
    } as AbacusOptions);

    makeTest(
      `значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`,
      model.abacusProperty.interval,
      arrRightValues[i],
    );
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

  for (let i = 0; i < arrTestValues.length; i += 1) {
    it(`значение ${arrTestValues[i]} должно быть равным ${arrRightValues[i]}`, () => {
      model.setAbacusProperty({
        values: arrTestValues[i],
      } as AbacusOptions);

      expect(model.abacusProperty.values).toEqual(expect.arrayContaining(arrRightValues[i]));
    });
  }
});
