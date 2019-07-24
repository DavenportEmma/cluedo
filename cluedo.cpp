#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <vector>
#include <iostream>
using namespace std;

//  structure holds the cards each player has, might have, and doesn't have
struct player
{
	int id;
    vector<string> yes;
    vector<string> no;
    vector<string> maybe;
}p0,p1,p2,p3,p4,p5;

//	prints player to console
void printPlayer(player *p)
{
    int i;
	cout << "Player " << p->id << endl;
    //  display yes cards
	cout << "yes: ";
    if(!p->yes.empty())	//	if vector isn't empty
    {
        for(i = 0; i < p->yes.size(); i++)
        {
			cout << p->yes[i] << "\t";
        }
    }
	cout << endl;

	// display no cards
	cout << "no: ";
	if(!p->no.empty())	//	if vector isn't empty
    {
        for(i = 0; i < p->no.size(); i++)
        {
			cout << p->no[i] << "\t";
        }
    }
	cout << endl;

	// display maybe cards
	cout << "maybe: ";
	if(!p->maybe.empty())	//	if vector isn't empty
    {
        for(i = 0; i < p->maybe.size(); i++)
        {
			cout << p->maybe[i] << endl;
        }	
    }
	cout << endl;
}

// initialises players with ID number
void initPlayers()
{
	p0.id = 0;
	p1.id = 1;
	p2.id = 2;
	p3.id = 3; 
	p4.id = 4;
	p5.id = 5;
}

void compareNoLists()
{

}

int main()
{
	initPlayers();
    printPlayer(&p0);
    printPlayer(&p1);
    printPlayer(&p2);
    printPlayer(&p3);
    printPlayer(&p4);
    printPlayer(&p5);
    return 0;
}