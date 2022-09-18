// const and variable
const eat_sound = new Audio("eat.wav");
const background = new Audio("background.mp3");
const gameOver = new Audio("game_over.wav");
const turn_sound = new Audio("sweep.wav");
let direction = { x: 0, y: 0 };
let lastPaintTime = 0;
let speed = 6;
let snackArray = [
  {
    x: 15,
    y: 16,
  },
];
let food = {
  x: 12,
  y: 9,
};
let score = 0;
let over = document.getElementById("over");
window.requestAnimationFrame(main);

function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameLogic();
}

function snackAccident(snackArray) {
  for (let i = 1; i < snackArray.length; i++) {
    if (
      snackArray[0].x == snackArray[i].x &&
      snackArray[0].y == snackArray[i].y
    ) {
      return true;
    }
  }
  if (
    snackArray[0].x > 30 ||
    snackArray[0].x < 0 ||
    snackArray[0].y > 30 ||
    snackArray[0].y < 0
  ) {
    return true;
  }
}

function gameLogic() {
  if (snackAccident(snackArray)) {
    over.classList.remove("inactive");
    gameOver.play();
    // background.pause();
    // alert("reset");
    snackArray = [{ x: 15, y: 16 }];
    direction = { x: 0, y: 0 };
  }
  // update
  if (snackArray[0].x == food.x && snackArray[0].y == food.y) {
    score++;
    document.getElementById("score").innerHTML = "Score: " + score;
    // console.log(score);
    eat_sound.play();
    snackArray.unshift({
      x: snackArray[0].x + direction.x,
      y: snackArray[0].y + direction.y,
    });
    let a = 2;
    let b = 28;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  // move snack
  for (let i = snackArray.length - 2; i >= 0; i--) {
    snackArray[i + 1] = { ...snackArray[i] };
  }
  snackArray[0].x += direction.x;
  snackArray[0].y += direction.y;

  let container = document.getElementById("contain");
  container.innerHTML = "";
  //snack
  snackArray.forEach((e, index) => {
    snackElement = document.createElement("div");
    snackElement.style.gridRowStart = e.x;
    snackElement.style.gridColumnStart = e.y;
    if (index == 0) {
      snackElement.classList.add("head");
    } else {
      snackElement.classList.add("snack_body");
    }

    container.appendChild(snackElement);
  });

  //food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.x;
  foodElement.style.gridColumnStart = food.y;
  foodElement.classList.add("food");
  container.appendChild(foodElement);
}
function reset() {
  snackArray = [{ x: 15, y: 16 }];
  direction = { x: 0, y: 0 };
  score = 0;
  over.classList.add("inactive");
}

window.addEventListener("keydown", (e) => {
  if (over.classList.contains("inactive")) {
    // console.log("active");
    // background.play();
    direction = { x: 0, y: 1 };
    switch (e.key) {
      case "ArrowUp":
        turn_sound.play();
        direction.x = -1;
        direction.y = 0;
        // console.log("up");
        break;
      case "ArrowDown":
        turn_sound.play();
        // console.log("down");
        direction.x = 1;
        direction.y = 0;
        break;
      case "ArrowLeft":
        turn_sound.play();
        // console.log("left");
        direction.x = 0;
        direction.y = -1;
        break;
      case "ArrowRight":
        turn_sound.play();
        // console.log("right");
        direction.x = 0;
        direction.y = 1;
        break;
    }
  }
});
