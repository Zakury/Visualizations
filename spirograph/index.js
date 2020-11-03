let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let outerRadius = document.querySelector("#radius2");
let innerRadius = document.querySelector("#radius1");
let points = document.querySelector("#points");

outerRadius.value = 10;
innerRadius.value = 4;
points.value = 10000;

let radians = 0;

function c(x) { 
    // let smaller = Math.min(canvas.height, canvas.width);
    return (x / Math.max(innerRadius.value, outerRadius.value)) * (canvas.height / 2.5);
}

function drawCircle(x, y, r) {
    x = c(x) + (canvas.width / 2);
    y = c(y) + (canvas.height / 2);
    r = c(r);

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawPoint(x, y) {
    x = c(x) + (canvas.width / 2);
    y = c(y) + (canvas.height / 2);

    ctx.fillRect(x - 2, y - 2, 4, 4);
}

function rotatePoint(x0, y0, xc, yc, radians) {
    let x1 = (x0 - xc) * Math.cos(radians) - (y0 - yc) * Math.sin(radians) + xc;
    let y1 = (x0 - xc) * Math.sin(radians) + (y0 - yc) * Math.cos(radians) + yc;

    return [x1, y1];
}

function resizecanvas() {
    let computed = window.getComputedStyle(canvas);
    
    canvas.width = parseInt(computed.getPropertyValue("width"), 10);
    canvas.height = parseInt(computed.getPropertyValue("height"), 10);
}

function drawcanvas() {
    resizecanvas();
    radians = 0;
    for (let i = 0; i < points.value; i++) {
        let [circleX, circleY] = rotatePoint(outerRadius.value - innerRadius.value, 0, 0, 0, radians);
        let [pointX, pointY] = rotatePoint(outerRadius.value, 0, 0, 0, radians);

        let otherRadians = (outerRadius.value * radians) / innerRadius.value;
        [pointX, pointY] = rotatePoint(pointX, pointY, circleX, circleY, otherRadians);
        
        // drawCircle(0, 0, outerRadius.value);
        // drawCircle(circleX, circleY, innerRadius.value);
        // drawCircle(pointX, pointY, c(2));
        drawPoint(pointX, pointY);
        radians += 0.01;
    }
}

innerRadius.addEventListener("input", drawcanvas);
outerRadius.addEventListener("input", drawcanvas);
points.addEventListener("input", drawcanvas);

window.addEventListener("resize", drawcanvas);
window.addEventListener("load", drawcanvas);