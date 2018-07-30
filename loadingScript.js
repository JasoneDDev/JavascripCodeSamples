#pragma strict

import UnityEngine;
import System;


var isTest=false;
var isMobile=false;
var isSplashPage=false;
@HideInInspector var Active=false;

var SplashPages:GUITexture[];

@HideInInspector var currentPage:int;

@HideInInspector var MasterAlpha:float;
@HideInInspector var MasterVolume:float;
@HideInInspector var triggeredForward=false;
@HideInInspector var triggeredBack=false;

@HideInInspector var paused=false;
var pauseBetweenSplash:float;
var doNotFadeLastImage=false;
@HideInInspector var interval:float;
@HideInInspector var TimeRemaining:float;

var SceneToLoad:String;

@HideInInspector static var TimeTrial:int = 1810;// 30 minutes trial = 1800

var SwappingSound=false;
var audioToSwapTo:AudioClip;
var MusicVolumeFloat:float = 1;

var audioOn=true;

private var mogaPro:boolean = false;	// Controller Model Conditional
private var padFound:boolean=false;

@HideInInspector  var CountDownTimer:float;
@HideInInspector var WW3DIsUnlocked = true;
@HideInInspector var gameIsUnlocked = false;

@HideInInspector var jCommander:JavaCommander;

var ControllerCount:int;
var Controllers:String[];
var Players:OuyaSDK.OuyaPlayer[];

var setPlayer=false;
var MogaPro=false;



// need a array for 4 players, using strings or ouya.sdk for players.
// when the player presses a btn for player 1 I assign that controller to the player 01 slot....  if for whatever reason the controller number changes I
//pause the game and ask for them to press the specified btn again and then continue the game
function DetectControllers()
{
	Controllers = Input.GetJoystickNames();
	
	if(ControllerCount == 0)
	{
		ControllerCount = Controllers.Length;
		
	}
	
}



function Start ()
{
DontDestroyOnLoad(this.gameObject);

PlayerPrefs.SetInt("StartCount", (PlayerPrefs.GetInt("StartCount")+1));

if(PlayerPrefs.GetInt("audioOn") == 2 )
{
audioOn = true;
AudioListener.volume = 1;

}
else if(PlayerPrefs.GetInt("audioOn") == 1)
{
audioOn = false;
AudioListener.volume = 0;
}
else
{
audioOn = true;
AudioListener.volume = 1;
PlayerPrefs.GetInt("audioOn",2);
}

// UNLOCKS FOR TESTING-------------------------------------------------------------------------------
	
		//PlayerPrefs.DeleteAll();
				//PlayerPrefs.SetInt("unlockedRiverPack",2);
//
//		var setString:String = "0,1,2,3,4,5,6,7,8,";
//		PlayerPrefs.SetString("unlockedKayaks", setString);
//					
//				
//		var setString3:String = "0,1,2,";
//		PlayerPrefs.SetString("unlockedHats", setString3 );
//			
//		var setString2:String = "0,1,2,";
//		PlayerPrefs.SetString("unlockedHairs", setString2 );
//PlayerPrefs.SetInt("MoonCoinCount",5500);
//PlayerPrefs.SetInt("GoldCoinCount",2500);


//--------------------------------------------------------------------------------------------


//PlayerPrefs.SetFloat("CountDownTime", 0.0);

Screen.SetResolution(1280, 720, true);
//OuyaSDK.OuyaJava.JavaSetResolution("1280x720");

#if UNITY_ANDROID
jCommander = GetComponent(JavaCommander);
#endif
DetectControllers();
//
//		for(var ii:int=0; ii < 4; ii++)
//			{
//			var controllerNum:OuyaSDK.OuyaPlayer = (ii+1);
//			Debug.Log(ii + " cont " + controllerNum);
//			
//			Players[ii]=(controllerNum);
//			}

if(PlayerPrefs.GetString("NeverLoaded") != "IHaveBeenLoaded" && !isMobile)
{
	CountDownTimer=0.0;
	PlayerPrefs.SetFloat("CountDownTime", CountDownTimer);
	PlayerPrefs.SetString("NeverLoaded", "IHaveBeenLoaded");
	
}
else
{
	
	CountDownTimer = PlayerPrefs.GetFloat("CountDownTime");
	
	if(PlayerPrefs.GetString("WW3DPurchased") == "ofCourseIBoughtIt" || isTest || isMobile)
	{
		WW3DIsUnlocked = true;
		gameIsUnlocked = true;
		
	}
	else if(CountDownTimer >= TimeTrial && PlayerPrefs.GetString("WW3DPurchased") != "ofCourseIBoughtIt")
	{
		WW3DIsUnlocked = false;
		gameIsUnlocked = false;
	}
	
}


//Application.LoadLevel("MenuScene");
audio.volume = 0;

if(isSplashPage)
{
LaunchGame();

}

}

