# Javascript Quiz

This is a micro application built to showcase my understanding of how to pull HTML, CSS, and Javascript together. While I was given a the basic template of an html page to begin this, it was ultimately within my own power to decide the static html elements, the elements created by javascript, the styling, and the interaction of all of all the moving parts. This project is currently deployed and can be viewed at [https://thelbaumann.github.io/javascriptQuiz/](https://thelbaumann.github.io/javascriptQuiz/).

## About The Project

This application allows you to take a multiple-choice quiz on the topic of Javascript while being timed, scored, and holding a history of scores for you in the local storage of the browser. To begin, you see the amount of time you will have during the quiz (5 minutes), a button to view the high-score leaderboard, and a button to begin the quiz. Once the quiz begins, it goes through 10 questions. It alerts you if you have answered the question correctly or incorrectly, and only lets you to continue to the next question if you answered the current one correctly. If you answer a question incorrectly, 10 seconds is subtracted from your total time left to finish the quiz. The quiz ends either with you getting all the questions correct within the time limit or the time ending while you are still answering questions. After finishing the quiz, no matter the reason or type of turnout, you are able to enter your initials, which are then stored alongside your score in local storage and viewable on the high-scores page, even after you refresh. You can clear the high-score page at any time to start a new leaderboard.

This project works largely off of existing html elements that are hidden and shown based on what "page" you are on. All of the questions, the leaderboard page, the main page, and the "add leaderboard entry" page exist in the html already. They are hidden and shown based on javascript if/else conditionals (like is the amount of time left still greater than 0?), onclick events (begin quiz when start button is clicked, or view leaderboard by clicking "view high-scores"), or by using for loops to show a current element and hide a past one (i.e. with the questions of the quiz). I made the choice to only create html elements from scratch in javascript where needed (like with the scoreboard, where you can't preemptively create list items without knowing how many there might be). Beyond that, I am only editing the text content or hiding/showing html content that already exists. I believe this makes the most sense for functionality and efficiency of javascript code.

#### User Story
I was given the following user story to guide my development:

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

#### Acceptance Criteria
As a part of this project, I was also provided with the following standards that my project should meet:


```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```

## Walkthrough

### Landing Page - Beginning the Quiz
![screenshot of landing page](https://github.com/thelbaumann/javascriptQuiz/blob/main/images/firstScreen.png)

This site begins with quiz header, a quiz description, two buttons, and a timer. On page load, this page is run a function that "intializes": meaning that it will hide any content that doesn't belong (that could be leftover depending on what link path within the site you chose to reach the main page). It sets the timer paragraph to display the total amount of time that you will have during your quiz: five minutes. This timer does not run until you begin the quiz by clicking the start button. 

One button in the top left corner will take you to the high-score page, which is clickable at any point during the experience if you wish to exit the quiz mid-question or view the high-scores before taking the quiz. This button works via an onclick event that shifts to hide the main page content and display the leaderboard. There are a series of other conditionals set in motion by this click event that I will discuss further on the description of that page. 

The second button on the main page is to begin the quiz. By clicking this button, you are setting in motion many events. First, it resets all of the important values (which question to display to the user, amount of points, and amount of time left on the timer) to their default values. This is so if you take the quiz multiple times without refreshing, no values will carryover from the last attempt (besides scores on the leaderboard which are locally stored!)! Secondly, it sets an interval on the timer function so that it updates every second, so that the user can see in real time how much time is remaining in their attempt. Thirdly, the start button is hidden and the first question is displayed.


#### Taking the Quiz
![screenshot of the quiz in-session](https://github.com/thelbaumann/javascriptQuiz/blob/main/images/secondScreen.png) 

Once the quiz begins, there are many moving parts (many conditional statements and loops). The timer is running, so you have 5 minutes to answer 10 multiple-choice questions. You can only move on to the next question if you answer the current question correctly. The quiz will alert you if you have answered correctly or incorrectly. If you answer incorrectly, ten seconds are deducted from your remaining time. If you answer correctly, 10 points are added to your point total. These questions run a large if/else statement: 

IF the timer is above zero and the button clicked has a value of correct, add ten points, display a "correct" message, and call the NextQuestion function. The next question function operates off of an array of the question id's, in which it hides the question at the current id value, increments the currentQuestion id value (++), and then sets the question at the new array value to display. This effectively hides the current question, moves on to the next question, and displays that one. 

IF the timer is above zero and a button is clicked that does NOT have a value of correct, ten seconds are subtracted from the remaining amount of time, and an "incorrect" messaging is displayed. The question does not move on in this scenario until it is answered correctly. Within this If statement is another: IF an incorrect answer was clicked AND the time remaning is at or below 10 seconds (effectively rendering the time zero or below after the penalty for a wrong answer), the game ends.  

Finally, IF the timer is below zero and no buttons are currently being clicked, the game ends. 

No matter the scenario in which the quiz ends, you move onto the next screen to write your entry to the leaderboard! Once the timer is done or you finish the questions, the interval is cleared for the timer function, effectively stopping the timer.


#### Entering your Leaderboard Entry
![screenshot of entering a new score to the leaderboard](https://github.com/thelbaumann/javascriptQuiz/blob/main/images/thirdScreen.png) 

After completing the quiz one way or the other, the quiz will allow you to enter your initials to be added to the leaderboard. However, depending on if you finished within the allotted amount of time or not, a WinGame or LoseGame function is called. These only differ in the messaging: telling you whether or not you completed the quiz on time. They both display your score and an input field to enter your initials to the leaderboard. Upon submission of your initials, an AddHighScore function is run, which stores your initials and score as properties on an object named "highscoreEntry". This object is then added to an array in the javascript, and this array of objects is then set to an item in the local storage of the browser. I used JSON.stringify to store the array in local storage. The submission of these initials runs a ViewHighscores function which then hides the leaderboard entry page and displays the leaderboard page.


### Viewing the Leaderboard
![screenshot of the leaderboard page](https://github.com/thelbaumann/javascriptQuiz/blob/main/images/fourthScreen.png) 

The final functions of this quiz run when you enter the leaderboard page. First, any content not relevant to the leaderboard page is hidden. This is to cover any use-cases where the "view high-scores" button could be pushed from the main page, in the middle of the quiz, or while already on the leaderboard page. These statements ensure there is no irrelevant content showing on this page regardless of how or when the user navigated to it. Then, the visual list (an html ordered list) is emptied, to make sure there aren't re-entries of old scores every time the scores are appended to the list. Then, a variable is set to the value of our local storage item, and uses JSON.parse to set it back into a array of objects we can create a list with. An if statement begins: 

IF the number of scores stored are greater than zero, a "for loop" runs. A list item is created. The for loop pulls the arrayItem.initials and arrayItem.score properties for the current object, and then creates a text node using those properties. The textnode is then appended to the list element we just created, and the list element is then appended to the ordered list. It repeats this process for each time a score was recorded (i.e. each object in the array). 

IF the number of scores stored is 0, it displays messaging letting the user know no scores have been recorded yet. 

Further, two buttons reside on this page: "go back" and "clear high-scores". The Go Back button triggers an onclick function that is the same as the one on initial page load: it initializes the main page to begin another quiz. The Clear High-scores button will clear the high-scores from the variable array in the script, remove the item from the local storage array, and visually remove them from the page on the ordered list. It then displays messaging to let you know the list has been cleared.


## Installing/Dependencies
No prerequisites or browser modifications are needed to run the page online here.
If you wish to clone the project,

git clone git@github.com:thelbaumann/javascriptQuiz.git

## Credits
I consulted various sources to help me in this project.

First, I watched a [YouTube tutorial by user Florin Pop](https://www.youtube.com/watch?v=x7WJEmxNlEs) to help me with creating a simple timer that did not require me to pull the current date/time, or create a date/time to count down to, in order to function.

Secondly, I used this [Stack Overflow thread](https://stackoverflow.com/questions/43762363/how-to-store-an-array-of-objects-in-local-storage) to help me with storing and pulling objects with properties to/from localStorage in a format that would be useful for my purposes.

Thirdly, I used this [W3Schools article](https://www.w3schools.com/jsref/met_node_appendchild.asp) to help me with creating text from the information I had pulled from localStorage, creating ordered list html elements, and appending that data to them.

## Authors
Laura Baumann (https://www.linkedin.com/in/laura-baumann-070338102/)

## License
This project is licensed under [MIT](LICENSE) - 2020 Laura Baumann
