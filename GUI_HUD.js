#pragma strict

var guiScaleFactor = 1.0;
var textScaleFactor = 1.0;

var Loading:UISprite;

var FlagsSprite:UISprite;
var StuntSprite:UISprite;

var FlagsSpriteP2:UISprite;
var StuntSpriteP2:UISprite;

var PauseBtn:UIButton;

var ControlsScheme:UISprite;

var SoundBtn:UIToggleButton;


var ContinueGame:UIButton;
var LeaveRiverBtn:UIButton;
var Controls:UIButton;
var RetryBtn:UIButton;

var ContinueGameSelected:UIButton;
var LeaveRiverBtnSelected:UIButton;
var ControlsSelected:UIButton;
var RetryBtnSelected:UIButton;

var HealthBar:UIProgressBar;
var HealthBarSprite:UISprite;

var checkingControls=false;


 //---HELPERS---------------------
 
 var SafeZone:UISprite;
 
 //------------------------------
 
 
var GoldCBar:UIProgressBar;
var CoinMeterBG:UISprite;


var MoonCBar:UIProgressBar;
var MoonMeterBG:UISprite;


var AcheivementCompleteIcon:UISprite;
var AcheivementCompletedAudio:AudioClip;

var  LToggle:UIJoystick;
var  RToggle:UIJoystick;

var LToggleGuide:UISprite;
var RToggleGuide:UISprite;

var Fader:UISprite;

var stick=false;

var tutorial=false;

var playerName:OuyaSDK.OuyaPlayer;
//--------------------------------CONTROLLER PICKER----------------------


var Controller1Btn:UISprite;
var Controller1BtnSelected:UISprite;

var Controller2Btn:UISprite;
var Controller2BtnSelected:UISprite;

var Controller3Btn:UISprite;
var Controller3BtnSelected:UISprite;

var Controller4Btn:UISprite;
var Controller4BtnSelected:UISprite;

var pressOBtn:UISprite;
var pressUBtn:UISprite;
var pressYBtn:UISprite;
var pressABtn:UISprite;

//-----------------------------------------------------------------------
//------------------------------------------STUNT GRAPHICS----------------------------

var HailMaryComplete:UISprite;
var HMaryAudio:AudioClip;

var HailMaryReversedComplete:UISprite;
var HMaryRAudio:AudioClip;

var EskimoRollComplete:UISprite;
var ERollAudio:AudioClip;

var BowStallComplete:UISprite;
var BStallAudio:AudioClip;

var SternStallComplete:UISprite;
var SStallAudio:AudioClip;

var LoopComplete:UISprite;
var LoopAudio:AudioClip;


var wrightYourself:UISprite;
var EskimoTut:UISprite;
var HailMaryTut:UISprite;
var HailMaryRTut:UISprite;
var LoopTut:UISprite;
var BowStallTut:UISprite;
var SternStallTut:UISprite;

//----------------------------------------------------------------------

var Stunts:UITextInstance;
var Flags:UITextInstance;

var StuntsP2:UITextInstance;
var FlagsP2:UITextInstance;

var Timer:UITextInstance;
var TimerStopped:UITextInstance;
var CountDownTimer:UITextInstance;

var HighScore:UITextInstance;

var LevelStart:UITextInstance;

var text:UIText;
var textWrapped:UIText;

public var buttonSound:AudioClip;

public var buttonUI:UIToolkit;
public var textToolkit:UIToolkit;
public var riverUI:UIToolkit;
public var HelpUI:UIToolkit;

private var loader:loadingScript;
loader = FindObjectOfType(loadingScript);



@HideInInspector var startScript:StartScript;
startScript = FindObjectOfType(StartScript);

