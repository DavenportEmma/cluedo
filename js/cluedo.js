// list of all cards
var suspectNames = ["green","mustard","peacock","plum","scarlet","white"];
var weaponNames = ["candlestick","dagger","pipe","revolver","rope","spanner"];
var roomNames = ["ballroom","billiard","conservatory","dining","hall","kitchen","library","lounge","study"];

var Np = 6;	// number of players
var players = [];	// array of player objects with suspect, weapon, and room yes, no, and maybe arrays
var suspectList = [];
var weaponList = [];
var roomList = [];

// initiate array with invalid entries
function initPlayerArray()
{
	console.log("initiate player array");
	var p = 	// player object 
	{
		id:0,	// identification number
		suspects:
		{
			yes:[],	// it is known the player has these suspects
			no:[],	// it is known the player doesn't have these suspects
			maybe:suspectNames,	// the player might have these suspects
			maybeGuessed:suspectNames	// player might have these suspects, card is removed from this array when player guesses, assumes player doesn't guess about cards they have
			},
		weapons:
		{
			yes:[],
			no:[],
			maybe:weaponNames,
			maybeGuessed:weaponNames
		},
		rooms:
		{
			yes:[],
			no:[],
			maybe:roomNames,
			maybeGuessed:roomNames
		},
		guesses:[],	// to hold guesses made at this player
	};

	for(var i = 0; i < 6; i++)
	{
		var a = JSON.parse(JSON.stringify(p));	// copy object p by value
		a.id = i;
		players.push(a);
	}
}

function initCardArray()
{
	console.log("initiate card array");
	var probability = 1 / (Np + 1);
	var card = 
	{
		name:"",	// name of card
		Nm:Np,	// number of times card is in maybe array, all players might have this card
		Ny:0,	// number of times card is in yes array, all players start with empty yes arrays
		prob:probability,	// probability card is in centre pile
		NmGuessed:Np,	// number of times card is in maybeGuessed array, card is removed from maybeGuessed array when card has been guessed by the player
		probGuessed:probability	// probability of card being in centre pile, calculated using NmGuessed variable
	};
	var i, c;
	for(i = 0; i < suspectNames.length; i++)	// fill suspectList with card objects
	{
		c = Object.create(card);	// copy card object by value
		c.name = suspectNames[i];	// enter name of card
		suspectList.push(c);	// push card to suspectList
	}
	for(i = 0; i < weaponNames.length; i++)
	{
		c = Object.create(card);
		c.name = weaponNames[i];
		weaponList.push(c);
	}
	for(i = 0; i < roomNames.length; i++)
	{
		c = Object.create(card);
		c.name = roomNames[i];
		roomList.push(c);
	}
	updateProbTable();	// update probability table
	updateProbGuessedTable();
}

// move all cards from maybe to no array
function fillNoArray(playerNum)
{
	if(playerNum > (Np-1))	// if the input player is greater than the total number of players	
	{
		alert("invalid player");
		return;
	}
	var i;

	while(players[playerNum].suspects.maybe.length > 0)	// while there are elements in the maybe array
	{
		enterCardToNo(playerNum, players[playerNum].suspects.maybe[0]);	// remove the first element of the array
		// enterCardToNo uses splice() to remove elements from arrays
		// this will pop elements off the front and shift everything forwards
		// the size of the array is constantly changing, that's why a while loop is being used
	}
	while(players[playerNum].weapons.maybe.length > 0)
	{
		enterCardToNo(playerNum, players[playerNum].weapons.maybe[0]);
	}
	while(players[playerNum].rooms.maybe.length > 0)
	{
		enterCardToNo(playerNum, players[playerNum].rooms.maybe[0]);
	}
}

// update card probabilities in table
function updateProbTable()
{
	console.log("update probability table");
	var table = document.getElementById("probabilityTable").rows;	// get probability table, collection of all rows
	// update suspect probabilities
	var i, d;
	for(i = 1; i < 7; i++)	// iterate through rows, row header at 0, 6 suspects
	{   
		d = table[i].cells;	// d is the collection of cells in row i
		d[1].innerHTML = suspectList[i-1].prob;	// suspect probabilities in column 1
	}
	// update weapon probabilities
	for(i = 1; i < 7; i++)	// iterate through rows, row header at 0, 6 weapons
	{   
		d = table[i].cells;	// d is the collection of cells in row i
		d[3].innerHTML = weaponList[i-1].prob;	// weapon probabilities in column 3
	}
	// update room probabilities
	for(i = 1; i < 10; i++)	// iterate through rows, row header at 0, 6 weapons
	{   
		d = table[i].cells;	// d is the collection of cells in row i
		d[5].innerHTML = roomList[i-1].prob;	// weapon probabilities in column 3
	}
}

