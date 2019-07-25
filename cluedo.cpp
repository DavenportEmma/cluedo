#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <list>
#include <iostream>
using namespace std;

// structure holds the cards each player has, might have, and doesn't have
struct player
{
	int id;
	struct selection
	{
    	list<string> yes;
    	list<string> no;
    	list<string> maybe;
	}suspects,weapons,rooms;	// yes, no, maybe piles for suspects, weapons, rooms
}p0,p1,p2,p3,p4,p5;	// create players

// initialise player IDs
void initPlayers()
{
	p0.id = 0;
	p1.id = 1;
	p2.id = 2;
	p3.id = 3;
	p4.id = 4;
	p5.id = 5;
}

// print player contents
void printPlayer(player *p)
{
	list<string>::const_iterator iterator;
	cout << "Player " << p->id << endl;
	//------------------------------
	cout << "Suspects";
	cout << endl << "Yes:\t";
	for(iterator = p->suspects.yes.begin(); iterator != p->suspects.yes.end(); ++iterator)
	{
		cout << *iterator << ", ";
	}
	cout << endl << "No:\t";
	for(iterator = p->suspects.no.begin(); iterator != p->suspects.no.end(); ++iterator)
	{
		cout << *iterator << ", ";
	}
	cout << endl << "Maybe:\t";
	for(iterator = p->suspects.maybe.begin(); iterator != p->suspects.maybe.end(); ++iterator)
	{
		cout << *iterator << ", ";
	}
	//------------------------------
	cout << endl << "Weapons";
	cout << endl << "Yes:\t";
	for(iterator = p->weapons.yes.begin(); iterator != p->weapons.yes.end(); ++iterator)
	{
		cout << *iterator << ", ";
	}
	cout << endl << "No:\t";
	for(iterator = p->weapons.no.begin(); iterator != p->weapons.no.end(); ++iterator)
	{
		cout << *iterator << ", ";
	}
	cout << endl << "Maybe:\t";
	for(iterator = p->weapons.maybe.begin(); iterator != p->weapons.maybe.end(); ++iterator)
	{
		cout << *iterator << ", ";
	}
	//------------------------------
	cout << endl << "Rooms";
	cout << endl << "Yes:\t";
	for(iterator = p->rooms.yes.begin(); iterator != p->rooms.yes.end(); ++iterator)
	{
		cout << *iterator << ", ";
	}
	cout << endl << "No:\t";
	for(iterator = p->rooms.no.begin(); iterator != p->rooms.no.end(); ++iterator)
	{
		cout << *iterator << ", ";
	}
	cout << endl << "Maybe:\t";
	for(iterator = p->rooms.maybe.begin(); iterator != p->rooms.maybe.end(); ++iterator)
	{
		cout << *iterator << ", ";
	}
	cout << endl;
}


void playerGuess(int res, int pg, int pr, string sus, string wp, string rm)
{

}

int main()
{
	initPlayers();

	printPlayer(&p0);
    return 0;
}