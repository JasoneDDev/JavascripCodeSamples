#pragma strict
var pauseForStart=1.0;

private var spawnedRain=false;
//modes of play

var MultiPlayerMode = false; // two players
var TimedGateMode=false; // timed gates, best score wins in 2 player or in game credit gained for top 3 time slots
var TimedTrickMode = false; //time on the clock and you must get your top scores for doing tricks and tricks added to your trophy room / unlock tricks for use in game
var TimedMode = false; //race as fast as you can to the finish before the time runs out

//--------------------

@HideInInspector var gatesArePresent=false;
@HideInInspector var stuntsArePresent=false;
@HideInInspector var itemsArePresent=false;

 var TimeToCompleteIn:float;

var Water:Material;


@HideInInspector var multiplayerPVP=false;

@HideInInspector var startAnimation:AnimationClip;

@HideInInspector  var gamePaused = false;

@HideInInspector  var startMode = true;
@HideInInspector  var playerMode = false;
@HideInInspector  var FinishMode = false;

@HideInInspector  var levelCompleted=false;
@HideInInspector var bonusWin=0;
@HideInInspector var bonusWinP2=0;
@HideInInspector  var currentScore=0;
@HideInInspector  var currentScoreP2=0;
@HideInInspector  var stuntScore=0;
@HideInInspector  var stuntScoreP2=0;
@HideInInspector  var totalFlags = 0;
@HideInInspector  var totalStunts = 0;
@HideInInspector  var itemsGathered = 0;
@HideInInspector  var totalItems = 0;

@HideInInspector var HighScore:int;

@HideInInspector var gCoins:float;
@HideInInspector var gCoinsPer:float;
@HideInInspector var mCoins:float;
@HideInInspector var mCoinsPer:float;

@HideInInspector  var thrustPower = 1.0;
@HideInInspector  var healthPower = 1.0;

@HideInInspector var RiverTime : String;
@HideInInspector var elapsedTime:float;
@HideInInspector var pausedTime:float;
@HideInInspector var timerStarted=false;
@HideInInspector var riverTime:float;
@HideInInspector var minutes : int;
@HideInInspector var seconds : int;
@HideInInspector var fraction:int;
@HideInInspector var numOfPlayers:int;

@HideInInspector var redTimer:String;

var Player01_Prefab:GameObject;
var Player02_Prefab:GameObject;
var Player03_Prefab:GameObject;
var Player04_Prefab:GameObject;

var Player01_POS:Transform;
var Player02_POS:Transform;
var Player03_POS:Transform;
var Player04_POS:Transform;

var camSetup01:GameObject;

//kayas available----------------------

var kayakArray:GameObject[];
var lockedKayaks:GameObject[];
var HelmetArray:GameObject[];
var LockedHelmets:GameObject[];
var HairArray:GameObject[];
var LockedHairs:GameObject[];

@HideInInspector var practiceMode=false;


@HideInInspector var minutes2 : int;
@HideInInspector var seconds2 : int;
@HideInInspector var countDownTimer:String;


@HideInInspector var player01Kayak:GameObject;
@HideInInspector var player02Kayak:GameObject;
@HideInInspector var player03Kayak:GameObject;
@HideInInspector var player04Kayak:GameObject;

@HideInInspector var acheivementNum:int;

var setup01:Transform[];
//var setup02:Transform[];
//var setup03:Transform[];
//var setup04:Transform[];
//var setup05:Transform[];

var Rain:GameObject;

var CoinAudio:AudioClip;

private var gui :GUI_HUD; 
gui = FindObjectOfType(GUI_HUD);

private var gateBuilder :GateMaster; 
gateBuilder = GetComponent(GateMaster);

var DayNight:DayNightCycle;
DayNight = FindObjectOfType(DayNightCycle);

var loader:loadingScript;
loader = FindObjectOfType(loadingScript);

var RealCam:Camera;

var runningTheRiver:AudioClip;
var riverCompleted:AudioClip;

var charMat01:Material;
var charMat02:Material;
var charMat03:Material;
var charMat04:Material;

function SETUP():boolean
{
	var setupNum:int = 1;//PlayerPrefs.GetInt("RiverSetup"); 
	acheivementNum = setupNum; 
	Debug.Log(""+Application.loadedLevelName + "Acheivement0"+ acheivementNum);
	var mainSetup:Transform[];
		LoadCharMaps();
	if(setupNum == 1 )
	{
		mainSetup = setup01;
	}

	else if(setupNum == 10 && practiceMode)
	{
		return true;
	}
	else if(setupNum == 22 ) 
	{
		//multiplayer mode??
		// best time but add time for missed gates, each gate can be gotten once per player.
	}
	else
	{
	Debug.Log("setup is not set");
	}
	
	
	for(var item in mainSetup)
		{
			if(item.GetComponent(GateMaster))
			{
				item.GetComponent(GateMaster).BuildScene();
			}
			else if(item.GetComponent(StuntMaster))
			{
				item.GetComponent(StuntMaster).BuildScene();
			}
			else if(item.GetComponent(TimeMaster))
			{
				item.GetComponent(TimeMaster).BuildScene();
			}
			//need stuntMaster ---  Stunt Gui is created by this node
			//need item master ---  places items around the scene to find
			// need timer master -- to setup if the timer is active and if so we set a time to beat //  GUI is created by this node
		}
		
	
		
}

