import System.Collections.Generic;
#pragma strict

var guiScaleFactor = 1.0;
var textScaleFactor = 1.0;

var Water:Material;

var playerNum:int;
@HideInInspector var players:Array;
var isPlayer:int;
var playerName:OuyaSDK.OuyaPlayer;

var riverSetups:Transform[];
var currentRiver:int;
var lastRiver:int;

var riverSetupsLocked:Transform[];

var kayakBuilder:KayakBuilder;
kayakBuilder = GetComponent(KayakBuilder);

var characterBuilder:CharacterBuilder;
characterBuilder = GetComponent(CharacterBuilder);

var DNCycle:DayNightCycle;
DNCycle = FindObjectOfType(DayNightCycle);

var hint:RandomHint;
hint = GetComponent(RandomHint);

var loader:loadingScript;
loader = FindObjectOfType(loadingScript);

var Loading:UISprite;

var firstLoad=true;

//------------SETTINGS--------------------------

var SoundBtn:UIToggleButton;
//---------------------------------------------
 
   
 //---HELPERS---------------------
 
 var SafeZone:UISprite;
 
 //------------------------------
 
 
//main menu------------------------
var FirstPurchaseBtn:UISprite;

var WW3DUnlocked:UISprite;
var CampaignBtn:UIButton;
var MultiplayerBtn:UIButton;
var PracticeBtn:UIButton;
var ContinueGame:UIButton;
var Controls:UIButton;


var WW3DUnlockedSelected:UISprite;
var CampaignBtnSelected:UIButton;
var MultiplayerBtnSelected:UIButton;
var PracticeBtnSelected:UIButton;
var ContinueGameSelected:UIButton;
var ControlsSelected:UIButton;

var ErrorDisplay:UISprite;

@HideInInspector var loading=false;

var ControlsScheme:UISprite;

//----------------------------------------------

//---------------------------------
var RiverSwapVertical:UIButton;
//var RiverSwapHorizontal:UIButton;

var UnlockItemIcon:UISprite;
var UnlockItemAudio:AudioClip;
//--------------------------------
//----------------PVP & CO-op multiplayer-------------------------

var CoOpBtn:UISprite;
var CoOpBtnSelected:UISprite;

var PvpBtn:UISprite;
var PvpBtnSelected:UISprite;

//-------------------------------------------------------------------
///---------------CHARACTER CUSTOMIZER------------------------------

var CharacterBtn:UIButton;
var CharacterBtnSelected:UIButton;

var KayakBtn:UIButton;
var KayakBtnSelected:UIButton;

var ContinueBtn:UIButton;
var ContinueBtnSelected:UISprite;

var StartGameBtn:UIButton;
var NightModeBtn:UIButton;


var DeleteBtn:UIButton;
var DeleteBtnSelected:UISprite;

var SaveBtn:UIButton;
var SaveBtnSelected:UISprite;

var FaceBtn:UIButton;
var FaceBtnSelected:UIButton;

var GlassesBtn:UIButton;
var GlassesBtnSelected:UIButton;

var FeaturesBtn:UIButton;
var FeaturesBtnSelected:UIButton;

var HairBtn:UIButton;
var HairBtnSelected:UIButton;

var HelmetBtn:UIButton;
var HelmetBtnSelected:UIButton;

var ShirtBtn:UIButton;
var ShirtBtnSelected:UIButton;

var LifeJacketBtn:UIButton;
var LifeJacketBtnSelected:UIButton;

var NameBox:UIButton;
var NameBoxSelected:UIButton;

var ReturnBtn:UIButton;
var ReturnBtnSelected:UISprite;

var ShortsBtn:UIButton;
var ShortsBtnSelected:UIButton;

var SkinToneBtn:UIButton;
var SkinToneBtnSelected:UIButton;

var ColorBtn:UIButton;
var ColorBtnSelected:UIButton;

var DesignBtn:UIButton;
var DesignBtnSelected:UIButton;

var DecalBtn:UIButton;
var DecalBtnSelected:UIButton;


var CharacterSaved:UISprite;
var CharacterDeleted:UISprite;
//----------------------------------------------------------------------------------

//-------------------------------------Kayak sliders-----------------------------------
var KayakNameBox:UISprite;

var SpeedBar:UIProgressBar;
var SpeedBarBG:UISprite;

var AccelerationBar:UIProgressBar;
var AccelerationBarBG:UISprite;

var TrackingBar:UIProgressBar;
var TrackingBarBG:UISprite;

var ManeuverBar:UIProgressBar;
var ManeuverBarBG:UISprite;

var DragBar:UIProgressBar;
var DragBarBG:UISprite;


//-------------------------------------------------------------------

//--------------------------------MULTIPLAYER SELECT------------------


var Player2Btn:UISprite;
var Player2BtnSelected:UISprite;

var Player3Btn:UISprite;
var Player3BtnSelected:UISprite;

var Player4Btn:UISprite;
var Player4BtnSelected:UISprite;

//----------------------------------------------------------------------

//--------------------------------CONTROLLER PICKER----------------------

var ControllerBtn:UISprite;
var ControllerBtnSelected:UISprite;

var Controller1Btn:UISprite;
var Controller1BtnSelected:UISprite;

var Controller2Btn:UISprite;
var Controller2BtnSelected:UISprite;

var Controller3Btn:UISprite;
var Controller3BtnSelected:UISprite;

var Controller4Btn:UISprite;
var Controller4BtnSelected:UISprite;

var pressGOBtn:UISprite;
var pressOBtn:UISprite;
var pressUBtn:UISprite;
var pressYBtn:UISprite;
var pressABtn:UISprite;

//-----------------------------------------------------------------------

var Fader:UISprite;

var BG:Transform;

var selectPlayers = false;
var startingLocation=false;
var customizeLocation=false;
var riverLocation=false;
var multiPlayerSelect = false;

var settingsArea=false;


public var buttonSound:AudioClip;

var MenuAudio:AudioClip;
@HideInInspector var MusicVolumeFloat:float = 1;
@HideInInspector var SwappingSound=false;

public var buttonUI:UIToolkit;
public var riverUI:UIToolkit;
public var textToolkit:UIToolkit;
public var helpUI:UIToolkit;

var playerNumberTxt:UITextInstance;

var charName:UITextInstance;
var riverName:UITextInstance;
var creditsText:UITextInstance;
var hintText:UITextInstance;
var instructions:UITextInstance;


var text:UIText;
var riverText:UIText;

var stick=false;

var CountDownTimer:UITextInstance;


@HideInInspector var minutes : int;
@HideInInspector var seconds : int;
@HideInInspector var countDownTimer:String;


