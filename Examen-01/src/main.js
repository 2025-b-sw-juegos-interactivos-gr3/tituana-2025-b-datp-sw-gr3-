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

  // Camera - Cámara que sigue las espaldas del jugador
  const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -15), scene);
  
  // Estado de la cámara - sigue al jugador con offset limitado
  const cameraState = {
    offsetAngle: 0,        // Offset horizontal (limitado) - mouse mueve esto
    verticalAngle: 0.4,    // Ángulo vertical (inclinación)
    distance: 12,          // Distancia al jugador
    maxOffset: 0.8,        // Máximo giro permitido (en radianes, ~45 grados)
  };
  
  // Control de cámara con mouse/trackpad
  let isPointerDown = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  
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
      
      // Rotación horizontal LIMITADA (solo offset, no giro completo)
      cameraState.offsetAngle += deltaX * 0.008;
      cameraState.offsetAngle = Math.max(-cameraState.maxOffset, Math.min(cameraState.maxOffset, cameraState.offsetAngle));
      
      // Rotación vertical (con límites)
      cameraState.verticalAngle += deltaY * 0.008;
      cameraState.verticalAngle = Math.max(0.2, Math.min(1.2, cameraState.verticalAngle));
      
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
    }
  });
  
  canvas.addEventListener('pointercancel', (e) => {
    isPointerDown = false;
  });
  
  // Zoom con rueda del mouse
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    cameraState.distance += e.deltaY * 0.02;
    cameraState.distance = Math.max(5, Math.min(20, cameraState.distance));
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

  // ==================== FUNCIÓN PARA POSICIONES ALEATORIAS ====================
  function getRandomPosition(minDist = 15) {
    let x, z, valid;
    do {
      x = Math.random() * 100 - 50; // -50 a 50
      z = Math.random() * 100 - 50;
      valid = true;
      
      // No muy cerca del centro (spawn del jugador)
      if (Math.sqrt(x*x + z*z) < minDist) valid = false;
      
      // No muy cerca de la casa de seguridad
      if (Math.sqrt((x-45)**2 + (z-45)**2) < 15) valid = false;
      
      // No en obstáculos
      for (let wall of obstacleConfigs) {
        if (Math.abs(x - wall.x) < wall.width && Math.abs(z - wall.z) < wall.depth) {
          valid = false;
          break;
        }
      }
    } while (!valid);
    return { x, z };
  }

  // ==================== CASA DE SEGURIDAD (DELIVERY) ====================
  const deliveryZoneMat = new BABYLON.StandardMaterial('deliveryZoneMat', scene);
  deliveryZoneMat.diffuseColor = new BABYLON.Color3(0, 1, 0.3);
  deliveryZoneMat.emissiveColor = new BABYLON.Color3(0, 0.2, 0.1);
  deliveryZoneMat.alpha = 0.5;

  const deliveryZone = BABYLON.MeshBuilder.CreateGround('deliveryZone', { width: 8, height: 8 }, scene);
  deliveryZone.position.set(45, 0.1, 45);
  deliveryZone.material = deliveryZoneMat;

  // Casa de seguridad (estructura simple)
  const safehouse = BABYLON.MeshBuilder.CreateBox('safehouse', { width: 6, height: 4, depth: 6 }, scene);
  safehouse.position.set(45, 2, 45);
  const safehouseMat = new BABYLON.StandardMaterial('safehouseMat', scene);
  safehouseMat.diffuseColor = new BABYLON.Color3(0.3, 0.5, 0.3);
  safehouse.material = safehouseMat;
  
  // Techo de la casa
  const roof = BABYLON.MeshBuilder.CreateCylinder('roof', { diameter: 10, height: 2, tessellation: 4 }, scene);
  roof.position.set(45, 5, 45);
  roof.rotation.y = Math.PI / 4;
  const roofMat = new BABYLON.StandardMaterial('roofMat', scene);
  roofMat.diffuseColor = new BABYLON.Color3(0.6, 0.2, 0.1);
  roof.material = roofMat;

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

  // ==================== 3 MALETINES SECRETOS ====================
  const briefcases = [];
  const briefcaseColors = [
    new BABYLON.Color3(0.3, 0.15, 0.05),  // Marrón
    new BABYLON.Color3(0.1, 0.1, 0.1),     // Negro
    new BABYLON.Color3(0.5, 0.3, 0.1)      // Marrón claro
  ];
  
  for (let i = 0; i < 3; i++) {
    const pos = getRandomPosition(20);
    
    const briefcase = BABYLON.MeshBuilder.CreateBox(`briefcase_${i}`, { width: 0.6, height: 0.4, depth: 0.3 }, scene);
    briefcase.position = new BABYLON.Vector3(pos.x, 0.5, pos.z);
    
    const briefcaseMat = new BABYLON.StandardMaterial(`briefcaseMat_${i}`, scene);
    briefcaseMat.diffuseColor = briefcaseColors[i];
    briefcaseMat.specularColor = new BABYLON.Color3(0.5, 0.4, 0.3);
    briefcaseMat.emissiveColor = briefcaseColors[i].scale(0.2);
    briefcase.material = briefcaseMat;
    
    // Asa del maletín
    const handle = BABYLON.MeshBuilder.CreateTorus(`handle_${i}`, { diameter: 0.2, thickness: 0.03 }, scene);
    handle.parent = briefcase;
    handle.position.y = 0.25;
    handle.rotation.x = Math.PI / 2;
    handle.material = briefcaseMat;
    
    // Marcador brillante sobre el maletín
    const marker = BABYLON.MeshBuilder.CreateSphere(`marker_${i}`, { diameter: 0.3 }, scene);
    marker.parent = briefcase;
    marker.position.y = 0.8;
    const markerMat = new BABYLON.StandardMaterial(`markerMat_${i}`, scene);
    markerMat.diffuseColor = new BABYLON.Color3(1, 1, 0);
    markerMat.emissiveColor = new BABYLON.Color3(1, 0.8, 0);
    marker.material = markerMat;
    
    briefcases.push({
      mesh: briefcase,
      marker: marker,
      collected: false,
      delivered: false,
      originalPos: new BABYLON.Vector3(pos.x, 0.5, pos.z)
    });
  }

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

  // Game state - Espía Internacional (3 maletines, 60 segundos)
  const gameState = {
    briefcasesInHand: [],      // Array de maletines recogidos
    briefcasesDelivered: 0,    // Contador de entregados
    canPickup: null,           // Índice del maletín cercano (o null)
    canDeliver: false,
    missionComplete: false,
    missionFailed: false,
    timeRemaining: 60,         // 60 segundos
    timerStarted: false,
    lastTime: Date.now()
  };

  const playerSpeed = 0.15;

  function updateMovementInput() {
    inputState.moveX = 0;
    inputState.moveZ = 0;
    inputState.isMoving = false;

    // Movimiento relativo al personaje (estilo tercera persona)
    // W = adelante (hacia donde mira el personaje)
    // S = atrás
    // A/D = rotar el personaje
    
    if (keys.w || keys.ArrowUp) {
      // Mover hacia adelante en la dirección que mira el personaje
      inputState.moveX = Math.sin(player.rotation.y) * playerSpeed;
      inputState.moveZ = Math.cos(player.rotation.y) * playerSpeed;
      inputState.isMoving = true;
    }
    if (keys.s || keys.ArrowDown) {
      // Mover hacia atrás
      inputState.moveX = -Math.sin(player.rotation.y) * playerSpeed * 0.6;
      inputState.moveZ = -Math.cos(player.rotation.y) * playerSpeed * 0.6;
      inputState.isMoving = true;
    }
    if (keys.a || keys.ArrowLeft) {
      // Rotar a la izquierda
      player.rotation.y -= 0.05;
    }
    if (keys.d || keys.ArrowRight) {
      // Rotar a la derecha
      player.rotation.y += 0.05;
    }

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
    // La rotación ahora se maneja directamente en updateMovementInput con A/D
    // Esta función queda vacía pero se mantiene por compatibilidad
  }

  function updateHUD() {
    const statusDiv = document.getElementById('status');
    const objectiveUl = document.querySelector('#objective ul');
    
    // Mostrar temporizador
    const minutes = Math.floor(gameState.timeRemaining / 60);
    const seconds = Math.floor(gameState.timeRemaining % 60);
    const timeStr = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;
    const progressStr = `📦 ${gameState.briefcasesDelivered}/3 entregados | 🎒 ${gameState.briefcasesInHand.length} en mano`;
    
    if (gameState.missionComplete) {
      statusDiv.innerHTML = `🏆 ¡MISIÓN COMPLETADA! Los 3 maletines entregados<br>${timeStr} restante`;
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
      }, 1500);
    } else if (gameState.missionFailed) {
      statusDiv.innerHTML = `💀 ¡TIEMPO AGOTADO! Solo entregaste ${gameState.briefcasesDelivered}/3 maletines`;
      statusDiv.style.color = '#ff0000';
      
      setTimeout(() => {
        const gameOverScreen = document.getElementById('gameOverScreen');
        if (gameOverScreen) {
          gameOverScreen.classList.remove('hidden');
        }
      }, 1000);
    } else if (gameState.briefcasesInHand.length > 0 && gameState.canDeliver) {
      statusDiv.innerHTML = `${timeStr} | ${progressStr}<br>🏠 Presiona E para entregar ${gameState.briefcasesInHand.length} maletín(es)`;
      statusDiv.style.color = '#00ff00';
    } else if (gameState.briefcasesInHand.length > 0) {
      statusDiv.innerHTML = `${timeStr} | ${progressStr}<br>🕵️ ¡Ve a la CASA DE SEGURIDAD (edificio verde)!`;
      statusDiv.style.color = '#ff6600';
    } else if (gameState.canPickup !== null) {
      statusDiv.innerHTML = `${timeStr} | ${progressStr}<br>📦 ¡Maletín encontrado! Presiona ESPACIO para recogerlo`;
      statusDiv.style.color = '#ffff00';
    } else {
      const remaining = 3 - gameState.briefcasesDelivered - gameState.briefcasesInHand.length;
      statusDiv.innerHTML = `${timeStr} | ${progressStr}<br>🎯 Encuentra los ${remaining} maletines restantes`;
      statusDiv.style.color = '#ffffff';
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

    // Mover offset de cámara con L y K (limitado)
    if (keys.l) {
      cameraState.offsetAngle -= 0.03;
      cameraState.offsetAngle = Math.max(-cameraState.maxOffset, cameraState.offsetAngle);
    }
    if (keys.k) {
      cameraState.offsetAngle += 0.03;
      cameraState.offsetAngle = Math.min(cameraState.maxOffset, cameraState.offsetAngle);
    }

    // Cámara sigue las ESPALDAS del jugador + offset limitado del mouse
    const playerAngle = player.rotation.y;
    const finalCameraAngle = playerAngle + cameraState.offsetAngle + Math.PI; // +PI para estar detrás
    
    const horizontalDistance = Math.cos(cameraState.verticalAngle) * cameraState.distance;
    const verticalHeight = Math.sin(cameraState.verticalAngle) * cameraState.distance;
    
    camera.position.x = player.position.x + Math.sin(finalCameraAngle) * horizontalDistance;
    camera.position.z = player.position.z + Math.cos(finalCameraAngle) * horizontalDistance;
    camera.position.y = player.position.y + verticalHeight;
    
    camera.setTarget(new BABYLON.Vector3(player.position.x, player.position.y + 1, player.position.z));

    // ==================== TEMPORIZADOR ====================
    if (!gameState.missionComplete && !gameState.missionFailed) {
      if (!gameState.timerStarted) {
        gameState.timerStarted = true;
        gameState.lastTime = Date.now();
      }
      
      const now = Date.now();
      const deltaTime = (now - gameState.lastTime) / 1000;
      gameState.lastTime = now;
      gameState.timeRemaining -= deltaTime;
      
      if (gameState.timeRemaining <= 0) {
        gameState.timeRemaining = 0;
        gameState.missionFailed = true;
      }
    }
    
    // ==================== LÓGICA DE LOS 3 MALETINES ====================
    if (!gameState.missionComplete && !gameState.missionFailed) {
      // Resetear canPickup
      gameState.canPickup = null;
      
      // Animar maletines no recogidos y detectar proximidad
      for (let i = 0; i < briefcases.length; i++) {
        const bc = briefcases[i];
        if (!bc.collected && !bc.delivered) {
          // Animación flotante
          bc.mesh.position.y = bc.originalPos.y + Math.sin(Date.now() * 0.003 + i) * 0.15;
          bc.mesh.rotation.y += 0.015;
          bc.marker.scaling.setAll(0.8 + Math.sin(Date.now() * 0.005) * 0.2);
          
          // Detectar proximidad
          const dist = BABYLON.Vector3.Distance(player.position, bc.mesh.position);
          if (dist < 2.5) {
            gameState.canPickup = i;
          }
        }
      }
      
      // Recoger maletín con ESPACIO
      if (keys.space && gameState.canPickup !== null) {
        const bc = briefcases[gameState.canPickup];
        bc.collected = true;
        bc.marker.isVisible = false;
        gameState.briefcasesInHand.push(gameState.canPickup);
        
        // Adjuntar al jugador
        bc.mesh.parent = player;
        const offset = gameState.briefcasesInHand.length - 1;
        bc.mesh.position = new BABYLON.Vector3(0.3 + offset * 0.2, 0.5 + offset * 0.3, -offset * 0.2);
        bc.mesh.rotation.y = 0;
        
        keys.space = false; // Prevenir recoger múltiples en un frame
      }
      
      // Detectar casa de seguridad
      const distToSafehouse = BABYLON.Vector3.Distance(player.position, deliveryZone.position);
      gameState.canDeliver = distToSafehouse < 6 && gameState.briefcasesInHand.length > 0;
      
      // Entregar maletines con E
      if (keys.e && gameState.canDeliver) {
        // Entregar TODOS los maletines en mano
        for (let idx of gameState.briefcasesInHand) {
          const bc = briefcases[idx];
          bc.delivered = true;
          bc.mesh.parent = null;
          bc.mesh.position = new BABYLON.Vector3(
            45 + (gameState.briefcasesDelivered % 2) * 1.5 - 0.75,
            1 + Math.floor(gameState.briefcasesDelivered / 2) * 0.5,
            45
          );
          bc.mesh.rotation.y = 0;
          gameState.briefcasesDelivered++;
        }
        gameState.briefcasesInHand = [];
        
        // Verificar victoria
        if (gameState.briefcasesDelivered >= 3) {
          gameState.missionComplete = true;
        }
        
        keys.e = false;
      }
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
  const restartButtons = document.querySelectorAll('.restart-button');
  
  if (startButton) {
    startButton.addEventListener('click', () => {
      const mainMenu = document.getElementById('mainMenu');
      if (mainMenu) mainMenu.classList.add('hidden');
    });
  }
  
  // Todos los botones de reintentar (victoria y game over)
  restartButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.reload();
    });
  });
}

main().catch(err => console.error('Game initialization error:', err));
