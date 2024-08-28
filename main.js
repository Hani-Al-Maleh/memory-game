const cardsEls = document.querySelectorAll('.card');
const movesEl = document.querySelector('.moves');
const scoreEl = document.querySelector('.score');
const restartBtnEl = document.getElementById('restart-btn');
const gameOverModalEl = document.getElementById('game-over-modal');
const gameOvermessageEl = document.getElementById('game-over-message');
let score = 0;
let moves = 14;
let flippedCards = [];
let matchedPairs = 0;
const images = [
  'face-1.jpg',
  'face-2.jpg',
  'face-3.jpg',
  'face-4.jpg',
  'face-5.jpg',
  'face-6.jpg',
  'face-7.jpg',
  'face-8.jpg',
];

const startGame = () => {
  const cardValues = [...Array(8).keys(), ...Array(8).keys()];
  cardValues.sort(() => Math.random() - 0.5);
  cardsEls.forEach((card, index) => {
    const imgPath = images[cardValues[index]];
    card.dataset.cardValue = cardValues[index];
    card.querySelector('.front img').src = imgPath;
    card.classList.remove('switch');
  });
};
const cardClickHandler = (e) => {
  if (
    flippedCards.length < 2 &&
    !e.currentTarget.classList.contains('switch')
  ) {
    e.currentTarget.classList.add('switch');
    flippedCards.push(e.currentTarget);

    if (flippedCards.length === 2) {
      moves--;
      movesEl.textContent = moves;

      if (
        flippedCards[0].dataset.cardValue === flippedCards[1].dataset.cardValue
      ) {
        score++;
        scoreEl.textContent = score;
        flippedCards = [];
        matchedPairs++;

        if (matchedPairs === 8) {
          gameOvermessageEl.textContent = `Congratulations! You won with a score of ${score}!`;
          gameOverModalEl.classList.remove('hidden');
        }
      } else {
        setTimeout(() => {
          flippedCards.forEach((card) => card.classList.remove('switch'));
          flippedCards = [];
        }, 1500);
      }

      if (moves === 0 && matchedPairs < 8) {
        setTimeout(() => {
          cardsEls.forEach((card) => {
            card.classList.remove('switch');
          });
          gameOvermessageEl.textContent = 'Game Over! You ran out of moves!';
          gameOverModalEl.classList.remove('hidden');
        }, 1500);
      }
    }
  }
};

const restartGame = () => {
  score = 0;
  moves = 14;
  matchedPairs = 0;
  flippedCards = [];

  scoreEl.textContent = '0';
  movesEl.textContent = '14';
  gameOverModalEl.classList.add('hidden');

  startGame();
};
cardsEls.forEach((card) => card.addEventListener('click', cardClickHandler));
restartBtnEl.addEventListener('click', restartGame);

startGame();
