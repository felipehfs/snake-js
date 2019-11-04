'use strict';
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let before = new Date().getTime();

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

    update(delta) {
        this.snake.update(canvas, this.apple, delta);
    }

    keyDown(key) {
        if (key === "Escape") {
            this.game.popState();
            this.game.mixer.stopSong();
            return;
        }

        if (key === "Backspace") {
            this.game.popState();
            this.game.mixer.stopSong();
            return;
        }

        if (key === "p") {
            this.game.mixer.pauseSong();
            this.game.pushState(new PauseState());
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

    update(delta) {
        
    }

    keyDown(key) {
        if (key === 'Enter') {
            this.game.mixer.playSong('acidTrumpet');
            this.game.pushState(new GameState());
        }
    }
}


class PauseState {
    constructor(game) {
        this.game = game;
    }

    draw(ctx) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '18px Impact';
        ctx.fillText("Pause Game", canvas.width / 2 - 150,  canvas.height / 2);

    }

    update() {
        
    }

    keyDown(key) {
        if (key === 'p') {
            this.game.mixer.pauseSong();
            this.game.popState();
        }
    }
}





class Game {
    
    constructor() {
        this.states = [];
        this.mixer = new AudioMixer();
        this.currentState = new IntroState(this);
        this.states.push(this.currentState);
    }

    update(delta) {
        if (this.currentState){
            this.currentState.update(delta);
        }
    }

    pushState(state) {
        state.game = this;
        this.states.push(this.currentState);
        this.currentState = state;
    }

    popState() {
        this.currentState = this.states.pop();
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

class AudioMixer {
    
    constructor() {
        this.actualSong = null;
        this.sounds = {
            acidTrumpet: new Audio('../assets/acid-trumpet-by-kevin-macleod.mp3'),
        };

        this.soundsEfects = {};
    }


    playSong(songName, loop=true) {
        this.actualSong = this.sounds[songName];
        this.actualSong.play(); 
        this.actualSong.loop = loop;
    }

    pauseSong() {
        if (this.actualSong.paused) {
            this.actualSong.play();
        }else {
            this.actualSong.pause();
        }
    }

    stopSong() {
        this.actualSong.pause();
        this.actualSong.currentTime = 0;
    }
}

const game = new Game();

function draw() {
    game.draw();
}

function update(delta) {
    game.update(delta);
}

function loop() {
    const now = new Date().getTime();
    let elapsed = now - before;
    update(elapsed);
    draw();
    before = now;
    window.requestAnimationFrame(loop.bind(this));
}

window.addEventListener('keydown', event => {
    game.keyDown(event.key);
});

requestAnimationFrame(loop);