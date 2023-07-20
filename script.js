const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let speed = 500;
let foodCount = 1;
let borderedGame = false;
let color = "rgb(255, 0, 0)";
let gridSize = 20;
let textureSize = canvas.width / gridSize;
let isKeyPressed = false;

let gameDirection;
const snake = [];

window.addEventListener("keydown", function (e) {
  if (!isKeyPressed) {
    switch (e.key) {
      case "w":
      case "ArrowUp":
        break;

      case "s":
      case "ArrowDown":
        break;
      case "a":
      case "ArrowLeft":
        break;
      case "d":
      case "ArrowRight":
        break;

        isKeyPressed = true;
    }
  }
});

window.addEventListener("keyup", function () {
  isKeyPressed = false;
});

function generateBackground(num) {
  for (let row = 0; row < num; row++) {
    for (let col = 0; col < num; col++) {
      const x = col * textureSize;
      const y = row * textureSize;

      if (row % 2 == 0) {
        col % 2 === 0
          ? (context.fillStyle = "aqua")
          : (context.fillStyle = "darkCyan");
      } else {
        col % 2 === 0
          ? (context.fillStyle = "darkCyan")
          : (context.fillStyle = "aqua");
      }

      context.fillRect(x, y, textureSize, textureSize);
    }
  }
}

generateBackground(gridSize);

class Section {
  constructor(x, y, direction) {
    this.coordinates = { x: x, y: y };
    this.direction = direction;
  }
}

function getImage(index, direction){
  switch (index){
    case 0: return `images/head/${direction}.png`
    case snake.length-1: return `images/tail/${direction}.png`
    default: return `images/body/${direction}.png`
  }
}

function getOffset(direction){
  switch (direction){
    case 'left': return [-45,0]
    case 'right': return [45,0]
    case 'up': return [0,-45]
    case 'down': return [0,45]
  }
}

function spawnSnake() {
  let headCords = {
    x: randomCordinate(textureSize * 3, canvas.width - textureSize * 3),
    y: randomCordinate(textureSize * 3, canvas.width - textureSize * 3),
  };

  let directions = ['left', 'right', 'up', 'down'];
  let direction = directions[randomNum(0, 3)];
  gameDirection = direction;

  for (let i = 0; i < 4; i++) {
    snake.push(
      new Section(
        headCords.x,
        headCords.y,
        direction
      )
    );

    let offset = getOffset(direction);
    headCords.x -= offset[0]
    headCords.y -= offset[1]
  }
  
}

function regenerateSnake() {
  for (let i = 0; i < snake.length; i++) {
    const section = new Image();
    section.src = getImage(i, snake[i].direction);

    section.onload = function () {
      context.drawImage(
        section,
        snake[i].coordinates.x,
        snake[i].coordinates.y,
        textureSize,
        textureSize
      );
    };
  }
}

function updatePositions() {
  let previous = [snake[0].x, snake[0].y]

  let offset = getOffset(snake[0])
  snake[0].x += offset[0]
  snake[0].y += offset[1]

  for (let i = 1; i < snake.length; i++) {
    let current = [snake[i].x, snake[i].y]
    [snake[i].x, snake[i].y] = [previous[0], previous[1]]
    previous = current
  }
}

function randomCordinate(min, max) {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random - (random % textureSize);
}
function randomNum(min, max) {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

function repeatingTask(){
  updatePositions();
  regenerateSnake();

  setTimeout(yourFunction, 1000);
}

spawnSnake();

console.log(snake)

repeatingTask();