function Start () {

	var multiplayerPVP=false;
	if(PlayerPrefs.GetInt("MultiMode") == 2)
	{
	// this is PVP mode
	multiplayerPVP = true;
	Debug.Log("pvp? " + multiplayerPVP);
	}
	

	text = UIText( textToolkit, "ImpactFont", "ImpactFont_0.png");
	
	textWrapped = UIText( textToolkit, "ImpactFont", "ImpactFont_0.png");
	
	textWrapped.wrapMode = UITextLineWrapMode.MinimumLength;
	textWrapped.lineWrapWidth = Screen.width*0.8f;
	
	SafeZone  = HelpUI.addSprite( "SafeZone.png", 0, 0, 0 );
	SafeZone.positionFromCenter(0.0f,0.0f);
	SafeZone.hidden=true;
	
	Flags = text.addTextInstance( startScript.currentScore.ToString() + "/" + startScript.totalFlags.ToString(),0,0,textScaleFactor, 2, Color(1,1,1,1), UITextAlignMode.Left, UITextVerticalAlignMode.Middle );	
	
	Flags.hidden=true;
	
	FlagsP2 = text.addTextInstance( startScript.currentScoreP2.ToString() + "/" + startScript.totalFlags.ToString(),0,0,textScaleFactor, 2, Color(1,1,1,1), UITextAlignMode.Left, UITextVerticalAlignMode.Middle );	
	
	FlagsP2.hidden=true;
	
	Stunts = text.addTextInstance( startScript.stuntScore.ToString() + "/" + startScript.totalStunts.ToString(),0,0,textScaleFactor, 2, Color(1,1,1,1), UITextAlignMode.Right, UITextVerticalAlignMode.Middle );	
	StuntsP2 = text.addTextInstance( startScript.stuntScoreP2.ToString() + "/" + startScript.totalStunts.ToString(),0,0,textScaleFactor, 2, Color(1,1,1,1), UITextAlignMode.Right, UITextVerticalAlignMode.Middle );	
	
	HighScore= text.addTextInstance( startScript.HighScore.ToString()+ " PTS" ,0,0,textScaleFactor*0.5, 2, Color.green, UITextAlignMode.Right, UITextVerticalAlignMode.Middle );	
	HighScore.positionFromBottomLeft(0.05f,0.14f);
	
	if(!loader.isMobile)
	{
		if(multiplayerPVP)
		{
		Stunts.positionFromTopLeft(0.2f,0.14f);
		Flags.positionFromTopLeft(0.05f,0.14f);
		StuntsP2.positionFromTopRight(0.2f,0.14f);
		FlagsP2.positionFromTopRight(0.05f,0.14f);
		}
		else
		{
		Stunts.positionFromTopLeft(0.05f,0.14f);
		Flags.positionFromTopRight(0.05f,0.14f);
		}
	}
	else
	{
		Stunts.positionFromTopRight(0.2f,0.14f);
		Flags.positionFromTopRight(0.05f,0.14f);
	}
	
	Stunts.hidden=true;
	
	LevelStart = textWrapped.addTextInstance( " ",0,0,textScaleFactor*0.75, 2, Color(1,1,1,0), UITextAlignMode.Center, UITextVerticalAlignMode.Middle );	
	LevelStart.positionFromCenter(0,0);
	
	Timer = text.addTextInstance( " " ,0,0,textScaleFactor, 2, Color(1,1,1,1), UITextAlignMode.Left, UITextVerticalAlignMode.Middle );	
	Timer.positionFromCenter(-0.4f,0.0f);
	
	CountDownTimer = text.addTextInstance( " " ,0,0,textScaleFactor*0.55, 2, Color(1,1,1,1), UITextAlignMode.Left, UITextVerticalAlignMode.Middle );	
	CountDownTimer.positionFromBottomLeft(0.1f,0.1f);
	
	
	
	TimerStopped = text.addTextInstance( " " ,0,0,textScaleFactor, 2, Color.red, UITextAlignMode.Left, UITextVerticalAlignMode.Middle );	
	TimerStopped.positionFromCenter(-0.4f,0.0f);
	TimerStopped.hidden=true;
	
//-----------------------------JOYSTICKS--------------------------------------


	LToggle = UIJoystick.create(buttonUI,"LToggle.png", new Rect( Screen.width*0.01f, Screen.height*0.45f, Screen.width*0.4f, Screen.height*0.6f ), Screen.width *0.175f, Screen.height*-0.3f );
	LToggle.deadZone = new Vector2( 0.8f, 0.8f );
	LToggle.setJoystickHighlightedFilename( "LToggleT.png" );
	
	
	RToggle = UIJoystick.create(buttonUI,"RToggle.png", new Rect( Screen.width*0.66f, Screen.height*0.45f, Screen.width*0.4f, Screen.height*0.6f ), Screen.width *0.175f, Screen.height*-0.3f );
	RToggle.deadZone = new Vector2( 0.8f, 0.8f );
	RToggle.setJoystickHighlightedFilename( "RToggleT.png" );

	if(!loader.isMobile || InputManager.Moga || loader.ControllerCount>0)
	{
	LToggle.hidden=true;
	RToggle.hidden=true;
	}
	
	LToggleGuide= buttonUI.addSprite( "ToggleGuide.png", 0, 0, 11 );
	LToggleGuide.positionFromBottomLeft(-0.052f,0.017f);
	LToggleGuide.hidden=true;
	
	
	RToggleGuide= buttonUI.addSprite( "ToggleGuide.png", 0, 0, 11 );
	RToggleGuide.positionFromBottomRight(-0.052f,-0.007f);
	RToggleGuide.hidden=true;


//------------------------------SPRITES--------------------------------------


	FlagsSprite = buttonUI.addSprite( "FlagsSprite.png", 0, 0, 10 );
	FlagsSpriteP2 = buttonUI.addSprite( "FlagsSprite.png", 0, 0, 10 );
	FlagsSpriteP2.hidden=true;
	FlagsSprite.hidden=true;
	
	StuntSprite = buttonUI.addSprite( "StuntSprite.png", 0, 0, 10 );
	StuntSpriteP2 = buttonUI.addSprite( "StuntSprite.png", 0, 0, 10 );
	if(!loader.isMobile)
	{
		 if(multiplayerPVP)
		{
		StuntSprite.positionFromTopLeft(0.185f,0.045f);
		FlagsSprite.positionFromTopLeft(0.035f,0.045f);
		StuntSpriteP2.positionFromTopRight(0.185f,0.045f);
		FlagsSpriteP2.positionFromTopRight(0.035f,0.045f);
		
		}
		else
		{
		StuntSprite.positionFromTopLeft(0.035f,0.045f);
		FlagsSprite.positionFromTopRight(0.035f,0.045f);
		}
	
	}

	else
	{
	StuntSprite.positionFromTopRight(0.185f,0.045f);
	FlagsSprite.positionFromTopRight(0.035f,0.045f);
	}
	StuntSprite.hidden=true;
	StuntSpriteP2.hidden=true;
	
	
	PauseBtn = UIButton.create(buttonUI,"PauseBtn.png","PauseBtn.png",0,0,10);
	PauseBtn.positionFromTopLeft(0.035f,0.045f);
	PauseBtn.onTouchUpInside += onTouchPauseBtn;
	PauseBtn.touchDownSound = buttonSound;
	if(!loader.isMobile)
	{
	PauseBtn.hidden=true;
	}
	
	
	HailMaryComplete = riverUI.addSprite( "HailMaryComplete.png", 0, 0, 2 );
	HailMaryComplete.positionCenter();
	HailMaryComplete.hidden=true;
	
	HailMaryReversedComplete = riverUI.addSprite( "ReversedHailMaryComplete.png", 0, 0, 2 );
	HailMaryReversedComplete.positionCenter();
	HailMaryReversedComplete.hidden=true;
	
	EskimoRollComplete = riverUI.addSprite( "EskimoRollComplete.png", 0, 0, 2 );
	EskimoRollComplete.positionCenter();
	EskimoRollComplete.hidden=true;
	
	BowStallComplete = riverUI.addSprite( "BowStallComplete.png", 0, 0, 2 );
	BowStallComplete.positionCenter();
	BowStallComplete.hidden=true;
	
	SternStallComplete = riverUI.addSprite( "SternStallComplete.png", 0, 0, 2 );
	SternStallComplete.positionCenter();
	SternStallComplete.hidden=true;

	LoopComplete = riverUI.addSprite( "ForwardLoopComplete.png", 0, 0, 2 );
	LoopComplete.positionCenter();
	LoopComplete.hidden=true;

	AcheivementCompleteIcon = riverUI.addSprite( "AcheivementCompleted.png", 0, 0, 2 );
	AcheivementCompleteIcon.positionCenter();
	AcheivementCompleteIcon.hidden=true;

	wrightYourself  = HelpUI.addSprite( "WrightYourself.png", 0, 0, 2 );
	wrightYourself.centerize();
	wrightYourself.positionFromCenter(0.25,0.0 );
	wrightYourself.hidden=true;
	
	EskimoTut  = HelpUI.addSprite( "EskimoTut.png", 0, 0, 2 );
	EskimoTut.centerize();
	EskimoTut.positionFromCenter(0.25,0.0 );
	EskimoTut.hidden=true;
	
	HailMaryTut = HelpUI.addSprite( "HailMaryTut.png", 0, 0, 2 );
	HailMaryTut.centerize();
	HailMaryTut.positionFromCenter(0.25,0.0 );
	HailMaryTut.hidden=true;
	
	HailMaryRTut  = HelpUI.addSprite( "HailMaryRTut.png", 0, 0, 2 );
	HailMaryRTut.centerize();
	HailMaryRTut.positionFromCenter(0.25,0.0 );
	HailMaryRTut.hidden=true;
	
	LoopTut  = HelpUI.addSprite( "LoopTut.png", 0, 0, 2 );
	LoopTut.centerize();
	LoopTut.positionFromCenter(0.25,0.0 );
	LoopTut.hidden=true;
	
	BowStallTut = HelpUI.addSprite( "BowStallTut.png", 0, 0, 2 );
	BowStallTut.centerize();
	BowStallTut.positionFromCenter(0.25,0.0 );
	BowStallTut.hidden=true;
	
	SternStallTut = HelpUI.addSprite( "SternStallTut.png", 0, 0, 2 );
	SternStallTut.centerize();
	SternStallTut.positionFromCenter(0.25,0.0 );
	SternStallTut.hidden=true;

//--------------------------------END-------------------------------------



//-------------------BUTTON CODE--------------------------------------------
	
	SoundBtn = UIToggleButton.create(buttonUI,"SoundBtn.png","SoundBtnSelected.png","SoundBtnSelected.png",0,0,5);// replay button on end lvl screen
	SoundBtn.centerize();
	//SoundBtn.setSize( soundToggleBtn.width*guiScaleFactor, soundToggleBtn.height*guiScaleFactor);
	SoundBtn.positionFromBottomRight(0.25f,0.03f);
	SoundBtn.onToggle += onTouchSoundToggle;
	if(loader.audioOn)
	{
	SoundBtn.selected = true;
	AudioListener.volume = 1;
	}
	else
	{
	SoundBtn.selected = false;
	AudioListener.volume = 0;
	}
	

	SoundBtn.hidden=true;
	
	
//-----------------------CONTROLLER SELECT------------------------------
	
	Controller1Btn = buttonUI.addSprite( "ControllerInactive.png", 0, 0, 10 );
	Controller1Btn.positionFromCenter(0.0f,-0.35f);
	Controller1Btn.hidden=true;
	
	Controller1BtnSelected= buttonUI.addSprite( "ControllerActive.png", 0, 0, 10 );
	Controller1BtnSelected.positionFromCenter(0.0f,-0.35f);
	Controller1BtnSelected.hidden=true;
	
	Controller2Btn = buttonUI.addSprite( "ControllerInactive.png", 0, 0, 10 );
	Controller2Btn.positionFromCenter(0.0f,-0.1f);
	Controller2Btn.hidden=true;
	
	Controller2BtnSelected= buttonUI.addSprite( "ControllerActive.png", 0, 0, 10 );
	Controller2BtnSelected.positionFromCenter(0.0f,-0.1f);
	Controller2BtnSelected.hidden=true;
	
	Controller3Btn = buttonUI.addSprite( "ControllerInactive.png", 0, 0, 10 );
	Controller3Btn.positionFromCenter(0.0f,0.1f);
	Controller3Btn.hidden=true;
	
	Controller3BtnSelected= buttonUI.addSprite( "ControllerActive.png", 0, 0, 10 );
	Controller3BtnSelected.positionFromCenter(0.0f,0.1f);
	Controller3BtnSelected.hidden=true;
	
	Controller4Btn = buttonUI.addSprite( "ControllerInactive.png", 0, 0, 10 );
	Controller4Btn.positionFromCenter(0.0f,0.35f);
	Controller4Btn.hidden=true;
	
	Controller4BtnSelected= buttonUI.addSprite( "ControllerActive.png", 0, 0, 10 );
	Controller4BtnSelected.positionFromCenter(0.0f,0.35f);
	Controller4BtnSelected.hidden=true;
	
	pressOBtn = buttonUI.addSprite( "PressO.png", 0, 0, 10 );
	pressOBtn.positionFromCenter(0.1f,-0.35f);
	pressOBtn.hidden=true;
	
	pressUBtn = buttonUI.addSprite( "PressU.png", 0, 0, 10 );
	pressUBtn.positionFromCenter(0.1f,-0.1f);
	pressUBtn.hidden=true;
	
	pressYBtn = buttonUI.addSprite( "PressY.png", 0, 0, 10 );
	pressYBtn.positionFromCenter(0.1f,0.1f);
	pressYBtn.hidden=true;
	
	pressABtn = buttonUI.addSprite( "PressA.png", 0, 0, 10 );
	pressABtn.positionFromCenter(0.1f,0.35f);
	pressABtn.hidden=true;
	
	//-----------------------------------------------------------------

	

	if(InputManager.Moga)
	{
		if(loader.MogaPro)
		{
			ControlsScheme  = HelpUI.addSprite( "MogaPControls.png", 0, 0, 10 );
			ControlsScheme.positionFromCenter(0.0f,0.0f);
			ControlsScheme.hidden=true;
		}
		else
		{
			ControlsScheme  = HelpUI.addSprite( "MogaControls.png", 0, 0, 10 );
			ControlsScheme.positionFromCenter(0.0f,0.0f);
			ControlsScheme.hidden=true;
		}
	}
	else
	{
	ControlsScheme  = HelpUI.addSprite( "OUYAControls.png", 0, 0, 10 );
	ControlsScheme.positionFromCenter(0.0f,0.0f);
	ControlsScheme.hidden=true;
	}

	

//----------------------END----------------------------------


	HealthBarSprite = buttonUI.addSprite( "HealthBarSprite.png", 0, 0, 10 );
	HealthBarSprite.positionFromCenter(0.41f,0.0f);
	
	
	HealthBar = UIProgressBar.create( buttonUI, "HealthBar.png", 0, 0, false, 5 ,false);
	HealthBar.position.x = HealthBarSprite.position.x + 39;
	HealthBar.position.y = HealthBarSprite.position.y - 27;
	HealthBar.value=1;
	
	
	CoinMeterBG = buttonUI.addSprite( "CoinMeterBG.png", 0, 0, 10 );
	CoinMeterBG.positionFromBottomLeft(0.2f,0.01f);
	CoinMeterBG.hidden=true;
	
	GoldCBar = UIProgressBar.create( buttonUI, "GoldCBar.png", 0, 0, false, 5 ,true);
	GoldCBar.position.x = CoinMeterBG.position.x + 13;
	GoldCBar.position.y = CoinMeterBG.position.y - 344;
	GoldCBar.value=0;
	GoldCBar.hidden=true;

	MoonMeterBG = buttonUI.addSprite( "MoonMeterBG.png", 0, 0, 10 );
	MoonMeterBG.positionFromBottomLeft(0.2f,0.07f);
	MoonMeterBG.hidden=true;
	
	MoonCBar = UIProgressBar.create( buttonUI, "MoonCBar.png", 0, 0, false, 5 ,true);
	MoonCBar.position.x = MoonMeterBG.position.x + 13;
	MoonCBar.position.y = MoonMeterBG.position.y - 344;
	MoonCBar.value=0;
	MoonCBar.hidden=true;

	ContinueGame  = UIButton.create(buttonUI,"ContinueGame.png","ContinueGame.png",0,0,10);
	ContinueGame.positionFromCenter(-0.2f,0.05f);
	ContinueGame.hidden=true;
	ContinueGame.onTouchUpInside += onTouchContinueGame;
	ContinueGame.touchDownSound = buttonSound;
	
	RetryBtn  = UIButton.create(buttonUI,"RetryRiverBtn.png","RetryRiverBtn.png",0,0,10);
	RetryBtn.positionFromCenter(-0.05f,-0.05f);
	RetryBtn.hidden=true;
	RetryBtn.onTouchUpInside += onTouchRetryBtn;
	RetryBtn.touchDownSound = buttonSound;
	
	Controls  = UIButton.create(buttonUI,"GameControls.png","GameControls.png",0,0,10);
	
	Controls.positionFromCenter(0.1f,0.05f);
	Controls.hidden=true;
	Controls.touchDownSound = buttonSound;
	
	LeaveRiverBtn  = UIButton.create(buttonUI,"LeaveRiverBtn.png","LeaveRiverBtn.png",0,0,10);
	LeaveRiverBtn.positionFromCenter(0.25f,-0.05f);
	LeaveRiverBtn.hidden=true;
	LeaveRiverBtn.onTouchUpInside += onTouchLeaveRiverBtn;
	LeaveRiverBtn.touchDownSound = buttonSound;
	
	
	ContinueGameSelected  = UIButton.create(buttonUI,"ContinueGameSelected.png","ContinueGameSelected.png",0,0,10);
	ContinueGameSelected.positionFromCenter(-0.2f,0.05f);
	ContinueGameSelected.hidden=true;
	ContinueGameSelected.onTouchUpInside += onTouchContinueGame;
	ContinueGameSelected.touchDownSound = buttonSound;	
	
	RetryBtnSelected = UIButton.create(buttonUI,"RetryRiverBtnSelected.png","RetryRiverBtnSelected.png",0,0,10);
	RetryBtnSelected.positionFromCenter(-0.05f,-0.05f);
	RetryBtnSelected.hidden=true;
	RetryBtnSelected.onTouchUpInside += onTouchRetryBtn;
	RetryBtnSelected.touchDownSound = buttonSound;
	
	ControlsSelected  = UIButton.create(buttonUI,"GameControlsSelected.png","GameControlsSelected.png",0,0,10);
	ControlsSelected.positionFromCenter(0.1f,0.05f);
	ControlsSelected.hidden=true;
	ControlsSelected.touchDownSound = buttonSound;	
	
	LeaveRiverBtnSelected  = UIButton.create(buttonUI,"LeaveRiverBtnSelected.png","LeaveRiverBtnSelected.png",0,0,10);
	LeaveRiverBtnSelected.positionFromCenter(0.25f,-0.05f);
	LeaveRiverBtnSelected.hidden=true;
	LeaveRiverBtnSelected.onTouchUpInside += onTouchLeaveRiverBtn;
	LeaveRiverBtnSelected.touchDownSound = buttonSound;
	
	

	
		
	
	
	Fader = buttonUI.addSprite( "Fader.png", 0, 0, 1 );
	Fader.pixelsFromTopLeft(-30,-30);
	Fader.setSize(Screen.width *1.2,Screen.height *1.2);
	//Fader.hidden=true;
	yield WaitForSeconds(1.0);
	Fader.alphaTo(1.0f,0,Easing.Linear.easeInOut);
	
	
	Loading = buttonUI.addSprite( "Loading.png", 0, 0, 0 );
	var anim = Loading.addSpriteAnimation( "anim", 0.15f, "Loading.png", "Loading01.png", "Loading01.png", "Loading02.png", "Loading02.png", "Loading03.png", "Loading03.png", "Loading.png", "Loading.png");
	Loading.positionFromCenter(0.0f,0.0f);
	Loading.hidden=true;
	}
	
