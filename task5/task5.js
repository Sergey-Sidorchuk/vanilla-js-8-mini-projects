const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const linkGo = document.querySelector('#link-go')
const colors = [
  "rgb(95, 247, 8)",
  "rgb(223, 247, 8)",
  "rgb(247, 191, 8)",
  "rgb(247, 36, 8)",
  "rgb(8, 199, 247)",
  "rgb(60, 8, 247)",
  "rgb(247, 8, 128)",
  "rgb(191, 8, 247)",
];
let time = 0;
let score = 0;
linkGo.style.opacity = 0

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  
  screens[0].classList.add("up");
});


timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
   
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
  linkGo.style.opacity = 0
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  linkGo.style.opacity = 1
  board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1> `;
}
function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = getRandomColor();
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
