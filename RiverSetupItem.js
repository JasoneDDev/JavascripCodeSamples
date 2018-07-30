#pragma strict
import UIToolkitNameSpace;



var RiverName:String;
var RiverDescription:String;
var RiverSpeed:int;
var Waterfall:boolean;
var SlopeFall:boolean;
var Stairs:boolean;
var sceneToLoadName:String;
@HideInInspector var sceneToLoadNameSave:String;

var acheive01Description:String;
var acheive02Description:String;
var acheive03Description:String;
var acheive04Description:String;
var acheive05Description:String;

var UnlockKayak=false;



var ItemNumToUnlock:int;

var UnlockHair = false;
var UnlockHat = false;

var subItemNumUnlock:int; // hair or hat
var unlockForAchNum:int;


@HideInInspector var acheiveNum:int;

//-----------------------------------RIVER ICONS---------------------------

@HideInInspector var RiverNameText:UITextInstance;
@HideInInspector var RiverDescriptionText:UITextInstance;
@HideInInspector var RiverUnlockedText:UITextInstance;
@HideInInspector var AcheivementDescriptionText:UITextInstance;

var StairsIcon:UISprite;
var FallsIcon:UISprite;
var FallSlopeIcon:UISprite;
var SpeedIcon:UISprite;

var LockIcon:UISprite;

var AcheivementUnlocked:UISprite;



var Acheivement01:UIButton;
var Acheivement01Selected:UISprite;

var Acheivement02:UIButton;
var Acheivement02Selected:UISprite;

var Acheivement03:UIButton;
var Acheivement03Selected:UISprite;

var Acheivement04:UIButton;
var Acheivement04Selected:UISprite;

var Acheivement05:UIButton;
var Acheivement05Selected:UISprite;


//--------------------------------------------------------------------------

var gui:GUI_Menu;
gui = FindObjectOfType(GUI_Menu);

var kayakBuilder:KayakBuilder;
kayakBuilder = FindObjectOfType(KayakBuilder);