function LoadCharMaps()
{
	var numberOfPlayers:int = PlayerPrefs.GetInt("NumberOfPlayers");
	
	print("loading character maps--------------------");
    
   

#if !UNITY_EDITOR && UNITY_ANDROID
	
	          var www1 = new WWW("File://"+ Application.persistentDataPath + "/CharacterMaps/Char01.png");
            yield www1;
            charMat01.mainTexture = www1.texture;
        
	if(numberOfPlayers == 2)
	{
		 var www2 = new WWW("File://"+ Application.persistentDataPath + "/CharacterMaps/Char02.png");
            yield www2;
            charMat02.mainTexture = www2.texture;
	}
	if( numberOfPlayers == 3)
	{	
		var www3 = new WWW("File://"+ Application.persistentDataPath + "/CharacterMaps/Char03.png");
            yield www3;
            charMat03.mainTexture = www3.texture;
	}
	if( numberOfPlayers == 4)
	{
		var www4 = new WWW("File://"+ Application.persistentDataPath + "/CharacterMaps/Char04.png");
            yield www4;
            charMat04.mainTexture = www4.texture;
	}

 #else                
            var www1 = new WWW("File://"+ Application.dataPath + "/CharacterMaps/Char01.png");
            yield www1;
            charMat01.mainTexture = www1.texture;
        
	if(numberOfPlayers == 2)
	{
		 var www2 = new WWW("File://"+ Application.dataPath + "/CharacterMaps/Char02.png");
            yield www2;
            charMat02.mainTexture = www2.texture;
	}
	if( numberOfPlayers == 3)
	{	
		var www3 = new WWW("File://"+ Application.dataPath + "/CharacterMaps/Char03.png");
            yield www3;
            charMat03.mainTexture = www3.texture;
	}
	if( numberOfPlayers == 4)
	{
		var www4 = new WWW("File://"+ Application.dataPath + "/CharacterMaps/Char04.png");
            yield www4;
            charMat04.mainTexture = www4.texture;
	}

	
	#endif
}

function Start () {


	if(PlayerPrefs.GetInt("MultiMode") == 2)
	{
	// this is PVP mode
	multiplayerPVP = true;
	Debug.Log("pvp? " + multiplayerPVP);
	}
	
	if(PlayerPrefs.GetInt("PracticeMode") == 2 )
	{
	practiceMode=true;
	}

HighScore = PlayerPrefs.GetInt("HighScore");
startAnimation = GameObject.FindGameObjectWithTag("StartNode").animation.clip;

DayNight.LoadEnviro();

var unlockKayaks = UnlockKayaks();
yield unlockKayaks;

var unlockHairs = UnlockHairs();
yield unlockHairs;

var unlockHelmets = UnlockHelmets();
yield unlockHelmets;

//var buildGates = gateBuilder.BuildScene();
var setup = SETUP();
yield setup;

//here we look and grab all the flags that are in scene and post them to totalFlags
var Gates:GameObject[];
Gates = GameObject.FindGameObjectsWithTag("Gates");
totalFlags = Gates.Length;

var Stunts:GameObject[];
Stunts = GameObject.FindGameObjectsWithTag("Stunts");
totalStunts = Stunts.Length;

yield WaitForSeconds(pauseForStart);
StartGame();
GameSetup();
yield WaitForSeconds(startAnimation.length);
startMode = false;
playerMode = true;

	Water.mainTextureOffset.y =0.0;
	Water.mainTextureOffset.x =0.0;

}

