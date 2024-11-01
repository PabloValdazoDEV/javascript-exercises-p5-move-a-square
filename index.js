let coordenadasXY = [200, 200];
const joystick = [2, -2];
const joystickJump = [6, -6];
const sizeMyRect = 50;
let pressUp = false;
let pressDown = false;
let pressRigth = false;
let pressLeft = false;
let obstacleCollising = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  
  background(220);
  fill(255, 0, 0);
  rect(coordenadasXY[0], coordenadasXY[1], sizeMyRect);
  limite();
  moving();
  collising();
  array.forEach((objetos) => {
    objetos.draw();
  });
}
function jump() {
  let i = 0;
  setInterval(() => {
    if (i === 60) return;

    let factor = 1;

    if (i < 30) {
      factor = 2 - 1.5 * (i / 30);
      coordenadasXY[1] += joystick[1] * factor;
    } else if (i < 60) {
      factor = 0.5 + ((i - 30) / 20) * 1.5;
      coordenadasXY[1] += joystick[0] * factor;
    }
    i++;
  }, 1000 / 60);
}

function moving() {
    
    if (!obstacleCollising) {
      if (pressUp) {
        coordenadasXY[1] += joystick[1];
      }
      if (pressDown) {
        coordenadasXY[1] += joystick[0];
      }
      if (pressRigth) {
        coordenadasXY[0] += joystick[0];
      }
      if (pressLeft) {
        coordenadasXY[0] += joystick[1];
      }
    }
  }

function keyReleased() {
  if (key == "ArrowUp") {
    pressUp = false;
  }
  if (key == "ArrowDown") {
    pressDown = false;
  }
  if (key == "ArrowRight") {
    pressRigth = false;
  }
  if (key == "ArrowLeft") {
    pressLeft = false;
  }
}

function keyPressed() {
  if (obstacleCollising) {
    return;
  }
  if (key == "ArrowUp") {
    coordenadasXY[1] += joystick[1];
    pressUp = true;
  }
  if (key == "ArrowDown") {
    coordenadasXY[1] += joystick[0];
    pressDown = true;
  }
  if (key == "ArrowRight") {
    coordenadasXY[0] += joystick[0];
    pressRigth = true;
  }
  if (key == "ArrowLeft") {
    coordenadasXY[0] += joystick[1];
    pressLeft = true;
  }
  if (key == " ") {
    jump();
  }
}

function limite() {
    if (coordenadasXY[0] <= 0) {
      coordenadasXY[0] = 0;
    }
    if (coordenadasXY[1] <= 0) {
      coordenadasXY[1] = 0;
    }
    if (coordenadasXY[0] + sizeMyRect >= 400) {
      coordenadasXY[0] = 400 - sizeMyRect;
    }
    if (coordenadasXY[1] + sizeMyRect >= 400) {
      coordenadasXY[1] = 400 - sizeMyRect;
    }
  }
  

class Obstacle {
  constructor(posX, posY, size, red, green, blue) {
    this.posX = posX;
    this.posY = posY;
    this.size = size;
    this.color = [red, green, blue];
  }
  draw() {
    fill(this.color);
    rect(this.posX, this.posY, this.size, this.size);
  }
}

const array = [
  new Obstacle(50, 50, 50, 255, 0, 255),
  new Obstacle(250, 25, 100, 0, 0, 255),
  new Obstacle(100, 300, 20, 255, 255, 0),
];


function collising() {
  obstacleCollising = false;

  array.forEach((rect) => {
    const { posX, posY, size } = rect;

    
    if (
      coordenadasXY[0] < posX + size &&
      coordenadasXY[0] + sizeMyRect > posX &&
      coordenadasXY[1] < posY + size &&
      coordenadasXY[1] + sizeMyRect > posY
    ) {
      obstacleCollising = true;
      
      if (coordenadasXY[0] < posX) {
        coordenadasXY[0] = posX - sizeMyRect;
      } else if (coordenadasXY[0] + sizeMyRect > posX + size) {
        coordenadasXY[0] = posX + size;
      }

      if (coordenadasXY[1] < posY) {
        coordenadasXY[1] = posY - sizeMyRect;
      } else if (coordenadasXY[1] + sizeMyRect > posY + size) {
        coordenadasXY[1] = posY + size;
      }
    }
  });
}