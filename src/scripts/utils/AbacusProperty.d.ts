/**
 * Свойства слайдера.
 */
interface AbacusProperties extends AbacusOptions {
  animate: boolean | string | number;
  classes: AbacusClasses;
  disabled: boolean;

  /**
   * Свойство, указывающее на то, работает ли слайдер в режиме интервала или нет.
   * @type {boolean}
   */
  interval: boolean;

  max: number;
  min: number;

  /**
   * Определяет, перемещаются ли ручки ползунка по горизонтали (минимум слева, максимум справа)
   * или вертикально (минимум внизу, максимум вверху).
   * @type {AbacusOrientationType}
   */
  orientation: AbacusOrientationType;

  range: boolean | string;
  scale: boolean;
  step: number;
  tooltip: boolean;
  value: number;
  values: number[];
}
