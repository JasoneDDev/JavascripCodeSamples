#pragma strict
import System.IO;

private var keyboard : TouchScreenKeyboard;

var RTCam:Camera;

var RT:RenderTexture;


var CharacterMaterial01:Material;
var CharacterMaterial02:Material;
var CharacterMaterial03:Material;
var CharacterMaterial04:Material;

var LJ_Material01:Material;
var LJ_Material02:Material;
var LJ_Material03:Material;
var LJ_Material04:Material;

@HideInInspector var playerMat:Material;
@HideInInspector var jacketMat:Material;

var customizedCharacter:Transform[];
var charLifeJacket:Transform;

var spawnedHelmet:GameObject;
var currentHelmet:int;
var helmetColor:int;
var HelmetArray:GameObject[];
var LockedHelmetArray:GameObject[];

var spawnedHair:GameObject;
var currentHair:int;
var hairColor:int;
var HairArray:GameObject[];
var LockedHairArray:GameObject[];

var currentSkin:int;
var skinToneArray:Texture2D[];
var currenteyeX:int;
var eyeXArray:Texture2D[];
var currentEyes:int;
var eyesArray:Texture2D[];
var currentMouthX:int;
var mouthXArray:Texture2D[];
var currentShirt:int;
var shirtArray:Texture2D[];
var currentShorts:int;
var shortsArray:Texture2D[];

var currentJacket:int;
var jacketArray:Texture2D[];

var SavedCharacter:String[];

var currentChar:int;

var CharResetMat01:Material;
var CharResetMat02:Material;
var CharResetMat03:Material;
var CharResetMat04:Material;

@HideInInspector var headNode:GameObject;

@HideInInspector var typingName=false;

private var gui :GUI_Menu; 
gui = FindObjectOfType(GUI_Menu);
// in this script I need to be able to save characters into an array and parse that array to retreive the characters once saved
// as well as delete from the array

function Start()
{
headNode = GameObject.Find("HatNode");
Debug.Log("headnode " + headNode.name);
//PlayerPrefs.DeleteAll();
//here we need to grab a save file that will contain all the saved character configs that users have made
var unlockHel = UnlockHelmets();
yield unlockHel;
var unlockHairs = UnlockHairs();
yield unlockHairs;


var charSaved = new Array(PlayerPrefsX.GetStringArray("characterDB"));
	if(charSaved !=null)
	{
		SavedCharacter = charSaved;
	}
	
	LoadCharacter(true,1);
	
	
	//CharResetMat01.mainTexture = RT;
	//CharResetMat02.mainTexture = RT;
	//CharResetMat03.mainTexture = RT;
	//CharResetMat04.mainTexture = RT;
}

function InputName()
{

#if !UNITY_EDITOR
//call keyboard
gui.charName.clear();
keyboard = TouchScreenKeyboard.Open(gui.charName.text, TouchScreenKeyboardType.NamePhonePad);

#endif
typingName=true;
}

function LateUpdate()
{

if(typingName)
{
#if UNITY_ANDROID || UNITY_IPHONE 
 for (var c : char in Input.inputString) {
        // Backspace - Remove the last character
        if (c == "\b"[0]) {
            if (gui.charName.text.Length != 0)
               gui.charName.text = gui.charName.text.Substring(0, gui.charName.text.Length - 1);
               gui.charName.positionFromCenter(-0.415f,0f);
                 
        }
        // End of entry
        else if (c == "\n"[0] || c == "\r"[0]) {// "\n" for Mac, "\r" for windows.
            //print ("User entered his name: " + opusText.text);
             
             
            typingName = false;
        }
        // Normal text input - just append to the end
        else if(gui.charName.text.Length < 15)
        {
            gui.charName.text += "" + c;
            gui.charName.positionFromCenter(-0.415f,0f);
        }
    }
    
#endif
#if !UNITY_EDITOR
		if(keyboard.done)
		{
			typingName=false;
		}
		if(keyboard)
		{
        gui.charName.text = keyboard.text;
        }
        
#endif		
		

				
     
        
            
}

}



