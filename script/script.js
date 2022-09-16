const images = document.querySelectorAll(".col img");
const playerTag = document.querySelector("#player");
// const reset = document.querySelector("#reset");
const redImg = "../assets/red.png";
const yellowImg = "../assets/yellow.png";
let player = 1;

let clicked = Array.from({ length: 9 }, () => -1);

images.forEach((img, i) => {
  img.addEventListener(
    "click",
    (img.ref = () => {
      if (player == 1) {
        img.src = redImg;
        player++;
      } else {
        img.src = yellowImg;
        player--;
      }
      img.classList.remove("opacity");
      clicked[i] = player;
      checkWin();
      playerTag.textContent = player == 1 ? "Red" : "Yellow";
      img.removeEventListener("click", img.ref);
    })
  );
});

const removeListener = () => {
  images.forEach((img) => {
    img.removeEventListener("click", img.ref);
  });
};

const checkWin = () => {
  for (let i = 0; i < 3; i++) {
    if (
      clicked[i] == clicked[i + 3] &&
      clicked[i + 3] == clicked[i + 6] &&
      clicked[i] != -1
    ) {
      removeListener();
      console.log("win");
    }
  }
  for (let i = 0; i < 7; i += 3) {
    if (
      clicked[i] == clicked[i + 1] &&
      clicked[i + 1] == clicked[i + 2] &&
      clicked[i] != -1
    ) {
      removeListener();
      console.log("win");
    }
  }

  if (
    clicked[0] == clicked[4] &&
    clicked[4] == clicked[8] &&
    clicked[8] != -1
  ) {
    removeListener();
    console.log("win");
  }

  if (
    clicked[2] == clicked[4] &&
    clicked[4] == clicked[6] &&
    clicked[6] != -1
  ) {
    removeListener();
    console.log("win");
  }
};

// if (clicked[0] == clicked[1] && clicked[1] == clicked[2]) {
//   console.log("win");
// }
// if (clicked[3] == clicked[4] && clicked[4] == clicked[5]) {
//   console.log("win");
// }
// if (clicked[6] == clicked[7] && clicked[7] == clicked[8]) {
//   console.log("win");
// }
// if (clicked[0] == clicked[4] && clicked[4] == clicked[8]) {
//   console.log("win");
// }
// if (clicked[2] == clicked[4] && clicked[4] == clicked[6]) {
//   console.log("win");
// }
