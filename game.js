const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    speed: 5,
    size: 20,
};

let obstacles = [];
let score = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && player.x - player.size > 0) {
        player.x -= player.speed;
    } else if (event.key === 'ArrowRight' && player.x + player.size < canvas.width) {
        player.x += player.speed;
    }
});

function spawnObstacle() {
    const size = Math.random() * 30 + 10;
    const position = Math.random() * (canvas.width - size);
    obstacles.push({ x: position, y: 0, size: size, speed: 2 });
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].size, obstacles[i].size);
        obstacles[i].y += obstacles[i].speed;

        // Collision detection
        if (player.x < obstacles[i].x + obstacles[i].size &&
            player.x + player.size > obstacles[i].x &&
            player.y < obstacles[i].y + obstacles[i].size &&
            player.y + player.size > obstacles[i].y) {
            // Restart the game
            player.x = canvas.width / 2;
            player.y = canvas.height - 50;
            obstacles = [];
            score = 0;
            alert('Game Over');
        }

        // Remove off-screen obstacles
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            i--;
            score++;
        }
    }

    ctx.fillText(`Score: ${score}`, 10, 10);

    requestAnimationFrame(updateGame);
}

setInterval(spawnObstacle, 2000);
updateGame();
