const baseURL = 'https://opentdb.com/api.php?';
let gameData = null;

// Main Menu
let nameInput = document.getElementById('playerName');
let amountInput = document.getElementById('questionAmount');
let difficultyInput = document.getElementsByName('difficulty');
let categoryInput = document.getElementsByName('category');
let startButton = document.getElementById('gameStartButton');

// Game Screen
let timerInterval = null;
let questionText = document.querySelector('.question_text');
let questionOptions = document.getElementsByClassName('answer');
let timerParagraph = document.querySelector('.timer_circle');
let timeRemaining = 20;
let progressBar = document.querySelector('.progress_bar');
let playerScore = 0;
let progressValue = 0;
let testButton = document.getElementById('test_button');

let fetchInterval = setInterval(() => {
    if (gameData === null) return;

    else {
        clearInterval(fetchInterval);
        console.log(gameData);
        loadNextQuestion();
    }
}, 1000);

let fetchQuestions = (gameConfig) => {
    let questionURL = baseURL
        + `amount=${gameConfig.amount}&`
        + `difficulty=${gameConfig.difficulty}&`
        + `type=multiple`

    if (gameConfig.category)
        questionURL += `&category=${gameConfig.category}`

    return fetch(questionURL);
};

let resetTimer = () => {
    timerInterval = setInterval(() => {
        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            timeRemaining = 20;
            timerParagraph.style.backgroundColor = '';
            timerParagraph.innerText = timeRemaining;
            return;
        }

        timeRemaining--;
        timerParagraph.innerText = timeRemaining;

        if (timeRemaining <= 5)
            timerParagraph.style.backgroundColor = 'crimson';
    }, 1000);
}

let shuffleAnswers = (arr) => {
    let shuffled = window.structuredClone(arr);

    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = k;
    }

    return shuffled;
};

let resetOptionBackgrounds = () => {
    for(let i = 0; i < questionOptions.length; i++)
        questionOptions[i].style.backgroundColor = '';
}

let loadNextQuestion = () => {
    if (gameData.length === 0) return;

    resetTimer();

    let currentQuestion = gameData.shift();
    let answers = shuffleAnswers([...currentQuestion.incorrect_answers, currentQuestion.correct_answer]);
    questionText.innerText = currentQuestion.question;

    progressValue += (1/questionAmount.value) * 100
    progressBar.style.width = progressValue + '%';

    console.log(`Correct answer: ${currentQuestion.correct_answer}`);

    setTimeout(() => {
        loadNextQuestion();
    }, 21000);

    for(let i = 0; i < answers.length; i++) {
        questionOptions[i].innerText = answers[i];
        questionOptions[i].addEventListener('click', (event) => {
            if(event.target.innerText === currentQuestion.correct_answer) 
                questionOptions[i].style.backgroundColor = '#54AE4A';
            
            else {
                questionOptions[i].style.backgroundColor = 'crimson';
                [... questionOptions]
                    .filter(option => option.innerText === currentQuestion.correct_answer)
                    .shift()
                    .style.backgroundColor = '#54AE4A';

                clearInterval(timerInterval)
            }

            setTimeout(() => {
                console.log('loading next question...')
            }, 2000)
            
        });
    }
}


startButton.addEventListener('click', () => {
    let gameConfig = {
        name: nameInput.value,
        amount: amountInput.value,
        score: 0
    };

    for (let i = 0; i < difficultyInput.length; i++)
        if (difficultyInput[i].checked) {
            gameConfig.difficulty = difficultyInput[i].value;
            break;
        }

    for (let i = 0; i < categoryInput.length; i++) {
        if (categoryInput[i].checked) {
            gameConfig.category = categoryInput[i].value;
            break;
        }
    }

    fetchQuestions(gameConfig);

});

testButton.addEventListener('click', () => {
    const URL = 'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple&category=15';
    fetch(URL)
        .then(response => response.json())
        .then(data => gameData = data.results);
});