function DeleteCharacter(characterName:String, player:int)
{

SavedCharacter = new Array(PlayerPrefsX.GetStringArray("characterDB"));

var reloadCharacter = new Array(SavedCharacter);


var arrayValue:int;
		for(var i:int=0; i < reloadCharacter.length; i++)
			{
			var findingChar:String[] = reloadCharacter[i].ToString().Split(","[0]);
				if(findingChar[0] == characterName )
				{
				Debug.Log(findingChar[0] + " : " + characterName);
				arrayValue=i;
				reloadCharacter.RemoveAt(arrayValue);
				}
			}
	


	print(reloadCharacter);
if(reloadCharacter.length > 0)
	{
PlayerPrefsX.SetStringArray("characterDB",reloadCharacter.ToBuiltin(String));
currentChar--;
LoadCharacter(false, player);
}

gui.OnCharacterDeleted();

}

function SaveCharSelection(player:int)
{
	var playerSetup:String;
	
	playerSetup = "" + currentHelmet + "," + helmetColor + "," + currentHair + "," + hairColor;
	Debug.Log(playerSetup + " " + "playerSetup"+player);
	PlayerPrefs.SetString("playerSetup"+player,playerSetup);
	PlayerPrefs.Save();
	
}

function SaveCharacter(characterName:String)
{
	SavedCharacter = new Array(PlayerPrefsX.GetStringArray("characterDB"));
	
	// struct for save file is "name", "Hat#","HatColor#", "skin#", "hair#", "hairColor#", "eyes#", "Glasses#", "Features#", " Jacket#", "shirt#", "shorts#"
	var newSave = new Array();
	newSave.Add(characterName);
	newSave.Add(""+ currentHelmet); // hats
	newSave.Add(""+ helmetColor); // hat color
	newSave.Add(""+ currentSkin);
	newSave.Add(""+ currentHair); //hair piece
	newSave.Add(""+ hairColor);  //hair color
	newSave.Add(""+ currentEyes);
	newSave.Add(""+ currenteyeX); // glasses
	newSave.Add(""+ currentMouthX); // facial features
	newSave.Add(""+ currentJacket);
	newSave.Add(""+ currentShirt);
	newSave.Add(""+ currentShorts);

	
	var reloadCharacter = new Array(SavedCharacter);

	var arrayValue:int;
		for(var i:int=0; i < reloadCharacter.length; i++)
			{
			var findingChar:String[] = reloadCharacter[i].ToString().Split(","[0]);
				if(findingChar[0].ToString() == newSave[0].ToString() )
				{
				Debug.Log(findingChar[0].ToString() + " : " + newSave[0].ToString());
				arrayValue=i;
				reloadCharacter.RemoveAt(arrayValue);
				}
				Debug.Log(findingChar[0].ToString() + " : " + newSave[0].ToString());
			}
	
		
		
	
	reloadCharacter.Add(newSave.ToString());
	
	print(newSave.ToString());
	PlayerPrefsX.SetStringArray("characterDB",reloadCharacter.ToBuiltin(String));
	
	gui.OnCharacterSaved();
}

