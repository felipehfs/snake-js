const MAX_SPEED = 160;

class Snake {

    constructor(x, y) {
        this.total = 0;
        this.tail = [];
        this.x = x
        this.y = y;
        this.speedX = MAX_SPEED;
        this.speedY = 0;
        this.scale = 10
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x, this.y, this.scale, this.scale);

        for(let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, this.tail[i].scale, this.tail[i].scale);
        }
    }

    isCollide(other) {
        return other.x < this.x  + this.scale && other.x + other.scale > this.x 
            && other.y < this.y + this.scale && other.y + other.scale > this.y;
    }

    eat(apple) {
        if (this.isCollide(apple)) {
            apple.setLocation();
            this.total++;
        }
    }

    update(canvas, apple, delta) {

        for(let i =0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        this.tail[this.total] = {
                x: this.x, 
                y: this.y, 
                speedX: this.speedX,
                speedY: this.speedY,
                scale: this.scale,
            };

        this.x += this.speedX * delta / 1000;
        this.y += this.speedY * delta / 1000;

        if (this.x > canvas.width) {
            this.x = 0;
        }

        if (this.x < 0) {
            this.x = canvas.width;
        }

        if (this.y > canvas.height) {
            this.y = 0;
        }

        if (this.y < 0) {
            this.y = canvas.height;
        }
        
        this.eat(apple)
    }

    keyDown(key) {
        switch (key) {
            case 'ArrowLeft':
                this.speedX = -MAX_SPEED;
                this.speedY = 0;
                break
            case 'ArrowRight':
                this.speedX = MAX_SPEED;
                this.speedY = 0;
                break
            case 'ArrowUp':
                this.speedY = -MAX_SPEED;
                this.speedX = 0
                break
            case 'ArrowDown':
                this.speedY = MAX_SPEED;
                this.speedX = 0
                break
        }
    }
}