function Start () {

if(loader!=null)
{
	
	SwapMusic();
}
Fader = buttonUI.addSprite( "Fader.png", 0, 0, 1 );
	Fader.pixelsFromTopLeft(-30,-30);
	Fader.setSize(Screen.width *1.2,Screen.height *1.2);
	//Fader.hidden=true;

var RP = PlayerPrefs.GetInt("unlockedRiverPack");
if(RP > 1)
{
//PlayerPrefs.SetInt("unlockedRiverPack",1);
}

DNCycle.DayMode();

var rUnlock = UnlockRivers();

yield rUnlock;

Time.timeScale = 1;

		
	SafeZone  = helpUI.addSprite( "SafeZone.png", 0, 0, 0 );
	SafeZone.positionFromCenter(0.0f,0.0f);
	SafeZone.hidden=true;	
		


		text = UIText( textToolkit, "ImpactFont", "ImpactFont_0.png");
		riverText = UIText( textToolkit, "ImpactFont", "ImpactFont_0.png");
		riverText.wrapMode = UITextLineWrapMode.MinimumLength;
		riverText.lineWrapWidth = (Screen.width*0.43f) *1.2 ;
	
	//-----------------------MAIN MENU----------------------------------------------
	
	hintText = riverText.addTextInstance( " " ,0,0,textScaleFactor*0.65, 0, Color(1,1,1.5,0), UITextAlignMode.Center, UITextVerticalAlignMode.Middle );	
	hintText.positionFromCenter(0.0f,0.0f);
	
	creditsText = text.addTextInstance( "WhiteWater 3D Produced & Developed by Laughing Gull Productions\n\n3D artists\n- Lisa Sapinsky (Kayaks, Kayak Textures) - Jason Doucette (Characters, environments)\n\n2D Artists\n- Phillip Salas (Opening Promo Graphic) - Jason Doucette (UI Graphics)\n\n Sound F/X / Audio\n- Ryan Hill (Music, Sound F/X) - Jason Doucette (Sound F/X)\n\nHonourary Mentions\n- Jennifer Doucette, for putting up with all the late nights.\n- Tim Graupmann, for helping me out with the controllers to work." ,0,0,textScaleFactor*0.5, 0, Color(1,1,1,0), UITextAlignMode.Left, UITextVerticalAlignMode.Middle );	
	creditsText.positionFromTopLeft(0.1f,0.1f);
	creditsText.hidden=true;
	
	CountDownTimer = text.addTextInstance( " " ,0,0,textScaleFactor*0.55, 2, Color(1,1,1,1), UITextAlignMode.Left, UITextVerticalAlignMode.Middle );	
	CountDownTimer.positionFromBottomLeft(0.1f,0.1f);
	

	
	charName = text.addTextInstance( "Name",0,0,textScaleFactor*0.8, 1, Color(1,1,1,1), UITextAlignMode.Center, UITextVerticalAlignMode.Middle );	
	charName.positionFromCenter(-0.58f,0f);
	charName.hidden=true;
	
	riverName = text.addTextInstance( "Kayak",0,0,textScaleFactor*0.55, 2, Color(1,1,1,1), UITextAlignMode.Center, UITextVerticalAlignMode.Middle );	
	riverName.positionFromTopRight(-0.15f,0.1f);
	riverName.hidden=true;
	
	playerNumberTxt = text.addTextInstance( "Player 1",0,0,textScaleFactor, 2, Color(1,1,1,1), UITextAlignMode.Center, UITextVerticalAlignMode.Middle );	
	playerNumberTxt.positionFromCenter(0.7f,0f);
	playerNumberTxt.hidden=true;
	
	ErrorDisplay = buttonUI.addSprite( "errorDisplay.png", 0, 0, 1 );
	ErrorDisplay.centerize();
	ErrorDisplay.positionFromCenter(0.35f,0.0f);
	ErrorDisplay.hidden=true;
	
	FirstPurchaseBtn = buttonUI.addSprite( "FirstPurchaseBtn.png", 0, 0, 10 );
	FirstPurchaseBtn.positionFromRight(0.35f,-0.3f);
	FirstPurchaseBtn.hidden=true;
	
	WW3DUnlocked = buttonUI.addSprite( "UnlockBtn.png", 0, 0, 10 );
	WW3DUnlocked.positionFromCenter(-0.1f,-0.7f);
	WW3DUnlocked.hidden=true;
	
		//CampaignBtn  = buttonUI.addSprite( "CampaignBtn.png", 0, 0, 10 );
	CampaignBtn = UIButton.create(buttonUI,"CampaignBtn.png","CampaignBtn.png",0,0,10);
	CampaignBtn.positionFromCenter(-0.1f,-0.7f);
	CampaignBtn.hidden=true;
	CampaignBtn.onTouchUpInside += onTouchCampaignBtn;
	CampaignBtn.touchDownSound = buttonSound;
	
	if(!loader.isMobile)
	{

	
	//CampaignBtnSelected  = buttonUI.addSprite( "CampaignBtnSelected.png", 0, 0, 10 );
	CampaignBtnSelected = UIButton.create(buttonUI,"CampaignBtnSelected.png","CampaignBtnSelected.png",0,0,10);
	CampaignBtnSelected.positionFromCenter(-0.1f,-0.7f);
	CampaignBtnSelected.hidden=false;
	CampaignBtnSelected.onTouchUpInside += onTouchCampaignBtn;
	CampaignBtnSelected.touchDownSound = buttonSound;
	
	
	//MultiplayerBtn  = buttonUI.addSprite( "MultiplayerBtn.png", 0, 0, 10 );
	MultiplayerBtn = UIButton.create(buttonUI,"MultiplayerBtn.png","MultiplayerBtn.png",0,0,10);
	MultiplayerBtn.positionFromCenter(-0.0f,0.7f);
	MultiplayerBtn.hidden=false;
	
	//MultiplayerBtnSelected  = buttonUI.addSprite( "MultiplayerBtnSelected.png", 0, 0, 10 );
	MultiplayerBtnSelected = UIButton.create(buttonUI,"MultiplayerBtnSelected.png","MultiplayerBtnSelected.png",0,0,10);
	MultiplayerBtnSelected.positionFromCenter(0.0f,0.7f);
	MultiplayerBtnSelected.hidden=true;
	
	//PracticeBtn  = buttonUI.addSprite( "PracticeBtn.png", 0, 0, 10 );
	PracticeBtn = UIButton.create(buttonUI,"PracticeBtn.png","PracticeBtn.png",0,0,10);
	PracticeBtn.positionFromCenter(0.1f,-0.7f);
	PracticeBtn.hidden=false;
	
	//PracticeBtnSelected  = buttonUI.addSprite( "PracticeBtnSelected.png", 0, 0, 10 );
	PracticeBtnSelected = UIButton.create(buttonUI,"PracticeBtnSelected.png","PracticeBtnSelected.png",0,0,10);
	PracticeBtnSelected.positionFromCenter(0.1f,-0.7f);
	PracticeBtnSelected.hidden=true;
	}
	else
	{

	
	//CampaignBtnSelected  = buttonUI.addSprite( "CampaignBtnSelected.png", 0, 0, 10 );
	CampaignBtnSelected = UIButton.create(buttonUI,"CampaignBtnSelected.png","CampaignBtnSelected.png",0,0,10);
	CampaignBtnSelected.positionFromCenter(-0.1f,-0.7f);
	CampaignBtnSelected.hidden=false;
	CampaignBtnSelected.onTouchUpInside += onTouchCampaignBtn;
	CampaignBtnSelected.touchDownSound = buttonSound;
	
	//MultiplayerBtn  = buttonUI.addSprite( "MultiplayerBtn.png", 0, 0, 10 );
	MultiplayerBtn = UIButton.create(buttonUI,"AchievementsBtn.png","AchievementsBtn.png",0,0,10);
	MultiplayerBtn.positionFromCenter(-0.0f,0.7f);
	MultiplayerBtn.onTouchUpInside += onTouchAcheivementsBtn;
	MultiplayerBtn.hidden=false;
	
	//MultiplayerBtnSelected  = buttonUI.addSprite( "MultiplayerBtnSelected.png", 0, 0, 10 );
	MultiplayerBtnSelected = UIButton.create(buttonUI,"AchievementsBtnSelected.png","AchievementsBtnSelected.png",0,0,10);
	MultiplayerBtnSelected.positionFromCenter(0.0f,0.7f);
	MultiplayerBtnSelected.onTouchUpInside += onTouchAcheivementsBtn;
	MultiplayerBtnSelected.hidden=true;
	
	//PracticeBtn  = buttonUI.addSprite( "PracticeBtn.png", 0, 0, 10 );
	PracticeBtn = UIButton.create(buttonUI,"SettingsBtn.png","SettingsBtn.png",0,0,10);
	PracticeBtn.positionFromCenter(0.1f,-0.7f);
	PracticeBtn.onTouchUpInside +=onTouchSettingsBtn;
	PracticeBtn.hidden=false;
	
	//PracticeBtnSelected  = buttonUI.addSprite( "PracticeBtnSelected.png", 0, 0, 10 );
	PracticeBtnSelected = UIButton.create(buttonUI,"SettingsBtnSelected.png","SettingsBtnSelected.png",0,0,10);
	PracticeBtnSelected.positionFromCenter(0.1f,-0.7f);
	PracticeBtnSelected.onTouchUpInside +=onTouchSettingsBtn;
	PracticeBtnSelected.hidden=true;
	}
	
	
	
	//Controls  = buttonUI.addSprite( "GameControls.png", 0, 0, 10 );
	Controls = UIButton.create(buttonUI,"GameControls.png","GameControls.png",0,0,10);
	Controls.positionFromCenter(0.2f,0.7f);
	Controls.hidden=false;
	
	CharacterSaved = buttonUI.addSprite( "CharacterSavedIcon.png", 0, 0, 5 );
	CharacterSaved.positionCenter();
	CharacterSaved.hidden=true;
	
	CharacterDeleted = buttonUI.addSprite( "CharacterDeletedIcon.png", 0, 0, 5 );
	CharacterDeleted.positionCenter();
	CharacterDeleted.hidden=true;
	
	UnlockItemIcon  = riverUI.addSprite( "ItemUnlocked.png", 0, 0, 5 );
	UnlockItemIcon.positionCenter();
	UnlockItemIcon.hidden=true;
	
	
	WW3DUnlockedSelected = buttonUI.addSprite( "UnlockBtnSelected.png", 0, 0, 10 );
	WW3DUnlockedSelected.positionFromCenter(-0.1f,-0.7f);
	WW3DUnlockedSelected.hidden=false;
	
	
	SoundBtn = UIToggleButton.create(buttonUI,"SoundBtn.png","SoundBtnSelected.png","SoundBtnSelected.png",0,0,5);// replay button on end lvl screen
	SoundBtn.centerize();
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
	
	
	
	
	//ControlsSelected  = buttonUI.addSprite( "GameControlsSelected.png", 0, 0, 10 );
	ControlsSelected = UIButton.create(buttonUI,"GameControlsSelected.png","GameControlsSelected.png",0,0,10);
	ControlsSelected.positionFromCenter(0.2f,0.7f);
	ControlsSelected.hidden=true;
	
	
	if(InputManager.Moga)
	{
		if(loader.MogaPro)
		{
			ControlsScheme  = helpUI.addSprite( "MogaPControls.png", 0, 0, 10 );
			ControlsScheme.positionFromCenter(-0.1f,0.0f);
			ControlsScheme.hidden=true;
		}
		else
		{
			ControlsScheme  = helpUI.addSprite( "MogaControls.png", 0, 0, 10 );
			ControlsScheme.positionFromCenter(-0.1f,0.0f);
			ControlsScheme.hidden=true;
		}
	}
	else
	{
	ControlsScheme  = helpUI.addSprite( "OUYAControls.png", 0, 0, 10 );
	ControlsScheme.positionFromCenter(-0.1f,0.0f);
	ControlsScheme.hidden=true;
	}
	
	
	

	//------------------------------------------------------------------
	
	//-----------------------------COP PVP-------------------------------
	
	
	
	CoOpBtn  = buttonUI.addSprite( "CoOpBtn.png", 0, 0, 10 );
	CoOpBtn.positionFromCenter(-0.1f,-0.7f);
	//CoOpBtn.hidden=true;
	
	CoOpBtnSelected  = buttonUI.addSprite( "CoOpBtnSelected.png", 0, 0, 10 );
	CoOpBtnSelected.positionFromCenter(-0.1f,-0.7f);
	CoOpBtnSelected.hidden=true;
	
	PvpBtn  = buttonUI.addSprite( "PvpBtn.png", 0, 0, 10 );
	PvpBtn.positionFromCenter(0.0f,0.7f);
	//PvpBtn.hidden=true;
	
	PvpBtnSelected  = buttonUI.addSprite( "PvpBtnSelected.png", 0, 0, 10 );
	PvpBtnSelected.positionFromCenter(0.0f,-0.7f);
	PvpBtnSelected.hidden=true;
	
	//-------------------------------PROGRESS BARS-------------------------
	KayakNameBox = buttonUI.addSprite( "KayakNameBox.png", 0, 0, 10 );
	KayakNameBox.positionFromTopRight(-0.2f,0.015f);
	KayakNameBox.hidden=true;

	
	var barLocX = Screen.width*0.782f;
	
	SpeedBarBG = buttonUI.addSprite( "SpeedBox.png", 0, 0, 10 );
	SpeedBarBG.positionFromTopRight(0.15f,-0.55f);
	SpeedBarBG.hidden=true;
	

	SpeedBar = UIProgressBar.create( buttonUI, "ScaleBar.png", 0, 0, false, 5 ,false);
	SpeedBar.position.x = barLocX + 7 ;
	SpeedBar.position.y = SpeedBarBG.position.y - SpeedBarBG.height*0.68;
	SpeedBar.value=1;
	SpeedBar.hidden=true;
	
	AccelerationBarBG = buttonUI.addSprite( "AccelerationBox.png", 0, 0, 10 );
	AccelerationBarBG.positionFromTopRight(0.22f,-0.55f);
	AccelerationBarBG.hidden=true;
	
	AccelerationBar = UIProgressBar.create( buttonUI, "ScaleBar.png", 0, 0, false, 5 ,false);
	AccelerationBar.position.x = barLocX + 7 ;
	AccelerationBar.position.y = AccelerationBarBG.position.y - AccelerationBarBG.height*0.68;
	AccelerationBar.value=1;
	AccelerationBar.hidden=true;
	
	TrackingBarBG = buttonUI.addSprite( "TrackingBox.png", 0, 0, 10 );
	TrackingBarBG.positionFromTopRight(0.31f,-0.55f);
	TrackingBarBG.hidden=true;
	
	TrackingBar = UIProgressBar.create( buttonUI, "ScaleBar.png", 0, 0, false, 5 ,false);
	TrackingBar.position.x = barLocX + 7 ;
	TrackingBar.position.y = TrackingBarBG.position.y - TrackingBarBG.height*0.68;
	TrackingBar.value=1;
	TrackingBar.hidden=true;
	
	ManeuverBarBG = buttonUI.addSprite( "ManeuverabilityBox.png", 0, 0, 10 );
	ManeuverBarBG.positionFromTopRight(0.38f,-0.55f);
	ManeuverBarBG.hidden=true;
	
	ManeuverBar = UIProgressBar.create( buttonUI, "ScaleBar.png", 0, 0, false, 5 ,false);
	ManeuverBar.position.x = barLocX + 7 ;
	ManeuverBar.position.y = ManeuverBarBG.position.y - ManeuverBarBG.height*0.68;
	ManeuverBar.value=1;
	ManeuverBar.hidden=true;
	
	
	
	DragBarBG = buttonUI.addSprite( "DragBox.png", 0, 0, 10 );
	DragBarBG.positionFromTopRight(0.45f,-0.55f);
	DragBarBG.hidden=true;
	
	DragBar = UIProgressBar.create( buttonUI, "ScaleBar.png", 0, 0, false, 5 ,false);
	DragBar.position.x = barLocX + 7 ;
	DragBar.position.y = DragBarBG.position.y - DragBarBG.height*0.68;
	DragBar.value=1;
	DragBar.hidden=true;
	//----------------------------------------------------------------
	
	
	//--------------------MULTIPLAYER SELECT-----------------------------
	
	Player2Btn  = buttonUI.addSprite( "Player2Btn.png", 0, 0, 10 );
	Player2Btn.positionFromCenter(-0.1f,-0.7f);
	Player2Btn.hidden=true;
	
	Player2BtnSelected  = buttonUI.addSprite( "Player2BtnSelected.png", 0, 0, 10 );
	Player2BtnSelected.positionFromCenter(-0.1f,-0.7f);
	Player2BtnSelected.hidden=true;
	
	Player3Btn  = buttonUI.addSprite( "Player3Btn.png", 0, 0, 10 );
	Player3Btn.positionFromCenter(0.0f,0.7f);
	Player3Btn.hidden=true;
	
	Player3BtnSelected  = buttonUI.addSprite( "Player3BtnSelected.png", 0, 0, 10 );
	Player3BtnSelected.positionFromCenter(0.0f,-0.7f);
	Player3BtnSelected.hidden=true;
	
	Player4Btn  = buttonUI.addSprite( "Player4Btn.png", 0, 0, 10 );
	Player4Btn.positionFromCenter(0.1f,-0.7f);
	Player4Btn.hidden=true;
	
	Player4BtnSelected  = buttonUI.addSprite( "Player4BtnSelected.png", 0, 0, 10 );
	Player4BtnSelected.positionFromCenter(0.1f,-0.7f);
	Player4BtnSelected.hidden=true;
	//---------------------------------------------------------------------
	
	//-----------------------CONTROLLER SELECT------------------------------
	
	ControllerBtn = buttonUI.addSprite( "ControllerInactive.png", 0, 0, 10 );
	ControllerBtn.positionFromCenter(0.0f,0.0f);
	ControllerBtn.hidden=true;
	
	pressGOBtn = buttonUI.addSprite( "PressO.png", 0, 0, 10 );
	pressGOBtn.positionFromCenter(0.13f,0.0f);
	pressGOBtn.hidden=true;
	
	
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
	pressOBtn.positionFromCenter(0.13f,-0.35f);
	pressOBtn.hidden=true;
	
	pressUBtn = buttonUI.addSprite( "PressU.png", 0, 0, 10 );
	pressUBtn.positionFromCenter(0.13f,-0.1f);
	pressUBtn.hidden=true;
	
	pressYBtn = buttonUI.addSprite( "PressY.png", 0, 0, 10 );
	pressYBtn.positionFromCenter(0.13f,0.1f);
	pressYBtn.hidden=true;
	
	pressABtn = buttonUI.addSprite( "PressA.png", 0, 0, 10 );
	pressABtn.positionFromCenter(0.13f,0.35f);
	pressABtn.hidden=true;
	
	//-----------------------------------------------------------------
	
	///---------------CHARACTER CUSTOMIZER------------------------------

	//CharacterBtn = buttonUI.addSprite( "CharacterBtn.png", 0, 0, 10 );
	CharacterBtn = UIButton.create(buttonUI,"CharacterBtn.png","CharacterBtn.png",0,0,10);
	CharacterBtn.positionFromTopLeft(-0.2f,0.05f);
	CharacterBtn.hidden=true;
	CharacterBtn.onTouchUpInside += onTouchCharacterBtn;
	CharacterBtn.touchDownSound = buttonSound;
	
	//CharacterBtnSelected = buttonUI.addSprite( "CharacterBtnSelected.png", 0, 0, 10 );
	CharacterBtnSelected = UIButton.create(buttonUI,"CharacterBtnSelected.png","CharacterBtnSelected.png",0,0,10);
	CharacterBtnSelected.positionFromTopLeft(-0.2f,0.05f);
	CharacterBtnSelected.hidden=true;
	CharacterBtnSelected.onTouchUpInside += onTouchCharacterBtn;
	CharacterBtnSelected.touchDownSound = buttonSound;

	//KayakBtn = buttonUI.addSprite( "KayakBtn.png", 0, 0, 10 );
	KayakBtn = UIButton.create(buttonUI,"KayakBtn.png","KayakBtn.png",0,0,10);
	KayakBtn.positionFromTopLeft(0.6f,-0.4f);
	KayakBtn.hidden=true;
	KayakBtn.onTouchUpInside += onTouchKayakBtn;
	KayakBtn.touchDownSound = buttonSound;
	
	//KayakBtnSelected = buttonUI.addSprite( "KayakBtnSelected.png", 0, 0, 10 );
	KayakBtnSelected = UIButton.create(buttonUI,"KayakBtnSelected.png","KayakBtnSelected.png",0,0,10);
	KayakBtnSelected.positionFromTopLeft(0.6f,-0.4f);
	KayakBtnSelected.hidden=true;
	KayakBtnSelected.onTouchUpInside += onTouchKayakBtn;
	KayakBtnSelected.touchDownSound = buttonSound;

	//ContinueBtn = buttonUI.addSprite( "ContinueBtn.png", 0, 0, 10 );
	ContinueBtn = UIButton.create(buttonUI,"ContinueBtn.png","ContinueBtn.png",0,0,10);
	ContinueBtn.positionFromBottomRight(0.025f,-0.205f);
	ContinueBtn.hidden=true;
	ContinueBtn.onTouchUpInside += onTouchContinueBtn;
	ContinueBtn.touchDownSound = buttonSound;
	
	
	ContinueBtnSelected = buttonUI.addSprite( "ContinueBtn.png", 0, 0, 10 );
	ContinueBtnSelected.positionFromBottomRight(0.025f,-0.205f);
	ContinueBtnSelected.hidden=true;
	
	NightModeBtn = UIButton.create(buttonUI,"NightMode.png","NightMode.png",0,0,10);
	NightModeBtn.positionFromTopRight(0.025f,-0.205f);
	NightModeBtn.hidden=true;
	NightModeBtn.onTouchUpInside += onTouchNightModeBtn;
	NightModeBtn.touchDownSound = buttonSound;
	
	//StartGameBtn = buttonUI.addSprite( "StartGameBtn.png", 0, 0, 10 );
	StartGameBtn = UIButton.create(buttonUI,"StartGameBtn.png","StartGameBtn.png",0,0,10);
	StartGameBtn.positionFromBottomRight(0.025f,-0.205f);
	StartGameBtn.hidden=true;
	StartGameBtn.onTouchUpInside += onTouchStartGameBtn;
	StartGameBtn.touchDownSound = buttonSound;
	
	//SaveBtn = buttonUI.addSprite( "SaveBtn.png", 0, 0, 10 );
	SaveBtn = UIButton.create(buttonUI,"SaveBtn.png","SaveBtn.png",0,0,10);
	SaveBtn.centerize();
	SaveBtn.positionFromBottomLeft(0.018f,-0.205f);
	SaveBtn.hidden=true;
	SaveBtn.onTouchUpInside += onTouchSaveBtn;
	SaveBtn.touchDownSound = buttonSound;
	
	SaveBtnSelected = buttonUI.addSprite( "SaveBtnSelected.png", 0, 0, 10 );
	SaveBtnSelected.centerize();
	SaveBtnSelected.positionFromBottomLeft(0.018f,-0.205f);
	SaveBtnSelected.hidden=true;
	
	//DeleteBtn = buttonUI.addSprite( "DeleteBtn.png", 0, 0, 10 );
	DeleteBtn = UIButton.create(buttonUI,"DeleteBtn.png","DeleteBtn.png",0,0,10);
	DeleteBtn.centerize();
	DeleteBtn.positionFromBottomRight(0.018f,-0.205f);
	DeleteBtn.hidden=true;
	DeleteBtn.onTouchUpInside += onTouchDeleteBtn;
	DeleteBtn.touchDownSound = buttonSound;
	
	DeleteBtnSelected = buttonUI.addSprite( "DeleteBtnSelected.png", 0, 0, 10 );
	DeleteBtnSelected.centerize();
	DeleteBtnSelected.positionFromBottomRight(0.018f,-0.205f);
	DeleteBtnSelected.hidden=true;
	

	//ReturnBtn = buttonUI.addSprite( "ReturnBtn.png", 0, 0, 10 );
	ReturnBtn = UIButton.create(buttonUI,"ReturnBtn.png","ReturnBtn.png",0,0,10);
	ReturnBtn.positionFromBottomLeft(0.025f,-0.205f);
	ReturnBtn.hidden=true;
	ReturnBtn.onTouchUpInside += onTouchReturnBtn;
	ReturnBtn.touchDownSound = buttonSound;
	
	ReturnBtnSelected = buttonUI.addSprite( "ReturnBtn.png", 0, 0, 10 );
	ReturnBtnSelected.positionFromBottomLeft(0.025f,-0.205f);
	ReturnBtnSelected.hidden=true;

	//HelmetBtn = buttonUI.addSprite( "HelmetBtn.png", 0, 0, 10 );
	HelmetBtn = UIButton.create(buttonUI,"HelmetBtn.png","HelmetBtn.png",0,0,10);
	HelmetBtn.positionFromTopLeft(0.15f,-0.2f);
	HelmetBtn.hidden=true;
	HelmetBtn.onTouchUpInside += onTouchHelmetBtn;
	HelmetBtn.touchDownSound = buttonSound;
	
	//HelmetBtnSelected = buttonUI.addSprite( "HelmetBtnSelected.png", 0, 0, 10 );
	HelmetBtnSelected = UIButton.create(buttonUI,"HelmetBtnSelected.png","HelmetBtnSelected.png",0,0,10);
	HelmetBtnSelected.positionFromTopLeft(0.15f,-0.2f);
	HelmetBtnSelected.hidden=true;	
	HelmetBtnSelected.onTouchUpInside += onTouchHelmetBtn;
	HelmetBtnSelected.touchDownSound = buttonSound;

	//SkinToneBtn = buttonUI.addSprite( "SkinToneBtn.png", 0, 0, 10 );
	SkinToneBtn = UIButton.create(buttonUI,"SkinToneBtn.png","SkinToneBtn.png",0,0,10);
	SkinToneBtn.positionFromTopLeft(0.2f,-0.2f);
	SkinToneBtn.hidden=true;
	SkinToneBtn.onTouchUpInside += onTouchSkinToneBtn;
	SkinToneBtn.touchDownSound = buttonSound;
	
	//SkinToneBtnSelected = buttonUI.addSprite( "SkinToneBtnSelected.png", 0, 0, 10 );
	SkinToneBtnSelected = UIButton.create(buttonUI,"SkinToneBtnSelected.png","SkinToneBtnSelected.png",0,0,10);
	SkinToneBtnSelected.positionFromTopLeft(0.2f,-0.2f);
	SkinToneBtnSelected.hidden=true;
	SkinToneBtnSelected.onTouchUpInside += onTouchSkinToneBtn;
	SkinToneBtnSelected.touchDownSound = buttonSound;

	//HairBtn = buttonUI.addSprite( "HairBtn.png", 0, 0, 10 );
	HairBtn = UIButton.create(buttonUI,"HairBtn.png","HairBtn.png",0,0,10);
	HairBtn.positionFromTopLeft(0.25f,-0.2f);
	HairBtn.hidden=true;
	HairBtn.onTouchUpInside += onTouchHairBtn;
	HairBtn.touchDownSound = buttonSound;
	
	//HairBtnSelected = buttonUI.addSprite( "HairBtnSelected.png", 0, 0, 10 );
	HairBtnSelected = UIButton.create(buttonUI,"HairBtnSelected.png","HairBtnSelected.png",0,0,10);
	HairBtnSelected.positionFromTopLeft(0.25f,-0.2f);
	HairBtnSelected.hidden=true;
	HairBtnSelected.onTouchUpInside += onTouchHairBtn;
	HairBtnSelected.touchDownSound = buttonSound;
	
	//FaceBtn = buttonUI.addSprite( "FaceBtn.png", 0, 0, 10 );
	FaceBtn = UIButton.create(buttonUI,"FaceBtn.png","FaceBtn.png",0,0,10);
	FaceBtn.positionFromTopLeft(0.3f,-0.2f);
	FaceBtn.hidden=true;
	FaceBtn.onTouchUpInside += onTouchFaceBtn;
	FaceBtn.touchDownSound = buttonSound;
	
	//FaceBtnSelected = buttonUI.addSprite( "FaceBtnSelected.png", 0, 0, 10 );
	FaceBtnSelected = UIButton.create(buttonUI,"FaceBtnSelected.png","FaceBtnSelected.png",0,0,10);
	FaceBtnSelected.positionFromTopLeft(0.3f,-0.2f);
	FaceBtnSelected.hidden=true;
	FaceBtnSelected.onTouchUpInside += onTouchFaceBtn;
	FaceBtnSelected.touchDownSound = buttonSound;
	
	//GlassesBtn = buttonUI.addSprite( "GlassesBtn.png", 0, 0, 10 );
	GlassesBtn = UIButton.create(buttonUI,"GlassesBtn.png","GlassesBtn.png",0,0,10);
	GlassesBtn.positionFromTopLeft(0.35f,-0.2f);
	GlassesBtn.hidden=true;
	GlassesBtn.onTouchUpInside += onTouchGlassesBtn;
	GlassesBtn.touchDownSound = buttonSound;
	
	//GlassesBtnSelected = buttonUI.addSprite( "GlassesBtnSelected.png", 0, 0, 10 );
	GlassesBtnSelected = UIButton.create(buttonUI,"GlassesBtnSelected.png","GlassesBtnSelected.png",0,0,10);
	GlassesBtnSelected.positionFromTopLeft(0.35f,-0.2f);
	GlassesBtnSelected.hidden=true;
	GlassesBtnSelected.onTouchUpInside += onTouchGlassesBtn;
	GlassesBtnSelected.touchDownSound = buttonSound;
	
	//FeaturesBtn = buttonUI.addSprite( "FeaturesBtn.png", 0, 0, 10 );
	FeaturesBtn = UIButton.create(buttonUI,"FeaturesBtn.png","FeaturesBtn.png",0,0,10);
	FeaturesBtn.positionFromTopLeft(0.4f,-0.2f);
	FeaturesBtn.hidden=true;
	FeaturesBtn.onTouchUpInside += onTouchFeaturesBtn;
	FeaturesBtn.touchDownSound = buttonSound;
	
	//FeaturesBtnSelected = buttonUI.addSprite( "FeaturesBtnSelected.png", 0, 0, 10 );
	FeaturesBtnSelected = UIButton.create(buttonUI,"FeaturesBtnSelected.png","FeaturesBtnSelected.png",0,0,10);
	FeaturesBtnSelected.positionFromTopLeft(0.4f,-0.2f);
	FeaturesBtnSelected.hidden=true;
	FeaturesBtnSelected.onTouchUpInside += onTouchFeaturesBtn;
	FeaturesBtnSelected.touchDownSound = buttonSound;	

	//LifeJacketBtn = buttonUI.addSprite( "LifeJacketBtn.png", 0, 0, 10 );
	LifeJacketBtn = UIButton.create(buttonUI,"LifeJacketBtn.png","LifeJacketBtn.png",0,0,10);
	LifeJacketBtn.positionFromTopLeft(0.45f,-0.2f);
	LifeJacketBtn.hidden=true;
	LifeJacketBtn.onTouchUpInside += onTouchLifeJacketBtn;
	LifeJacketBtn.touchDownSound = buttonSound;	
	
	//LifeJacketBtnSelected = buttonUI.addSprite( "LifeJacketBtnSelected.png", 0, 0, 10 );
	LifeJacketBtnSelected = UIButton.create(buttonUI,"LifeJacketBtnSelected.png","LifeJacketBtnSelected.png",0,0,10);
	LifeJacketBtnSelected.positionFromTopLeft(0.45f,-0.2f);
	LifeJacketBtnSelected.hidden=true;
	LifeJacketBtnSelected.onTouchUpInside += onTouchLifeJacketBtn;
	LifeJacketBtnSelected.touchDownSound = buttonSound;	

	//ShirtBtn = buttonUI.addSprite( "ShirtBtn.png", 0, 0, 10 );
	ShirtBtn = UIButton.create(buttonUI,"ShirtBtn.png","ShirtBtn.png",0,0,10);
	ShirtBtn.positionFromTopLeft(0.5f,-0.2f);
	ShirtBtn.hidden=true;
	ShirtBtn.onTouchUpInside += onTouchShirtBtn;
	ShirtBtn.touchDownSound = buttonSound;	

	
	//ShirtBtnSelected = buttonUI.addSprite( "ShirtBtnSelected.png", 0, 0, 10 );
	ShirtBtnSelected = UIButton.create(buttonUI,"ShirtBtnSelected.png","ShirtBtnSelected.png",0,0,10);
	ShirtBtnSelected.positionFromTopLeft(0.5f,-0.2f);
	ShirtBtnSelected.hidden=true;
	ShirtBtnSelected.onTouchUpInside += onTouchShirtBtn;
	ShirtBtnSelected.touchDownSound = buttonSound;	

	//ShortsBtn = buttonUI.addSprite( "ShortsBtn.png", 0, 0, 10 );
	ShortsBtn = UIButton.create(buttonUI,"ShortsBtn.png","ShortsBtn.png",0,0,10);
	ShortsBtn.positionFromTopLeft(0.55f,-0.2f);
	ShortsBtn.hidden=true;
	ShortsBtn.onTouchUpInside += onTouchShortsBtn;
	ShortsBtn.touchDownSound = buttonSound;	
	
	//ShortsBtnSelected = buttonUI.addSprite( "ShortsBtnSelected.png", 0, 0, 10 );
	ShortsBtnSelected = UIButton.create(buttonUI,"ShortsBtnSelected.png","ShortsBtnSelected.png",0,0,10);
	ShortsBtnSelected.positionFromTopLeft(0.55f,-0.2f);
	ShortsBtnSelected.hidden=true;
	ShortsBtnSelected.onTouchUpInside += onTouchShortsBtn;
	ShortsBtnSelected.touchDownSound = buttonSound;		


	//NameBox = buttonUI.addSprite( "NameBox.png", 0, 0, 10 );
	NameBox = UIButton.create(buttonUI,"NameBox.png","NameBox.png",0,0,10);
	NameBox.centerize();
	NameBox.positionFromCenter(-0.6025f,0.0f);
	NameBox.hidden=true;
	NameBox.onTouchUpInside += onTouchNameBox;
	NameBox.touchDownSound = buttonSound;			
	
	//NameBoxSelected = buttonUI.addSprite( "NameBoxSelected.png", 0, 0, 10 );
	NameBoxSelected = UIButton.create(buttonUI,"NameBoxSelected.png","NameBoxSelected.png",0,0,10);
	NameBoxSelected.centerize();
	NameBoxSelected.positionFromCenter(-0.6025f,0.0f);
	NameBoxSelected.hidden=true;
	NameBoxSelected.onTouchUpInside += onTouchNameBox;
	NameBoxSelected.touchDownSound = buttonSound;		
	
	//ColorBtn = buttonUI.addSprite( "ColorBtn.png", 0, 0, 10 );
	ColorBtn = UIButton.create(buttonUI,"ColorBtn.png","ColorBtn.png",0,0,10);
	ColorBtn.positionFromTopLeft(0.7f,-0.2f);
	ColorBtn.hidden=true;
	ColorBtn.onTouchUpInside += onTouchColorBtn;
	ColorBtn.touchDownSound = buttonSound;		
	
	//ColorBtnSelected = buttonUI.addSprite( "ColorBtnSelected.png", 0, 0, 10 );
	ColorBtnSelected = UIButton.create(buttonUI,"ColorBtnSelected.png","ColorBtnSelected.png",0,0,10);
	ColorBtnSelected.positionFromTopLeft(0.7f,-0.2f);
	ColorBtnSelected.hidden=true;
	ColorBtnSelected.onTouchUpInside += onTouchColorBtn;
	ColorBtnSelected.touchDownSound = buttonSound;			
	
	//DesignBtn = buttonUI.addSprite( "DesignBtn.png", 0, 0, 10 );
	DesignBtn = UIButton.create(buttonUI,"DesignBtn.png","DesignBtn.png",0,0,10);
	DesignBtn.positionFromTopLeft(0.75f,-0.2f);
	DesignBtn.hidden=true;
	DesignBtn.onTouchUpInside += onTouchDesignBtn;
	DesignBtn.touchDownSound = buttonSound;		
	
	//DesignBtnSelected = buttonUI.addSprite( "DesignBtnSelected.png", 0, 0, 10 );
	DesignBtnSelected = UIButton.create(buttonUI,"DesignBtnSelected.png","DesignBtnSelected.png",0,0,10);
	DesignBtnSelected.positionFromTopLeft(0.75f,-0.2f);
	DesignBtnSelected.hidden=true;
	DesignBtnSelected.onTouchUpInside += onTouchDesignBtn;
	DesignBtnSelected.touchDownSound = buttonSound;		
	
	//DecalBtn = buttonUI.addSprite( "DecalBtn.png", 0, 0, 10 );
	DecalBtn = UIButton.create(buttonUI,"DecalBtn.png","DecalBtn.png",0,0,10);
	DecalBtn.positionFromTopLeft(0.8f,-0.2f);
	DecalBtn.hidden=true;
	DecalBtn.onTouchUpInside += onTouchDecalBtn;
	DecalBtn.touchDownSound = buttonSound;			
	
	//DecalBtnSelected = buttonUI.addSprite( "DecalBtnSelected.png", 0, 0, 10 );
	DecalBtnSelected = UIButton.create(buttonUI,"DecalBtnSelected.png","DecalBtnSelected.png",0,0,10);
	DecalBtnSelected.positionFromTopLeft(0.8f,-0.2f);
	DecalBtnSelected.hidden=true;
	DecalBtnSelected.onTouchUpInside += onTouchDecalBtn;
	DecalBtnSelected.touchDownSound = buttonSound;	

//-------------------------------------------------------------------
	
	RiverSwapVertical = UIButton.create(buttonUI,"DpadVerticalIcon.png","DpadVerticalIcon.png",0,0,10);
	RiverSwapVertical.positionFromCenter(0.0f,-0.8f);
	RiverSwapVertical.hidden=true;
	RiverSwapVertical.onTouchUpInside += onTouchRiverSwapVertical;
	RiverSwapVertical.touchDownSound = buttonSound;		
	
//-----------------------------------------------------------	

var Controllers:String[] = Input.GetJoystickNames();

	if(loader.setPlayer || Controllers.Length==0 )
	{
		if(PlayerPrefs.GetInt("LoadOnScreen")==3)
		{
		riverLocation=true;
		ShowRiverSelectMenu();
		PlayerPrefs.SetInt("LoadOnScreen",0);
		}
		else
		{
		startingLocation=true;
		ShowMainMenu();
		PlayerPrefs.SetInt("LoadOnScreen",0);
		}
	}
	else
	{
		ControllerBtn.hidden=false;
 	 
 	 	 pressGOBtn.hidden=false;
	}
	
	yield WaitForSeconds(1.0);
	Fader.alphaTo(1.0f,0,Easing.Linear.easeInOut);
	
	
	Loading = buttonUI.addSprite( "Loading.png", 0, 0, 0 );
	var anim = Loading.addSpriteAnimation( "anim", 0.15f, "Loading.png", "Loading01.png", "Loading01.png", "Loading02.png", "Loading02.png", "Loading03.png", "Loading03.png", "Loading.png", "Loading.png");
	Loading.positionFromCenter(0.2f,0.0f);
	Loading.hidden=true;
	
	
		if(!loader.WW3DIsUnlocked)
		{
			CountDownTimer.hidden=true;
			WW3DUnlockedSelected.hidden=false;
			CampaignBtnSelected.hidden=true;
			MultiplayerBtn.hidden=true;
		}
		else
		{
			WW3DUnlockedSelected.hidden=true;
			
		}
	
	
	}
	