function LoadCharacter(forward:boolean, player:int)
{
	var charToLoad = new Array(PlayerPrefsX.GetStringArray("characterDB"));
	
	if(forward)
	{
	currentChar++;
	}
	else
	{
	currentChar--;
	}
	Debug.Log(player + " player num");
	
	  if(currentChar>charToLoad.length-1 )
	{
	currentChar=0;
	}
	else if(currentChar< 0)
	{
	currentChar=charToLoad.length-1;
	}
var selectedChar:String[];	
	if(charToLoad.length<=0)
	{
	selectedChar = ["Pick A Name","0","0","0","0","0","0","0","0","0","0","0"];
	}
	else
	{
	var charString:String = charToLoad[currentChar];
	print(charString);
	selectedChar = charString.Split(","[0]);
	print(selectedChar[0]);
	
	if(selectedChar.Length<11)
	{
		selectedChar = ["Pick A Name","0","0","0","0","0","0","0","0","0","0","0"];
	}
	}
	
	if(player == 1 )
	{
	playerMat = CharacterMaterial01;
	jacketMat = LJ_Material01;
	}
	else if(player == 2)
	{
	playerMat = CharacterMaterial02;
	jacketMat = LJ_Material02;
	}
	else if(player == 3)
	{
	playerMat = CharacterMaterial03;
	jacketMat = LJ_Material03;
	}
	else if(player == 4)
	{
	playerMat = CharacterMaterial04;
	jacketMat = LJ_Material04;
	}
	
	gui.charName.clear();
	gui.charName.text = "" + selectedChar[0];
	gui.charName.positionFromCenter(-0.4f,0f);
	//hat is 1
	//hair is 3
	playerMat.SetTexture("_DecalTexB",eyesArray[int.Parse(selectedChar[6])]);
	playerMat.SetTexture("_MainTex",skinToneArray[int.Parse(selectedChar[3])]);
	playerMat.SetTexture("_DecalTex",eyeXArray[int.Parse(selectedChar[7])]);
	playerMat.SetTexture("_DecalTexC",mouthXArray[int.Parse(selectedChar[8])]);
	playerMat.SetTexture("_DecalTexD",shirtArray[int.Parse(selectedChar[10])]);
	playerMat.SetTexture("_DecalTexE",shortsArray[int.Parse(selectedChar[11])]);
	
	jacketMat.SetTexture("_MainTex",jacketArray[int.Parse(selectedChar[9])]);
		// struct for save file is "name", "Hat#","HatColor#", "skin#", "hair#", "hairColor#", "eyes#", "Glasses#", "Features#", " Jacket#", "shirt#", "shorts#"
	
	// load helmet
	currentHelmet = int.Parse(selectedChar[1]);
	helmetColor = int.Parse(selectedChar[2]);
	
		if(spawnedHelmet!=null)
	{
		Destroy(spawnedHelmet.gameObject);
	}	
		if(currentHelmet < HelmetArray.Length)
		{
		spawnedHelmet = Instantiate(HelmetArray[currentHelmet],headNode.transform.position,headNode.transform.rotation);
		spawnedHelmet.transform.parent = headNode.transform.parent;
		//spawnedHelmet.transform.position=Vector3(0,0,0);
		Debug.Log("helmet spawned");
		}
		if(helmetColor< HelmetArray[currentHelmet].GetComponent(HatTypeScript).MaterialArray.Length)
		{
		HelmetArray[currentHelmet].GetComponent(HatTypeScript).SwapColor(helmetColor, player);
		}
	
	
	//load hair
	
	currentHair = int.Parse(selectedChar[4]);
	hairColor = int.Parse(selectedChar[5]);
	
		if(spawnedHair!=null)
	{
		Destroy(spawnedHair.gameObject);
	}	
		if(currentHair < HairArray.Length)
		{
		spawnedHair = Instantiate(HairArray[currentHair],headNode.transform.position,headNode.transform.rotation);
		spawnedHair.transform.parent = headNode.transform.parent;
		}
		if(hairColor< HairArray[currentHair].GetComponent(HatTypeScript).MaterialArray.Length)
		{
		HairArray[currentHair].GetComponent(HatTypeScript).SwapColor(hairColor, player);
		}
		
		
	
}

function SwapHelmet(forward:boolean, player:int)// make another variable to see what player it is so we change the correct material to match the player
{
	
	if(forward)
	{
		helmetColor++;
		if(helmetColor > HelmetArray[currentHelmet].GetComponent(HatTypeScript).MaterialArray.length-1)
		{
			helmetColor = 0;
			currentHelmet++;
			
			if(currentHelmet > HelmetArray.Length-1)
			{
				currentHelmet=0;
			}
				if(spawnedHelmet!=null)
				{
				Destroy(spawnedHelmet);
				}
				
				spawnedHelmet = Instantiate(HelmetArray[currentHelmet],headNode.transform.position,headNode.transform.rotation);
				spawnedHelmet.transform.parent = headNode.transform.parent;
				
				HelmetArray[currentHelmet].GetComponent(HatTypeScript).SwapColor(helmetColor, player);
				
		}
		else
		{
		spawnedHelmet.GetComponent(HatTypeScript).SwapColor(helmetColor, player);
		}
	}
	else
	{
		helmetColor--;
		if(helmetColor < 0)
		{
			currentHelmet--;
			if(currentHelmet < 0)
			{
				currentHelmet = HelmetArray.Length-1;
			}
			helmetColor = HelmetArray[currentHelmet].GetComponent(HatTypeScript).MaterialArray.length-1;
			
			if(spawnedHelmet!=null)
			{
			Destroy(spawnedHelmet);
			}
			
			spawnedHelmet = Instantiate(HelmetArray[currentHelmet],headNode.transform.position,headNode.transform.rotation);
			spawnedHelmet.transform.parent = headNode.transform.parent;
			
			spawnedHelmet.GetComponent(HatTypeScript).SwapColor(helmetColor, player);
		}
		else
		{
		spawnedHelmet.GetComponent(HatTypeScript).SwapColor(helmetColor, player);
		}
		Debug.Log(currentHelmet);
	}
	
	
	
	
}

