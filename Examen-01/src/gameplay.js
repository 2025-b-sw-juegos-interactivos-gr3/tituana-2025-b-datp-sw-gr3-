// ==================== GAMEPLAY MODULE ====================

export function initGameplay(scene, player, briefcase, walls, gameState) {
  return {
    checkWallCollision,
    checkProximity,
    updateProximityDetection
  };

  function checkWallCollision(x, z, radius = 1) {
    for (let wall of walls) {
      const dx = x - wall.x;
      const dz = z - wall.z;
      
      // Calcular si hay colisión (AABB - Axis-Aligned Bounding Box)
      if (Math.abs(dx) < wall.width / 2 + radius &&
          Math.abs(dz) < wall.depth / 2 + radius) {
        return true;
      }
    }
    return false;
  }

  function checkProximity(pos1, pos2, distance) {
    const BABYLON = window.BABYLON;
    return BABYLON.Vector3.Distance(pos1, pos2) < distance;
  }

  function updateProximityDetection(player, gameState, pickupZone, deliveryZone) {
    const BABYLON = window.BABYLON;
    const distToBriefcase = BABYLON.Vector3.Distance(player.position, pickupZone.position) < 3;
    gameState.canPickup = distToBriefcase && !gameState.briefcaseInHand;

    const distToDelivery = BABYLON.Vector3.Distance(player.position, deliveryZone.position) < 3;
    gameState.canDeliver = distToDelivery && gameState.briefcaseInHand;
  }
}
