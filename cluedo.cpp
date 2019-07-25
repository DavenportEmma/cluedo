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
	/*cout << endl << "No:\t";
	for(int i = 0; i < p->suspects.no.size(); i++)
	{
		cout << p->suspects.yes[i] << ", ";
	}
	cout << endl << "Maybe:\t";
	for(int i = 0; i < p->suspects.maybe.size(); i++)
	{
		cout << p->suspects.yes[i] << ", ";
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
		cout << p->weapons.yes[i] << ", ";
	}
	cout << endl << "Maybe:\t";
	for(int i = 0; i < p->weapons.maybe.size(); i++)
	{
		cout << p->weapons.yes[i] << ", ";
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
		cout << p->rooms.yes[i] << ", ";
	}
	cout << endl << "Maybe:\t";
	for(int i = 0; i < p->rooms.maybe.size(); i++)
	{
		cout << p->rooms.yes[i] << ", ";
	}
	cout << endl;*/
}


void playerGuess(int res, int pg, int pr, string sus, string wp, string rm)
{

}

int main()
{
	initPlayers();
	p0.suspects.yes.push_front("hello");
	p0.suspects.yes.push_front("world");
	printPlayer(&p0);
    return 0;
}