function updateProbGuessedTable()
{
	// update second probability table taking into account player guesses
	var table = document.getElementById("probabilityGuessedTable").rows;	// get probability table, collection of all rows
	var i, d;
	// update suspect probabilities
	for(i = 1; i < 7; i++)	// iterate through rows, row header at 0, 6 suspects
	{   
		d = table[i].cells;	// d is the collection of cells in row i
		d[1].innerHTML = suspectList[i-1].probGuessed;	// suspect probabilities in column 1
	}
	// update weapon probabilities
	for(i = 1; i < 7; i++)	// iterate through rows, row header at 0, 6 weapons
	{   
		d = table[i].cells;	// d is the collection of cells in row i
		d[3].innerHTML = weaponList[i-1].probGuessed;	// weapon probabilities in column 3
	}
	// update room probabilities
	for(i = 1; i < 10; i++)	// iterate through rows, row header at 0, 6 weapons
	{   
		d = table[i].cells;	// d is the collection of cells in row i
		d[5].innerHTML = roomList[i-1].probGuessed;	// weapon probabilities in column 3
	}
}

// update table of player guesses
function updateGuessTables()
{
	console.log("update guess tables");
	var i, j, p, table, d, guessIndex;
	// update suspect guess table
	table = document.getElementById("suspectGuessTable").rows;	// get player suspect guess table, collection of rows
	for(i = 2; i < 8; i++)	// iterate through rows, row header at row 0, suspect names at row 1
	{
		d = table[i].cells;	// d is the collection of cells in row i
		p = players[i-2];	// get player corresponding to row i
		
		for(j = 0; j < p.guesses.length; j++)	// iterate through player guesses array
		{
			// get the suspect of the guess, search for it in the suspect names array and return its index in that array
			guessIndex = suspectNames.indexOf(p.guesses[j].suspect);	// eg green = 0
			// because both the suspectNames array and the list of suspects in the table are both alphabetical
			// we can use guessIndex to input data into the cell that corresponds with the same suspect
			// put "!" in cell that the player has guessed
			d[guessIndex + 1].innerHTML = "#";	// increment guessIndex as column 0 contains player numbers
		}
	}
	// update weapon guess table
	table = document.getElementById("weaponGuessTable").rows;	// get player weapon guess table, collection of rows
	for(i = 2; i < 8; i++)	// iterate through rows, row header at row 0, suspect names at row 1
	{
		d = table[i].cells;	// d is the collection of cells in row i
		p = players[i-2];	// get player corresponding to row i
		
		for(j = 0; j < p.guesses.length; j++)	// iterate through player guesses array
		{
			// get the weapon of the guess, search for it in the weapon names array and return its index in that array
			guessIndex = weaponNames.indexOf(p.guesses[j].weapon);	// eg candlestick = 0
			// because both the weaponNames array and the list of weapons in the table are both alphabetical
			// we can use guessIndex to input data into the cell that corresponds with the same weapon
			// put "!" in cell that the player has guessed
			d[guessIndex + 1].innerHTML = "#";	// increment guessIndex as column 0 contains player numbers
		}
	}
	// update room guess table
	table = document.getElementById("roomGuessTable").rows;	// get player room guess table, collection of rows
	for(i = 2; i < 8; i++)	// iterate through rows, row header at row 0, suspect names at row 1
	{
		d = table[i].cells;	// d is the collection of cells in row i
		p = players[i-2];	// get player corresponding to row i
		
		for(j = 0; j < p.guesses.length; j++)	// iterate through player guesses array
		{
			// get the room of the guess, search for it in the room names array and return its index in that array
			guessIndex = roomNames.indexOf(p.guesses[j].room);	// eg ballroom = 0
			// because both the roomNames array and the list of rooms in the table are both alphabetical
			// we can use guessIndex to input data into the cell that corresponds with the same room
			// put "!" in cell that the player has guessed
			d[guessIndex + 1].innerHTML = "#";	// increment guessIndex as column 0 contains player numbers
		}
	}
}