function GameSetup()
{

//here we set the current Kayak for each player

player01Kayak = kayakArray[PlayerPrefs.GetInt("player01Kayak")];
player02Kayak = kayakArray[PlayerPrefs.GetInt("player02Kayak")];
player03Kayak = kayakArray[PlayerPrefs.GetInt("player03Kayak")];
player04Kayak = kayakArray[PlayerPrefs.GetInt("player04Kayak")];


//----------------------------------------

numOfPlayers = PlayerPrefs.GetInt("NumberOfPlayers");

if(numOfPlayers > 1)
{
var multiHiders:GameObject[] = GameObject.FindGameObjectsWithTag("MultiHiders");

	for(hide in multiHiders)
	{
		hide.active=false;
	}
}

if(numOfPlayers==4)
{
//instance all 4 players
var Player014 = Instantiate(Player01_Prefab, Player01_POS.position, Player01_POS.rotation);

var cam014 = Instantiate(camSetup01,Vector3.zero, Quaternion.identity);
var playNode14:Transform = cam014.transform.Find("PlayerNode").transform;
var mainCam14:CameraScript = cam014.transform.Find("MainCamera").GetComponent(CameraScript);
mainCam14.PlayerNode = playNode14;
playNode14.GetComponent(SmoothFollowKayak).target = Player014.transform;

// cam settings
mainCam14.transform.Find("Main Camera").GetComponent(Camera).rect = Rect (0, 0.5,0.5, 0.5);

// set the kayak
var Player14Kayak = Instantiate(player01Kayak,Player01_POS.position,Player01_POS.rotation);
Player14Kayak.transform.parent = Player014.transform; 
Player14Kayak.transform.position.y = Player14Kayak.transform.GetComponent(KayakScript).yPOS;
Player014.transform.GetComponent(KayakerController).currentKayak = Player14Kayak.transform.GetComponent(KayakScript);
Player14Kayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = Player14Kayak.transform.GetComponent(KayakScript).KayakMaterial01;


var Player024 = Instantiate(Player02_Prefab, Player02_POS.position, Player02_POS.rotation);

var cam024 = Instantiate(camSetup01,Vector3.zero, Quaternion.identity);
var playNode24:Transform = cam024.transform.Find("PlayerNode").transform;
var mainCam24:CameraScript = cam024.transform.Find("MainCamera").GetComponent(CameraScript);
mainCam24.PlayerNode = playNode24;
playNode24.GetComponent(SmoothFollowKayak).target = Player024.transform;

// cam settings
mainCam24.transform.Find("Main Camera").GetComponent(Camera).rect = Rect (.5, 0.5,0.5, 0.5);

// set the kayak
var Player24Kayak = Instantiate(player02Kayak,Player02_POS.position,Player02_POS.rotation);
Player24Kayak.transform.parent = Player024.transform; 
Player24Kayak.transform.position.y = Player24Kayak.transform.GetComponent(KayakScript).yPOS;
Player024.transform.GetComponent(KayakerController).currentKayak = Player24Kayak.transform.GetComponent(KayakScript);
Player24Kayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = Player24Kayak.transform.GetComponent(KayakScript).KayakMaterial02;


var Player034 = Instantiate(Player03_Prefab, Player03_POS.position, Player03_POS.rotation);

var cam034 = Instantiate(camSetup01,Vector3.zero, Quaternion.identity);
var playNode34:Transform = cam034.transform.Find("PlayerNode").transform;
var mainCam34:CameraScript = cam034.transform.Find("MainCamera").GetComponent(CameraScript);
mainCam34.PlayerNode = playNode34;
playNode34.GetComponent(SmoothFollowKayak).target = Player034.transform;
// cam settings
mainCam34.transform.Find("Main Camera").GetComponent(Camera).rect = Rect (0, 0,0.5, 0.5);

// set the kayak
var Player34Kayak = Instantiate(player03Kayak,Player03_POS.position,Player03_POS.rotation);
Player34Kayak.transform.parent = Player034.transform; 
Player34Kayak.transform.position.y = Player34Kayak.transform.GetComponent(KayakScript).yPOS;
Player034.transform.GetComponent(KayakerController).currentKayak = Player34Kayak.transform.GetComponent(KayakScript);
Player34Kayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = Player34Kayak.transform.GetComponent(KayakScript).KayakMaterial03;


var Player044 = Instantiate(Player04_Prefab, Player04_POS.position, Player04_POS.rotation);

var cam044 = Instantiate(camSetup01,Vector3.zero, Quaternion.identity);
var playNode44:Transform = cam044.transform.Find("PlayerNode").transform;
var mainCam44:CameraScript = cam044.transform.Find("MainCamera").GetComponent(CameraScript);
mainCam44.PlayerNode = playNode44;
playNode44.GetComponent(SmoothFollowKayak).target = Player044.transform;

// cam settings
mainCam44.transform.Find("Main Camera").GetComponent(Camera).rect = Rect (0.5, 0,0.5, 0.5);

// set the kayak
var Player44Kayak = Instantiate(player04Kayak,Player04_POS.position,Player04_POS.rotation);
Player44Kayak.transform.parent = Player044.transform; 
Player44Kayak.transform.position.y = Player44Kayak.transform.GetComponent(KayakScript).yPOS;
Player044.transform.GetComponent(KayakerController).currentKayak = Player44Kayak.transform.GetComponent(KayakScript);
Player44Kayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = Player44Kayak.transform.GetComponent(KayakScript).KayakMaterial04;



MultiPlayerMode=true;
}


else if(numOfPlayers==3)
{
//instance all 3 players
var Player013 = Instantiate(Player01_Prefab, Player01_POS.position, Player01_POS.rotation);

var cam013 = Instantiate(camSetup01,Vector3.zero, Quaternion.identity);
var playNode13:Transform = cam013.transform.Find("PlayerNode").transform;
var mainCam13:CameraScript = cam013.transform.Find("MainCamera").GetComponent(CameraScript);
mainCam13.PlayerNode = playNode13;
playNode13.GetComponent(SmoothFollowKayak).target = Player013.transform;

// cam settings
mainCam13.transform.Find("Main Camera").GetComponent(Camera).rect = Rect (0, 0.5,0.5, 0.5);

// set the kayak
var Player13Kayak = Instantiate(player01Kayak,Player01_POS.position,Player01_POS.rotation);
Player13Kayak.transform.parent = Player013.transform; 
Player13Kayak.transform.position.y = Player13Kayak.transform.GetComponent(KayakScript).yPOS;
Player013.transform.GetComponent(KayakerController).currentKayak = Player13Kayak.transform.GetComponent(KayakScript);
Player13Kayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = Player13Kayak.transform.GetComponent(KayakScript).KayakMaterial01;


var Player023 = Instantiate(Player02_Prefab, Player02_POS.position, Player02_POS.rotation);

var cam023 = Instantiate(camSetup01,Vector3.zero, Quaternion.identity);
var playNode23:Transform = cam023.transform.Find("PlayerNode").transform;
var mainCam23:CameraScript = cam023.transform.Find("MainCamera").GetComponent(CameraScript);
mainCam23.PlayerNode = playNode23;
playNode23.GetComponent(SmoothFollowKayak).target = Player023.transform;

// cam settings
mainCam23.transform.Find("Main Camera").GetComponent(Camera).rect = Rect (0.5, 0.5,0.5, 0.5);

// set the kayak
var Player23Kayak = Instantiate(player02Kayak,Player02_POS.position,Player02_POS.rotation);
Player23Kayak.transform.parent = Player023.transform; 
Player23Kayak.transform.position.y = Player23Kayak.transform.GetComponent(KayakScript).yPOS;
Player023.transform.GetComponent(KayakerController).currentKayak = Player23Kayak.transform.GetComponent(KayakScript);
Player23Kayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = Player23Kayak.transform.GetComponent(KayakScript).KayakMaterial02;



var Player033 = Instantiate(Player03_Prefab, Player03_POS.position, Player03_POS.rotation);

var cam033 = Instantiate(camSetup01,Vector3.zero, Quaternion.identity);
var playNode33:Transform = cam033.transform.Find("PlayerNode").transform;
var mainCam33:CameraScript = cam033.transform.Find("MainCamera").GetComponent(CameraScript);
mainCam33.PlayerNode = playNode33;
playNode33.GetComponent(SmoothFollowKayak).target = Player033.transform;

// cam settings
mainCam33.transform.Find("Main Camera").GetComponent(Camera).rect = Rect (0.25, 0,0.5, 0.5);

// set the kayak
var Player33Kayak = Instantiate(player03Kayak,Player03_POS.position,Player03_POS.rotation);
Player33Kayak.transform.parent = Player033.transform; 
Player33Kayak.transform.position.y = Player33Kayak.transform.GetComponent(KayakScript).yPOS;
Player033.transform.GetComponent(KayakerController).currentKayak = Player33Kayak.transform.GetComponent(KayakScript);
Player33Kayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = Player33Kayak.transform.GetComponent(KayakScript).KayakMaterial03;



MultiPlayerMode=true;
}


else if(numOfPlayers==2)
{
//instance all 2 players
var Player012 = Instantiate(Player01_Prefab, Player01_POS.position, Player01_POS.rotation);

var cam012 = Instantiate(camSetup01,Vector3.zero, Quaternion.identity);
var playNode12:Transform = cam012.transform.Find("PlayerNode").transform;
var mainCam12:CameraScript = cam012.transform.Find("MainCamera").GetComponent(CameraScript);
mainCam12.PlayerNode = playNode12;
playNode12.GetComponent(SmoothFollowKayak).target = Player012.transform;

// cam settings
mainCam12.transform.Find("Main Camera").GetComponent(Camera).rect = Rect (0, 0,0.5, 1);

// set the kayak
var Player12Kayak = Instantiate(player01Kayak,Player01_POS.position,Player01_POS.rotation);
Player12Kayak.transform.parent = Player012.transform; 
Player12Kayak.transform.position.y = Player12Kayak.transform.GetComponent(KayakScript).yPOS;
Player012.transform.GetComponent(KayakerController).currentKayak = Player12Kayak.transform.GetComponent(KayakScript);
Player12Kayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = Player12Kayak.transform.GetComponent(KayakScript).KayakMaterial01;
//----

//player 2 setup
var Player022 = Instantiate(Player02_Prefab, Player02_POS.position, Player02_POS.rotation);

var cam022 = Instantiate(camSetup01,Vector3.zero, Quaternion.identity);
var playNode22:Transform = cam022.transform.Find("PlayerNode").transform;
var mainCam22:CameraScript = cam022.transform.Find("MainCamera").GetComponent(CameraScript);
mainCam22.PlayerNode = playNode22;
playNode22.GetComponent(SmoothFollowKayak).target = Player022.transform;
// cam settings
mainCam22.transform.Find("Main Camera").GetComponent(Camera).rect = Rect (0.5, 0,0.5, 1);

// set the kayak
var Player22Kayak = Instantiate(player02Kayak,Player02_POS.position,Player02_POS.rotation);
Player22Kayak.transform.parent = Player022.transform; 
Player22Kayak.transform.position.y = Player22Kayak.transform.GetComponent(KayakScript).yPOS;
Player022.transform.GetComponent(KayakerController).currentKayak = Player22Kayak.transform.GetComponent(KayakScript);
Player22Kayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = Player22Kayak.transform.GetComponent(KayakScript).KayakMaterial02;
//----


MultiPlayerMode=true;
}



else if(numOfPlayers==1)
{
//instance 1 player
var Player01 = Instantiate(Player01_Prefab, Player01_POS.position, Player01_POS.rotation);

var cam01 = Instantiate(camSetup01,Vector3.zero, Quaternion.identity);
var playNode:Transform = cam01.transform.Find("PlayerNode").transform;
var mainCam:CameraScript = cam01.transform.Find("MainCamera").GetComponent(CameraScript);
mainCam.PlayerNode = playNode;
playNode.GetComponent(SmoothFollowKayak).target = Player01.transform;

// set the kayak
var Player01Kayak = Instantiate(player01Kayak,Player01_POS.position,Player01_POS.rotation);
Player01Kayak.transform.parent = Player01.transform; 
Player01Kayak.transform.position.y = Player01Kayak.transform.GetComponent(KayakScript).yPOS;
Player01.transform.GetComponent(KayakerController).currentKayak = Player01Kayak.transform.GetComponent(KayakScript);
Player01Kayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = Player01Kayak.transform.GetComponent(KayakScript).KayakMaterial01;
//----

MultiPlayerMode=false;

RandomRain();

// grab the coins from player prefs



gCoins = PlayerPrefs.GetInt("GoldCoinCount");
mCoins = PlayerPrefs.GetInt("MoonCoinCount");
Debug.Log(mCoins);
Debug.Log(mCoins/5000);

//first river 5 pack = 5,000 (50 coins * 200 stunts)
//2nd river 5 pack   = 15,000 (50 coins * 600 stunts)
//last river 5 pack  = 30,000 (50 coins * 1200 stunts)
if(gCoins > 30000)
{
	PlayerPrefs.SetInt("unlockedRiverPack",3);
}


if(gCoins > 15000 && gCoins<=30000)
{
	
	gCoinsPer = gCoins / 30000;
	PlayerPrefs.SetInt("unlockedRiverPack",2);
}
else if(gCoins > 5000)
{
	gCoinsPer = gCoins / 15000;
	PlayerPrefs.SetInt("unlockedRiverPack",1);
	
}
else //it's under 10k
{
	gCoinsPer = gCoins / 5000;
}

if(mCoins<=5000)
		{
					
			mCoinsPer = mCoins / 5000;
		}
		else
		{
		mCoinsPer=1;
		}
				
gui.MoonCBar.value = mCoinsPer;
gui.GoldCBar.value = gCoinsPer;

}

if(multiplayerPVP)
{
gui.HealthBar.hidden=true;
gui.HealthBarSprite.hidden=true;
}

}



