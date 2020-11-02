let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

function drawPoint(x, y) {
    ctx.fillRect(x + (canvas.width / 2) - 2, y + (canvas.height / 2) - 2, 4, 4);
}

function rotatePoint(x0, y0, xc, yc, radians) {
    let x1 = (x0 - xc) * Math.cos(radians) - (y0 - yc) * Math.sin(radians) + xc;
    let y1 = (x0 - xc) * Math.sin(radians) + (y0 - yc) * Math.cos(radians) + yc;

    return [x1, y1];
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let factor = 0.5;
function drawCanvas() {
    resizeCanvas();

    let start_x = 0;
    let start_y = 5;

    for (let i = 0; i < 1000; i++) {
        let rotation = factor * i;
        let [point_x, point_y] = rotatePoint(start_x, start_y + Math.floor(rotation / 1) * 2, 0, 0, (Math.PI * 2 * rotation));
        drawPoint(point_x, point_y);
    }
    factor += 0.0001;
    requestAnimationFrame(drawCanvas);
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", drawCanvas);