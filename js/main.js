'use strict';
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class GameState {
    constructor() {
        this.apple = new Apple();
        this.apple.setLocation();
        this.game = null;
        const x = Math.floor(Math.random() * canvas.width / 2);
        const y = Math.floor( Math.random() * canvas.height / 2);
        this.snake = new Snake(x, y);
    }

    draw(ctx) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.apple.draw(ctx);
        this.snake.draw(ctx);
        ctx.font = "18px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText(this.snake.total, canvas.width - 50, 40);
    }

    update() {
        this.snake.update(canvas, this.apple);
    }

    keyDown(key) {
        if (key === "Escape") {
            this.game.popState();
            return;
        }

        if (key === "Backspace") {
            this.game.popState();
            return;
        }


        this.snake.keyDown(key);
    }
}

class IntroState {
    constructor(game) {
        this.game = game;
    }

    draw(ctx) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Impact';
        ctx.fillText("Snake Game", canvas.width / 2 - 150,  canvas.height / 2);

        ctx.font = '12px Impact';
        ctx.fillText("Press enter to play\n or esc to back", canvas.width / 2 - 150,  canvas.height / 2 + 25);
    }

    update() {
        
    }

    keyDown(key) {
        if (key === 'Enter') {
            this.game.pushState(new GameState());
        }
    }
}




class Game {
    
    constructor() {
        this.currentState = new IntroState(this);
        this.prevState = null;
    }

    update() {
        if (this.currentState){
            this.currentState.update();
        }
    }

    pushState(state) {
        state.game = this;
        this.prevState = this.currentState;
        this.currentState = state;
    }

    popState() {
        this.currentState = this.prevState;
    }

    draw() {
        if (this.currentState) {
            this.currentState.draw(ctx);
        }
    }

    keyDown(key) {
        this.currentState.keyDown(key);
    }
}


const game = new Game();

function draw() {
    game.draw();
}

function update() {
    game.update();
}

function loop() {
    update();
    draw();
    window.requestAnimationFrame(loop.bind(this));
}

window.addEventListener('keydown', event => {
    game.keyDown(event.key);
});

loop();