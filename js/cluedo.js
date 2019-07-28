// list of all cards
var suspects = ["scarlet","green","mustard","plum","peacock","white"];
var weapons = ["candlestick","dagger","pipe","revolver","rope","spanner"];
var rooms = ["kitchen","ballroom","conservatory","billiard","library","study","hall","lounge","dining"];

// prevents scripts from running before elements have loaded
window.onload = function() 
{
	document.getElementById("suspectList").innerHTML = suspects;
}
