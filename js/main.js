/*----- constants -----*/
const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
const faces = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const masterDeck = buildMasterDeck();


/*----- app's state (variables) -----*/
// let deck = [];
let gamesStarted = false;
let gameOver = false;
let playerWon = false;
let playerCards = [];
let dealerCards = [];
let dealerScore = 0;
let playerScore = 0;
let shuffledDeck = [];

/*----- cached element references -----*/
let dealButton = document.querySelector('#deal-button');
let hitButton = document.querySelector('#hit-button');
let stayButton = document.querySelector('#stay-button');
let playButton = document.querySelector('#playAgain-button');

/*----- event listeners -----*/
hitButton.addEventListener('click', function() {
  return shuffledDeck.shift();
});

stayButton.addEventListener('click', function() {
  gameOver = true;
  checkBj();
});

dealButton.addEventListener('click', function() {
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  playButton.style.display = 'none';
  dealButton.style.display = 'none';

});

playButton.addEventListener('click', function() {
  gamesStarted = true;
  gameOver = false;
  playerWon = false;

});

/*----- functions -----*/

startGame();

function startGame() {
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  playButton.style.display = 'none';
  deck = getNewShuffledDeck();
  render();
}

function render() {
  console.log(deck)
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



function playerHand() {
    
}

function dealerHand() {

}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
      let card = cardArray[i];
      score += getCardNumericValue(card);
      if (card.value === 'Ace') {
          hasAce = true;
      }
  }
  if (hasAce && score + 10 <= 21) {
      return score + 10;
  }
  return score;
}

function getCardValue(card) {
  switch (card.value) {
    case "Ace":
      return 1;
    case "Two":
      return 2;
    case "Three":
      return 3;
    case "Four":
      return 4;
    case "Five":
      return 5;
    case "Six":
      return 6;
    case "Seven":
      return 7;
    case "Eight":
      return 8;
    case "Nine":
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardValue(card);
    if (card.value === "Ace") {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkBj() {
  updateScores();
    if(gameOver) {
        while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }
    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    } else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        } else {
            playerWon = false;
        }
    }
}

function playAgain() {

}