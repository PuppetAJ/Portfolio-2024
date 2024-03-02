const canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// console.log(canvas.height);

const winWidth = window.innerWidth;
let dotCount;

winWidth > 1600
  ? (dotCount = 350)
  : winWidth > 1300
  ? (dotCount = 300)
  : winWidth > 1100
  ? (dotCount = 200)
  : winWidth > 800
  ? (dotCount = 100)
  : winWidth > 600
  ? (dotCount = 80)
  : (dotCount = 100);

const stars = [], // Array that contains the stars
  FPS = 60, // Frames per second
  dots = dotCount, // Number of stars
  mouse = {
    x: 0,
    y: 0,
  }; // mouse location

// Push stars to array

for (let i = 0; i < dots; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1 + 1,
    vx: Math.floor(Math.random() * 50) - 25,
    vy: Math.floor(Math.random() * 50) - 25,
  });
}

// Draw the scene
// o(n^2 + n) can this be done better?
function draw() {
  const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grd.addColorStop(0, "rgb(80, 102, 228");
  grd.addColorStop(1, "rgb(248, 108, 253");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "lighter";

  for (let i = 0, x = stars.length; i < x; i++) {
    const s = stars[i];

    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.stroke();
  }

  ctx.beginPath();
  for (let i = 0, x = stars.length; i < x; i++) {
    const starI = stars[i];
    ctx.moveTo(starI.x, starI.y);

    if (distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);

    for (let j = 0, x = stars.length; j < x; j++) {
      const starII = stars[j];
      if (distance(starI, starII) < 150) {
        ctx.lineTo(starII.x, starII.y);
      }
    }
  }
  ctx.lineWidth = 0.05;
  ctx.strokeStyle = grd;
  ctx.stroke();
}

function distance(point1, point2) {
  let xs = 0;
  let ys = 0;

  xs = point2.x - point1.x;
  xs = xs * xs;

  ys = point2.y - point1.y;
  ys = ys * ys;

  return Math.sqrt(xs + ys);
}

// Update star locations
function update() {
  for (let i = 0, x = stars.length; i < x; i++) {
    const s = stars[i];

    s.x += s.vx / FPS;
    s.y += s.vy / FPS;

    if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
    if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
  }
}

const rect = canvas.getBoundingClientRect();
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

// Update and draw

function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}

tick();
