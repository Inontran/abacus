const SLIDER_CONFIGS: Array<AbacusOptions> = [
  {
    min: -10,
    max: 9,
    step: 2,
    values: [-4, 6],
    range: true,
    hasMarks: true,
    hasTooltip: true,
  },
  {
    animate: 'fast',
    max: 1000,
    step: 0.5,
    values: [500],
    range: 'max',
  },
  {
    min: 10,
    max: 100,
    step: 1,
    range: 'min',
    orientation: 'vertical',
    hasMarks: true,
  },
];

export default SLIDER_CONFIGS;
