// list of all cards
var suspectNames = ["green","mustard","peacock","plum","scarlet","white"];
var weaponNames = ["candlestick","dagger","pipe","revolver","rope","spanner"];
var roomNames = ["ballroom","billiard","conservatory","dining","hall","kitchen","library","lounge","study"];

var Np = 6;	// number of players default value 6
var players = [];	// array of player objects with suspect, weapon, and room yes, no, and maybe arrays
var suspectList = [];
var weaponList = [];
var roomList = [];

// initiate array with invalid entries
function initPlayerArray()
{
	var s = Array.from(suspectNames);	// copy suspectNames array by value
	var w = Array.from(weaponNames);
	var r = Array.from(roomNames);
	var p = 	// player object 
	{
		id:0,	// identification number
		suspects:
		{
			yes:[],	// it is known the player has these suspects
			no:[],	// it is known the player doesn't have these suspects
			maybe:s	// the player might have these suspects
		},
		weapons:
		{
			yes:[],
			no:[],
			maybe:w
		},
		rooms:
		{
			yes:[],
			no:[],
			maybe:r
		},
		guesses:[],	// to hold guesses made at this player
		printCards:function()
		{	
			// print suspects
			console.log("Player " + this.id + "\nSuspects" + "\nYes: ");
			var j;
			for(j = 0; j < this.suspects.yes.length; j++)
			{
				console.log(this.suspects.yes[j]);
			}
			console.log("\nMaybe: ");
			for(j = 0; j < this.suspects.maybe.length; j++)
			{
				console.log(this.suspects.maybe[j]);
			}
			console.log("\nNo: ");
			for(j = 0; j < this.suspects.no.length; j++)
			{
				console.log(this.suspects.no[j]);
			}
			// print weapons
			console.log("Weapons" + "\nYes: ");
			var j;
			for(j = 0; j < this.weapons.yes.length; j++)
			{
				console.log(this.weapons.yes[j]);
			}
			console.log("\nMaybe: ");
			for(j = 0; j < this.weapons.maybe.length; j++)
			{
				console.log(this.weapons.maybe[j]);
			}
			console.log("\nNo: ");
			for(j = 0; j < this.weapons.no.length; j++)
			{
				console.log(this.weapons.no[j]);
			}
			// print rooms
			console.log("Rooms" + "\nYes: ");
			var j;
			for(j = 0; j < this.rooms.yes.length; j++)
			{
				console.log(this.rooms.yes[j]);
			}
			console.log("\nMaybe: ");
			for(j = 0; j < this.rooms.maybe.length; j++)
			{
				console.log(this.rooms.maybe[j]);
			}
			console.log("\nNo: ");
			for(j = 0; j < this.rooms.no.length; j++)
			{
				console.log(this.rooms.no[j]);
			}
		}
	};

	for(var i = 0; i < 6; i++)
	{
		var a = _.cloneDeep(p);	// copy object p by value
		a.id = i;
		players.push(a);
	}
}

