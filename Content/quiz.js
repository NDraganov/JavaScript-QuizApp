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
// Hide the quiz first loading the page.
function hide() {
    quiz.style.display = "none";
}
hide();
// Show the Quiz when START button is pressed.
function show() {
    quiz.style.display = "block";
    const title = document.querySelector('.hide1');
    title.style.display = "none";
    const paragraph = document.querySelector('.hide2');
    paragraph.style.display = "none"
    const btn = document.querySelector('.hide3');
    btn.style.display = "none";
}
button.onclick = show;
