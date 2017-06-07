
import { WINDOW_HEIGHT, WINDOW_WIDTH } from './constants';

export const CANVAS_ID = 'game-canvas';

const div = document.getElementById(CANVAS_ID);

export const canvas = div.getContext('2d');

export const clearCanvas = () => {
  canvas.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
};


const Draw = {
    lineWidth: 2,
    init: function() {
        Draw.ctx = $("#canvas")[0].getContext('2d');
    },
    clear: function() {
        Draw.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    },
    image: function(image, x, y, w, h) { 
        Draw.ctx.drawImage(image, x, y, w, h); 
    },
    rotatedImage: function(image, x, y, w, h, degree) {
        Draw.ctx.save();
        Draw.ctx.translate(x + w/2, y + h/2);
        Draw.ctx.rotate(degree * Math.PI / 180);
        Draw.image(image, - (w/2), - (h/2), w, h);
        // Draw.image(image, - (w/2), - (h/2), w, h);
        Draw.ctx.restore();
    },
    rect: function (x, y, w, h, fill) {
        if (fill) {
            Draw.ctx.beginPath();
            Draw.ctx.rect(x, y, w, h);
            Draw.ctx.closePath(); 
            Draw.ctx.fill();
        } else {
            Draw.ctx.lineWidth = Draw.lineWidth;
            Draw.ctx.strokeRect(x, y, w, h);
        }  
    },
    circle: function(x, y, r, fill) {
        Draw.ctx.beginPath();
        Draw.ctx.arc(x, y, r, 0, Math.PI * 2, true);
        Draw.ctx.closePath();
        if (fill) {
            Draw.ctx.fill();
        }
        else {
            Draw.ctx.lineWidth = Draw.lineWidth;
            Draw.ctx.stroke();
        }
    },
    text: function(x, y, t, font) {
        if (!font) {
            Draw.ctx.font = '32px Time-N-Space gold';
        } else {
            Draw.ctx.font = font;
        }
        Draw.ctx.fillStyle = 'white';
        Draw.ctx.fillText(t,x,y);
    },
    score: function(score) {
        Draw.ctx.drawImage(Images.coin[0], 5, 5, 30, 30);
        Draw.text(40, 31, score);
    },
    remainingLives: function(lives) {
        for (let i = 1; i <= lives; i++) {
            var x = WIDTH - i * 30;
            Draw.ctx.drawImage(Images.falling.right[0], x, 5, PLAYER_W * 1.5, PLAYER_H);
        }
    },
    remainingFuel: function(fuel) {
        Draw.ctx.drawImage(Images.fuel[0], 100, -2, FUEL_W, FUEL_H);
        Draw.ctx.fillStyle = 'gold';
        this.rect(125, 5 + MAX_FUEL - fuel, 10, fuel, true);
    }
};