// update player cards tables
function updateCardTables()
{
	console.log("update card tables");
	var i, j, playerNum, table, d;
	// update suspect table
	table = document.getElementById("suspectTable").rows;	// get player suspect card table, collection of rows
	for(i = 2; i < 8; i++)	// iterate through rows, row header at row 0, suspect names at row 1
	{
		d = table[i].cells;	// d is the collection of cells in row i
		playerNum = players[i-2];	// get player corresponding to row i
		for(j = 1; j < 7; j++)	// iterate through columns, player numbers at row 0
		{
			// find what cards this player has in their yes array
			// find the index of suspect in yes array, returns -1 if suspect name not present
			if(playerNum.suspects.yes.indexOf(suspectNames[j-1]) != -1)	// if suspect card is present in player yes array
			{
				d[j].innerHTML = "✔";
			}
			else if(playerNum.suspects.no.indexOf(suspectNames[j-1]) != -1)	// else if suspect card is present in player no array
			{
				d[j].innerHTML = "✘";
			}
		}
	}
	// update weapon table
	table = document.getElementById("weaponTable").rows;	// get player weapon card table, collection of rows
	for(i = 2; i < 8; i++)	// iterate through rows, row header at row 0, weapon names at row 1
	{
		d = table[i].cells;	// d is the collection of cells in row i
		playerNum = players[i-2];	// get player corresponding to row i
		for(j = 1; j < 7; j++)	// iterate through columns, player numbers at row 0
		{
			// find what cards this player has in their yes array
			// find the index of weapon in yes array, returns -1 if weapon name not present
			if(playerNum.weapons.yes.indexOf(weaponNames[j-1]) != -1)	// if weapon card is present in player yes array
			{
				d[j].innerHTML = "✔";
			}
			else if(playerNum.weapons.no.indexOf(weaponNames[j-1]) != -1)	// else if weapon card is present in player no array
			{
				d[j].innerHTML = "✘";
			}
		}
	}
	// update room table
	table = document.getElementById("roomTable").rows;	// get player room card table, collection of rows
	for(i = 2; i < 8; i++)	// iterate through rows, row header at row 0, room names at row 1
	{
		d = table[i].cells;	// d is the collection of cells in row i
		playerNum = players[i-2];	// get player corresponding to row i
		for(j = 1; j < 10; j++)	// iterate through columns, player numbers at row 0
		{
			// find what cards this player has in their yes array
			// find the index of room in yes array, returns -1 if room name not present
			if(playerNum.rooms.yes.indexOf(roomNames[j-1]) != -1)	// if room card is present in player yes array
			{
				d[j].innerHTML = "✔";
			}
			else if(playerNum.rooms.no.indexOf(roomNames[j-1]) != -1)	// else if room card is present in player no array
			{
				d[j].innerHTML = "✘";
			}
		}
	}
}

// update the number of players
function playerNumberUpdate()
{
	var num = document.getElementById("playerNumber").value;
	if(num < 3 || num > 6 || isNaN(num))	// cluedo rules have minimum of 3 and maximum of 6 players
	{
		alert("invalid number of players");
	}
	else
	{
		Np = parseInt(num,10);	// convert base 10 string representation of number to int
		console.log(Np + " players");
		initCardArray();	// initiate card array with new number of players
	}
}

// remove element e from array a
function removeElement(a,e)
{
	console.log("remove element " + e + " from array");
	var ind = a.indexOf(e);
	if(ind == -1)	// card is not present in maybe list
	{
		return 0;
	}
	a.splice(ind,1);	// remove 1 element from array a at location ind 
	return 1;
}