function StartTimer()
{
	if(!timerStarted)
	{
	timerStarted=true;
	elapsedTime = Time.time;
		
	}
}

function PlayerDied()
{

if(!gui.HealthBar.hidden)
{
	gui.TutorialHelp("HideAll", false);
	gui.Flags.hidden=true;
	gui.Stunts.hidden=true;
	gui.HighScore.hidden=true;
	gui.Timer.hidden=true;
	gui.HealthBarSprite.hidden=true;
	gui.HealthBar.hidden=true;
	
	SwapMusicEnd();
	
	gui.LevelStart.text = "Oh NO!! You Drowned...\n\nRemember to use 'U' and your Left Stick to wright yourself.";
	
	
	
	gui.LevelStart.alphaFromTo(1f,0,1,Easing.Linear.easeOut);
	gui.LevelStart.scaleFromTo( 1f, new Vector3( 0, 0, 0 ), new Vector3( 1f, 1f, 1 ), Easing.Bounce.easeOut );
	yield WaitForSeconds(5);

	gui.LevelStart.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
	yield WaitForSeconds(1f);
	gui.Fader.alphaTo(1.0f,1,Easing.Linear.easeInOut);
	yield WaitForSeconds(1f);
	gui.Loading.hidden=false;
	gui.Loading.playSpriteAnimation( "anim", 5 );
	//unhide loading symbol
	
	PlayerPrefs.SetInt("LoadOnScreen",1);
	PlayerPrefs.Save();
	
	var Asynch = Application.LoadLevelAsync("MenuScene");
	yield Asynch;
}}

