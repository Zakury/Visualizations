let canvas = document.querySelector("canvas");
let counter = document.querySelector(".counter");
let ctx = canvas.getContext("2d");
let collisions = 0;


let digits = 4;
// let steps = 10000;

let x1 = 100;
let x2 = 300;

let m1 = 1;
let m2 = 100 ** (digits - 1);

let v1 = 0;
let v2 = -1;

let speed = 200;


function render() {
    let computed = window.getComputedStyle(canvas);
    
    canvas.width = parseInt(computed.getPropertyValue("width"), 10);
    canvas.height = parseInt(computed.getPropertyValue("height"), 10);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillRect(x1, (canvas.height / 2) - 50, 100, 100);
    ctx.fillRect(x2, (canvas.height / 2) - 50, 100, 100);

    counter.innerHTML = collisions; 
}

let lastTime = new Date().getTime();

function step() {
    let steps = 100000;
    for (let i = 0; i < steps; i++) {
        let dt = (new Date().getTime() - lastTime) / 1000;
        
        if (Math.abs(x1 - x2) > v1 + v2) {
            x1 += v1 * dt * speed / steps;
            x2 += v2 * dt * speed / steps;
        } else {
            x1 = Math.abs(x1 - x2) / (v1 + v2);
            x2 = Math.abs(x1 - x2) / (v1 + v2);
        }
        
        if (Math.abs(x1 - x2) < 100) {
            let sum = m1 + m2;
            let nv1 = (((m1 - m2) / sum) * v1) + (((2 * m2) / sum) * v2);
            let nv2 = (((2 * m1) / sum) * v1) + (((m2 - m1) / sum * v2));
            
            v1 = nv1;
            v2 = nv2;
            collisions += 1;
        }

        if (x2 < 100) {
            x2 += 100 - x2;
        }


        if (x1 + 100 > x2) {
            x1 -= (x1 + 100) - x2
        }

        if (x1 < 0) {
            x1 = 0;
            v1 = -v1;

            collisions += 1;
        }
    }
    render();
    lastTime = new Date().getTime();
    window.requestAnimationFrame(step);
}
  
window.requestAnimationFrame(step);
window.addEventListener("resize", render);