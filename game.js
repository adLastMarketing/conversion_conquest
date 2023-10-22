// ... [PREVIOUS CODE]

let powerUps = [];
let powerUpChance = 0.1; // 10% chance to spawn a power-up instead of an obstacle

// ... [EXISTING spawnObstacle FUNCTION]

function spawnPowerUp() {
    const size = 30;
    const position = Math.random() * (canvas.width - size);
    powerUps.push({ x: position, y: 0, size: size, speed: 2, type: Math.random() > 0.5 ? 'rocket' : 'token' });
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Draw obstacles
    for (let i = 0; i < obstacles.length; i++) {
        // ... [PREVIOUS OBSTACLE CODE]

        // Detect collision with power-ups
        for (let j = 0; j < powerUps.length; j++) {
            if (player.x < powerUps[j].x + powerUps[j].size &&
                player.x + player.size > powerUps[j].x &&
                player.y < powerUps[j].y + powerUps[j].size &&
                player.y + player.size > powerUps[j].y) {
                
                if (powerUps[j].type === 'rocket') {
                    score += 10;
                } else if (powerUps[j].type === 'token') {
                    player.size += 5;
                    setTimeout(() => { player.size -= 5; }, 5000);  // Increase size for 5 seconds
                }

                powerUps.splice(j, 1);
                j--;
            }
        }
    }

    // Draw power-ups
    for (let i = 0; i < powerUps.length; i++) {
        if (powerUps[i].type === 'rocket') {
            ctx.fillStyle = 'green';
        } else if (powerUps[i].type === 'token') {
            ctx.fillStyle = 'gold';
        }
        ctx.fillRect(powerUps[i].x, powerUps[i].y, powerUps[i].size, powerUps[i].size);
        powerUps[i].y += powerUps[i].speed;

        // Remove off-screen power-ups
        if (powerUps[i].y > canvas.height) {
            powerUps.splice(i, 1);
            i--;
        }
    }

    // Update score
    document.getElementById('scoreBoard').innerText = `Score: ${score}`;

    requestAnimationFrame(updateGame);
}

// Adjusted spawn logic to sometimes spawn power-ups
function spawnEntity() {
    if (Math.random() < powerUpChance) {
        spawnPowerUp();
    } else {
        spawnObstacle();
    }
}

setInterval(spawnEntity, 2000);
updateGame();
