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
	var i;
	var s = suspectNames.slice();	// copy suspectNames array by value
	var w = weaponNames.slice();
	var r = roomNames.slice();
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

	for(i = 0; i < 6; i++)
	{
		var a = Object.create(p);	// copy object p by value
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
		Nm:Np,	// all players might have this card
		Ny:0,	// all players start with empty yes arrays
		prob:probability
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

// update the number of players
function playerNumberUpdate()
{
	Np = document.getElementById("playerNumber").value;
	console.log(Np + " players");
}

function updateOtherPlayers()
{

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

function enterCardToYes(yesPlayer, yesCard)
{
	yesPlayer--;	// decrement player ID number for zero indexed array
	var type = cardType(yesCard);	// get card type
	console.log("Enter card to Yes " + yesPlayer + " " + yesCard + " " + type);
	
	switch(type)
	{
		case "suspect":
			var ind = players[yesPlayer].suspects.maybe.indexOf(yesCard);	// find index of yesCard in player maybe array 
			console.log("Card found at index " + ind);
			if(ind == -1)	// card is not present in maybe list
			{
				console.log(yesCard + " is not present in player " + yesPlayer + " maybe array");
				break;
			}
			players[yesPlayer].suspects.maybe.splice(ind,1);	// remove 1 card at location ind from maybe list
			players[yesPlayer].suspects.yes.push(yesCard);	// add card to yes list
			break;

		case "weapon":
			var ind = players[yesPlayer].weapons.maybe.indexOf(yesCard);	// find index of yesCard in player maybe array 
			console.log("Card found at index " + ind);
			if(ind == -1)	// card is not present in maybe list
			{
				console.log(yesCard + " is not present in player " + yesPlayer + " maybe array");
				break;
			}
			players[yesPlayer].weapons.maybe.splice(ind,1);	// remove 1 card at location ind from maybe list
			players[yesPlayer].weapons.yes.push(yesCard);	// add card to yes list
			break;

		case "room":
			var ind = players[yesPlayer].rooms.maybe.indexOf(yesCard);	// find index of yesCard in player maybe array 
			console.log("Card found at index " + ind);
			if(ind == -1)	// card is not present in maybe list
			{
				console.log(yesCard + " is not present in player " + yesPlayer + " maybe array");
				break;
			}
			players[yesPlayer].rooms.maybe.splice(ind,1);	// remove 1 card at location ind from maybe list
			players[yesPlayer].rooms.yes.push(yesCard);	// add card to yes list
			break;

		default:
			console.log("Error");
			break;
	}
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

}
