#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <vector>
#include <iostream>
#include <bits/stdc++.h>
using namespace std;

// structure holds the cards each player has, might have, and doesn't have
struct player
{
	int id;
	struct selection
	{
    	vector<string> yes;
    	vector<string> no;
    	vector<string> maybe;
	}suspects,weapons,rooms;	// yes, no, maybe piles for suspects, weapons, rooms
}p0,p1,p2,p3,p4,p5;	// create players

// lists of all suspects, weapons, and rooms
vector<string> suspectList {"scarlet","green","mustard","plum","peacock","white"};
vector<string> weaponList {"dandlestick","dagger","pipe","revolver","rope","spanner"};
vector<string> roomList {"kitchen","ballroom","conservatory","billiard","library","study","hall","lounge","dining"};

// print player contents
void printPlayer(player *p)
{
	cout << "Player " << p->id << endl;
	//------------------------------
	cout << "Suspects";
	cout << endl << "Yes:\t";
	for(int i = 0; i < p->suspects.yes.size(); i++)
	{
		cout << p->suspects.yes[i] << ", ";
	}
	cout << endl << "No:\t";
	for(int i = 0; i < p->suspects.no.size(); i++)
	{
		cout << p->suspects.no[i] << ", ";
	}
	cout << endl << "Maybe:\t";
	for(int i = 0; i < p->suspects.maybe.size(); i++)
	{
		cout << p->suspects.maybe[i] << ", ";
	}
	//------------------------------
	cout << endl << "Weapons";
	cout << endl << "Yes:\t";
	for(int i = 0; i < p->weapons.yes.size(); i++)
	{
		cout << p->weapons.yes[i] << ", ";
	}
	cout << endl << "No:\t";
	for(int i = 0; i < p->weapons.no.size(); i++)
	{
		cout << p->weapons.no[i] << ", ";
	}
	cout << endl << "Maybe:\t";
	for(int i = 0; i < p->weapons.maybe.size(); i++)
	{
		cout << p->weapons.maybe[i] << ", ";
	}
	//------------------------------
	cout << endl << "Rooms";
	cout << endl << "Yes:\t";
	for(int i = 0; i < p->rooms.yes.size(); i++)
	{
		cout << p->rooms.yes[i] << ", ";
	}
	cout << endl << "No:\t";
	for(int i = 0; i < p->rooms.no.size(); i++)
	{
		cout << p->rooms.no[i] << ", ";
	}
	cout << endl << "Maybe:\t";
	for(int i = 0; i < p->rooms.maybe.size(); i++)
	{
		cout << p->rooms.maybe[i] << ", ";
	}
	cout << endl;
}

// return player object when refered to by ID
player *IdPlayer(int n)
{
	switch(n)
	{
		case 0:
			return &p0;
			break;
		
		case 1:
			return &p1;
			break;
		
		case 2:
			return &p2;
			break;

		case 3:
			return &p3;
			break;

		case 4:
			return &p4;
			break;

		case 5:
			return &p5;
			break;
		
		default:
			return &p0;
			break;
	}
}

// initialise player IDs and maybe vectors
void initPlayers()
{
	for(int i = 0; i < 6; i++)
	{
		player *p = IdPlayer(i);
		p->id = i;
		p->suspects.maybe = suspectList;
		p->weapons.maybe = weaponList;
		p->rooms.maybe = roomList;
	}
}

// called when a player makes a guess
/*	g		guessing player
	r		repsonding player
	res		response, 1 = pr has card, 0 = pr doesn't have card
	sus		suspect
	wp		weapon
	rm		room
*/
void playerGuess(int g, int r, int res, string sus, string wp, string rm)
{
	player *pg = IdPlayer(g);	// get player object being referenced to by its ID
	player *pr = IdPlayer(r);

	if(!res)	// if pr doesn't have any the suspect, weapon, or room card
	{

	}
}

// called by player to enter their own hand into the system
/*	p	player number
	t	type of card; suspect, weapon, room
	n	which card it is
*/
void enterCards(int k, string t, string n)
{
	player *p = IdPlayer(k);
	if(t == "suspect")
	{
		p->suspects.yes.push_back(n);
	}
	else if(t == "room")
	{
		p->rooms.yes.push_back(n);
	}
	else if(t == "weapon")
	{
		p->weapons.yes.push_back(n);
	}
}

// sort vector and remove duplicates
void removeDuplicates(vector<string> *v)
{
	sort(v->begin(),v->end());	// sort vector
	unique(v->begin(),v->end());	// remove duplicates
}

int main()
{
	initPlayers();
	printPlayer(&p0);
	enterCards(0,"suspect","plum");
	printPlayer(&p0);
}