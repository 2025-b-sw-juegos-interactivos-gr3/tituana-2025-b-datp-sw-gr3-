// ==================== CAMERA MODULE ====================

export function setupCamera(canvas, scene) {
  const BABYLON = window.BABYLON;
  
  const cameraState = {
    horizontalAngle: Math.PI,
    verticalAngle: 0.3,
    distance: 10,
    minVerticalAngle: -Math.PI / 4,
    maxVerticalAngle: Math.PI / 3,
    sensitivity: 0.01
  };

  const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 2, -8), scene);
  camera.attachControl(canvas, false);
  camera.angularSensibility = 1000;
  camera.inertia = 0.8;
  camera.speed = 0;
  camera.minZ = 0.1;
  camera.maxZ = 500;

  let mouseDown = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  document.addEventListener('mousedown', (event) => {
    if (event.target === canvas) {
      mouseDown = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    }
  });

  document.addEventListener('mousemove', (event) => {
    if (mouseDown) {
      const deltaX = event.clientX - lastMouseX;
      const deltaY = event.clientY - lastMouseY;

      cameraState.horizontalAngle += deltaX * cameraState.sensitivity;
      cameraState.verticalAngle -= deltaY * cameraState.sensitivity;

      cameraState.verticalAngle = Math.max(cameraState.minVerticalAngle, 
        Math.min(cameraState.maxVerticalAngle, cameraState.verticalAngle));

      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    }
  });

  document.addEventListener('mouseup', () => {
    mouseDown = false;
  });

  return { camera, cameraState };
}

export function updateCameraPosition(camera, player, cameraState) {
  const BABYLON = window.BABYLON;
  const targetCameraHeight = 2.5;
  
  const cameraX = player.position.x + 
    Math.sin(cameraState.horizontalAngle) * cameraState.distance * Math.cos(cameraState.verticalAngle);
  const cameraZ = player.position.z - 
    Math.cos(cameraState.horizontalAngle) * cameraState.distance * Math.cos(cameraState.verticalAngle);
  const cameraY = player.position.y + targetCameraHeight + 
    Math.sin(cameraState.verticalAngle) * cameraState.distance;

  const cameraSmoothness = 0.1;
  camera.position.x += (cameraX - camera.position.x) * cameraSmoothness;
  camera.position.z += (cameraZ - camera.position.z) * cameraSmoothness;
  camera.position.y += (cameraY - camera.position.y) * cameraSmoothness;

  const lookAtPoint = new BABYLON.Vector3(
    player.position.x,
    player.position.y + 0.5,
    player.position.z
  );
  camera.setTarget(lookAtPoint);
}