// put card n of type t in no arrays of players except for player p
function updateOtherPlayers(p, t, n)
{
	console.log("update other players except " + p + " for " + n + " " + t);
	for(var i = 0; i < Np; i++)	// iterate through players array
	{
		if(i != p)	// if index is not equal to the player to be excluded
		{
			var noPlayer = players[i];
			if(t == "suspect")
			{
				if(removeElement(noPlayer.suspects.maybe,n))	// remove from maybe & if card is in maybe array
					noPlayer.suspects.no.push(n);	// add to no vector
					removeElement(noPlayer.suspects.maybeGuessed,n);	// remove from maybeGuessed array
			}
			else if(t == "weapon")
			{
				if(removeElement(noPlayer.weapons.maybe,n))	// remove from maybe
					noPlayer.weapons.no.push(n);	// add to no vector
					removeElement(noPlayer.weapons.maybeGuessed,n);
			}
			else if(t == "room")
			{
				if(removeElement(noPlayer.rooms.maybe,n))	// remove from maybe
					noPlayer.rooms.no.push(n);	// add to no vector
					removeElement(noPlayer.rooms.maybeGuessed,n);
			}
		}
	}
}

// returns type of card; suspect, weapon, or room
// t	name of card
function cardType(n)
{
	t = n.toString();	// convert to string to allow includes() to work
	if(suspectNames.includes(t))	// if the card is a suspect card
	{
		return "suspect";	// return suspect card type
	}
	else if(weaponNames.includes(t))
	{
		return "weapon";
	}
	else if(roomNames.includes(t))
	{
		return "room";
	}
	else
	{
		return "NA";
	}
}

// calculate the probability that card c is in the centre pile
function calcProb(c)
{
	console.log("calculate probability for " + c.name);
	c.prob = (1 - (c.Ny)) / ((Np + 1) - (Np - c.Nm));	// calculate probability for card
	c.probGuessed = (1 - (c.Ny)) / ((Np + 1) - (Np - c.NmGuessed));	// calc prob for card with player guesses taken into account
}

// print suspect, weapon, room, yes, no, maybe arrays for player pid
function printCards(pid)
{	
	p = players[pid];	
	// print suspects
	console.log("Player " + p.id + "\nSuspects" + "\nYes: ");
	var j;
	for(j = 0; j < p.suspects.yes.length; j++)
	{
		console.log(p.suspects.yes[j]);
	}
	console.log("\nMaybe: ");
	for(j = 0; j < p.suspects.maybe.length; j++)
	{
		console.log(p.suspects.maybe[j]);
	}
	console.log("\nNo: ");
	for(j = 0; j < p.suspects.no.length; j++)
	{
		console.log(p.suspects.no[j]);
	}
	// print weapons
	console.log("Weapons" + "\nYes: ");
	var j;
	for(j = 0; j < p.weapons.yes.length; j++)
	{
		console.log(p.weapons.yes[j]);
	}
	console.log("\nMaybe: ");
	for(j = 0; j < p.weapons.maybe.length; j++)
	{
		console.log(p.weapons.maybe[j]);
	}
	console.log("\nNo: ");
	for(j = 0; j < p.weapons.no.length; j++)
	{
		console.log(p.weapons.no[j]);
	}
	// print rooms
	console.log("Rooms" + "\nYes: ");
	var j;
	for(j = 0; j < p.rooms.yes.length; j++)
	{
		console.log(p.rooms.yes[j]);
	}
	console.log("\nMaybe: ");
	for(j = 0; j < p.rooms.maybe.length; j++)
	{
		console.log(p.rooms.maybe[j]);
	}
	console.log("\nNo: ");
	for(j = 0; j < p.rooms.no.length; j++)
	{
		console.log(p.rooms.no[j]);
	}
}

