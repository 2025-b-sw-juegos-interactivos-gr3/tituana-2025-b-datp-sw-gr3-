// ==================== INPUT MODULE ====================

export function setupInputSystem(scene) {
  const inputState = {
    moveX: 0,
    moveZ: 0,
    isMoving: false
  };

  const keys = {
    w: false, a: false, s: false, d: false,
    ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false,
    space: false, e: false
  };

  const BABYLON = window.BABYLON;

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
  });

  return { inputState, keys };
}

export function updateMovementInput(keys, inputState, playerSpeed) {
  inputState.moveX = 0;
  inputState.moveZ = 0;
  inputState.isMoving = false;

  // Movement with perspective-corrected controls
  // Camera is at Math.PI angle (behind player)
  if (keys.w || keys.ArrowUp) {
    inputState.moveZ -= playerSpeed;
    inputState.isMoving = true;
  }
  if (keys.s || keys.ArrowDown) {
    inputState.moveZ += playerSpeed;
    inputState.isMoving = true;
  }
  if (keys.a || keys.ArrowLeft) {
    inputState.moveX -= playerSpeed;
    inputState.isMoving = true;
  }
  if (keys.d || keys.ArrowRight) {
    inputState.moveX += playerSpeed;
    inputState.isMoving = true;
  }

  return inputState.isMoving;
}

export function checkActionKeys(keys) {
  return {
    pickupAction: keys.space,
    deliverAction: keys.e
  };
}

export function updateMovementInput(keys, inputState, playerSpeed) {
  inputState.moveX = 0;
  inputState.moveZ = 0;
  inputState.isMoving = false;

  // Movement with perspective-corrected controls
  // Camera is at Math.PI angle (behind player)
  if (keys.w || keys.ArrowUp) {
    inputState.moveZ -= playerSpeed;
    inputState.isMoving = true;
  }
  if (keys.s || keys.ArrowDown) {
    inputState.moveZ += playerSpeed;
    inputState.isMoving = true;
  }
  if (keys.a || keys.ArrowLeft) {
    inputState.moveX -= playerSpeed;
    inputState.isMoving = true;
  }
  if (keys.d || keys.ArrowRight) {
    inputState.moveX += playerSpeed;
    inputState.isMoving = true;
  }

  return inputState.isMoving;
}

export function checkActionKeys(keys) {
  return {
    pickupAction: keys.space,
    deliverAction: keys.e
  };
}
