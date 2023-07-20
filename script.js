const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let speed = 500;
let foodCount = 1;
let borderedGame = false;
let primaryColor, secondaryColor;
let gridSize = 20;
let textureSize = canvas.width / gridSize;
let isKeyPressed = false;

document.getElementById("game-rules").addEventListener("click", function (e) {
  document.getElementById("gamerules-list").classList.toggle("open");
});

document
  .querySelectorAll("#gamerules-list input[type='range']")
  .forEach((input) =>
    input.addEventListener("input", function (e) {
      e.target.parentElement.querySelector("p.value").innerHTML =
        e.target.value;

      if (e.target.classList.contains("color-range")) {
        const R = Number(document.getElementById("R-value").value);
        const G = Number(document.getElementById("G-value").value);
        const B = Number(document.getElementById("B-value").value);
        primaryColor = `rgb(${R + 30}, ${G + 30}, ${B + 30})`;
        secondaryColor = `rgb(${R - 30}, ${G - 30}, ${B - 30})`;
        document.getElementById("primary-color").style.background =
          primaryColor;
        document.getElementById("secondary-color").style.background =
          secondaryColor;
      }
    })
  );

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

  snake.push(
    new Section(
      bodySection[1].x,
      bodySection[1].y,
      `images/body/${bodySection[2]}.png`,
      "left"
    )
  );

  snake.push(
    new Section(
      tailSection[1].x,
      tailSection[1].y,
      `images/tail/${tailSection[2]}.png`,
      "left"
    )
  );

  return regenerateSnake();
}

function sectionDirection(sectionType, headDirection, headCords) {
  let direction;
  let cords = { x: headCords.x, y: headCords.y };
  switch (headDirection) {
    case "left":
      if (sectionType == "body") {
        direction = "vertical";
        cords.x = headCords.x + textureSize;
      } else {
        direction = "left";
        cords.x = headCords.x + textureSize * 2;
      }

      break;
    case "right":
      if (sectionType == "body") {
        direction = "vertical";
        cords.x = headCords.x - textureSize;
      } else {
        direction = "right";
        cords.x = headCords.x - textureSize * 2;
      }

      break;
    case "up":
      if (sectionType == "body") {
        direction = "horizontal";
        cords.y = headCords.y + textureSize;
      } else {
        direction = "up";
        cords.y = headCords.y + textureSize * 2;
      }

      break;
    case "down":
      if (sectionType == "body") {
        direction = "horizontal";
        cords.y = headCords.y - textureSize;
      } else {
        direction = "down";
        cords.y = headCords.y - textureSize * 2;
      }

      break;
  }
  return [sectionType, cords, direction];
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
