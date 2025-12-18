const tg = window.Telegram.WebApp;
tg.expand();

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = { x: 140, y: 340, size: 20, vy: 0 };
let waves = [];
let score = 0;
let gravity = 0.8;

function jump() {
  if (player.y >= 340) player.vy = -12;
}

canvas.addEventListener("click", jump);

function spawnWave() {
  waves.push({ x: 300, y: 360, w: 30, h: 10 });
}

setInterval(spawnWave, 1500);

function update() {
  ctx.clearRect(0,0,300,400);

  player.vy += gravity;
  player.y += player.vy;
  if (player.y > 340) player.y = 340;

  ctx.fillStyle = "#00d2ff";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  ctx.fillStyle = "#ff4d4d";
  waves.forEach(w => {
    w.x -= 4;
    ctx.fillRect(w.x, w.y, w.w, w.h);

    if (
      player.x < w.x + w.w &&
      player.x + player.size > w.x &&
      player.y < w.y + w.h &&
      player.y + player.size > w.y
    ) {
      alert("Game Over! Score: " + score);
      location.reload();
    }
  });

  score++;
  document.getElementById("score").innerText = "Score: " + score;

  requestAnimationFrame(update);
}

update();
