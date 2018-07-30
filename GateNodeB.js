#pragma strict

@HideInInspector var inTrig=false;
@HideInInspector var outTrig=true;

var collisionTracker:PlayerGateCounter;


function OnTriggerEnter(collider:Collider)
{
//	Debug.Log("I'm hit");
	if(collider.GetComponent(KayakerController) == null)
	{
	
	return;
	}
	else
	{
		collisionTracker.SetPlayer (collider.GetComponent(KayakerController).isPlayer);
		
		if(inTrig)
		{
		
			if(collisionTracker.hitOut==0)
			{
			collisionTracker.hitIn=1;
			}
			else
			{
				collisionTracker.hitIn=2;
				collisionTracker.TestCollides();
			}
			
		}
		else if(outTrig)
		{
		
			if(collisionTracker.hitIn==0)
			{
			collisionTracker.hitOut=1;
			}
			else
			{
				collisionTracker.hitOut=2;
				collisionTracker.TestCollides();
			}
		}
		
	}
}



//function OnDrawGizmos()
//{
//	Gizmos.color = Color(0,0,2,0.2);
//	Gizmos.DrawCube((transform.position + GetComponent(BoxCollider).center), GetComponent(BoxCollider).size);
//}