function Awake()
	{
		Screen.sleepTimeout = SleepTimeout.NeverSleep;
			

		/*
		MOGA MAPPING - EXAMPLE 1
		Input.RegisterInputButton("Fire1", MogaController.KEYCODE_BUTTON_A);
		
		MOGA MAPPING - EXAMPLE 2
		Input.RegisterInputButton("joystick button 0", Controller.KEYCODE_BUTTON_A);
		*/

		// MOGA MAPPING - EXAMPLE 3
		#if UNITY_ANDROID
		MogaInput.RegisterInputKey(KeyCode.JoystickButton0, MogaController.KEYCODE_BUTTON_A);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton1, MogaController.KEYCODE_BUTTON_B);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton2, MogaController.KEYCODE_BUTTON_X);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton3, MogaController.KEYCODE_BUTTON_Y);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton4, MogaController.KEYCODE_BUTTON_L1);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton5, MogaController.KEYCODE_BUTTON_R1);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton6, MogaController.KEYCODE_BUTTON_SELECT);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton7, MogaController.KEYCODE_BUTTON_START);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton8, MogaController.KEYCODE_BUTTON_THUMBL);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton9, MogaController.KEYCODE_BUTTON_THUMBR);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton10, MogaController.KEYCODE_BUTTON_L2);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton11, MogaController.KEYCODE_BUTTON_R2);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton12, MogaController.KEYCODE_DPAD_UP);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton13, MogaController.KEYCODE_DPAD_DOWN);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton14, MogaController.KEYCODE_DPAD_LEFT);
		MogaInput.RegisterInputKey(KeyCode.JoystickButton15, MogaController.KEYCODE_DPAD_RIGHT);
	
		MogaInput.RegisterInputAxis("Horizontal", MogaController.AXIS_X);		// Left Nub Horizontal
		MogaInput.RegisterInputAxis("Vertical", MogaController.AXIS_Y);			// Left Nub Vertical
		MogaInput.RegisterInputAxis("LookHorizontal", MogaController.AXIS_Z);	// Right Nub Horizontal
		MogaInput.RegisterInputAxis("LookVertical", MogaController.AXIS_RZ);	// Right Nub Vertical
		MogaInput.RegisterInputAxis("L2", MogaController.AXIS_LTRIGGER);	// L2 Trigger Axis
		MogaInput.RegisterInputAxis("R2", MogaController.AXIS_RTRIGGER);	// R2 Trigger Axis
		#endif
	}

function LaunchGame()
{
	if(SplashPages.length>0)
	{
		currentPage=0;
		triggeredForward=true;
		Active=true;
	}
}