function PauseMenu()
{
	stickInTheWay();
	if(!startScript.gamePaused)
	{
			if(!loader.isMobile)
			{
			startScript.gamePaused=true;
			ContinueGameSelected.hidden = false;
			ContinueGame.hidden=true;
			RetryBtn.hidden=false;
			RetryBtnSelected.hidden=true;
			ControlsSelected.hidden=true;
			Controls.hidden=false;
			LeaveRiverBtnSelected.hidden=true;
			LeaveRiverBtn.hidden=false;
		
			}
			else
			{
			onTouchPauseBtn();
				//Debug.Log("here");
			}
	}
	else
	{
		if(!loader.isMobile)
			{
		
			startScript.gamePaused = false;

			ContinueGameSelected.hidden = true;
			ContinueGame.hidden=true;
			RetryBtn.hidden=true;
			RetryBtnSelected.hidden=true;
			ControlsSelected.hidden=true;
			Controls.hidden=true;
			LeaveRiverBtnSelected.hidden=true;
			LeaveRiverBtn.hidden=true;
			}
			else
			{
			onTouchContinueGame();
			}
	}
	

}

function CheckControls()
{
	if(!checkingControls)
	{
	checkingControls=true;
	ShowControllerSelect(startScript.numOfPlayers);
	}
}
	

