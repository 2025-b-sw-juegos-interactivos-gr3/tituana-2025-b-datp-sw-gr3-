/* ============================================
   JUMP KING - LÓGICA PRINCIPAL DEL JUEGO
   ============================================ */

// Configuración del juego
const gameContainer = document.getElementById('gameContainer');
const player = document.getElementById('player');
const levelDisplay = document.getElementById('levelDisplay');
const gameOverScreen = document.getElementById('gameOver');
const gameOverTitle = document.getElementById('gameOverTitle');
const finalScoreDisplay = document.getElementById('finalScore');
const levelReachedDisplay = document.getElementById('levelReached');
const jumpSound = document.getElementById('jumpSound');

// ============================================
// PROPIEDADES DEL JUGADOR
// ============================================

const playerSize = 60;
let playerX = 220;
let playerY = 650;
let velocityY = 0;
let velocityX = 0;

// ============================================
// CONSTANTES DE FÍSICA
// ============================================

const gravity = 0.6;
const jumpPower = 15;
const moveSpeed = 5;

// ============================================
// ESTADO DEL JUEGO
// ============================================

let isOnGround = true;
let maxHeightReached = 0;
let gameActive = true;
let currentLevel = 1;
let totalScore = 0;
let bestHeight = 0;

// ============================================
// PLATAFORMAS
// ============================================

let platforms = [];
const platformWidth = 100;
const platformHeight = 20;

// Configuración de niveles fijos
const levelConfigs = [
    {
        platforms: [
            {x: 200, y: 693, width: 100, height: 20},
            {x: 125, y: 573, width: 100, height: 20},
            {x: 300, y: 467, width: 100, height: 20},
            {x: 200, y: 360, width: 100, height: 20},
            {x: 100, y: 253, width: 100, height: 20},
            {x: 325, y: 147, width: 100, height: 20},
        ]
    },
    {
        platforms: [
            {x: 200, y: 693, width: 100, height: 20},
            {x: 150, y: 547, width: 100, height: 20},
            {x: 250, y: 440, width: 100, height: 20},
            {x: 100, y: 320, width: 100, height: 20},
            {x: 300, y: 200, width: 100, height: 20},
            {x: 200, y: 80, width: 100, height: 20},
        ]
    },
    {
        platforms: [
            {x: 200, y: 693, width: 100, height: 20},
            {x: 50, y: 533, width: 100, height: 20},
            {x: 350, y: 413, width: 100, height: 20},
            {x: 175, y: 267, width: 100, height: 20},
            {x: 325, y: 133, width: 100, height: 20},
        ]
    },
    {
        platforms: [
            {x: 200, y: 693, width: 100, height: 20},
            {x: 125, y: 520, width: 100, height: 20},
            {x: 325, y: 387, width: 100, height: 20},
            {x: 75, y: 240, width: 100, height: 20},
            {x: 300, y: 93, width: 100, height: 20},
        ]
    },
    {
        platforms: [
            {x: 200, y: 693, width: 100, height: 20},
            {x: 350, y: 520, width: 100, height: 20},
            {x: 75, y: 400, width: 100, height: 20},
            {x: 250, y: 253, width: 100, height: 20},
            {x: 125, y: 107, width: 100, height: 20},
        ]
    },
    {
        platforms: [
            {x: 200, y: 693, width: 100, height: 20},
            {x: 50, y: 520, width: 100, height: 20},
            {x: 300, y: 373, width: 100, height: 20},
            {x: 150, y: 227, width: 100, height: 20},
            {x: 350, y: 67, width: 100, height: 20},
        ]
    },
    {
        platforms: [
            {x: 200, y: 693, width: 100, height: 20},
            {x: 325, y: 547, width: 100, height: 20},
            {x: 100, y: 413, width: 100, height: 20},
            {x: 300, y: 253, width: 100, height: 20},
            {x: 75, y: 107, width: 100, height: 20},
        ]
    },
    {
        platforms: [
            {x: 200, y: 693, width: 100, height: 20},
            {x: 150, y: 547, width: 100, height: 20},
            {x: 325, y: 413, width: 100, height: 20},
            {x: 50, y: 267, width: 100, height: 20},
            {x: 275, y: 120, width: 100, height: 20},
        ]
    },
    {
        platforms: [
            {x: 200, y: 693, width: 100, height: 20},
            {x: 350, y: 560, width: 100, height: 20},
            {x: 100, y: 427, width: 100, height: 20},
            {x: 250, y: 280, width: 100, height: 20},
            {x: 125, y: 133, width: 100, height: 20},
        ]
    },
    {
        platforms: [
            {x: 200, y: 693, width: 100, height: 20},
            {x: 50, y: 560, width: 100, height: 20},
            {x: 325, y: 440, width: 100, height: 20},
            {x: 125, y: 320, width: 100, height: 20},
            {x: 350, y: 200, width: 100, height: 20},
            {x: 75, y: 67, width: 100, height: 20},
        ]
    }
];

// ============================================
// FUNCIONES DE PLATAFORMAS
// ============================================

function generatePlatforms(level) {
    platforms = [];
    
    const levelIndex = Math.min(level - 1, levelConfigs.length - 1);
    const levelConfig = levelConfigs[levelIndex];
    
    platforms = levelConfig.platforms.map(p => ({...p}));
    
    // Plataforma grande solo en el nivel 1
    if (currentLevel === 1) {
        platforms.push({
            x: 50,
            y: 733,
            width: 400,
            height: 27
        });
    }

    // Cambiar background según el nivel
    gameContainer.className = `level${currentLevel}`;
    
    renderPlatforms();
}

