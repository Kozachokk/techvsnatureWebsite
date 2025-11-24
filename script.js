"use strict";

const questionBox = document.getElementById("questionBox");
const techTextBox = document.querySelector(".tech-side h2");
const natureTextBox = document.querySelector(".nature-side h2");
const natureButton = document.getElementById("nature-button");
const techButton = document.getElementById("tech-button");
const thirdOption = document.getElementById("third-option");
const ITERATION_COUNT = 2;

natureButton.addEventListener("click", playRound);
techButton.addEventListener("click", playRound);
thirdOption.addEventListener("click", playRound);

const jsonData = `{
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
    ],
    "changes": [
      {
        "people": 1000,
        "money": 1244,
        "dev": 65,
        "nature": 23,
        "happiness": 12,
        "health": 78
      },
      {
        "people": 1000,
        "money": -13535,
        "dev": 98,
        "nature": 56,
        "happiness": -12,
        "health": 123
      },
      {
        "people": 1000,
        "money": 65463,
        "dev": 456,
        "nature": -23,
        "happiness": 64,
        "health": 87
      }
    ]
}`;

const data = JSON.parse(jsonData);
const questions = data.questions;
const constChanges = data.changes;
var stats = {
  people: 1200,
  money: 1200,
  dev: 540,
  nature: 100,
  happiness: 100,
  health: 100,
};

var changes = {
  people: 0,
  money: 0,
  dev: 0,
  nature: 0,
  happiness: 0,
  health: 0,
};

var progress = -1;
var intervalId;
var intervalProgress = 0;
var secretRevealed = false;

function playRound(e) {
  if (progress === -1) {
    questionBox.style.minWidth = "380px";
    questionBox.style.textAlign = "left";
    questionBox.innerHTML = `People:\t\t<span class='stat people'>${stats["people"]}</span>\t<span class='change people'>${changes["people"]}</span>
    Money:\t\t<span class='stat money'>${stats["money"]}</span>\t<span class='change money'>${changes["money"]}</span>
    Dev:\t\t<span class='stat dev'>${stats["dev"]}</span>\t\t<span class='change dev'>${changes["dev"]}</span>
    Nature:\t\t<span class='stat nature'>${stats["nature"]}</span>\t\t<span class='change nature'>${changes["nature"]}</span>
    Happiness:\t<span class='stat happiness'>${stats["happiness"]}</span>\t\t<span class='change happiness'>${changes["happiness"]}</span>
    Health:\t\t<span class='stat health'>${stats["health"]}</span>\t\t<span class='change health'>${changes["health"]}</span>`;
    progress = 0;
    return;
  }
  if (progress === questions.length && !secretRevealed) {
    thirdOption.classList.replace("hidden", "visible");
    secretRevealed = true;
    progress = -1;
  }
  counter(2000);
  techTextBox.textContent = questions[progress][0];
  natureTextBox.textContent = questions[progress][1];
  thirdOption.textContent = questions[progress][2];
}

function counter(time) {
  let interval = time / ITERATION_COUNT;

  intervalId = setInterval(update, interval);
}

function update() {
  console.log("update");
  //Last iteration
  if (intervalProgress++ == ITERATION_COUNT + 10) {
    clearInterval(intervalId);
    reset();
    progress++;
    return;
  }
  updateStat("people");
  updateStat("money");
  updateStat("dev");
  updateStat("nature");
  updateStat("happiness");
  updateStat("health");
}

function updateStat(stat) {
  stats[stat] += constChanges[progress][stat] / ITERATION_COUNT;
  stats[stat] -= constChanges[progress][stat] / ITERATION_COUNT;

  document.querySelector(`.stat.${stat}`).innerText = Math.floor(stats[stat]);
  document.querySelector(`.change.${stat}`).innerText = Math.floor(
    changes[stat],
  );
}

function reset() {
  stats = {
    people: 1200,
    money: 1200,
    dev: 540,
    nature: 100,
    happiness: 100,
    health: 100,
  };
}

function changeButtonState(state) {
  document.querySelectorAll("button").forEach((element) => {
    element.disabled = state;
  });
}