function SwapSkin(forward:boolean, player:int)
{
	if(forward)
	{
	currentSkin++;
	}
	else
	{
	currentSkin--;
	}
	
	
	if(player == 1 )
	{
	playerMat = CharacterMaterial01;
	}
	else if(player == 2)
	{
	playerMat = CharacterMaterial02;
	}
	else if(player == 3)
	{
	playerMat = CharacterMaterial03;
	}
	else if(player == 4)
	{
	playerMat = CharacterMaterial04;
	}
	
	Debug.Log("currentSkin " + currentSkin);
	if(currentSkin > skinToneArray.Length-1)
	{
	currentSkin =0;
	playerMat.SetTexture("_MainTex",skinToneArray[currentSkin]);
	}
	else if(currentSkin < 0)
	{
	currentSkin = skinToneArray.Length-1;
	playerMat.SetTexture("_MainTex",skinToneArray[currentSkin]);
	}
	else
	{
	playerMat.SetTexture("_MainTex",skinToneArray[currentSkin]);
	}
	
}

function SwapHair(forward:boolean, player:int)
{
	if(forward)
	{
		hairColor++;
		if(hairColor > HairArray[currentHair].GetComponent(HatTypeScript).MaterialArray.length-1)
		{
			hairColor = 0;
			currentHair++;
			
			if(currentHair > HairArray.Length-1)
			{
				currentHair=0;
			}
				if(spawnedHair!=null)
				{
				Destroy(spawnedHair);
				}
				
				spawnedHair = Instantiate(HairArray[currentHair],headNode.transform.position,headNode.transform.rotation);
				spawnedHair.transform.parent = headNode.transform.parent;
				
				HairArray[currentHair].GetComponent(HatTypeScript).SwapColor(hairColor, player);
				
		}
		else
		{
		spawnedHair.GetComponent(HatTypeScript).SwapColor(hairColor, player);
		}
	}
	else
	{
		hairColor--;
		if(hairColor < 0)
		{
			currentHair--;
			if(currentHair < 0)
			{
				currentHair = HairArray.Length-1;
			}
			hairColor = HairArray[currentHair].GetComponent(HatTypeScript).MaterialArray.length-1;
			
			if(spawnedHair!=null)
			{
			Destroy(spawnedHair);
			}
			
			spawnedHair = Instantiate(HairArray[currentHair],headNode.transform.position,headNode.transform.rotation);
			spawnedHair.transform.parent = headNode.transform.parent;
			
			spawnedHair.GetComponent(HatTypeScript).SwapColor(hairColor, player);
		}
		else
		{
		spawnedHair.GetComponent(HatTypeScript).SwapColor(hairColor, player);
		}
		Debug.Log(currentHair);
	}
	
}

function SwapEyes(forward:boolean, player:int)
{
	if(forward)
	{
	currentEyes++;
	}
	else
	{
	currentEyes--;
	}
	
	
	if(player == 1 )
	{
	playerMat = CharacterMaterial01;
	}
	else if(player == 2)
	{
	playerMat = CharacterMaterial02;
	}
	else if(player == 3)
	{
	playerMat = CharacterMaterial03;
	}
	else if(player == 4)
	{
	playerMat = CharacterMaterial04;
	}
	
	Debug.Log("currentEyes " + currentEyes);
	if(currentEyes > eyesArray.Length-1)
	{
	currentEyes =0;
	playerMat.SetTexture("_DecalTexB",eyesArray[currentEyes]);
	}
	else if(currentEyes < 0)
	{
	currentEyes = eyesArray.Length-1;
	playerMat.SetTexture("_DecalTexB",eyesArray[currentEyes]);
	}
	else
	{
	playerMat.SetTexture("_DecalTexB",eyesArray[currentEyes]);
	}
	
}

function SwapEyesX(forward:boolean, player:int)
{
	if(forward)
	{
	currenteyeX++;
	}
	else
	{
	currenteyeX--;
	}
	
	
	if(player == 1 )
	{
	playerMat = CharacterMaterial01;
	}
	else if(player == 2)
	{
	playerMat = CharacterMaterial02;
	}
	else if(player == 3)
	{
	playerMat = CharacterMaterial03;
	}
	else if(player == 4)
	{
	playerMat = CharacterMaterial04;
	}
	
	Debug.Log("currentEyes " + currenteyeX);
	if(currenteyeX > eyeXArray.Length-1)
	{
	currenteyeX =0;
	playerMat.SetTexture("_DecalTex",eyeXArray[currenteyeX]);
	}
	else if(currenteyeX < 0)
	{
	currenteyeX = eyeXArray.Length-1;
	playerMat.SetTexture("_DecalTex",eyeXArray[currenteyeX]);
	}
	else
	{
	playerMat.SetTexture("_DecalTex",eyeXArray[currenteyeX]);
	}
	
}

