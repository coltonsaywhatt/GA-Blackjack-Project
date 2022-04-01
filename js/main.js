/*----- constants -----*/
const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
const faces = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const dealer = 'dealer';
const player = 'player';
let deck = [];
const playerHand = new hand();
const dealerHand = new hand();
let winCount = {
    player:0,
    dealer:0
}


/*----- app's state (variables) -----*/


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