/*----- constants -----*/
const suits = ['c', 'd', 'h', 's'];
const faces = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K'];
const masterDeck = buildMasterDeck();

// const MSG_LOOKUP = {
//   null: 'Good Luck!',
//   'T': "It's a Push",
//   'P': 'Player Wins!',
//   'D': 'Dealer Wins',
//   'PBJ': 'Player Has Blackjack 😃',
//   'DBJ': 'Dealer Has Blackjack 😔',
// };

/*----- app's state (variables) -----*/
let gameStarted = false;
let gameOver = false;
let playerWon = false;

let playerCards;
let dealerCards;

let dTotal;
let pTotal;
let outcome;

let shuffledDeck;

/*----- cached element references -----*/
let dealButton = document.querySelector('#deal-button');
let hitButton = document.querySelector('#hit-button');
let stayButton = document.querySelector('#stay-button');
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

stayButton.addEventListener('click', stand);

dealButton.addEventListener('click', dealCards);

// playButton.addEventListener('click', playAgain)

/*----- functions -----*/

init();

function init() {
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  // playButton.style.display = 'none';
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
  stayButton.style.display = 'inline';
  // playButton.style.display = 'none';
  dealButton.style.display = 'none';

  gameStarted = true;
  gameOver = false;
  playerWon = false

  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];

  dTotal = getHandTotal(dealerCards);
  pTotal = getHandTotal(playerCards);

  render();
}

// player.Cards[0].value + playerCards[1].value
// creating a new div element
// we are creating a variable that is storing our class name to ref face value of our object which will be added to our div
// creating a card variable that creates a div that is added to our player container

function renderPlayerHand() {
  // playerCards.forEach(function(playerCard) {
  //   const cardEl = document.createElement('div');
  //   cardEl.className = `card ${playerCard.face}`;
  //   playerCardContainer.appendChild(cardEl); 
  // })

  playerTotalEl.innerHTML = pTotal;
  
  playerCardContainer.innerHTML = playerCards.map(card => `<div class="card ${card.face}"></div>`).join('');
}

function renderDealerHand() {
  // dealerCards.forEach(function(dealerCard, idx) {
  //   if(idx === 1) {
  //     const cardEl = document.createElement('div');
  //     cardEl.className = `card back`;
  //     dealerCardContainer.appendChild(cardEl);
  //   } else {
  //     const cardEl = document.createElement('div');
  //   cardEl.className = `card ${dealerCard.face}`;
  //   dealerCardContainer.appendChild(cardEl); 
  //   }       
  // })

  dealerTotalEl.innerHTML = outcome ? dTotal : '??';

  dealerCardContainer.innerHTML = dealerCards.map((card, idx) => `<div class="card ${idx === 1 && !outcome ? 'back' : card.face}"></div>`).join('');
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
    if(gameOver) {
        while(dTotal < pTotal && pTotal <= 21 && dTotal <= 21) {
            dealerCards.push(getNextCard());
            dTotal = getHandTotal(dealerCards);
        }
        render();
        evaluate('player');
        evaluate('dealer');
    }
    if (pTotal > 21) {
        playerWon = false;
        gameOver = true;
    } else if (dTotal > 21) {
        playerWon = true;
        gameOver = true;
    } else if (gameOver) {
        if (pTotal > dTotal) {
            playerWon = true;
        } else {
            playerWon = false;
        }
    }
}

function evaluate (user) {
  switch (user) {
		case 'player':
			if (pTotal > 21) {
				setGameOver('Bust!', '#f06');
				return;
			} else if (pTotal == 21) {
				setGameOver('You Win!', '#0f8');
				return;
			}
		break;
			
		case 'dealer':
			if (pTotal > 21) {
				setGameOver('You Win!', '#0f8');
				return;
			} else if (pTotal == 21) {
				setGameOver('Dealer Wins :(', '#f06');
				return;
			} else {
				if (pTotal > dTotal) {
					setGameOver('You Win!', '#0f8');
				} else if (pTotal == dTotal) {
					setGameOver('It was a Draw!', '#80f');
				} else {
					setGameOver('Dealer Wins :(', '#f06');
				}
			}
		break;
	}
}