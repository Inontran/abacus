/**
 * Функция, копирующая объект со свойствами слайдера.
 * @param {AbacusProperties} abacusProperties Свойства слайдера.
 * @returns {AbacusProperties} Новый объект со свойствами слайдера.
 */
function getCloneAbacusProperties(abacusProperties: AbacusProperties): AbacusProperties {
  const cloneProperties = {} as AbacusProperties;
  Object.assign(cloneProperties, abacusProperties);
  cloneProperties.values = abacusProperties.values?.slice(0);
  Object.assign(cloneProperties.classes, abacusProperties.classes);
  return cloneProperties;
}

/**
 * Функция получения количества знаков после запятой.
 * @param {number} x Число, у которого надо узнать количество знаков после запятой.
 * @returns {number} Количество знаков после запятой.
 */
function countNumAfterPoint(x: number): number {
  const xStr = x.toString();
  return (`${xStr}`).indexOf('.') >= 0 ? (`${xStr}`).split('.')[1].length : 0;
}

/**
 * Функция окргуления числа до того количества знаков после запятой, сколько этих знаков у числа fractionalNum.
 * @param {number} value Число, которое надо округлить.
 * @param {number} fractionalNum Число, у которого надо узнать количество знаков после запятой.
 * @returns {number} Округленное число.
 */
function round(value: number, fractionalNum: number): number {
  const numbersAfterPoint = countNumAfterPoint(fractionalNum);
  let roundedValue = value;
  if (numbersAfterPoint > 0) {
    roundedValue = parseFloat(value.toFixed(numbersAfterPoint));
  } else {
    roundedValue = Math.round(value);
  }

  return roundedValue;
}

/**
 * Функция сравнения двух массивов с произвольними примитивными значениями.
 * @param {Array<any>} a Массив
 * @param {Array<any>} b Массив
 * @returns {boolean} Возвращает "true" если массивы одинаковые. Иначе "false".
 */
function arrayCompare(a?: Array<any>, b?: Array<any>): boolean {
  if (!a || !b) return false;

  if (a?.length !== b?.length) return false;

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

export { getCloneAbacusProperties, countNumAfterPoint, round, arrayCompare };