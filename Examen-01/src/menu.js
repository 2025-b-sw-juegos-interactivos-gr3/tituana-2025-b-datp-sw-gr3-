// ==================== MENÚ MODULE ====================

export function initMenu() {
  const startButton = document.querySelector('.start-button');
  const restartButton = document.querySelector('.restart-button');
  
  if (startButton) {
    startButton.addEventListener('click', startGame);
  }
  if (restartButton) {
    restartButton.addEventListener('click', restartGame);
  }
}

export function startGame() {
  const mainMenu = document.getElementById('mainMenu');
  if (mainMenu) {
    mainMenu.classList.add('hidden');
  }
}

export function showVictoryScreen() {
  const victoryScreen = document.getElementById('victoryScreen');
  if (victoryScreen) {
    victoryScreen.classList.remove('hidden');
  }
}

export function restartGame() {
  window.location.reload();
}
