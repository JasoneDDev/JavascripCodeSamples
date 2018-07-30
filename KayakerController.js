
#pragma strict
var isPlayer:int;
@HideInInspector var playerName;
@HideInInspector var currentKayak:KayakScript;
@HideInInspector var Direction:float;
@HideInInspector var DirectionAnim:float;
@HideInInspector var Tilt:float;
@HideInInspector var Speed:float;
@HideInInspector var StuntMode:boolean;// this needs a timer so that it get unset once we move away from the stunt area
@HideInInspector var stuntScript:StuntZone;
@HideInInspector var heightChange:float;
@HideInInspector var heightTagged:float;

var animator:Animator;

@HideInInspector var cycle=false;

var lSidePaddle:Transform;
var rSidePaddle:Transform;
var collidingWater=true; //-----------------------------------
var paddleSplash:GameObject;

@HideInInspector var lSplash=false;
@HideInInspector var rSplash=false;
@HideInInspector var strokeR=false;
@HideInInspector var strokeL=false;

var invY=1;

@HideInInspector var Strength:float;
@HideInInspector var TStrength:float;
@HideInInspector var liftForce:float;
@HideInInspector var upRiverTracking:float;
@HideInInspector var dragOffset:float;
@HideInInspector var angDragOffset:float;
@HideInInspector var MaxSpeed :float;
@HideInInspector var ContinuousDrag:float;


@HideInInspector var multiHiders:GameObject[];

var paddleL:AudioClip;
var paddleR:AudioClip;

var pLAudio:AudioSource;
var pRAudio:AudioSource;

var drownPause:float;
var drown:AudioClip;

var goFastTimer:float;
var JustSaidYahoo=false;
var yahoo:AudioClip[];


var wooTimer:float;
var wooHitsR:int;
var wooHitsL:int;

var woo:AudioClip;

var justSaidLetsGo=false;
var letsGo:AudioClip;



private var velocityTemp:Vector3;
private var velocityRotTemp:Vector3;

private var isPaused=false;

//stunt variables----------------------

var noseDown=false;
var startAngle:float;
var pitchAngle:float;
var yawAngle:float;
var rollAngle:float;
var heightDrop:float;

var stuntTimer:float;

var stuntReset=false;

var stuntStarted=false;
var stuntClockStart:float;
var stuntClock:float;



var deltaRotation : float = 0.0;
var alphaRotation:float =0.0;
var betaRotation:float=0.0;

var currentRotation : float = 0.0;

var WindupRotation : float = 0.0;

private var wrighted=true;
//-------------------------------------


@HideInInspector var waterCurrent:Transform;
@HideInInspector var waterCurrentMarkers:GameObject[];

private var startScript :StartScript; 
startScript = FindObjectOfType(StartScript);

@HideInInspector var BCollide:BoxCollider;
BCollide = GetComponent(BoxCollider);

@HideInInspector var regBSize:Vector3;


private var loader:loadingScript;
loader = FindObjectOfType(loadingScript);


 private var gui :GUI_HUD; 
gui = FindObjectOfType(GUI_HUD);



   



function Start () {



if(isPlayer == 1 || isPlayer == null)
{
playerName = loader.Players[0];
LoadCharacterAccessories(1);
}
else if(isPlayer == 2)
{
playerName = loader.Players[1];
LoadCharacterAccessories(2);
}
else if(isPlayer == 3)
{
playerName =loader.Players[2];
LoadCharacterAccessories(3);
}
else if(isPlayer == 4)
{
playerName = loader.Players[3];
LoadCharacterAccessories(4);
}

yield WaitForSeconds(0.5);//wait for the kayak to be cloned to get the info from the script

//once we have the appropriate kayak loaded, grab the info from it to feed the controller
Strength = currentKayak.Strength;
TStrength = currentKayak.TStrength;
liftForce = currentKayak.liftForce;
upRiverTracking = currentKayak.upRiverTracking;
dragOffset = currentKayak.dragOffset;
angDragOffset = currentKayak.angDragOffset;
MaxSpeed = currentKayak.MaxSpeed;
ContinuousDrag = currentKayak.ContinuousDrag;


BCollide.center = currentKayak.kayakColliderPOS;

regBSize = currentKayak.kayakColliderSize;//kayakColliderSize

BCollide.size = regBSize;

this.GetComponent(BuoyancyForce).Recalculate();

multiHiders = GameObject.FindGameObjectsWithTag("MultiHiders");
}

