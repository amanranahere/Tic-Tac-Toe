let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newBtn = document.querySelector(".new-btn");
let msg = document.querySelector(".msg");
let msgContainer = document.querySelector(".msg-container");

let turnX = true;
let count = 0;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnX = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  updateBoxColors();
};

const gameDraw = () => {
  msg.style.fontSize = "12vmin";
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
      turnX = false;
    } else {
      box.innerText = "O";
      turnX = true;
    }
    box.disabled = true;
    count++;

    updateBoxColors();
    checkWinner();

    if (count === 9 && !checkWinner()) {
      gameDraw();
    }
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.style.fontSize = "12vmin";
  msg.innerText = `Congratulations! Winner is \' ${winner} \'`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

const updateBoxColors = () => {
  const color = turnX ? "#4cffff" : "#ff6b6b";
  boxes.forEach((box) => {
    box.style.backgroundColor = color;
  });
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

updateBoxColors();