function renderPlatforms() {
    document.querySelectorAll('.platform').forEach(p => p.remove());

    platforms.forEach(platform => {
        const platformDiv = document.createElement('div');
        platformDiv.className = 'platform';
        platformDiv.style.left = platform.x + 'px';
        platformDiv.style.top = platform.y + 'px';
        platformDiv.style.width = platform.width + 'px';
        platformDiv.style.height = platform.height + 'px';
        gameContainer.appendChild(platformDiv);
    });
}

// ============================================
// DETECCIÓN DE COLISIONES
// ============================================

function checkCollisions() {
    let onGround = false;

    platforms.forEach(platform => {
        // AABB Collision Detection
        const playerLeft = playerX;
        const playerRight = playerX + playerSize;
        const playerTop = playerY;
        const playerBottom = playerY + playerSize;

        const platformLeft = platform.x;
        const platformRight = platform.x + platform.width;
        const platformTop = platform.y;
        const platformBottom = platform.y + platform.height;

        // Verificar si hay colisión
        if (playerRight > platformLeft && playerLeft < platformRight &&
            playerBottom > platformTop && playerTop < platformBottom) {

            // Colisión desde arriba (aterrizaje)
            if (velocityY >= 0) {
                playerY = platformTop - playerSize;
                velocityY = 0;
                onGround = true;
            }
            // Colisión desde abajo
            else if (velocityY < 0 && playerTop < platformBottom + 10) {
                playerY = platformBottom;
                velocityY = 0;
            }
            // Colisión desde la izquierda
            else if (velocityX > 0) {
                playerX = platformLeft - playerSize;
                velocityX = 0;
            }
            // Colisión desde la derecha
            else if (velocityX < 0) {
                playerX = platformRight;
                velocityX = 0;
            }
        }
    });

    isOnGround = onGround;

    // Comprobar si cayó fuera de los límites
    if (playerY > gameContainer.offsetHeight) {
        if (currentLevel > 1) {
            prevLevel();
        } else {
            endGame(false);
        }
    }

    // Comprobar si llegó al tope (siguiente nivel)
    if (playerY < 0) {
        nextLevel();
    }
}

// ============================================
// MECÁNICAS DE SALTO
// ============================================

function jump() {
    if (isOnGround) {
        velocityY = -jumpPower;
        isOnGround = false;
        
        // Reproducir sonido de salto
        jumpSound.currentTime = 0;
        jumpSound.play().catch(err => console.log('Sonido no disponible'));
    }
}

// ============================================
// ACTUALIZACIÓN DEL JUGADOR
// ============================================

function updatePlayer() {
    if (!gameActive) return;

    // Aplicar gravedad
    velocityY += gravity;

    // Limitar velocidad máxima
    if (velocityY > 20) velocityY = 20;

    // Movimiento horizontal
    velocityX = 0;
    if (keys['ArrowLeft']) {
        velocityX = -moveSpeed;
    }
    if (keys['ArrowRight']) {
        velocityX = moveSpeed;
    }

    // Actualizar posición
    playerX += velocityX;
    playerY += velocityY;

    // Envolvimiento de pantalla
    if (playerX + playerSize < 0) {
        playerX = gameContainer.offsetWidth;
    }
    if (playerX > gameContainer.offsetWidth) {
        playerX = -playerSize;
    }

    // Registrar altura
    const currentHeight = Math.max(0, 600 - playerY);
    const levelHeight = currentHeight + (currentLevel - 1) * 600;
    totalScore = Math.max(totalScore, levelHeight);
    if (levelHeight > bestHeight) {
        bestHeight = levelHeight;
    }
    
    levelDisplay.textContent = currentLevel;

    // Verificar colisiones
    checkCollisions();

    // Actualizar posición visual
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
}

// ============================================
// CONTROL DE ENTRADA
// ============================================

const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;

    // Saltar con espacio o W
    if (e.key === ' ' || e.key === 'w' || e.key === 'W') {
        jump();
        e.preventDefault();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// ============================================
// PROGRESIÓN DE NIVELES
// ============================================

function nextLevel() {
    // Verificar si es el final del juego (nivel 10)
    if (currentLevel >= 10) {
        gameActive = false;
        gameOverScreen.style.display = 'block';
        gameOverTitle.textContent = 'GANASTE';
        finalScoreDisplay.textContent = 'Completaste todos los 10 niveles';
        levelReachedDisplay.textContent = 'Dificultad Final: Nivel 10';
        return;
    }
    
    // Cambio instantáneo de nivel
    currentLevel++;
    playerX = 185;
    playerY = 490;
    velocityY = 0;
    velocityX = 0;
    isOnGround = true;
    generatePlatforms(currentLevel);
}

function prevLevel() {
    if (currentLevel > 1) {
        // Cambio instantáneo de nivel
        currentLevel--;
        playerX = 185;
        playerY = 490;
        velocityY = 0;
        velocityX = 0;
        isOnGround = true;
        generatePlatforms(currentLevel);
    }
}

// ============================================
// FIN DEL JUEGO
// ============================================

function endGame(won = false) {
    gameActive = false;
    gameOverScreen.style.display = 'block';
    finalScoreDisplay.textContent = `Altura final: ${Math.floor(totalScore / 20)}m`;
    levelReachedDisplay.textContent = `Nivel alcanzado: ${currentLevel}`;
    if (won) {
        gameOverTitle.textContent = 'GANASTE';
    } else {
        gameOverTitle.textContent = 'GAME OVER';
    }
}

// ============================================
// BUCLE PRINCIPAL DEL JUEGO
// ============================================

function gameLoop() {
    updatePlayer();
    requestAnimationFrame(gameLoop);
}

// Inicializar juego
generatePlatforms(currentLevel);
isOnGround = true;
gameLoop();

console.log('Juego Jump King inicializado correctamente');
