#pragma strict


@HideInInspector var startScript :StartScript; 
startScript = FindObjectOfType(StartScript);

function OnDrawGizmos()
{
	Gizmos.DrawIcon(transform.position, "EndMarker.png");
}

function OnTriggerEnter(collider:Collider)
{
	
	if(collider.GetComponent(KayakerController) == null)
	{
	
	return;
	}
	else 
	{
		
		if(collider.GetComponent(KayakerController).isPlayer==1)
		{
		startScript.bonusWin+=5;
		}
		else if(collider.GetComponent(KayakerController).isPlayer==2)
		{
		startScript.bonusWinP2+=5;
		}
		
		startScript.CourseComplete();
	}
}