// ==================== HUD MODULE ====================

import { showVictoryScreen } from './menu.js';

export function updateHUD(gameState) {
  const statusDiv = document.getElementById('status');
  const objectiveUl = document.querySelector('#objective ul');
  
  if (gameState.briefcaseInHand) {
    statusDiv.textContent = '🕵️ ESTADO: MALETÍN EN MANO - Diríjete a la casa de seguridad';
    statusDiv.style.color = '#ff0000';
  } else if (gameState.briefcaseDelivered) {
    statusDiv.textContent = '✓ MISIÓN COMPLETADA - ¡Maletín entregado en la casa de seguridad!';
    statusDiv.style.color = '#00ff00';
    
    if (objectiveUl) {
      const items = objectiveUl.querySelectorAll('li');
      items.forEach(item => item.classList.add('completed'));
    }
    
    // Mostrar pantalla de victoria después de 1 segundo
    setTimeout(() => {
      showVictoryScreen();
    }, 1000);
  } else {
    statusDiv.textContent = '🎯 ESTADO: Busca el maletín secreto - Zona de recogida marcada en AMARILLO';
    statusDiv.style.color = '#ffff00';
  }
}
