// list of all cards
var suspects = ["green","mustard","peacock","plum","scarlet","white"];
var weapons = ["candlestick","dagger","pipe","revolver","rope","spanner"];
var rooms = ["ballroom","billiard","conservatory","dining","hall","kitchen","library","lounge","study"];

var playerNumber;

var playerNamesArray = [];

// initiate array with invalid entries
function initPlayerNamesArray()
{
	var i, p;
	for(i = 0; i < 6; i++)
	{
		p = {name:"n/a", index:i};
		playerNamesArray.push(p);
	}
}

// update number of players in game
function playerNumberUpdate()
{
	playerNumber = document.getElementById("playerNumber").value;
	console.log(playerNumber);
}

// enter the names of the players
function playerNameUpdate()
{
	var index = document.getElementById("playerSelect").value;	// get index
	index--;	// decrement index for 0 indexing
	var playerName = document.getElementById("playerName").value;	// get player name

	var player = {name:playerName, index:index};	// generate player object
	playerNamesArray[index] = player;	// insert into array

	var x = document.getElementsByClassName(index);	// update all references to player name on page
	var i;
	for (i = 0; i < x.length; i++) 
	{
		x[i].innerHTML = playerName;
	} 
}

function enterCardToYes()
{

}

function enterCardToNo()
{

}

// prevents scripts from running before elements have loaded
// add event listeners here
window.onload = function() 
{
	document.getElementById("playerNumberSubmit").addEventListener("click",playerNumberUpdate);
	document.getElementById("playerNameSubmit").addEventListener("click",playerNameUpdate);

	document.getElementById("yesCardSubmit").addEventListener("click",enterCardToYes);
	document.getElementById("noCardSubmit").addEventListener("click",enterCardToNo);
	initPlayerNamesArray();
}
