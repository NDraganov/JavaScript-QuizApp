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
   ];

/** Global Constant variables **/
const body = document.getElementById('body');
const navBar = document.getElementById('navbar')
// const offcanvas = document.getElementsByClassName('offcanvas');
// const navLinks = document.getElementsByClassName('nav-link');
const startButton = document.querySelector('#start-button');
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
const resultScore = document.getElementById('result-score');
const resultTime = document.getElementById('result-time');
const footer = document.getElementById('footer');
// Audio Play code taken from - https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/12383968#overview.
// Sound taken from - https://orangefreesounds.com.
const startAudio = new Audio('Content/Audio/Game-start-countdown.mp3');
const hoverAudio = new Audio('Content/Audio/Button-press-sound-effect.mp3');
const wrongAudio = new Audio('Content/Audio/Wrong-answer-sound-effect.mp3');
const correctAudio = new Audio('Content/Audio/Good-idea-bell.mp3');
const restartButton = document.getElementById('restart');

/** Get the Full Year **/
document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()));

/** Show the Modal - code written by me **/
function showWindow() {
    modalContainer.classList.add('window-container-show');
}
startButton.onclick = showWindow; // Calling the function to show the Modal when Start button is pressed.

/** Create a username **/
function createUsername() {
    usernameCorrectLength();
    showQuiz();
}
function usernameCorrectLength() { 
    const username = document.getElementById("username").value;
    if(username.length>0) {
        player.textContent = username;
    } else {
        player.textContent = "Guest";
    }
}
userButton.onclick = createUsername; // Calling the function to create a username. 

/** Show the Quiz - code written by me **/
function showQuiz() {
    quiz.classList.add('quiz-show');
    let startTitle = document.querySelector('.start-title');
    startTitle.classList.add('start-title-hide');
    let startText = document.querySelector('.start-text');
    startText.classList.add('start-text-hide');
    modalContainer.classList.remove('window-container-show');
    startButton.classList.add('start-button-hide');
    navBar.classList.add('navbar-hide');
    // Start Timer code taken from - https://codepen.io/cathydutton/pen/avYKeM
    interval = setInterval(startTimer, 10);
    startAudio.play();
}

/** Variables for the Introduction Header **/
let questionCounter;
let interval;
let seconds = 00;
let tens = 00;
let minutes = 00;
let score;
const SCORE_POINTS = 10;
const MAX_QUESTIONS = 1;
let acceptingAnswers;

/** To play sound effect when hover over option answers **/
answers.forEach((answer) => {
    answer.addEventListener("mouseover", mouseOverAudio);
    function mouseOverAudio() {
        hoverAudio.play();
    }
})

/** To mute audio - code written by me **/
function muteAudio() {
    if(!muteButton === false) {
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
    answers.forEach((answer) => {
        answer.addEventListener("mouseover", pauseHoverSound);
        function pauseHoverSound() {
            hoverAudio.pause();
            hoverAudio.currentTime = 0;
        }
    })
}
muteButton.onclick = muteAudio; // Calling muteAudio function when mute Button is pressed.

/** Start the Quiz **/
function startQuiz() {
    // Set variables to 0 at the beginning.
    questionCounter = 0;
    score = 0;
    acceptingAnswers = true;
    scoreText.innerText = score;
    
    availableQuestions = getRandomQuestions(questions, MAX_QUESTIONS); // Get random questions and limited the number of Questions.
    
    getNewQuestion(); // To get new question.
};

/** To get random question from Array of Questions **/
getRandomQuestions = (arr, n) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return (selected = shuffled.slice(0, n));
};

/** To get a new question **/
function getNewQuestion() {
    /* If statement to display results at the ened of the Quiz */
    if (availableQuestions.length === 0) {
        displayResults();
        return;
    }
    
    questionCounter++;
    questionCounterText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`; // Show the progress text of Question in Introduction Header.
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`; // Show the Progress Bar tracker in colour.
    currentQuestion = availableQuestions[0]; // Show the current question.
    question.innerText = currentQuestion.question;

    /* Show each option for current question */
    answers.forEach((answer) => {
        answer.innerText = currentQuestion[answer.dataset.answer];
    });

    /* For each option answer */
    answers.forEach((answer) => {
        // Return if not accepting answer.
        if (!acceptingAnswers) {
            return;
        }
        /* Event Listener to each option answer */
        answer.addEventListener("click", (e) => {
            
            acceptingAnswers = false; // Set pressed option to False and apply red coloured class.
            
            const clickedAnswer = e.target; // Targeting the data according to the pressed option.
            const answeredLetter = clickedAnswer.dataset.answer;
            let classToApply = "incorrect";
            /* Check If pressed option is correct answer */
            if (answeredLetter === currentQuestion.answer) {
                correctAudio.play(); // Audio Play code taken from - https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/12383968#overview
                incrementScore(SCORE_POINTS);
                scoreText.innerText = score;
                classToApply = "correct";
            } else {
                wrongAudio.play(); // Audio Play code taken from - https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/12383968#overview
            }

            /* Add class to pressed option */
            clickedAnswer.classList.add(classToApply);

            /* Delayed function to passing to next question */
            setTimeout(() => {
                clickedAnswer.classList.remove(classToApply);
                getNewQuestion();
                acceptingAnswers = true;
            }, 1000);
        });
    });

    /* Shift to the next question */
    availableQuestions.shift();
};

/** Start Timer code taken from - https://codepen.io/cathydutton/pen/avYKeM and edited by me **/
function startTimer() {
    tens++; 
    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }
    if (tens > 9){
      appendTens.innerHTML = tens; 
    } 
    if (tens > 99) {
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
    if (seconds > 59) {
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
}  

/** Function to increment the scores **/
function incrementScore(num) {
score += num;
scoreText.innerText = score;
}

/** To display the Modal with Result **/
displayResults = () => {
    answeredQuestions.innerHTML = "<span class='result-username'>" + player.textContent + "</span>" + ", you answered: " + "<span class='result-questions'>" + MAX_QUESTIONS +  "</span>"
     + " questions" + " of " + "<span class='result-questions'>" + MAX_QUESTIONS + "</span>";
    resultScore.innerHTML = "Your scores: " + "<span class='result-score'>" + score + "</span>";
    resultTime.innerHTML = "Your time: " + "<span class='result-time'>" + minutes + "m" + " " + seconds + "s" + " " + tens + "ms" + "</span>";
    result.innerHTML = results.innerHTML;
    results.classList.add('results-show');
};

/** Restart the Quiz **/
function restartQuiz() {
    window.location.reload(true); // Code taken from - https://www.positioniseverything.net/javascript-refresh-page/
}

  startQuiz(); // Calling the function to start the Quiz.