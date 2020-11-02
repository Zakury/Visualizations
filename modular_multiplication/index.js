// var multiplierAnimation = document.querySelector("#multiplierAnimation"),
//     pointsAnimation = document.querySelector("#pointsAnimation"),
    // multiplierAnimationID = null,
    // pointsAnimationID = null,
var    multiplier = document.querySelector("#multiplier"),
    points = document.querySelector("#points"),
    canvas = document.querySelector("canvas");

multiplier.value = 4;
points.value = 40;

let ctx = canvas.getContext("2d");

function rotatePoint(x, y, degrees) {
    let rad = degrees * (Math.PI / 180);
    let cos = Math.cos(rad);
    let sin = Math.sin(rad);

    return { 
        x: (x * cos) - (y * sin),
        y: (x * sin) - (y * cos)  
    };
}

let {x, y} = rotatePoint(0, 1, 180);

function resizeCanvas() {
    let computed = window.getComputedStyle(canvas);

    canvas.width = parseInt(computed.getPropertyValue("width"), 10);
    canvas.height = parseInt(computed.getPropertyValue("height"), 10);

    renderCanvas();
}

function updateValues() {
    if (points.value > 1000) {
        points.value = 1000;
    }

    if (points.value < 0) {
        points.value = 0;
    }

    renderCanvas();
}

function renderCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let start = {
        x: 0,
        y: Math.min(canvas.height / 2.5, canvas.width / 2.5)
    }

    for (let i = 0; i < points.value; i++) {
        let point1 = rotatePoint(start.x, start.y, i * (360 / points.value));
        let point2 = rotatePoint(start.x, start.y, (i * multiplier.value) % points.value * (360 / points.value));

        ctx.fillRect(point1.x + (canvas.width / 2) - 2, point1.y + (canvas.height / 2) - 2, 4, 4);

        // ctx.strokeStyle = "#" + Math.floor(Math.random()*16777215).toString(16);;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(point1.x + (canvas.width / 2), point1.y + (canvas.height / 2));
        ctx.lineTo(point2.x + (canvas.width / 2), point2.y + (canvas.height / 2));
        ctx.stroke();
    }
}

// function multiplierStep() {
//     multiplier.value = parseFloat(multiplier.value) + 0.05
//     updateValues();
// }

// function pointsStep() {
//     points.value = parseFloat(points.value) + 0.05;
//     updateValues();
// }

// multiplierAnimation.addEventListener("click", () => {
//     if (multiplierAnimationID === null) {
//         multiplierAnimationID = setInterval(multiplierStep, 20);
//         multiplierAnimation.innerHTML = "Stop Animation";
//     } else {
//         clearInterval(multiplierAnimationID);
//         multiplierAnimationID = null;
//         multiplierAnimation.innerHTML = "Start Animation"
//     }
// });

// pointsAnimation.addEventListener("click", () => {
//     if (pointsAnimationID === null) {
//         pointsAnimationID = setInterval(pointsStep, 20);
//         pointsAnimation.innerHTML = "Stop Animation";
//     } else {
//         clearInterval(pointsAnimationID);
//         pointsAnimationID = null;
//         pointsAnimation.innerHTML = "Start Animation"
//     }
// });

// TODO: ADD COLORS NERD!
// TODO: Differnt base shapes?
multiplier.addEventListener("input", renderCanvas);
points.addEventListener("input", updateValues);

window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", resizeCanvas);