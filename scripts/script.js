const playBtn = document.querySelectorAll('[data-modal-target]');
const closeBtn = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById("overlay");



const easyQuestions = [{
    "question": "what is the name of an overly hopefull man?",
    "options" : ["a. A Fool","b. Batman", "c. Constantinopole", "d. The infinity Stone"],
    "answer" : 0 
    },
    {
    "question": "how wood would a woodchuck chuck if a woodchuck could chuck wood?",
    "options" : ["a. 30lbs","b. 80kilos", "c. an unreasonable amount", "d. depends on the size of wood"],
    "answer" : 2 

}];

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

startGame.addEventListener('click', ()=>{
    const displayedQuestion = document.getElementById("question_display");
    selectDifficulty(displayedQuestion, easyQuestions);
});
function selectDifficulty(textBox, textToDisplay){
    const selectedRadio = document.querySelector('input[name="game_mode"]:checked');

    if (selectedRadio) {
        const result = selectedRadio.value;
        console.log("Selected value:", result);
        window.location.href = "gamePage.html";
        textBox.innerHTML = textToDisplay[0].question
        return result;
    } else {
        console.log("No radio button selected.");
        return null;
    }
};
