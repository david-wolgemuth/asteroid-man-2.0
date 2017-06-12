
export const randomRange = (min, max) => (
  Math.floor(Math.random() * (max - min) + min)
);

export const randomBool = (max=1) => (
  randomRange(0, max) === 0
);
