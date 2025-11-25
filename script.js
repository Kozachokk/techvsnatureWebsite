"use strict";

const questionBox = document.getElementById("questionBox");
const techTextBox = document.querySelector(".tech-side h2");
const natureTextBox = document.querySelector(".nature-side h2");
const natureButton = document.getElementById("nature-button");
const techButton = document.getElementById("tech-button");
const thirdOption = document.getElementById("third-option");
const ITERATION_COUNT = 32;

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
        ],
        [
          "Try again?",
          "Try again?",
          "Maybe another way is possible"
        ]
    ],
    "changes": [
      [{
        "people": 1000,
        "money": 1244,
        "dev": 0,
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
        "dev": 45,
        "nature": -23,
        "happiness": 64,
        "health": 87
      }]
    ]
}`;
console.log(jsonData);
const data = JSON.parse(jsonData);
const questions = data.questions;
const jsonChanges = data.changes;
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
var targetChanges = {
  people: 0,
  money: 0,
  dev: 0,
  nature: 0,
  happiness: 0,
  health: 0,
};

var progress = -1;
var intervalId;
var choiceIndex = -1;
var intervalProgress = 0;
var isIntervalFinished = true;
var secretRevealed = false;

function playRound(e) {
  if (progress === -1) {
    questionBox.style.minWidth = "380px";
    questionBox.style.textAlign = "left";
    questionBox.innerHTML = `People:\t\t<span class='stat people'>${stats["people"]}</span>\t\t<span class='change people'>${changes["people"]}</span>
Money:\t\t<span class='stat money'>${stats["money"]}</span>\t\t<span class='change money'>${changes["money"]}</span>
Dev:\t\t<span class='stat dev'>${stats["dev"]}</span>\t\t\t<span class='change dev'>${changes["dev"]}</span>
Nature:\t\t<span class='stat nature'>${stats["nature"]}</span>\t\t\t<span class='change nature'>${changes["nature"]}</span>
Happiness:\t<span class='stat happiness'>${stats["happiness"]}</span>\t\t\t<span class='change happiness'>${changes["happiness"]}</span>
Health:\t\t<span class='stat health'>${stats["health"]}</span>\t\t\t<span class='change health'>${changes["health"]}</span>`;
    techTextBox.textContent = questions[0][0];
    natureTextBox.textContent = questions[0][1];
    thirdOption.textContent = questions[0][2];
    progress++;

    if (secretRevealed) {
      reset();
    }

    return;
  }
  if (e.target === techButton) choiceIndex = 0;
  else if (e.target === natureButton) choiceIndex = 1;
  else if (e.target === thirdOption) choiceIndex = 2;

  changes["people"] += jsonChanges[progress][choiceIndex]["people"];
  changes["money"] += jsonChanges[progress][choiceIndex]["money"];
  changes["dev"] += jsonChanges[progress][choiceIndex]["dev"];
  changes["nature"] += jsonChanges[progress][choiceIndex]["nature"];
  changes["happiness"] += jsonChanges[progress][choiceIndex]["happiness"];
  changes["health"] += jsonChanges[progress][choiceIndex]["health"];
  targetChanges["people"] = changes["people"];
  targetChanges["money"] = changes["money"];
  targetChanges["dev"] = changes["dev"];
  targetChanges["nature"] = changes["nature"];
  targetChanges["happiness"] = changes["happiness"];
  targetChanges["health"] = changes["health"];

  if (targetChanges["people"] > 0)
    document.querySelector(".change.people").style.color = "green";
  else if (targetChanges["people"] < 0)
    document.querySelector(".change.people").style.color = "red";
  if (targetChanges["money"] > 0)
    document.querySelector(".change.money").style.color = "green";
  else if (targetChanges["money"] < 0)
    document.querySelector(".change.money").style.color = "red";
  if (targetChanges["dev"] > 0)
    document.querySelector(".change.dev").style.color = "green";
  else if (targetChanges["dev"] < 0)
    document.querySelector(".change.dev").style.color = "red";
  if (targetChanges["nature"] > 0)
    document.querySelector(".change.nature").style.color = "green";
  else if (targetChanges["nature"] < 0)
    document.querySelector(".change.nature").style.color = "red";
  if (targetChanges["happiness"] > 0)
    document.querySelector(".change.happiness").style.color = "green";
  else if (targetChanges["happiness"] < 0)
    document.querySelector(".change.happiness").style.color = "red";
  if (targetChanges["health"] > 0)
    document.querySelector(".change.health").style.color = "green";
  else if (targetChanges["health"] < 0)
    document.querySelector(".change.health").style.color = "red";

  intervalProgress = 0;
  progress++;
  techTextBox.textContent = questions[progress][0];
  natureTextBox.textContent = questions[progress][1];
  thirdOption.textContent = questions[progress][2];
  console.log(progress);
  if (progress === questions.length - 1) {
    if (!secretRevealed) {
      thirdOption.classList.replace("hidden", "visible");
      secretRevealed = true;
      progress = -1;
    } else {
    }
  }
  counter(1500);
}

function counter(time) {
  if (isIntervalFinished) {
    let interval = time / ITERATION_COUNT;
    isIntervalFinished = false;
    intervalId = setInterval(update, interval);
  }
}

function update() {
  console.log("interval");
  //Last iteration
  if (intervalProgress++ == ITERATION_COUNT) {
    clearInterval(intervalId);
    intervalProgress = 0;
    isIntervalFinished = true;
    document.querySelector(".change.people").style.color = "white";
    document.querySelector(".change.money").style.color = "white";
    document.querySelector(".change.dev").style.color = "white";
    document.querySelector(".change.nature").style.color = "white";
    document.querySelector(".change.happiness").style.color = "white";
    document.querySelector(".change.health").style.color = "white";
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
  stats[stat] += targetChanges[stat] / ITERATION_COUNT;
  changes[stat] -= targetChanges[stat] / ITERATION_COUNT;

  document.querySelector(`.stat.${stat}`).innerText = Math.floor(stats[stat]);
  document.querySelector(`.change.${stat}`).innerText = Math.floor(
    changes[stat],
  );
}

function reset() {
  console.log("REEEEEEEEESSSSSSSEEEEEEEEEEEEEEEETTTTTTTTTTTTT");
  stats = {
    people: 1200,
    money: 1200,
    dev: 540,
    nature: 100,
    happiness: 100,
    health: 100,
  };
  document.querySelector(`.stat.people`).innerText = 1200;
  document.querySelector(`.stat.money`).innerText = Math.floor(stats["money"]);
  document.querySelector(`.stat.dev`).innerText = Math.floor(stats["dev"]);
  document.querySelector(`.stat.nature`).innerText = Math.floor(
    stats["nature"],
  );
  document.querySelector(`.stat.happiness`).innerText = Math.floor(
    stats["happiness"],
  );
  document.querySelector(`.stat.health`).innerText = Math.floor(
    stats["health"],
  );
}
