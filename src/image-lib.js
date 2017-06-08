
const images = {};

export const loadSpriteImages = (imageName, numberOfFrames, imageLoaded) => new Promise((resolve, reject) => {
  let loadedCount = 0;
  const spriteImages = new Array(numberOfFrames).map((value, index) => {
    const image = new Image();
    image.onload = () => finishedLoading(imageName, index);
    image.onerror = reject;
    image.src = `images/${imageName}/${index}.png`;
  });
  const finishedLoading = (imageName, index) => {
    imageLoaded(imageName, index);
    loadedCount += 1;
    if (loadedCount === numberOfFrames) {
      resolve(spriteImages);
    }
  };
});

export const getImage = (imageName, index) => images[imageName][index];