function ShowControllerSelect(num:int)
	{
	Debug.Log("controller number has changed");
	
	
 	 Controller1Btn.hidden=false;
 	 Controller1BtnSelected.hidden=true;
 	  pressOBtn.hidden=false;
 	 
	if(num > 1)
	 {
	 Controller2Btn.hidden=false;
	 Controller2BtnSelected.hidden=true;
	 
	  pressUBtn.hidden=false;
	 }
	 
	if(num > 2)
	 {
	 	 Controller3Btn.hidden=false;
	 	Controller3BtnSelected.hidden=true;
	 	 pressYBtn.hidden=false;
	 }
	  if(num > 3)
	 {
	 	 Controller4Btn.hidden=false;
	 	Controller4BtnSelected.hidden=true;
	 	pressABtn.hidden=false;
	 }
		
	}			
	
function onTouchPauseBtn()
{
			startScript.gamePaused = true;
			stickInTheWay();
			LToggle.hidden=true;
			RToggle.hidden=true;
			PauseBtn.hidden=true;
			ContinueGameSelected.hidden = false;
			ContinueGame.hidden=true;
			RetryBtn.hidden=false;
			RetryBtnSelected.hidden=true;
			ControlsSelected.hidden=true;
			Controls.hidden=false;
			SoundBtn.hidden=false;
			LeaveRiverBtnSelected.hidden=true;
			LeaveRiverBtn.hidden=false;
}	

