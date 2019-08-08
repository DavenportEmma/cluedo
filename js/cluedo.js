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
	var p = 	// player object 
	{
		id:0,	// identification number
		suspects:
		{
			yes:[],	// it is known the player has these suspects
			no:[],	// it is known the player doesn't have these suspects
			maybe:suspectNames	// the player might have these suspects
		},
		weapons:
		{
			yes:[],
			no:[],
			maybe:weaponNames
		},
		rooms:
		{
			yes:[],
			no:[],
			maybe:roomNames
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
	if(ind == -1)	// card is not present in maybe list
	{
		console.log("Value is not present in array");
		return 0;
	}
	a.splice(ind,1);
	return 1;
}

// put card n of type t in no arrays of players except for player p
function updateOtherPlayers(p, t, n)
{
	for(var i = 0; i < Np; i++)	// iterate through players array
	{
		if(i != p)	// if index is not equal to the player to be excluded
		{
			var noPlayer = players[i];
			if(t == "suspect")
			{
				if(removeElement(noPlayer.suspects.maybe,n))	// remove from maybe & if card is in maybe array
					noPlayer.suspects.no.push(n);	// add to no vector
			}
			else if(t == "weapon")
			{
				if(removeElement(noPlayer.weapons.maybe,n))	// remove from maybe
					noPlayer.weapons.no.push(n);	// add to no vector
			}
			else if(t == "room")
			{
				if(removeElement(noPlayer.rooms.maybe,n))	// remove from maybe
					noPlayer.rooms.no.push(n);	// add to no vector
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
	yesPlayer--;	// decrement player ID number for zero indexed array
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
			break;

		case "weapon":
			if(removeElement(players[yesPlayer].weapons.maybe,yesCard))
			{
				players[yesPlayer].weapons.yes.push(yesCard);	// add card to yes list
				yesCardIndex = weaponNames.indexOf(yesCard);	// get index of card in weaponList;
				weaponList[yesCardIndex].Ny = 1;	// card is in 1 yes pile
				weaponList[yesCardIndex].Nm = 0;	// card will be removed from the other players' maybe arrays
				calcProb(weaponList[yesCardIndex]);	// recalculate probability
			}
			break;

		case "room":
			if(removeElement(players[yesPlayer].rooms.maybe,yesCard))
			{
				players[yesPlayer].rooms.yes.push(yesCard);	// add card to yes list
				yesCardIndex = roomNames.indexOf(yesCard);	// get index of card in roomList;
				roomList[yesCardIndex].Ny = 1;	// card is in 1 yes pile
				roomList[yesCardIndex].Nm = 0;	// card will be removed from the other players' maybe arrays
				calcProb(roomList[yesCardIndex]);	// recalculate probability
			}
			break;

		default:
			console.log("Error");
			break;
	}
	updateOtherPlayers(yesPlayer,type,yesCard);	// move yesCard from the other players' maybe arrays to no arrays
	updateProbTable();
}

function enterCardToNo(noPlayer, noCard)
{
	noPlayer--;	// decrement player number for zero indexed array
	var type = cardType(noCard);	// get type of card, suspect, weapon, or room
	var noCardIndex;
	switch(type)
	{
		case "suspect":
			if(removeElement(players[noPlayer].suspects.maybe,noCard))	// if card is in maybe array
			{
				players[yesPlayer].suspects.no.push(yesCard);	// add card to no array
				noCardIndex = suspectNames.indexOf(noCard);	// get index of card in suspectList
				suspectList[noCardIndex].Nm--;
				calcProb(suspectList[noCardIndex]);
			}
		case "weapon":
			if(removeElement(players[noPlayer].weapons.maybe,noCard))	// if card is in maybe array
			{
				players[yesPlayer].weapons.no.push(yesCard);	// add card to no array
				noCardIndex = weaponNames.indexOf(noCard);	// get index of card in suspectList
				weaponList[noCardIndex].Nm--;
				calcProb(weaponList[noCardIndex]);
			}

		case "room":
			if(removeElement(players[noPlayer].rooms.maybe,noCard))	// if card is in maybe array
			{
				players[yesPlayer].rooms.no.push(yesCard);	// add card to no array
				noCardIndex = roomNames.indexOf(noCard);	// get index of card in suspectList
				roomList[noCardIndex].Nm--;
				calcProb(roomList[noCardIndex]);
			}

		default:
			break;
	}
	updateProbTable();
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
