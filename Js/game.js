const question = document.getElementById('question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progresText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const questionNumber = document.getElementById('questionNumber');
const nextBtn = document.getElementById('next-btn');
// const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [];

fetch(
  'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestion) => {
    questions = loadedQuestion.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1; //getting the index number of answer for our format
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      ); //push the correct answer to the correct index of anwer choice
      //console.log(loadedQuestion);
      // console.log(answerChoices);

      answerChoices.forEach((choice, index) => {
        formattedQuestion['choice' + (index + 1)] = choice;
      });
      // console.log(formattedQuestion);

      return formattedQuestion;
    });
    startGame();
  });
// .catch((err) => {
//   console.log('Error message');
// });

//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestion = [...questions];
  // console.log(availableQuestion);

  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    //go to the end page
    return window.location.assign('../html/end.html');
  }
  questionCounter++;
  progresText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS} `;
  //update the progress bar
  // progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestion.length);

  currentQuestion = availableQuestion[questionIndex];
  questionNumber.innerText = `Q ${questionCounter}:`;
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestion.splice(questionIndex, 1); //remove the current question from available question index
  // console.log(availableQuestion);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = parseInt(selectedChoice.dataset['number']);

    const classToApply =
      selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';

    selectedChoice.parentElement.classList.add(classToApply);

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }
    nextBtn.addEventListener('click', () => {
      console.log(questionCounter);
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    });
    // setTimeout(() => {
    //   selectedChoice.parentElement.classList.remove(classToApply);
    //   getNewQuestion();
    // }, 1000);
  });
});
console.log(questionCounter);

incrementScore = (num) => {
  score += num;
  scoreText.innerText = `Score: ${score}`;
};
