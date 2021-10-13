import View from './View';

function makeTest(testInfo: string, expectedVal: number, reciviedVal: number) {
  it(testInfo, () => {
    expect(expectedVal).toBe(reciviedVal);
  });
}

describe('getPosFromValue', () => {
  const abacusHtmlContainer: HTMLElement = document.createElement('div') as HTMLElement;
  const view = new View(abacusHtmlContainer, {
    min: -10,
    max: 10,
    step: 2,
    value: -8,
  });
  const arrAbacusSetValues: number[] = [-12, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12];
  const arrPercent: number[] = [0, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 100];

  for (let i = 0; i < arrAbacusSetValues.length; i += 1) {
    makeTest(
      `значение ${arrAbacusSetValues[i]} в процентах получается ${arrPercent[i]}%`,
      arrPercent[i],
      view.getPosFromValue(arrAbacusSetValues[i]),
    );
  }
});
