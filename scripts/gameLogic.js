    
const questions = JSON.parse(localStorage.getItem('questions')) || [];
let currentQuestionIndex = Number(localStorage.getItem('currentQuestionIndex')) || 0;
let currentQuestion = null;
const checkAnswer = document.getElementById("final_answer");
const popupNode = document.getElementById("nq_popup");
const second_overlay = popupNode.querySelector(".overlay");
const correctPopup = document.getElementById("correct_popup");
const wrongPopup = document.getElementById("wrong_popup");
const startingMinute = 2.5;
let time = startingMinute * 60;
let timerInterval;
let timerRunning = false;
let safeAmount = Number(localStorage.getItem("safeAmount")) || 0;

const reward = {
        "money_ladder": [
        { "level": 1, "amount": 100 },
        { "level": 2, "amount": 200 },
        { "level": 3, "amount": 300 },
        { "level": 4, "amount": 500 },
        { "level": 5, "amount": 1000, "safe": true },

        { "level": 6, "amount": 2000 },
        { "level": 7, "amount": 4000 },
        { "level": 8, "amount": 8000 },
        { "level": 9, "amount": 16000 },
        { "level": 10, "amount": 32000, "safe": true },

        { "level": 11, "amount": 64000 },
        { "level": 12, "amount": 125000 },
        { "level": 13, "amount": 250000 },
        { "level": 14, "amount": 500000 },
        { "level": 15, "amount": 1000000 }
        ]
};

const countdownEl = document.getElementById('timer');
const paused_overlay = document.getElementById('paused_overlay');
const ladder = reward.money_ladder;
const amountDisplay = document.getElementById("amount_display");
const acceptDefeat= document.getElementById('accept_defeat');
const justWon = document.getElementsByClassName("just_won")
const walkAwayButton = document.getElementById("accept_defeat");
const walkawayOverlay = document.getElementById('surrender_overlay');
const walkAwayContent = document.getElementById('walkaway_text_container');
const bitchOut = document.getElementById('bitch_out');
const fatFinger = document.getElementById('fat_finger')
const cashBack = document.getElementById('cash_back');
let usedQuestions = []; 

const fiftyFifty = document.getElementById('fifty_fifty');
const phoneFriends = document.getElementById('phone_friend');
const askAudience = document.getElementById('ask_audience');

const phoneFriendPopup = document.getElementById("phone_friend_response");
const phoneFriendButton = document.getElementById("phone_friend");
const phoneFriendOverlay = phoneFriendPopup.querySelector(".overlay");
const friendsAnswer = document.getElementById("friend_message");
const friendContainer = document.getElementById("friend_choice");
const homeButton = document.getElementById("home_click");
const accept = document.getElementById("accept");
const thinkForYourself = document.getElementById("think_for_self");
const tryAgain = document.getElementById('try_again_button');
const giveUp = document.getElementById('give_up_button');

let phoneSuggestedIndex = null;
let fiftyFiftyUsed      = false;
let phoneFriendUsed     = false;
let askAudienceUsed     = false;

homeButton.addEventListener('click', ()=>{
    window.location.href = "home.html";
});

giveUp.addEventListener('click', ()=>{
    window.location.href = "home.html";
});

tryAgain.addEventListener('click', ()=>{
    localStorage.setItem('currentQuestionIndex', '0');
    localStorage.setItem('safeAmount', '0');
    localStorage.removeItem('amountWon');
    
    location.reload();
})

function RandomizeQuestions(){
    if (usedQuestions.length >= questions.length) {
        return null;
    }
    let value = Math.floor(Math.random()*questions.length);
    if(usedQuestions.includes(value)){
        return RandomizeQuestions();
    }else{
        usedQuestions.push(value)
        return value;
    }
}

function displaySurrenderTerms(){
    walkawayOverlay.classList.add('active');
    walkAwayContent.classList.add('active');
    stopTimer();
}