function GetClosestMarker(): GameObject
{

	waterCurrentMarkers = GameObject.FindGameObjectsWithTag("currentMarker");
	
	var distanceToMarker = Mathf.Infinity;
	var wantedEnemy : GameObject;
	
	
	for ( var marker : GameObject in waterCurrentMarkers)
	{
		
		var newDistanceToMarker = Vector3.SqrMagnitude( marker.transform.position - transform.position);
		if (newDistanceToMarker < distanceToMarker)
		{
				distanceToMarker = newDistanceToMarker;
				waterCurrent = marker.transform;
		
	}
}

}



function OnCollisionEnter(collider:Collision)
{
	var waterHit=collider.gameObject.GetComponent(FluidVolume);
	if(waterHit)
	{
		//turn it on
		collidingWater=true;
	}
	else
	{
		//ignore
	}
	
	if(collider.gameObject.tag != "Boundary" && collider.gameObject.tag != "CollissionObjects")
	{}
	else 
	{
	
	
	}
}

function OnCollisionStay(collider3:Collision)
{
	var waterHit3=collider3.gameObject.GetComponent(FluidVolume);
	if(waterHit3)
	{
		//turn it on
		collidingWater=true;
	}
	else
	{
		//ignore
		
	}
	
	var direction = Vector3.up;
	
	if(collider3.gameObject.name == "RBoundary"||collider3.gameObject.name == "LBoundary")
	{
	rigidbody.AddForce(direction * 2,ForceMode.Impulse); 
	}
	else if(collider3.gameObject.name == "prefab_stone_gr9" || collider3.gameObject.name == "prefab_stone_gr8" || collider3.gameObject.name == "prefab_stone_gr2" || collider3.gameObject.name == "prefab_stone_gr1" || collider3.gameObject.name == "prefab_stone_gr7")
	{
		if(!startScript.multiplayerPVP)
		{
		startScript.healthPower -= (startScript.healthPower*0.005);
		}
	}
	else
	{
	
	}
}


function OnCollisionExit(collider2:Collision)
{
	var waterHit2=collider2.gameObject.GetComponent(FluidVolume);
	if(waterHit2)
	{
		//turn it off
		collidingWater=false;
	}
	else
	{
	//ignore it
	}
}


