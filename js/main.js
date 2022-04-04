/*----- constants -----*/
const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
const faces = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const masterDeck = buildMasterDeck();


/*----- app's state (variables) -----*/
let deck = [];
let playerCards = [];
let dealerCards = [];
let shuffledDeck = [];

/*----- cached element references -----*/
let dealButton = document.querySelector('#deal-button');
let hitButton = document.querySelector('#hit-button');
let stayButton = document.querySelector('#stay-button');
let playButton = document.querySelector('#playAgain-button');

/*----- event listeners -----*/
hitButton.addEventListener('click', function() {

});

stayButton.addEventListener('click', function() {

});

newGameButton.addEventListener('click', function() {

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
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    const tempDeck = [...masterDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
      // Get a random index for a card still in the tempDeck
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
  }



function playerHand() {
    
}

function dealerHand() {

}

function showPlayerValue() {

}

function showDealerValue() {

}

function playerHit() {
    
}

function playerStand() {
    
}

function checkBj() {

}

function dealerHit() {

}

function win() {

}

function tie() {
    
}

function loss() {
    
}

function playAgain() {

}