function Start()
{
sceneToLoadNameSave = sceneToLoadName;
sceneToLoadName="";

//sceneToLoadName = sceneToLoadNameSave;

yield WaitForSeconds(0.2);
	RiverNameText = gui.text.addTextInstance( RiverName,0,0,gui.textScaleFactor, 4, Color(1,1,1,1), UITextAlignMode.Left, UITextVerticalAlignMode.Middle );	
	RiverNameText.positionFromCenter(-0.3f,1.5f);
	RiverNameText.hidden=true;
	
	RiverDescriptionText = gui.riverText.addTextInstance( RiverDescription,0,0,gui.textScaleFactor*0.45, 4, Color(1,1,1,1), UITextAlignMode.Left, UITextVerticalAlignMode.Top );	
	RiverDescriptionText.positionFromCenter(-0.05f,1.2f);
	RiverDescriptionText.hidden=true;
	
	RiverUnlockedText = gui.riverText.addTextInstance( gui.riverSetups.Length + " / " + (gui.riverSetupsLocked.Length+5)+" Rivers ",0,0,gui.textScaleFactor*0.85, 4, Color(1,1,1,1), UITextAlignMode.Center, UITextVerticalAlignMode.Top );	
	RiverUnlockedText.positionFromCenter(0.9f,0.0f);
	RiverUnlockedText.hidden=true;
	
	LockIcon = gui.buttonUI.addSprite( "LockIcon.png", 0, 0, 10 );
	LockIcon.positionFromCenter(0.88f,0.14f);
	LockIcon.hidden=true;
	
	AcheivementDescriptionText = gui.riverText.addTextInstance( " ",0,0,gui.textScaleFactor*0.45, 4, Color(1,1,1,1), UITextAlignMode.Left, UITextVerticalAlignMode.Top );	
	AcheivementDescriptionText.positionFromCenter(0.3f,1.0f);
	AcheivementDescriptionText.hidden=true;
	
	//---River obstacle symbols----------------
	if(RiverSpeed == 1)
	{
	SpeedIcon  = gui.riverUI.addSprite( "Speed01Icon.png", 0, 0, 10 );
	SpeedIcon.positionFromCenter(-0.2f,0.65f);
	SpeedIcon.hidden=true;
	}
	else if(RiverSpeed == 2)
	{
	
	SpeedIcon  = gui.riverUI.addSprite( "Speed02Icon.png", 0, 0, 10 );
	SpeedIcon.positionFromCenter(-0.2f,0.65f);
	SpeedIcon.hidden=true;
	}
	else if(RiverSpeed == 3)
	{
	SpeedIcon  = gui.riverUI.addSprite( "Speed03Icon.png", 0, 0, 10 );
	SpeedIcon.positionFromCenter(-0.2f,0.65f);
	SpeedIcon.hidden=true;
	}
	else if(RiverSpeed == 4)
	{
	SpeedIcon  = gui.riverUI.addSprite( "Speed04Icon.png", 0, 0, 10 );
	SpeedIcon.positionFromCenter(-0.2f,0.65f);
	SpeedIcon.hidden=true;
	}
	else if(RiverSpeed == 5)
	{
	SpeedIcon  = gui.riverUI.addSprite( "Speed05Icon.png", 0, 0, 10 );
	SpeedIcon.positionFromCenter(-0.2f,0.65f);
	SpeedIcon.hidden=true;
	}
	
	if(!Stairs)
	{
	StairsIcon = gui.riverUI.addSprite( "StairsIcon.png", 0, 0, 10 );
	StairsIcon.positionFromCenter(-0.2f,0.745f);
	StairsIcon.hidden=true;
	}
	else
	{
	StairsIcon = gui.riverUI.addSprite( "StairsIconHighlighted.png", 0, 0, 10 );
	StairsIcon.positionFromCenter(-0.2f,0.745f);
	StairsIcon.hidden=true;
	}
	
	if(!SlopeFall)
	{
	FallSlopeIcon = gui.riverUI.addSprite( "FallSlopeIcon.png", 0, 0, 10 );
	FallSlopeIcon.positionFromCenter(-0.2f,0.84f);
	FallSlopeIcon.hidden=true;
	}
	else
	{
	FallSlopeIcon = gui.riverUI.addSprite( "FallSlopeIconHighlighted.png", 0, 0, 10 );
	FallSlopeIcon.positionFromCenter(-0.2f,0.84f);
	FallSlopeIcon.hidden=true;
	}
	
	if(!Waterfall)
	{
	FallsIcon = gui.riverUI.addSprite( "FallsIcon.png", 0, 0, 10 );
	FallsIcon.positionFromCenter(-0.2f,0.935f);
	FallsIcon.hidden=true;
	}
	else
	{
	FallsIcon = gui.riverUI.addSprite( "FallsIconHighlighted.png", 0, 0, 10 );
	FallsIcon.positionFromCenter(-0.2f,0.935f);
	FallsIcon.hidden=true;
	}
	

	
	
	//-------------------------------------------
	
	
	//UNLOCKED----------------------------------------
	

	
	if(PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement01") == 2 &&
		PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement02") == 2 &&
		PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement03") == 2 &&
		PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement04") == 2 &&
		PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement05") == 2)// check to see if this acheivement thas been completed -----------------   name is  sceneToLoadName + Acheivement #  achieve is 2 anything else is not acheived
	{
	Debug.Log("this is unlocked");
	AcheivementUnlocked = gui.riverUI.addSprite( "UnlockedIcon.png", 0, 0, 3 );
	AcheivementUnlocked.positionFromCenter(-0.3f,1.5f);
	AcheivementUnlocked.hidden=true;
	
	if(PlayerPrefs.GetInt(sceneToLoadNameSave + "AcheivementsUnlocked") != 2 )
		{
			gui.OnUnlockItemIcon();
			PlayerPrefs.SetInt(sceneToLoadNameSave + "AcheivementsUnlocked",2);
				
				
				if(UnlockKayak)
				{
					var setString:String = PlayerPrefs.GetString("unlockedKayaks");
					PlayerPrefs.SetString("unlockedKayaks", setString + ItemNumToUnlock.ToString() + ",");
					
				
				}
				else if(UnlockHat && !UnlockKayak)
				{
					var setString3:String = PlayerPrefs.GetString("unlockedHats");
					PlayerPrefs.SetString("unlockedHats", setString3 + ItemNumToUnlock.ToString() + ",");
				}
				else if(UnlockHair && !UnlockKayak)
				{
					var setString2:String = PlayerPrefs.GetString("unlockedHairs");
					PlayerPrefs.SetString("unlockedHairs", setString2 + ItemNumToUnlock.ToString() + ",");
				}
				
			
		}
	
	
	}
	else
	{
			AcheivementUnlocked = gui.riverUI.addSprite( "UnlockedIconInvisible.png", 0, 0, 25 );
			AcheivementUnlocked.positionFromCenter(-0.3f,1.5f);
			AcheivementUnlocked.hidden=true;
	}
	
		
var subAcheivement:int = PlayerPrefs.GetInt(sceneToLoadNameSave + "SubAcheivementUnlocked");		
	
	
	
	//ACHEIVEMENTS-------------------------------
	
	if(PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement01") == 2)// check to see if this acheivement thas been completed -----------------   name is  sceneToLoadName + Acheivement #  achieve is 2 anything else is not acheived
	{
	
	Acheivement01 = UIButton.create(gui.riverUI,"AcheivedIcon.png","AcheivedIcon.png",0,0,10);
	Acheivement01.positionFromCenter(0.1f,0.65f);
	Acheivement01.hidden=true;
	Acheivement01.onTouchUpInside += onTouchAcheivement01;
	
	Acheivement01Selected = gui.riverUI.addSprite( "AcheivedIconSelected.png", 0, 0, 11 );
	Acheivement01Selected.positionFromCenter(0.1f,0.65f);
	Acheivement01Selected.hidden=true;
	
	
	
		if(UnlockHair || UnlockHat)
		{
			if(unlockForAchNum == 1 && subAcheivement != 2)
			{
				if(UnlockHair)
				{
							
							var setSubString1:String = PlayerPrefs.GetString("unlockedHairs");
							PlayerPrefs.SetString("unlockedHairs", setSubString1 + subItemNumUnlock.ToString() + ",");
						PlayerPrefs.SetInt(sceneToLoadNameSave + "SubAcheivementUnlocked",2);
							
						
				}
				else // UnlockHat
				{
							var setSubString2:String = PlayerPrefs.GetString("unlockedHats");
							PlayerPrefs.SetString("unlockedHats", setSubString2 + subItemNumUnlock.ToString() + ",");
							PlayerPrefs.SetInt(sceneToLoadNameSave + "SubAcheivementUnlocked",2);
				}
			}
		}
	
	
	}
	else
	{
	Acheivement01 = UIButton.create(gui.riverUI,"AcheivementIcon.png","AcheivementIcon.png",0,0,10);
	Acheivement01.positionFromCenter(0.1f,0.65f);
	Acheivement01.hidden=true;
	Acheivement01.onTouchUpInside += onTouchAcheivement01;
	
	Acheivement01Selected = gui.riverUI.addSprite( "AcheivementIconSelected.png", 0, 0, 11 );
	Acheivement01Selected.positionFromCenter(0.1f,0.65f);
	Acheivement01Selected.hidden=true;
	}
	
	
	
	
	
	if(PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement02") == 2)// check to see if this acheivement thas been completed -----------------   name is  sceneToLoadName + Acheivement #  achieve is 2 anything else is not acheived
	{
	
	Acheivement02 = UIButton.create(gui.riverUI,"AcheivedIcon.png","AcheivedIcon.png",0,0,10);
	Acheivement02.positionFromCenter(0.1f,0.75f);
	Acheivement02.hidden=true;
	Acheivement02.onTouchUpInside += onTouchAcheivement02;
	
	Acheivement02Selected = gui.riverUI.addSprite( "AcheivedIconSelected.png", 0, 0, 11 );
	Acheivement02Selected.positionFromCenter(0.1f,0.75f);
	Acheivement02Selected.hidden=true;
	
		if(UnlockHair || UnlockHat)
		{
			if(unlockForAchNum == 2 && subAcheivement != 2)
			{
				if(UnlockHair)
				{
							
							var setSubString3:String = PlayerPrefs.GetString("unlockedHairs");
							PlayerPrefs.SetString("unlockedHairs", setSubString3 + subItemNumUnlock.ToString() + ",");
						PlayerPrefs.SetInt(sceneToLoadNameSave + "SubAcheivementUnlocked",2);
							
						
				}
				else // UnlockHat
				{
							var setSubString4:String = PlayerPrefs.GetString("unlockedHats");
							PlayerPrefs.SetString("unlockedHats", setSubString4 + subItemNumUnlock.ToString() + ",");
							PlayerPrefs.SetInt(sceneToLoadNameSave + "SubAcheivementUnlocked",2);
				}
			}
		}
	
	}
	else
	{
	Acheivement02 = UIButton.create(gui.riverUI,"AcheivementIcon.png","AcheivementIcon.png",0,0,10);
	Acheivement02.positionFromCenter(0.1f,0.75f);
	Acheivement02.hidden=true;
	Acheivement02.onTouchUpInside += onTouchAcheivement02;
	
	Acheivement02Selected = gui.riverUI.addSprite( "AcheivementIconSelected.png", 0, 0, 11 );
	Acheivement02Selected.positionFromCenter(0.1f,0.75f);
	Acheivement02Selected.hidden=true;
	}
	
	
	
	
	
	if(PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement03") == 2)// check to see if this acheivement thas been completed -----------------   name is  sceneToLoadName + Acheivement #  achieve is 2 anything else is not acheived
	{
	
	Acheivement03 = UIButton.create(gui.riverUI,"AcheivedIcon.png","AcheivedIcon.png",0,0,10);
	Acheivement03.positionFromCenter(0.1f,0.85f);
	Acheivement03.hidden=true;
	Acheivement03.onTouchUpInside += onTouchAcheivement03;
	
	Acheivement03Selected = gui.riverUI.addSprite( "AcheivedIconSelected.png", 0, 0, 11 );
	Acheivement03Selected.positionFromCenter(0.1f,0.85f);
	Acheivement03Selected.hidden=true;
	
	
		if(UnlockHair || UnlockHat)
		{
			if(unlockForAchNum == 3 && subAcheivement != 2)
			{
				if(UnlockHair)
				{
							
							var setSubString5:String = PlayerPrefs.GetString("unlockedHairs");
							PlayerPrefs.SetString("unlockedHairs", setSubString5 + subItemNumUnlock.ToString() + ",");
						PlayerPrefs.SetInt(sceneToLoadNameSave + "SubAcheivementUnlocked",2);
							
						
				}
				else// UnlockHat
				{
							var setSubString6:String = PlayerPrefs.GetString("unlockedHats");
							PlayerPrefs.SetString("unlockedHats", setSubString6 + subItemNumUnlock.ToString() + ",");
							PlayerPrefs.SetInt(sceneToLoadNameSave + "SubAcheivementUnlocked",2);
				}
			}
		}
	}
	else
	{
	Acheivement03 = UIButton.create(gui.riverUI,"AcheivementIcon.png","AcheivementIcon.png",0,0,10);
	Acheivement03.positionFromCenter(0.1f,0.85f);
	Acheivement03.hidden=true;
	Acheivement03.onTouchUpInside += onTouchAcheivement03;
	
	Acheivement03Selected = gui.riverUI.addSprite( "AcheivementIconSelected.png", 0, 0, 11 );
	Acheivement03Selected.positionFromCenter(0.1f,0.85f);
	Acheivement03Selected.hidden=true;
	}
	
	
	
	
	
	if(PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement04") == 2)// check to see if this acheivement thas been completed -----------------   name is  sceneToLoadName + Acheivement #  achieve is 2 anything else is not acheived
	{
	Acheivement04 = UIButton.create(gui.riverUI,"AcheivedIcon.png","AcheivedIcon.png",0,0,10);
	Acheivement04.positionFromCenter(0.1f,0.95f);
	Acheivement04.hidden=true;
	Acheivement04.onTouchUpInside += onTouchAcheivement04;
	
	Acheivement04Selected = gui.riverUI.addSprite( "AcheivedIconSelected.png", 0, 0, 11 );
	Acheivement04Selected.positionFromCenter(0.1f,0.95f);
	Acheivement04Selected.hidden=true;
	
	
		if(UnlockHair || UnlockHat)
		{
			if(unlockForAchNum == 4 && subAcheivement != 2)
			{
				if(UnlockHair)
				{
							
							var setSubString7:String = PlayerPrefs.GetString("unlockedHairs");
							PlayerPrefs.SetString("unlockedHairs", setSubString7 + subItemNumUnlock.ToString() + ",");
						
							PlayerPrefs.SetInt(sceneToLoadNameSave + "SubAcheivementUnlocked",2);
						
				}
				else // UnlockHat
				{
							var setSubString8:String = PlayerPrefs.GetString("unlockedHats");
							PlayerPrefs.SetString("unlockedHats", setSubString8 + subItemNumUnlock.ToString() + ",");
							PlayerPrefs.SetInt(sceneToLoadNameSave + "SubAcheivementUnlocked",2);
				}
			}
		}
	}
	else
	{
	Acheivement04 = UIButton.create(gui.riverUI,"AcheivementIcon.png","AcheivementIcon.png",0,0,10);
	Acheivement04.positionFromCenter(0.1f,0.95f);
	Acheivement04.hidden=true;
	Acheivement04.onTouchUpInside += onTouchAcheivement04;
	
	Acheivement04Selected = gui.riverUI.addSprite( "AcheivementIconSelected.png", 0, 0, 11 );
	Acheivement04Selected.positionFromCenter(0.1f,0.95f);
	Acheivement04Selected.hidden=true;
	}
	
	
	
	
	
	if(PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement05") == 2)// check to see if this acheivement thas been completed -----------------   name is  sceneToLoadName + Acheivement #  achieve is 2 anything else is not acheived
	{
	Acheivement05 = UIButton.create(gui.riverUI,"AcheivedIcon.png","AcheivedIcon.png",0,0,10);
	Acheivement05.positionFromCenter(0.1f,1.05f);
	Acheivement05.hidden=true;
	Acheivement05.onTouchUpInside += onTouchAcheivement05;
	
	Acheivement05Selected = gui.riverUI.addSprite( "AcheivedIconSelected.png", 0, 0, 11 );
	Acheivement05Selected.positionFromCenter(0.1f,1.05f);
	Acheivement05Selected.hidden=true;
	
	
		if(UnlockHair || UnlockHat)
		{
			if(unlockForAchNum == 5 && subAcheivement != 2)
			{
				if(UnlockHair)
				{
							
							var setSubString9:String = PlayerPrefs.GetString("unlockedHairs");
							PlayerPrefs.SetString("unlockedHairs", setSubString9 + subItemNumUnlock.ToString() + ",");
						PlayerPrefs.SetInt(sceneToLoadNameSave + "SubAcheivementUnlocked",2);
							
						
				}
				else // UnlockHat
				{
							var setSubString10:String = PlayerPrefs.GetString("unlockedHats");
							PlayerPrefs.SetString("unlockedHats", setSubString10 + subItemNumUnlock.ToString() + ",");
							PlayerPrefs.SetInt(sceneToLoadNameSave + "SubAcheivementUnlocked",2);
				}
			}
		}
	}
	else
	{
	Acheivement05 = UIButton.create(gui.riverUI,"AcheivementIcon.png","AcheivementIcon.png",0,0,10);
	Acheivement05.positionFromCenter(0.1f,1.05f);
	Acheivement05.hidden=true;
	Acheivement05.onTouchUpInside += onTouchAcheivement05;
	
	Acheivement05Selected = gui.riverUI.addSprite( "AcheivementIconSelected.png", 0, 0, 11 );
	Acheivement05Selected.positionFromCenter(0.1f,1.05f);
	Acheivement05Selected.hidden=true;
	}
	
}

function CheckAcheivements():int
{
	
	sceneToLoadName = sceneToLoadNameSave;
	
	var numberToLoad:int;
	
	if(PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement01") == 2)
	{
		if(PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement02") == 2)
		{
			if(PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement03") == 2)
			{
				if(PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement04") == 2)
				{
					if(PlayerPrefs.GetInt(sceneToLoadNameSave + "Acheivement05") == 2)
						{
							
							if(gui.firstLoad)
							{
							gui.SwapRiverD("Down");
							
							return 0;
							}
							else
							{
							numberToLoad = 6;
							PlayerPrefs.SetString("RiverSetupDirections", "You've completed this river's acheivements. Have fun running the rapids!");
							}
							
							
						}
						else
							{
								numberToLoad = 5;
								PlayerPrefs.SetString("RiverSetupDirections", acheive05Description); 
							}
				}
				else
				{
					numberToLoad = 4;
					PlayerPrefs.SetString("RiverSetupDirections", acheive04Description); 
				}
			}
			else
			{
				numberToLoad = 3;
				PlayerPrefs.SetString("RiverSetupDirections", acheive03Description); 
			}
		}
		else
		{
			numberToLoad = 2;
			PlayerPrefs.SetString("RiverSetupDirections", acheive02Description); 
		}
		
	}
	else
	{
	numberToLoad = 1;
	PlayerPrefs.SetString("RiverSetupDirections", acheive01Description); 
	gui.firstLoad=false;
	}
	
	PlayerPrefs.SetInt("RiverSetup", numberToLoad); 
	
	
	 return numberToLoad; 
}

function ShowRiverMenu() : IEnumerator
{
	var check:int = CheckAcheivements();
	
	if(check>0)
	{
	
	
	RiverNameText.hidden=false;
	RiverDescriptionText.hidden=false;
	
	SpeedIcon.hidden=false;
	StairsIcon.hidden=false;
	FallSlopeIcon.hidden=false;
	FallsIcon.hidden = false;
	
	AcheivementUnlocked.hidden=false;
	
	Acheivement01.hidden = false;
	Acheivement01Selected.hidden = true;
	
	Acheivement02.hidden = false;
	Acheivement02Selected.hidden = true;
	
	Acheivement03.hidden = false;
	Acheivement03Selected.hidden = true;
	
	Acheivement04.hidden = false;
	Acheivement04Selected.hidden = true;
	
	Acheivement05.hidden = false;
	Acheivement05Selected.hidden = true;
	RiverUnlockedText.hidden=false;
	LockIcon.hidden=false;
	
	AcheivementDescriptionText.clear();
	
	switch (check)
	{
	 case 1:
	 	AcheivementDescriptionText.text = acheive01Description + " ";
	 break;
	  case 2:
	  AcheivementDescriptionText.text = acheive02Description + " ";
	 break;
	  case 3:
	  AcheivementDescriptionText.text = acheive03Description + " ";
	 break;
	  case 4:
	  AcheivementDescriptionText.text = acheive04Description + " ";
	 break;
	  case 5:
	  AcheivementDescriptionText.text = acheive05Description + " ";
	 break;
	 case 6:
	  AcheivementDescriptionText.text = "You've completed this river's acheivements. Have fun running the rapids!";
	 break;
	 default:
		break;
		}
	
	
	//Debug.Log("after the switch");

	
	AcheivementDescriptionText.hidden=false;
	
	RiverNameText.positionFromCenter(-0.3f,1.5f);
	RiverDescriptionText.positionFromCenter(-0.05f,1.2f);
	RiverUnlockedText.positionFromCenter(0.9f,0f);
	LockIcon.positionFromCenter(0.88f,0.14f);
	AcheivementUnlocked.positionFromCenter(-0.3f,1.5f);
	
	AcheivementDescriptionText.positionFromCenter(0.3f,1.2f);
	
	SpeedIcon.positionFromCenter(-0.2f,0.65f);
	StairsIcon.positionFromCenter(-0.2f,0.745f);
	FallSlopeIcon.positionFromCenter(-0.2f,0.84f);
	FallsIcon.positionFromCenter(-0.2f,0.935f);
	
	Acheivement01Selected.positionFromCenter(0.1f,0.65f);
	Acheivement02Selected.positionFromCenter(0.1f,0.75f);
	Acheivement03Selected.positionFromCenter(0.1f,0.85f);
	Acheivement04Selected.positionFromCenter(0.1f,0.95f);
	Acheivement05Selected.positionFromCenter(0.1f,1.05f);
	
	Acheivement01.positionFromCenter(0.1f,0.65f);
	Acheivement02.positionFromCenter(0.1f,0.75f);
	Acheivement03.positionFromCenter(0.1f,0.85f);
	Acheivement04.positionFromCenter(0.1f,0.95f);
	Acheivement05.positionFromCenter(0.1f,1.05f);

	RiverUnlockedText.positionTo( 1f, RiverUnlockedText.localPosition + Vector3(0,Screen.height*0.45,0), Easing.Quartic.easeInOut );
	LockIcon.positionTo( 1f, LockIcon.localPosition + Vector3(0,Screen.height*0.45,0), Easing.Quartic.easeInOut );
	
	RiverNameText.positionTo( 1f, RiverNameText.localPosition + Vector3(Screen.width*-1.5,0,0), Easing.Quartic.easeInOut );
	RiverDescriptionText.positionTo( 1f, RiverDescriptionText.localPosition + Vector3(Screen.width*-1,0,0), Easing.Quartic.easeInOut );
	
	AcheivementUnlocked.positionTo( 1f, AcheivementUnlocked.localPosition + Vector3(Screen.width*-1.15,0,0), Easing.Quartic.easeInOut );
	
	AcheivementDescriptionText.positionTo( 1f, AcheivementDescriptionText.localPosition + Vector3(Screen.width*-1,0,0), Easing.Quartic.easeInOut );
	
	SpeedIcon.positionTo( 1f, SpeedIcon.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	StairsIcon.positionTo( 1f, StairsIcon.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	FallSlopeIcon.positionTo( 1f, FallSlopeIcon.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	FallsIcon.positionTo( 1f, FallsIcon.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	
	Acheivement01.positionTo( 1f, Acheivement01.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	Acheivement01Selected.positionTo( 1f, Acheivement01Selected.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	
	Acheivement02.positionTo( 1f, Acheivement02.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	Acheivement02Selected.positionTo( 1f, Acheivement02Selected.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	
	Acheivement03.positionTo( 1f, Acheivement03.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	Acheivement03Selected.positionTo( 1f, Acheivement03Selected.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	
	Acheivement04.positionTo( 1f, Acheivement04.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	Acheivement04Selected.positionTo( 1f, Acheivement04Selected.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	
	Acheivement05.positionTo( 1f, Acheivement05.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	Acheivement05Selected.positionTo( 1f, Acheivement05Selected.localPosition + Vector3(Screen.width*-0.7,0,0), Easing.Quartic.easeInOut );
	
	yield WaitForSeconds(1);
	
	AcheivementDescriptionText.positionFromCenter(0.3f,0.2f);
	
	
	
	}
	else
	{
	}
}


function HideRiverMenu()
{
	
	RiverNameText.positionTo( 1f, RiverNameText.localPosition + Vector3(Screen.width*1.5,0,0), Easing.Quartic.easeInOut );
	RiverDescriptionText.positionTo( 1f, RiverDescriptionText.localPosition + Vector3(Screen.width*1,0,0), Easing.Quartic.easeInOut );
	
	AcheivementUnlocked.positionTo( 1f, AcheivementUnlocked.localPosition + Vector3(Screen.width*1.15,0,0), Easing.Quartic.easeInOut );
	
	AcheivementDescriptionText.positionTo( 1f, AcheivementDescriptionText.localPosition + Vector3(Screen.width*1,0,0), Easing.Quartic.easeInOut );

	SpeedIcon.positionTo( 1f, SpeedIcon.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	StairsIcon.positionTo( 1f, StairsIcon.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	FallSlopeIcon.positionTo( 1f, FallSlopeIcon.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	FallsIcon.positionTo( 1f, FallsIcon.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	
	Acheivement01.positionTo( 1f, Acheivement01.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	Acheivement01Selected.positionTo( 1f, Acheivement01Selected.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	
	Acheivement02.positionTo( 1f, Acheivement02.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	Acheivement02Selected.positionTo( 1f, Acheivement02Selected.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	
	Acheivement03.positionTo( 1f, Acheivement03.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	Acheivement03Selected.positionTo( 1f, Acheivement03Selected.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	
	Acheivement04.positionTo( 1f, Acheivement04.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	Acheivement04Selected.positionTo( 1f, Acheivement04Selected.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	
	Acheivement05.positionTo( 1f, Acheivement05.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );
	Acheivement05Selected.positionTo( 1f, Acheivement05Selected.localPosition + Vector3(Screen.width*0.7,0,0), Easing.Quartic.easeInOut );

	RiverUnlockedText.positionTo( 1f, RiverUnlockedText.localPosition + Vector3(0,Screen.height*-0.45,0), Easing.Quartic.easeInOut );
	LockIcon.positionTo( 1f, LockIcon.localPosition + Vector3(0,Screen.height*-0.45,0), Easing.Quartic.easeInOut );

	yield WaitForSeconds(1);
	
	RiverUnlockedText.hidden=true;
	LockIcon.hidden=true;
	
	RiverNameText.hidden=true;
	RiverDescriptionText.hidden=true;
	AcheivementDescriptionText.hidden=true;

	SpeedIcon.hidden=true;
	StairsIcon.hidden=true;
	FallSlopeIcon.hidden=true;
	FallsIcon.hidden = true;
	
	AcheivementUnlocked.hidden = true;
	
	Acheivement01.hidden = true;
	Acheivement01Selected.hidden = true;
	
	Acheivement02.hidden = true;
	Acheivement02Selected.hidden = true;
	
	Acheivement03.hidden = true;
	Acheivement03Selected.hidden = true;
	
	Acheivement04.hidden = true;
	Acheivement04Selected.hidden = true;
	
	Acheivement05.hidden = true;
	Acheivement05Selected.hidden = true;
	
	acheiveNum =0;

} 


function SkipAcheivement(direction:String)
{
	if(direction=="Right")
	{
		acheiveNum++;
		if(acheiveNum > 5)
		{
			acheiveNum=0;
		}
	}
	else if(direction=="Left")
	{
		acheiveNum--;
		if(acheiveNum < 0)
		{
			acheiveNum = 5;
		}
	}
	else
	{
	Debug.Log("ERROR Jason");
	return;
	}
	
	if(acheiveNum == 0)
	{
	acheiveNum = 1;
	
	Acheivement01.hidden = true;
	Acheivement01Selected.hidden = false;
	
	Acheivement02.hidden = false;
	Acheivement02Selected.hidden = true;
	
	Acheivement03.hidden = false;
	Acheivement03Selected.hidden = true;
	
	Acheivement04.hidden = false;
	Acheivement04Selected.hidden = true;
	
	Acheivement05.hidden = false;
	Acheivement05Selected.hidden = true;
	
	AcheivementDescriptionText.clear();
	AcheivementDescriptionText.text = acheive01Description + " ";
	
	sceneToLoadName = sceneToLoadNameSave;
	
	PlayerPrefs.SetInt("RiverSetup", 1);  
	PlayerPrefs.SetString("RiverSetupDirections", acheive01Description); 
	
	}
	else if(acheiveNum == 1)
	{
		Acheivement01.hidden = true;
	Acheivement01Selected.hidden = false;
	
	Acheivement02.hidden = false;
	Acheivement02Selected.hidden = true;
	
	Acheivement03.hidden = false;
	Acheivement03Selected.hidden = true;
	
	Acheivement04.hidden = false;
	Acheivement04Selected.hidden = true;
	
	Acheivement05.hidden = false;
	Acheivement05Selected.hidden = true;
	
	AcheivementDescriptionText.clear();
	AcheivementDescriptionText.text = acheive01Description + " ";
	
	sceneToLoadName = sceneToLoadNameSave;
	
	PlayerPrefs.SetInt("RiverSetup", 1);  
	PlayerPrefs.SetString("RiverSetupDirections", acheive01Description);  
	
	}
	else if(acheiveNum == 2)
	{
		Acheivement01.hidden = false;
	Acheivement01Selected.hidden = true;
	
	Acheivement02.hidden = true;
	Acheivement02Selected.hidden = false;
	
	Acheivement03.hidden = false;
	Acheivement03Selected.hidden = true;
	
	Acheivement04.hidden = false;
	Acheivement04Selected.hidden = true;
	
	Acheivement05.hidden = false;
	Acheivement05Selected.hidden = true;
	
	AcheivementDescriptionText.clear();
	AcheivementDescriptionText.text = acheive02Description + " ";
	
	sceneToLoadName = sceneToLoadNameSave;
	
	PlayerPrefs.SetInt("RiverSetup", 2);  
	PlayerPrefs.SetString("RiverSetupDirections", acheive02Description);  
	}
	else if(acheiveNum == 3)
	{
		Acheivement01.hidden = false;
	Acheivement01Selected.hidden = true;
	
	Acheivement02.hidden = false;
	Acheivement02Selected.hidden = true;
	
	Acheivement03.hidden = true;
	Acheivement03Selected.hidden = false;
	
	Acheivement04.hidden = false;
	Acheivement04Selected.hidden = true;
	
	Acheivement05.hidden = false;
	Acheivement05Selected.hidden = true;
	
	AcheivementDescriptionText.clear();
	AcheivementDescriptionText.text = acheive03Description + " ";
	
	sceneToLoadName = sceneToLoadNameSave;
	
	PlayerPrefs.SetInt("RiverSetup", 3);  
 	PlayerPrefs.SetString("RiverSetupDirections", acheive03Description);  
	}
	else if(acheiveNum == 4)
	{
		Acheivement01.hidden = false;
	Acheivement01Selected.hidden = true;
	
	Acheivement02.hidden = false;
	Acheivement02Selected.hidden = true;
	
	Acheivement03.hidden = false;
	Acheivement03Selected.hidden = true;
	
	Acheivement04.hidden = true;
	Acheivement04Selected.hidden = false;
	
	Acheivement05.hidden = false;
	Acheivement05Selected.hidden = true;
	
	AcheivementDescriptionText.clear();
	AcheivementDescriptionText.text = acheive04Description + " ";
	
	sceneToLoadName = sceneToLoadNameSave;
	
	PlayerPrefs.SetInt("RiverSetup", 4);  
	PlayerPrefs.SetString("RiverSetupDirections", acheive04Description);  
	}
	else if(acheiveNum == 5)
	{
		Acheivement01.hidden = false;
	Acheivement01Selected.hidden = true;
	
	Acheivement02.hidden = false;
	Acheivement02Selected.hidden = true;
	
	Acheivement03.hidden = false;
	Acheivement03Selected.hidden = true;
	
	Acheivement04.hidden = false;
	Acheivement04Selected.hidden = true;
	
	Acheivement05.hidden = true;
	Acheivement05Selected.hidden = false;
	
	AcheivementDescriptionText.clear();
	AcheivementDescriptionText.text = acheive05Description + " ";
	
	sceneToLoadName = sceneToLoadNameSave;
	
	PlayerPrefs.SetInt("RiverSetup", 5);  
	PlayerPrefs.SetString("RiverSetupDirections", acheive05Description);  
	}
	else
	{
	acheiveNum = 1;
	
	
			Acheivement01.hidden = true;
	Acheivement01Selected.hidden = false;
	
	Acheivement02.hidden = false;
	Acheivement02Selected.hidden = true;
	
	Acheivement03.hidden = false;
	Acheivement03Selected.hidden = true;
	
	Acheivement04.hidden = false;
	Acheivement04Selected.hidden = true;
	
	Acheivement05.hidden = false;
	Acheivement05Selected.hidden = true;
	
	AcheivementDescriptionText.clear();
	AcheivementDescriptionText.text = acheive01Description + " ";
	
	sceneToLoadName = sceneToLoadNameSave;
	
	PlayerPrefs.SetInt("RiverSetup", 1);  
	PlayerPrefs.SetString("RiverSetupDirections", acheive01Description);  
	
	}
}

function onTouchAcheivement01()
{
	gui.stickInTheWay();
	
	Acheivement01.hidden = true;
	Acheivement01Selected.hidden = false;
	
	Acheivement02.hidden = false;
	Acheivement02Selected.hidden = true;
	
	Acheivement03.hidden = false;
	Acheivement03Selected.hidden = true;
	
	Acheivement04.hidden = false;
	Acheivement04Selected.hidden = true;
	
	Acheivement05.hidden = false;
	Acheivement05Selected.hidden = true;
	
	AcheivementDescriptionText.clear();
	AcheivementDescriptionText.text = acheive01Description + " ";
	
	sceneToLoadName = sceneToLoadNameSave;
	
	PlayerPrefs.SetInt("RiverSetup", 1);  
	PlayerPrefs.SetString("RiverSetupDirections", acheive01Description);  
}

function onTouchAcheivement02()
{
	gui.stickInTheWay();
	
	Acheivement01.hidden = false;
	Acheivement01Selected.hidden = true;
	
	Acheivement02.hidden = true;
	Acheivement02Selected.hidden = false;
	
	Acheivement03.hidden = false;
	Acheivement03Selected.hidden = true;
	
	Acheivement04.hidden = false;
	Acheivement04Selected.hidden = true;
	
	Acheivement05.hidden = false;
	Acheivement05Selected.hidden = true;
	
	AcheivementDescriptionText.clear();
	AcheivementDescriptionText.text = acheive02Description + " ";
	
	sceneToLoadName = sceneToLoadNameSave;
	
	PlayerPrefs.SetInt("RiverSetup", 2);  
	PlayerPrefs.SetString("RiverSetupDirections", acheive02Description);  
}

function onTouchAcheivement03()
{
	gui.stickInTheWay();
	
	Acheivement01.hidden = false;
	Acheivement01Selected.hidden = true;
	
	Acheivement02.hidden = false;
	Acheivement02Selected.hidden = true;
	
	Acheivement03.hidden = true;
	Acheivement03Selected.hidden = false;
	
	Acheivement04.hidden = false;
	Acheivement04Selected.hidden = true;
	
	Acheivement05.hidden = false;
	Acheivement05Selected.hidden = true;
	
	AcheivementDescriptionText.clear();
	AcheivementDescriptionText.text = acheive03Description + " ";
	
	sceneToLoadName = sceneToLoadNameSave;
	
	PlayerPrefs.SetInt("RiverSetup", 3);  
 	PlayerPrefs.SetString("RiverSetupDirections", acheive03Description);  
}

function onTouchAcheivement04()
{
	gui.stickInTheWay();
	
	Acheivement01.hidden = false;
	Acheivement01Selected.hidden = true;
	
	Acheivement02.hidden = false;
	Acheivement02Selected.hidden = true;
	
	Acheivement03.hidden = false;
	Acheivement03Selected.hidden = true;
	
	Acheivement04.hidden = true;
	Acheivement04Selected.hidden = false;
	
	Acheivement05.hidden = false;
	Acheivement05Selected.hidden = true;
	
	AcheivementDescriptionText.clear();
	AcheivementDescriptionText.text = acheive04Description + " ";
	
	sceneToLoadName = sceneToLoadNameSave;
	
	PlayerPrefs.SetInt("RiverSetup", 4);  
	PlayerPrefs.SetString("RiverSetupDirections", acheive04Description);  
}

function onTouchAcheivement05()
{
	gui.stickInTheWay();
	
	Acheivement01.hidden = false;
	Acheivement01Selected.hidden = true;
	
	Acheivement02.hidden = false;
	Acheivement02Selected.hidden = true;
	
	Acheivement03.hidden = false;
	Acheivement03Selected.hidden = true;
	
	Acheivement04.hidden = false;
	Acheivement04Selected.hidden = true;
	
	Acheivement05.hidden = true;
	Acheivement05Selected.hidden = false;
	
	AcheivementDescriptionText.clear();
	AcheivementDescriptionText.text = acheive05Description + " ";
	
	sceneToLoadName = sceneToLoadNameSave;
	
	PlayerPrefs.SetInt("RiverSetup", 5);  
	PlayerPrefs.SetString("RiverSetupDirections", acheive05Description);  
}
