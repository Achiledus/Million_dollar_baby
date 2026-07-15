const playBtn = document.querySelectorAll('[data-modal-target]');
const closeBtn = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById("overlay");



const typeQuestions = {};
async function loadQuestions() {
    try {
        const response = await fetch("./scripts/game_question.json");

        if (!response.ok) {
            throw new Error("Failed to load questions.json");
        }

        allQuestions = await response.json();
        console.log("Questions loaded:", allQuestions);

    } catch (error) {
        console.error("Error loading questions:", error);
    }
}

window.addEventListener("load", async () => {
    await loadQuestions();
});

playBtn.forEach(button => {
    console.log("check 2");
    button.addEventListener('click', () =>
    {
        console.log("check 3");
        const game_difficulty = document.querySelector(button.dataset.modalTarget)
        giveOptions(game_difficulty)
    })
});

overlay.addEventListener('click', ()=> {
    const modals = document.querySelectorAll('.game_difficulty.active')
    modals.forEach(modal => {
        closeOptions(modal)
    })
});

closeBtn.forEach( button =>{ 
    button.addEventListener('click', () => {
        const game_difficulty = button.closest('.game_difficulty')
        closeOptions(game_difficulty)
    })
});
function giveOptions(game_difficulty){
    if (game_difficulty == null) return
    game_difficulty.classList.add('active')
    overlay.classList.add('active')
};

function closeOptions(game_difficulty){
    if (game_difficulty == null) return
    game_difficulty.classList.remove('active')
    overlay.classList.remove('active')
};


const startGame = document.getElementById("get_questions");

startGame.addEventListener('click', () => {
    const difficulty = selectDifficulty();
    if (!difficulty) return;
    const questionsForDifficulty = allQuestions[difficulty];

    localStorage.setItem('gameDifficulty', difficulty);
    localStorage.setItem('questions', JSON.stringify(questionsForDifficulty));
    localStorage.setItem('currentQuestionIndex', '0');
    localStorage.setItem("safeAmount", "0");
    window.location.href = "gamePage.html"; 
});

function selectDifficulty() {
    const selectedRadio = document.querySelector('input[name="game_mode"]:checked');
    if (selectedRadio) {
        return selectedRadio.value; 
    } else {
        console.log("No radio button selected.");
        return null;
    }
};