function onTouchContinueGame()
{
			startScript.gamePaused = false;
			stickInTheWay();
				if(!InputManager.Moga && loader.ControllerCount<1)
				{
					LToggle.hidden=false;
					RToggle.hidden=false;
				}
			PauseBtn.hidden=false;
			ContinueGameSelected.hidden = true;
			ContinueGame.hidden=true;
			RetryBtn.hidden=true;
			RetryBtnSelected.hidden=true;
			ControlsSelected.hidden=true;
			Controls.hidden=true;
			SoundBtn.hidden=true;
			LeaveRiverBtnSelected.hidden=true;
			LeaveRiverBtn.hidden=true;
}

function onTouchRetryBtn()
{
	stickInTheWay();
	startScript.gamePaused = true;
	Application.LoadLevel(Application.loadedLevelName);
}

function onTouchSoundToggle()
{
//-----------------------Sound BTN------------------------------


if(PlayerPrefs.GetInt("audioOn") <2)
{
PlayerPrefs.SetInt("audioOn",2);
loader.audioOn = true;
AudioListener.volume = 1;
}
else
{
PlayerPrefs.SetInt("audioOn",1);
loader.audioOn = false;
AudioListener.volume = 0;
}

}

function onTouchLeaveRiverBtn()
{
	Application.LoadLevel("MenuScene");
}																												
	
