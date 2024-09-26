const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 8;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.size = Math.random() * 200 + 50;
        this.speed = Math.random() * 2 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        [this.x, this.y] = this.getStartPosition();
    }

    getStartPosition() {
        const edge = Math.floor(Math.random() * 4);
        switch(edge) {
            case 0: // Top
                return [Math.random() * canvas.width, -this.size];
            case 1: // Right
                return [canvas.width + this.size, Math.random() * canvas.height];
            case 2: // Bottom
                return [Math.random() * canvas.width, canvas.height + this.size];
            case 3: // Left
                return [-this.size, Math.random() * canvas.height];
        }
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        // Check if the particle is completely off-screen
        if (this.x < -this.size || this.x > canvas.width + this.size || 
            this.y < -this.size || this.y > canvas.height + this.size) {
            // Reset all parameters
            this.reset();
            // Set new angle towards a random point on the screen
            const targetX = Math.random() * canvas.width;
            const targetY = Math.random() * canvas.height;
            this.angle = Math.atan2(targetY - this.y, targetX - this.x);
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, 0.01)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let particle of particles) {
        particle.update();
        particle.draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});