function FixedUpdate () {


if(gatesArePresent && !practiceMode)
{
gui.Flags.text = ""+ currentScore.ToString() + "/" + totalFlags.ToString();
	if(multiplayerPVP)
	{
	gui.FlagsP2.text = ""+ currentScoreP2.ToString() + "/" + totalFlags.ToString();
	}
}
else
{

gui.Flags.hidden=true;

gui.FlagsP2.hidden=true;
}

if(stuntsArePresent && !practiceMode)
{
gui.Stunts.text = "" + stuntScore.ToString() + "/" + totalStunts.ToString();
if(multiplayerPVP)
	{
	gui.StuntsP2.text = "" + stuntScoreP2.ToString() + "/" + totalStunts.ToString();
	}
}
else
{
gui.Stunts.hidden=true;

gui.StuntsP2.hidden=true;

}

//gui.PowerBar.value=thrustPower;
if(!multiplayerPVP)
{
gui.HealthBar.value=healthPower;
}

if(loader.ControllerCount != loader.Controllers.Length && !InputManager.Moga)
{
	gamePaused = true;
	gui.CheckControls();
}

if(!gamePaused)
{
	//water running-----------------
	Water.mainTextureOffset.y +=0.008;
	Water.mainTextureOffset.x +=0.001;
	//
	//-------ARE WE DEAD????------------
	
	if(healthPower<=0)
	{
		gamePaused = true;
		PlayerDied();
	}
	
	//-----------------------------------
		if(thrustPower <= 1)
		{
		thrustPower += 0.005;
		}
		else
		{
		thrustPower=1;
		}
		
			if(playerMode)
			{
			StartTimer();
			riverTime = (Time.time - elapsedTime) - pausedTime;
			if(TimeToCompleteIn > 0)
			{
			
			
		
		   minutes  = riverTime / 60;
		   seconds = riverTime % 60;
		   fraction  = (riverTime * 100) % 100;
		
		   RiverTime = String.Format ("{0:00}:{1:00}:{2:00}", minutes, seconds, fraction); 
		   
		   if(riverTime <= TimeToCompleteIn + 0.5)
		   {
		   		gui.Timer.text = ""+RiverTime;
		   		redTimer = ""+RiverTime;
		   }
		   else
		   {
		   		gui.TimerStopped.hidden=false;
		   		gui.TimerStopped.text = "" + redTimer;
		   		gui.Timer.hidden=true;
		   }
		  
		   }
		   
		   else if( playerMode && TimeToCompleteIn < 1)
		   {
		   gui.Timer.hidden=true;
		   gui.TimerStopped.hidden=true;
		   }
		   }
}
else
{

//----PAUSED TIME------------------------
if(timerStarted)
{
pausedTime += Time.deltaTime;
}
//------------------------------------
 }	
 
		if(!loader.WW3DIsUnlocked)
		{
			gui.CountDownTimer.hidden=true;
		}
		else if(loader.TimeRemaining>0.1)
		{
	
		   minutes2  = loader.TimeRemaining / 60;
		   seconds2 = loader.TimeRemaining % 60;
		  
		
		   countDownTimer = String.Format ("{0:00}:{1:00}", minutes2, seconds2);  	    	   
 	   	   
 	   	   gui.CountDownTimer.text = "Trial "+countDownTimer; 
 	   	   
 	   	   	   	   }
 	   	   	   	   else if(loader.WW3DIsUnlocked && !gui.CountDownTimer.hidden)
 	   	   	   	   {
 	   	   	   	   		gui.CountDownTimer.hidden=true;
 	   	   	   	   }	   	   
}


function SwapMusicStart()
{
	loader.audioToSwapTo = runningTheRiver;
	loader.SwappingSound=true;
	Debug.Log("swapping ON");
}

function SwapMusicEnd()
{
	loader.audioToSwapTo = riverCompleted;
	loader.SwappingSound=true;
	Debug.Log("swapping ON");
}