function FixedUpdate()
{
	if(Active)
	{
		#if UNITY_ANDROID
		if (MogaInput.GetControllerState() == MogaController.ACTION_CONNECTED)
		{
			if ((MogaInput.GetControllerSupportedVersion() == MogaController.ACTION_VERSION_MOGAPRO) && (!InputManager.Moga))
			{
			InputManager.Moga = true;
			MogaPro=true;
			//ControllerCount = 1;
			//Controllers = ["MogaPro Controller"];
			}
			else if ((MogaInput.GetControllerSupportedVersion() == MogaController.ACTION_VERSION_MOGA) && (!InputManager.Moga))
			{
			InputManager.Moga = true;
			MogaPro=false;
			//ControllerCount = 1;
			//Controllers = ["Moga Controller"];
			}
		}
		else
		{
		InputManager.Moga = false;
//			if(Controllers[0] == "MogaPro Controller" || Controllers[0] == "Moga Controller")
//			{
//			//Controllers = null;
//			//ControllerCount =0;
//			}
		}
		#endif
		if(MasterAlpha<0.999 && triggeredForward)
		{
			triggeredBack=false;
			MasterAlpha +=0.01;
			if(MasterVolume < 1)
			{
			MasterVolume +=0.05;
			audio.volume = MasterVolume;
			
			}
		}
		else if(doNotFadeLastImage && currentPage+1 == SplashPages.Length)
		{
		Active=false;
		isSplashPage=false;
		LoadScene();
		}
		else if(MasterAlpha>0.001 && triggeredBack)
		{
			triggeredForward=false;
			MasterAlpha -=0.01;
		}
		else if(triggeredForward && MasterAlpha>0.999)
		{
		triggeredForward=false;
		triggeredBack=true;
		}
		else if(triggeredBack && MasterAlpha<0.001)
		{
			PauseTime();
		}
		
		if(currentPage < SplashPages.Length)
		{
		SplashPages[currentPage].color.a = MasterAlpha;
		}
		else
		{
		Active=false;
		isSplashPage=false;
		LoadScene();
		}
	}
	
	DetectControllers();
	
	
	
	
	//Debug.Log(SystemInfo.deviceModel);
	
	
	if(SwappingSound)
	{
		if(audio.clip != audioToSwapTo && MusicVolumeFloat>0)
		{
			MusicVolumeFloat-=0.05;
			audio.volume = MusicVolumeFloat;
			//Debug.Log("music volume " + MusicVolumeFloat);
		}
		else if( MusicVolumeFloat<=0 && audio.clip != audioToSwapTo)
		{
			audio.clip = audioToSwapTo;
			if(!audio.isPlaying)
			{
				audio.Play();
				}
		//	Debug.Log("swapped audio clip");
		}
		else if( MusicVolumeFloat < 1  && audio.clip == audioToSwapTo)
		{
			MusicVolumeFloat+=0.05;
			audio.volume = MusicVolumeFloat;
			if(!audio.isPlaying)
			{
				audio.Play();
				}
			//Debug.Log("swapping " + MusicVolumeFloat);
		}
		else if(MusicVolumeFloat >=1 && audio.clip == audioToSwapTo && audio.isPlaying)
		{
		SwappingSound=false;
	//	Debug.Log("swapping OFF");
		}
	}	
	
	
	if(CountDownTimer <= TimeTrial && WW3DIsUnlocked && !gameIsUnlocked)
	{
			CountDownTimer += Time.deltaTime; 
			TimeRemaining = TimeTrial - CountDownTimer;
			interval += Time.deltaTime;
			
		//	Debug.Log("time remianing "+TimeRemaining + " " + TimeTrial + " - " + CountDownTimer);
			
			if(interval > 10)
			{
				PlayerPrefs.SetFloat("CountDownTime", CountDownTimer);
				PlayerPrefs.Save();
				interval=0;
			}
	}
	else if(WW3DIsUnlocked && !gameIsUnlocked)
	{
			WW3DIsUnlocked = false;
			PlayerPrefs.SetFloat("CountDownTime", CountDownTimer);
			PlayerPrefs.Save();
			
	}		
}

function PauseTime()
{
			if(!paused)
			{
			paused=true;
			yield WaitForSeconds(pauseBetweenSplash);
			triggeredForward=true;
			triggeredBack=false;
			currentPage++;
			yield WaitForSeconds(0.02);
			paused=false;
			}
			
}

function LoadScene()
{
Debug.Log("loading the scene");
yield WaitForSeconds(pauseBetweenSplash);
var loadingScene = Application.LoadLevelAsync(SceneToLoad);
yield loadingScene;

}






public static class InputManager
{
   var Moga = false;
     public static function GetAxis(inputName:String, player:OuyaSDK.OuyaPlayer ) :float
    {
        switch (Moga)
        {
        #if UNITY_ANDROID
	       case true:
		         switch (inputName)
		        {
		            case "TurnRight":
		                return MogaInput.GetAxis("R2");//MogaController.KEYCODE_BUTTON_R2;//R2
		            case "TurnLeft":
		                return MogaInput.GetAxis("L2");//MogaController.KEYCODE_BUTTON_L2;//L2
		            case "Roll":
		                return MogaInput.GetAxis("Horizontal");//MogaController.AXIS_X;//X
		            case "Vertical":
		                return MogaInput.GetAxis("Vertical");//MogaController.AXIS_Y;//Y
		            case "Pitch":
		                return MogaInput.GetAxis("LookVertical");//MogaController.AXIS_RZ;//RZ
		            case "Yaw":
		                return MogaInput.GetAxis("LookHorizontal");//MogaController.AXIS_Z;//Z
		           default:
				return 0;
		        }
	        #endif
	        case false:
	        	
	        	switch (inputName)
		        {
		            case "TurnRight":
		                return OuyaExampleCommon.GetAxis("RT", player);
		            case "TurnLeft":
		                return OuyaExampleCommon.GetAxis("LT", player);
		            case "Roll":
		                return OuyaExampleCommon.GetAxis("LX", player);
		            case "Vertical":
		                return OuyaExampleCommon.GetAxis("LY", player);
		            case "Pitch":
		                return OuyaExampleCommon.GetAxis("RY", player);
		            case "Yaw":
		                return OuyaExampleCommon.GetAxis("RX", player);
		           default:
				return 0;
		        }
	     }   
    }

