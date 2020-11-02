let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let boidCount = 500;
let boidSpeed = 0.75;
let visionRadius = 100;
let avoidRadius = 20;
let alignmentStrength = 1;
let cohesionStrength = 1;
let separationStrength = 0.25;

function normalize(x, y) {
    let magnitude = Math.sqrt(x ** 2 + y ** 2);
    return magnitude == 0 ? [x, y] : [x / magnitude, y / magnitude];
}

class Boid {
    static boids = [];

    constructor() {
        Boid.boids.push(this);

        this.position_x = Math.random() * canvas.width;
        this.position_y = Math.random() * canvas.height;

        let radian = Math.random() * Math.PI * 2;
        let [x, y] = normalize(Math.cos(radian), Math.sin(radian));

        this.velocity_x = x;
        this.velocity_y = y;
    }

    separation() {
        let separation_x = 0;
        let separation_y = 0;
        let flock_count = 0;

        for (let boid of Boid.boids) {
            if (boid != this) {
                let distance_x = Math.abs(boid.position_x - this.position_x);
                let distance_y = Math.abs(boid.position_y - this.position_y);
                let distance = Math.sqrt(distance_x ** 2 + distance_y ** 2);

                if (distance < avoidRadius) {
                    separation_x += boid.position_x - this.position_x;
                    separation_y += boid.position_y - this.position_y;
                    flock_count += 1;
                }
            }
        }

        if (flock_count == 0) return [0, 0];

        separation_x /= flock_count;
        separation_y /= flock_count;

        separation_x *= -1;
        separation_y *= -1;

        return [separation_x, separation_y];
    }

    alignment() {
        let alignment_x = 0;
        let alignment_y = 0;
        let flock_count = 0;

        for (let boid of Boid.boids) {
            if (boid != this) {
                let distance_x = Math.abs(boid.position_x - this.position_x);
                let distance_y = Math.abs(boid.position_y - this.position_y);
                let distance = Math.sqrt(distance_x ** 2 + distance_y ** 2);
                if (distance < visionRadius) {
                    alignment_x += boid.velocity_x;
                    alignment_y += boid.velocity_y;
                    flock_count += 1;
                }
            }
        }

        if (flock_count == 0) return [0, 0];

        alignment_x /= flock_count;
        alignment_y /= flock_count;

        return normalize(alignment_x, alignment_y);
    }

    cohesion() {
        let cohesion_x = 0;
        let cohesion_y = 0;
        let flock_count = 0;

        for (let boid of Boid.boids) {
            if (boid != this) {
                let distance_x = Math.abs(boid.position_x - this.position_x);
                let distance_y = Math.abs(boid.position_y - this.position_y);
                let distance = Math.sqrt(distance_x ** 2 + distance_y ** 2);
                if (distance < visionRadius) {
                    cohesion_x += boid.position_x;
                    cohesion_y += boid.position_y;
                    flock_count += 1;
                }
            }
        }

        if (flock_count == 0) return [0, 0];

        cohesion_x /= flock_count;
        cohesion_y /= flock_count;

        cohesion_x -= this.position_x;
        cohesion_y -= this.position_y;

        cohesion_x /= 100;
        cohesion_y /= 100;

        return normalize(cohesion_x, cohesion_y);
    }

    walls() {
        let walls_x = 0;
        let walls_y = 0;

        if (this.position_x < 0) {
            walls_x = 2;
        }

        if (this.position_x > canvas.width) {
            walls_x = -2;
        }

        if (this.position_y < 0) {
            walls_y = 2;
        }

        if (this.position_y > canvas.height) {
            walls_y = -2;
        }

        return [walls_x, walls_y];
    }

    update() {
        let [separation_x, separation_y] = this.separation();
        let [alignment_x, alignment_y] = this.alignment();
        let [cohesion_x, cohesion_y] = this.cohesion();
        let [walls_x, walls_y] = this.walls();

        this.velocity_x += (separation_x * separationStrength) + (alignment_x * alignmentStrength) + (cohesion_x * cohesionStrength) + walls_x;
        this.velocity_y += (separation_y * separationStrength) + (alignment_y * alignmentStrength) + (cohesion_y * cohesionStrength) + walls_y;

        [this.velocity_x, this.velocity_y] = normalize(this.velocity_x, this.velocity_y); 

        this.position_x += this.velocity_x * boidSpeed;
        this.position_y += this.velocity_y * boidSpeed;
    }
}


function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let boid of Boid.boids) {
        boid.update();
    }
    
    for (let boid of Boid.boids) {
        ctx.fillRect(boid.position_x + (boid.velocity_x * 10) - 2, boid.position_y + (boid.velocity_y * 10) - 2, 4, 4);
        ctx.fillRect(boid.position_x - 5, boid.position_y - 5, 10, 10);
    }
    
    requestAnimationFrame(update);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("load", function() {
    resizeCanvas();

    for (let i = 0; i < boidCount; i++) {
        new Boid();
    }
    
    requestAnimationFrame(update);
});

window.addEventListener("resize", resizeCanvas);