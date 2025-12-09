// ==================== PLAYER MODULE ====================

export async function loadPlayer(scene) {
  const BABYLON = window.BABYLON;
  
  return new Promise((resolve) => {
    BABYLON.SceneLoader.ImportMesh(
      '',
      '/models/',
      'Personaje.glb',
      scene,
      (meshes) => {
        const player = new BABYLON.TransformNode('playerContainer', scene);
        
        meshes.forEach(mesh => {
          mesh.parent = player;
        });
        
        player.position = new BABYLON.Vector3(0, 0, 0);
        player.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);
        
        resolve(player);
      }
    );
  });
}

export function createBriefcase(scene) {
  const BABYLON = window.BABYLON;
  
  const briefcase = BABYLON.MeshBuilder.CreateBox('briefcase', { width: 0.4, height: 0.3, depth: 0.2 }, scene);
  briefcase.position = new BABYLON.Vector3(0, 0.5, 0);
  
  const briefcaseMat = new BABYLON.StandardMaterial('briefcaseMat', scene);
  briefcaseMat.diffuseColor = new BABYLON.Color3(0.2, 0.1, 0);
  briefcase.material = briefcaseMat;
  
  return briefcase;
}

export function initializeGameState() {
  return {
    briefcaseInHand: false,
    briefcaseDelivered: false,
    canPickup: false,
    canDeliver: false
  };
}

export function updatePlayerPosition(player, moveX, moveZ, walls) {
  const newX = player.position.x + moveX;
  const newZ = player.position.z + moveZ;

  if (!checkWallCollision(newX, newZ, 0.5, walls)) {
    player.position.x = newX;
    player.position.z = newZ;
  }
}

export function updatePlayerRotation(player, moveX, moveZ, isMoving) {
  const BABYLON = window.BABYLON;
  let targetRotation = player.rotation.y;

  if (isMoving) {
    if (moveZ < 0 && moveX === 0) {
      targetRotation = 0;
    } else if (moveZ > 0 && moveX === 0) {
      targetRotation = Math.PI;
    } else if (moveX < 0 && moveZ === 0) {
      targetRotation = Math.PI / 2;
    } else if (moveX > 0 && moveZ === 0) {
      targetRotation = -Math.PI / 2;
    }
  }

  const currentRotation = player.rotation.y;
  let diff = targetRotation - currentRotation;

  if (diff > Math.PI) diff -= 2 * Math.PI;
  if (diff < -Math.PI) diff += 2 * Math.PI;

  const smoothness = 0.2;
  player.rotation.y = currentRotation + diff * smoothness;
}

function checkWallCollision(x, z, radius, walls) {
  const BABYLON = window.BABYLON;
  
  for (let wall of walls) {
    const dx = Math.abs(x - wall.x);
    const dz = Math.abs(z - wall.z);

    const halfWidth = wall.width / 2;
    const halfDepth = wall.depth / 2;

    if (dx < halfWidth + radius && dz < halfDepth + radius) {
      return true;
    }
  }

  return false;
}

export function handlePickupDelivery(gameState, player, briefcase, keys, pickupZone, deliveryZone) {
  const BABYLON = window.BABYLON;
  const pickupAction = keys.space;
  const deliverAction = keys.e;

  if (pickupAction && gameState.canPickup && !gameState.briefcaseInHand) {
    briefcase.parent = player;
    briefcase.position = new BABYLON.Vector3(0.2, -0.3, 0);
    gameState.briefcaseInHand = true;
  }

  if (deliverAction && gameState.canDeliver && gameState.briefcaseInHand) {
    briefcase.parent = null;
    briefcase.position = deliveryZone.position.clone();
    briefcase.position.y = 0.5;
    gameState.briefcaseInHand = false;
    gameState.briefcaseDelivered = true;
  }
}