function closeSurrenderTerms() {
    walkawayOverlay.classList.remove('active');
    walkAwayContent.classList.remove('active');
    startTimer();
}

walkAwayButton.addEventListener('click', ()=>{
    displaySurrenderTerms();
});

walkawayOverlay.addEventListener('click', ()=>{
    closeSurrenderTerms();
})

bitchOut.addEventListener('click', ()=>{
    localStorage.setItem('amountWon', safeAmount);
    window.location.href = "endPage.html";
});
fatFinger.addEventListener('click', ()=>{
    closeSurrenderTerms();
})

function updateWalkAwayDisplay() {
    const currentReward = ladder[currentQuestionIndex -1];

    if (currentReward && currentReward.safe === true) {
        safeAmount = currentReward.amount;
        cashBack.innerHTML = `$${safeAmount.toLocaleString()}`;
        localStorage.setItem("safeAmount", safeAmount);
    }

    acceptDefeat.innerHTML = safeAmount > 0
    ? `$${safeAmount.toLocaleString()}`
    : "$000";
}

function updateMoneyDisplay(){
    const currentReward = ladder[currentQuestionIndex];
    if (currentReward) {
        amountDisplay.innerHTML = `$${currentReward.amount.toLocaleString()}`;
          for (let i = 0; i < justWon.length; i++) {
            justWon[i].innerHTML = amountDisplay.innerHTML;
        }
    } else {
        amountDisplay.innerHTML = "$1,000,000";
        for (let i = 0; i < justWon.length; i++) {
            justWon[i].innerHTML = "$1,000,000";
        }
    }
}

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds}`;

    if (time <= 30) {
        countdownEl.style.backgroundColor = "#b8454f";
        countdownEl.style.border = "0.25rem solid #b8454f";
    }

    if (time > 0) {
        time--;
    } else {
        clearInterval(timerInterval);
        timerRunning = false;
        failState();
    }
}

function startTimer() {
    if (!timerRunning) {
        timerInterval = setInterval(updateCountdown, 1000);
        countdownEl.classList.remove("paused");
        paused_overlay.classList.remove("active");
        timerRunning = true;
        walkawayOverlay.classList.remove('active');
        walkAwayContent.classList.remove('active');
    }
}

function stopTimer() {
    if(time > 0){
        clearInterval(timerInterval);
        countdownEl.classList.add("paused");
        paused_overlay.classList.add("active");
        timerRunning = false;
    }
   
}
function resetTimer() {
    clearInterval(timerInterval);
    time = startingMinute * 60;
    timerRunning = false;
    countdownEl.classList.remove("paused");
    paused_overlay.classList.remove("active");
    updateCountdown();
    startTimer();
}
countdownEl.addEventListener('click', ()=>{
    if (timerRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

window.addEventListener("load", () => {

        const difficulty = localStorage.getItem('gameDifficulty');
        if (difficulty && questions.length > 0) {
            loadQuestion();
            updateMoneyDisplay();
            updateWalkAwayDisplay();
            updateCountdown();
            startTimer();  
        } else {
            console.log("No game data found.");
        }
});

function loadQuestion() {
    const randomIndex = RandomizeQuestions();
    phoneFriendPopup.classList.remove("active");
    friendContainer.style.display = "flex";
    phoneSuggestedIndex = null;

    if (randomIndex === null) {
        document.getElementById("question_display").innerHTML = "Game complete!";
        document.getElementById("final_answer").style.display = "none";
        clearInterval(timerInterval);
        return;
    }

    currentQuestion = questions[randomIndex];

    if (!currentQuestion) {
        document.getElementById("question_display").innerHTML = "Game complete!";
        document.getElementById("final_answer").style.display = "none";
        clearInterval(timerInterval);
        return;
    }

    document.getElementById("question_display").innerHTML = currentQuestion.question;

   currentQuestion.options.forEach((option, index) => {
    document.getElementById(`option_text_${index}`).innerHTML = option;
    });
    for (let i = 0; i < 4; i++) {
    document.getElementById(`container_${i}`).style.display = "flex";
    }

    document.querySelectorAll('input[name="options"]').forEach(radio => {
        radio.checked = false;
    });

    document.getElementById('final_answer').style.display = 'none';
    document.querySelectorAll('.audience_voted').forEach(el => {
            el.classList.remove('active');
            el.textContent = '';
            el.style.setProperty('--width', 0);
        });
}

document.querySelectorAll('input[name="options"]').forEach(radio => {
        radio.addEventListener('change', () => {
            document.getElementById('final_answer').style.display = 'block';
            });
    });

checkAnswer.addEventListener('click', ()=>{
        const selectedRadio = document.querySelector('input[name="options"]:checked');
        
        if (!selectedRadio) {
            console.log("No option selected.");
            return;
            }
        stopTimer();
        correctPopup.style.display = "none";
        wrongPopup.style.display = "none";

        if (currentQuestion.answer == Number(selectedRadio.value)){
            console.log("That's correct!");
            correctPopup.style.display = "flex";
            // currentLevel++;
            // updateMoneyDisplay();

        } else {
            console.log("that's wrong");
            wrongPopup.style.display = "flex";
        };
        
        popupNode.classList.add("active");
    });
function goToNextQuestion() {
    popupNode.classList.remove("active");
    correctPopup.style.display = "none";
    wrongPopup.style.display = "none";

    currentQuestionIndex++;
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);

    loadQuestion();
    updateMoneyDisplay();
    updateWalkAwayDisplay();
    resetTimer();
}

function failState(){
    localStorage.setItem('amountWon', safeAmount.toString());
    window.location.href = "endPage.html"; 
}
second_overlay.addEventListener("click", () => {
    const wasCorrect = correctPopup.style.display === "flex";
      if (wasCorrect) {
        goToNextQuestion();
    } else {
        failState();
        popupNode.classList.remove("active");
        correctPopup.style.display = "none";
        wrongPopup.style.display = "none";
    }
});

const continueButton = document.getElementById('continue_button');

continueButton.addEventListener('click', ()=>{
    goToNextQuestion();
})

fiftyFifty.addEventListener('click', () => {
    const answerIndex = currentQuestion.answer;
    let wrongAnswers = [];

    for (let i = 0; i < currentQuestion.options.length; i++) {
        if (i !== answerIndex) {
            wrongAnswers.push(i);
        }
    }

    
    wrongAnswers.sort(() => Math.random() - 0.5);
    const toHide = wrongAnswers.slice(0, 2);

    toHide.forEach(index => {
        document.getElementById(`container_${index}`).style.display = "none";
    });
    fiftyFiftyUsed = true;
    fiftyFifty.disabled = true;
    fiftyFifty.classList.add("pressed");
});

phoneFriendButton.addEventListener("click", () => {
    if (phoneFriendUsed) return;
    phoneFriendPopup.classList.add("active");
    
    let selected;
    let messageIndex;
    
    const guessCorrect = Math.floor(Math.random()*100);
    switch (true){
        case guessCorrect >= 75:
            messageIndex = 0;
            selected = currentQuestion.answer;
            break;
        case guessCorrect > 55:
            messageIndex = 1;
            selected = currentQuestion.answer;
            break;
        case guessCorrect >= 36:
            const lolFactor = Math.floor(Math.random()* 4);
            if(lolFactor >= 2){
                selected = currentQuestion.answer
            }else {
            let wrongAnswers = [];
            for (let i = 0; i < currentQuestion.options.length; i++) {
                if (i !== currentQuestion.answer) {
                    wrongAnswers.push(i);
                }
            }
            selected = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
        }
            messageIndex = 2;
            break;
        case guessCorrect <= 35:
                    let wrongAnswers = [];
            for (let i = 0; i < currentQuestion.options.length; i++) {
                if (i !== currentQuestion.answer) {
                    wrongAnswers.push(i);
                }   
        }
        selected = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
        messageIndex = 3;

            break;     
    }
    phoneSuggestedIndex = selected;
    const friendChoice = currentQuestion.options[selected];
    const friendsMessage = [
        `That's so easy! it's <b>${friendChoice}</b> Dumbass`, 
        `I'm pretty sure <b>${friendChoice}</b>, I think`, 
        `I bet it's <b>${friendChoice}</b>, but don't qoute me!`, 
        `Probably <b>${friendChoice}</b>, but just pick C and hope for the best.`
    ]
    
    friendsAnswer.innerHTML = "<b>Phone Caller: </b>"+ friendsMessage[messageIndex];

    phoneFriendUsed = true;
    phoneFriendButton.disabled = true;
    phoneFriendButton.classList.add("pressed");
});
function closePhoneFriendPopup() {
    phoneFriendPopup.classList.remove("active");
    phoneSuggestedIndex = null;
}
accept.addEventListener('click', () => {
    if (phoneSuggestedIndex !== null) {
        const suggestedRadio = document.querySelector(`input[name="options"][value="${phoneSuggestedIndex}"]`);
        if (suggestedRadio) {
            suggestedRadio.checked = true;
            document.getElementById('final_answer').style.display = 'block';
        }
    }

    closePhoneFriendPopup();
});

