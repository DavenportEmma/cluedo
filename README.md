# Cluedo solver
The aim of this project is to develop a program that can solve a game of Cluedo. This project brief assumes the user knows the game and knows how to play the game. Rules to Cluedo are found here https://en.wikipedia.org/wiki/Cluedo#Rules. This program compiles sorts all of the cards, the suspects, rooms, and weapons into three sets for each player. The yes set contains cards that we know the player has, the no set contains cards that we know the player doesn't have, and the maybe set contains cards that the player might have.

## Motivation
This project was started after a humiliating loss in a game of Cluedo.

## Features
This program was originally written in C++ to figure out how the system should work. The C++ version has no user interaction and requires the game to be hard coded into it before compiling. The program was copied into JavaScript and embedded into the cluedo.html page to allow for user interaction.

## How to use the Cluedo solver 
This application can be found here: https://conordavenport.github.io/cluedo/.

This application is designed to be used by someone playing Cluedo. It will keep track of the cards in other player's hands and will determine the probability of each card being in the centre pile.

1. To start, the user enters the number of players. The Cluedo rules set out a minimum player count of 3 and a maximum player count of 6.

2. The user assigns a player number to each of the players. The user is player 1 and the next is player 2 and so on.

3. When the cards are dealt to each player, the user goes to the **Enter cards to yes** section. They select their player number from the drop down menu, select one of the cards they have in their hand from the next drop down menu, and press submit. They do this for all the cards they have.
The **Probability table** 