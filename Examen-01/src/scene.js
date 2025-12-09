// ==================== SCENE MODULE ====================

export function createGameScene(engine, canvas) {
  const BABYLON = window.BABYLON;
  
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.9, 0.95, 1);
  scene.collisionsEnabled = true;

  // Lighting
  const light1 = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
  light1.intensity = 0.7;

  const light2 = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(30, 20, 30), scene);
  light2.intensity = 0.5;

  return scene;
}

export function createGround(scene) {
  const BABYLON = window.BABYLON;
  
  // Create ground material with checkered pattern
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

  return ground;
}


export function createMazeStructure(scene) {
  const BABYLON = window.BABYLON;
  const walls = [];

  // Create ground
  createGround(scene);

  // Create brick material once for all walls
  const brickMat = new BABYLON.StandardMaterial('brickMat', scene);
  const brickTexture = new BABYLON.DynamicTexture('brickTexture', 256, scene);
  const ctx = brickTexture.getContext();
  
  ctx.fillStyle = '#8b4513';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 2;
  
  const brickWidth = 32;
  const brickHeight = 16;
  
  for (let y = 0; y < 256; y += brickHeight) {
    const offsetX = (y / brickHeight) % 2 === 0 ? 0 : brickWidth / 2;
    for (let x = offsetX; x < 256; x += brickWidth) {
      ctx.strokeRect(x, y, brickWidth, brickHeight);
    }
  }
  
  brickTexture.update();
  brickMat.diffuseTexture = brickTexture;

  // Maze walls (28 walls with coordinates and dimensions)
  const wallConfigs = [
    // Outer boundary
    { x: 0, z: -65, width: 130, depth: 2 },
    { x: 0, z: 65, width: 130, depth: 2 },
    { x: -65, z: 0, width: 2, depth: 130 },
    { x: 65, z: 0, width: 2, depth: 130 },
    // Inner walls
    { x: -20, z: -20, width: 40, depth: 3 },
    { x: -20, z: 20, width: 40, depth: 3 },
    { x: 20, z: -20, width: 40, depth: 3 },
    { x: 20, z: 20, width: 40, depth: 3 },
    { x: -30, z: 0, width: 3, depth: 40 },
    { x: 30, z: 0, width: 3, depth: 40 },
    { x: 0, z: -30, width: 40, depth: 3 },
    { x: 0, z: 30, width: 40, depth: 3 },
    { x: -45, z: -45, width: 30, depth: 3 },
    { x: -45, z: 45, width: 30, depth: 3 },
    { x: 45, z: -45, width: 30, depth: 3 },
    { x: 45, z: 45, width: 30, depth: 3 },
    { x: -50, z: -10, width: 3, depth: 30 },
    { x: -50, z: 10, width: 3, depth: 30 },
    { x: 50, z: -10, width: 3, depth: 30 },
    { x: 50, z: 10, width: 3, depth: 30 },
    { x: -10, z: -50, width: 30, depth: 3 },
    { x: 10, z: -50, width: 30, depth: 3 },
    { x: -10, z: 50, width: 30, depth: 3 },
    { x: 10, z: 50, width: 30, depth: 3 },
    { x: -35, z: 35, width: 3, depth: 20 },
    { x: 35, z: -35, width: 3, depth: 20 },
    { x: 35, z: 35, width: 3, depth: 20 },
    { x: -35, z: -35, width: 3, depth: 20 }
  ];

  wallConfigs.forEach((config, index) => {
    const wall = BABYLON.MeshBuilder.CreateBox(`wall_${index}`, { width: config.width, height: 3, depth: config.depth }, scene);
    wall.position.x = config.x;
    wall.position.y = 1.5;
    wall.position.z = config.z;
    wall.material = brickMat;
    
    walls.push({
      mesh: wall,
      x: config.x,
      z: config.z,
      width: config.width,
      depth: config.depth
    });
  });

  // Create pickup zone (center)
  const pickupZoneMat = new BABYLON.StandardMaterial('pickupZoneMat', scene);
  pickupZoneMat.diffuseColor = new BABYLON.Color3(1, 1, 0);
  pickupZoneMat.alpha = 0.3;

  const pickupZone = BABYLON.MeshBuilder.CreateGround('pickupZone', { width: 8, height: 8 }, scene);
  pickupZone.position.set(0, 0.1, 0);
  pickupZone.material = pickupZoneMat;

  // Create delivery zone (corner)
  const deliveryZoneMat = new BABYLON.StandardMaterial('deliveryZoneMat', scene);
  deliveryZoneMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
  deliveryZoneMat.alpha = 0.3;

  const deliveryZone = BABYLON.MeshBuilder.CreateGround('deliveryZone', { width: 8, height: 8 }, scene);
  deliveryZone.position.set(55, 0.1, 55);
  deliveryZone.material = deliveryZoneMat;

  // Create decorative trees
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const distance = 60;
    const tx = Math.cos(angle) * distance;
    const tz = Math.sin(angle) * distance;
    
    createTree(scene, tx, tz);
  }

  // Create pillars at corners
  const pillarPositions = [[-60, -60], [-60, 60], [60, -60], [60, 60]];
  pillarPositions.forEach(pos => {
    const pillar = BABYLON.MeshBuilder.CreateCylinder('pillar', { diameter: 2, height: 8 }, scene);
    pillar.position.set(pos[0], 4, pos[1]);
    const pillarMat = new BABYLON.StandardMaterial('pillarMat', scene);
    pillarMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    pillar.material = pillarMat;
  });

  return { walls, pickupZone, deliveryZone };
}

function createTree(scene, x, z) {
  const BABYLON = window.BABYLON;
  
  // Trunk
  const trunk = BABYLON.MeshBuilder.CreateCylinder('trunk', { diameter: 0.8, height: 4 }, scene);
  trunk.position.set(x, 2, z);
  const trunkMat = new BABYLON.StandardMaterial('trunkMat', scene);
  trunkMat.diffuseColor = new BABYLON.Color3(0.4, 0.2, 0);
  trunk.material = trunkMat;

  // Foliage (sphere)
  const foliage = BABYLON.MeshBuilder.CreateSphere('foliage', { diameter: 6 }, scene);
  foliage.position.set(x, 5, z);
  const foliageMat = new BABYLON.StandardMaterial('foliageMat', scene);
  foliageMat.diffuseColor = new BABYLON.Color3(0.1, 0.6, 0.1);
  foliage.material = foliageMat;
}