// enter card to a player's yes array
// call when you know this player has this card
function enterCardToYes(yesPlayer, yesCard)
{
	console.log("enter " + yesCard + " to player " + yesPlayer);
	if(yesPlayer > (Np-1))	// if the input player is greater than the total number of players	
	{
		alert("invalid player");
		return;
	}
	var type = cardType(yesCard);	// get card type
	var yesCardIndex;
	switch(type)
	{
		case "suspect":
			if(removeElement(players[yesPlayer].suspects.maybe,yesCard))	// if card is in maybe array
			{
				players[yesPlayer].suspects.yes.push(yesCard);	// add card to yes list
				// update probability of this card being in the centre pile
				yesCardIndex = suspectNames.indexOf(yesCard);	// get index of card in suspectName array, same index as in suspectList array
				suspectList[yesCardIndex].Ny = 1;	// card is in 1 yes pile
				suspectList[yesCardIndex].Nm = 0;	// card will be removed from the other players' maybe arrays
				calcProb(suspectList[yesCardIndex]);	// recalculate probability
			}
			if(removeElement(players[yesPlayer].suspects.maybeGuessed,yesCard))	// if card is in maybeGuessed array
			{
				suspectList[yesCardIndex].NmGuessed = 0;	// card will be removed from the other players' maybeGuessed arrays
				calcProb(suspectList[yesCardIndex]);
			}
			
			break;

		case "weapon":
			if(removeElement(players[yesPlayer].weapons.maybe,yesCard))
			{
				players[yesPlayer].weapons.yes.push(yesCard);	// add card to yes list
				yesCardIndex = weaponNames.indexOf(yesCard);	// get index of card in weaponList;
				weaponList[yesCardIndex].Ny = 1;	// card is in 1 yes pile
				weaponList[yesCardIndex].Nm = 0;	// card will be removed from the other players' maybe arrays
				calcProb(weaponList[yesCardIndex]);
			}
			if(removeElement(players[yesPlayer].weapons.maybeGuessed,yesCard))
			{
				weaponList[yesCardIndex].NmGuessed = 0;	// card will be removed from the other players' maybe arrays
				calcProb(weaponList[yesCardIndex]);
			}
			break;

		case "room":
			if(removeElement(players[yesPlayer].rooms.maybe,yesCard))
			{
				players[yesPlayer].rooms.yes.push(yesCard);	// add card to yes list
				yesCardIndex = roomNames.indexOf(yesCard);	// get index of card in roomList;
				roomList[yesCardIndex].Ny = 1;	// card is in 1 yes pile
				roomList[yesCardIndex].Nm = 0;	// card will be removed from the other players' maybe arrays
				calcProb(roomList[yesCardIndex]);
			}
			if(removeElement(players[yesPlayer].rooms.maybeGuessed,yesCard))
			{
				roomList[yesCardIndex].NmGuessed = 0;	// card will be removed from the other players' maybe arrays
				calcProb(roomList[yesCardIndex]);
			}
			break;

		default:
			console.log("Error");
			break;
	}
	updateOtherPlayers(yesPlayer,type,yesCard);	// move yesCard from the other players' maybe arrays to no arrays
	updateProbTable();
	updateProbGuessedTable();
	updateCardTables();
}

// enter card to a player's no array
// noPlayer 	player id number
function enterCardToNo(noPlayer, noCard)
{
	console.log("enter card " + noCard + " to player " + noPlayer + " no array");
	if(noPlayer > (Np-1))	// if the input player is greater than the total number of players	
	{
		alert("invalid player");
		return;
	}
	var type = cardType(noCard);	// get type of card, suspect, weapon, or room
	var noCardIndex;
	switch(type)
	{
		case "suspect":
			if(removeElement(players[noPlayer].suspects.maybe,noCard))	// if card is in maybe array
			{
				players[noPlayer].suspects.no.push(noCard);	// add card to no array
				noCardIndex = suspectNames.indexOf(noCard);	// get index of card in suspectList
				suspectList[noCardIndex].Nm--;
				calcProb(suspectList[noCardIndex]);	// recalculate card probability
			}
			// remove card from maybeGuessed array
			if(removeElement(players[noPlayer].suspects.maybeGuessed,noCard))	// if card is in maybeGuessed array
			{
				suspectList[noCardIndex].NmGuessed--;
				calcProb(suspectList[noCardIndex]);
			}
			
			break;
		case "weapon":
			if(removeElement(players[noPlayer].weapons.maybe,noCard))	// if card is in maybe array
			{
				players[noPlayer].weapons.no.push(noCard);	// add card to no array
				noCardIndex = weaponNames.indexOf(noCard);	// get index of card in suspectList
				weaponList[noCardIndex].Nm--;
				calcProb(weaponList[noCardIndex]);
			}
			if(removeElement(players[noPlayer].weapons.maybeGuessed,noCard))
			{
				weaponList[noCardIndex].NmGuessed--;
				calcProb(weaponList[noCardIndex]);
			}
			break;
		case "room":
			if(removeElement(players[noPlayer].rooms.maybe,noCard))	// if card is in maybe array
			{
				players[noPlayer].rooms.no.push(noCard);	// add card to no array
				noCardIndex = roomNames.indexOf(noCard);	// get index of card in suspectList
				roomList[noCardIndex].Nm--;
				calcProb(roomList[noCardIndex]);
			}
			if(removeElement(players[noPlayer].rooms.maybeGuessed,noCard))
			{		
				roomList[noCardIndex].NmGuessed--;
				calcProb(roomList[noCardIndex]);
			}
			break;
		default:
			break;
	}
	updateProbTable();
	updateProbGuessedTable();
	updateCardTables();
}

