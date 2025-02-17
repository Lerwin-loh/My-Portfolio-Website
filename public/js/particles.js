const canvas = document.getElementById('particle_canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

console.log(window.innerWidth)
if (window.innerWidth > 500) {
    canvas.style.width = `${window.innerWidth - 17}px`;
    canvas.style.height = `${window.innerHeight + 80}px`;
} else{
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight + 80}px`;
}


class Paricle {
    constructor(x, y, effect) {
        this.originX = x;
        this.originY = y;
        this.effect = effect;
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.ctx = this.effect.ctx;
        this.ctx.fillStyle = '#99c0dc';
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.1;
        this.friction = 0.95;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.force = 0;
        this.angle = 0;
        this.size = Math.floor(Math.random() * 2);
        this.draw();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillRect(this.x, this.y, this.size, this.size)
    }

    update() {
        this.dx = this.effect.mouse.x - this.x;
        this.dy = this.effect.mouse.y - this.y;
        this.distance = this.dx * this.dx + this.dy * this.dy;
        this.force = -this.effect.mouse.radius / this.distance * 4;

        if (this.distance < this.effect.mouse.radius) {
            this.angle = Math.atan2(this.dy, this.dx);
            this.vx += this.force * Math.cos(this.angle);
            this.vy += this.force * Math.sin(this.angle);
        }

        this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
        this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        this.draw()
    }
}


class Effect {
    constructor(width, height, context) {
        this.width = width;
        this.height = height;
        this.ctx = context;
        this.particlesArray = [];
        this.gap = 9;
        this.mouse = {
            radius: 7000,
            x: 0,
            y: 0
        };
        this.t = 0;
        
        var intervalout;
        var timeout;


        clearInterval(intervalout); 
        intervalout = setInterval(func =>{
            // Parametric equations for the infinity shape (lemniscate)
            if (window.innerWidth < 500) {
                var currentX = (window.innerWidth / 2) + (window.innerWidth + 100) * Math.cos(this.t);
                var currentY = (window.innerHeight / 2) + (window.innerHeight) * Math.sin(this.t) * Math.cos(this.t);
            } else{
                var currentX = (window.innerWidth / 2) + (window.innerWidth - 300) * Math.cos(this.t);
                var currentY = (window.innerHeight / 2) + (window.innerHeight - 300) * Math.sin(this.t) * Math.cos(this.t);
            }
            

            // Increment t to continue the movement
            this.t += 0.05;

            // Reset t for a full loop when it completes a cycle (2π)
            if (this.t > 2 * Math.PI) {
                this.t = 0;
            }
            this.mouse.x = currentX
            this.mouse.y = currentY
        }, 80);
        
        window.addEventListener('mousemove', e => {
            clearInterval(intervalout); 
            clearTimeout(timeout);
            timeout = setTimeout(func => { 
                // on mouse not moving for more than 1000 ms
                intervalout = setInterval(func =>{
                    // Parametric equations for the infinity shape (lemniscate)
                    if (window.innerWidth < 500) {
                        var currentX = (window.innerWidth / 2) + (window.innerWidth + 100) * Math.cos(this.t);
                        var currentY = (window.innerHeight / 2) + (window.innerHeight) * Math.sin(this.t) * Math.cos(this.t);
                    } else{
                        var currentX = (window.innerWidth / 2) + (window.innerWidth - 300) * Math.cos(this.t);
                        var currentY = (window.innerHeight / 2) + (window.innerHeight - 300) * Math.sin(this.t) * Math.cos(this.t);
                    }
                    

                    // Increment t to continue the movement
                    this.t += 0.05;

                    // Reset t for a full loop when it completes a cycle (2π)
                    if (this.t > 2 * Math.PI) {
                        this.t = 0;
                    }
                    this.mouse.x = currentX
                    this.mouse.y = currentY
                }, 80);
                
                // console.log("Hi",this.mouse.x, this.mouse.y); 
            }, 2000);
            
            // on mouse move
            this.mouse.x = e.clientX * window.devicePixelRatio + 15;
            this.mouse.y = e.pageY * window.devicePixelRatio - 30;
            // console.log (this.mouse.x, this.mouse.y, window.devicePixelRatio)
        })

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            this.width = canvas.width
            this.height = canvas.height
            if (window.innerWidth > 500) {
                canvas.style.width = `${window.innerWidth - 17}px`;
                canvas.style.height = `${window.innerHeight + 80}px`;
            } else{
                canvas.style.width = `${window.innerWidth}px`;
                canvas.style.height = `${window.innerHeight + 80}px`;
            }

            this.particlesArray = [];
            this.init();
        })
        this.init();
    }

    init() {
        for (let x = 0; x < this.width; x += this.gap) {
            for (let y = 0; y < this.height; y += this.gap) {
                this.particlesArray.push(new Paricle(x, y, this))
            }
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.particlesArray.length; i++) {
            this.particlesArray[i].update();
        }
    }
}

let effect = new Effect(canvas.width, canvas.height, ctx);
function animate() {
    effect.update();
    requestAnimationFrame(animate)
}
animate()

