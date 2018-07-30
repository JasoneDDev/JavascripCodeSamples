#pragma strict

var innerCircle:Transform;


var activeRange:float;
var visibleRange:float;

var StuntComplete=false;

var isHailMary=false;
var isEskimoRoll=false;
var isBowStall=false;

var isHailMaryReversed=false;
var isSternStall=false;

var isLoop=false;

var GoldCoin:GameObject;
var MoonCoin:GameObject;

@HideInInspector var Players:GameObject[];
@HideInInspector var Player:Transform;
@HideInInspector var playerNumber:float;

@HideInInspector var player1:int = 0;
@HideInInspector var player2:int = 0;

var isPractice=false;

private var startScript :StartScript; 
startScript = FindObjectOfType(StartScript);

private var gui:GUI_HUD;
gui = FindObjectOfType(GUI_HUD);

function Start()
{
	innerCircle.renderer.material.color.a = 0;

}

function GetClosestPlayer(): GameObject
{
	
	
	Players = new GameObject.FindGameObjectsWithTag("Player");

	var distanceToPlayer = Mathf.Infinity;
	var wantedPlayer : GameObject;
	playerNumber = 0.0;
	
	for ( var player1 : GameObject in Players)
	{
		playerNumber += 1.0;
	
		var newDistanceToPlayer = Vector3.SqrMagnitude(player1.transform.position- transform.position);
		if (newDistanceToPlayer < distanceToPlayer)
		{
			distanceToPlayer = newDistanceToPlayer;
			Player = player1.transform;
	
	}
	}
	
	




}

function FixedUpdate()
{
	if(startScript.playerMode)
	{

	GetClosestPlayer();
	var playerInRange = Vector3.SqrMagnitude(Player.position - this.transform.position);//Distance(Player.position,this.transform.position);
	
	//Debug.Log(playerInRange);
	if(playerInRange < activeRange*activeRange)
	{
			innerCircle.RotateAround(Vector3.up, 0.5 * Time.deltaTime);
		
			
			//Debug.Log(playerInRange);
			
			if(playerInRange < visibleRange*visibleRange && innerCircle.renderer.material.color.a<1 && !StuntComplete)
		{
			innerCircle.renderer.material.color.a += 0.05;
			
		}
		if(!Player.GetComponent(KayakerController).StuntMode && !StuntComplete)
		{
		Player.GetComponent(KayakerController).StuntMode=true;
		Player.GetComponent(KayakerController).stuntScript = this;
		
			if(isEskimoRoll)
			{
				gui.TutorialHelp("EskimoTut", false);
			}
			else if(isHailMary)
			{
				gui.TutorialHelp("HailMaryTut", false);
			}
			else if(isHailMaryReversed)
			{
				gui.TutorialHelp("HailMaryRTut", false);
			}
			else if(isLoop)
			{
				gui.TutorialHelp("LoopTut", false);
			}
			else if(isBowStall)
			{
				gui.TutorialHelp("BowStallTut", false);
			}
			else if(isSternStall)
			{
				gui.TutorialHelp("SternStallTut", false);
			}
		}
	
	}
	else if(playerInRange > visibleRange && innerCircle.renderer.material.color.a>0 || StuntComplete && innerCircle.renderer.material.color.a>0)
	{
		
		innerCircle.renderer.material.color.a -= 0.05;
	
		Player.GetComponent(KayakerController).StuntMode=false;
		
		if(isEskimoRoll)
		{
			gui.TutorialHelp("EskimoTut", true);
		}	
		else if(isHailMary)
		{
			gui.TutorialHelp("HailMaryTut", true);
		}
		else if(isHailMaryReversed)
		{
			gui.TutorialHelp("HailMaryRTut", true);
		}
		else if(isLoop)
		{
			gui.TutorialHelp("LoopTut",true);
		}
		else if(isBowStall)
		{
			gui.TutorialHelp("BowStallTut",true);
		}
		else if(isSternStall)
		{
			gui.TutorialHelp("SternStallTut",true);
		}
	}
	
	
	
	
}
}

