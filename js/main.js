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

let dealerScore = 0;
let playerScore = 0;

let shuffledDeck;
let value;

/*----- cached element references -----*/
let dealButton = document.querySelector('#deal-button');
let hitButton = document.querySelector('#hit-button');
let stayButton = document.querySelector('#stay-button');
let playButton = document.querySelector('#playAgain-button');
let playerCardContainer = document.getElementById('player-cards')
let dealerCardContainer = document.getElementById('dealer-cards')

/*----- event listeners -----*/

// DO NOT TOUCH!!!!!!

hitButton.addEventListener('click', hit);


stayButton.addEventListener('click', stay);
  // gameOver = true;

dealButton.addEventListener('click', dealCards);


playButton.addEventListener('click', playAgain)
  // gamesStarted = true;
  // gameOver = false;
  // playerWon = false;


/*----- functions -----*/

init();

function init() {
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  playButton.style.display = 'none';
  shuffledDeck = getNewShuffledDeck();
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


// player.Cards[0].value + playerCards[1].value
// creating a new div element
// we are creating a variable that is storing our class name to ref face value of our object which will be added to our div
// creating a card variable that creates a div that is added to our player container
// 
function renderPlayerHand() {
  playerCards.forEach(function(playerCard) {
    const cardEl = document.createElement('div');
    // giving a class name 
    cardEl.className = `card ${playerCard.face}`;
    playerCardContainer.appendChild(cardEl);
    //console.log(`"playerCard" ${playerCard.face}`)
    
    // $('#player-cards').appendChild('<div class="player-value">' + dealerCards + '</div');

  });
    
}

function renderDealerHand() {
  dealerCards.forEach(function(dealerCard) {
    const CardEl = document.createElement('div');
    cardEl.className = `card ${dealerCard.face}`;
    dealerCardContainer.appendChild(cardEl);    
  })

}

function getNextCard() {
  return shuffledDeck.shift();
}

function hit() {
  playerCards.push(getNextCard());
  render();
}

function dealCards() {
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  playButton.style.display = 'none';
  dealButton.style.display = 'none';

  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];

  render();
  // checkBj();
}

function stay() {
  // checkBj();
}



// function getCardValue(card) {
//   switch (card.rank) {
//     case 'A':
//       return 1;
//     case 2:
//       return 2;
//     case 3:
//       return 3;
//     case 4:
//       return 4;
//     case 5:
//       return 5;
//     case 6:
//       return 6;
//     case 7:
//       return 7;
//     case 8:
//       return 8;
//     case 9:
//       return 9;
//     default:
//       return 10;
//   }
// }

// function getScore(cardArray) {
//   let score = 0;
//   let hasAce = false;
//   for (let i = 0; i < cardArray.length; i++) {
//     let card = cardArray[i];
//     score += getCardValue(card);
//     if (card === "Ace") {
//       hasAce = true;
//     }
//   }
//   if (hasAce && score + 10 <= 21) {
//     return score + 10;
//   }
//   return score;
// }

// function updateScores() {
//   let dealerScore = getScore(dealerCards);
//   let playerScore = getScore(playerCards);
// }







// function checkBj() {
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

function playAgain() {

}

// function showPlayerValue() {
//   $('.player-cards').appendChild('<div class="player-value">' + playerCards + '</div');
// }

// function showDealerValue() {
//   $('.dealer-cards').appendChild('<div class="computer-value">' + dealerCards + '</div');
// }

