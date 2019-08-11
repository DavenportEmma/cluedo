# Cluedo solver
The aim of this project is to develop a program that can solve a game of Cluedo. This project brief assumes the user knows the game and knows how to play the game. Rules to Cluedo are found here https://en.wikipedia.org/wiki/Cluedo#Rules.

## Motivation
This project was started after a humiliating loss in a game of Cluedo.

## Features
This program was originally written in C++ to figure out how the system should work. The C++ version has no user interaction and requires the game to be hard coded into it before compiling. The program was copied into JavaScript and embedded into the cluedo.html page to allow for user interaction.

The **Probability table** keeps track of the probability of each card being in the centre envelope. This probabilty is calculated using the following equation;	

>(1 - N<sub>y</sub>)/((N<sub>p</sub> + 1) - (N<sub>p</sub> - N<sub>m</sub>))

## How to use Cluedo solver 
This application can be found here: https://conordavenport.github.io/cluedo/.

This application is designed to be used by someone playing Cluedo. It will keep track of the cards in other player's hands and will determine the probability of each card being in the centre pile.

1. To start, the user enters the number of players. The Cluedo rules set out a minimum player count of 3 and a maximum player count of 6.

2. The user assigns a player number to each of the players. The user is player 1 and the next is player 2 and so on.

3. When the cards are dealt to each player, the user goes to the **Enter cards to yes** section. They select their player number from the drop down menu, select one of the cards they have in their hand from the next drop down menu, and press submit. They do this for all the cards they have.