function FixedUpdate () 
{

if(startScript.playerMode && !startScript.gamePaused)
{

if(isPaused)
{
	ResetVel();
	isPaused=false;
}

if(!justSaidLetsGo)
{
justSaidLetsGo=true;
audio.clip=letsGo;
audio.Play();
}

GetClosestMarker();

//-----------------------------------------------------------------------------------PARTICLE SYSTEM HIDE-------------
if(startScript.numOfPlayers <= 1)
{


	for(hide in multiHiders)
	{
		//hide.active=false;
		var particleDistance = Vector3.SqrMagnitude( hide.transform.position - transform.position);
		var particleSystem : ParticleSystem;   
			particleSystem = hide.GetComponent(ParticleSystem);
	 var distanceToCompare:float = 50.0;
	
	 		
			if (particleSystem.enableEmission && particleDistance >  distanceToCompare * distanceToCompare)
			{
			    
			       particleSystem.enableEmission = false;
			    //   print("off");
			    
			 }
			 else if(!particleSystem.enableEmission &&  particleDistance <  distanceToCompare*distanceToCompare)
			 {       
			    
			       particleSystem.enableEmission = true;
			            //    print("on");
			 }
		
		
		
	}
}

//-----------------------------------------------------------------------------------PARTICLE SYSTEM HIDE END-------------


//Speed is set by left and right toggles plus forward or backward toggle...  if left and right stop then the speed amount decreases.
//counterForce
var riversForce:float;

if(Vector3.Angle(transform.forward, waterCurrent.GetComponent(CurrentMarker).currentModyfier) > 1.5 && Speed >=0.1f && collidingWater)
{
riversForce = waterCurrent.GetComponent(CurrentMarker).currentsForce * upRiverTracking;

}
else if(collidingWater)
{
riversForce = waterCurrent.GetComponent(CurrentMarker).currentsForce;

}
else
{
riversForce=0;
}

rigidbody.AddForce(waterCurrent.GetComponent(CurrentMarker).currentModyfier * riversForce,ForceMode.Acceleration); 


if (InputManager.GetAxis("Vertical", playerName) > 0.1 ||
	InputManager.GetAxis("Vertical", playerName) < -0.1 ||
	InputManager.GetAxis("Roll", playerName) >0.2 ||
	InputManager.GetAxis("Roll", playerName) <-0.2 ||
	gui.LToggle.joystickPosition.x > 0.1 ||
	gui.LToggle.joystickPosition.x < -0.1 ||
	gui.LToggle.joystickPosition.y > 0.08 ||
	gui.LToggle.joystickPosition.y <- 0.08)
{
			Tilt = 0;
					
			
			if(!StuntMode)
			{
			stuntReset = false;
			BCollide.size =regBSize;
			}
			else if(StuntMode)
			{
			heightTagged =  transform.position.y;
			BCollide.size = Vector3(3,0.85,7);
			}
			
				var turn:float;
				
			if ((InputManager.GetAxis("Roll", playerName) <-0.15 &&
				!InputManager.GetButton("TurnRight", playerName) &&
				!InputManager.GetButton("TurnLeft", playerName) &&
				startScript.thrustPower >=0.1  &&
				!cycle) ||
				(gui.LToggle.joystickPosition.x <- 0.45 &&
				startScript.thrustPower >=0.1  &&
				!cycle))
			{
				
				
				if(gui.LToggle.joystickPosition.x <- 0.08)
				{
					if((gui.LToggle.joystickPosition.x <- 0.95 && gui.LToggle.joystickPosition.y > 0.5) || (gui.LToggle.joystickPosition.x <- 0.95 && gui.LToggle.joystickPosition.y <- 0.5))
					{
						Direction = 0.85 * gui.LToggle.joystickPosition.x;
						DirectionAnim = 0.85 * gui.LToggle.joystickPosition.x;
						Debug.Log("one");
					}
					else if(gui.LToggle.joystickPosition.y < 0.5 && gui.LToggle.joystickPosition.y >- 0.5)
					{
						Direction = 1.0 * gui.LToggle.joystickPosition.x;
						DirectionAnim = 1.0 * gui.LToggle.joystickPosition.x;
						if(Speed>0.75)
						{
						Speed -=0.02 * MaxSpeed;
						}
						else if(Speed<-0.75)
						{
						Speed +=0.02 * MaxSpeed;
						}
						Debug.Log("two");
					}
					
					else
					{
					Direction = 0.55 * gui.LToggle.joystickPosition.x;
					DirectionAnim = 0.55 * gui.LToggle.joystickPosition.x;
					Debug.Log("three");
					}
				
				}
				else 
				{
					if(InputManager.GetAxis("Vertical", playerName)>- 0.4 && InputManager.GetAxis("Vertical", playerName)< 0.4)
					{
					Direction = 1.0 * InputManager.GetAxis("Roll", playerName);
					DirectionAnim = 1.0 * InputManager.GetAxis("Roll", playerName);
					
					if(Speed>0.75)
					{
					Speed -=0.02 * MaxSpeed;
					}
					else if(Speed<-0.75)
					{
					Speed +=0.02 * MaxSpeed;
					}
					
					}
					else
					{
					Direction = 0.75 * InputManager.GetAxis("Roll", playerName);
					DirectionAnim = 0.75 * InputManager.GetAxis("Roll", playerName);
					}
					
				}
				
				rigidbody.AddRelativeForce(-1*Vector3.up * liftForce,ForceMode.Impulse); 
				
				wooHitsR+=1;

				

				
				
		
				
				
			
			}
			else if ((InputManager.GetAxis("Roll", playerName) > 0.15 &&
			!InputManager.GetButton("TurnRight", playerName) &&
			!InputManager.GetButton("TurnLeft", playerName) &&
			startScript.thrustPower >=0.1  &&
			!cycle) ||
			(gui.LToggle.joystickPosition.x > 0.45 &&
			startScript.thrustPower >=0.1  &&
			!cycle))
			{
				
			
			if(gui.LToggle.joystickPosition.x > 0.08)
				{
					if((gui.LToggle.joystickPosition.x > 0.95 && gui.LToggle.joystickPosition.y > 0.5) || (gui.LToggle.joystickPosition.x > 0.95 && gui.LToggle.joystickPosition.y <- 0.5))
					{
					Direction = 0.85  * gui.LToggle.joystickPosition.x;
					DirectionAnim= 0.85  * gui.LToggle.joystickPosition.x;
					Debug.Log("one");
						
					}
					else if(gui.LToggle.joystickPosition.y < 0.5 && gui.LToggle.joystickPosition.y >- 0.5)
					{
					Direction = 1.0  * gui.LToggle.joystickPosition.x;
					DirectionAnim= 1.0  * gui.LToggle.joystickPosition.x;
						if(Speed>0.75)
						{
						Speed -=0.02 * MaxSpeed;
						}
						else if(Speed<-0.75)
						{
						Speed +=0.02 * MaxSpeed;
						}
						//Debug.Log("doing it ");
					Debug.Log("two");
					}
					
					else
					{
					Direction = 0.55  * (gui.LToggle.joystickPosition.x);
					DirectionAnim= 0.55  * (gui.LToggle.joystickPosition.x);
					Debug.Log("three");
					}
						
				}
				
				else
				{
				if(InputManager.GetAxis("Vertical", playerName)>- 0.4 && InputManager.GetAxis("Vertical", playerName)< 0.4)
					{
					Direction = 1.0 * InputManager.GetAxis("Roll", playerName);
					DirectionAnim= 1.0 * InputManager.GetAxis("Roll", playerName);
					if(Speed>0.75)
					{
					Speed -=0.02 * MaxSpeed;
					}
					else if(Speed<-0.75)
					{
					Speed +=0.02 * MaxSpeed;
					}
					}
					else
					{
					Direction = 0.75 * InputManager.GetAxis("Roll", playerName);
					DirectionAnim= 0.75 * InputManager.GetAxis("Roll", playerName);
					}
						
			}
			rigidbody.AddRelativeForce(-1*Vector3.up * liftForce ,ForceMode.Impulse); 
				
				wooHitsL+=1;

				
			
			}
			
			//PADDLING FORWARDS
			if( InputManager.GetAxis("Vertical", playerName) <-0.1 && !strokeR && startScript.thrustPower >=0.1 && !cycle  || InputManager.GetButton("DUp", playerName)  && !strokeR && startScript.thrustPower >=0.1 && !cycle || gui.LToggle.joystickPosition.y > 0.1 && !strokeR && startScript.thrustPower >=0.1 && !cycle)
			{
				if(Speed<MaxSpeed)
				{
				Speed += 0.3;
				}
				else
				{
				Speed=MaxSpeed;
				}
				strokeR = true;
				strokeL = false;
				
				CycleTime();
				startScript.thrustPower *= 0.70f;
				goFastTimer+=0.2;
				
			}
			else if(InputManager.GetAxis("Vertical", playerName) <-0.1 && !strokeL && startScript.thrustPower >=0.1  && !cycle  || InputManager.GetButton("DUp", playerName)  && !strokeL && startScript.thrustPower >=0.1 && !cycle || gui.LToggle.joystickPosition.y > 0.1 && !strokeL && startScript.thrustPower >=0.1 && !cycle)
			{
				if(Speed<MaxSpeed)
				{
				Speed += 0.3;
				}
				else
				{
				Speed=MaxSpeed;
				}
				strokeL = true;
				strokeR = false;
				CycleTime();
				startScript.thrustPower  *= 0.70f;
				goFastTimer+=0.2;
			}
			//PADDLING BACKWARDS
			else if(InputManager.GetAxis("Vertical", playerName) >0.1 && !strokeR && startScript.thrustPower >=0.1  && !cycle  || InputManager.GetButton("DDown", playerName)  && !strokeR && startScript.thrustPower >=0.1  && !cycle || gui.LToggle.joystickPosition.y <- 0.1 && !strokeR && startScript.thrustPower >=0.1 && !cycle)
			{
				if(Speed>-1*MaxSpeed)
				{
				Speed -= 0.25;
				}
				else
				{
				Speed=-1*MaxSpeed;
				}
				strokeR = true;
				strokeL = false;
				CycleTime();
				startScript.thrustPower  *= 0.70f;
				goFastTimer=0;
			}
			else if(InputManager.GetAxis("Vertical", playerName) >0.1 && !strokeL && startScript.thrustPower >=0.1  && !cycle  || InputManager.GetButton("DDown", playerName)  && !strokeL && startScript.thrustPower >=0.1  && !cycle || gui.LToggle.joystickPosition.y <- 0.1 && !strokeL && startScript.thrustPower >=0.1 && !cycle)
			{
				if(Speed>-1*MaxSpeed)
				{
				Speed -= 0.25;
				}
				else
				{
				Speed=-1*MaxSpeed;
				}
				strokeL = true;
				strokeR = false;
				CycleTime();
				startScript.thrustPower *= 0.70f;
				goFastTimer=0;
			}
			
			if(InputManager.GetAxis("Roll", playerName) <-0.8 &&  InputManager.GetAxis("Yaw", playerName) <-0.8  && startScript.thrustPower >=0.1 && !cycle ||  InputManager.GetButton("DLeft", playerName) &&  InputManager.GetAxis("Yaw", playerName) <-0.8 &&  startScript.thrustPower >=0.1 && !cycle || gui.LToggle.joystickPosition.x <- 0.1 &&  gui.RToggle.joystickPosition.x <- 0.1 &&  startScript.thrustPower >=0.1 && !cycle)
			{
				rigidbody.AddRelativeForce(Vector3.right * -1,ForceMode.VelocityChange); 
				CycleTime();
			}
			else if(InputManager.GetAxis("Roll", playerName) > 0.8 &&  InputManager.GetAxis("Yaw", playerName) > 0.8  && startScript.thrustPower >=0.1 && !cycle ||  InputManager.GetButton("DRight", playerName) &&  InputManager.GetAxis("Yaw", playerName) > 0.8 &&  startScript.thrustPower >=0.1 && !cycle || gui.LToggle.joystickPosition.x > 0.1 &&  gui.RToggle.joystickPosition.x > 0.1 &&  startScript.thrustPower >=0.1 && !cycle)
			{
				rigidbody.AddRelativeForce(Vector3.right * 1,ForceMode.VelocityChange); 
				CycleTime();
			}
			
		
			
				
			if(goFastTimer > 5)
				{
					GoingFast();
				}

}
else if(InputManager.GetAxis("Roll", playerName)<0.2 && InputManager.GetAxis("Roll", playerName)>-0.2 && InputManager.GetAxis("Vertical", playerName) <0.2 && InputManager.GetAxis("Vertical", playerName) >-0.2 || gui.LToggle.joystickPosition.x > -0.1 || gui.LToggle.joystickPosition.x < 0.1 || gui.LToggle.joystickPosition.y > -0.1 || gui.LToggle.joystickPosition.y < 0.1)//HERE IS THE CODE FOR MANEUVERING KAYAK INTO TRICKS ETC.
{
		goFastTimer=0;
		var tiltAngle:float;
		var ZAngle:float = Vector3.Angle(transform.forward, -1*Vector3.up);
		
		if(ZAngle < 45)// kayak's z is <45 degrees from world z then we are tilting back
		{
			Tilt = 1.0;  //----------change this to trigger guy tilt back / tilt up animation ----------leaning back
		}
		else if(ZAngle > 135)
		{
			Tilt = -1.0; //----------change this to trigger guy tilt back / tilt up animation ----------leaning forward
		}
		else if(ZAngle >85 && ZAngle < 95)
		{
		
		BCollide.size =regBSize;
		this.GetComponent(BuoyancyForce).Recalculate();
		Tilt =0;
		}
		
		
		
		if(InputManager.GetAxis("Yaw", playerName) <-0.8 || InputManager.GetButton("Orbit", playerName) || (gui.RToggle.joystickPosition.x <- 0.1 && gui.RToggle.joystickPosition.y < 0.1 && gui.RToggle.joystickPosition.y > -0.1))
		{
		//Debug.Log("Paddle Right");
		Direction = 1.0;
		DirectionAnim=1.0;
		
		//roll Right
		alphaRotation++;
		
		rigidbody.AddRelativeTorque(Vector3.forward * (TStrength/2*Direction),ForceMode.Impulse); 
		BCollide.size =regBSize;
		}
		else if(InputManager.GetAxis("Yaw", playerName) >0.8 || InputManager.GetButton("Exit", playerName) || (gui.RToggle.joystickPosition.x > 0.1 && gui.RToggle.joystickPosition.y < 0.1 && gui.RToggle.joystickPosition.y > -0.1))
		{
		Direction = -1.0;
		DirectionAnim = -1.0;
		
		//roll Left
		alphaRotation--;
		
		rigidbody.AddRelativeTorque(Vector3.forward * (TStrength/2*Direction),ForceMode.Impulse); 
		BCollide.size =regBSize;
		}
		
		
		
		if(InputManager.GetAxis("Pitch", playerName) <-0.8 || InputManager.GetButton("Option", playerName) || (gui.RToggle.joystickPosition.y > 0.1 && gui.RToggle.joystickPosition.x < 0.1 && gui.RToggle.joystickPosition.x > -0.1))
		{
		tiltAngle=1.0;
		rigidbody.AddRelativeTorque(Vector3.right * ((TStrength/2*tiltAngle)),ForceMode.Impulse); 
		BCollide.size = Vector3(2.1,2.1,1); //size for tricks
		this.GetComponent(BuoyancyForce).Recalculate();
	
		//spin forward
		deltaRotation++;
	
		Tilt = -1.0;
		}
		else if(InputManager.GetAxis("Pitch", playerName) >0.8 || InputManager.GetButton("Acceleration", playerName) || (gui.RToggle.joystickPosition.y <- 0.1 && gui.RToggle.joystickPosition.x < 0.1 && gui.RToggle.joystickPosition.x > -0.1))
		{
		//Debug.Log("tilt backward");
		tiltAngle=-1.0;
		rigidbody.AddRelativeTorque(Vector3.right * ((TStrength/2*tiltAngle)),ForceMode.Impulse); 
		BCollide.size = Vector3(2.1,2.1,1); //size for tricks
		this.GetComponent(BuoyancyForce).Recalculate();
		
		//spin backwards
		deltaRotation--;
		
		Tilt = 1.0;
		}
		else
		{
		tiltAngle=0;
		}
		

betaRotation += rigidbody.angularVelocity.y;

pitchAngle = deltaRotation - startAngle; //  forward roll
yawAngle = betaRotation - startAngle; // turning
rollAngle = alphaRotation - startAngle; // roll to side

//HAIL MARY STUNT------------------------------
var currentHeight:float = transform.position.y;

			if(!stuntReset && StuntMode)
			{
			stuntReset = true;
			deltaRotation =0;
			betaRotation =0;
			alphaRotation =0;
			heightChange = transform.position.y;
			heightTagged = transform.position.y;
			stuntTimer=0;
			}
			
			if(StuntMode && pitchAngle > 43 && Mathf.Abs(rollAngle) < 5 && currentHeight+2 < heightTagged )
			{
			Debug.Log("---------------------------------------------------------------LOOP--------------------------------------");
			
			stuntScript.CompletedStunt("Loop", isPlayer);
			deltaRotation=0;
			
			}
			
			
			if(StuntMode && pitchAngle > 43 && Mathf.Abs(rollAngle) < 5 && currentHeight+4 < heightChange )
			{
			Debug.Log("---------------------------------------------------------------HAIL MARY--------------------------------------");
			
			stuntScript.CompletedStunt("HailMary", isPlayer);
			deltaRotation=0;
			}
			
			if(StuntMode && pitchAngle < -43 && Mathf.Abs(rollAngle) < 5 && currentHeight+4 < heightChange )
			{
			Debug.Log("---------------------------------------------------------------HAIL MARY REVERSED--------------------------------------");
			
			stuntScript.CompletedStunt("HailMaryReversed", isPlayer);
			deltaRotation=0;
			}
			
			
			if(StuntMode && Mathf.Abs(pitchAngle) < 5 && Mathf.Abs(rollAngle) > 22 )
			{
			//EskimoRoll
			//Debug.Log("---------------------------------------------------------------Eskimo Roll--------------------------------------");
			
			stuntScript.CompletedStunt("EskimoRoll", isPlayer);
			alphaRotation=0;
			
			}
			
			if(StuntMode && ZAngle < 45 && Mathf.Abs(rollAngle) <10 )
			{
			//Bow Stall
			
			
			stuntTimer += 0.01;
				if(stuntTimer > 1.2)
				{
				//	Debug.Log("---------------------------------------------------------------Bow Stall--------------------------------------");
					stuntScript.CompletedStunt("BowStall", isPlayer);
					deltaRotation=0;
				}
			
			
			}
			
			if(StuntMode && ZAngle > 135 && Mathf.Abs(rollAngle) <5 )
			{
			//Bow Stall
			
			stuntTimer += 0.01;
				if(stuntTimer > 1.2)
				{
				//	Debug.Log("---------------------------------------------------------------Stern Stall--------------------------------------");
					stuntScript.CompletedStunt("SternStall", isPlayer);
					deltaRotation=0;
				}
			
			
			}
			
//----------------------------------------------			
	


//--------------------------------------------------------------------------------------------------------------------------------------
}

if(InputManager.GetAxis("TurnRight", playerName) <-0.3 &&  InputManager.GetAxis("TurnLeft", playerName) >-0.2 || InputManager.GetButton("TurnRight", playerName) && !InputManager.GetButton("TurnLeft", playerName) && !loader.isMobile || InputManager.GetAxis("TurnRight", playerName) > 0.3 &&  InputManager.GetAxis("TurnLeft", playerName) < 0.2 && loader.isMobile)
{
Debug.Log("Paddle Right");
Direction = 1.0 * InputManager.GetAxis("TurnRight", playerName);
DirectionAnim = 1.0 * InputManager.GetAxis("TurnRight", playerName);

if(Speed>0.5)
	{
	Speed -=0.02 * MaxSpeed;
	}
	else if(Speed<-0.5)
	{
	Speed +=0.02 * MaxSpeed;
	}

rigidbody.AddRelativeForce(-1*Vector3.up * liftForce ,ForceMode.Impulse); 

wooHitsL+=1;

}
else if(InputManager.GetAxis("TurnRight", playerName) >- 0.2 &&  InputManager.GetAxis("TurnLeft", playerName) <- 0.3 || !InputManager.GetButton("TurnRight", playerName) && InputManager.GetButton("TurnLeft", playerName) && !loader.isMobile || InputManager.GetAxis("TurnRight", playerName) < 0.2 &&  InputManager.GetAxis("TurnLeft", playerName) > 0.3 && loader.isMobile)
{
Debug.Log("Paddle Left");
Direction = -1.0 * InputManager.GetAxis("TurnLeft", playerName);
DirectionAnim = -1.0 * InputManager.GetAxis("TurnLeft", playerName);

if(Speed>0.5)
	{
	Speed -=0.02 * MaxSpeed;
	}
	else if(Speed<-0.5)
	{
	Speed +=0.02 * MaxSpeed;
	}

rigidbody.AddRelativeForce(-1*Vector3.up * liftForce,ForceMode.Impulse); 

wooHitsR+=1;
}




	if(Speed>0.1)
	{
	Speed -=0.007 * MaxSpeed;
	}
	else if(Speed<-0.1)
	{
	Speed +=0.005 * MaxSpeed;
	}
	else
	{
	Speed=0;
	}

		
	if(Direction>0.08)
	{
	Direction -=0.075;
	}
	else if(Direction<-0.08)
	{
	Direction +=0.075;
	}
	else
	{
	Direction=0;
	}
	
	DirectionAnim = Direction; 



	var regDrag= MaxSpeed + ContinuousDrag;
	regDrag -= Speed;
	if(regDrag>=1.2)
	{
	rigidbody.drag = regDrag + dragOffset;
	rigidbody.angularDrag = regDrag + angDragOffset;
	}
	
	




animator.SetFloat("Speed",Speed);
animator.SetFloat("Tilt",Tilt);
animator.SetFloat("Direction",DirectionAnim);



if(Speed!=0 && startScript.thrustPower >=0.1)
{
var force = (Strength*Speed)/90;
rigidbody.AddRelativeForce(Vector3.forward * force,ForceMode.VelocityChange); 
}
else if(startScript.thrustPower <=0.01)
{
Speed=0;
}

rigidbody.AddRelativeTorque(Vector3.up * (TStrength*Direction),ForceMode.Acceleration); 


//Here we set the splashes per stroke... only once each time it touches the water

//LEFT SPLASH
if(lSidePaddle.position.y < transform.position.y && !lSplash)
{
lSplash=true;
var splashLOC = lSidePaddle.position;
splashLOC.y += 0.5;
var lSplashInstance = Instantiate(paddleSplash, splashLOC, transform.rotation);

// based on the forward or backwards we apply a force to throw the ripple in that direction.


if(!pLAudio.audio.isPlaying)
{
	pLAudio.audio.clip = paddleL;	
pLAudio.audio.Play();
}
}
else if (lSidePaddle.position.y > transform.position.y + 0.3)
{
lSplash=false;
}


//RIGHT SPLASH
if(rSidePaddle.position.y < transform.position.y && !rSplash)
{
rSplash=true;
var splashLOC2 = rSidePaddle.position;
splashLOC2.y += 0.5;
var rSplashInstance = Instantiate(paddleSplash, splashLOC2, Quaternion.identity);

// based on the forward or backwards we apply a force to throw the ripple in that direction.

	
if(!pRAudio.audio.isPlaying)
{
pRAudio.audio.clip = paddleR;	
pRAudio.audio.Play();
}
}
else if (rSidePaddle.position.y > transform.position.y + 0.3)
{
rSplash=false;
}


//HITTING ROCKS MAKES HEALTH GO DOWN AND HEAD POINTING DOWN AKA UNDERWATER DOES ALSO

if(Vector3.Angle(transform.up, Vector3.up) > 120 && startScript.healthPower >=0)
{
	if(!startScript.multiplayerPVP)
	{
	startScript.healthPower -= 0.0025;
	}
PlayGurgle();
	TutorialTurnOver();

}
else 
{

startScript.healthPower += (1 - startScript.healthPower)*0.0015f;

	if(!wrighted && gui.tutorial)
	{
		gui.TutorialHelp("wrightYourself", true);
		wrighted=true;
	}
	
}


velocityTemp = rigidbody.velocity;
velocityRotTemp = rigidbody.angularVelocity;

if(wooTimer>2)
{
	if(wooHitsR > 5 && wooHitsL > 5 && !audio.isPlaying)
	{
		audio.clip=woo;
		audio.Play();
	}
	wooHitsR=0;
	wooHitsL=0;
	wooTimer=0;
}
else
{
wooTimer+=0.05;
}


}
else
{
	if(!isPaused)
	{
	
	rigidbody.velocity = Vector3(0,0,0);
	rigidbody.angularVelocity = Vector3(0,0,0);
	rigidbody.isKinematic = true;
	animator.speed = 0;
	isPaused=true;
	}
}




}

