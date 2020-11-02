let canvas1 = document.querySelector(".first");
let canvas2 = document.querySelector(".second");
let ctx = canvas1.getContext("2d");
let ctx2 = canvas2.getContext("2d");

let outerRadius = 96;
let innerRadius = 45;
let radians = 0;

function c(x) { 
    let smaller = Math.min(canvas1.height, canvas1.width);
    return (x / Math.max(innerRadius, outerRadius)) * (smaller / 2.5);
}

function drawCircle(x, y, r) {
    x = c(x) + (canvas1.width / 2);
    y = c(y) + (canvas1.height / 2);
    r = c(r);

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawPoint(x, y) {
    x = c(x) + (canvas1.width / 2);
    y = c(y) + (canvas1.height / 2);

    ctx2.fillRect(x - 2, y - 2, 4, 4);
}

function rotatePoint(x0, y0, xc, yc, radians) {
    let x1 = (x0 - xc) * Math.cos(radians) - (y0 - yc) * Math.sin(radians) + xc;
    let y1 = (x0 - xc) * Math.sin(radians) + (y0 - yc) * Math.cos(radians) + yc;

    return [x1, y1];
}

function resizecanvas1() {
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
}
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

function drawcanvas1() {
    resizecanvas1();

    let [circleX, circleY] = rotatePoint(outerRadius - innerRadius, 0, 0, 0, radians);
    let [pointX, pointY] = rotatePoint(outerRadius, 0, 0, 0, radians);

    let otherRadians = (outerRadius * radians) / innerRadius;
    [pointX, pointY] = rotatePoint(pointX, pointY, circleX, circleY, otherRadians);
    
    drawCircle(0, 0, outerRadius);
    drawCircle(circleX, circleY, innerRadius);
    drawCircle(pointX, pointY, c(2));
    drawPoint(pointX, pointY);
    radians += 0.01;
}

setInterval(drawcanvas1, 1);

window.addEventListener("resize", drawcanvas1);
window.addEventListener("load", drawcanvas1);