// The code in the JavaScript file is taken from - https://www.youtube.com/watch?v=MxrGPP4F8Sc and edited by me.

/** Questions **/
let questions = [
    {
     id:1,
     question: "Which country has the longest coastline in the world?",
     a: "Indonesia",
     b: "Russia",
     c: "Canada",
     d: "Australia",
     answer: "c",
   },
   {
     id:2,
     question: "What is the world's most populated country?",
     a: "USA",
     b: "Russia",
     c: "India",
     d: "China",
     answer: "d",
   },
   {
     id:3,
     question: "What is the capital of the Philippines?",
     a: "Marawi",
     b: "Jakarta",
     c: "Dili",
     d: "Manilla",
     answer: "d",
   },
   {
     id:4,
     question: "The Great Barrier Reef is off the coast of which country?",
     a: "Fiji",
     b: "New Zealand",
     c: "Australia",
     d: "South Africa",
     answer: "c",
   },
   {
    id:5,
    question: "What is the World's Smallest Country?",
    a: "Luxembourg",
    b: "Vatican City",
    c: "Monaco",
    d: "Lichtenstein",
    answer: "b",
  },
  {
    id:6,
    question: "In which country is the world's highest waterfall?",
    a: "USA",
    b: "Venezuela",
    c: "Brazil",
    d: "South Africa",
    answer: "b",
  },
  {
    id:7,
    question: "What is the capital of Australia?",
    a: "Melbourne",
    b: "Adelaide",
    c: "Sydney",
    d: "Canberra",
    answer: "d",
  },
  {
    id:8,
    question: "In which country is Mount Fuji located?",
    a: "Peru",
    b: "North Korea",
    c: "China",
    d: "Japan",
    answer: "d",
  },
  {
    id:9,
    question: "In which country is the Cape of Good Hope?",
    a: "USA",
    b: "Canada",
    c: "South Africa",
    d: "Australia",
    answer: "c",
  },
  {
    id:10,
    question: "What country has the greatest number of active volcanoes?",
    a: "Philippines",
    b: "Italy",
    c: "Japan",
    d: "Indonesia",
    answer: "d",
  },
];

// let questions = [];

// fetch("questions.json")
//    .then((res) => {
//     return res.json();
//    })
//    .then((data) => {
//     questions = data.questions;
    
//    });

// function loadFromFile() {
//     let xhr = new XMLHttpRequest();

//     xhr.open("GET", "questions.json", false);
//     xhr.send();
//     xhr.onload = function() {
//         if (this.status == 200) {
//             return xhr.response;
//         } else {
//             console.log("Something went wrong!");
//         }
//     }
// }

// let questions = JSON.parse(loadFromFile());


/** Global Constant variables **/
const body = document.getElementById('body');
const startButton = document.querySelector('#start-button');
const hide = document.querySelectorAll('.hide');
const userButton = document.getElementById('user-button');
const player = document.getElementById("player");
const quiz = document.getElementById('quiz');
const result = document.getElementById('result');
const modalContainer = document.getElementById('window-container');
const modal = document.getElementById('window');
const question = document.getElementById('question');
const muteButton = document.getElementById('mute-button');
const answers = Array.from(document.getElementsByClassName('answer-text'));
const questionCounterText = document.getElementById('counter');
const scoreText = document.getElementById('score');
const progressBarFull = document.querySelector('#progressBarFull');
const progressText = document.querySelector('#progressText');
const appendTens = document.getElementById('tens');
const appendSeconds = document.getElementById('seconds');
const appendMinutes = document.getElementById('minutes');
const results = document.getElementById('results');
const answeredQuestions = document.getElementById('answered-questions');
const answerQuestionsNumber = document.getElementById('answered-questions-number');
const correctAnswer = document.getElementById('correct-answers');
const correctAnswerNumber = document.getElementById('correct-answers-number');
const incorrectAnswer = document.getElementById('incorrect-answers');
const incorrectAnswerNumber = document.getElementById('incorrect-answers-number');
const resultScore = document.getElementById('result-score');
const resultScoreNumber = document.getElementById('result-score-number');
const resultTime = document.getElementById('result-time');
const resultTimeNumber = document.getElementById('result-time-number');
const footer = document.getElementById('footer');
// Audio Play code taken from - https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/12383968#overview.
// Sound taken from - https://orangefreesounds.com.
const startAudio = new Audio('Content/Audio/Game-start-countdown.mp3');
const hoverAudio = new Audio('Content/Audio/Button-press-sound-effect.mp3');
const wrongAudio = new Audio('Content/Audio/Wrong-answer-sound-effect.mp3');
const correctAudio = new Audio('Content/Audio/Good-idea-bell.mp3');
const restartButton = document.getElementById('restart');

