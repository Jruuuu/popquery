//funcition event(start timer) and question #1 pop ups with four answers. button A, Button B, Button C, and Button D.

// Correct answer moves to the next question

//Wrong answer Deducts time from timer

//When all questions are answered or the time =0 Game is over

//When game is over you can track your score by attaching your intials. 

var timer;
var time = 60;
var questionIndex = 0;
var score = 0;

var questions = [
    {
        questionText: "What can be in []",
        choice: ["string", "array", "var", "dog"],
        answer: "array"
    },
    {
        questionText: "What is an Object?",
        choice: ["var", "string", "index", "all of the above"],
        answer: "all of the above"
    },
    {
        questionText: "What is not a loop?",
        choice: ["for", "if", "for/of", "do/while"],
        answer: "if"
    },
    {
        questionText: "A JavaScript function is executed when 'something' _______ it",
        choice: ["invokes", "requires", "loops", "completes"],
        answer: "invokes"
    }
]

// click start quiz then the quiz should start
function startQuiz() {
    //hide start button
    document.querySelector(".start-container").classList.add("hide");

    //timer starts
    timer = setInterval(function () {
        time--;
        document.querySelector(".timer span").textContent = time;
        //check if time is 0 if so end quiz
        if (time <= 0) {
            endQuiz();
        };
    }, 1000);

    //shows question container
    document.querySelector(".question-container").classList.remove("hide");

    //create first question
    generateQuestion();
};

function generateQuestion() {
    //create question html
    var questionHTML = `
    <div id="question" >
        <div id="questionTitle">${questions[questionIndex].questionText}</div>
        <div id="answerChocies" class="ansLayout">
            <button class="btn">${questions[questionIndex].choice[0]}</button>
            <button class="btn">${questions[questionIndex].choice[1]}</button>
            <button class="btn">${questions[questionIndex].choice[2]}</button>
            <button class="btn">${questions[questionIndex].choice[3]}</button>
        </div>
    </div>
    `;
    //inject the question into quetion container
    document.querySelector(".question-container").innerHTML = questionHTML;
};

function endQuiz() {
    //hide question container
    document.querySelector(".question-container").classList.add("hide");

    //stop the timer
    clearInterval(timer);

    //show end html
    document.querySelector(".end-markup").classList.remove("hide");

    //show final score
    document.querySelector("#final-score").textContent = score;
}

function processAnswer(event) {
    //check if answer is correct
    if (event.target.textContent === questions[questionIndex].answer) {
        //increase score
        score++;
    } else {
        time = time - 5
    }
    //prepare to show the next question
    questionIndex++;
    //check to see if we should end quiz
    if (questionIndex === questions.length) {
        endQuiz();
    }

    //show next question
    generateQuestion();
}

//add event listener to start btn
document.querySelector("#start-btn").addEventListener("click", startQuiz);

//add event listener to each answer choice use parent as event delegator
document.querySelector(".question-container").addEventListener("click", function (event) {
    //make the function only runs when btn class is clicked
    if (event.target.className.indexOf("btn") > -1) {
        processAnswer(event);
    }
});



//on submit button click
document.querySelector(".submit").addEventListener("click", getInfo);


//pull out data from local storage
// localStorage.setItem("intScore", JSON.stringify(intScore));
function getInfo() {
    if (localStorage.getItem("intScore") === null) {
    var intScore = [];
   localStorage.setItem("intScore", JSON.stringify(intScore));
   }
    //get the input box value in a var
    var userInput = document.querySelector(".end-markup #initials");
    //check if input is not empty
    if (userInput !== "") {
        //get the old data
        intScore = JSON.parse(localStorage.getItem("intScore"));
        //create the new data
        var newInfo = score + "=" + userInput.value
        //add the new data to old data
        intScore.push(newInfo);
        //store it
        window.localStorage.setItem("intScore", JSON.stringify(intScore));         
        //redirect the user to other html
        window.location.replace("highscores.html")
    };
};