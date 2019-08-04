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
		guesses:[]	// to hold guesses made at this player
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
		Nm:Np,
		Ny:0,
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

function enterCardToYes()
{
	var yesPlayer = document.getElementById("yesPlayerSelect").value;
	var yesCard = document.getElementById("yesCard").value;
	var type = cardType(yesCard);

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
	document.getElementById("yesCardSubmit").addEventListener("click",enterCardToYes);
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
