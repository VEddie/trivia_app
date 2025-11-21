const baseURL = 'https://opentdb.com/api.php?';

let nameInput = document.getElementById('playerName');
let amountInput = document.getElementById('questionAmount');
let difficultyInput = document.getElementsByName('difficulty');
let categoryInput = document.getElementsByName('category');
let startButton = document.getElementById('gameStartButton');

let gameData = null;

const fetchQuestions = (gameConfig) => {
    let questionURL = baseURL 
                    + `amount=${gameConfig.amount}&`
                    + `difficulty=${gameConfig.difficulty}&`
                    + `type=multiple`;

    if(gameConfig.category)
        questionURL += `&category=${gameConfig.category}`

    console.log(`API URL: ${questionURL}`);
};

startButton.addEventListener('click', () => {
    let gameConfig = {
        name: nameInput.value,
        amount: amountInput.value,
        score: 0
    };

    for(let i = 0; i < difficultyInput.length; i++) 
        if(difficultyInput[i].checked) {
            gameConfig.difficulty = difficultyInput[i].value;
            break;
        }
    
    for(let i = 0; i < categoryInput.length; i++) {
        if(categoryInput[i].checked) {
            gameConfig.category = categoryInput[i].value;
            break;
        }
    }
    
    fetchQuestions(gameConfig);
    
});

let timerParagraph = document.querySelector('.timer_circle');
let timeRemaining = 3;

let timerInterval = setInterval(() => {
    if(timeRemaining === 0) {
        clearInterval(timerInterval);
        timeRemaining = 20;
        timerParagraph.style.backgroundColor = '';
        timerParagraph.innerText = timeRemaining;
        return;
    }

    timeRemaining--;
    timerParagraph.innerText = timeRemaining;

    if(timeRemaining <= 5) 
        timerParagraph.style.backgroundColor = 'crimson';
}, 1000)

// API URL:?amount=val&category=val&difficulty=(easy|medium|hard)&type=multiple

// fetchQuestions()
//     .then(res => res.json())
//     .then(data => console.log(data.results[0]));

// API response structure:
// results: array
    // category: string
    // correct_answer: string
    // difficulty: string
    // incorrect_answers: array
    // question: string
        

// Category IDs:
    // General Knowledge: 9 [X]
    // Books: 10
    // Film: 11 [X]
    // Music: 12 [X]
    // Musicals & Theatres: 13
    // TV: 14 
    // Video Games: 15 [X]
    // Board Games: 16
    // Science & Nature: 17
    // Computers: 18
    // Mathematics: 19 [X]
    // Mythology: 20
    // Sports: 21 [X]
    // Geography: 22
    // History: 23
    // Politics: 24
    // Art: 25
    // Celebrities: 26
    // Animals: 27 [X]

// Difficulty