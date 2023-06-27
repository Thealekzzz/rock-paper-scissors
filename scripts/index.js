const userChoiceButtons = Array.from(document.querySelectorAll(".user__choise"));
const [userDecisionImage, computerDecisionImage] = Array.from(document.querySelectorAll(".lead__decision-image"));
const [userDecisionStubImage, computerDecisionStubImage] = Array.from(document.querySelectorAll(".lead__stub"));
const resultPopup = document.querySelector(".result-popup");

const images = ["./images/rockGlow.svg", "./images/paperGlow.svg", "./images/scissorsGlow.svg"];

let computerDecision;
let userDecision;


function startComputerImageAnimation() {
  const initialTransform = "rotateZ(-45deg) ";

  computerDecisionImage.style.transform = initialTransform + "translateY(-20px) translateX(20px)";

  setTimeout(() => {
    computerDecisionImage.style.transform = initialTransform + "translateY(20px) translateX(-20px)";

    computerDecisionImage.classList.remove("lead__decision-image_hidden");
    computerDecisionStubImage.classList.add("lead__stub_hidden");

  }, 50);

  setTimeout(() => {
    computerDecisionImage.style.transform = initialTransform + "translateY(0) translateX(0)";

  }, 150);
}

function startUserImageAnimation() {
  const initialTransform = "scaleX(-1) rotateZ(-45deg) ";
  userDecisionImage.style.transform = initialTransform + "translateY(-20px) translateX(20px)";

  setTimeout(() => {
    userDecisionImage.style.transform = initialTransform + "translateY(20px) translateX(-20px)";

    userDecisionImage.classList.remove("lead__decision-image_hidden");
    userDecisionStubImage.classList.add("lead__stub_hidden");

  }, 50);

  setTimeout(() => {
    userDecisionImage.style.transform = initialTransform + "translateY(0) translateX(0)";

  }, 150);
}

function disableUserChoiseButtons() {
  userChoiceButtons.forEach((button, index) => {
    button.setAttribute("disabled", true);

    setTimeout(() => {
      button.removeAttribute("disabled");

    }, 1000 + index * 50);
  });
}

function showResultPopup() {
  resultPopup.classList.remove("result-popup_hidden");
}

function animateResultPopup() {
  const initialTransform = "translateX(-50%) ";

  resultPopup.style.transform = initialTransform + "translateY(-20px)";

  setTimeout(() => {
    resultPopup.style.transform = initialTransform + "translateY(20px)";

  }, 50);

  setTimeout(() => {
    resultPopup.style.transform = initialTransform + "translateY(0)";

  }, 150);
  const prevTransform = resultPopup.style;
  console.log(prevTransform);
}

function renderResultPopupText() {
  resultPopup.removeAttribute("data-green");
  resultPopup.removeAttribute("data-yellow");
  resultPopup.removeAttribute("data-red");

  if (userDecision === computerDecision) {
    resultPopup.textContent = "It's a draw!";
    resultPopup.setAttribute("data-yellow", true);

  } else if ((3 + userDecision - computerDecision) % 3 === 1) {
    resultPopup.textContent = "You won!";
    resultPopup.setAttribute("data-green", true);

  } else {
    resultPopup.textContent = "You lose!";
    resultPopup.setAttribute("data-red", true);

  }
}

function handleChoiceButtonClick(buttonNumber) {
  computerDecision = Math.floor(Math.random() * 3);

  userDecision = buttonNumber;
  userDecisionImage.src = images[buttonNumber];

  userDecisionImage.classList.remove("lead__decision-image_hidden");
  userDecisionStubImage.classList.add("lead__stub_hidden");

  disableUserChoiseButtons();
  startUserImageAnimation();

  setTimeout(() => {
    animateResultPopup();

  }, 25);

  setTimeout(() => {
    startComputerImageAnimation();

  }, 50);

  setTimeout(() => {
    computerDecisionImage.src = images[computerDecision];

  }, 100);

  setTimeout(() => {
    showResultPopup();
    renderResultPopupText()

  }, 200);
}

userChoiceButtons.forEach((button, index) => {
  button.addEventListener("click", () => handleChoiceButtonClick(index));
});
