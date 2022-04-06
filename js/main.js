/*----- constants -----*/
const suits = ['c', 'd', 'h', 's'];
const faces = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K'];
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let gamesStarted = false;
let gameOver = false;
let playerWon = false;

let playerCards = [];
let dealerCards = [];

// let dTotal;
// let pTotal;

let shuffledDeck;

/*----- cached element references -----*/
let dealButton = document.querySelector('#deal-button');
let hitButton = document.querySelector('#hit-button');
let stayButton = document.querySelector('#stay-button');
let playButton = document.querySelector('#playAgain-button');
let playerCardContainer = document.getElementById('player-cards')
let dealerCardContainer = document.getElementById('dealer-cards')


// const playerTotalEl = document.getElementById('player-total');
// const dealerTotalEl = document.getElementById('dealer-total');

/*----- event listeners -----*/

// DO NOT TOUCH!!!!!!

hitButton.addEventListener('click', hit);

stayButton.addEventListener('click', stay);

dealButton.addEventListener('click', dealCards);

playButton.addEventListener('click', playAgain)

/*----- functions -----*/

init();

function init() {
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  playButton.style.display = 'none';
  shuffledDeck = getNewShuffledDeck();
  // pTotal = dTotal = 0;
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
  playButton.style.display = 'none';
  dealButton.style.display = 'none';

  gameStarted = true;
  gameOver = false;
  playerWon = false

  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];

  // dTotal = getHandTotal(dealerCards);
  // pTotal = getHandTotal(playerCards);

  render();
}

// player.Cards[0].value + playerCards[1].value
// creating a new div element
// we are creating a variable that is storing our class name to ref face value of our object which will be added to our div
// creating a card variable that creates a div that is added to our player container

function renderPlayerHand() {
  playerCards.forEach(function(playerCard) {
    const cardEl = document.createElement('div');
    cardEl.className = `card ${playerCard.face}`;
    playerCardContainer.appendChild(cardEl); 
  })
  // playerTotalEl.innerHTML = pTotal;    
}

function renderDealerHand() {
  dealerCards.forEach(function(dealerCard, idx) {
    if(idx === 1) {
      const cardEl = document.createElement('div');
      cardEl.className = `card back`;
      dealerCardContainer.appendChild(cardEl);
    } else {
      const cardEl = document.createElement('div');
    cardEl.className = `card ${dealerCard.face}`;
    dealerCardContainer.appendChild(cardEl); 
    }       
  })
  // dealerTotalEl.innerHTML = outcome ? dTotal : '??';
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
  // checkForBlackJack();
  render();
}

function stay() {
  // gameOver = true;
  // checkForBlackJack();

}

function playAgain() {

}





// function checkForBlackJack() {
//   updateScores();
//     if(gameOver) {
//         while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
//             dealerCards.push(getNextCard());
//             updateScores();
//         }
//     }
//     if (playerScore > 21) {
//         playerWon = false;
//         gameOver = true;
//     } else if (dealerScore > 21) {
//         playerWon = true;
//         gameOver = true;
//     } else if (gameOver) {
//         if (playerScore > dealerScore) {
//             playerWon = true;
//         } else {
//             playerWon = false;
//         }
//     }
// }