function FixedUpdate()
{


playerName = loader.Players[0];


if(startScript.gamePaused)
{
		if(!ContinueGameSelected.hidden && ControlsSelected.hidden && !stick)// start game is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			
			ContinueGameSelected.hidden = true;
			ContinueGame.hidden=false;
			RetryBtnSelected.hidden=false;
			RetryBtn.hidden=true;
			stickInTheWay();
			}
			else if(InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick)
			{
			stickInTheWay();
			ContinueGameSelected.hidden=true;
			ContinueGame.hidden=false;
			LeaveRiverBtnSelected.hidden=false;
			LeaveRiverBtn.hidden=true;
			}
			else if(InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//unpause game
			
			stickInTheWay();
			PauseMenu();
			
			}
		
		}
		else if(!RetryBtnSelected.hidden && ControlsSelected.hidden && !stick)// start game is selected
		{
			
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			RetryBtnSelected.hidden=true;
			RetryBtn.hidden=false;
			ControlsSelected.hidden=false;
			Controls.hidden=true;
			stickInTheWay();
			
			}
			else if(InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick)
			{
			stickInTheWay();
			ContinueGameSelected.hidden=false;
			ContinueGame.hidden=true;
			RetryBtnSelected.hidden=true;
			RetryBtn.hidden=false;
			
			}
			else if(InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			Application.LoadLevel(Application.loadedLevelName);
			}
		
		}
		else if(!ControlsSelected.hidden && ContinueGameSelected.hidden && LeaveRiverBtnSelected.hidden && !stick)// start game is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			
			ControlsSelected.hidden=true;
			Controls.hidden=false;
			LeaveRiverBtnSelected.hidden=false;
			LeaveRiverBtn.hidden=true;
			stickInTheWay();
			}
			else if(InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick)
			{
			
			RetryBtnSelected.hidden=false;
			RetryBtn.hidden=true;
			ControlsSelected.hidden=true;
			Controls.hidden=false;
			stickInTheWay();
			}
			else if(InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			
			ContinueGameSelected.hidden = true;
			ContinueGame.hidden=true;
			ControlsSelected.hidden=true;
			RetryBtn.hidden=true;
			RetryBtnSelected.hidden=true;
			SoundBtn.hidden=true;
			Controls.hidden=true;
			LeaveRiverBtnSelected.hidden=true;
			LeaveRiverBtn.hidden=true;
			//check what controls are set as #1 or #2 and then unhide accordingly.
			
			
				
					
					ControlsScheme.hidden = false;
					//hide it all
					
				
					
					ControlsSelected.hidden=true;
					Controls.hidden=true;
				
			
			stickInTheWay();
			
			}
		
		}
		
		else if(!LeaveRiverBtnSelected.hidden && ControlsSelected.hidden && !stick)// start game is selected
		{
			
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
				stickInTheWay();
			ContinueGameSelected.hidden=false;
			ContinueGame.hidden=true;
			LeaveRiverBtnSelected.hidden=true;
			LeaveRiverBtn.hidden=false;
			
			}
			else if(InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick)
			{
			stickInTheWay();
			ControlsSelected.hidden=false;
			Controls.hidden=true;
			LeaveRiverBtnSelected.hidden=true;
			LeaveRiverBtn.hidden=false;
			
			}
			else if(InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			Application.LoadLevel("MenuScene");
			}
		
		}
		else if(!ControlsScheme.hidden && InputManager.GetButton("Exit", playerName)&& !stick && ControlsSelected.hidden && Controls.hidden)
		{
			
			ControlsScheme.hidden=true;
			
			
			RetryBtn.hidden=false;
			RetryBtnSelected.hidden=true;
			if(loader.isMobile)
			{
			SoundBtn.hidden=false;
			}
			
			ContinueGameSelected.hidden = true;
			ContinueGame.hidden=false;
			ControlsSelected.hidden=false;
			Controls.hidden=true;
			LeaveRiverBtnSelected.hidden=true;
			LeaveRiverBtn.hidden=false;
		}
		
		else if(LeaveRiverBtnSelected.hidden && LeaveRiverBtn && !stick && Controller1Btn.hidden && !loader.isMobile && Controller2Btn.hidden && Controller3Btn.hidden && Controller4Btn.hidden && ControlsScheme.hidden )
		{
			stickInTheWay();
			
			Controller1BtnSelected.hidden = true;
			Controller2BtnSelected.hidden = true;
			Controller3BtnSelected.hidden = true;
			Controller4BtnSelected.hidden = true;
			
			startScript.gamePaused=false;
			checkingControls=false;
			loader.ControllerCount = loader.Controllers.Length;
		}
		else if(!Controller1Btn.hidden && !stick && ControlsScheme.hidden  || !Controller1BtnSelected.hidden && !stick && ControlsScheme.hidden  )
		{
		var playerControllers:String[] = Input.GetJoystickNames();
		
			
						  if(!Controller1Btn.hidden && !stick)
					{
						for(var o:int=0; o < playerControllers.Length; o++)
						{
							var controllerNum:OuyaSDK.OuyaPlayer = (o+1);
							
							if(InputManager.GetButton("Acceleration", controllerNum) && !stick)
							{
								Controller1Btn.hidden = true;
								Controller1BtnSelected.hidden = false;
								pressOBtn.hidden=true;
								Debug.Log("" + controllerNum);
								loader.Players[0] = controllerNum;
								stickInTheWay();
							}
								
						}
						
					}
					  if(!Controller2Btn.hidden && !stick)
					{
						for(var u:int=0; u < playerControllers.Length; u++)
						{
							var controllerNum2:OuyaSDK.OuyaPlayer = (u+1);
							
							if(InputManager.GetButton("Orbit", controllerNum2) && !stick)
							{
								Controller2Btn.hidden = true;
								Controller2BtnSelected.hidden = false;
								pressUBtn.hidden=true;
								Debug.Log("" + controllerNum2);
								loader.Players[1] = controllerNum2;
								stickInTheWay();
							}
								
						}
						
					}
					
					if(!Controller3Btn.hidden && !stick)
						{
							for(var y:int=0; y < playerControllers.Length; y++)
							{
								var controllerNum3:OuyaSDK.OuyaPlayer = (y+1);
								
								if(InputManager.GetButton("Option", controllerNum3) && !stick)
								{
									Controller3Btn.hidden = true;
									Controller3BtnSelected.hidden = false;
									pressYBtn.hidden=true;
									Debug.Log("" + controllerNum3);
									loader.Players[2] = controllerNum3;
									stickInTheWay();
								}
									
							}
							
						}
						
						if(!Controller4Btn.hidden && !stick)
						{
							for(var a:int=0; a< playerControllers.Length; a++)
							{
								var controllerNum4:OuyaSDK.OuyaPlayer = (a+1);
								
								if(InputManager.GetButton("Exit", controllerNum4) && !stick)
								{
									Controller4Btn.hidden = true;
									Controller4BtnSelected.hidden = false;
									pressABtn.hidden=true;
									Debug.Log("" + controllerNum4);
									loader.Players[3] = controllerNum4;
									stickInTheWay();
								}
									
							}
							
						}
			
		}
				
			
}
		//Option
