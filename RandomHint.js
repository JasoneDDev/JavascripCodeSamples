#pragma strict

var hints:String[];

function hint():String
{
var hint:String;

	var rand = Random.Range(0,hints.Length);
	
	hint = hints[rand];
	return hint;
}