// check card s of type t against checkPlayer's no arrays
// return -1 if card is not present in array, returns index of card if present
function checkNoArrays(checkPlayer,t,s)
{
	switch(t)
	{
		case "suspect":
			return players[checkPlayer].suspects.no.indexOf(s);
		case "weapon":
			return players[checkPlayer].weapons.no.indexOf(s);
		case "room":
			return players[checkPlayer].rooms.no.indexOf(s);
		default:
			console.log("error");
			return 0;
	}
}

// log guess into player pl for later rechecks
/*	pl	player id
	sus	suspect
	wep	weapon
	rom	room
*/
function logGuess(pl,sus,wep,rom)
{
	console.log("log guess " + sus + " " + wep + " " + rom + " for player " + pl);
	var guess = {
		suspect:sus,
		weapon:wep,
		room:rom
	};
	players[pl].guesses.push(guess);	// push guess object into player guesses array
	updateGuessTables();
}

function prevGuessCheck(pr,sus,wp,rm)
{
	var s, w, r;	// suspect, weapon, room flags

	// check responding player's no array
	s = checkNoArrays(pr,"suspect",sus);	// return -1 if suspect is not in no array, return index of suspect otherwise
	w = checkNoArrays(pr,"weapon",wp);
	r = checkNoArrays(pr,"room",rm);

	// if 2 out of the 3 cards are in no array, we know the responding player has the third one
	if(s != -1 && w != -1 && r == -1)	// if suspect and weapon are in the no array
	{
		enterCardToYes(pr,rm);	// enter room to yes array
	}
	else if(s != -1 && w == -1 && r != -1)	// if suspect and room are in the no array
	{
		enterCardToYes(pr,wp);	// enter weapon to yes array
	}
	else if(s == -1 && w != -1 && r != -1)	// if weapon and room are in the no array
	{
		enterCardToYes(pr,sus);	// enter suspect to yes array
	}	
}

// the current guess may have given us info that would have changed the info we learned
// of a previous guess
// run through previous guesses to check
function runPrevGuesses(pl)
{
	console.log("run previous guesses for player " + pl);
	var suspectGuess, weaponGuess, roomGuess, i;
	for(i = 0; i < players[pl].guesses.length; i++)	// increment through previous guesses
	{
		suspectGuess = players[pl].guesses[i].suspect;
		weaponGuess = players[pl].guesses[i].weapon;
		roomGuess = players[pl].guesses[i].room;
		prevGuessCheck(pl,suspectGuess, weaponGuess, roomGuess);	// check previous guess
	}
}

// assuming players don't make guesses about the cards they have
// remove the suspect, weapon, and room from the player's maybeGuessed array, and update probability
function enterGuessToNo(guessingPlayer,sus,wep,rom)
{
	var guessedCardIndex;
	// suspect
	if(removeElement(players[guessingPlayer].suspects.maybeGuessed,sus))	// remove sus from suspect maybeGuessed array
	{
		guessedCardIndex = suspectNames.indexOf(sus);	// get index of card in suspectName array, same index as in suspectList array
		suspectList[guessedCardIndex].NmGuessed--;	// decrement counter
		if(suspectList[guessedCardIndex].NmGuessed <= 0)
			suspectList[guessedCardIndex].NmGuessed = 0;
		calcProb(suspectList[guessedCardIndex]);	// recalculate probability for card
	}
	// weapon
	if(removeElement(players[guessingPlayer].weapons.maybeGuessed,wep))
	{
		guessedCardIndex = weaponNames.indexOf(wep);
		weaponList[guessedCardIndex].NmGuessed--;
		if(weaponList[guessedCardIndex].NmGuessed <= 0)
			weaponList[guessedCardIndex].NmGuessed = 0;
		calcProb(weaponList[guessedCardIndex]);
	}
	// room
	if(removeElement(players[guessingPlayer].rooms.maybeGuessed,rom))
	{
		guessedCardIndex = roomNames.indexOf(rom);
		roomList[guessedCardIndex].NmGuessed--;
		if(roomList[guessedCardIndex].NmGuessed <= 0)
			roomList[guessedCardIndex].NmGuessed = 0;
		calcProb(roomList[guessedCardIndex]);
	}
	updateProbGuessedTable();
}