function StartGame()
{




gui.LevelStart.clear();
Debug.Log(practiceMode + "  " + MultiPlayerMode);
if(!practiceMode)
{
	gui.LevelStart.text += "ACHEIVEMENTS\n\n";
	if(PlayerPrefs.GetInt(""+Application.loadedLevelName + "Acheivement01") != 2)
	{
	gui.LevelStart.text += " - Cross Finish Line -\n";
	}
	if(PlayerPrefs.GetInt(""+Application.loadedLevelName + "Acheivement02") != 2)
	{
	gui.LevelStart.text += " - Complete All Gates -\n";
	}
	if(PlayerPrefs.GetInt(""+Application.loadedLevelName + "Acheivement03") != 2)
	{
	gui.LevelStart.text += " - Complete All Stunts -\n";
	}
	if(PlayerPrefs.GetInt(""+Application.loadedLevelName + "Acheivement04") != 2)
	{
	 var tempTime = Mathf.Round((PlayerPrefs.GetFloat("" + Application.loadedLevelName + "BestTime")/60) * 100f)/100f;
	gui.LevelStart.text += " - Beat Your Best Time ( " +  tempTime + " )-\n";
	}
	if(PlayerPrefs.GetInt(""+Application.loadedLevelName + "Acheivement05") != 2)
	{
	gui.LevelStart.text += " - Complete All Gates & Stunts -\n";
	}
}
else
{
gui.LevelStart.text += "" + PlayerPrefs.GetString("RiverSetupDirections");
}
gui.LevelStart.text += " \n\nGet Ready!";

gui.LevelStart.alphaFromTo(1f,0,1,Easing.Linear.easeOut);
gui.LevelStart.scaleFromTo( 1f, new Vector3( 0, 0, 0 ), new Vector3( 1f, 1f, 1f ), Easing.Elastic.easeOut );
yield WaitForSeconds(startAnimation.length);
gui.LevelStart.scaleFromTo( 0.25f, new Vector3( 1f, 1f, 1f), new Vector3( 0f, 0f, 0 ), Easing.Elastic.easeOut );
gui.LevelStart.clear();
gui.LevelStart.text = "GO!";
gui.LevelStart.scaleFromTo( 0.5f, new Vector3( 0, 0, 0 ), new Vector3( 1.5f, 1.5f, 1 ), Easing.Elastic.easeOut );

yield WaitForSeconds(0.5f);
gui.LevelStart.alphaFromTo(1f,1,0,Easing.Linear.easeOut);

if(Rain !=null && spawnedRain)
	{
var RainObj = GameObject.FindGameObjectWithTag("Rain").transform;
RainObj.position = GameObject.FindGameObjectWithTag("Player").transform.position;
RainObj.rotation = Quaternion.identity;
}

SwapMusicStart();



}

function CourseComplete()
{


if(!levelCompleted)
{
SwapMusicEnd();
levelCompleted = true;
var finishNode:Animation;
finishNode = GameObject.FindGameObjectWithTag("FinishNode").animation;
playerMode = false;
FinishMode = true;
//finishNode.animation.clip = endAnimation;
finishNode.animation.Play();


//fade out GUI

gui.Flags.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
gui.Stunts.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
gui.HighScore.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
gui.Timer.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
gui.FlagsSprite.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
gui.StuntSprite.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
if(!multiplayerPVP)
{
gui.HealthBarSprite.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
gui.HealthBar.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
}
else
{
gui.FlagsP2.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
gui.FlagsSpriteP2.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
gui.StuntsP2.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
gui.StuntSpriteP2.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
}
//gui.PowerBarSprite.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
//gui.PowerBar.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
yield WaitForSeconds(1.0f);
//-----------------------
if(!practiceMode && !multiplayerPVP)
{




var testAcheivement = TestAcheivement();
yield testAcheivement;


	if(testAcheivement)
	{
		Debug.Log("Acheivement Achieved");
		LevelSuccessfull();
	}
	else
	{
		Debug.Log("Acheivement not completed");
		LevelUnsuccessfull();
	}
}
else if(multiplayerPVP)
{
//test to see who won the round
	var PVPTest = PVPTest();
	
		if(PVPTest==1)
		{
		//show player 01 winner
		PlayerWinner(1);
		}
		else if(PVPTest==2)
		{
		//show player 02 winner
		PlayerWinner(2);
		}
		else
		{
		//show its a tie
		PlayerWinner(0);
		}

}
else
{
	RiverCompleted();
}

}
}

function PlayerWinner(winner:int)
{

	switch (winner)
	{
		case 1:
			gui.LevelStart.text = "Player 1 is the Winner!\n" + "Player 1 Score: " + (currentScore+stuntScore)+ " pts" + "\nPlayer 2 Score: " + (currentScoreP2+stuntScoreP2)+ " pts" + "\nFinish Line Bonus: 5 pts";
			
		
		break;
		
		case 2:
			gui.LevelStart.text = "Player 2 is the Winner!\n" + "Player 2 Score: " + (currentScoreP2+stuntScoreP2)+ " pts"  + "\nPlayer 1 Score: " + (currentScore+stuntScore)+ " pts" + "\nFinish Line Bonus: 5 pts";
		break;
		
		case 0:
			gui.LevelStart.text = "Looks like it's a tie!\n" + "Player 1 Score: " + (currentScore+stuntScore)+ " pts" + "\nPlayer 2 Score: " + (currentScoreP2+stuntScoreP2)+ " pts"+ "\nFinish Line Bonus: 5 pts";
		break;
	}
	
			gui.LevelStart.alphaFromTo(1f,0,1,Easing.Linear.easeOut);
			gui.LevelStart.scaleFromTo( 1f, new Vector3( 0, 0, 0 ), new Vector3( 1f, 1f, 1 ), Easing.Bounce.easeOut );
			yield WaitForSeconds(3);
		
			gui.LevelStart.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
			yield WaitForSeconds(1f);
			gui.Fader.alphaTo(1.0f,1,Easing.Linear.easeInOut);
			yield WaitForSeconds(1f);
			gui.Loading.hidden=false;
			gui.Loading.playSpriteAnimation( "anim", 5 );
			//unhide loading symbol
			if(!MultiPlayerMode)
			{
			PlayerPrefs.SetInt("LoadOnScreen",1);
			PlayerPrefs.Save();
			}
			var Asynch = Application.LoadLevelAsync("MenuScene");
			yield Asynch;

}

