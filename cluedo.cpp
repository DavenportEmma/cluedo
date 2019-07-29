#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <vector>
#include <iostream>
#include <bits/stdc++.h>
using namespace std;

struct guess	// struct to store guesses made at player
{
	string suspect;
	string weapon;
	string room;
};

// structure holds the cards each player has, might have, and doesn't have
struct player
{
	int id;	// identifying number
	struct selection
	{
    	vector<string> yes;	// it is known the player has these
    	vector<string> no;	// it is known the player doesn't have these
    	vector<string> maybe;	// default location for all cards, can't say if player has or doesn't have these
	}suspects,weapons,rooms;	// yes, no, maybe vectors for suspects, weapons, rooms
	vector<guess> guesses;
}p0,p1,p2,p3,p4,p5;	// create players

const int Np = 6;	// number of players
struct card
{
	string name;	// name of card
	float Nm = Np;	// number of maybe vectors this card is in, must be float for prob calc to work correctly
	int Ny = 0;	// number of yes vectors this card is in
	float prob = 0.142857;	// probability this card is in the middle
	//	prob calc: (1-Ny)/((Np+1)-(Np-Nm)) -> initialise to 0.14
};
vector<card> suspectList {{"green"},{"mustard"},{"peacock"},{"plum"},{"scarlet"},{"white"}};
vector<card> weaponList {{"candlestick"},{"dagger"},{"pipe"},{"revolver"},{"rope"},{"spanner"}};
vector<card> roomList {{"ballroom"},{"billiard"},{"conservatory"},{"dining"},{"hall"},{"kitchen"},{"library"},{"lounge"},{"study"}};

// print player contents
void printPlayer(player *p)
{
	cout << "Player " << p->id << " ----------------" << endl;
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

void printAll()
{
	printPlayer(&p0);
	printPlayer(&p1);
	printPlayer(&p2);
	printPlayer(&p3);
	printPlayer(&p4);
	printPlayer(&p5);
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

		for(int j = 0; j < suspectList.size(); j++)
		{
			p->suspects.maybe.push_back(suspectList[j].name);
		}
		for(int j = 0; j < weaponList.size(); j++)
		{
			p->weapons.maybe.push_back(weaponList[j].name);
		}
		for(int j = 0; j < roomList.size(); j++)
		{
			p->rooms.maybe.push_back(roomList[j].name);
		}
	}
}

// sort vector and remove duplicates
void removeDuplicates(vector<string> *v)
{
	sort(v->begin(),v->end());	// sort vector
	unique(v->begin(),v->end());	// remove duplicates
}

// probability that this card is in the centre pile
/*	Np	number of players
	Ny	number of yes vectors this card is in
	Nm	number of maybe vectors this card is in
*/
float probability(int Ny, int Nm)
{
	return (1-Ny)/((Np+1)-(Np-Nm));
}

void updateProbability()
{

}

// called to put card n in the no vectors of all players except for player k
/*	pid	id of player to be excluded
	t	type of card; suspect, weapon, room
	n	card name
*/
void updateOtherPlayers(int pid, string t, string n)
{
	for(int i = 0; i < 6; i++)	// iterate through players
	{
		if(i != pid)	// if index is not the player who is to be excluded
		{
			player *p = IdPlayer(pid);
			if(t == "suspect")	// check what type of card is being entered
			{
				remove(p->suspects.maybe.begin(),p->suspects.maybe.end(),n);	// remove this card from the maybe vector
				p->suspects.no.push_back(n);	// add to the no vector
				removeDuplicates(&p->suspects.no);	// sort and remove duplicates from no vector
			}
			else if(t == "room")
			{
				remove(p->rooms.maybe.begin(),p->rooms.maybe.end(),n);
				p->rooms.no.push_back(n);
				removeDuplicates(&p->rooms.no);
			}
			else if(t == "weapon")
			{
				remove(p->weapons.maybe.begin(),p->weapons.maybe.end(),n);
				p->weapons.no.push_back(n);
				removeDuplicates(&p->weapons.no);
			}
		}
	}
}

// enter card into yes vector of player
// this affects other players, it is impossible for them to have this card
/*	p	player number
	t	type of card; suspect, weapon, room
	n	which card it is
*/
void enterCardToYes(player *p, string t, string n)
{
	if(t == "suspect")	// check what type of card is being entered
	{
		remove(p->suspects.maybe.begin(),p->suspects.maybe.end(),n);	// remove this card from the maybe vector
		p->suspects.yes.push_back(n);	// add to the yes vector
		removeDuplicates(&p->suspects.yes);	// sort and remove duplicates from yes vector
	}
	else if(t == "room")
	{
		remove(p->rooms.maybe.begin(),p->rooms.maybe.end(),n);
		p->rooms.yes.push_back(n);
		removeDuplicates(&p->rooms.yes);
	}
	else if(t == "weapon")
	{
		remove(p->weapons.maybe.begin(),p->weapons.maybe.end(),n);
		p->weapons.yes.push_back(n);
		removeDuplicates(&p->weapons.yes);
	}
	updateOtherPlayers(p->id,t,n);	// card is removed from all other players' maybe vector
}

