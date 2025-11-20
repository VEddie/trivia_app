const fetchQuestions = () => {
    const baseURL = 'https://opentdb.com/api.php?';
    return fetch(url);
};

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