function initCardArray()
{
	var probability = 1 / (Np + 1);
	var card = 
	{
		name:"",	// name of card
		Nm:Np,	// number of times card is in maybe array, all players might have this card
		Ny:0,	// number of times card is in yes array, all players start with empty yes arrays
		prob:probability	// probability card is in centre pile
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
}

// update card probabilities in table
function updateProbTable()
{
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

// update the number of players
function playerNumberUpdate()
{
	Np = document.getElementById("playerNumber").value;
	console.log(Np + " players");
}

// remove element e from array a
function removeElement(a,e)
{
	var ind = a.indexOf(e);
	console.log("Value found at index " + ind);
	if(ind == -1)	// card is not present in maybe list
	{
		console.log("Value is not present in array");
		return;
	}
	a.splice(ind,1);
}

// put card n of type t in no arrays of players except for player p
function updateOtherPlayers(p, t, n)
{
	for(var i = 0; i < Np; i++)	// iterate through players array
	{
		if(i != p)	// if index is not equal to the player to be excluded
		{
			var noPlayer = players[i];
			switch(t)	// check type of card
			{
				case "suspect":
					removeElement(noPlayer.suspects.maybe,n);	// remove from maybe
					noPlayer.suspects.no.push(n);	// add to no vector
					break;
				case "weapon":
					removeElement(noPlayer.weapons.maybe,n);	// remove from maybe
					noPlayer.weapons.no.push(n);	// add to no vector
					break;
				case "room":
					removeElement(noPlayer.rooms.maybe,n);	// remove from maybe
					noPlayer.rooms.no.push(n);	// add to no vector
					break;
				default:
					break;
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
	c.prob = (1 - (c.Ny)) / ((Np + 1) - (Np - c.Nm));
}

// enter card to a player's yes array
// call when you know this player has this card
function enterCardToYes(yesPlayer, yesCard)
{
	yesPlayer--;	// decrement player ID number for zero indexed array
	var type = cardType(yesCard);	// get card type
	var yesCardIndex;
	console.log("Enter card to Yes " + yesPlayer + " " + yesCard + " " + type + "-----------------------------------------------------------------------------------------");
	
	switch(type)
	{
		case "suspect":
			removeElement(players[yesPlayer].suspects.maybe,yesCard);
			players[yesPlayer].suspects.yes.push(yesCard);	// add card to yes list
			// update probability of this card being in the centre pile
			yesCardIndex = suspectNames.indexOf(yesCard);	// get index of card in suspectName array, same index as in suspectList array
			suspectList[yesCardIndex].Ny = 1;	// card is in 1 yes pile
			suspectList[yesCardIndex].Nm = 0;	// card will be removed from the other players' maybe arrays
			calcProb(suspectList[yesCardIndex]);	// recalculate probability
			updateOtherPlayers(yesPlayer);	// move yesCard from the other players' maybe arrays to no arrays
			break;

		case "weapon":
			removeElement(players[yesPlayer].weapons.maybe,yesCard);
			players[yesPlayer].weapons.yes.push(yesCard);	// add card to yes list
			yesCardIndex = weaponNames.indexOf(yesCard);	// get index of card in suspectList;
			weaponList[yesCardIndex].Ny = 1;	// card is in 1 yes pile
			weaponList[yesCardIndex].Nm = 0;	// card will be removed from the other players' maybe arrays
			calcProb(weaponList[yesCardIndex]);	// recalculate probability
			updateOtherPlayers(yesPlayer);	// move yesCard from the other players' maybe arrays to no arrays
			break;

		case "room":
			removeElement(players[yesPlayer].rooms.maybe,yesCard);
			players[yesPlayer].rooms.yes.push(yesCard);	// add card to yes list
			yesCardIndex = roomNames.indexOf(yesCard);	// get index of card in suspectList;
			roomList[yesCardIndex].Ny = 1;	// card is in 1 yes pile
			roomList[yesCardIndex].Nm = 0;	// card will be removed from the other players' maybe arrays
			calcProb(roomList[yesCardIndex]);	// recalculate probability
			updateOtherPlayers(yesPlayer);	// move yesCard from the other players' maybe arrays to no arrays
			break;

		default:
			console.log("Error");
			break;
	}
	players[yesPlayer].printCards();
	players[2].printCards();
	updateProbTable();
}

function enterCardToNo(noPlayer, noCard)
{
	noPlayer--;	// decrement player number for zero indexed array
	var type = cardType(noCard);	// get type of card, suspect, weapon, or room
	switch(type)
	{
		case "suspect":
			// remove card from maybe list and add to no list
			var ind = players[noPlayer].suspects.maybe.indexOf(noCard);	// get index of card in maybe list
			if(ind == -1)	// card is not present in maybe list
			{
				break;
			}
			players[noPlayer].suspects.maybe.splice(ind,1);	// remove 1 card at location ind from maybe list
			players[noPlayer].suspects.no.push(noCard);	// add card to no list
		case "weapon":

		case "room":

		default:
			break;
	}
}

function enterGuess()
{

}

// prevents scripts from running before elements have loaded
// add event listeners here
window.onload = function() 
{
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
	document.getElementById("guessSubmit").addEventListener("click",enterGuess);
	initPlayerArray();
	initCardArray();
	updateProbTable();
}