phoneFriendOverlay.addEventListener("click", () => {
    if (phoneSuggestedIndex !== null) {
        const suggestedRadio = document.querySelector(`input[name="options"][value="${phoneSuggestedIndex}"]`);
        if (suggestedRadio) {
            suggestedRadio.checked = true;
            document.getElementById('final_answer').style.display = 'block';
        }
    }
    closePhoneFriendPopup();
});

thinkForYourself.addEventListener('click', ()=>{
    closePhoneFriendPopup();
});

function askAudienceFunc() {
    let audienceSize = 100;
    const audienceGuess = Math.floor(Math.random() * 100);
    let guessRatio = [];
    let selected;

    for (let guess = 0; guess < currentQuestion.options.length; guess++) {
        if (guess === currentQuestion.options.length - 1) {
            guessRatio.push(audienceSize);
            break;
        } else {
            const vote = Math.floor(Math.random() * (audienceSize + 1));
            guessRatio.push(vote);
            audienceSize -= vote;
        }
    }

    if (audienceGuess >= 40) {
        selected = currentQuestion.answer;

        let highestIndex = guessRatio.indexOf(Math.max(...guessRatio));

        if (highestIndex !== currentQuestion.answer) {
            let temp = guessRatio[currentQuestion.answer];
            guessRatio[currentQuestion.answer] = guessRatio[highestIndex];
            guessRatio[highestIndex] = temp;
        }
    } else {
        selected = guessRatio.indexOf(Math.max(...guessRatio));
    }

    const suggestedRadio = document.querySelector(`input[name="options"][value="${selected}"]`);
    if (suggestedRadio) {
        suggestedRadio.checked = true;
    }

    for (let index = 0; index < guessRatio.length; index++) {
        const audienceVote = document.getElementById(`audience_${index}`);
        if (!audienceVote) continue;

        audienceVote.classList.add('active');
        audienceVote.textContent = `${guessRatio[index]}%`;

        audienceVote.style.setProperty('--width', 0);

        let currentWidth = 0;
        const targetWidth = guessRatio[index];

        const interval = setInterval(() => {
            if (currentWidth >= targetWidth) {
                clearInterval(interval);
            } else {
                currentWidth += 1;
                audienceVote.style.setProperty('--width', currentWidth);
            }
        }, 10);
    }

    document.getElementById('final_answer').style.display = 'block';
}

askAudience.addEventListener('click', () => {
    askAudienceFunc();
    askAudienceUsed = true;
    askAudience.disabled = true;
    askAudience.classList.add("pressed");
});