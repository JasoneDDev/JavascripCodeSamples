#pragma strict
var gateGameObject:GameObject;
var gateArray:Transform[];

@HideInInspector var startScript:StartScript;
startScript = FindObjectOfType(StartScript);

@HideInInspector var gui:GUI_HUD;
gui = FindObjectOfType(GUI_HUD);

function BuildScene(): boolean
{

	for(var g in gateArray)
	{
		var gate = Instantiate(gateGameObject,g.position,g.rotation);
		gate.transform.parent = g.transform;
		
	}
	startScript.gatesArePresent=true;
	gui.Flags.hidden=false;
	gui.FlagsSprite.hidden=false;
	if(startScript.multiplayerPVP)
		{
	gui.FlagsP2.hidden=false;
	gui.FlagsSpriteP2.hidden=false;
	}

return true;
}

