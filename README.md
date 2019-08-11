# Cluedo solver
The aim of this project is to develop a program that can solve a game of Cluedo. This project brief assumes the user knows the game and knows how to play the game. Rules to Cluedo are found here https://en.wikipedia.org/wiki/Cluedo#Rules.

## Motivation
This project was started after a humiliating loss in a game of Cluedo.

## Features
This program was originally written in C++ to figure out how the system should work. The C++ version has no user interaction and requires the game to be hard coded into it before compiling. The program was copied into JavaScript and embedded into the cluedo.html page to allow for user interaction.

Each player has three sets assigned to them; suspects, weapons, and rooms. Within these three sets are three more sets; yes, no, and maybe.


*	suspects
	*	yes
	*	no
	*	maybe
*	weapons
	*	yes
	*	no
	*	maybe
*	rooms
	*	yes
	*	no
	*	maybe


The **Probability table** keeps track of the probability of each card being in the centre envelope. This probabilty is calculated using the following equation;	

>(1 - N<sub>y</sub>)/((N<sub>p</sub> + 1) - (N<sub>p</sub> - N<sub>m</sub>))

Where *N<sub>y</sub>* is the number of players who have this card, the maximum value this can have is 1. The probability of this card being in the centre envelope drops to zero when a player has this card. *N<sub>p</sub>* is the number of players. *N<sub>m</sub>* is the number of players who might have this card, this is initiated as *N<sub>p</sub>*. This number drops as it is proven that players have or don't have this card.

The three tables below the **Probability table** are the **Player card tables**. These tables 

## How to use Cluedo solver
### Set up 
This application can be found here: https://conordavenport.github.io/cluedo/.

This application is designed to be used by someone playing Cluedo. It will keep track of the cards in other player's hands and will determine the probability of each card being in the centre pile.

1. To start, the user enters the number of players. The Cluedo rules set out a minimum player count of 3 and a maximum player count of 6.

2. The user assigns a player number to each of the players. The user is player 1 and the next is player 2 and so on.

3. When the cards are dealt to each player, the user goes to the **Enter cards to yes** section. They select their player number from the drop down menu, select one of the cards they have in their hand from the next drop down menu, and press submit. They do this for all the cards they have. The probability and card tables update as cards are entered.

4. When the user has entered their hand into their yes set they sort the cards they have not moved into their yes set into their no set. The probability and card tables update automatically.

### Playing the game
5. When a player, for example player 2 makes a guess and asks player 3 if they have suspect x, in room y, with weapon z, the user selects these cards in the **Enter guess** section. The user selects player 3 as the responding player. If player 3 shows player 2 a card the **Response** is selected as **Yes**, if player 3 has none of those cards, the **Response** is selected as **No**.

6. When the user takes their turn and asks the next player if they have suspect x, in room y, with weapon z, the user can input any cards shown to them into the next player's yes set. If the next player does not have any of those cards, the user can input the three cards; x, y, and z into the next player's no set by entering the cards into the **Enter guess** section, selecting the player's number, and selecting the **No** response.

7. As guesses are recorded the **Player guesses** tables begin to fill. It is safe to assume that when people make guesses they don't have at least one of the cards they are asking for. Use the **Player card tables** to influence your guesses.