// enter card into no vector of player
/*	p	player number
	t	type of card; suspect, weapon, room
	n	which card it is
*/
void enterCardToNo(player *p, string t, string n)
{
	if(t == "suspect")	// check what type of card is being entered
	{
		remove(p->suspects.maybe.begin(),p->suspects.maybe.end(),n);	// remove this card from the maybe vector
		p->suspects.no.push_back(n);	// add to the no vector
		removeDuplicates(&p->suspects.no);	// sort and remove duplicates from no vector

	}
	else if(t == "room")
	{
		remove(p->rooms.maybe.begin(),p->rooms.maybe.end(),n);
		p->rooms.no.push_back(n);
		removeDuplicates(&p->rooms.no);
	}
	else if(t == "weapon")
	{
		remove(p->weapons.maybe.begin(),p->weapons.maybe.end(),n);
		p->weapons.no.push_back(n);
		removeDuplicates(&p->weapons.no);
	}
}

// return 1 if string s is in vector v
int checkNoVectors(vector<string> *v, string s)
{
	if(find(v->begin(),v->end(),s) != v->end())
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

void prevGuessCheck(player *pr, string sus, string wp, string rm)
{
	int s, w, r;	// suspect, weapon, room flags

	// check responding player's no vectors
	s = checkNoVectors(&pr->suspects.no,sus);	// return 1 if suspect is in no vector
	w = checkNoVectors(&pr->weapons.no,wp);
	r = checkNoVectors(&pr->rooms.no,rm);

	// if 2 out of the 3 cards are in no vectors, we know the responding player has the third one
	if(s == 1 && w == 1 && r == 0)	// if suspect and weapon are in the no vectors
	{
		enterCardToYes(pr,"room",rm);	// enter room to yes vector
	}
	else if(s == 1 && w == 0 && r == 1)	// if suspect and room are in the no vectors
	{
		enterCardToYes(pr,"weapon",wp);	// enter weapon to yes vector
	}
	else if(s == 0 && w == 1 && r == 1)	// if weapon and room are in the no vectors
	{
		enterCardToYes(pr,"suspect",sus);	// enter suspect to yes vector
	}	
}

// log guess for rechecks
/*	pl	player id
	sus	suspect
	wp	weapon
	rm	room
*/
void logGuess(player *pl, string suspect, string weapon, string room)
{
	guess g0;	// create guess object
	g0.suspect = suspect;	// put guess cards into guess object
	g0.weapon = weapon;
	g0.room = room;
	pl->guesses.push_back(g0);	// push guess object to guesses vector
}

// the current guess may have given us info that would have changed the info we learned
// of a previous guess
// run through previous guesses to check
void runPrevGuesses(player *pl)
{
	string s, w, r;	// suspect, weapon, room
	for(int i = 0; i < pl->guesses.size(); i++)	// increment through guesses vector
	{
		s = pl->guesses[i].suspect;
		w = pl->guesses[i].weapon;
		r = pl->guesses[i].room;
		prevGuessCheck(pl,s,w,r);	// check previous guess
	}
}

// called when a player makes a guess
/*	pr		repsonding player
	res		response, 1 = pr has card, 0 = pr doesn't have card
	sus		suspect
	wp		weapon
	rm		room
*/
void playerGuess(player *pr, int res, string sus, string wp, string rm)
{	// get player object being referenced to by its ID
	int s, w, r;	// suspect, weapon, room flags
	if(res == 0)	// if responding player doesn't have any the suspect, weapon, or room card
	{	// enter the suspect, weapon, room to pr's no vectors
		enterCardToNo(pr,"suspect",sus);
		enterCardToNo(pr,"weapon",wp);
		enterCardToNo(pr,"room",rm);
	}
	else	// if responding player has at least one of the cards and shows it to the guessing player
	{
		// check responding player's no vectors
		s = checkNoVectors(&pr->suspects.no,sus);	// return 1 if suspect is in no vector
		w = checkNoVectors(&pr->weapons.no,wp);
		r = checkNoVectors(&pr->rooms.no,rm);

		// if 2 out of the 3 cards are in no vectors, we know the responding player has the third one
		if(s == 1 && w == 1 && r == 0)	// if suspect and weapon are in the no vectors
		{
			enterCardToYes(pr,"room",rm);	// enter room to yes vector
		}
		else if(s == 1 && w == 0 && r == 1)	// if suspect and room are in the no vectors
		{
			enterCardToYes(pr,"weapon",wp);	// enter weapon to yes vector
		}
		else if(s == 0 && w == 1 && r == 1)	// if weapon and room are in the no vectors
		{
			enterCardToYes(pr,"suspect",sus);	// enter suspect to yes vector
		}	
		else
		{
			// log the guess to check later when more information becomes available
			logGuess(pr,sus,wp,rm);
		}
	}
	runPrevGuesses(pr);
}

// print probability of each card being in the centre pile
void printProbabilities()
{	
	for(int i = 0; i < suspectList.size(); i++)
	{
		cout << suspectList[i].name <<"\t" << suspectList[i].prob << endl;
	}
	for(int i = 0; i < weaponList.size(); i++)
	{
		cout << weaponList[i].name <<"\t" << weaponList[i].prob << endl;
	}
	for(int i = 0; i < roomList.size(); i++)
	{
		cout << roomList[i].name <<"\t" << roomList[i].prob << endl;
	}
}

int main()
{
	initPlayers();
	printProbabilities();
	printAll();
}