const board = document.querySelector("#board");
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
const SQUARES_NUMBER = 1312;

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", setColor);

  square.addEventListener("mouseleave",removeColor);

  board.append(square);
}

function setColor(event) {
  const element = event.target
  const color = getRandomColor();
  element.style.backgroundColor = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}
function removeColor(event) {
  const element = event.target
  element.style.backgroundColor = "#1d1d1d";
  element.style.boxShadow = `0 0 2px #000`;
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}
