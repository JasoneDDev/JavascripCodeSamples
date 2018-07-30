#pragma strict
var currentsMultiForce:float =1.0;
var currentsForce:float;

var riverAudio:AudioClip;
@HideInInspector var currentModyfier=Vector3(0,0,1);

@HideInInspector var transformForward:Vector3;
@HideInInspector var transformRight:Vector3;
@HideInInspector var transformUp:Vector3;

@HideInInspector var currentMain:Vector3;

private var loader:loadingScript;
loader = FindObjectOfType(loadingScript);

function Start()
{
if(!loader.isMobile)
{
currentsForce*=currentsMultiForce;
}
else if(currentsMultiForce>2)
{
currentsForce*=(currentsMultiForce*0.5);
}

transformForward = transform.TransformDirection(Vector3.forward) * currentModyfier.z;
transformRight = transform.TransformDirection(Vector3.right) * currentModyfier.x;
transformUp = transform.TransformDirection(Vector3.up) * currentModyfier.y;

currentModyfier = transformForward + transformRight + transformUp;

currentMain = currentModyfier;

currentModyfier.y = currentMain.y;
	currentModyfier.x = currentMain.x ;
	currentModyfier.z = currentMain.z ;
}

function OnDrawGizmos()
{
	Gizmos.DrawIcon(transform.position, "CurrentMarker.png");
}

