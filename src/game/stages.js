export const STAGES = [
  {
    key: 'seed',
    label: 'SEED',
    threshold: 0,
    message: 'SEED DETECTED... PRIME THE CHASSIS WITH WATER.',
  },
  {
    key: 'sprout',
    label: 'SPROUT',
    threshold: 18,
    message: 'SPROUT SIGNAL LOCKED... MAINTAIN RHYTHM.',
  },
  {
    key: 'stem',
    label: 'STEM',
    threshold: 38,
    message: 'STEM RISING... HYDRATION PIPELINE STABLE.',
  },
  {
    key: 'leaves',
    label: 'LEAVES',
    threshold: 60,
    message: 'LEAF ARRAY FORMED... SOLAR INTAKE ONLINE.',
  },
  {
    key: 'flower',
    label: 'FLOWER',
    threshold: 84,
    message: 'FULL BLOOM ACHIEVED... SUNFLOWER_OS STABLE.',
  },
];

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function getStage(growth) {
  return [...STAGES].reverse().find((stage) => growth >= stage.threshold) ?? STAGES[0];
}

export function getHydrationBlocks(hydration) {
  return Math.round(clamp(hydration, 0, 100) / 10);
}