function SwapFeatures(forward:boolean, player:int)
{
	if(forward)
	{
	currentMouthX++;
	}
	else
	{
	currentMouthX--;
	}
	
	
	if(player == 1 )
	{
	playerMat = CharacterMaterial01;
	}
	else if(player == 2)
	{
	playerMat = CharacterMaterial02;
	}
	else if(player == 3)
	{
	playerMat = CharacterMaterial03;
	}
	else if(player == 4)
	{
	playerMat = CharacterMaterial04;
	}
	
	Debug.Log("currentEyes " + currentMouthX);
	if(currentMouthX > mouthXArray.Length-1)
	{
	currentMouthX =0;
	playerMat.SetTexture("_DecalTexC",mouthXArray[currentMouthX]);
	}
	else if(currentMouthX < 0)
	{
	currentMouthX = mouthXArray.Length-1;
	playerMat.SetTexture("_DecalTexC",mouthXArray[currentMouthX]);
	}
	else
	{
	playerMat.SetTexture("_DecalTexC",mouthXArray[currentMouthX]);
	}
	
}

function SwapLifeJacket(forward:boolean, player:int)
{
	if(forward)
	{
	currentJacket++;
	}
	else
	{
	currentJacket--;
	}
	
	
	if(player == 1 )
	{
	jacketMat = LJ_Material01;
	
	}
	else if(player == 2)
	{
	jacketMat = LJ_Material02;
	}
	else if(player == 3)
	{
	jacketMat = LJ_Material03;
	}
	else if(player == 4)
	{
	jacketMat = LJ_Material04;
	}
	
	Debug.Log("currentSkin " + currentJacket);
	if(currentJacket > jacketArray.Length-1)
	{
	currentJacket =0;
	jacketMat.SetTexture("_MainTex",jacketArray[currentJacket]);
	}
	else if(currentJacket < 0)
	{
	currentJacket = jacketArray.Length-1;
	jacketMat.SetTexture("_MainTex",jacketArray[currentJacket]);
	}
	else
	{
	jacketMat.SetTexture("_MainTex",jacketArray[currentJacket]);
	}
	
}

function SwapShirt(forward:boolean, player:int)
{
	if(forward)
	{
	currentShirt++;
	}
	else
	{
	currentShirt--;
	}
	
	
	if(player == 1 )
	{
	playerMat = CharacterMaterial01;
	
	}
	else if(player == 2)
	{
	playerMat = CharacterMaterial02;
	}
	else if(player == 3)
	{
	playerMat = CharacterMaterial03;
	}
	else if(player == 4)
	{
	playerMat = CharacterMaterial04;
	}
	
	Debug.Log("currentSkin " + currentShirt);
	if(currentShirt > shirtArray.Length-1)
	{
	currentShirt =0;
	playerMat.SetTexture("_DecalTexD",shirtArray[currentShirt]);
	}
	else if(currentShirt < 0)
	{
	currentShirt = shirtArray.Length-1;
	playerMat.SetTexture("_DecalTexD",shirtArray[currentShirt]);
	}
	else
	{
	playerMat.SetTexture("_DecalTexD",shirtArray[currentShirt]);
	}
	
}

function SwapShorts(forward:boolean, player:int)
{
	if(forward)
	{
	currentShorts++;
	}
	else
	{
	currentShorts--;
	}
	
	
	if(player == 1 )
	{
	playerMat = CharacterMaterial01;
	}
	else if(player == 2)
	{
	playerMat = CharacterMaterial02;
	}
	else if(player == 3)
	{
	playerMat = CharacterMaterial03;
	}
	else if(player == 4)
	{
	playerMat = CharacterMaterial04;
	}
	
	
	Debug.Log("currentShorts " + currentShorts);
	if(currentShorts > shortsArray.Length-1)
	{
	currentShorts =0;
	playerMat.SetTexture("_DecalTexE",shortsArray[currentShorts]);
	}
	else if(currentShorts < 0)
	{
	currentShorts = shortsArray.Length-1;
	playerMat.SetTexture("_DecalTexE",shortsArray[currentShorts]);
	}
	else
	{
	playerMat.SetTexture("_DecalTexE",shortsArray[currentShorts]);
	}


}

