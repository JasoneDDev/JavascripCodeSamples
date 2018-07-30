#pragma strict

var gold:boolean = false;
private var pickedUp = false;

@HideInInspector var startScript:StartScript;
startScript = FindObjectOfType(StartScript);

function Start()
{
	yield WaitForSeconds(2);
		this.GetComponent(BoxCollider).isTrigger = true;
}

function OnTriggerEnter(collider:Collider){

	//print("your touching it");
	var playerStatus : KayakerController = collider.GetComponent(KayakerController);
	if(playerStatus == null) return;
	
	if(pickedUp) return;
	//Debug.Log ("Picked Up gold coin? " + gold);
	
	//everything's good, so put it in the inventory
	
	startScript.CoinGrab(gold);
	

	pickedUp = true;
	Destroy(gameObject);
	
}
