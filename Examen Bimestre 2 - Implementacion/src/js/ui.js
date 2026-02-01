/* ============================================
   JUMP KING - FUNCIONES DE INTERFAZ DE USUARIO
   ============================================ */

// ============================================
// FUNCIONES DEL MENÚ
// ============================================

function startGame() {
    // Reiniciar variables del juego
    currentLevel = 1;
    playerX = 185;
    playerY = 490;
    velocityY = 0;
    velocityX = 0;
    isOnGround = true;
    gameActive = true;
    bestHeight = 0;
    totalScore = 0;
    
    // Mostrar juego, ocultar menú
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('gameWrapper').style.display = 'flex';
    document.getElementById('gameOver').style.display = 'none';
    
    // Generar primer nivel
    generatePlatforms(currentLevel);
    updateHUD();
}

function showInstructions() {
    document.getElementById('instructionsModal').style.display = 'flex';
}

function closeInstructions() {
    document.getElementById('instructionsModal').style.display = 'none';
}

function goToMenu() {
    // Resetear juego
    gameActive = false;
    
    // Ocultar juego, mostrar menú
    document.getElementById('gameWrapper').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'flex';
    document.getElementById('instructionsModal').style.display = 'none';
}

// ============================================
// FUNCIONES DEL HUD
// ============================================

function updateHUD() {
    levelDisplay.textContent = currentLevel;
}

console.log('Sistema de UI cargado correctamente');
