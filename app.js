"use strict";

const missionCard = document.getElementById("missionCard");
const finalCard = document.getElementById("finalCard");
const missionIcon = document.getElementById("missionIcon");
const missionNumber = document.getElementById("missionNumber");
const missionCategory = document.getElementById("missionCategory");
const missionTitle = document.getElementById("missionTitle");
const missionStory = document.getElementById("missionStory");
const visualClue = document.getElementById("visualClue");
const answerForm = document.getElementById("answerForm");
const choiceFieldset = document.getElementById("choiceFieldset");
const choiceList = document.getElementById("choiceList");
const textAnswerGroup = document.getElementById("textAnswerGroup");
const answerInput = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const smallHintButton = document.getElementById("smallHintButton");
const strongHintButton = document.getElementById("strongHintButton");
const hintBox = document.getElementById("hintBox");
const progressLabel = document.getElementById("progressLabel");
const progressPercent = document.getElementById("progressPercent");
const progressBar = document.getElementById("progressBar");
const progressSteps = document.getElementById("progressSteps");
const resetButton = document.getElementById("resetButton");
const restartButton = document.getElementById("restartButton");
const finalMessage = document.getElementById("finalMessage");
const finalVideo = document.getElementById("finalVideo");
const finalImage = document.getElementById("finalImage");
const finalPlaceholder = document.getElementById("finalPlaceholder");

let currentMissionIndex = loadProgress();
let selectedChoice = "";

/**
 * Normalizes a free-text answer for forgiving comparisons.
 * @param {string} value The answer entered by the player.
 * @returns {string} The normalized answer.
 */
function normalizeAnswer(value) {
    return value
        .trim()
        .toLocaleLowerCase("fr-CA")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * Loads the saved mission index from browser storage.
 * @returns {number} The next mission to display.
 */
function loadProgress() {
    try {
        const storedValue = window.localStorage.getItem(questConfig.storageKey);
        const parsedValue = Number.parseInt(storedValue ?? "0", 10);

        if (Number.isNaN(parsedValue) || parsedValue < 0) {
            return 0;
        }

        return Math.min(parsedValue, missions.length);
    } catch (error) {
        console.error("Unable to load quest progress.", error);
        return 0;
    }
}

/**
 * Saves the current mission index in browser storage.
 * @param {number} value The mission index to save.
 */
function saveProgress(value) {
    try {
        window.localStorage.setItem(questConfig.storageKey, value.toString());
    } catch (error) {
        console.error("Unable to save quest progress.", error);
    }
}

/**
 * Creates one visual marker for every mission.
 */
function renderProgressSteps() {
    progressSteps.replaceChildren();
    progressSteps.style.gridTemplateColumns = `repeat(${missions.length}, 1fr)`;

    missions.forEach((mission, index) => {
        const step = document.createElement("span");
        step.className = "progress-step";
        step.classList.toggle("completed", index < currentMissionIndex);
        step.classList.toggle("current", index === currentMissionIndex);
        progressSteps.appendChild(step);
    });
}

/**
 * Refreshes the numeric and visual progress indicators.
 */
function updateProgress() {
    const completedCount = Math.min(currentMissionIndex, missions.length);
    const percentage = Math.round((completedCount / missions.length) * 100);

    progressLabel.textContent = currentMissionIndex >= missions.length
        ? "MISSION COMPLÈTE"
        : `MISSION ${String(currentMissionIndex + 1).padStart(2, "0")} / ${String(missions.length).padStart(2, "0")}`;
    progressPercent.textContent = `${percentage}%`;
    progressBar.style.width = `${percentage}%`;
    renderProgressSteps();
}

/**
 * Renders the available answers for a multiple-choice mission.
 * @param {object} mission The mission being displayed.
 */
function renderChoices(mission) {
    choiceList.replaceChildren();

    mission.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        const marker = document.createElement("span");
        const label = document.createElement("span");

        button.type = "button";
        button.className = "choice-button";
        button.dataset.choiceId = choice.id;
        button.setAttribute("aria-pressed", "false");

        marker.className = "choice-marker";
        marker.textContent = String.fromCharCode(65 + index);
        label.textContent = choice.label;

        button.append(marker, label);
        button.addEventListener("click", () => selectChoice(button, choice.id));
        choiceList.appendChild(button);
    });
}

/**
 * Selects one answer and updates the pressed state of all choices.
 * @param {HTMLButtonElement} selectedButton The chosen button.
 * @param {string} choiceId The stable identifier for the chosen answer.
 */
function selectChoice(selectedButton, choiceId) {
    selectedChoice = choiceId;

    choiceList.querySelectorAll(".choice-button").forEach((button) => {
        const isSelected = button === selectedButton;
        button.classList.toggle("selected", isSelected);
        button.setAttribute("aria-pressed", isSelected.toString());
    });

    feedback.textContent = "";
    feedback.className = "feedback";
}

