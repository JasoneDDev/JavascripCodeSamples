#pragma strict

@HideInInspector var inTrig=true;
@HideInInspector var outTrig=false;

var collisionTracker:PlayerGateCounter;


function OnTriggerEnter(collider:Collider)
{
	//Debug.Log("I'm hit");
	if(collider.GetComponent(KayakerController) == null)
	{
	
	return;
	}
	else
	{
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


//
//function OnDrawGizmos()
//{
//	Gizmos.color = Color(2,0,0,0.2);
//	Gizmos.DrawCube((transform.position + GetComponent(BoxCollider).center), GetComponent(BoxCollider).size);
//}