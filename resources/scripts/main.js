// CREDIT FOR ORIGINAL CODE:
// https://codepen.io/hakimel/pen/QdWpRv?utm_source=extension&utm_medium=click&utm_campaign=muzli

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let time = 0,
  velocity = 0.1,
  velocityTarget = 0.01,
  width,
  height,
  lastX,
  lastY,
  r1;

// Spacing options
// 4, 5, 6, 8,

// 0.9
const MAX_OFFSET = 450;
const SPACING = 4;
const POINTS = Math.floor(MAX_OFFSET / SPACING);
const PEAK = MAX_OFFSET;
const POINTS_PER_LAP = 5;
const SHADOW_STRENGTH = 10;

setup();

function setup() {
  resize();
  step();

  window.addEventListener("resize", resize);
  window.addEventListener("mousedown", onMouseDown);
  document.addEventListener("touchstart", onTouchStart);
}

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  if (window.innerWidth > 1500) {
    r1 = window.innerWidth * 0.5;
  } else if (window.innerWidth <= 1500 && window.innerWidth > 1000) {
    r1 = 700;
  } else if (window.innerWidth <= 1000) {
    r1 = 450;
  }
}

function step() {
  time += velocity;
  velocity += (velocityTarget - velocity) * 0.3;

  clear();
  render();

  requestAnimationFrame(step);
}

function clear() {
  context.clearRect(0, 0, width, height);
}

function render() {
  let x,
    y,
    cx = width / 2,
    cy = height / 2;

  // Gradient
  grd = context.createRadialGradient(cx, cy, r1, width, height, 30);

  grd.addColorStop(0.5, "rgb(248, 108, 253");
  grd.addColorStop(0.6, "rgb(80, 102, 228");
  grd.addColorStop(0.2, "rgb(80, 102, 228");

  context.globalCompositeOperation = "lighter";
  context.strokeStyle = grd;
  context.shadowColor = grd;
  context.lineWidth = 2;
  context.beginPath();

  // 112

  for (let i = POINTS; i > 0; i--) {
    let value = i * SPACING + (time % SPACING);

    const ax = Math.sin(value / POINTS_PER_LAP) * Math.PI,
      ay = Math.cos(value / POINTS_PER_LAP) * Math.PI * 0.9;

    (x = ax * value), (y = ay * value * 0.35);

    const o = 1 - Math.floor(PEAK / PEAK);

    y -= Math.pow(o, 2) * 200;
    y += (200 * value) / MAX_OFFSET;
    y += (x / cx) * width * 0.1;

    y -= 15;

    y = Math.floor(y);
    if (i === 112) {
      y = cy;
    }

    // const center = Math.floor(POINTS / 2);
    // if (i === center) {
    //   y = cy;
    // }

    context.globalAlpha = 1 - value / MAX_OFFSET;
    context.shadowBlur = SHADOW_STRENGTH * o;

    context.lineTo(cx + x, cy + y);
    context.stroke();

    context.beginPath();
    context.moveTo(cx + x, cy + y);
  }

  // context.lineTo(cx, cy - 500);
  // context.lineTo(cx, 0);
  // context.stroke();
}

function onMouseDown(event) {
  lastX = event.clientX;
  lastY = event.clientY;

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(event) {
  let vx = (event.clientX - lastX) / 100;
  let vy = (event.clientY - lastY) / 100;

  if (event.clientY < height / 2) vx *= -1;
  if (event.clientX > width / 2) vy *= -1;

  velocityTarget = vx + vy;

  lastX = event.clientX;
  lastY = event.clientY;
}

function onMouseUp() {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}

function onTouchStart(event) {
  event.preventDefault();

  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;

  document.addEventListener("touchmove", onTouchMove);
  document.addEventListener("touchend", onTouchEnd);
}

function onTouchMove(event) {
  let vx = (event.touches[0].clientX - lastX) / 100;
  let vy = (event.touches[0].clientY - lastY) / 100;

  if (event.touches[0].clientY < height / 2) vx *= -1;
  if (event.touches[0].clientX > width / 2) vy *= -1;

  velocityTarget = vx + vy;

  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;
}

function onTouchEnd() {
  document.removeEventListener("touchmove", onTouchMove);
  document.removeEventListener("touchend", onTouchEnd);
}
