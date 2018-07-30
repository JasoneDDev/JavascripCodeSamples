#pragma strict

@HideInInspector var TimeToComplete:float = 0.0;

@HideInInspector var startScript:StartScript;
startScript = FindObjectOfType(StartScript);

function BuildScene(): boolean
{
	TimeToComplete = PlayerPrefs.GetFloat("" + Application.loadedLevelName + "BestTime");
	//TimeToComplete*=60;
	startScript.TimeToCompleteIn = TimeToComplete ;

return true;
}