    public static function GetButton(inputName:String, player:OuyaSDK.OuyaPlayer) :boolean
    {
        
         switch (Moga)
        {
        #if UNITY_ANDROID
	       case true:
        
			        switch (inputName)
			        {
			            case "Acceleration":
			           	 	return MogaInput.GetKeyDown(KeyCode.JoystickButton0);//a
			            case "Orbit":
			                return MogaInput.GetKeyDown(KeyCode.JoystickButton2);//x
			            case "Option":
			               return MogaInput.GetKeyDown(KeyCode.JoystickButton3);    //y 
			            case "Exit":
			                return MogaInput.GetKeyDown(KeyCode.JoystickButton1);       //b
			            case "TurnLeft":
			                return MogaInput.GetKeyDown(KeyCode.JoystickButton10);
			            case "TurnRight":
			               return MogaInput.GetKeyDown(KeyCode.JoystickButton11);
			               
			            case "SkipLeft":
			               return MogaInput.GetKeyDown(KeyCode.JoystickButton4);
			            case "SkipRight":
			               return MogaInput.GetKeyDown(KeyCode.JoystickButton5);
			               
			            case "DLeft":
			            	return MogaInput.GetKeyDown(KeyCode.JoystickButton14); 
			            case "DRight":
			            	return MogaInput.GetKeyDown(KeyCode.JoystickButton15);
			            case "DUp":
			            	return MogaInput.GetKeyDown(KeyCode.JoystickButton12);
			            case "DDown":
			            	return MogaInput.GetKeyDown(KeyCode.JoystickButton13);	
			            case "StartBtn":
			            	return MogaInput.GetKeyDown(KeyCode.JoystickButton7);
				    default:
					return false;
			        }
			        #endif
			case false:      
			
			  	 switch (inputName)
			        {
			            case "Acceleration":
			                return OuyaExampleCommon.GetButton( OuyaSDK.KeyEnum.BUTTON_O, player);
			            case "Orbit":
			                return OuyaExampleCommon.GetButton(OuyaSDK.KeyEnum.BUTTON_U, player);  
			            case "Option":
			                return OuyaExampleCommon.GetButton( OuyaSDK.KeyEnum.BUTTON_Y, player);      
			            case "Exit":
			                return OuyaExampleCommon.GetButton( OuyaSDK.KeyEnum.BUTTON_A, player);       
			            case "TurnLeft":
			                return OuyaExampleCommon.GetButton( OuyaSDK.KeyEnum.BUTTON_LT, player);
			            case "TurnRight":
			                return OuyaExampleCommon.GetButton( OuyaSDK.KeyEnum.BUTTON_RT, player);
			            case "SkipLeft":
			                return OuyaExampleCommon.GetButton( OuyaSDK.KeyEnum.BUTTON_LB, player);
			            case "SkipRight":
			                return OuyaExampleCommon.GetButton( OuyaSDK.KeyEnum.BUTTON_RB, player);
			            case "DLeft":
			            	return OuyaExampleCommon.GetButton( OuyaSDK.KeyEnum.BUTTON_DPAD_LEFT, player  );  
			            case "DRight":
			            	return OuyaExampleCommon.GetButton( OuyaSDK.KeyEnum.BUTTON_DPAD_RIGHT, player  ); 
			            case "DUp":
			            	return OuyaExampleCommon.GetButton( OuyaSDK.KeyEnum.BUTTON_DPAD_UP , player );
			            case "DDown":
			            	return OuyaExampleCommon.GetButton( OuyaSDK.KeyEnum.BUTTON_DPAD_DOWN , player );		 	
				    default:
					return false;
			        }  
    }
    }
}

