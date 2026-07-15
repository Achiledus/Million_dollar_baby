const homeButton = document.getElementById("home_click");
const giveUpButton = document.getElementById("give_up_button");
const playAgainButton = document.getElementById("play_again_button");
const amountWon = document.getElementById("amount_won");
const scrubQoutes = document.getElementById("victory_qoute");
const winnings = Number(localStorage.getItem("amountWon")) || 0;

if (amountWon) {
    amountWon.textContent = `$${winnings.toLocaleString()}`;
}

function goHome() {
    window.location.href = "./home.html";
}

if (homeButton) {
    homeButton.addEventListener("click", goHome);
}

if (giveUpButton) {
    giveUpButton.addEventListener("click", goHome);
}

if (playAgainButton) {
    playAgainButton.addEventListener("click", () => {
        localStorage.setItem("currentQuestionIndex", "0");
        localStorage.setItem("safeAmount", "0");
        localStorage.removeItem("amountWon");

        window.location.href = "./gamePage.html";
    });
}

if( winnings >= 100 && winnings <= 1000000){
    scrubQoutes.innerHTML = "Now you can feed your straving family";
}if (winnings === 1000000) {
    scrubQoutes.innerHTML = "You're officially a Milli winner!";
};