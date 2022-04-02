/*----- constants -----*/
const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
const faces = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];


/*----- app's state (variables) -----*/
let deck = [];
let playerHand = new hand();
let dealerHand = new hand();

/*----- cached element references -----*/


/*----- event listeners -----*/


/*----- functions -----*/

function card(name, face, suit, value) {
    this.name = name;
    this.face = face;
    this.suit = suit;
    this.value = value;
}

function shuffleDeck() {

}

shuffleDeck();

function hand() {
    
}

function startGame() {

}

function hit() {
    
}

function stand() {
    
}

function win() {

}

function tie() {
    
}

function loss() {
    
}

function checkScore() {

}

function playAgain() {

}

function dealerTurn() {
    if(playerHand.value < 22) {
        if(computerHand.value < 17) {
          dealerHit();
          dealerTurn();
        }
        else {
          checkScore();
        }
      }
      else {
        checkScore();
      }
}