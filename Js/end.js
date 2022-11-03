const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScore = JSON.parse(localStorage.getItem('highScore')) || [];

const MAX_HIGH_SCORE = 5;
console.log(highScore);

finalScore.innerText = mostRecentScore;
username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value;
});
saveHighScore = (e) => {
  console.log('Clicked tge save btn');

  e.preventDefault();

  const score = {
    score: mostRecentScore,
    username: username.value,
  };
  highScore.push(score);

  highScore.sort((a, b) => b.score - a.score); //sort the high score
  highScore.splice(5);
  localStorage.setItem('highScore', JSON.stringify(highScore));
  window.location.assign('/');

  console.log(highScore);
};
