// variables

    // assigning variable names to html elements for shorthand

var clock = document.getElementById("clockdiv");

var questionList = document.getElementById("questionList");

var startBtn = document.getElementById("startBtn");

var answerMsg = document.getElementById("answerMsg");

var answerMsgDiv = document.getElementById("answerMsgDiv")

var pointCount = document.getElementById("points");

var gameOutcome = document.getElementById("gameOutcome");

var submitInitials = document.getElementById("submitInitials");

var enterInitialsScreen = document.getElementById("addToLeaderboard");

var initialsInput = document.getElementById("initials");

var leaderboardScreen = document.getElementById("highScoreScreen");

var highscoreList = document.getElementById("highscoreList");


// variables that do or will hold values

var qDisplay = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"]

var currentQuestion = 0;

var points;

var interval;

var startTimeMinutes;

var time;

var highscores = [];

var localHighscores;


// event listeners

startBtn.addEventListener("click", startQuiz);

questionList.addEventListener("click", validateAnswer);

submitInitials.addEventListener("click", addHighscore);

document.getElementById("goBack").addEventListener("click", initializeStartScreen);

document.getElementById("clearHighscores").addEventListener("click", clearHighscores);

document.getElementById("viewHighscores").addEventListener("click", viewHighscores);

window.addEventListener("load", initializeStartScreen);


// functions
    // functions - initialize gameplay

function initializeStartScreen() {
    // reset anything that could come from accessing this screen from a variety of situations
    gameOutcome.innerHTML = "";
    leaderboardScreen.style.display = "none";
    enterInitialsScreen.style.display = "none";
    startBtn.style.display = "block";
    pointCount.style.display = "block";
    clock.style.display = "block";
    answerMsgDiv.style.display = "none";

    // setup the main screen before the game begins
    pointCount.innerHTML = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score time by ten seconds!";
    clock.innerHTML = "Time Remaining: 5:00";
    
}

function startQuiz() {
    // make sure that every time the quiz begins everything is resetting to their original values, even if no page refresh
    pointCount.innerHTML = "Points: 0"
    startTimeMinutes = 5;
    time = startTimeMinutes * 60;
    points = 0;
    currentQuestion = 0;
    answerMsgDiv.style.display = "block";
    answerMsg.style.display = "none";

    // fixes the slight lag that happens upon the timer starting 
    time = time -1;

    // start the timer, hide the start button, display the first question
    interval = setInterval(updateCountdown, 1000);
    startBtn.style.display = "none";
    document.getElementById(qDisplay[currentQuestion]).style.display="block";

}

function updateCountdown() {

    // calculates the minutes and seconds for the timer
    var minutes = Math.floor(time/60);
    var seconds = time % 60;

    // adds the necessary 0 for syntax if the seconds are in single digits
    if (seconds < 10) {
        clock.innerHTML = "Time Remaining: " + minutes + ':' + '0' + seconds;
    }
    else if (seconds > 10) {
        clock.innerHTML = "Time Remaining: " + minutes + ':' + seconds;
    }
    time--;

    // if the timer expires or attempts to go below 00:00 at any time, end the game
    if (time==0 || time < 0) {
        lostGame();
    }

}

    // functions - validate gameplay

function validateAnswer(e) {

    // validate answers if the timer hasn't expired
    if (time>0) {

        // if clicking on a button given the value of correct, add points, send "correct" messaging, move to next question
        if (e.target.getAttribute('value') === "correct") {
            console.log('this answer is correct!');
            nextQuestion();
            points += 10;
            pointCount.innerHTML = "Points: " + points;
            answerMsg.innerHTML = "Correct!";
            answerMsg.style.display = "block";
        }

        // if clicking on a button without the value of correct, send "incorrect" messaging and deduct time
        else if (e.target.nodeName === "BUTTON") {
            console.log("you're an idiot");
            answerMsg.innerHTML = "Wrong answer, try again!";
            answerMsg.style.display = "block";
            // if the time decrement would take the time to zero or below, end the game
            if (time>=10) {
            time = time -10;
            }
            else {
                lostGame();
            }
        }

    }

    // if timer ends before the user has answered all questions correctly, end game with "do better" messaging
    else {
        lostGame();
    }

}



function nextQuestion() {
    // move across the array of questions to hide the last one and display the next, until the end of the question array
    if (currentQuestion<(qDisplay.length-1)) {
        document.getElementById(qDisplay[currentQuestion]).style.display = "none";
        currentQuestion++;
        document.getElementById(qDisplay[currentQuestion]).style.display = "block";
    }

    // if no more questions to move onto, end the game with a winning message
    else {
        wonGame();
    }
}

    // functions - ending the game

function wonGame() {
    // stop the timer from running, hide the unnecessary data, send a winning message, and user input of initials to the leaderboard
    clearInterval(interval);
    clock.style.display = "none";
    answerMsgDiv.style.display = "none";
    answerMsg.style.display = "none";
    document.getElementById(qDisplay[currentQuestion]).style.display = "none";
    gameOutcome.innerHTML = "You've won the game! Congratulations. Enter your initials to add your score to the leaderboard!";
    pointCount.innerHTML = "Your final score is: " + points;
    enterInitialsScreen.style.display = "block";
}

function lostGame() {
    // stop the timer from running, hide the unnecessary data, send a "do better" message, and user input of initials to the leaderboard
    clearInterval(interval);
    clock.style.display = "none";
    answerMsg.style.display = "none";
    document.getElementById(qDisplay[currentQuestion]).style.display = "none";
    gameOutcome.innerHTML = "Uh oh! You ran out of time. Enter your initials to add your score to the leaderboard!";
    pointCount.innerHTML = "Your final score is: " + points;
    enterInitialsScreen.style.display = "block";
}

function addHighscore() {

    // create an object with properties for initials and score
    var highscoreEntry = {
        initials: initialsInput.value,
        score: points
    }

    // add this new object to the highscores array
    highscores.push(highscoreEntry);

    localStorage.setItem("highscores", JSON.stringify(highscores));

    // call the screen to view the leaderboard
    viewHighscores();
}

function viewHighscores() {
    // hide everything not highscore related from this page -- regardless of if coming from a game or homescreen
    clearInterval(interval);
    enterInitialsScreen.style.display = "none";
    clock.style.display = "none";
    answerMsg.style.display = "none";
    pointCount.style.display = "none";
    startBtn.style.display = "none";
    document.getElementById(qDisplay[currentQuestion]).style.display = "none";

    // makes sure the score list doesn't repeat itself, if the user accesses the highscore screen multiple times
    highscoreList.innerHTML = "";

    // adds the highscores to local storage
    localHighscores = JSON.parse(localStorage.getItem("highscores") || "[]");

    // only run the for loop if there is anything in the highscores array
    if (localHighscores.length > 0) {

        // loop through all objects in the highscore array to add their properties to a list element which is then appended to the list
        for (i = 0; i<localHighscores.length; i++) {
            var listElement = document.createElement("LI");
            var liText = document.createTextNode(localHighscores[i].initials + " - " + localHighscores[i].score);
            listElement.appendChild(liText);
            highscoreList.appendChild(listElement);    
        }

    }

    // otherwise, run a message saying no current scores to display to the user
    else {
        highscoreList.innerHTML = "No scores to show (yet)!"
    }

    // show leaderboard screen
    gameOutcome.innerHTML = "Highscores";
    leaderboardScreen.style.display = "block";


}


function clearHighscores() {

    // clears the highscores visually, from the code array, and from the localStorage
    highscores = [];
    highscoreList.innerHTML = "You've cleared the highscore board!";
    localStorage.removeItem("highscores");
}



    

