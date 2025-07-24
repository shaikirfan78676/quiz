const questions = {
    easy: [
        {
            question: "What is the capital of France?",
            answers: [
                { text: "Paris", correct: true },
                { text: "London", correct: false },
                { text: "Berlin", correct: false },
                { text: "Rome", correct: false }
            ]
        },
        {
            question: "What is 2 + 2?",
            answers: [
                { text: "3", correct: false },
                { text: "4", correct: true },
                { text: "5", correct: false },
                { text: "6", correct: false }
            ]
        },
        {
            question: "What color is the sky on a clear day?",
            answers: [
                { text: "Blue", correct: true },
                { text: "Red", correct: false },
                { text: "Green", correct: false },
                { text: "Yellow", correct: false }
            ]
        },
        {
            question: "How many legs does a spider have?",
            answers: [
                { text: "6", correct: false },
                { text: "8", correct: true },
                { text: "10", correct: false },
                { text: "12", correct: false }
            ]
        }
    ],
    medium: [
        {
            question: "Who wrote 'Hamlet'?",
            answers: [
                { text: "William Shakespeare", correct: true },
                { text: "Charles Dickens", correct: false },
                { text: "J.K. Rowling", correct: false },
                { text: "Mark Twain", correct: false }
            ]
        },
        {
            question: "What is the square root of 144?",
            answers: [
                { text: "10", correct: false },
                { text: "11", correct: false },
                { text: "12", correct: true },
                { text: "13", correct: false }
            ]
        },
        {
            question: "Which gas do plants absorb from the atmosphere?",
            answers: [
                { text: "Oxygen", correct: false },
                { text: "Carbon Dioxide", correct: true },
                { text: "Nitrogen", correct: false },
                { text: "Hydrogen", correct: false }
            ]
        },
        {
            question: "What is the capital of Japan?",
            answers: [
                { text: "Tokyo", correct: true },
                { text: "Seoul", correct: false },
                { text: "Beijing", correct: false },
                { text: "Bangkok", correct: false }
            ]
        }
    ],
    hard: [
        {
            question: "What is the speed of light?",
            answers: [
                { text: "299,792 km/s", correct: true },
                { text: "150,000 km/s", correct: false },
                { text: "1,080,000 km/h", correct: false },
                { text: "670,616 km/h", correct: false }
            ]
        },
        {
            question: "Which planet has the most moons?",
            answers: [
                { text: "Earth", correct: false },
                { text: "Jupiter", correct: true },
                { text: "Mars", correct: false },
                { text: "Saturn", correct: false }
            ]
        },
        {
            question: "What is the capital of Iceland?",
            answers: [
                { text: "Reykjavik", correct: true },
                { text: "Oslo", correct: false },
                { text: "Copenhagen", correct: false },
                { text: "Stockholm", correct: false }
            ]
        },
        {
            question: "What is the chemical symbol for gold?",
            answers: [
                { text: "Ag", correct: false },
                { text: "Au", correct: true },
                { text: "Fe", correct: false },
                { text: "Hg", correct: false }
            ]
        }
    ]
};

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let selectedLevel = '';
let totalTimeSpent = 0;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answers');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start-btn');
const backButton = document.getElementById('back-btn');
const difficultyContainer = document.getElementById('difficulty-container');
const questionContainer = document.getElementById('question-container');
const infoContainer = document.querySelector('.info');
const resultsContainer = document.getElementById('results-container');
const finalScoreElement = document.getElementById('final-score');
const timeSpentElement = document.getElementById('time-spent');
const restartButton = document.getElementById('restart-btn');

document.getElementById('easy-btn').addEventListener('click', () => selectDifficulty('easy'));
document.getElementById('medium-btn').addEventListener('click', () => selectDifficulty('medium'));
document.getElementById('hard-btn').addEventListener('click', () => selectDifficulty('hard'));
backButton.addEventListener('click', goBack);
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function selectDifficulty(level) {
    selectedLevel = level;
    difficultyContainer.classList.add('hide');
    startButton.classList.remove('hide');
    backButton.classList.remove('hide');
}

function startGame() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    answerButtonsElement.classList.remove('hide');
    infoContainer.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    totalTimeSpent = 0;
    scoreElement.innerText = `Score: ${score}`;
    timerElement.innerText = `Time: ${timeLeft}`;
    nextQuestion();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    totalTimeSpent++;
    timerElement.innerText = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
    }
}

function nextQuestion() {
    resetState();
    const question = questions[selectedLevel][currentQuestionIndex];
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(answer, selectedButton) {
    if (answer.correct) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('wrong');
    }
    if (questions[selectedLevel].length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setTimeout(() => nextQuestion(), 1000);
    } else {
        setTimeout(() => endGame(), 1000);
    }
}

function endGame() {
    clearInterval(timer);
    questionContainer.classList.add('hide');
    answerButtonsElement.classList.add('hide');
    infoContainer.classList.add('hide');
    resultsContainer.classList.remove('hide');
    finalScoreElement.innerText = score;
    timeSpentElement.innerText = totalTimeSpent;
}

function goBack() {
    clearInterval(timer);
    difficultyContainer.classList.remove('hide');
    questionContainer.classList.add('hide');
    answerButtonsElement.classList.add('hide');
    infoContainer.classList.add('hide');
    resultsContainer.classList.add('hide');
    startButton.classList.add('hide');
    backButton.classList.add('hide');
}

function restartGame() {
    resultsContainer.classList.add('hide');
    difficultyContainer.classList.remove('hide');
}