/** Variables for the Introduction Header **/
let questionCounter;
let interval;
let tens = 00;
let seconds = 00;
let minutes = 00;
let score;
const SCORE_POINTS = 10;
const MAX_QUESTIONS = 1;
let attemps = 0;
let correctAnswers = 0;
let acceptingAnswers;
let classToApply;

/** Get the Full Year **/
document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()));

/** Show the Modal - code written by me **/
function showWindow() {
    modalContainer.classList.add('window-container-show'); // Add slass to show the Modal for enter the username.
}
startButton.onclick = showWindow; // Calling the function to show the Modal when Start button is pressed.

/** Create a username **/
function createUsername() {
    usernameCorrectLength();
    showQuiz();
}
function usernameCorrectLength() { 
    const username = document.getElementById('username').value;
    if(username.length>0) {  // If enter username.
        player.textContent = username; // Display input into player text.
    } else {  // If not enter username.
        player.textContent = "Guest"; // Display player text as Guest.
    }
}
userButton.onclick = createUsername; // Calling the function to create a username. 

/** Show the Quiz - code written by me **/
function showQuiz() {
    quiz.classList.add('quiz-show');
    let startTitle = document.querySelector('.start-title');
    startTitle.classList.add('hide');
    let startText = document.querySelector('.start-text');
    startText.classList.add('hide');
    modalContainer.classList.remove('window-container-show');
    startButton.classList.add('hide');
    // Start Timer code taken from - https://codepen.io/cathydutton/pen/avYKeM
    interval = setInterval(startTimer, 10);
    startAudio.play();
}

/** To play sound effect when hover over option answers **/
answers.forEach((answer) => {
    answer.addEventListener("mouseover", mouseOverAudio); 
    function mouseOverAudio() {
        hoverAudio.play();
    }
})

/** To mute audio - code written by me **/
function muteAudio() {
    if(!muteButton === false) { // If mute Button is pressed.
        pauseAudioAnswer();
        pauseAudioHover();
    } 
    muteButton.innerHTML = "<i class='fa fa-volume-off sound' aria-hidden='true'></i>" + "   Muted";
}

/** To pause sound effects for answers **/
function pauseAudioAnswer() {
    answers.forEach((answer) => {
        answer.addEventListener("click", pauseAnswerSounds);
        function pauseAnswerSounds() {
            correctAudio.pause();
            correctAudio.currentTime = 0;
            wrongAudio.pause();
            wrongAudio.currentTime = 0;
            hoverAudio.pause();
            hoverAudio.currentTime = 0;
        }
    })
}

/** To pause sound effect for hover over the options **/
function pauseAudioHover() {
    answers.forEach(mouseOverOption);
}
function mouseOverOption(answer) {
    answer.addEventListener("mouseover", pauseHoverSound);
}
function pauseHoverSound() {
    hoverAudio.pause();
    hoverAudio.currentTime = 0; // Set time to 0.
}

muteButton.onclick = muteAudio; // Calling muteAudio function when mute Button is pressed.

/** Start the Quiz **/
function startQuiz() {
    // Set variables to 0 at the beginning.
    questionCounter = 0; // Question an score counters set 
    score = 0;           // to 0 when the Quiz starts.
    acceptingAnswers = true;
    scoreText.innerText = score;
    availableQuestions = getRandomQuestions(questions, MAX_QUESTIONS); // Get random questions and limited the number of Questions.
    getNewQuestion(); // Get new question.
};

/** To get random question from Array of Questions **/
function getRandomQuestions(arr, n) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random()); // Display randomly the questions.
    return (selected = shuffled.slice(0, n));
};

/** To get a new question **/
function getNewQuestion() {
    /* If statement to display results at the end of the Quiz */
    if (availableQuestions.length === 0) {
        displayResults();
        return;
    }
    introShow(); // Calling the function to display Itroduction section.
    /* Show each option for current question */
    answers.forEach(showAnswer);
    /* For each option answer */
    answers.forEach(forEachOption);
    /* Shift to the next question */
    availableQuestions.shift();
}

/** Function to display Introduction components - progress bar, scores and questions **/
function introShow() {
    questionCounter++;
    questionCounterText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`; // Show the progress text of Question in Introduction Header.
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`; // Show the Progress Bar tracker in colour.
    currentQuestion = availableQuestions[0];       // Show the current 
    question.innerText = currentQuestion.question; // question.
}