else if(InputManager.GetButton("Option", playerName)&& !startScript.gamePaused && !stick && !loader.isMobile)
{


stickInTheWay();
		PauseMenu();

}
else if(InputManager.GetButton("StartBtn", playerName)&& !stick && !startScript.gamePaused)
		{
		 PauseMenu();
		}
		//
       
      
       
			
//-------------------------------------------			
	
if(LToggleGuide.hidden && !startScript.gamePaused)
{
	 if(LToggle.joystickPosition.x > 0.01 || LToggle.joystickPosition.x <- 0.01 || LToggle.joystickPosition.y > 0.01 || LToggle.joystickPosition.y <- 0.01)
	 {
		 LToggleGuide.hidden=false;
	 }
}
else if(!LToggleGuide.hidden && !startScript.gamePaused)
{
	if(LToggle.joystickPosition.x < 0.01 && LToggle.joystickPosition.x >- 0.01&& LToggle.joystickPosition.y < 0.01 && LToggle.joystickPosition.y >- 0.01)
	 {
		 LToggleGuide.hidden=true;
	 }
}	
	
if(RToggleGuide.hidden && !startScript.gamePaused)
{
	 if(RToggle.joystickPosition.x > 0.01 || RToggle.joystickPosition.x <- 0.01 || RToggle.joystickPosition.y > 0.01 || RToggle.joystickPosition.y <- 0.01)
	 {
		 RToggleGuide.hidden=false;
	 }
}
else if(!RToggleGuide.hidden && !startScript.gamePaused)
{
	if(RToggle.joystickPosition.x < 0.01 &&RToggle.joystickPosition.x >- 0.01 && RToggle.joystickPosition.y < 0.01 && RToggle.joystickPosition.y >- 0.01)
	 {
		 RToggleGuide.hidden=true;
	 }
}	
	
	
	
	
	}
	
	function stickInTheWay()
	{
	if(!stick)
	{
		stick=true;
		yield WaitForSeconds(0.5);
		stick=false;
	}
	
	}
	
	
function HailMary()
{
	yield WaitForSeconds(1.0);
	if(HMaryAudio!=null && audio)
	{
	audio.clip=HMaryAudio;
	audio.Play();
	}
	HailMaryComplete.alphaTo(0.01f,0,Easing.Linear.easeOut);
	HailMaryComplete.hidden=false;
	HailMaryComplete.alphaFromTo(0.5f,0,1,Easing.Linear.easeOut);
	HailMaryComplete.scaleFromTo( 1f, new Vector3( 0.75, 0.75, 0.75 ), new Vector3( 1f, 1f, 1f ), Easing.Bounce.easeOut );
	yield WaitForSeconds(3);
	HailMaryComplete.alphaTo(0.5f,0,Easing.Linear.easeOut);
	HailMaryComplete.hidden=true;
	
}	

function HailMaryReversed()
{
	yield WaitForSeconds(1.0);
	if(HMaryRAudio!=null && audio)
	{
	audio.clip=HMaryRAudio;
	audio.Play();
	}
	HailMaryReversedComplete.alphaTo(0.01f,0,Easing.Linear.easeOut);
	HailMaryReversedComplete.hidden=false;
	HailMaryReversedComplete.alphaFromTo(0.5f,0,1,Easing.Linear.easeOut);
	HailMaryReversedComplete.scaleFromTo( 1f, new Vector3( 0.75, 0.75, 0.75 ), new Vector3( 1f, 1f, 1f ), Easing.Bounce.easeOut );
	yield WaitForSeconds(3);
	HailMaryReversedComplete.alphaTo(0.5f,0,Easing.Linear.easeOut);
	HailMaryReversedComplete.hidden=true;
	
}	


function EskimoRoll()
{
	yield WaitForSeconds(1.0);
	if(ERollAudio!=null && audio)
	{
	audio.clip=ERollAudio;
	audio.Play();
	}
	EskimoRollComplete.alphaTo(0.01f,0,Easing.Linear.easeOut);
	EskimoRollComplete.hidden=false;
	EskimoRollComplete.alphaFromTo(0.5f,0,1,Easing.Linear.easeOut);
	EskimoRollComplete.scaleFromTo( 1f, new Vector3( 0.75, 0.75, 0.75 ), new Vector3( 1f, 1f, 1f ), Easing.Bounce.easeOut );
	yield WaitForSeconds(3);
	EskimoRollComplete.alphaTo(0.5f,0,Easing.Linear.easeOut);
	EskimoRollComplete.hidden=true;
	
}

function BowStall()
{
	yield WaitForSeconds(1.0);
	if(BStallAudio!=null && audio)
	{
	audio.clip=BStallAudio;
	audio.Play();
	}
	BowStallComplete.alphaTo(0.01f,0,Easing.Linear.easeOut);
	BowStallComplete.hidden=false;
	BowStallComplete.alphaFromTo(0.5f,0,1,Easing.Linear.easeOut);
	BowStallComplete.scaleFromTo( 1f, new Vector3( 0.75, 0.75, 0.75 ), new Vector3( 1f, 1f, 1f ), Easing.Bounce.easeOut );
	yield WaitForSeconds(3);
	BowStallComplete.alphaTo(0.5f,0,Easing.Linear.easeOut);
	BowStallComplete.hidden=true;
}

function SternStall()
{
	yield WaitForSeconds(1.0);
	if(SStallAudio!=null && audio)
	{
	audio.clip=SStallAudio;
	audio.Play();
	}
	SternStallComplete.alphaTo(0.01f,0,Easing.Linear.easeOut);
	SternStallComplete.hidden=false;
	SternStallComplete.alphaFromTo(0.5f,0,1,Easing.Linear.easeOut);
	SternStallComplete.scaleFromTo( 1f, new Vector3( 0.75, 0.75, 0.75 ), new Vector3( 1f, 1f, 1f ), Easing.Bounce.easeOut );
	yield WaitForSeconds(3);
	SternStallComplete.alphaTo(0.5f,0,Easing.Linear.easeOut);
	SternStallComplete.hidden=true;
}

