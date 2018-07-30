#pragma strict

var StuntPOS:Transform[];
var Stunts:GameObject[];

@HideInInspector var startScript:StartScript;
startScript = FindObjectOfType(StartScript);

@HideInInspector var gui:GUI_HUD;
gui = FindObjectOfType(GUI_HUD);

function BuildScene(): boolean
{

	if(StuntPOS.Length == Stunts.Length)
	{
	}
	else
	{
	Debug.Log("You need to make the 2 lists match");
	return;
	}
	
	for(var i:int=0; i < StuntPOS.Length; i++)
	{
		var stunt = Instantiate(Stunts[i],StuntPOS[i].position,StuntPOS[i].rotation);
		stunt.transform.parent = StuntPOS[i].transform;
		
	}
	
		gui.StuntSprite.hidden=false;
		gui.Stunts.hidden=false;
		if(startScript.multiplayerPVP)
		{
		
		gui.StuntSpriteP2.hidden=false;
		gui.StuntsP2.hidden=false;
		}
	startScript.stuntsArePresent=true;

return true;
}