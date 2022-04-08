## Pseudocode

1.) Define required constants:
Array that will hold our suits and classes of the cards.

2.) Define required state variable:
    2.1) Deck object that will hold a empty array .
    2.2) Player & dealer hand that will hold a empty array.
    2.3) Player & dealer card total.
    2.4) Game status boolean stating if the game started or if the game is over and if the player won.  

3.) Create a button in index.html for deal, hit, stand and play again.
    3.1) Hide all buttons display and only show deal button.
    3.2) Once deal has been clicked and the game has started hide the deal button and only show the hit and stand button.
    3.3) When the game has ended set the play again button to active for it to display over. Once clicked it will run our init function to restart the game to default.

4.) Create a init function:
    4.1) Display deal button and hide others 
    4.2) Set player & dealer score = 0
    4.3) call render function.

5.) Render function:
    5.1) Call our player & dealer hand render here.

6.) Create a Master deck.

7.) Create a Shuffle deck function.

8.) Deal cards function:
    8.1) Display hit and stand buttons and hide the others.
    8.2) set game started to true / game won to false / player won to false.
    8.3) dealer & player cards array to get 2 cards each.
    8.4) Player & dealer total = their card array.

9.) Render player and dealer hands.
    9.1) set index 1 of dealer card to display face down and then show once player stands or looses.
    9.2) display player cards face up

10.) Get next card function that will shift from shuffled deck array.

11.) Hit function:
    11.1) player push get next card.
    11.2) update player card total after hit.
    11.3) call check for blackjack function.

12.) Stand function:
    12.1) set game over = true.
    12.2) call check for blackjack function.

13.) Make a get hand total function

14.) Win logic / check for black jack function:
    14.1) If game status is true and player turn is done, the dealer will hit.
    14.2) If player total > 21 = player bust.
    14.3) If dealer total > 21 = Dealer bust.
    14.4) If dealer and player total === the same it will be a push.
    14.5) If player total > dealer total = you win.
    14.6) If dealer total > player total = you loss.

15.) Once the game is over and a winner is picked set the play again button to display.
