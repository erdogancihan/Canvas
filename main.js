const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 1;
let hue = 50;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  hue = (hue + 1) % 360;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) direction=!direction;
  console.log(direction)
  direction ? ctx.lineWidth++ : ctx.lineWidth--;

  [lastX, lastY] = [e.offsetX, e.offsetY];
}

document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", e => {
  [lastX, lastY] = [e.offsetX, e.offsetY];
  isDrawing = true;
});
document.addEventListener("mouseup", () => (isDrawing = false));
document.addEventListener("mouseout", () => (isDrawing = false));
