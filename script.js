const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let speed = 500;
let foodCount = 1;
let borderedGame = false;
let color = "rgb(255, 0, 0)";
let gridSize = 20;
let textureSize = canvas.width / gridSize;
let isKeyPressed = false;

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
  constructor(x, y, image, direction) {
    this.coordinates = { x: x, y: y };
    this.image = image;
    this.direction = direction;
  }
}

// snake[0] always head, snake[snake.length - 1] always tail and rest body
const snake = [];

function spawnSnake() {
  const headCords = {
    x: randomCordinate(textureSize * 3, canvas.width - textureSize * 3),
    y: randomCordinate(textureSize * 3, canvas.width - textureSize * 3),
  };

  let directions = ["left", "right", "up", "down"];
  let headDirection = directions[randomNum(0, 3)];

  snake.push(
    new Section(
      headCords.x,
      headCords.y,
      `images/head/${headDirection}.png`,
      "left"
    )
  );
  let bodySection = sectionDirection("body", headDirection, headCords);
  let tailSection = sectionDirection("tail", headDirection, headCords);
  console.log(bodySection, tailSection);
  snake.push(
    new Section(
      bodySection[2].x,
      bodySection[2].y,
      `images/body/${bodySection[1]}.png`,
      "left"
    )
  );

  snake.push(
    new Section(
      tailSection[2].x,
      tailSection[2].y,
      `images/tail/${bodySection[1]}.png`,
      "left"
    )
  );

  return regenerateSnake();
}

function sectionDirection(sectionType, headDirection, headCords) {
  let offset = sectionType == "body" ? textureSize : textureSize * 2;
  switch (headDirection) {
    case "left":
      headCords.x += offset;
      sectionType == "body"
        ? (bodyDirection = "vertical")
        : (bodyDirection = "left");

      break;
    case "right":
      headCords.x -= offset;

      sectionType == "body"
        ? (bodyDirection = "vertical")
        : (bodyDirection = "right");
      break;
    case "up":
      headCords.y += offset;
      sectionType == "body"
        ? (bodyDirection = "horizontal")
        : (bodyDirection = "up");

      break;
    case "down":
      headCords.y -= offset;
      bodyDirection = "horizontal";
      sectionType == "body"
        ? (bodyDirection = "horizontal")
        : (bodyDirection = "down");
      break;
  }

  return [sectionType, headDirection, headCords];
}

function regenerateSnake() {
  for (let i = 0; i < snake.length; i++) {
    const section = new Image();
    section.src = snake[i].image;

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
spawnSnake();

/*function updatePosition() {
  for (let i = 0; i < snake.length; i++) {}
}*/

function randomCordinate(min, max) {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random - (random % textureSize);
}
function randomNum(min, max) {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}
