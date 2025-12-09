import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import './styles.css';

async function main() {
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.9, 0.95, 1);

  // Lighting
  const light1 = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
  light1.intensity = 0.7;

  // Camera - Cámara orbital que sigue al personaje
  const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -15), scene);
  
  // Estado de la cámara orbital
  const cameraState = {
    angle: 0,              // Ángulo horizontal alrededor del jugador
    verticalAngle: 0.3,    // Ángulo vertical (inclinación)
    distance: 15,          // Distancia al jugador
  };
  
  // Control de cámara con mouse/trackpad - usando pointer events para mejor compatibilidad
  let isPointerDown = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  
  // Pointer events funcionan mejor en laptops con trackpad
  canvas.addEventListener('pointerdown', (e) => {
    isPointerDown = true;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });
  
  canvas.addEventListener('pointerup', (e) => {
    isPointerDown = false;
    canvas.releasePointerCapture(e.pointerId);
  });
  
  canvas.addEventListener('pointermove', (e) => {
    if (isPointerDown) {
      const deltaX = e.clientX - lastPointerX;
      const deltaY = e.clientY - lastPointerY;
      
      // Rotación horizontal
      cameraState.angle += deltaX * 0.01;
      
      // Rotación vertical (con límites para no voltear la cámara)
      cameraState.verticalAngle += deltaY * 0.01;
      cameraState.verticalAngle = Math.max(0.1, Math.min(1.4, cameraState.verticalAngle));
      
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
    }
  });
  
  canvas.addEventListener('pointercancel', (e) => {
    isPointerDown = false;
  });
  
  // También permitir con rueda del mouse para zoom
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    cameraState.distance += e.deltaY * 0.02;
    // Limitar distancia
    cameraState.distance = Math.max(5, Math.min(30, cameraState.distance));
  }, { passive: false });

  // Ground
  const groundMat = new BABYLON.StandardMaterial('groundMat', scene);
  const groundTexture = new BABYLON.DynamicTexture('groundTexture', 256, scene);
  const ctx = groundTexture.getContext();
  const squareSize = 16;
  ctx.fillStyle = '#e0d5c0';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = '#a39988';
  
  for (let i = 0; i < 256; i += squareSize * 2) {
    for (let j = 0; j < 256; j += squareSize * 2) {
      ctx.fillRect(i, j, squareSize, squareSize);
      ctx.fillRect(i + squareSize, j + squareSize, squareSize, squareSize);
    }
  }
  
  groundTexture.update();
  groundMat.diffuseTexture = groundTexture;
  groundMat.diffuseTexture.uScale = 4;
  groundMat.diffuseTexture.vScale = 4;

  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 150, height: 150 }, scene);
  ground.material = groundMat;

  // Brick texture
  const brickMat = new BABYLON.StandardMaterial('brickMat', scene);
  const brickTexture = new BABYLON.DynamicTexture('brickTexture', 256, scene);
  const brickCtx = brickTexture.getContext();
  
  brickCtx.fillStyle = '#8b4513';
  brickCtx.fillRect(0, 0, 256, 256);
  brickCtx.strokeStyle = '#654321';
  brickCtx.lineWidth = 2;
  
  const brickWidth = 32;
  const brickHeight = 16;
  
  for (let y = 0; y < 256; y += brickHeight) {
    const offsetX = (y / brickHeight) % 2 === 0 ? 0 : brickWidth / 2;
    for (let x = offsetX; x < 256; x += brickWidth) {
      brickCtx.strokeRect(x, y, brickWidth, brickHeight);
    }
  }
  
  brickTexture.update();
  brickMat.diffuseTexture = brickTexture;

  // Obstacles
  const walls = [];
  
  const boundaryConfigs = [
    { x: 0, z: -65, width: 130, depth: 2 },
    { x: 0, z: 65, width: 130, depth: 2 },
    { x: -65, z: 0, width: 2, depth: 130 },
    { x: 65, z: 0, width: 2, depth: 130 }
  ];
  
  const obstacleConfigs = [
    { x: -40, z: -30, width: 5, depth: 5 },
    { x: -30, z: 40, width: 4, depth: 4 },
    { x: 0, z: -45, width: 6, depth: 3 },
    { x: 35, z: -20, width: 5, depth: 5 },
    { x: -50, z: 15, width: 3, depth: 8 },
    { x: 40, z: 35, width: 7, depth: 4 },
    { x: 10, z: 25, width: 4, depth: 6 },
    { x: -20, z: -15, width: 5, depth: 5 },
    { x: 25, z: -40, width: 3, depth: 7 },
    { x: -45, z: 50, width: 6, depth: 4 }
  ];
  
  boundaryConfigs.concat(obstacleConfigs).forEach((config, index) => {
    const wall = BABYLON.MeshBuilder.CreateBox(`wall_${index}`, { width: config.width, height: 3, depth: config.depth }, scene);
    wall.position.x = config.x;
    wall.position.y = 1.5;
    wall.position.z = config.z;
    wall.material = brickMat;
    
    walls.push({
      x: config.x,
      z: config.z,
      width: config.width,
      depth: config.depth
    });
  });

  // Zones
  const pickupZoneMat = new BABYLON.StandardMaterial('pickupZoneMat', scene);
  pickupZoneMat.diffuseColor = new BABYLON.Color3(1, 1, 0);
  pickupZoneMat.alpha = 0.3;

  const pickupZone = BABYLON.MeshBuilder.CreateGround('pickupZone', { width: 8, height: 8 }, scene);
  pickupZone.position.set(0, 0.1, 0);
  pickupZone.material = pickupZoneMat;

  const deliveryZoneMat = new BABYLON.StandardMaterial('deliveryZoneMat', scene);
  deliveryZoneMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
  deliveryZoneMat.alpha = 0.3;

  const deliveryZone = BABYLON.MeshBuilder.CreateGround('deliveryZone', { width: 8, height: 8 }, scene);
  deliveryZone.position.set(30, 0.1, 30);
  deliveryZone.material = deliveryZoneMat;

  // Trees
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const distance = 60;
    const tx = Math.cos(angle) * distance;
    const tz = Math.sin(angle) * distance;
    
    const trunk = BABYLON.MeshBuilder.CreateCylinder('trunk', { diameter: 0.8, height: 4 }, scene);
    trunk.position.set(tx, 2, tz);
    const trunkMat = new BABYLON.StandardMaterial('trunkMat', scene);
    trunkMat.diffuseColor = new BABYLON.Color3(0.4, 0.2, 0);
    trunk.material = trunkMat;

    const foliage = BABYLON.MeshBuilder.CreateSphere('foliage', { diameter: 6 }, scene);
    foliage.position.set(tx, 5, tz);
    const foliageMat = new BABYLON.StandardMaterial('foliageMat', scene);
    foliageMat.diffuseColor = new BABYLON.Color3(0.1, 0.6, 0.1);
    foliage.material = foliageMat;
  }

  // Load player
  let player;
  
  await new Promise((resolve) => {
    BABYLON.SceneLoader.ImportMesh('', '/models/', 'Personaje.glb', scene, (meshes) => {
      player = new BABYLON.TransformNode('playerContainer', scene);
      meshes.forEach(mesh => {
        mesh.parent = player;
      });
      player.position = new BABYLON.Vector3(0, 0, 0);
      player.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);
      resolve();
    });
  });

  // Briefcase
  const briefcase = BABYLON.MeshBuilder.CreateBox('briefcase', { width: 0.4, height: 0.3, depth: 0.2 }, scene);
  briefcase.position = new BABYLON.Vector3(0, 0.5, 0);
  
  const briefcaseMat = new BABYLON.StandardMaterial('briefcaseMat', scene);
  briefcaseMat.diffuseColor = new BABYLON.Color3(0.2, 0.1, 0);
  briefcase.material = briefcaseMat;

  // Input
  const inputState = { moveX: 0, moveZ: 0, isMoving: false };
  const keys = {
    w: false, a: false, s: false, d: false,
    ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false,
    space: false, e: false,
    l: false, k: false
  };

  scene.onKeyboardObservable.add((kbInfo) => {
    const key = kbInfo.event.key;
    const isKeyDown = kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN;

    if (key === 'w' || key === 'W') keys.w = isKeyDown;
    if (key === 'a' || key === 'A') keys.a = isKeyDown;
    if (key === 's' || key === 'S') keys.s = isKeyDown;
    if (key === 'd' || key === 'D') keys.d = isKeyDown;
    if (key === 'ArrowUp') keys.ArrowUp = isKeyDown;
    if (key === 'ArrowLeft') keys.ArrowLeft = isKeyDown;
    if (key === 'ArrowDown') keys.ArrowDown = isKeyDown;
    if (key === 'ArrowRight') keys.ArrowRight = isKeyDown;
    if (key === ' ') {
      keys.space = isKeyDown;
      kbInfo.event.preventDefault();
    }
    if (key === 'e' || key === 'E') keys.e = isKeyDown;
    if (key === 'l' || key === 'L') keys.l = isKeyDown;
    if (key === 'k' || key === 'K') keys.k = isKeyDown;
  });

  // Game state
  const gameState = {
    briefcaseInHand: false,
    briefcaseDelivered: false,
    canPickup: false,
    canDeliver: false
  };

  const playerSpeed = 0.15;

  function updateMovementInput() {
    inputState.moveX = 0;
    inputState.moveZ = 0;
    inputState.isMoving = false;

    // Movimiento relativo a la cámara
    let forwardX = 0, forwardZ = 0;
    let rightX = 0, rightZ = 0;

    if (keys.w || keys.ArrowUp) {
      forwardZ = 1;
      inputState.isMoving = true;
    }
    if (keys.s || keys.ArrowDown) {
      forwardZ = -1;
      inputState.isMoving = true;
    }
    if (keys.a || keys.ArrowLeft) {
      rightX = -1;
      inputState.isMoving = true;
    }
    if (keys.d || keys.ArrowRight) {
      rightX = 1;
      inputState.isMoving = true;
    }

    // Transformar movimiento según el ángulo de la cámara
    const camAngle = cameraState.angle;
    
    // Calcular dirección adelante/atrás relativa a la cámara
    const moveForwardX = Math.sin(camAngle) * forwardZ;
    const moveForwardZ = Math.cos(camAngle) * forwardZ;
    
    // Calcular dirección izquierda/derecha relativa a la cámara
    const moveRightX = Math.cos(camAngle) * rightX;
    const moveRightZ = -Math.sin(camAngle) * rightX;
    
    // Combinar movimientos
    inputState.moveX = (moveForwardX + moveRightX) * playerSpeed;
    inputState.moveZ = (moveForwardZ + moveRightZ) * playerSpeed;

    return inputState.isMoving;
  }

  function checkWallCollision(x, z, radius) {
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

  function updatePlayerRotation() {
    if (inputState.isMoving && (inputState.moveX !== 0 || inputState.moveZ !== 0)) {
      // Calcular la dirección de movimiento y rotar el personaje hacia ella
      const targetRotation = Math.atan2(inputState.moveX, inputState.moveZ);
      
      const currentRotation = player.rotation.y;
      let diff = targetRotation - currentRotation;

      if (diff > Math.PI) diff -= 2 * Math.PI;
      if (diff < -Math.PI) diff += 2 * Math.PI;

      player.rotation.y = currentRotation + diff * 0.2;
    }
  }

  function updateHUD() {
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
      
      setTimeout(() => {
        const victoryScreen = document.getElementById('victoryScreen');
        if (victoryScreen) {
          victoryScreen.classList.remove('hidden');
        }
      }, 1000);
    } else {
      statusDiv.textContent = '🎯 ESTADO: Busca el maletín secreto - Zona de recogida marcada en AMARILLO';
      statusDiv.style.color = '#ffff00';
    }
  }

  // Game loop
  scene.onBeforeRenderObservable.add(() => {
    if (!player) return;

    const isMoving = updateMovementInput();

    const newX = player.position.x + inputState.moveX;
    const newZ = player.position.z + inputState.moveZ;

    if (!checkWallCollision(newX, newZ, 0.5)) {
      player.position.x = newX;
      player.position.z = newZ;
    }

    updatePlayerRotation();

    // Rotar cámara con L y K
    if (keys.l) cameraState.angle -= 0.03;
    if (keys.k) cameraState.angle += 0.03;

    // La cámara sigue al personaje en órbita esférica
    const horizontalDistance = Math.cos(cameraState.verticalAngle) * cameraState.distance;
    const verticalHeight = Math.sin(cameraState.verticalAngle) * cameraState.distance;
    
    camera.position.x = player.position.x + Math.sin(cameraState.angle) * horizontalDistance;
    camera.position.z = player.position.z - Math.cos(cameraState.angle) * horizontalDistance;
    camera.position.y = player.position.y + verticalHeight;
    
    camera.setTarget(new BABYLON.Vector3(player.position.x, player.position.y + 1, player.position.z));

    // Proximity detection
    const distToBriefcase = BABYLON.Vector3.Distance(player.position, briefcase.position);
    gameState.canPickup = distToBriefcase < 3 && !gameState.briefcaseInHand;

    const distToDelivery = BABYLON.Vector3.Distance(player.position, deliveryZone.position);
    gameState.canDeliver = distToDelivery < 3 && gameState.briefcaseInHand;

    // Handle pickup/delivery
    if (keys.space && gameState.canPickup && !gameState.briefcaseInHand) {
      briefcase.parent = player;
      briefcase.position = new BABYLON.Vector3(0.2, -0.3, 0);
      gameState.briefcaseInHand = true;
    }

    if (keys.e && gameState.canDeliver && gameState.briefcaseInHand) {
      briefcase.parent = null;
      briefcase.position = deliveryZone.position.clone();
      briefcase.position.y = 0.5;
      gameState.briefcaseInHand = false;
      gameState.briefcaseDelivered = true;
    }

    // Update HUD
    updateHUD();

    // Constrain player
    const maxDistance = 65;
    const currentDistance = Math.sqrt(player.position.x ** 2 + player.position.z ** 2);
    if (currentDistance > maxDistance) {
      const ratio = maxDistance / currentDistance;
      player.position.x *= ratio;
      player.position.z *= ratio;
    }
  });

  // Render loop
  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });

  // Menu buttons
  const startButton = document.querySelector('.start-button');
  const restartButton = document.querySelector('.restart-button');
  
  if (startButton) {
    startButton.addEventListener('click', () => {
      const mainMenu = document.getElementById('mainMenu');
      if (mainMenu) mainMenu.classList.add('hidden');
    });
  }
  if (restartButton) {
    restartButton.addEventListener('click', () => {
      window.location.reload();
    });
  }
}

main().catch(err => console.error('Game initialization error:', err));
