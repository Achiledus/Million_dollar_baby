const playBtn = document.querySelectorAll('[data-modal-target]');
const closeBtn = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById("overlay");



const typeQuestions = {easy : [{
        "index": 1,
        "question": "what is the name of an overly hopefull man?",
        "options" : ["a. A Fool","b. Batman", "c. Constantinopole", "d. The infinity Stone"],
        "answer" : 0 
    },
    {
        "index": 2,
        "question": "how wood would a woodchuck chuck if a woodchuck could chuck wood?",
        "options" : ["a. 30lbs","b. 80kilos", "c. an unreasonable amount", "d. depends on the size of wood"],
        "answer" : 2 

    }],
    hard: [{
        "index": 1,
        "question": `in the novel "1984" what country is the party at war with?`,
        "options" : ["a. Eurasian","b. East-Asian, as it has always been", "c. Itself", "d. Whichever the party decides"],
        "answer" : 1 
}]};

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
    const questionsForDifficulty = typeQuestions[difficulty];
    if (difficulty) {
        localStorage.setItem('gameDifficulty', difficulty);
        localStorage.setItem(
                            'currentQuestion',
                            JSON.stringify(questionsForDifficulty[0]));
        window.location.href = "gamePage.html"; 
    }
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
