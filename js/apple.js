class Apple {

    constructor() {
        this.x = null;
        this.y = null;
        this.scale = 15;
    }

    setLocation() {
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = Math.floor(Math.random() * canvas.height);
    }

    draw(ctx) {
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x, this.y, this.scale, this.scale);
    }
}