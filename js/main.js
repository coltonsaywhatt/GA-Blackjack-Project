/*----- constants -----*/
const suits = ['c', 'd', 'h', 's'];
const faces = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K'];
const masterDeck = buildMasterDeck();
const MSG_LOOKUP = {
  null: 'Good Luck!',
  'T': "It's a Push",
  'P': 'Player Wins!',
  'D': 'Dealer Wins',
  'PBJ': 'Player Has Blackjack 😃',
  'DBJ': 'Dealer Has Blackjack 😔',
};
/*----- app's state (variables) -----*/
let gameStarted = false;
let gameOver = false;
let playerWon = false;
let playerCards;
let dealerCards;
let dTotal;
let pTotal;
let shuffledDeck;
let outcome;
/*----- cached element references -----*/
let dealButton = document.querySelector('#deal-button');
let hitButton = document.querySelector('#hit-button');
let standButton = document.querySelector('#stand-button');
let playButton = document.querySelector('#playAgain-button');
let playerCardContainer = document.getElementById('player-cards')
let dealerCardContainer = document.getElementById('dealer-cards')
const playerTotalEl = document.getElementById('player-total');
const dealerTotalEl = document.getElementById('dealer-total');
const setGameOver = (msg, color) => {
  document.querySelector('.gameOver__msg').setAttribute('data-msg', msg);
  document.querySelector('.gameOver__msg').style.color = color;
  document.querySelector('.gameOver').classList.add('active');
}
/*----- event listeners -----*/
// DO NOT TOUCH!!!!!!
hitButton.addEventListener('click', hit);
standButton.addEventListener('click', stand);
dealButton.addEventListener('click', dealCards);
playButton.addEventListener('click', init);
/*----- functions -----*/
init();

function init() {
  document.querySelector('.gameOver').classList.remove('active');
  dealButton.style.display = 'inline';
  hitButton.style.display = 'none';
  standButton.style.display = 'none';
  shuffledDeck = getNewShuffledDeck();
  playerCards = [];
  dealerCards = [];
  pTotal = dTotal = 0;
  render();
}

function render() {
  renderPlayerHand();
  renderDealerHand();
}

function buildMasterDeck() {
  const deck = [];
  suits.forEach(function(suit) {
    faces.forEach(function(rank) {
      deck.push({
        face: `${suit}${rank}`,
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

function getNewShuffledDeck() {
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function dealCards() {
  hitButton.style.display = 'inline';
  standButton.style.display = 'inline';
  dealButton.style.display = 'none';
  gameStarted = true;
  gameOver = false;
  playerWon = false
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];
  dTotal = getHandTotal(dealerCards);
  pTotal = getHandTotal(playerCards);
  checkForBlackJack();
  render();
}

function renderPlayerHand() {
  playerTotalEl.innerHTML = pTotal;
  playerCardContainer.innerHTML = playerCards.map(card => `<div class="card ${card.face}"></div>`).join('');
}

function renderDealerHand() {
  dealerTotalEl.innerHTML = gameOver ? dTotal : '??';
  dealerCardContainer.innerHTML = dealerCards.map((card, idx) => `<div class="card ${idx === 1 && !gameOver ? 'back' : card.face}"></div>`).join('');
}

function clearHand() {
  Array.from(playerCardContainer.children).forEach(function(card) {
    playerCardContainer.removeChild(card)
  })
  Array.from(dealerCardContainer.children).forEach(function(card) {
    dealerCardContainer.removeChild(card)
  })
}

function getNextCard() {
  return shuffledDeck.shift();
}

function hit() {
  clearHand();
  playerCards.push(getNextCard());
  pTotal = getHandTotal(playerCards);
  checkForBlackJack();
  render();
}

function stand() {
  gameOver = true;
  checkForBlackJack();
  render();
}

function getHandTotal(hand) {
  let total = 0;
  let aces = 0;
  hand.forEach(function(card) {
    total += card.value;
    if (card.value === 11) aces++;
  });
  while (total > 21 && aces) {
    total -= 10;
    aces--;
  }
  return total;
}

function checkForBlackJack() {
  if (gameOver) {
    while (dTotal < pTotal && pTotal <= 21 && dTotal <= 21) {
      dealerCards.push(getNextCard());
      dTotal = getHandTotal(dealerCards);
    }
    render();
  }
  if (pTotal > 21) {
    playerWon = false;
    gameOver = true;
    setTimeout(() => {
      setGameOver('Bust!', '#f06');
    }, 1000);
    return;
  } else if (dTotal > 21) {
    playerWon = true;
    gameOver = true;
    setTimeout(() => {
      setGameOver('You Win! 😃', '#0f8');
    }, 1000);
  } else if (pTotal >= 17 && pTotal == dTotal) {
    playerWon = false;
    gameOver = true;
    setGameOver("It's a Push!", '#80f');
  } else if (gameOver) {
    if (pTotal > dTotal) {
      playerWon = true;
      gameOver = true;
      setTimeout(() => {
        setGameOver('You Win! 😃', '#0f8');
      }, 1000);
    } else {
      playerWon = false;
      gameOver = true;
      setTimeout(() => {
        setGameOver('Dealer Wins 😔', '#f06');
      }, 1000);
    }
  }
}