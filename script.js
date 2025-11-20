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

var progress = 0;
var secretRevealed = false;

function playRound(e) {
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