/**
 * Displays the active mission or the final clue screen.
 */
function renderMission() {
    updateProgress();
    feedback.textContent = "";
    feedback.className = "feedback";
    answerInput.value = "";
    selectedChoice = "";
    hintBox.hidden = true;
    hintBox.textContent = "";

    if (currentMissionIndex >= missions.length) {
        renderFinalCard();
        return;
    }

    missionCard.hidden = false;
    finalCard.hidden = true;

    const mission = missions[currentMissionIndex];
    missionIcon.textContent = mission.icon;
    missionNumber.textContent = `QUESTION ${String(currentMissionIndex + 1).padStart(2, "0")}`;
    missionCategory.textContent = mission.category;
    missionTitle.textContent = mission.title;
    missionStory.textContent = mission.story;

    if (mission.visual) {
        visualClue.textContent = mission.visual;
        visualClue.hidden = false;
    } else {
        visualClue.textContent = "";
        visualClue.hidden = true;
    }

    const isChoiceMission = mission.type === "choice";
    choiceFieldset.hidden = !isChoiceMission;
    textAnswerGroup.hidden = isChoiceMission;

    if (isChoiceMission) {
        renderChoices(mission);
    } else {
        choiceList.replaceChildren();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Displays the final clue and uses a placeholder until a photo is configured.
 */
function renderFinalCard() {
    missionCard.hidden = true;
    finalCard.hidden = false;
    finalMessage.textContent = questConfig.finalMessage;

    if (questConfig.finalVideo) {
        finalVideo.src = questConfig.finalVideo;
        finalVideo.hidden = false;
        finalImage.hidden = true;
        finalPlaceholder.hidden = true;
    } else if (questConfig.finalImage) {
        finalVideo.removeAttribute("src");
        finalVideo.hidden = true;
        finalImage.src = questConfig.finalImage;
        finalImage.hidden = false;
        finalPlaceholder.hidden = true;
    } else {
        finalVideo.removeAttribute("src");
        finalVideo.hidden = true;
        finalImage.removeAttribute("src");
        finalImage.hidden = true;
        finalPlaceholder.hidden = false;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Determines whether the current answer is valid.
 * @param {object} mission The current mission.
 * @returns {boolean} True when the answer is correct.
 */
function isCorrectAnswer(mission) {
    if (mission.type === "choice") {
        return selectedChoice === mission.answer;
    }

    const normalizedValue = normalizeAnswer(answerInput.value);
    return mission.answers.some((answer) => normalizeAnswer(answer) === normalizedValue);
}

answerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
        const mission = missions[currentMissionIndex];
        const hasAnswer = mission.type === "choice"
            ? Boolean(selectedChoice)
            : Boolean(answerInput.value.trim());

        if (!hasAnswer) {
            feedback.textContent = mission.type === "choice"
                ? "Choisis une réponse avant de continuer."
                : "Entre une réponse avant de continuer.";
            feedback.className = "feedback error";
            return;
        }

        if (!isCorrectAnswer(mission)) {
            feedback.textContent = "Nope. Essaie encore ou débloque un indice.";
            feedback.className = "feedback error";

            if (mission.type === "text") {
                answerInput.select();
            }

            return;
        }

        feedback.textContent = mission.successMessage ?? "VALIDÉ. Prochaine mission déverrouillée. ★";
        feedback.className = "feedback success";
        currentMissionIndex += 1;
        saveProgress(currentMissionIndex);
        window.setTimeout(renderMission, 750);
    } catch (error) {
        console.error("Unable to validate the quest answer.", error);
        feedback.textContent = "Petit bug dans la matrice. Recharge la page et réessaie.";
        feedback.className = "feedback error";
    }
});

smallHintButton.addEventListener("click", () => {
    const mission = missions[currentMissionIndex];
    hintBox.textContent = mission.smallHint;
    hintBox.hidden = false;
});

strongHintButton.addEventListener("click", () => {
    const mission = missions[currentMissionIndex];
    hintBox.textContent = mission.strongHint;
    hintBox.hidden = false;
});

/**
 * Removes saved progress and restarts the quest.
 */
function resetProgress() {
    finalVideo.pause();
    finalVideo.currentTime = 0;

    try {
        window.localStorage.removeItem(questConfig.storageKey);
    } catch (error) {
        console.error("Unable to reset quest progress.", error);
    }

    currentMissionIndex = 0;
    renderMission();
}

resetButton.addEventListener("click", () => {
    const confirmed = window.confirm("Recommencer toute la mission depuis le début?");

    if (confirmed) {
        resetProgress();
    }
});

restartButton.addEventListener("click", resetProgress);

finalImage.addEventListener("error", () => {
    finalImage.hidden = true;
    finalPlaceholder.hidden = false;
});

finalVideo.addEventListener("error", () => {
    finalVideo.hidden = true;
    finalPlaceholder.hidden = false;
});

renderMission();
