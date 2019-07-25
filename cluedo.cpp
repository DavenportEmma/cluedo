#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <vector>
#include <iostream>
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
	}suspect,weapon,room;
}p0,p1,p2,p3,p4,p5;


int main()
{
    return 0;
}