function ResetVel()
{
	rigidbody.isKinematic = false;
	rigidbody.velocity = velocityTemp;
	rigidbody.angularVelocity = velocityRotTemp;
	animator.speed = 1;
}





function CycleTime()
	{
		if(!cycle)
		{
			cycle=true;
			yield WaitForSeconds(0.2);
			cycle=false;
		}
	
	}
	
	
	
	
	
	
function LoadCharacterAccessories(player:int)
{
	yield WaitForSeconds(0.8);
	var headNode:Transform = this.transform.FindChild("CharacterSeat/Paddler_Character/Hips/Spine/Chest/Neck/Head/HatNode_NeutralPose/HatNode");

//now that we have the hat node to place the helmet etc on we can grab the info we need and spawn the correct accessories for the player.
//mamke sure the arrays are setup the same from menu scene to river scene
	

	var charToLoad:String = PlayerPrefs.GetString("playerSetup"+player);
	Debug.Log(charToLoad + " " + player);
	
	 
	var selectedChar:String[] = charToLoad.Split(","[0]);
	
	// order of items is helmet, helmet color, hair, hair color
	// load helmet
	
	var currentHelmet = int.Parse(selectedChar[0]);
	var helmetColor = int.Parse(selectedChar[1]);
	
		
		var spawnedHelmet = Instantiate(startScript.HelmetArray[currentHelmet],headNode.transform.position,headNode.transform.rotation);
		spawnedHelmet.transform.parent = headNode.transform.parent;
		
		spawnedHelmet.GetComponent(HatTypeScript).SwapColor(helmetColor, player);
		
	
	
	//load hair
	
	var currentHair = int.Parse(selectedChar[2]);
	var hairColor = int.Parse(selectedChar[3]);
	
	Debug.Log("currentHair " + currentHair + " hairColor " + hairColor);
	
		
		var spawnedHair = Instantiate(startScript.HairArray[currentHair],headNode.transform.position,headNode.transform.rotation);
		spawnedHair.transform.parent = headNode.transform.parent;
		
		
		spawnedHair.GetComponent(HatTypeScript).SwapColor(hairColor, player);

		
		
	var players:String[] = Input.GetJoystickNames();

for (var i:int = 0; i < players.Length || i < 4; i++)
    {
                  
              if (i < players.Length)
              {
                 
               
              }

	}

}

