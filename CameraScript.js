
// The target we are following
private var target : Transform;
// The distance in the x-z plane to the target
private var distance = 5.0f;
// the height we want the camera to be above the target
var height = 5.0;
// How much we 
var heightDamping = 2.0;
var rotationDamping = 3.0;
var zoomRate:int = 40; 

var xSpeed:float = 200.0f;
var ySpeed:float = 200.0f;

private var  xDeg:float = 0.0f;
private var yDeg:float = 0.0f;
var yMinLimit:int = -80;
var yMaxLimit:int = 80;
var zoomDampening:float = 5.0f;

var  maxDistance:float = 20; 
 var  minDistance:float = .6f; 

var  targetOffset:Vector3;
private var currentDistance:float;
private var correctedDistance:float;
private var halfDistance:float;
private var desiredDistance:float;
private var currentRotation:Quaternion;
private var desiredRotation:Quaternion;
@HideInInspector var position:Vector3;
@HideInInspector var rotation:Quaternion;
   
   var PlayerNode:Transform;
   var StartNode:Transform;
    var FinishNode:Transform; 
 
    var isMenuCamera=false;
// Place the script in the Camera-Control group in the component menu
@script AddComponentMenu("Camera/CameraLockPOS")

@HideInInspector var wantedPosition:Vector3;
@HideInInspector var wantedRotation:Quaternion;


private var startScript :StartScript; 
startScript = FindObjectOfType(StartScript);

private var guiMenu :GUI_Menu; 
guiMenu = FindObjectOfType(GUI_Menu);

function Start()
{
			//distance = Vector3.Distance(transform.position, target.position);
        	currentDistance = distance;
        	halfDistance = distance*0.5;
        	desiredDistance = distance;

        	//be sure to grab the current rotations as starting points.
        	position = transform.position;
        	rotation = transform.rotation;
        	currentRotation = transform.rotation;
        	desiredRotation = transform.rotation;

        	xDeg = Vector3.Angle(Vector3.right, transform.right);
        	yDeg = Vector3.Angle(Vector3.up, transform.up);
        	
        	target = GameObject.FindWithTag("MainCamera").transform;
        	target.position.y += height;
        	
        
        	
        	StartNode = GameObject.FindGameObjectWithTag("StartNode").transform;
        	FinishNode = GameObject.FindGameObjectWithTag("FinishNode").transform;
        	//player node is set by gameMaster when game starts
        	
        		transform.position = StartNode.position;
}



function FixedUpdate () {

	if(!isMenuCamera)
	{
	
	if(startScript.startMode)
	{
	//need to make variables to send POS info to so when this is active we can change the cam views.
	
	wantedPosition =  StartNode.position;
	wantedRotation = StartNode.rotation;
	
	transform.localPosition = Vector3.Lerp (transform.localPosition, wantedPosition,Time.deltaTime * (zoomDampening*0.5));
	transform.localRotation = Quaternion.Slerp (transform.localRotation, wantedRotation, Time.deltaTime * (zoomDampening*0.5));
	
	}
	else if(startScript.playerMode)
	{

		 wantedPosition =  PlayerNode.position;
		 wantedRotation = PlayerNode.rotation;
		  
		 transform.position = Vector3.Lerp (transform.position, wantedPosition,Time.deltaTime * (zoomDampening*0.5));
		transform.rotation = Quaternion.Slerp (transform.rotation, wantedRotation, Time.deltaTime * (zoomDampening*0.5));
	
	}
	else if(startScript.FinishMode)
	{
		 
		 wantedPosition = FinishNode.position;
		 wantedRotation = FinishNode.rotation;
		 transform.localPosition = Vector3.Lerp (transform.localPosition, wantedPosition,Time.deltaTime * (zoomDampening*0.5));
		transform.localRotation = Quaternion.Slerp (transform.localRotation, wantedRotation, Time.deltaTime * (zoomDampening*0.5));
	
	}
	}
	else
{

	if(guiMenu.startingLocation)
	{
	
	wantedPosition = StartNode.position;
	wantedRotation = StartNode.rotation;
	
	transform.localPosition = Vector3.Lerp (transform.localPosition, wantedPosition,Time.deltaTime * (zoomDampening*0.5));
	transform.localRotation = Quaternion.Slerp (transform.localRotation, wantedRotation, Time.deltaTime * (zoomDampening*0.5));
	}
	else if(guiMenu.customizeLocation)
	{
	 wantedPosition =  PlayerNode.position;
		 wantedRotation = PlayerNode.rotation;
		 
		 transform.localPosition = Vector3.Lerp (transform.localPosition, wantedPosition,Time.deltaTime * (zoomDampening*0.5));
	transform.localRotation = Quaternion.Slerp (transform.localRotation, wantedRotation, Time.deltaTime * (zoomDampening*0.5));
	}
	else if(guiMenu.riverLocation)
	{
	
	 wantedPosition = FinishNode.position;
		 wantedRotation = FinishNode.rotation;
		 transform.localPosition = Vector3.Lerp (transform.localPosition, wantedPosition,Time.deltaTime * (zoomDampening*0.5));
		transform.localRotation = Quaternion.Slerp (transform.localRotation, wantedRotation, Time.deltaTime * (zoomDampening*0.5));
	
	
	}
	
			
				
		}	

	
}

function ClampAngle(angle:float , min:float , max:float )
    {
        if (angle < -360)
            angle += 360;
        if (angle > 360)
            angle -= 360;
        return Mathf.Clamp(angle, min, max);
    }
    
    
