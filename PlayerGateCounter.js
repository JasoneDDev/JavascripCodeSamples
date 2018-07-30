#pragma strict

@HideInInspector var hitIn:int;
@HideInInspector var hitOut:int;
//-----END-------------
@HideInInspector var Activated=true;

//if we head in and we have it checked to proceed when we go in than proceed
var CheckGoingIn=false;
var CheckGoingOut=false;

var GateWrongEffect:GameObject;
var GateCompleteEffect:GameObject;
var audioClip:AudioClip;
var audioClipX:AudioClip;

@HideInInspector var Players:GameObject[];
@HideInInspector var Player:Transform;
@HideInInspector var playerNumber:float;

var audioGateMaster:AudioSource;

@HideInInspector var startScript:StartScript;
startScript = FindObjectOfType(StartScript);

private var gui:GUI_HUD;
gui = FindObjectOfType(GUI_HUD);


@HideInInspector var arrowsHidden=true;
@HideInInspector var arrowsVisible=false;

var arrowPlane:Transform;

@HideInInspector var ranNum:int = 0;
@HideInInspector var player:int = 0;
@HideInInspector var player1:int = 0;
@HideInInspector var player2:int = 0;

var isPractice=false;
function SetPlayer(p:int)
{
	player = p;
	Debug.Log("player " + p);
}


function Start () {


audioGateMaster = GameObject.FindGameObjectWithTag("AudioGateMaster").audio;
}




function TestCollides()
{

	if(Activated)
	{

			if(hitIn==1 && hitOut==2)
			{
			
			hitIn=0;
			hitOut=0;
			
					if(CheckGoingOut)
					{
						if(player==1 && player1==0 || player==2 && player2==0 )
						{
							CompletedGate(player);
						}
					Debug.Log("player " + player + " player1 " + player1 + " player2 " + player2);
						//Activated=false;
					}
					else
					{
					//Debug.Log("Passed through gate the wrong way!");
					if(player==1 && player1==0 || player==2 && player2==0 )
						{
					IncompleteGate();
					}
						//Activated=false;
					}
			
			}
			else if(hitIn==2 && hitOut==1)
			{
			
			hitIn=0;
			hitOut=0;
			//Activated=false;
					if(CheckGoingIn)
					{
					if(player==1 && player1==0 || player==2 && player2==0 )
						{
							CompletedGate(player);
						}
					Debug.Log("player " + player + " player1 " + player1 + " player2 " + player2);
						//Activated=false;
					}
					else
					{
					//Debug.Log("Passed through gate the wrong way!");
					if(player==1 && player1==0 || player==2 && player2==0 )
						{
					IncompleteGate();
					}
					}
			}
			else
			{
			//Debug.Log("passed through triggers but nothing happened");
			}
	
	}
}

function CompletedGate(player:int)
{
	var completeOne = Instantiate(GateCompleteEffect, transform.position + Vector3(0,5,0), Quaternion.identity);
	if(audioClip!=null)
	{
	audioGateMaster.clip =audioClip;
	audioGateMaster.Play();
	}
	
	if(player==1 && !isPractice)
	{
	player1 = 1;
	startScript.currentScore+=1;
	gui.ShowPoints(12);
	}
	else if(player==2 && !isPractice)
	{
	player2 = 1;
	startScript.currentScoreP2+=1;
	}
	
	
	
	//Debug.Log("GATE COMPLETE------------------!");
}

function IncompleteGate()
{


var failedOne = Instantiate(GateWrongEffect, transform.position + Vector3(0,5,0), Quaternion.identity);
	if(audioClipX!=null)
	{
	audioGateMaster.clip =audioClipX;
	audioGateMaster.Play();
	}
	
	if(player==1 && !isPractice)
	{
	player1 = 1;
	//startScript.currentScore+=1;
	}
	else if(player==2 && !isPractice)
	{
	player2 = 1;
	//startScript.currentScoreP2+=1;
	}
	//Debug.Log("GATE Failed------------------!");
}







