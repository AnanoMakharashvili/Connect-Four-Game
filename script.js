const buttonVsPlayer = document.getElementById("btn-vs-player");
const gameInterFace = document.getElementById("game-interface");
const firstPageOfGame = document.getElementById("first-page");
const logoOne = document.getElementById("logo-one");
const mainPage = document.getElementById("main");
const buttonRules = document.getElementById("btn-rules");
const gameRules = document.getElementById("rules");
const checkButton = document.getElementById("check-button");
console.log(buttonRules);

console.log(gameInterFace);

buttonVsPlayer.addEventListener("click", () => {
  gameInterFace.style.display = "block";
  gameInterFace.style.display = "flex";
  firstPageOfGame.style.display = "none";
  logoOne.style.display = "none";
});

buttonRules.addEventListener("click", () => {
  gameRules.style.display = "block";
  gameRules.style.display = "flex";
  gameInterFace.style.display = "none";
  firstPageOfGame.style.display = "none";
  logoOne.style.display = "none";
});
checkButton.addEventListener("click", () => {
  gameRules.style.display = "none";
  gameInterFace.style.display = "none";
  firstPageOfGame.style.display = "none";
  logoOne.style.display = "none";
  mainPage.style.display = "none";
  mainPage.style.display = "flex";
  firstPageOfGame.style.display = "flex";
  firstPageOfGame.style.gap = "30px";
  logoOne.style.display = "block";
});
