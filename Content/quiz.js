// The code in the JavaScript file is taken from - https://www.youtube.com/watch?v=MxrGPP4F8Sc and edited by me.
// Questions
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
// Global Constant variables
const button = document.querySelector('#btn');
const quiz = document.getElementById('quiz');
const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const questionCounterText = document.getElementById("counter");
const scoreText = document.getElementById("score");
const progressBarFull = document.querySelector("#progressBarFull");
const progressText = document.querySelector("#progressText");
const modal = document.getElementById("endQuizModal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("close");
const restart = document.getElementById("restart");
const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");
const wrongAudio = new Audio("Content/Audio/Wrong-answer-sound-effect.mp3");
const correctAudio = new Audio("Content/Audio/Good-idea-bell.mp3");
// Hide the Quiz first loading the page - code written by me.
function hide() {
    quiz.style.display = "none";
}
// Calling the function to hide the Quiz when first time page is loaded.
hide();
// Show the Quiz - code wrriten by me.
function show() {
    quiz.style.display = "block";
    const title = document.querySelector('.hide1');
    title.style.display = "none";
    const paragraph = document.querySelector('.hide2');
    paragraph.style.display = "none"
    const btn = document.querySelector('.hide3');
    btn.style.display = "none";
}
// Calling the function to show the Quiz when Start button is pressed.
button.onclick = show;
// Variables for the Introduction Header.
let questionCounter;
let interval;
let seconds = 00;
let tens = 00;
let score;
const SCORE_POINTS = 10;
const MAX_QUESTIONS = 4;

let acceptingAnswers;
// Start the Quiz.
startQuiz = () => {
    // Set variables to 0 at the biginning.
    questionCounter = 0;
    score = 0;
    acceptingAnswers = true;
    scoreText.innerText = score;
    // Get random questions and limited the number of Questions.
    availableQuestions = getRandomQuestions(questions, MAX_QUESTIONS);
    // To get new question.
    getNewQuestion();
  };
// To get random question from Array of Questions.
getRandomQuestions = (arr, n) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return (selected = shuffled.slice(0, n));
};
// To get a new question.
getNewQuestion = () => {
    // If statement to display results at the ened of the Quiz.
    if (availableQuestions.length === 0) {
        displayResults();
        return;
    }
    // Show the progressing text of Question in Introduction Header.
    questionCounter++;
    questionCounterText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Show the Progress Bar tracker in colour.
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
    // Show the current question.
    currentQuestion = availableQuestions[0];
    question.innerText = currentQuestion.question;
    // Show each option for current question.
    answers.forEach((answer) => {
        answer.innerText = currentQuestion[answer.dataset.answer];
    });
    // For each option answer.
    answers.forEach((answer) => {
        // Return if not accepting answer.
        if (!acceptingAnswers) {
            return;
        }
        // Event Listener to each option answer.
        answer.addEventListener("click", (e) => {
            interval = setInterval(startTimer, 10);
            // Set pressed option to False and apply red coloured class.
            acceptingAnswers = false;
            // Targeting the data according to the pressed option.
            const clickedAnswer = e.target;
            const answeredLetter = clickedAnswer.dataset.answer;
            let classToApply = "incorrect";
            
            // Check If pressed option is correct answer.
            if (answeredLetter === currentQuestion.answer) {
                correctAudio.play();
                incrementScore(SCORE_POINTS);
                scoreText.innerText = score;
                classToApply = "correct";
            } else {
                wrongAudio.play();
            }
            
            // Add class to pressed option.
            clickedAnswer.classList.add(classToApply);
            // Delayed function to passing to next question.
            setTimeout(() => {
                clickedAnswer.classList.remove(classToApply);
                getNewQuestion();
                acceptingAnswers = true;
            }, 1000);
        });
    });
    // Shift to the next question.
    availableQuestions.shift();
};
// Start Timer.
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
    
  }
// Function to increment the scores.
function incrementScore(num) {
score += num;
scoreText.innerText = score;
}
// To display the Modal with Result.
displayResults = () => {
    modalBody.innerText = `You scored: ${score}You time: ${seconds}:${tens}`;
    modal.style.display = "block";
    acceptingAnswers = false;
};
// To hide the Modal.
function hideModal() {
    modal.style.display = "none";
}
//Add Event Listener to hide the Modal.
closeModal.addEventListener("click", hideModal);
restart.addEventListener("click", hideModal);
// To restart the Quiz.
restart.addEventListener("click", startQuiz);
//   Calling the function to start the Quiz.
  startQuiz();