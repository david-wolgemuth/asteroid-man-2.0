
const images = {};

export const loadSpriteImages = (imageName, numberOfFrames, imageLoaded) => new Promise((resolve, reject) => {
  let loadedCount = 0;
  images[imageName] = [];
  const spriteImages = new Array(numberOfFrames).fill(null).map((value, index) => {
    const image = new Image();
    images[imageName][index] = image;
    image.onload = () => finishedLoading(imageName, index);
    image.onerror = reject;
    image.src = `images/${imageName}/${index}.png`;
  });
  const finishedLoading = (imageName, index) => {
    if (typeof(imageLoaded) === 'function') {
      imageLoaded(imageName, index);
    }
    loadedCount += 1;
    if (loadedCount === numberOfFrames) {
      resolve(spriteImages);
    }
  };
});

export const getImage = (imageName, index) => images[imageName][index];