function CompletedStunt(stuntName:String, player:int)
{
	if(isHailMary && stuntName == "HailMary")
	{
		if(player ==1 && player1 ==0 && !isPractice|| player ==2 && player2 ==0 && !isPractice)
		{
			if(player==1)
			{
			player1=1;
			startScript.stuntScore += 1;
			}
			else if(player==2)
			{
			player2=1;
			startScript.stuntScoreP2 += 1;
			}
		
		Player.GetComponent(KayakerController).StuntMode=false;
		gui.HailMary();
		gui.TutorialHelp("HailMaryTut",true);
			if(!startScript.multiplayerPVP)
			{
			CoinsExplosion();
			}
		}
		else if(isPractice)
		{
			Player.GetComponent(KayakerController).StuntMode=false;
			gui.HailMary();
			gui.TutorialHelp("HailMaryTut",true);
		}
	//StuntComplete=true;
	
	
	}
	
	if(isHailMaryReversed && stuntName == "HailMaryReversed")
	{
	if(player ==1 && player1 ==0 && !isPractice || player ==2 && player2 ==0 && !isPractice)
		{
			if(player==1)
			{
			player1=1;
			startScript.stuntScore += 1;
			}
			else if(player==2)
			{
			player2=1;
			startScript.stuntScoreP2 += 1;
			}
		
	Player.GetComponent(KayakerController).StuntMode=false;
	gui.HailMaryReversed();
	gui.TutorialHelp("HailMaryRTut",true);
	if(!startScript.multiplayerPVP)
			{
			CoinsExplosion();
			}
			}
			else if(isPractice)
		{
		Player.GetComponent(KayakerController).StuntMode=false;
	gui.HailMaryReversed();
	gui.TutorialHelp("HailMaryRTut",true);
		}
	}
	
	
	if(isEskimoRoll && stuntName == "EskimoRoll")
	{
	if(player ==1 && player1 ==0 && !isPractice || player ==2 && player2 ==0 && !isPractice)
		{
			if(player==1)
			{
			player1=1;
			startScript.stuntScore += 1;
			}
			else if(player==2)
			{
			player2=1;
			startScript.stuntScoreP2 += 1;
			}
	Player.GetComponent(KayakerController).StuntMode=false;
	gui.EskimoRoll();
	gui.TutorialHelp("EskimoTut", true);
	if(!startScript.multiplayerPVP)
			{
			CoinsExplosion();
			}
	}
	else if(isPractice)
		{
		Player.GetComponent(KayakerController).StuntMode=false;
	gui.EskimoRoll();
	gui.TutorialHelp("EskimoTut", true);
		}
	}
	
	
	if(isBowStall && stuntName == "BowStall")
	{
	if(player ==1 && player1 ==0 && !isPractice || player ==2 && player2 ==0 && !isPractice)
		{
			if(player==1)
			{
			player1=1;
			startScript.stuntScore += 1;
			}
			else if(player==2)
			{
			player2=1;
			startScript.stuntScoreP2 += 1;
			}
	Player.GetComponent(KayakerController).StuntMode=false;
	gui.BowStall();
	gui.TutorialHelp("BowStallTut", true);
	if(!startScript.multiplayerPVP)
			{
			CoinsExplosion();
			}
	}
	else if(isPractice)
		{
		Player.GetComponent(KayakerController).StuntMode=false;
	gui.BowStall();
	gui.TutorialHelp("BowStallTut", true);
		}
	}

	if(isSternStall && stuntName == "SternStall")
	{
	if(player ==1 && player1 ==0 && !isPractice || player ==2 && player2 ==0 && !isPractice)
		{
			if(player==1)
			{
			player1=1;
			startScript.stuntScore += 1;
			}
			else if(player==2)
			{
			player2=1;
			startScript.stuntScoreP2 += 1;
			}
	Player.GetComponent(KayakerController).StuntMode=false;
	gui.SternStall();
	gui.TutorialHelp("SternStallTut", true);
	if(!startScript.multiplayerPVP)
			{
			CoinsExplosion();
			}
	}
	else if(isPractice)
		{
		Player.GetComponent(KayakerController).StuntMode=false;
	gui.SternStall();
	gui.TutorialHelp("SternStallTut", true);
		}
	}
	
	if(isLoop && stuntName == "Loop")
	{
	if(player ==1 && player1 ==0 && !isPractice || player ==2 && player2 ==0 && !isPractice)
		{
			if(player==1)
			{
			player1=1;
			startScript.stuntScore += 1;
			}
			else if(player==2)
			{
			player2=1;
			startScript.stuntScoreP2 += 1;
			}
	Player.GetComponent(KayakerController).StuntMode=false;
	gui.Loop();
	gui.TutorialHelp("LoopTut", true);
	if(!startScript.multiplayerPVP)
			{
			CoinsExplosion();
			}
	}
	else if(isPractice)
		{
		Player.GetComponent(KayakerController).StuntMode=false;
	gui.Loop();
	gui.TutorialHelp("LoopTut", true);
		}
	}
	
	
}

function CoinsExplosion()
{
	
	var Count:int = 5;
	
	for(var c:int; c< Count; c++)
	{
		var direction:Vector3 = Vector3(Random.Range(0,1),3,Random.Range(0,1));
		var randy:float = Random.value;
		if(randy > 0.85)
		{
		var MCoin:GameObject = Instantiate(MoonCoin,this.transform.position,Quaternion.identity);
		MCoin.rigidbody.AddForce(direction,ForceMode.Force);
		
		}
		else
		{
		var GCoin:GameObject = Instantiate(GoldCoin,this.transform.position,Quaternion.identity);
		GCoin.rigidbody.AddForce(direction,ForceMode.Force);
		
		}
		
		
		
	}
	
	gui.ShowPoints(25);
	
}