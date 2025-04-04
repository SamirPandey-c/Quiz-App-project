const questions = [
    {
        question: "What is the largest mammal in the world?",
        answers:[
            { text: "Blue Whale", correct:true},
            { text: "Elephant", correct:false},
            { text: "Giraffe", correct:false},
            { text: "Rhino", correct:false},
        ]
    },
    {
        question: "Which animal is known as the 'Ship of the Desert'?",
        answers:[
            { text: "Zebra", correct:false},
            { text: "Camel", correct:true},
            { text: "Horse", correct:false},
            { text: "Bull", correct:false},
        ]
    },
    {
        question: "How many legs does a spider have?",
        answers:[
            { text: "Two", correct:false},
            { text: "No Legs", correct:false},
            { text: "Eight", correct:true},
            { text: "Four", correct:false},
        ]
    },
    {
        question: "What is the main diet of a panda?",
        answers:[
            { text: "Grass", correct:false},
            { text: "Fruits", correct:false},
            { text: "Bamboo", correct:true},
            { text: "SugarCane", correct:false},
        ]
    },
    {
        question: "What is the smallest bird in the world?",
        answers:[
            { text: "Hummingbird", correct:true},
            { text: "Sparrow", correct:false},
            { text: "Pegion", correct:false},
            { text: "Parrot", correct:false},
        ]

    },
    {
        question: "How many hearts does an octopus have?",
        answers:[
            { text: "One", correct:false},
            { text: "Two", correct:false},
            { text: "Three", correct:true},
            { text: "Four", correct:false},
        ]
    },
    {
        question: "Which mammal is known to have the most powerful bite?",
        answers:[
            { text: "Hippo", correct:true},
            { text: "Lion", correct:false},
            { text: "Elephant", correct:false},
            { text: "Leopard", correct:false},
        ]
    },
    {
        question: "What is the only mammal capable of true flight?",
        answers:[
            { text: "Peguine", correct:false},
            { text: "Crow", correct:false},
            { text: "Elephant", correct:false},
            { text: "Bats", correct:true},
        ]
    },
    {
        question: ": Which animal can sleep for three years?",
        answers:[
            { text: "Snake", correct:false},
            { text: "Snail", correct:true},
            { text: "Bear", correct:false},
            { text: "Bats", correct:false},
        ]
    },
    {
        question: ": Which is the fastest land animal?",
        answers:[
            { text: "Leopard", correct:false},
            { text: "Squirrel", correct:false},
            { text: "Tiger", correct:false},
            { text: "Cheeta", correct:true},
        ]
    }
]
document.addEventListener('DOMContentLoaded', function () {
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("ans-button");
    const nextButton = document.getElementById("next-btn");

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Next";
        showQuestion();
    }

    function showQuestion() {
        
        resetState(); 

        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        });
    }

    function resetState() {
        
        if (nextButton) {
            nextButton.style.display = "none";
        }

        
        while (answerButtons && answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        }
        else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add('correct');
            }
            button.disabled = true;
        })
        nextButton.style.display = 'block';
    }

    function showScore(){
        resetState();
        questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again!";
        nextButton.style.display = "block";
    }

    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion()
        }else{
            showScore();
        }
    }

    nextButton.addEventListener("click", () => {
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
    })

    startQuiz();
});

