let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let points = document.querySelector("#points");
let rotation = document.querySelector("#rotation");

points.value = 1000;
rotation.value = 3.14159;

function drawPoint(x, y) {
    ctx.fillRect(x + (canvas.width / 2) - 2, y + (canvas.height / 2) - 2, 4, 4);
}

function rotatePoint(x0, y0, xc, yc, radians) {
    let x1 = (x0 - xc) * Math.cos(radians) - (y0 - yc) * Math.sin(radians) + xc;
    let y1 = (x0 - xc) * Math.sin(radians) + (y0 - yc) * Math.cos(radians) + yc;

    return [x1, y1];
}

function resizeCanvas() {
    let computed = window.getComputedStyle(canvas);
    
    canvas.width = parseInt(computed.getPropertyValue("width"), 10);
    canvas.height = parseInt(computed.getPropertyValue("height"), 10);
}


function drawCanvas() {
    resizeCanvas();
    let factor = rotation.value % 1;

    let start_x = 0;
    let start_y = 5;

    for (let i = 0; i < points.value; i++) {
        let rotation = factor * i;
        let [point_x, point_y] = rotatePoint(start_x, start_y + Math.floor(rotation / 1) * 2, 0, 0, (Math.PI * 2 * rotation));
        drawPoint(point_x, point_y);
    }
}

points.addEventListener("input", drawCanvas);
rotation.addEventListener("input", drawCanvas);

window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", drawCanvas);