function ChangePlayer(playerNum:int)
{
yield WaitForSeconds(0.2);
if(playerNum==1)
{
	
	for(var t in customizedCharacter)
	{
	t.GetComponent(Renderer).renderer.material = CharacterMaterial01;
	}
	charLifeJacket.GetComponent(Renderer).renderer.material = LJ_Material01;

}
else if(playerNum==2)
{
	
	for(var t in customizedCharacter)
	{
	t.GetComponent(Renderer).renderer.material = CharacterMaterial02;
	}
	charLifeJacket.GetComponent(Renderer).renderer.material = LJ_Material02;

}
else if(playerNum==3)
{

for(var t1 in customizedCharacter)
	{
	t1.GetComponent(Renderer).renderer.material = CharacterMaterial03;
	}
	charLifeJacket.GetComponent(Renderer).renderer.material = LJ_Material03;
}
else if(playerNum==4)
{

for(var t2 in customizedCharacter)
	{
	t2.GetComponent(Renderer).renderer.material = CharacterMaterial04;
	}
	charLifeJacket.GetComponent(Renderer).renderer.material = LJ_Material04;
}


}

function SaveCharMap(charNum:int)
{

//// We should only read the screen bufferafter rendering is complete
//       yield WaitForEndOfFrame();
//        // Create a texture the size of the screen, RGB24 format
//        
//        var width = RTCam.targetTexture.width;
//        var height = RTCam.targetTexture.height;
//        RenderTexture.active = RTCam.targetTexture;
//        var tex = new Texture2D (width, height);
//        // Read screen contents into the texture
//        tex.ReadPixels (Rect(0, 0, width, height), 0, 0);
//        tex.Apply ();
//        // Encode texture into PNG
//        var bytes = tex.EncodeToPNG();
//        Destroy (tex);
//
//#if !UNITY_EDITOR && UNITY_ANDROID
//
//	if (!System.IO.Directory.Exists(Application.persistentDataPath + "/CharacterMaps")){
//     		 var wait = System.IO.Directory.CreateDirectory(Application.persistentDataPath + "/CharacterMaps");
//     		 yield wait;
//     		}
//        // For testing purposes, also write to a file in the project folder
//        File.WriteAllBytes(Application.persistentDataPath + "/CharacterMaps/Char0"+ charNum + ".png", bytes);
//	print(Application.persistentDataPath + "/CharacterMaps/Char0"+ charNum + ".png");
//#else    
//        if (!System.IO.Directory.Exists(Application.dataPath + "/CharacterMaps")){
//     		 var wait = System.IO.Directory.CreateDirectory(Application.dataPath + "/CharacterMaps");
//     		 yield wait;
//     		}
//        // For testing purposes, also write to a file in the project folder
//        File.WriteAllBytes(Application.dataPath + "/CharacterMaps/Char0"+ charNum + ".png", bytes);
//	print(Application.dataPath + "/CharacterMaps/Char0"+ charNum + ".png");
//#endif
}



function UnlockHelmets():boolean
{

	var StringText1:String = PlayerPrefs.GetString("unlockedHats");
	var helArray:String[] = StringText1.Split(","[0]);
	
	//   int.Parse();
	//Debug.Log(PlayerPrefs.GetString("unlockedKayaks"));
	//Debug.Log(PlayerPrefs.GetString("unlockedKayaks"));	
	
	for (var i in helArray)
	{
		if(i != "")
		{
			if(LockedHelmetArray.Length-1 >= int.Parse(i))
			{
			var tempOBJ:GameObject = LockedHelmetArray[int.Parse(i)];
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
	
	//   int.Parse();
	//Debug.Log(PlayerPrefs.GetString("unlockedKayaks"));
	//Debug.Log(PlayerPrefs.GetString("unlockedKayaks"));	
	
	for (var i in hairArray)
	{
		if(i != "")
		{
			if(LockedHairArray.Length-1 >= int.Parse(i))
			{
			var tempOBJ2:GameObject = LockedHairArray[int.Parse(i)];
			HairArray += [tempOBJ2];
			}
		}
	}

return true;
}