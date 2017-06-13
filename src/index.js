
import { Game } from './game';
import { CANVAS_ID } from './canvas';


document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.run();

  const canvas = document.getElementById(CANVAS_ID);
  canvas.addEventListener('touchstart', game.touch.bind(game));
  
});
