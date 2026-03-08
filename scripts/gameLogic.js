    window.onload = function() {
    const difficulty = localStorage.getItem('gameDifficulty');
    const question = JSON.parse(localStorage.getItem('currentQuestion'));
    
    if (difficulty && question) {
        document.getElementById("question_display").innerHTML = question.question;
        question.options.forEach((option, index) => {
            document.getElementById(`option_${index}`).innerHTML = option;
        });
    } else {
        console.log("No game data found.");
    }
    };

    const checkAnswer = document.getElementById("final_answer")

    checkAnswer.addEventListener('click', ()=>{
        const question = JSON.parse(localStorage.getItem('currentQuestion'));
        const selectedRadio = document.querySelector('input[name="options"]:checked');
        
        if (!selectedRadio) {
            console.log("No option selected.");
            return;
            }
        if (question.answer == selectedRadio.value){
            console.log("That's correct!")
        } else console.log("that's wrong");
        console.log(selectedRadio.value)
    });

    document.querySelectorAll('input[name="options"]').forEach(radio => {
    radio.addEventListener('change', () => {
        document.getElementById('final_answer').style.display = 'block';
        });
    });


    const popup = nextQuestion("#nq_popup");
    document.querySelector("#final_answer").addEventListener("click", popup);

    function nextQuestion(id){
        const popupNode = document.querySelector(id);
        const overlay = popupNode.querySelector(".overlay");
        
        function openPopup(){
            document.querySelector(".popup-content").style.display = 'flex';
            popupNode.classList.add("active");
        }
        overlay.addEventListener("click", ()=> {
            popupNode.classList.remove("active");
            document.querySelector(".popup-content").style.display = 'none';
        });
        return openPopup;
    };