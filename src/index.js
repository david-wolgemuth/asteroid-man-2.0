
import { Game } from './game';
import { CANVAS_ID } from './canvas';


document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.shouldSendObjects = false;
  game.run();
  game.displayMessage('Ready', 1000, () => {
    game.displayMessage('Set', 1000, () => {
      game.shouldSendObjects = true;
      game.displayMessage('Go!', 2000);
    });
  });

  const canvas = document.getElementById(CANVAS_ID);
  canvas.addEventListener('touchstart', game.touch.bind(game));
  
});