function UnlockKayaks():boolean
{

	
	var StringText:String = PlayerPrefs.GetString("unlockedKayaks");
	var kayakArrayNew:String[] = StringText.Split(","[0]);

	
	for (var i in kayakArrayNew)
	{
		if(i != "")
		{
			if(lockedKayaks.Length-1 >= int.Parse(i))
			{
			var tempOBJ:GameObject = lockedKayaks[int.Parse(i)];
			kayakArray += [tempOBJ];
			}
		}
	}
	

return true;
}




function UnlockHelmets():boolean
{

	var StringText1:String = PlayerPrefs.GetString("unlockedHats");
	var helArray:String[] = StringText1.Split(","[0]);
	
	for (var i in helArray)
	{
		if(i != "")
		{
			if(LockedHelmets.Length-1 >= int.Parse(i))
			{
			var tempOBJ:GameObject = LockedHelmets[int.Parse(i)];
			HelmetArray += [tempOBJ];
			}
		}
	}

return true;
}

function UnlockHairs():boolean
{

	var StringText2:String = PlayerPrefs.GetString("unlockedHairs");
	var hairArray:String[] = StringText2.Split(","[0]);
	
	for (var i in hairArray)
	{
		if(i != "")
		{
			if(LockedHairs.Length-1 >= int.Parse(i))
			{
			var tempOBJ2:GameObject = LockedHairs[int.Parse(i)];
			HairArray += [tempOBJ2];
			}
		}
	}

return true;
}


function PVPTest() : int
{
var Player01Score:int;
var Player02Score:int;

	if(gatesArePresent)
	{
	
		if(currentScore > currentScoreP2)
		{
		//player01 won
		
		Player01Score+= (currentScore - currentScoreP2);
		}
		else
		{
		//player02 won
		Player02Score+= (currentScoreP2 - currentScore);
		}
	}
	
	if(stuntsArePresent )
	{
		if(currentScore > currentScoreP2)
		{
		//player01 won
		
		Player01Score+= (currentScore - currentScoreP2) + bonusWin;
		}
		else
		{
		//player02 won
		Player02Score+= (currentScoreP2 - currentScore) + bonusWinP2;
		}
	}

var winner:int;	
	if(Player01Score > Player02Score)
	{
	//player01 won
	winner=1;
	}
	else if(Player01Score == Player02Score)
	{
	//tied 
	winner=0;
	}
	else
	{
	//player 2 won
	winner=2;
	}

return winner;
}

function TestAcheivement()
{

var achieved = false;
	
	gui.LevelStart.clear();
	gui.LevelStart.text +="ACHEIVEMENTS COMPLETED\n";
	
	
		if(PlayerPrefs.GetFloat("" + Application.loadedLevelName + "BestTime") <= 0 )
	{
	PlayerPrefs.SetFloat("" + Application.loadedLevelName + "BestTime", riverTime);
	PlayerPrefs.SetInt(""+Application.loadedLevelName + "Acheivement01", 2); // passed the finish line, unlocked 1st acheivement
	achieved = true;
	gui.LevelStart.text += "- Crossed the Finish Line -\n";
	}
	
	if(gatesArePresent && currentScore == totalFlags)
	{
	PlayerPrefs.SetInt(""+Application.loadedLevelName + "Acheivement02", 2);
	achieved = true;
	gui.LevelStart.text += "- Completed all Gates -\n";
	}
	
	if(stuntsArePresent && stuntScore == totalStunts)
	{
	PlayerPrefs.SetInt(""+Application.loadedLevelName + "Acheivement03", 2);
	achieved = true;
	gui.LevelStart.text += "- Completed all Stunts -\n";
	}
	
	if(riverTime < PlayerPrefs.GetFloat("" + Application.loadedLevelName + "BestTime") && (PlayerPrefs.GetFloat("" + Application.loadedLevelName + "BestTime")!=null))
	{
	PlayerPrefs.SetFloat("" + Application.loadedLevelName + "BestTime", riverTime);   /// save best time and send to leaderboards
	gui.LevelStart.text += "- You Beat Your Best Time -\n";
		if(PlayerPrefs.GetInt(""+Application.loadedLevelName + "Acheivement04") != 2)
		{
			PlayerPrefs.SetInt(""+Application.loadedLevelName + "Acheivement04", 2);         /// you beat your best time
			achieved = true;
			
		}
	
	}
	
	if((stuntsArePresent && stuntScore == totalStunts) && (gatesArePresent && currentScore == totalFlags))
	{
	PlayerPrefs.SetInt(""+Application.loadedLevelName + "Acheivement05", 2);
	achieved = true;
	gui.LevelStart.text += "- Completed all Gates & Stunts -\n";
	}
	
	if(itemsArePresent && itemsGathered == totalItems)
	{
	
	}
	

	
	
	

return achieved;



}