function Loop()
{
	yield WaitForSeconds(1.0);
	if(LoopAudio!=null && audio)
	{
	audio.clip=LoopAudio;
	audio.Play();
	}
	LoopComplete.alphaTo(0.01f,0,Easing.Linear.easeOut);
	LoopComplete.hidden=false;
	LoopComplete.alphaFromTo(0.5f,0,1,Easing.Linear.easeOut);
	LoopComplete.scaleFromTo( 1f, new Vector3( 0.75, 0.75, 0.75 ), new Vector3( 1f, 1f, 1f ), Easing.Bounce.easeOut );
	yield WaitForSeconds(3);
	LoopComplete.alphaTo(0.5f,0,Easing.Linear.easeOut);
	LoopComplete.hidden=true;
}



function TutorialHelp(type:String, hiding:boolean)
{
		
		
		if(type == "wrightYourself")
		{
			if(hiding) //HIDING
			{
				wrightYourself.alphaFromTo(0.5f,1,0,Easing.Linear.easeOut);
				yield WaitForSeconds(0.6);
				wrightYourself.hidden=true;
				tutorial=false;
				
			}
			else if(!hiding && !tutorial)//SHOWING
			{
				wrightYourself.alphaFromTo(0.5f,0,1,Easing.Linear.easeOut);
				wrightYourself.hidden=false;
				tutorial=true;
			}
			
		}
		else if(type == "EskimoTut")
		{
			if(hiding) //HIDING
			{
				EskimoTut.alphaFromTo(0.5f,1,0,Easing.Linear.easeOut);
				yield WaitForSeconds(0.6);
				EskimoTut.hidden=true;
				tutorial=false;
				
			}
			else if(!hiding && !tutorial)//SHOWING
			{
				EskimoTut.alphaFromTo(0.5f,0,1,Easing.Linear.easeOut);
				EskimoTut.hidden=false;
				tutorial=true;
			}
		}
		else if(type == "HailMaryTut")
		{
			if(hiding) //HIDING
			{
				HailMaryTut.alphaFromTo(0.5f,1,0,Easing.Linear.easeOut);
				yield WaitForSeconds(0.6);
				HailMaryTut.hidden=true;
				tutorial=false;
				
			}
			else if(!hiding && !tutorial)//SHOWING
			{
				HailMaryTut.alphaFromTo(0.5f,0,1,Easing.Linear.easeOut);
				HailMaryTut.hidden=false;
				tutorial=true;
			}
		}
		else if(type == "HailMaryRTut")
		{
			if(hiding) //HIDING
			{
				HailMaryRTut.alphaFromTo(0.5f,1,0,Easing.Linear.easeOut);
				yield WaitForSeconds(0.6);
				HailMaryRTut.hidden=true;
				tutorial=false;
				
			}
			else if(!hiding && !tutorial)//SHOWING
			{
				HailMaryRTut.alphaFromTo(0.5f,0,1,Easing.Linear.easeOut);
				HailMaryRTut.hidden=false;
				tutorial=true;
			}
		}
		else if(type == "LoopTut")
		{
			if(hiding) //HIDING
			{
				LoopTut.alphaFromTo(0.5f,1,0,Easing.Linear.easeOut);
				yield WaitForSeconds(0.6);
				LoopTut.hidden=true;
				tutorial=false;
				
			}
			else if(!hiding && !tutorial)//SHOWING
			{
				LoopTut.alphaFromTo(0.5f,0,1,Easing.Linear.easeOut);
				LoopTut.hidden=false;
				tutorial=true;
			}
		}
		else if(type == "SternStallTut")
		{
			if(hiding) //HIDING
			{
				SternStallTut.alphaFromTo(0.5f,1,0,Easing.Linear.easeOut);
				yield WaitForSeconds(0.6);
				SternStallTut.hidden=true;
				tutorial=false;
				
			}
			else if(!hiding && !tutorial)//SHOWING
			{
				SternStallTut.alphaFromTo(0.5f,0,1,Easing.Linear.easeOut);
				SternStallTut.hidden=false;
				tutorial=true;
			}
		}
		else if(type == "BowStallTut")
		{
			if(hiding) //HIDING
			{
				BowStallTut.alphaFromTo(0.5f,1,0,Easing.Linear.easeOut);
				yield WaitForSeconds(0.6);
				BowStallTut.hidden=true;
				tutorial=false;
				
			}
			else if(!hiding && !tutorial)//SHOWING
			{
				BowStallTut.alphaFromTo(0.5f,0,1,Easing.Linear.easeOut);
				BowStallTut.hidden=false;
				tutorial=true;
			}
		}
		else if(type == "HideAll")
		{
			BowStallTut.hidden=true;
			SternStallTut.hidden=true;
			LoopTut.hidden=true;
			HailMaryRTut.hidden=true;
			HailMaryTut.hidden=true;
			wrightYourself.hidden=true;
			EskimoTut.hidden=true;
		}
	//}
	
	
}



function HideMoon()
{



yield WaitForSeconds(2);

	MoonCBar.hidden=true;
	MoonMeterBG.hidden=true;
// hide the stuff here

}

function HideGold()
{


yield WaitForSeconds(2);

	GoldCBar.hidden=true;
	CoinMeterBG.hidden=true;
// hide the stuff here
}


function ShowPoints(points:int)
{

Debug.Log("Scored: " + points);
startScript.HighScore += points;
PlayerPrefs.SetInt("HighScore", startScript.HighScore);
HighScore.clear();
HighScore.text = "" + startScript.HighScore.ToString()+ " PTS";

}
