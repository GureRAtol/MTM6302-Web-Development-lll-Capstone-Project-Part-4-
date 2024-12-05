let cards = [];
let flippedCards = [];
let matchedCards = 0;
let timer;
let seconds = 0;
let minutes = 0;

const startButton = document.getElementById('start-game');
const gameBoard = document.getElementById('game-board');
const timerElement = document.getElementById('timer');
const matchCount = document.getElementById('match-count');

const symbols = ['🍎', '🍊', '🍌', '🍍', '🍓', '🍒', '🍉', '🍇', '🍎', '🍊', '🍌', '🍍', '🍓', '🍒', '🍉', '🍇'];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(symbol, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-id', index);
  card.setAttribute('data-symbol', symbol);
  card.innerHTML = '';  // Initially hide symbol
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard() {
  const card = this;

  // Prevent flipping if already flipped or matched
  if (flippedCards.length === 2 || card.classList.contains('flip') || card.classList.contains('matched')) {
    return;
  }

  // Flip the card
  card.innerHTML = card.getAttribute('data-symbol'); // Show symbol
  card.classList.add('flip');
  flippedCards.push(card);

  // Check for a match
  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards++;
    matchCount.textContent = matchedCards;

    // Check if game is won
    if (matchedCards === symbols.length / 2) {
      clearInterval(timer);
      alert('You win!');
    }
  } else {
    card1.innerHTML = ''; // Hide symbol
    card2.innerHTML = ''; // Hide symbol
    card1.classList.remove('flip');
    card2.classList.remove('flip');
  }

  flippedCards = [];
}

function startGame() {
  shuffledSymbols = [...symbols];
  shuffle(shuffledSymbols);

  gameBoard.innerHTML = '';  // Clear previous game
  flippedCards = [];
  matchedCards = 0;
  matchCount.textContent = matchedCards;
  seconds = 0;
  minutes = 0;
  timerElement.textContent = '00:00';

  shuffledSymbols.forEach((symbol, index) => {
    const card = createCard(symbol, index);
    gameBoard.appendChild(card);
  });

  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startButton.addEventListener('click', startGame);
