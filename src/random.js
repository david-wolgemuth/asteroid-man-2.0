
export const randomRange = (min, max) => {
  if (typeof(max) === 'undefined') {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
};

export const randomBool = (max=1) => (
  randomRange(0, max) === 0
);