function RiverCompleted()
{
	
	gui.LevelStart.text = "Done already? You must be a pro!";
	
	
	
	gui.LevelStart.alphaFromTo(1f,0,1,Easing.Linear.easeOut);
	gui.LevelStart.scaleFromTo( 1f, new Vector3( 0, 0, 0 ), new Vector3( 1f, 1f, 1 ), Easing.Bounce.easeOut );
	yield WaitForSeconds(3);

	gui.LevelStart.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
	yield WaitForSeconds(1f);
	gui.Fader.alphaTo(1.0f,1,Easing.Linear.easeInOut);
	yield WaitForSeconds(1f);
	gui.Loading.hidden=false;
	gui.Loading.playSpriteAnimation( "anim", 5 );
	//unhide loading symbol
	if(!MultiPlayerMode)
	{
	PlayerPrefs.SetInt("LoadOnScreen",1);
	PlayerPrefs.Save();
	}
	var Asynch = Application.LoadLevelAsync("MenuScene");
	yield Asynch;
}

function LevelSuccessfull()
{
	
	if(gui.AcheivementCompletedAudio!=null && gui.audio)
	{
	gui.audio.clip=gui.AcheivementCompletedAudio;
	gui.audio.Play();
	}
	
	gui.AcheivementCompleteIcon.alphaFromTo(1f,0,1,Easing.Linear.easeOut);
	gui.AcheivementCompleteIcon.hidden=false;
	gui.AcheivementCompleteIcon.scaleFromTo( 1f, new Vector3( 0, 0, 0 ), new Vector3( 1f, 1f, 1 ), Easing.Bounce.easeOut );
	yield WaitForSeconds(3);
	gui.AcheivementCompleteIcon.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
	yield WaitForSeconds(1);
	
		gui.AcheivementCompleteIcon.hidden=true;
		
	
	
	gui.LevelStart.alphaFromTo(1f,0,1,Easing.Linear.easeOut);
	gui.LevelStart.scaleFromTo( 1f, new Vector3( 0, 0, 0 ), new Vector3( 1f, 1f, 1 ), Easing.Bounce.easeOut );
	yield WaitForSeconds(4);

	gui.LevelStart.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
	yield WaitForSeconds(1f);
		
	gui.Fader.alphaTo(1.0f,1,Easing.Linear.easeInOut);
	yield WaitForSeconds(1f);
	gui.Loading.hidden=false;
	gui.Loading.playSpriteAnimation( "anim", 5 );
	//unhide loading symbol
	
	
	if(!MultiPlayerMode)
	{
	PlayerPrefs.SetInt("LoadOnScreen",3);
	PlayerPrefs.Save();
	}
	var Asynch = Application.LoadLevelAsync("MenuScene");
	yield Asynch;
}

function LevelUnsuccessfull()
{
	
	
	
	
	gui.LevelStart.text = "You didn't unlock any new Acheivements, better luck next time.";
	gui.LevelStart.alphaFromTo(1f,0,1,Easing.Linear.easeOut);
	gui.LevelStart.scaleFromTo( 1f, new Vector3( 0, 0, 0 ), new Vector3( 1f, 1f, 1 ), Easing.Bounce.easeOut );
	yield WaitForSeconds(3);

	gui.LevelStart.alphaFromTo(1f,1,0,Easing.Linear.easeOut);
	yield WaitForSeconds(1f);
	gui.Fader.alphaTo(1.0f,1,Easing.Linear.easeInOut);
	yield WaitForSeconds(1f);
	gui.Loading.hidden=false;
	gui.Loading.playSpriteAnimation( "anim", 5 );
	//unhide loading symbol
	if(!MultiPlayerMode)
	{
	PlayerPrefs.SetInt("LoadOnScreen",3);
	PlayerPrefs.Save();
	}
	var Asynch = Application.LoadLevelAsync("MenuScene");
	yield Asynch;
}

function RandomRain()
{
	if(Rain !=null && Random.value > 0.5)
	{
		
		var CameraMain:GameObject = GameObject.FindGameObjectWithTag("MainCamera");
		spawnedRain=true;
		Debug.Log("raining");
				var rain = Instantiate(Rain,CameraMain.transform.position,Quaternion.identity);
				rain.transform.parent = CameraMain.transform;
				rain.transform.position = Vector3.zero;
				rain.transform.tag = "Rain";
				
				
			
		
		
	}
}

function CoinGrab(goldCoin:boolean)
{

//first river 5 pack = 5,000 (50 coins * 200 stunts)
//2nd river 5 pack   = 15,000 (50 coins * 600 stunts)
//last river 5 pack  = 30,000 (50 coins * 1200 stunts)

//Night mode pack  = 15,000 (50 coins * 1200 stunts)

	if(goldCoin)
	{
		//we add to the gold coin pile
		gCoins+=10;
		
		
				if(gCoins > 15000 && gCoins<=30000)
				{
					
					gCoinsPer = gCoins / 30000;
				}
				else if(gCoins > 5000)
				{
					gCoinsPer = gCoins / 15000;
				}
				else //it's under 10k
				{
					gCoinsPer = gCoins / 5000;
					
				}
				
				gui.GoldCBar.hidden=false;
				gui.CoinMeterBG.hidden=false;
				
				gui.GoldCBar.value = gCoinsPer;
				
				PlayerPrefs.SetInt("GoldCoinCount",gCoins);
				
				gui.HideGold();
	}
	else
	{
		//we add to the moon coin pile
		mCoins+=10;
			if(mCoins<=5000)
				{
					
					mCoinsPer = mCoins / 5000;
				}
				
				gui.MoonCBar.hidden=false;
				gui.MoonMeterBG.hidden=false;
				
				gui.MoonCBar.value = mCoinsPer;
				
				PlayerPrefs.SetInt("MoonCoinCount",mCoins);
				Debug.Log(mCoinsPer);
				gui.HideMoon();
	}
	
	if(null != CoinAudio)
	{
		audio.clip = CoinAudio;
		audio.Play();
	}
	

	
}