// enter player guess
/*	sus		suspect
	wep		weapon
	rom	room
	gp		guessing player
	rp		responding player id number
	res		guess response, 0 if no card, 1 if card
*/
function enterGuess(sus, wep, rom, gp, rp, res)
{
	console.log(sus + " " + wep + " " + rom + " " + " response: " + res);
	if(gp > (Np-1))	// if the input player is greater than the total number of players	
	{
		alert("invalid player");
		return;
	}
	if(rp > (Np-1))	// if the input player is greater than the total number of players	
	{
		alert("invalid player");
		return;
	}
	if(res == 0)	// if responding player doesn't have the suspect, weapon, or room
	{	// enter suspect, weapon, and card into responding player's no arrays
		enterCardToNo(rp,sus);
		enterCardToNo(rp,wep);
		enterCardToNo(rp,rom);
	}
	else	// if the responding player has at least one of the cards and shows it to the guessing player
	{
		// check responding player's no arrays
		s = checkNoArrays(rp,"suspect",sus);	// return -1 if suspect is not in no array, return index of suspect otherwise
		w = checkNoArrays(rp,"weapon",wep);
		r = checkNoArrays(rp,"room",rom);
		console.log(sus + ":" + s + " " + wep + ":" + w + " " + rom + ":" + r);
		// if 2 out of the 3 cards are in no arrays, we know the responding player has the third one
		if(s != -1 && w != -1 && r == -1)	// if suspect and weapon are in the no arrays
		{
			enterCardToYes(rp,rom);	// enter room to yes array
		}
		else if(s != -1 && w == -1 && r != -1)	// if suspect and room are in the no arrays
		{
			enterCardToYes(rp,wep);	// enter weapon to yes array
		}
		else if(s == -1 && w != -1 && r != -1)	// if weapon and room are in the no arrays
		{
			enterCardToYes(rp,sus);	// enter suspect to yes array
		}
	}

	enterGuessToNo(gp,sus,wep,rom);	// assumes guessing player gp only makes guesses about cards they don't have

	logGuess(gp,sus,wep,rom);	// log guess
	runPrevGuesses(rp);	// check previous guesses against new information
}

// stops user from reloading the page and losing game data
window.onbeforeunload = function()
{
	return "halt";
}

// prevents scripts from running before elements have loaded
// add event listeners here
window.onload = function() 
{
	var coll = document.getElementsByClassName("collapsible");
	var i;

	for (i = 0; i < coll.length; i++) 
	{
		coll[i].addEventListener("click", function() 
		{
			this.classList.toggle("active");
			var content = this.nextElementSibling;
			if(content.style.display === "block") 
			{
				content.style.display = "none";
			} 
			else 
			{
				content.style.display = "block";
			}
		});
	}
	document.getElementById("playerNumberSubmit").addEventListener("click",playerNumberUpdate);
	document.getElementById("yesCardSubmit").addEventListener("click",
		function()
		{
			enterCardToYes(
				document.getElementById("yesPlayerSelect").value,
				document.getElementById("yesCard").value);
		});
	document.getElementById("noCardSubmit").addEventListener("click",
		function()
		{
			enterCardToNo(
				document.getElementById("noPlayerSelect").value,
				document.getElementById("noCard").value);
		});
	document.getElementById("cardFillSubmit").addEventListener("click",
		function()
		{
			fillNoArray(
				document.getElementById("fillPlayerSelect").value);
		});
	document.getElementById("guessSubmit").addEventListener("click",
		function()
		{
			enterGuess(
				document.getElementById("suspectGuessSelect").value,
				document.getElementById("weaponGuessSelect").value,
				document.getElementById("roomGuessSelect").value,
				document.getElementById("guessingPlayer").value,
				document.getElementById("respondingPlayer").value,
				document.getElementById("guessResponse").value);
		});
	initPlayerArray();
}