/** To display options answers **/
function showAnswer(answer) {
    answer.innerText = currentQuestion[answer.dataset.answer]; // Take options of current question and display it.
}

/** For each option **/
function forEachOption(answer) {
    if (!acceptingAnswers) { // If not accepting answer.
        return;
    }
    /* Event Listener for each option answer */
    answer.addEventListener("click", onClickOption); // When click on option, execute the function for correctness.
}

/* Checking the clicked option for correctness and aplly colour, sound effect */
function onClickOption(e) {
    acceptingAnswers = false; // Set pressed option to False and apply red coloured class.
    const clickedAnswer = e.target; // Targeting the data according to the pressed option.
    const answeredLetter = clickedAnswer.dataset.answer; // Taking the character from answer-prefix and asing the data to answer.
    /* Check if pressed option is correct answer */
    if (answeredLetter === currentQuestion.answer) { // If the pressed option is the correct answer to the current question.
        correctAudio.play(); // Audio Play code taken from - https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/12383968#overview
        incrementScore(SCORE_POINTS); // Increment with 10 scores.
        scoreText.innerText = score;
        classToApply = "correct"; // Apply green colour.
        correctAnswers++; // Increment number of correct answers.
    } else {
        wrongAudio.play(); // Audio Play code taken from - https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/12383968#overview
        classToApply = "incorrect"; // Apply red colour.
    }
    /* Add class to pressed option */
    clickedAnswer.classList.add(classToApply);
    /* Delay transition to next question */
    setTimeout(delayNewQuestion, 1000);
    function delayNewQuestion() {
        clickedAnswer.classList.remove(classToApply); // Remove colour.
        getNewQuestion(); // Get new question.
        acceptingAnswers = true;
    }
    attemps++ // Increment number of attemps.
}

/** Function to increment the scores **/
function incrementScore(num) {
score += num; // Add 10 scores.
scoreText.innerText = score;
}

/** Start Timer code taken from - https://codepen.io/cathydutton/pen/avYKeM and edited by me **/
function startTimer() {
    tens++; // Start increasing milliseconds with 1.
    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }
    if (tens > 9){
      appendTens.innerHTML = tens; 
    } 
    if (tens > 99) { // If milliseconds pass 99, start increasing seconds with 1.
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
    if (seconds > 59) { // If seconds pass 59, start increasing minutes with 1.
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
}  


/** To display the Modal with Result **/
function displayResults() {
    answeredQuestions.innerHTML = "Your attempts: "; 
    correctAnswer.innerText = "Your correct answers: ";
    incorrectAnswer.innerText = "Your incorrect answers: "; 
    resultScore.innerText = "Your scores: "; 
    resultTime.innerHTML = "Your time: " + "<span class='result-time'>" + minutes + "m" + " " + seconds + "s" + " " + tens + "ms" + "</span>"; // Display the time need it to complete the Quiz.
    
    answerQuestionsNumber.innerHTML = "<span class='result-questions'>" + attemps +  "</span>"; // Display number answered questions of total questions.
    correctAnswerNumber.innerHTML = "<span class='result-correct'>" + correctAnswers + "</span>"; // Display number of correct answers.
    incorrectAnswerNumber.innerHTML = "<span class='result-incorrect'>" + (attemps - correctAnswers) + "</span>"; // Display number of incorrect answers.
    resultScoreNumber.innerHTML = "<span class='result-score'>" + score + "</span>"; // Display how many scores are won.

    result.innerHTML = results.innerHTML; // Results section take place insted of Quiz section.
    results.classList.add('results-show'); // Add class to show the Results.
    resultAddress(); // calling the function to address the User.
};

/* Address the User at the end of the Quiz */
function resultAddress() {
    let resultAddress = document.getElementById('result-address');

    if(score >= 90) {
        resultAddress.innerHTML = "Great Job, " + "<span class='result-username'>" + player.textContent + "</span>" + " !!!";
    } 
    if(score >= 50 && score <= 90) {
        resultAddress.innerHTML = "Well Done, " + "<span class='result-username'>" + player.textContent + "</span>" + " !!!";
    } 
    if(score < 50 ) {
        resultAddress.innerHTML = "Sorry, " + "<span class='result-username'>" + player.textContent + "</span>" + ". You failed" + " !!!";
    }
}

/** Restart the Quiz **/
function restartQuiz() {
    window.location.reload(true); // Code taken from - https://www.positioniseverything.net/javascript-refresh-page/
}

startQuiz(); // Calling the function to start the Quiz.