function TutorialTurnOver()
{
	yield WaitForSeconds(0.5);
	
	if(!gui.tutorial && Vector3.Angle(transform.up, Vector3.up) > 150)
	{
		gui.TutorialHelp("wrightYourself", false);
		wrighted=false;
	}
}	
	
	
//----------------------------------------------------------------------------------OUYA CONTROLS----------------------------------------------------	
function GoingFast()
{
	if(!JustSaidYahoo && yahoo)
	{
		JustSaidYahoo=true;
		audio.clip=yahoo[Random.Range(0,yahoo.Length)];
		audio.Play();
	}
	yield WaitForSeconds(12);
	goFastTimer=0;
	JustSaidYahoo=false;
	
}
	
			
function PlayGurgle()
{
	if (drownPause < Time.time)
	{
		drownPause=Time.time+1;
		audio.clip=drown;
		audio.Play();
	}
	
}	




public class ControllerMaster extends MonoBehaviour
{

 function Awake()
    {
        OuyaSDK.registerMenuAppearingListener(this);
        OuyaSDK.registerPauseListener(this);
        OuyaSDK.registerResumeListener(this);
    }

    function OnDestroy()
    {
        OuyaSDK.unregisterMenuAppearingListener(this);
        OuyaSDK.unregisterPauseListener(this);
        OuyaSDK.unregisterResumeListener(this);
    }
    
    
 public function OuyaMenuAppearing()
    {
        Debug.Log(System.Reflection.MethodBase.GetCurrentMethod().ToString());
    }

    public function OuyaOnPause()
    {
        Debug.Log(System.Reflection.MethodBase.GetCurrentMethod().ToString());
    }

    public function OuyaOnResume()
    {
        Debug.Log(System.Reflection.MethodBase.GetCurrentMethod().ToString());
    }
    
  }
  
 
