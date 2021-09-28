/* Variables set for timer */
var c = 60;
var x;
var timer_start = 0;
/* Timer function that includes "Time's up" function */
function myTimer() {
    var score = quiz.score;
    var highscore = localStorage.getItem('highscore');
    document.getElementById('timer').value = c;
    c = c - 1;
    x = setTimeout('myTimer()', 1000);
    if (c < 1) {
        console.log('Game over!');
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
        clearTimeout(x);
        timer_start = 0;
        if (score > highscore) {
            localStorage.setItem('highscore', score);
            console.log("Time's up! New high score!");
            quiz.hAns.innerHTML = "Time's up! New high score!";
        } else {
            localStorage.setItem("recentScore", score)
            console.log(`The highscore is still ${highscore}`);
            quiz.hAns.innerHTML = `Time's up! The highscore is ${highscore} of 5`;
        };
    }
}
function runTimer() {
    if (!timer_start) {
        timer_start = 1;
        myTimer();
    }
    console.time();
}
/* Function that reveals Quiz upon clicking "Start" */
function revealQuiz() {
    var x = document.getElementById('quizWrap');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}
// Quiz structure pulled from https://code-boxx.com/simple-javascript-quiz/

var quiz = {
    // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
    data: [
        {
            q: "What is the syntax for logging something to the console?",
            o: [
                "console-log()",
                "console.log()",
                "log.console()",
                "log-console()"
            ],
            a: 1
        },
        {
            q: "Which of the following IS NOT a way to set a variable?",
            o: [
                "var",
                "const",
                "let",
                "set"
            ],
            a: 3
        },
        {
            q: "How would you begin a single-line comment in JavaScript?",
            o: [
                "!!",
                "/*",
                "//",
                "---"
            ],
            a: 2
        },
        {
            q: "Which method joins two or more strings?",
            o: [
                "concat()",
                "slice()",
                "trim()",
                "substr()"
            ],
            a: 0
        },
        {
            q: "Which of the following is NOT an arithmetic operator in JavaScript?",
            o: [
                "+",
                "/",
                "-",
                "&"
            ],
            a: 3
        }
    ],

    // (A2) HTML ELEMENTS
    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper

    // (A3) GAME FLAGS
    now: 0, // current question
    score: 0, // current score

    // (B) INIT QUIZ HTML
    init: function () {
        // (B1) WRAPPER
        quiz.hWrap = document.getElementById("quizWrap");

        // (B2) QUESTIONS SECTION
        quiz.hQn = document.createElement("div");
        quiz.hQn.id = "quizQn";
        quiz.hWrap.appendChild(quiz.hQn);

        // (B3) ANSWERS SECTION
        quiz.hAns = document.createElement("div");
        quiz.hAns.id = "quizAns";
        quiz.hWrap.appendChild(quiz.hAns);

        // (B4) GO!
        quiz.draw();
    },

    // (C) DRAW QUESTION
    draw: function () {
        // (C1) QUESTION
        quiz.hQn.innerHTML = quiz.data[quiz.now].q;

        // (C2) OPTIONS
        quiz.hAns.innerHTML = "";
        for (let i in quiz.data[quiz.now].o) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz";
            radio.id = "quizo" + i;
            quiz.hAns.appendChild(radio);
            let label = document.createElement("label");
            label.innerHTML = quiz.data[quiz.now].o[i];
            label.setAttribute("for", "quizo" + i);
            label.dataset.idx = i;
            label.addEventListener("click", quiz.select);
            quiz.hAns.appendChild(label);
        }
    },

    // (D) OPTION SELECTED
    select: function () {
        // (D1) DETACH ALL ONCLICK
        let all = quiz.hAns.getElementsByTagName("label");
        for (let label of all) {
            label.removeEventListener("click", quiz.select);
        }

        // (D2) CHECK IF CORRECT
        let correct = this.dataset.idx == quiz.data[quiz.now].a;
        if (correct) {
            quiz.score++;
            this.classList.add("correct");
        } else {
            this.classList.add("wrong");
            console.log('wrong')
            c = c - 10;
        }

        // (D3) NEXT QUESTION OR END GAME
        quiz.now++;
        setTimeout(function () {
            var score = quiz.score;
            var highscore = localStorage.getItem('highscore');
            if (quiz.now < quiz.data.length) { quiz.draw(); }
            else {
                quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
                quiz.hAns.innerHTML = "";
                clearTimeout(x);
                timer_start = 0;;
                /* Sets or reveals high score */
                if (score > highscore) {
                    localStorage.setItem('highscore', score);
                    console.log('New high score!');
                    quiz.hAns.innerHTML = "New high score!";
                } else {
                    localStorage.setItem("recentScore", score)
                    console.log(`The highscore is still ${highscore}`);
                    quiz.hAns.innerHTML = `The highscore is ${highscore} of 5`;
                }
            }
        }, 1000);
    },

    // (E) RESTART QUIZ
    reset: function () {
        quiz.now = 0;
        quiz.score = 0;
        quiz.draw();
    }
};
window.addEventListener("load", quiz.init);