function SwapMusic()
{
	loader.audioToSwapTo = MenuAudio;
	loader.SwappingSound=true;
	Debug.Log("swapping ON");
}	
	
function LateUpdate()
{

//water running-----------------
	Water.mainTextureOffset.y +=0.005;
	//	
//"DPU" // dpad up
//"DPD" // dpad down
//"O" is select with O btn

if(isPlayer == 1 || isPlayer == null || isPlayer == 0)
{
isPlayer = 1;
playerName = loader.Players[0];
}
else if(isPlayer == 2)
{
playerName = loader.Players[1];
}
else if(isPlayer == 3)
{
playerName = loader.Players[2];
}
else if(isPlayer == 4)
{
playerName = loader.Players[3];
}

var playerControllers:String[] = Input.GetJoystickNames();
if(ControllerBtn)
{
if(!ControllerBtn.hidden && !stick && !startingLocation && !multiPlayerSelect && !customizeLocation && !riverLocation)
		{
			for(var o:int=0; o < playerControllers.Length; o++)
			{
				var controllerNum:OuyaSDK.OuyaPlayer = (o+1);
				
				if(InputManager.GetButton("Acceleration", controllerNum) && !stick)
				{
					ControllerBtn.hidden = true;
					
					pressGOBtn.hidden=true;
					Debug.Log("" + controllerNum);
					loader.Players[0] = controllerNum;
					stickInTheWay();
						startingLocation=true;
						ShowMainMenu();
						PlayerPrefs.SetInt("LoadOnScreen",0);
						loader.setPlayer=true;
				}
					
			}
			
		}
}

	//Debug.Log(p + " " + b + " " + bs + " ");
	if(startingLocation && creditsText.hidden)
	{
		
		if(!SpeedBar.hidden)
		{
			SpeedBar.hidden=true;
			AccelerationBar.hidden=true;
			TrackingBar.hidden=true;
			ManeuverBar.hidden=true;
			DragBar.hidden=true;
		}
//---------------------------ANDROID CONTROLS--------------------------		
		if (Application.platform == RuntimePlatform.Android)
        {
            if (Input.GetKey(KeyCode.Escape))
            {
                Application.Quit();
                
                return;


            }
            
            if (Input.GetKey(KeyCode.Home))
            {
              
              return;


            }
        }
//------------------------------------------------------------------	

				
		if(loader.WW3DIsUnlocked)
		{
		
		
		if(!FirstPurchaseBtn.hidden && !CampaignBtnSelected.hidden)
		{
			if( InputManager.GetButton("Orbit", playerName)&& !stick)
			{
			
			loader.jCommander.GetDProducts();
			Debug.Log("pressed btn");
			// buy at discount price
			stickInTheWay();
			
			}
		}
		
		if(!CampaignBtnSelected.hidden && ControlsSelected.hidden && !stick)// campaign is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)//  InputManager.GetButton("DDown", playerName)&& !stick)
			{
			
			CampaignBtnSelected.hidden = true;
			CampaignBtn.hidden=false;
			MultiplayerBtnSelected.hidden=false;
			MultiplayerBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick)//  InputManager.GetButton("DUp", playerName)&& !stick)
			{
			CampaignBtnSelected.hidden = true;
			CampaignBtn.hidden=false;
			ControlsSelected.hidden=false;
			Controls.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			startingLocation=false;
			customizeLocation=true;
			riverLocation=false;
			multiPlayerSelect=false;
			PlayerPrefs.SetInt("NumberOfPlayers",1);
			PlayerPrefs.SetInt("PracticeMode",0);
			PlayerPrefs.SetInt("MultiMode",0);
			stickInTheWay();
			ClearMainMenu();
			
			ShowCustomizationMenu();
			}
		
		}
		else if(!MultiplayerBtnSelected.hidden && CampaignBtnSelected.hidden && !stick)// multi player is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			
			MultiplayerBtnSelected.hidden = true;
			MultiplayerBtn.hidden=false;
			PracticeBtnSelected.hidden=false;
			PracticeBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			CampaignBtnSelected.hidden = false;
			CampaignBtn.hidden=true;
			MultiplayerBtnSelected.hidden=true;
			MultiplayerBtn.hidden=false;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//load the river scene
			if(loader.isMobile)
			{
			//settings
			onTouchAcheivementsBtn();
			}
			else
			{
			PlayerPrefs.SetInt("PracticeMode",0);
			PlayerPrefs.SetInt("MultiMode",0);
			stickInTheWay();
			MultiPlayerDetection();
			}
			}
		
		}
		else if(!PracticeBtnSelected.hidden && MultiplayerBtnSelected.hidden && ControlsSelected.hidden && !stick)// practice is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			
			PracticeBtnSelected.hidden = true;
			PracticeBtn.hidden=false;
			ControlsSelected.hidden=false;
			Controls.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			MultiplayerBtnSelected.hidden = false;
			MultiplayerBtn.hidden=true;
			PracticeBtnSelected.hidden=true;
			PracticeBtn.hidden=false;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//jump to character customizer
			
			if(loader.isMobile)
			{
				onTouchSettingsBtn();
				
			}
			else
			{
				startingLocation=false;
				customizeLocation=true;
				riverLocation=false;
				multiPlayerSelect=false;
				PlayerPrefs.SetInt("NumberOfPlayers",1);
				PlayerPrefs.SetInt("PracticeMode",2);
				stickInTheWay();
				ClearMainMenu();
				ShowCustomizationMenu();
			}
			
			
			}
		
		}
		else if(!ControlsSelected.hidden && PracticeBtnSelected.hidden  && !stick)// start game is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			CampaignBtnSelected.hidden = false;
			CampaignBtn.hidden=true;
			ControlsSelected.hidden=true;
			Controls.hidden=false;
			stickInTheWay();
			
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			
			PracticeBtnSelected.hidden = false;
			PracticeBtn.hidden=true;
			ControlsSelected.hidden=true;
			Controls.hidden=false;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			
			//check what controls are set as #1 or #2 and then unhide accordingly.
			
				
			
					ControlsScheme.hidden = false;
					//hide it all
					
					stickInTheWay();
					CampaignBtnSelected.hidden = true;
					CampaignBtn.hidden=true;
					MultiplayerBtnSelected.hidden = true;
					MultiplayerBtn.hidden = true;
					PracticeBtnSelected.hidden = true;
					PracticeBtn.hidden = true;
					ControlsSelected.hidden=true;
					Controls.hidden=true;
				
			stickInTheWay();
			
			}
		
		}
		
		
		else if(!ControlsScheme.hidden &&   InputManager.GetButton("Exit", playerName) && ControlsSelected.hidden && Controls.hidden && !stick )
		{
		//controls being shown------------------------------------
			
			ControlsScheme.hidden = true;
			//ControlsScheme2.hidden = true;
			CampaignBtnSelected.hidden = true;
			CampaignBtn.hidden=false;
			MultiplayerBtn.hidden = false;
			PracticeBtn.hidden = false;
			ControlsSelected.hidden=false;
			Controls.hidden=true;
			stickInTheWay();
		}
		
		else if(!stick && Controller1Btn.hidden && Controller2Btn.hidden && Controller3Btn.hidden && Controller4Btn.hidden && !customizeLocation  && ControlsScheme.hidden && SoundBtn.hidden)
		{
			
			
			Controller1BtnSelected.hidden = true;
			Controller2BtnSelected.hidden = true;
			Controller3BtnSelected.hidden = true;
			Controller4BtnSelected.hidden = true;
			startingLocation=false;
			ShowCustomizationMenu();
			customizeLocation = true;
			multiPlayerSelect=false;
		}
			
		
					  if(!Controller1Btn.hidden && !stick)
		{
			for(var oo:int=0; oo < playerControllers.Length; oo++)
			{
				var controllerNum11:OuyaSDK.OuyaPlayer = (oo+1);
				
				if(InputManager.GetButton("Acceleration", controllerNum11) && !stick)
				{
					Controller1Btn.hidden = true;
					Controller1BtnSelected.hidden = false;
					pressOBtn.hidden=true;
					Debug.Log("" + controllerNum11);
					loader.Players[0] = controllerNum11;
					stickInTheWay();
				}
					
			}
			
		}
		
		if(  InputManager.GetButton("SkipLeft", playerName) && settingsArea && !stick) // hit the left bumper to return
			{
			//returns to main menu
			stickInTheWay();
			HideSettings();
			ShowMainMenu();
			startingLocation=true;
			customizeLocation=false;
			riverLocation=false;
			settingsArea=false;
			}
			
		
		}
		else
		{
		
				
				if(!WW3DUnlockedSelected.hidden && ControlsSelected.hidden && !stick)// campaign is selected
				{
					if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)//  InputManager.GetButton("DDown", playerName)&& !stick)
					{
					
					WW3DUnlockedSelected.hidden = true;
					WW3DUnlocked.hidden=false;
					PracticeBtnSelected.hidden=false;
					PracticeBtn.hidden=true;
					stickInTheWay();
					Debug.Log("pressed btn");
					}
					else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick)//  InputManager.GetButton("DUp", playerName)&& !stick)
					{
					WW3DUnlockedSelected.hidden = true;
					WW3DUnlocked.hidden=false;
					ControlsSelected.hidden=false;
					Controls.hidden=true;
					stickInTheWay();
					Debug.Log("pressed btn");
					}
					else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
					{
				
					loader.jCommander.GetProducts();
					Debug.Log("pressed btn");
					stickInTheWay();
					
					}
				
				}
			else if(!PracticeBtnSelected.hidden &&  ControlsSelected.hidden && !stick)// practice is selected
				{
					if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
					{
					
					PracticeBtnSelected.hidden = true;
					PracticeBtn.hidden=false;
					ControlsSelected.hidden=false;
					Controls.hidden=true;
					stickInTheWay();
					}
					else if(  InputManager.GetButton("DUp", playerName)&& !stick  ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
					{
					WW3DUnlockedSelected.hidden=false;
					WW3DUnlocked.hidden=false;
					PracticeBtnSelected.hidden=true;
					PracticeBtn.hidden=false;
					stickInTheWay();
					}
					else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
					{
					//jump to character customizer
			
					startingLocation=false;
					customizeLocation=true;
					riverLocation=false;
					multiPlayerSelect=false;
					PlayerPrefs.SetInt("NumberOfPlayers",1);
					PlayerPrefs.SetInt("PracticeMode",2);
					PlayerPrefs.SetInt("MultiMode",0);
					stickInTheWay();
					ClearMainMenu();
					ShowCustomizationMenu();
					
					}
				
				}
				else if(!ControlsSelected.hidden && PracticeBtnSelected.hidden  && !stick)// start game is selected
				{
				
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			WW3DUnlockedSelected.hidden = false;
			WW3DUnlocked.hidden=true;
			ControlsSelected.hidden=true;
			Controls.hidden=false;
			stickInTheWay();
			
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			
			PracticeBtnSelected.hidden = false;
			PracticeBtn.hidden=true;
			ControlsSelected.hidden=true;
			Controls.hidden=false;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			
			//check what controls are set as #1 or #2 and then unhide accordingly.
			
			
			
					ControlsScheme.hidden = false;
					//hide it all
					
					stickInTheWay();
							WW3DUnlocked.hidden=true;
					WW3DUnlockedSelected.hidden=true;
					PracticeBtnSelected.hidden = true;
					PracticeBtn.hidden = true;
					ControlsSelected.hidden=true;
					Controls.hidden=true;
				
			
			stickInTheWay();
			
			}
		
		}
		
		
		else if(!ControlsScheme.hidden &&   InputManager.GetButton("Exit", playerName) && ControlsSelected.hidden && Controls.hidden && !stick )
		{
		//controls being shown------------------------------------
			
			ControlsScheme.hidden = true;
			
			WW3DUnlockedSelected.hidden = true;
			WW3DUnlocked.hidden=false;
			PracticeBtn.hidden = false;
			ControlsSelected.hidden=false;
			Controls.hidden=true;
			stickInTheWay();
		}
		
				
		
		}
		
		
		
	}
	else if(customizeLocation && creditsText.hidden)
	{
			
			if(!CharacterBtnSelected.hidden && HelmetBtnSelected.hidden && DecalBtnSelected.hidden && !stick)// practice is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			CharacterBtn.hidden=false;
			CharacterBtnSelected.hidden=true;
			HelmetBtnSelected.hidden=false;
			HelmetBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName)<- 0.8 && !stick )
			{
			CharacterBtn.hidden=false;
			CharacterBtnSelected.hidden=true;
			DecalBtnSelected.hidden=false;
			DecalBtn.hidden=true;
			
			stickInTheWay();
			}// InputManager.GetButton("DLeft", playerName)
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick  ) //Roll
			{
			//toggle characters to left
			characterBuilder.LoadCharacter(false, isPlayer);
			stickInTheWay();
			}
			else if(InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//toggle characters to right
			stickInTheWay();
			characterBuilder.LoadCharacter(true, isPlayer);
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			}
		
		}
		else if(!HelmetBtnSelected.hidden && SkinToneBtnSelected.hidden && CharacterBtnSelected.hidden && !stick)// practice is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			HelmetBtn.hidden=false;
			HelmetBtnSelected.hidden=true;
			SkinToneBtnSelected.hidden=false;
			SkinToneBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			HelmetBtn.hidden=false;
			HelmetBtnSelected.hidden=true;
			CharacterBtnSelected.hidden=false;
			CharacterBtn.hidden=true;
			
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//toggle characters to left
			stickInTheWay();
			characterBuilder.SwapHelmet(false, isPlayer);
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//toggle characters to right
			stickInTheWay();
			characterBuilder.SwapHelmet(true, isPlayer);
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			}
		
		}
		else if(!SkinToneBtnSelected.hidden && HairBtnSelected.hidden && HelmetBtnSelected.hidden && !stick)// practice is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			SkinToneBtn.hidden=false;
			SkinToneBtnSelected.hidden=true;
			HairBtnSelected.hidden=false;
			HairBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			SkinToneBtn.hidden=false;
			SkinToneBtnSelected.hidden=true;
			HelmetBtnSelected.hidden=false;
			HelmetBtn.hidden=true;
			
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//toggle characters to left
			stickInTheWay();
			characterBuilder.SwapSkin(false, isPlayer);
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//toggle characters to right
			stickInTheWay();
			characterBuilder.SwapSkin(true, isPlayer);
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			}
		
		}
		else if(!HairBtnSelected.hidden && FaceBtnSelected.hidden && SkinToneBtnSelected.hidden && !stick)// practice is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			HairBtn.hidden=false;
			HairBtnSelected.hidden=true;
			FaceBtnSelected.hidden=false;
			FaceBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			HairBtn.hidden=false;
			HairBtnSelected.hidden=true;
			SkinToneBtnSelected.hidden=false;
			SkinToneBtn.hidden=true;
			
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName)> 0.8 && !stick )
			{
			//toggle characters to left
			stickInTheWay();
			characterBuilder.SwapHair(false, isPlayer);
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//toggle characters to right
			stickInTheWay();
			characterBuilder.SwapHair(true, isPlayer);
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			}
		
		}
		else if(!FaceBtnSelected.hidden && LifeJacketBtnSelected.hidden && HairBtnSelected.hidden && !stick)// EYES
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			FaceBtn.hidden=false;
			FaceBtnSelected.hidden=true;
			GlassesBtnSelected.hidden=false;
			GlassesBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			FaceBtn.hidden=false;
			FaceBtnSelected.hidden=true;
			HairBtnSelected.hidden=false;
			HairBtn.hidden=true;
			
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//toggle characters to left
			stickInTheWay();
			characterBuilder.SwapEyes(false, isPlayer);
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//toggle characters to right
			stickInTheWay();
			characterBuilder.SwapEyes(true, isPlayer);
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			}
		
		}
		else if(!GlassesBtnSelected.hidden && FaceBtnSelected.hidden && HairBtnSelected.hidden && !stick)// EYES
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			GlassesBtn.hidden=false;
			GlassesBtnSelected.hidden=true;
			FeaturesBtnSelected.hidden=false;
			FeaturesBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			GlassesBtn.hidden=false;
			GlassesBtnSelected.hidden=true;
			FaceBtnSelected.hidden=false;
			FaceBtn.hidden=true;
			
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//toggle characters to left
			stickInTheWay();
			characterBuilder.SwapEyesX(false, isPlayer);
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//toggle characters to right
			stickInTheWay();
			characterBuilder.SwapEyesX(true, isPlayer);
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			}
		
		}
		else if(!FeaturesBtnSelected.hidden && GlassesBtnSelected.hidden && HairBtnSelected.hidden && !stick)// EYES
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			FeaturesBtn.hidden=false;
			FeaturesBtnSelected.hidden=true;
			LifeJacketBtnSelected.hidden=false;
			LifeJacketBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			FeaturesBtn.hidden=false;
			FeaturesBtnSelected.hidden=true;
			GlassesBtnSelected.hidden=false;
			GlassesBtn.hidden=true;
			
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//toggle characters to left
			stickInTheWay();
			characterBuilder.SwapFeatures(false, isPlayer);
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//toggle characters to right
			stickInTheWay();
			characterBuilder.SwapFeatures(true, isPlayer);
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			}
		
		}
		else if(!LifeJacketBtnSelected.hidden && ShirtBtnSelected.hidden && FeaturesBtnSelected.hidden && !stick)// practice is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			LifeJacketBtn.hidden=false;
			LifeJacketBtnSelected.hidden=true;
			ShirtBtnSelected.hidden=false;
			ShirtBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			LifeJacketBtn.hidden=false;
			LifeJacketBtnSelected.hidden=true;
			FeaturesBtnSelected.hidden=false;
			FeaturesBtn.hidden=true;
			
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//toggle characters to left
			stickInTheWay();
			characterBuilder.SwapLifeJacket(false, isPlayer);
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//toggle characters to right
			stickInTheWay();
			characterBuilder.SwapLifeJacket(true, isPlayer);
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			}
		
		}
		else if(!ShirtBtnSelected.hidden && GlassesBtnSelected.hidden && HairBtnSelected.hidden && !stick)// EYES
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			ShirtBtn.hidden=false;
			ShirtBtnSelected.hidden=true;
			ShortsBtnSelected.hidden=false;
			ShortsBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			ShirtBtn.hidden=false;
			ShirtBtnSelected.hidden=true;
			LifeJacketBtnSelected.hidden=false;
			LifeJacketBtn.hidden=true;
			
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//toggle characters to left
			stickInTheWay();
			characterBuilder.SwapShirt(false, isPlayer);
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//toggle characters to right
			stickInTheWay();
			characterBuilder.SwapShirt(true, isPlayer);
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			}
		
		}
		else if(!ShortsBtnSelected.hidden && KayakBtnSelected.hidden && ShirtBtnSelected.hidden && !stick)// practice is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			ShortsBtn.hidden=false;
			ShortsBtnSelected.hidden=true;
			KayakBtnSelected.hidden=false;
			KayakBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			ShortsBtn.hidden=false;
			ShortsBtnSelected.hidden=true;
			ShirtBtnSelected.hidden=false;
			ShirtBtn.hidden=true;
			
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//toggle characters to left
			stickInTheWay();
			characterBuilder.SwapShorts(false, isPlayer);
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//toggle characters to right
			stickInTheWay();
			characterBuilder.SwapShorts(true, isPlayer);
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			}
		
		}
		else if(!ColorBtnSelected.hidden && DesignBtnSelected.hidden && KayakBtnSelected.hidden && !stick)// practice is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			ColorBtn.hidden=false;
			ColorBtnSelected.hidden=true;
			DesignBtnSelected.hidden=false;
			DesignBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			ColorBtn.hidden=false;
			ColorBtnSelected.hidden=true;
			KayakBtnSelected.hidden=false;
			KayakBtn.hidden=true;
			
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//toggle characters to left
			kayakBuilder.SwapColor(false, isPlayer);
			stickInTheWay();
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName)<- 0.8 && !stick )
			{
			//toggle characters to right
			stickInTheWay();
			kayakBuilder.SwapColor(true, isPlayer);
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			}
		
		}
		else if(!DesignBtnSelected.hidden && DecalBtnSelected.hidden && ColorBtnSelected.hidden && !stick)// practice is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			DesignBtn.hidden=false;
			DesignBtnSelected.hidden=true;
			DecalBtnSelected.hidden=false;
			DecalBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			DesignBtn.hidden=false;
			DesignBtnSelected.hidden=true;
			ColorBtnSelected.hidden=false;
			ColorBtn.hidden=true;
			
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//toggle characters to left
			stickInTheWay();
			kayakBuilder.SwapDesign(false, isPlayer);
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//toggle characters to right
			stickInTheWay();
			kayakBuilder.SwapDesign(true, isPlayer);
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			}
		
		}
		else if(!DecalBtnSelected.hidden && ReturnBtnSelected.hidden && DesignBtnSelected.hidden && !stick)// practice is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			DecalBtn.hidden=false;
			DecalBtnSelected.hidden=true;
			NameBoxSelected.hidden=false;
			NameBox.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName)<- 0.8 && !stick )
			{
			DecalBtn.hidden=false;
			DecalBtnSelected.hidden=true;
			DesignBtnSelected.hidden=false;
			DesignBtn.hidden=true;
			
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//toggle characters to left
			stickInTheWay();
			kayakBuilder.SwapDecal(false, isPlayer);
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//toggle characters to right
			stickInTheWay();
			kayakBuilder.SwapDecal(true, isPlayer);
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			}
		
		}

		else if(!NameBoxSelected.hidden && KayakBtnSelected.hidden && DecalBtnSelected.hidden && !stick)// practice is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			NameBox.hidden=false;
			NameBoxSelected.hidden=true;
			CharacterBtnSelected.hidden=false;
			CharacterBtn.hidden=true;
			characterBuilder.typingName=false;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			NameBox.hidden=false;
			NameBoxSelected.hidden=true;
			DecalBtnSelected.hidden=false;
			DecalBtn.hidden=true;
			characterBuilder.typingName=false;
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//Jump to Delete Button
			NameBox.hidden=false;
			NameBoxSelected.hidden=true;
			CharacterBtnSelected.hidden=false;
			CharacterBtn.hidden=true;
			characterBuilder.typingName=false;
			stickInTheWay();
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//Jump to Continue Button
			NameBox.hidden=false;
			NameBoxSelected.hidden=true;
			DecalBtnSelected.hidden=false;
			DecalBtn.hidden=true;
			characterBuilder.typingName=false;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//input name here, activates the keyboard to type in name
			
			stickInTheWay();
			characterBuilder.InputName();
			
			}
		
		}
		else if(!KayakBtnSelected.hidden && ColorBtnSelected.hidden && ShortsBtnSelected.hidden && !stick)// practice is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			KayakBtn.hidden=false;
			KayakBtnSelected.hidden=true;
			ColorBtnSelected.hidden=false;
			ColorBtn.hidden=true;
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{
			KayakBtn.hidden=false;
			KayakBtnSelected.hidden=true;
			ShortsBtnSelected.hidden=false;
			ShortsBtn.hidden=true;
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//cycles through the kayaks 
			kayakBuilder.SwapKayak(false, isPlayer);
			stickInTheWay();
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick )
			{
			//cycles through the kayaks 
			kayakBuilder.SwapKayak(true, isPlayer);
			stickInTheWay();
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//does this do anything?
			
			}
		
		}

		
		if(  InputManager.GetButton("Option", playerName)&& !stick)
			{
			//Deletes current character if it has been saved
			stickInTheWay();
			characterBuilder.DeleteCharacter(charName.text, playerName);
			
			}
		else if(  InputManager.GetButton("Orbit", playerName)&& !stick)
			{
			//input name here, activates the keyboard to type in name
			stickInTheWay();
			characterBuilder.SaveCharacter(charName.text);
			
			}
		
		else if(  InputManager.GetButton("SkipLeft", playerName)&& !stick) // hit the left bumper to return
			{
			//returns to main menu
			stickInTheWay();
			HideCustomizationMenu();
			ShowMainMenu();
			startingLocation=true;
			customizeLocation=false;
			riverLocation=false;
			}
		else if(  InputManager.GetButton("SkipRight", playerName)&& !stick) // hit the left bumper to return
			{
			characterBuilder.SaveCharMap(isPlayer);
			//here we check if there are more than 1 player and if so we reload the customization page and place player 2 name, change player to 2 etc
			Debug.Log("double hit?");
			stickInTheWay();
			if(isPlayer==1 && playerNum > 1)
			{
			//here we reload char customization and set to player 2
			kayakBuilder.SaveKayak(isPlayer,true);
			characterBuilder.SaveCharSelection(1);
			
			isPlayer = 2;
			characterBuilder.ChangePlayer(2);
			HideCustomizationMenu();
			playerNumberTxt.clear();
			playerNumberTxt.text = "Player 2";
			ShowCustomizationMenu();
			}
			else if(isPlayer==2 && playerNum > 2)
			{
			//here we reload char customization and set to player 3
			kayakBuilder.SaveKayak(isPlayer,true);
			characterBuilder.SaveCharSelection(2);
			
			isPlayer=3;
			characterBuilder.ChangePlayer(3);
			HideCustomizationMenu();
			playerNumberTxt.clear();
			playerNumberTxt.text = "Player 3";
			ShowCustomizationMenu();
			}
			else if(isPlayer==3 && playerNum > 3)
			{
			//here we reload char customization and set to player 4
			kayakBuilder.SaveKayak(isPlayer,true);
			characterBuilder.SaveCharSelection(3);
			
			isPlayer=4;
			characterBuilder.ChangePlayer(4);
			HideCustomizationMenu();
			playerNumberTxt.clear();
			playerNumberTxt.text = "Player 4";
			ShowCustomizationMenu();
			}
			else 
			{
			
			if(isPlayer ==1)
			{
			kayakBuilder.SaveKayak(isPlayer,false);
			
			}
			characterBuilder.SaveCharSelection(isPlayer);
			startingLocation=false;
			customizeLocation=false;
			multiPlayerSelect=false;
			HideCustomizationMenu();
			//Here we continue on
				if(PlayerPrefs.GetInt("PracticeMode")==2)
				{
					stickInTheWay();
					LoadRiverRandom();
				}
				else
				{
					stickInTheWay();
					riverLocation=true;
					ShowRiverSelectMenu();
				}
			}
			}
	}
	else if(riverLocation && creditsText.hidden)
	{
	
		if(!RiverSwapVertical.hidden && ContinueBtnSelected.hidden && !stick)// practice is selected
		{
			if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{

			Debug.Log("swap down river");
			SwapRiver("Down");
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
			{

			Debug.Log("swap up river");
			SwapRiver("Up");
			stickInTheWay();
			}
			else if( InputManager.GetButton("DLeft", playerName)&& !stick   || InputManager.GetAxis("Roll", playerName) <- 0.8 && !stick  )
			{
			//Debug.Log("left press");
			//Jump to Delete Button
			}
			else if( InputManager.GetButton("DRight", playerName)&& !stick    || InputManager.GetAxis("Roll", playerName) > 0.8 && !stick )
			{
			//	Debug.Log("right press");
			//Jump to Continue Button

			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//input name here, activates the keyboard to type in name
			stickInTheWay();
			LoadRiver();
			
			
			
			}
			else if(  InputManager.GetButton("SkipLeft", playerName)&& !stick) // hit the left bumper to return
			{
			stickInTheWay();
			startingLocation=false;
			customizeLocation=true;
			riverLocation=false;
			multiPlayerSelect=false;
			ShowCustomizationMenu();
			//Here we continue on
			HideRiverSelectMenu();
			}
			else if(InputManager.GetButton("Orbit", playerName)&& !stick && !NightModeBtn.hidden)
			{
				stickInTheWay();
			onTouchNightModeBtn();
			}
			
		
		}
		
		if(!SpeedBar.hidden)
		{
			SpeedBar.hidden=true;
			AccelerationBar.hidden=true;
			TrackingBar.hidden=true;
			ManeuverBar.hidden=true;
			DragBar.hidden=true;
		}
	
	
	
	}
	else if(multiPlayerSelect && creditsText.hidden )
	{
		
		
		 if(!Player2BtnSelected.hidden && !stick && Controller1Btn.hidden)
		{
			if(  InputManager.GetButton("DDown", playerName)&& !stick|| InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			
				
			if(playerNum > 2)
				{
				Player2Btn.hidden=false;
				Player2BtnSelected.hidden=true;
				Player3BtnSelected.hidden=false;
				Player3Btn.hidden=true;
				}
				else
				{
				
				}
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick)
			{
				if(playerNum > 3)
				{
				//jump to btn 4
					Player2Btn.hidden=false;
					Player2BtnSelected.hidden=true;
					Player4BtnSelected.hidden=false;
					Player4Btn.hidden=true;
					
				}
				else if(playerNum > 2)
				{
				//jump to btn 3
					Player2Btn.hidden=false;
					Player2BtnSelected.hidden=true;
					Player3BtnSelected.hidden=false;
					Player3Btn.hidden=true;
				}
				else{
				//nothing
				}
				stickInTheWay();
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//input name here, activates the keyboard to type in name
			stickInTheWay();
			startingLocation=false;
			//customizeLocation=true;
			riverLocation=false;
			//multiPlayerSelect=false;
			PlayerPrefs.SetInt("NumberOfPlayers",2);//set to 2 player
			HideMultiSelect();
			ShowControllerSelect(2);
			
			}
		
		}
		else if(!Player3BtnSelected.hidden && !stick && Controller1Btn.hidden)
		{
			if(  InputManager.GetButton("DDown", playerName)&& !stick || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			
			Player3Btn.hidden=false;
			Player3BtnSelected.hidden=true;
				if(playerNum > 3)
				{
				
				Player4BtnSelected.hidden=false;
				Player4Btn.hidden=true;
				}
				else
				{
				Player2BtnSelected.hidden=false;
				Player2Btn.hidden=true;
				}
				
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick)
			{
				Player3Btn.hidden=false;
				Player3BtnSelected.hidden=true;
				
					
					Player2BtnSelected.hidden=false;
					Player2Btn.hidden=true;
					stickInTheWay();
				
		
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//input name here, activates the keyboard to type in name
			stickInTheWay();
			startingLocation=false;
			//customizeLocation=true;
			riverLocation=false;
			//multiPlayerSelect=false;
			PlayerPrefs.SetInt("NumberOfPlayers",3);//set to 2 player
			HideMultiSelect();
			ShowControllerSelect(3);
			//ShowCustomizationMenu();
			
			}
		
		}
		else if(!Player4BtnSelected.hidden && !stick && Controller1Btn.hidden)
		{
			if(  InputManager.GetButton("DDown", playerName)&& !stick || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
			{
			Player4Btn.hidden=false;
			Player4BtnSelected.hidden=true;
			
				
				Player2BtnSelected.hidden=false;
				Player2Btn.hidden=true;
				
				
			stickInTheWay();
			}
			else if(  InputManager.GetButton("DUp", playerName)&& !stick ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick)
			{
				Player4Btn.hidden=false;
				Player4BtnSelected.hidden=true;
				
					
					Player3BtnSelected.hidden=false;
					Player3Btn.hidden=true;
					stickInTheWay();
				
		
			}
			else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
			{
			//input name here, activates the keyboard to type in name
			stickInTheWay();
			startingLocation=false;
			//customizeLocation=true;
			riverLocation=false;
			//multiPlayerSelect=false;
			PlayerPrefs.SetInt("NumberOfPlayers",4);//set to 2 player
			HideMultiSelect();
			
			ShowControllerSelect(4);
			//ShowCustomizationMenu();
			
			}
		
		}
		
		else if(CoOpBtn.hidden && !PvpBtn.hidden  && !stick)
		{
						if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
							{
							CoOpBtn.hidden=false;
							CoOpBtnSelected.hidden=true;
							PvpBtnSelected.hidden=false;
							PvpBtn.hidden=true;
							stickInTheWay();
							}
							else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
							{
							CoOpBtn.hidden=false;
							CoOpBtnSelected.hidden=true;
							PvpBtnSelected.hidden=false;
							PvpBtn.hidden=true;
							
							stickInTheWay();
							}
							
							else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
							{
							//This triggers co-op mode
							HideMultiChoice();
							ShowCustomizationMenu();
							customizeLocation=true;
							multiPlayerSelect=false;
							
							PlayerPrefs.SetInt("MultiMode",1);
							stickInTheWay();
							}
		}
		else if(CoOpBtnSelected.hidden && !PvpBtnSelected.hidden   && !stick)
		{
							if(InputManager.GetButton("DDown", playerName)&& !stick   || InputManager.GetAxis("Vertical", playerName) > 0.8 && !stick)
							{
							CoOpBtn.hidden=true;
							CoOpBtnSelected.hidden=false;
							PvpBtnSelected.hidden=true;
							PvpBtn.hidden=false;
							stickInTheWay();
							}
							else if(  InputManager.GetButton("DUp", playerName)&& !stick    ||  InputManager.GetAxis("Vertical", playerName) <- 0.8 && !stick )
							{
							CoOpBtn.hidden=true;
							CoOpBtnSelected.hidden=false;
							PvpBtnSelected.hidden=true;
							PvpBtn.hidden=false;
							
							stickInTheWay();
							}
							
							else if(  InputManager.GetButton("Acceleration", playerName)&& !stick)
							{
							//This triggers PVP mode
							HideMultiChoice();
							ShowCustomizationMenu();
							customizeLocation=true;
							multiPlayerSelect=false;
							
							PlayerPrefs.SetInt("MultiMode",2);
							stickInTheWay();
							}
		}
		else if(Player2BtnSelected.hidden && !stick && Controller1Btn.hidden && Controller2Btn.hidden && Controller3Btn.hidden && Controller4Btn.hidden  && ControlsScheme.hidden)
		{
			stickInTheWay();
			
			Controller1BtnSelected.hidden = true;
			Controller2BtnSelected.hidden = true;
			Controller3BtnSelected.hidden = true;
			Controller4BtnSelected.hidden = true;
			
			Debug.Log("heya");
			
			ShowMultiChoice();
		
			
		}
		
		
		  if(!Controller1Btn.hidden && !stick)
		{
			for(var co:int=0; co < playerControllers.Length; co++)
			{
				var controllerNumO:OuyaSDK.OuyaPlayer = (co+1);
				
				if(InputManager.GetButton("Acceleration", controllerNumO) && !stick)
				{
					Controller1Btn.hidden = true;
					Controller1BtnSelected.hidden = false;
					pressOBtn.hidden=true;
					Debug.Log("" + controllerNumO);
					loader.Players[0] = controllerNumO;
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
	
	//---------------------------START BTN-----------------------------
	
		if(InputManager.GetButton("StartBtn", playerName)&& !stick)
		{
		stickInTheWay();
		 ShowCredits();
		}
		//PauseMenu();
       
      
       
			
//-------------------------------------------			
	if(Time.timeSinceLevelLoad > 2 )
	{
	
				
	 	   minutes  = loader.TimeRemaining / 60;
		   seconds = loader.TimeRemaining % 60;
		  
		
		   countDownTimer = String.Format ("{0:00}:{1:00}", minutes, seconds);  	    	   
 	   	   
 	   	   CountDownTimer.text = "Trial " + countDownTimer; 
 	   	   
 	 	
 	 
 	    						if(loader.TimeRemaining<0.5 &&  !CountDownTimer.hidden)
 	    						{
 	    						CountDownTimer.hidden=true;
 	    						}   						
											
}	}
	
	
	
	function stickInTheWay()
	{
	if(!stick)
	{
		stick=true;
		audio.clip = buttonSound;
		audio.Play();
		yield WaitForSeconds(0.2);
		stick=false;
	//	Debug.Log("stick");
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
	
	
	
	
	
	function ShowMainMenu()
	{
	//on scene start we animate the menu in

	if(loader.WW3DIsUnlocked)
	{
		
		CampaignBtn.hidden=true;
		CampaignBtnSelected.hidden=false;
		
		MultiplayerBtnSelected.hidden=true;
		MultiplayerBtn.hidden=false;
		
		
			if(PlayerPrefs.GetInt("StartCount")<2 && PlayerPrefs.GetString("WW3DPurchased") != "ofCourseIBoughtIt" && !loader.isMobile && !loader.isTest)
			{
				FirstPurchaseBtn.hidden=false;
				FirstPurchaseBtn.positionTo( 1f, FirstPurchaseBtn.localPosition + Vector3(Screen.width*-0.35,0,0), Easing.Quartic.easeInOut );
			}
		
		CampaignBtn.positionTo( 1f, CampaignBtn.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
		CampaignBtnSelected.positionTo( 1f, CampaignBtn.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
		
		
		MultiplayerBtn.positionTo( 1f, MultiplayerBtn.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
		MultiplayerBtnSelected.positionTo( 1f, MultiplayerBtnSelected.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
		
	}
	else
	{
	WW3DUnlocked.hidden=true;
	WW3DUnlockedSelected.hidden=false;
	
	WW3DUnlocked.positionTo( 1f, WW3DUnlocked.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	WW3DUnlockedSelected.positionTo( 1f, WW3DUnlockedSelected.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	
	
	}
	
	
	PracticeBtn.hidden=false;
	Controls.hidden=false;
	
	PracticeBtnSelected.hidden=true;
	ControlsSelected.hidden=true;
	
	
	PracticeBtn.positionTo( 1f, PracticeBtn.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	PracticeBtnSelected.positionTo( 1f, PracticeBtnSelected.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	
	Controls.positionTo( 1f, Controls.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
	ControlsSelected.positionTo( 1f, ControlsSelected.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
	
	
	
	}
	
function ClearMainMenu()
	{
	//on change of menu we animate the menu pieces out for the main menu
	if(loader.WW3DIsUnlocked)
	{
	
	CampaignBtn.positionTo( 1f, CampaignBtn.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
	CampaignBtnSelected.positionTo( 1f, CampaignBtn.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
	
	
	MultiplayerBtn.positionTo( 1f, MultiplayerBtn.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	MultiplayerBtnSelected.positionTo( 1f, MultiplayerBtnSelected.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	
	}
	else
	{
	
	WW3DUnlocked.positionTo( 1f, WW3DUnlocked.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	WW3DUnlockedSelected.positionTo( 1f, WW3DUnlockedSelected.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	
	}
	

	PracticeBtn.positionTo( 1f, PracticeBtn.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
	PracticeBtnSelected.positionTo( 1f, PracticeBtnSelected.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
	
	Controls.positionTo( 1f, Controls.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	ControlsSelected.positionTo( 1f, ControlsSelected.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	
	
	yield WaitForSeconds(1);
	
	if(loader.WW3DIsUnlocked)
	{
	
	CampaignBtn.hidden=true;
	MultiplayerBtn.hidden=true;
	CampaignBtnSelected.hidden=true;
	MultiplayerBtnSelected.hidden=true;
	}
	else
	{
	WW3DUnlocked.hidden=true;
	WW3DUnlockedSelected.hidden=true;
	}
	
	PracticeBtn.hidden=true;
	Controls.hidden=true;
	
	
	PracticeBtnSelected.hidden=true;
	ControlsSelected.hidden=true;
	}
	
function ShowCustomizationMenu()
	{
	
	
	
	

	
	yield WaitForSeconds(1);
	//characterBuilder.LoadCharacter(true,1);
	CharacterBtn.positionFromTopLeft(-0.18f,0.045f);
	CharacterBtnSelected.positionFromTopLeft(-0.18f,0.045f);
	KayakBtn.positionFromTopLeft(0.6f,-0.37f);
	KayakBtnSelected.positionFromTopLeft(0.6f,-0.37f);
	ContinueBtn.positionFromBottomRight(0.025f,-0.175f);
	ContinueBtnSelected.positionFromBottomRight(0.025f,-0.175f);
	SaveBtn.positionFromBottomLeft(0.018f,-0.205f);
	SaveBtnSelected.positionFromBottomLeft(0.018f,-0.205f);
	DeleteBtn.positionFromBottomRight(0.018f,-0.205f);
	DeleteBtnSelected.positionFromBottomRight(0.018f,-0.205f);
	ReturnBtn.positionFromBottomLeft(0.025f,-0.175f);
	ReturnBtnSelected.positionFromBottomLeft(0.025f,-0.175f);
	HelmetBtn.positionFromTopLeft(0.15f,-0.2f);
	HelmetBtnSelected.positionFromTopLeft(0.15f,-0.2f);
	SkinToneBtn.positionFromTopLeft(0.2f,-0.2f);
	SkinToneBtnSelected.positionFromTopLeft(0.2f,-0.2f);
	HairBtn.positionFromTopLeft(0.25f,-0.2f);
	HairBtnSelected.positionFromTopLeft(0.25f,-0.2f);
	FaceBtn.positionFromTopLeft(0.3f,-0.2f);
	FaceBtnSelected.positionFromTopLeft(0.3f,-0.2f);
	GlassesBtn.positionFromTopLeft(0.35f,-0.2f);
	GlassesBtnSelected.positionFromTopLeft(0.35f,-0.2f);
	FeaturesBtn.positionFromTopLeft(0.4f,-0.2f);
	FeaturesBtnSelected.positionFromTopLeft(0.4f,-0.2f);
	LifeJacketBtn.positionFromTopLeft(0.45f,-0.2f);
	LifeJacketBtnSelected.positionFromTopLeft(0.45f,-0.2f);
	ShirtBtn.positionFromTopLeft(0.5f,-0.2f);
	ShirtBtnSelected.positionFromTopLeft(0.5f,-0.2f);
	ShortsBtn.positionFromTopLeft(0.55f,-0.2f);
	ShortsBtnSelected.positionFromTopLeft(0.55f,-0.2f);
	NameBox.positionFromCenter(-0.585f,0.0f);
	NameBoxSelected.positionFromCenter(-0.585f,0.00f);
	ColorBtn.positionFromTopLeft(0.7f,-0.2f);
	ColorBtnSelected.positionFromTopLeft(0.7f,-0.2f);
	DesignBtn.positionFromTopLeft(0.75f,-0.2f);
	DesignBtnSelected.positionFromTopLeft(0.75f,-0.2f);
	DecalBtn.positionFromTopLeft(0.8f,-0.2f);
	DecalBtnSelected.positionFromTopLeft(0.8f,-0.2f);
	KayakNameBox.positionFromTopRight(-0.175f,0.045f);
	SpeedBarBG.positionFromTopRight(0.15f,-0.55f);
	AccelerationBarBG.positionFromTopRight(0.22f,-0.55f);
	TrackingBarBG.positionFromTopRight(0.31f,-0.55f);
	ManeuverBarBG.positionFromTopRight(0.38f,-0.55f);
	DragBarBG.positionFromTopRight(0.45f,-0.55f);
riverName.positionFromTopRight(-0.15f,0.1f);
yield WaitForSeconds(0.2);
	
	CharacterBtn.hidden=true;
	CharacterBtnSelected.hidden=false;
	
	CharacterBtn.positionTo( 1f, CharacterBtn.localPosition + Vector3(0,Screen.height*-0.225,0), Easing.Quartic.easeInOut );
	CharacterBtnSelected.positionTo( 1f, CharacterBtnSelected.localPosition + Vector3(0,Screen.height*-0.225,0), Easing.Quartic.easeInOut );

	KayakBtn.hidden=false;
	KayakBtnSelected.hidden=true;
	
	KayakBtn.positionTo( 1f, KayakBtn.localPosition + Vector3(Screen.width*0.415f,0,0), Easing.Quartic.easeInOut );
	KayakBtnSelected.positionTo( 1f, KayakBtnSelected.localPosition + Vector3(Screen.width*0.415f,0,0), Easing.Quartic.easeInOut );

	ContinueBtn.hidden=false;
	ContinueBtnSelected.hidden=true;
	
	ContinueBtn.positionTo( 1f, ContinueBtnSelected.localPosition + Vector3(Screen.width*-0.215,0,0), Easing.Quartic.easeInOut );
	ContinueBtnSelected.positionTo( 1f, ContinueBtnSelected.localPosition + Vector3(Screen.width*-0.215,0,0), Easing.Quartic.easeInOut );

	FaceBtn.hidden=false;
	FaceBtnSelected.hidden=true;
	
	FaceBtn.positionTo( 1f, FaceBtn.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	FaceBtnSelected.positionTo( 1f, FaceBtnSelected.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	
	GlassesBtn.hidden=false;
	GlassesBtnSelected.hidden=true;
	
	GlassesBtn.positionTo( 1f, GlassesBtn.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	GlassesBtnSelected.positionTo( 1f, GlassesBtnSelected.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	
	ShirtBtn.hidden=false;
	ShirtBtnSelected.hidden=true;
	
	ShirtBtn.positionTo( 1f, ShirtBtn.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	ShirtBtnSelected.positionTo( 1f, ShirtBtnSelected.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	
	FeaturesBtn.hidden=false;
	FeaturesBtnSelected.hidden=true;
	
	FeaturesBtn.positionTo( 1f, FeaturesBtn.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	FeaturesBtnSelected.positionTo( 1f, FeaturesBtnSelected.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );

	HairBtn.hidden=false;
	HairBtnSelected.hidden=true;
	
	HairBtn.positionTo( 1f, HairBtn.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	HairBtnSelected.positionTo( 1f, HairBtnSelected.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );

	HelmetBtn.hidden=false;
	HelmetBtnSelected.hidden=true;
	
	HelmetBtn.positionTo( 1f, HelmetBtn.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	HelmetBtnSelected.positionTo( 1f, HelmetBtnSelected.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );

	LifeJacketBtn.hidden=false;
	LifeJacketBtnSelected.hidden=true;
	
	LifeJacketBtn.positionTo( 1f, LifeJacketBtn.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	LifeJacketBtnSelected.positionTo( 1f, LifeJacketBtnSelected.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );

	NameBox.hidden=false;
	NameBoxSelected.hidden=true;
	charName.hidden=false;
	riverName.hidden=false;
	
	KayakNameBox.hidden=false;
	
	SpeedBarBG.hidden=false;
	AccelerationBarBG.hidden=false;
	TrackingBarBG.hidden=false;
	DragBarBG.hidden=false;
	ManeuverBarBG.hidden=false;
	
	SpeedBarBG.positionTo( 1f, SpeedBarBG.localPosition + Vector3(Screen.width*-0.6,0,0), Easing.Quartic.easeInOut );
	AccelerationBarBG.positionTo( 1f, AccelerationBarBG.localPosition + Vector3(Screen.width*-0.6,0,0), Easing.Quartic.easeInOut );
	TrackingBarBG.positionTo( 1f, TrackingBarBG.localPosition + Vector3(Screen.width*-0.6,0,0), Easing.Quartic.easeInOut );
	DragBarBG.positionTo( 1f, DragBarBG.localPosition + Vector3(Screen.width*-0.6,0,0), Easing.Quartic.easeInOut );
	ManeuverBarBG.positionTo( 1f, ManeuverBarBG.localPosition + Vector3(Screen.width*-0.6,0,0), Easing.Quartic.easeInOut );
	
	NameBox.positionTo( 1f, NameBox.localPosition + Vector3(0,Screen.height*-0.1775,1), Easing.Quartic.easeInOut );
	NameBoxSelected.positionTo( 1f, NameBox.localPosition + Vector3(0,Screen.height*-0.1775,0), Easing.Quartic.easeInOut );
	charName.positionTo( 1f, NameBox.localPosition + Vector3(0,Screen.height*-0.1875,0), Easing.Quartic.easeInOut );
	
	riverName.positionTo( 1f, riverName.localPosition + Vector3(0,Screen.height*-0.12,0), Easing.Quartic.easeInOut );
	//riverName.positionFromTopRight(0.0375f,0.11f);
	
	KayakNameBox.positionTo( 1f, KayakNameBox.localPosition + Vector3(0,Screen.height*-0.225,0), Easing.Quartic.easeInOut );

	ReturnBtn.hidden=false;
	ReturnBtnSelected.hidden=true;
	
	ReturnBtn.positionTo( 1f, ReturnBtn.localPosition + Vector3(Screen.width*0.215,0,0), Easing.Quartic.easeInOut);
	ReturnBtnSelected.positionTo( 1f, ReturnBtnSelected.localPosition + Vector3(Screen.width*0.215,0,0), Easing.Quartic.easeInOut );

	ShortsBtn.hidden=false;
	ShortsBtnSelected.hidden=true;
	
	ShortsBtn.positionTo( 1f, ShortsBtn.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	ShortsBtnSelected.positionTo( 1f, ShortsBtnSelected.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );

	ColorBtn.hidden=false;
	ColorBtnSelected.hidden=true;
	
	ColorBtn.positionTo( 1f, ColorBtn.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	ColorBtnSelected.positionTo( 1f, ColorBtnSelected.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );

	DecalBtn.hidden=false;
	DecalBtnSelected.hidden=true;
	
	DecalBtn.positionTo( 1f, DecalBtn.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	DecalBtnSelected.positionTo( 1f, DecalBtnSelected.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	
	DesignBtn.hidden=false;
	DesignBtnSelected.hidden=true;
	
	DesignBtn.positionTo( 1f, DesignBtn.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	DesignBtnSelected.positionTo( 1f, DesignBtnSelected.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );


	SkinToneBtn.hidden=false;
	SkinToneBtnSelected.hidden=true;
	
	SkinToneBtn.positionTo( 1f, SkinToneBtn.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	SkinToneBtnSelected.positionTo( 1f, SkinToneBtnSelected.localPosition + Vector3(Screen.width*0.29,0,0), Easing.Quartic.easeInOut );
	
	DeleteBtn.hidden=false;
	DeleteBtnSelected.hidden=true;
	
	DeleteBtn.positionTo( 1f, DeleteBtn.localPosition + Vector3(Screen.width*-0.455,0,0), Easing.Quartic.easeInOut );
	DeleteBtnSelected.positionTo( 1f, DeleteBtnSelected.localPosition + Vector3(Screen.width*-0.455,0,0), Easing.Quartic.easeInOut );

	SaveBtn.hidden=false;
	SaveBtnSelected.hidden=true;
	
	SaveBtn.positionTo( 1f, SaveBtn.localPosition + Vector3(Screen.width*0.455,0,0), Easing.Quartic.easeInOut );
	SaveBtnSelected.positionTo( 1f, SaveBtnSelected.localPosition + Vector3(Screen.width*0.455,0,0), Easing.Quartic.easeInOut );
	
	playerNumberTxt.hidden=false;
	playerNumberTxt.positionTo( 1f, playerNumberTxt.localPosition + Vector3(0,Screen.height*0.4,0), Easing.Quartic.easeInOut );
	
	yield WaitForSeconds(1.1);
	SpeedBar.hidden=false;
	AccelerationBar.hidden=false;
	ManeuverBar.hidden=false;
	TrackingBar.hidden=false;
	DragBar.hidden=false;
	
	riverName.text  = kayakBuilder.visibleKayak.transform.GetComponent(KayakScript).kayakName;
	riverName.positionFromTopRight(0.06f,0.15f);
	riverName.position.x += riverName.width/2;
	
	}
	
function HideCustomizationMenu()
	{

	SpeedBar.hidden=true;
	AccelerationBar.hidden=true;
	ManeuverBar.hidden=true;
	TrackingBar.hidden=true;
	DragBar.hidden=true;
	
	SpeedBarBG.positionTo( 1f, SpeedBarBG.localPosition + Vector3(Screen.width*0.6,0,0), Easing.Quartic.easeInOut );
	AccelerationBarBG.positionTo( 1f, AccelerationBarBG.localPosition + Vector3(Screen.width*0.6,0,0), Easing.Quartic.easeInOut );
	TrackingBarBG.positionTo( 1f, TrackingBarBG.localPosition + Vector3(Screen.width*0.6,0,0), Easing.Quartic.easeInOut );
	DragBarBG.positionTo( 1f, DragBarBG.localPosition + Vector3(Screen.width*0.6,0,0), Easing.Quartic.easeInOut );
	ManeuverBarBG.positionTo( 1f, ManeuverBarBG.localPosition + Vector3(Screen.width*0.6,0,0), Easing.Quartic.easeInOut );
	
	GlassesBtn.positionTo( 1f, GlassesBtn.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	GlassesBtnSelected.positionTo( 1f, GlassesBtnSelected.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );

	
	ShirtBtn.positionTo( 1f, ShirtBtn.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	ShirtBtnSelected.positionTo( 1f, ShirtBtnSelected.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	
	
	FeaturesBtn.positionTo( 1f, FeaturesBtn.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	FeaturesBtnSelected.positionTo( 1f, FeaturesBtnSelected.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	
	CharacterBtn.positionTo( 1f, CharacterBtn.localPosition + Vector3(0,Screen.height*0.225,0), Easing.Quartic.easeInOut );
	CharacterBtnSelected.positionTo( 1f, CharacterBtnSelected.localPosition + Vector3(0,Screen.height*0.225,0), Easing.Quartic.easeInOut );
	
	KayakNameBox.positionTo( 1f, KayakNameBox.localPosition + Vector3(0,Screen.height*0.225,0), Easing.Quartic.easeInOut );

	KayakBtn.positionTo( 1f, KayakBtn.localPosition + Vector3(Screen.width*-0.415f,0,0), Easing.Quartic.easeInOut );
	KayakBtnSelected.positionTo( 1f, KayakBtnSelected.localPosition + Vector3(Screen.width*-0.415f,0,0), Easing.Quartic.easeInOut );
	
	ContinueBtn.positionTo( 1f, ContinueBtnSelected.localPosition + Vector3(Screen.width*0.215,0,0), Easing.Quartic.easeInOut );
	ContinueBtnSelected.positionTo( 1f, ContinueBtnSelected.localPosition + Vector3(Screen.width*0.215,0,0), Easing.Quartic.easeInOut );
	
	FaceBtn.positionTo( 1f, FaceBtn.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	FaceBtnSelected.positionTo( 1f, FaceBtnSelected.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );

	HairBtn.positionTo( 1f, HairBtn.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	HairBtnSelected.positionTo( 1f, HairBtnSelected.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );

	HelmetBtn.positionTo( 1f, HelmetBtn.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	HelmetBtnSelected.positionTo( 1f, HelmetBtnSelected.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );

	LifeJacketBtn.positionTo( 1f, LifeJacketBtn.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	LifeJacketBtnSelected.positionTo( 1f, LifeJacketBtnSelected.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );

	NameBox.positionTo( 1f, NameBox.localPosition + Vector3(0,Screen.height*0.1775,0), Easing.Quartic.easeInOut );
	NameBoxSelected.positionTo( 1f, NameBox.localPosition + Vector3(0,Screen.height*0.1775,0), Easing.Quartic.easeInOut );
	charName.positionTo( 1f, NameBox.localPosition + Vector3(0,Screen.height*0.1875,0), Easing.Quartic.easeInOut );
	
	riverName.positionTo( 1f, riverName.localPosition + Vector3(0,Screen.height*0.1875,0), Easing.Quartic.easeInOut );
	
	ReturnBtn.positionTo( 1f, ReturnBtn.localPosition + Vector3(Screen.width*-0.215,0,0), Easing.Quartic.easeInOut);
	ReturnBtnSelected.positionTo( 1f, ReturnBtnSelected.localPosition + Vector3(Screen.width*-0.215,0,0), Easing.Quartic.easeInOut );
	
	ShortsBtn.positionTo( 1f, ShortsBtn.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	ShortsBtnSelected.positionTo( 1f, ShortsBtnSelected.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );

	ColorBtn.positionTo( 1f, ColorBtn.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	ColorBtnSelected.positionTo( 1f, ColorBtnSelected.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );


	DecalBtn.positionTo( 1f, DecalBtn.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	DecalBtnSelected.positionTo( 1f, DecalBtnSelected.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	
	DesignBtn.positionTo( 1f, DesignBtn.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	DesignBtnSelected.positionTo( 1f, DesignBtnSelected.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );


	SkinToneBtn.positionTo( 1f, SkinToneBtn.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );
	SkinToneBtnSelected.positionTo( 1f, SkinToneBtnSelected.localPosition + Vector3(Screen.width*-0.29,0,0), Easing.Quartic.easeInOut );

	DeleteBtn.positionTo( 1f, DeleteBtn.localPosition + Vector3(Screen.width*0.455,0,0), Easing.Quartic.easeInOut );
	DeleteBtnSelected.positionTo( 1f, DeleteBtnSelected.localPosition + Vector3(Screen.width*0.455,0,0), Easing.Quartic.easeInOut );

	SaveBtn.positionTo( 1f, SaveBtn.localPosition + Vector3(Screen.width*-0.455,0,0), Easing.Quartic.easeInOut );
	SaveBtnSelected.positionTo( 1f, SaveBtnSelected.localPosition + Vector3(Screen.width*-0.455,0,0), Easing.Quartic.easeInOut );
	
	
	playerNumberTxt.positionTo( 1f, playerNumberTxt.localPosition + Vector3(0,Screen.height*-0.4,0), Easing.Quartic.easeInOut );
	yield WaitForSeconds(1);
	
	KayakNameBox.hidden=true;
	
	riverName.hidden=true;
	
		GlassesBtn.hidden=false;
	GlassesBtnSelected.hidden=true;
		
	ShirtBtn.hidden=false;
	ShirtBtnSelected.hidden=true;
	
	FeaturesBtn.hidden=false;
	FeaturesBtnSelected.hidden=true;
	
	SaveBtn.hidden=true;
	SaveBtnSelected.hidden=true;
	
	DeleteBtn.hidden=true;
	DeleteBtnSelected.hidden=true;
	
	SkinToneBtn.hidden=true;
	SkinToneBtnSelected.hidden=true;
	
	ShortsBtn.hidden=true;
	ShortsBtnSelected.hidden=true;
	
	ColorBtn.hidden=true;
	ColorBtnSelected.hidden=true;
	
	DecalBtn.hidden=true;
	DecalBtnSelected.hidden=true;
	
	DesignBtn.hidden=true;
	DesignBtnSelected.hidden=true;
	
	ReturnBtn.hidden=true;
	ReturnBtnSelected.hidden=true;
	
		NameBox.hidden=true;
	NameBoxSelected.hidden=true;
	charName.hidden=true;
	
		LifeJacketBtn.hidden=true;
	LifeJacketBtnSelected.hidden=true;
	
		HelmetBtn.hidden=true;
	HelmetBtnSelected.hidden=true;
	
	HairBtn.hidden=true;
	HairBtnSelected.hidden=true;
	
		FaceBtn.hidden=true;
	FaceBtnSelected.hidden=true;
	
		ContinueBtn.hidden=true;
	ContinueBtnSelected.hidden=true;
	
		KayakBtn.hidden=true;
	KayakBtnSelected.hidden=true;
	
		CharacterBtn.hidden=true;
	CharacterBtnSelected.hidden=true;
	
	playerNumberTxt.hidden=true;
	}
	
function ShowRiverSelectMenu()
	{
	
	yield WaitForSeconds(1.0);
	
	if(!loader.isMobile)
	{
	}
	else
	{
	}
	RiverSwapVertical.hidden=false;
	
	
	
	ReturnBtn.positionFromBottomLeft(0.025f,-0.175f);
	
	
	riverSetups[currentRiver].GetComponent(RiverSetupItem).ShowRiverMenu();

	RiverSwapVertical.positionTo( 1f, RiverSwapVertical.localPosition + Vector3(Screen.width*0.45,0,0), Easing.Quartic.easeInOut );
	
	
	StartGameBtn.positionFromBottomRight(0.025f,-0.175f);
	
	
	NightModeBtn.positionFromTopRight(0.025f,-0.175f);

	
	ReturnBtn.hidden=false;

	StartGameBtn.hidden=false;
	
	ReturnBtn.positionTo( 1f, ReturnBtn.localPosition + Vector3(Screen.width*0.215,0,0), Easing.Quartic.easeInOut);
	

	StartGameBtn.positionTo( 1f, StartGameBtn.localPosition + Vector3(Screen.width*-0.215,0,0), Easing.Quartic.easeInOut);
	
	if(PlayerPrefs.GetInt("MoonCoinCount") >= 5000)//5000)
	{
	
	NightModeBtn.hidden=false;
	NightModeBtn.positionTo( 1f, NightModeBtn.localPosition + Vector3(Screen.width*-0.215,0,0), Easing.Quartic.easeInOut);
	}
	
	}
	
function HideRiverSelectMenu()
	{
	
RiverSwapVertical.positionTo( 1f, RiverSwapVertical.localPosition + Vector3(Screen.width*-0.45,0,0), Easing.Quartic.easeInOut );

riverSetups[currentRiver].GetComponent(RiverSetupItem).HideRiverMenu();

	
	ReturnBtn.positionTo( 1f, ReturnBtn.localPosition + Vector3(Screen.width*-0.215,0,0), Easing.Quartic.easeInOut);
	

	StartGameBtn.positionTo( 1f, StartGameBtn.localPosition + Vector3(Screen.width*0.215,0,0), Easing.Quartic.easeInOut);
	
	if(!NightModeBtn.hidden)
	{
	NightModeBtn.positionTo( 1f, NightModeBtn.localPosition + Vector3(Screen.width*0.215,0,0), Easing.Quartic.easeInOut);
	}

yield WaitForSeconds(.8);
	
	RiverSwapVertical.hidden=true;
	StartGameBtn.hidden=true;
ReturnBtn.hidden=true;
	ReturnBtnSelected.hidden=true;
	NightModeBtn.hidden=true;
	}	
	

function ShowMultiChoice()
{

	CoOpBtn.hidden=true;
	CoOpBtnSelected.hidden=false;
	PvpBtn.hidden=false;
	PvpBtnSelected.hidden=true;
	
	CoOpBtn.positionFromCenter(-0.1f,-0.7f);
	PvpBtn.positionFromCenter(0.0f, 0.7f);
	

	CoOpBtnSelected.positionFromCenter(-0.1f,-0.7f);
	PvpBtnSelected.positionFromCenter(0.0f, 0.7f);
	

	CoOpBtn.positionTo( 1f, CoOpBtn.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	CoOpBtnSelected.positionTo( 1f, CoOpBtnSelected.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	
	PvpBtn.positionTo( 1f, PvpBtn.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
	PvpBtnSelected.positionTo( 1f, PvpBtnSelected.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
}

function HideMultiChoice()
{

	CoOpBtn.positionTo( 1f, CoOpBtn.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
	CoOpBtnSelected.positionTo( 1f, CoOpBtnSelected.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
	
	PvpBtn.positionTo( 1f, PvpBtn.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	PvpBtnSelected.positionTo( 1f, PvpBtnSelected.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	
	yield WaitForSeconds(1);
	
	CoOpBtn.hidden=true;
	CoOpBtnSelected.hidden=true;
	PvpBtn.hidden=true;
	PvpBtnSelected.hidden=true;
	
	CoOpBtn.positionFromCenter(-0.1f,-0.7f);
	PvpBtn.positionFromCenter(0.0f, 0.7f);
	

	CoOpBtnSelected.positionFromCenter(-0.1f,-0.7f);
	PvpBtnSelected.positionFromCenter(0.0f, 0.7f);
}			
									
function ShowMultiSelect()
{

	if(playerNum>1)
	{
	Player2Btn.hidden=true;
	Player2BtnSelected.hidden=false;
	}
	if(playerNum>2)
	{
	Player3Btn.hidden=false;
	Player3BtnSelected.hidden=true;
	}
	if(playerNum>3)
	{
	Player4Btn.hidden=false;
	Player4BtnSelected.hidden=true;
	}

	Player2Btn.positionFromCenter(-0.1f,-0.7f);
	Player3Btn.positionFromCenter(-0.1f, 0.7f);
	Player4Btn.positionFromCenter(-0.1f,-0.7f);

	Player2BtnSelected.positionFromCenter(-0.1f,-0.7f);
	Player3BtnSelected.positionFromCenter(-0.1f, 0.7f);
	Player4BtnSelected.positionFromCenter(-0.1f,-0.7f);

	Player2Btn.positionTo( 1f, Player2Btn.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	Player2BtnSelected.positionTo( 1f, Player2BtnSelected.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	
	Player3Btn.positionTo( 1f, Player3Btn.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
	Player3BtnSelected.positionTo( 1f, Player3BtnSelected.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
	
	Player4Btn.positionTo( 1f, Player4Btn.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	Player4BtnSelected.positionTo( 1f, Player4BtnSelected.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );

}	

function HideMultiSelect()
{

	
	


	Player2Btn.positionTo( 1f, Player2Btn.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	Player2BtnSelected.positionTo( 1f, Player2BtnSelected.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
	
	Player3Btn.positionTo( 1f, Player3Btn.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );
	Player3BtnSelected.positionTo( 1f, Player3BtnSelected.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	
	Player4Btn.positionTo( 1f, Player4Btn.localPosition + Vector3(Screen.width*0.65,0,0), Easing.Quartic.easeInOut );
	Player4BtnSelected.positionTo( 1f, Player4BtnSelected.localPosition + Vector3(Screen.width*-0.65,0,0), Easing.Quartic.easeInOut );

yield WaitForSeconds(1);

	Player2Btn.hidden=true;
	Player2BtnSelected.hidden=true;
	
	Player3Btn.hidden=true;
	Player3BtnSelected.hidden=true;
	
	Player4Btn.hidden=true;
	Player4BtnSelected.hidden=true;
	
	Player2BtnSelected.positionFromCenter(-0.1f,-0.7f);
	Player3BtnSelected.positionFromCenter(-0.1f, 0.7f);
	Player4BtnSelected.positionFromCenter(-0.1f,-0.7f);
}	
	
function MultiPlayerDetection()
{
//here we scan and see how many controllers are connected
//from there we unhide menu options to select how many players you want to play with
                  
var players:String[] = Input.GetJoystickNames();
playerNum=0;
for (var i:int = 0; i < players.Length || i < 4; i++)
    {
                  
              if (i < players.Length)
              {
                  playerNum+=1;
                  print("player "+ i);
              }

	}
if(playerNum<2) return;
			startingLocation=false;
			customizeLocation=false;
			riverLocation=false;
//Debug.Log(players.ToString());
ClearMainMenu();
yield WaitForSeconds(1);

ShowMultiSelect();
yield WaitForSeconds(0.5);
multiPlayerSelect=true;
}	

function SwapRiver(direction:String)
{
	lastRiver = currentRiver;
	
	if(direction=="Down")
	{
		currentRiver++;
		if(currentRiver > riverSetups.Length-1)
		{
			currentRiver=0;
		}
	}
	else if(direction=="Up")
	{
		currentRiver--;
		if(currentRiver < 0)
		{
			currentRiver = riverSetups.Length-1;
		}
	}
	else
	{
	Debug.Log("ERROR Jason");
	return;
	}
	RiverSwapVertical.positionFromCenter(0.0f,-0.35f);
	RiverSwapVertical.scaleFromTo( 0.3f, new Vector3( 0.2, 0.2, 1 ), new Vector3( 1f, 1f, 1 ), Easing.Bounce.easeOut );
	
	//here we gather the river info
	riverSetups[lastRiver].GetComponent(RiverSetupItem).HideRiverMenu();
	yield WaitForSeconds(1.0);
	riverSetups[currentRiver].GetComponent(RiverSetupItem).ShowRiverMenu();
		//here we do a swap of the info disguised with a POP of the elements
	print("swapped river");
	
	
}

function SwapRiverD(direction:String)
{
	lastRiver = currentRiver;
	
	if(direction=="Down")
	{
		currentRiver++;
		if(currentRiver > riverSetups.Length-1)
		{
			currentRiver=0;
		}
	}
	else if(direction=="Up")
	{
		currentRiver--;
		if(currentRiver < 0)
		{
			currentRiver = riverSetups.Length-1;
		}
	}
	else
	{
	Debug.Log("ERROR Jason");
	return;
	}

	//here we gather the river info
	riverSetups[lastRiver].GetComponent(RiverSetupItem).HideRiverMenu();
	yield WaitForSeconds(1.0);
	riverSetups[currentRiver].GetComponent(RiverSetupItem).ShowRiverMenu();
		//here we do a swap of the info disguised with a POP of the elements
	print("swapped river");
	
	
}


function ShowCredits()
{
	if(!creditsText.hidden)
	{
		creditsText.alphaTo(0.5f,0,Easing.Linear.easeInOut);
		Fader.alphaTo(0.5f,0,Easing.Linear.easeInOut);
		yield WaitForSeconds(0.5f);
		creditsText.hidden=true;
	}
	else
	{
		creditsText.hidden=false;
		creditsText.alphaTo(0.5f,1,Easing.Linear.easeInOut);
		Fader.alphaTo(0.5f,1,Easing.Linear.easeInOut);
		yield WaitForSeconds(0.5f);
		
	}
}


function LoadRiver()
{
	if(!loading && riverSetups[currentRiver].GetComponent(RiverSetupItem).sceneToLoadName != "")
	{
		loading=true;
		//loadriverhere
		Fader.alphaTo(0.5f,1,Easing.Linear.easeInOut);
		var hintString = hint.hint();
		hintText.text = hintString;
		hintText.alphaTo(0.5f,1,Easing.Linear.easeInOut);
		yield WaitForSeconds(1f);
	
		Loading.hidden=false;
		Loading.playSpriteAnimation( "anim", 5 );
		yield WaitForSeconds(1f);
		var river01Load = Application.LoadLevelAsync(riverSetups[currentRiver].GetComponent(RiverSetupItem).sceneToLoadName);
		yield river01Load;
	}
}

function LoadRiverRandom()
{
		PlayerPrefs.SetInt("MultiMode",0);
		var randomNumber = Random.Range(0,riverSetups.Length-1);
		Debug.Log("loading random iver # " + randomNumber);
		var directions:String = "Have fun running the rapids. When your done head back to the main menu and try out the campaign mode!";
		
		PlayerPrefs.SetInt("RiverSetup", 10);  
		PlayerPrefs.SetString("RiverSetupDirections", directions);  
		
		if(!loading && riverSetups[randomNumber].GetComponent(RiverSetupItem).sceneToLoadNameSave != "")
	{
		Debug.Log("loading");
		loading=true;
		var river02Load = Application.LoadLevelAsync("RiverPractice");//riverSetups[randomNumber].GetComponent(RiverSetupItem).sceneToLoadNameSave);
		yield river02Load;
	}
	else
	{
	Debug.Log("help me " + randomNumber + " " + loading);
	}
	
}



function OnCharacterSaved()
{
	CharacterSaved.alphaFromTo(0.1f,1,0, Easing.Linear.easeOut);
	CharacterSaved.hidden=false;
	CharacterSaved.alphaFromTo(0.5f,0,1, Easing.Linear.easeIn);
	yield WaitForSeconds(1.5);
	CharacterSaved.alphaFromTo(0.75f,1,0, Easing.Linear.easeOut);
	yield WaitForSeconds(1.0);
	CharacterSaved.hidden=true;
}



function OnCharacterDeleted()
{
	CharacterDeleted.alphaFromTo(0.1f,1,0, Easing.Linear.easeOut);
	CharacterDeleted.hidden=false;
	CharacterDeleted.alphaFromTo(0.5f,0,1, Easing.Linear.easeIn);
	yield WaitForSeconds(1.5);
	CharacterDeleted.alphaFromTo(0.75f,1,0, Easing.Linear.easeOut);
	yield WaitForSeconds(1.0);
	CharacterDeleted.hidden=true;
}

function OnUnlockItemIcon()
{
	UnlockItemIcon.alphaFromTo(0.1f,1,0, Easing.Linear.easeOut);
	UnlockItemIcon.hidden=false;
	UnlockItemIcon.alphaFromTo(0.5f,0,1, Easing.Linear.easeIn);
	yield WaitForSeconds(1.5);
	UnlockItemIcon.alphaFromTo(0.75f,1,0, Easing.Linear.easeOut);
	yield WaitForSeconds(1.0);
	UnlockItemIcon.hidden=true;
} 



function UnlockRivers():boolean
{

	var RiverPackUnlockNum:int = PlayerPrefs.GetInt("unlockedRiverPack"); // 1= rivers 6-10  // 2 = river 11-15 // 3 = rivers 16-20
	if(RiverPackUnlockNum >= 1)
	{
		
		var riverToStartOn:int = 6;
		var riverToEndOn:int = 0;
			//Debug.Log(RiverPackUnlockNum + " unlocked to");
			switch (RiverPackUnlockNum)
			{
				case 1:
					riverToEndOn = 11;
				//	Debug.Log("here1");
					break;
				case 2:
					riverToEndOn = 16;
				//	Debug.Log("here");
					break;
				case 3:
					riverToEndOn = 20;
					break;
				default:
					print("not  valid river pack #");
					return true;			
			}
	
	
	
			for (var i:int= riverToStartOn; i<riverToEndOn; i++)
			{
				
					if(riverSetupsLocked.Length-1 >= i-riverToStartOn)
					{
					var tempOBJ:Transform = riverSetupsLocked[i-riverToStartOn];
					riverSetups += [tempOBJ];
					}
				
			}
			return true;
	}
	else
	{
	return true;
	}
	


}

function ShowSettings()
{
	
	SoundBtn.hidden=false;
	SoundBtn.positionFromBottomRight(0.5f,-0.25f);
	ReturnBtn.hidden=false;
	ReturnBtn.positionFromBottomLeft(0.025f,-0.175f);
	ReturnBtn.positionTo( 1f, ReturnBtn.localPosition + Vector3(Screen.width*0.215,0,0), Easing.Quartic.easeInOut);

	SoundBtn.positionTo( 1f, SoundBtn.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
}

function HideSettings()
{
	
	//SoundBtn.positionFromBottomRight(0.55f,0.03f);;

	ReturnBtn.positionTo( 1f, ReturnBtn.localPosition + Vector3(Screen.width*-0.215,0,0), Easing.Quartic.easeInOut);
	SoundBtn.positionTo( 1f, SoundBtn.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	yield WaitForSeconds(1.0);
	ReturnBtn.hidden=true;
	SoundBtn.hidden=true;
}


function Error()
{
	
	if(ErrorDisplay.hidden)
	{
	
	ErrorDisplay.alphaFromTo(0.1f,1,0, Easing.Linear.easeOut);
	ErrorDisplay.hidden=false;
	ErrorDisplay.alphaFromTo(0.5f,0,1, Easing.Linear.easeIn);
	yield WaitForSeconds(1.5);
	ErrorDisplay.alphaFromTo(0.75f,1,0, Easing.Linear.easeOut);
	yield WaitForSeconds(1.0);
	ErrorDisplay.hidden=false;
	}
}

function onTouchCampaignBtn()
{
		Debug.Log("touched campaign");

			
			startingLocation=false;
			customizeLocation=true;
			riverLocation=false;
			multiPlayerSelect=false;
			PlayerPrefs.SetInt("NumberOfPlayers",1);
			PlayerPrefs.SetInt("PracticeMode",0);
			PlayerPrefs.SetInt("MultiMode",0);
		
			ClearMainMenu();
			
			ShowCustomizationMenu();
			
}

function onTouchSettingsBtn()
{
		ClearMainMenu();
		ShowSettings();
		settingsArea=true;
}

function onTouchAcheivementsBtn()
{
}


function onTouchContinueBtn()
{
			characterBuilder.SaveCharMap(isPlayer);
			characterBuilder.SaveCharSelection(isPlayer);
			startingLocation=false;
			customizeLocation=false;
			multiPlayerSelect=false;
			HideCustomizationMenu();
			//Here we continue on
			riverLocation=true;
			ShowRiverSelectMenu();
				
}


function onTouchReturnBtn()
{
	
	//returns to main menu
			//stickInTheWay();
			if(!riverLocation && customizeLocation)
			{
			HideCustomizationMenu();
			ShowMainMenu();
			startingLocation=true;
			customizeLocation=false;
			riverLocation=false;
			}
			else if(!customizeLocation && !riverLocation && startingLocation)
			{
			settingsArea=false;
			HideSettings();
			ShowMainMenu();
			startingLocation=true;
			customizeLocation=false;
			riverLocation=false;
			}
			else
			{
			HideRiverSelectMenu();
			ShowCustomizationMenu();
			startingLocation=false;
			customizeLocation=true;
			riverLocation=false;
			}
			
}

function onTouchSaveBtn()
{
	//stickInTheWay();
			characterBuilder.SaveCharacter(charName.text);
}

function onTouchDeleteBtn()
{

	//stickInTheWay();
			characterBuilder.DeleteCharacter(charName.text, playerName);
}

function onTouchNameBox()
{
	//stickInTheWay();
			characterBuilder.InputName();
}

function onTouchColorBtn()
{
	kayakBuilder.SwapColor(true, isPlayer);
}

function onTouchCharacterBtn()
{
	characterBuilder.LoadCharacter(true, playerName);
}

function onTouchKayakBtn()
{
	kayakBuilder.SwapKayak(true, isPlayer);
			//stickInTheWay();
}

function onTouchStartGameBtn()
{
	LoadRiver();
}

function onTouchNightModeBtn()
{
	if(PlayerPrefs.GetInt("dayMode")>1)
	{
	DNCycle.DayMode();
	}
	else
	{
	DNCycle.NightMode();
	}
}

function onTouchHelmetBtn()
{
	characterBuilder.SwapHelmet(true, isPlayer);
}

function onTouchSkinToneBtn()
{
	characterBuilder.SwapSkin(true, isPlayer);
}

function onTouchHairBtn()
{
	characterBuilder.SwapHair(true, isPlayer);
}

function onTouchFaceBtn()
{
	characterBuilder.SwapEyes(true, isPlayer);
}

function onTouchGlassesBtn()
{
	characterBuilder.SwapEyesX(true, isPlayer);
}
function onTouchFeaturesBtn()
{
	characterBuilder.SwapFeatures(true, isPlayer);
}

function onTouchLifeJacketBtn()
{
	characterBuilder.SwapLifeJacket(true, isPlayer);
}

function onTouchShirtBtn()
{
	characterBuilder.SwapShirt(true, isPlayer);
}

function onTouchShortsBtn()
{
	characterBuilder.SwapShorts(true, isPlayer);
}

function onTouchDesignBtn()
{
	kayakBuilder.SwapDesign(true, isPlayer);
}

function onTouchDecalBtn()
{
	kayakBuilder.SwapDecal(true, isPlayer);
}



function onTouchRiverSwapVertical()
{
	SwapRiver("Down");
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
