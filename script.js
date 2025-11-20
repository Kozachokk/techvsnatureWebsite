"use strict";

const questionBox = document.getElementById("questionBox");
const techTextBox = document.querySelector(".tech-side h2");
const natureTextBox = document.querySelector(".nature-side h2");
const natureButton = document.getElementById("nature-button");
const techButton = document.getElementById("tech-button");
const thirdOption = document.getElementById("third-option");

natureButton.addEventListener("click", playRound);
techButton.addEventListener("click", playRound);
thirdOption.addEventListener("click", playRound);

const questions = `{
    "questions": [
        [
            "Develop a city",
            "Develop a park",
            "Develop a city with biomimicry"
        ],
        [
            "create a farm", 
            "create a park",
            "develop the garden inside a city"
        ],
        [
            "create a park",
            "create a new industrial building",
            "create both"
        ]
    ]
}`;

const json = JSON.parse(questions);
var statPeople = 1000;
var statMoney = "1.24M";
var statDev = 540;
var statNature = 100;
var statHappiness = 100;
var statHealth = 100;

var changePeople = 0;
var changeMoney = 0;
var changeDev = 0;
var changeNature = 0;
var changeHappiness = 0;
var changeHealth = 0;

var progress = 0;
var secretRevealed = false;

function playRound(e) {
  if (progress === 0) {
    questionBox.style.minWidth = "380px";
    questionBox.style.textAlign = "left";
    questionBox.innerHTML = `<span class='stat people'>People:\t\t${statPeople}</span>\t<span class='change people'>${changePeople}</span>
<span class='stat money'>Money:\t\t${statMoney}</span>\t<span class='change money'>${changeMoney}</span>
<span class='stat dev'>Dev:\t\t${statDev}</span>\t\t<span class='change dev'>${changeDev}</span>
<span class='stat nature'>Nature:\t\t${statNature}</span>\t\t<span class='change nature'>${changeNature}</span>
<span class='stat happiness'>Happiness:\t${statHappiness}</span>\t\t<span class='change happiness'>${changeHappiness}</span>
<span class='stat health'>Health:\t\t${statHealth}</span>\t\t<span class='change health'>${changeHealth}</span>`;
  }
  if (progress === json.questions.length && !secretRevealed) {
    thirdOption.classList.replace("hidden", "visible");
    secretRevealed = true;
    progress = 0;
  }
  techTextBox.textContent = json.questions[progress][0];
  natureTextBox.textContent = json.questions[progress][1];
  thirdOption.textContent = json.questions[progress][2];
  progress++;
}
