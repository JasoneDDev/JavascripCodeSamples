#pragma strict

@HideInInspector var currentKayak:int;
var KayakPlacement:Transform;
var visibleKayak:GameObject;
 var kayakMat:Material;

@HideInInspector var currentColor:int;
@HideInInspector var currentDesign:int;
@HideInInspector var currentDecal:int;

// the kayak game objects will include links to all maps for up to 4 players
var Kayaks:GameObject[]; 
var lockedKayaks:GameObject[];

private var gui :GUI_Menu; 
gui = FindObjectOfType(GUI_Menu);

function Start ()
{
yield WaitForSeconds(1);
var unlockKayaks = UnlockKayaks();
yield unlockKayaks;

var kString = PlayerPrefs.GetString("KayakPlayer1");
if(kString =="")
{
kString = "0,0,0,0";
}

var kayakValues = new Array(kString.Split(","[0]));

currentKayak = int.Parse(kayakValues[0]);
currentColor =  int.Parse(kayakValues[1]);
currentDesign =  int.Parse(kayakValues[2]);
currentDecal =  int.Parse(kayakValues[3]);

if(visibleKayak!=null)
			{
			Destroy(visibleKayak);
			}
			visibleKayak = Instantiate(Kayaks[currentKayak], KayakPlacement.position, KayakPlacement.rotation);
			kayakMat = visibleKayak.transform.GetComponent(KayakScript).KayakMaterial01;
			visibleKayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = kayakMat;
			
			kayakMat.SetTexture("_MainTex",visibleKayak.transform.GetComponent(KayakScript).color[currentColor]);
			kayakMat.SetTexture("_DecalTex",visibleKayak.transform.GetComponent(KayakScript).design[currentDesign]);
			if(currentDecal < visibleKayak.transform.GetComponent(KayakScript).decal.Length)
			{
			kayakMat.SetTexture("_DecalTexB",visibleKayak.transform.GetComponent(KayakScript).decal[currentDecal]);
			}
			
			
			gui.SpeedBar.value = (visibleKayak.transform.GetComponent(KayakScript).MaxSpeed)/2;
			gui.AccelerationBar.value = (visibleKayak.transform.GetComponent(KayakScript).Strength)/10;
			gui.TrackingBar.value = (visibleKayak.transform.GetComponent(KayakScript).angDragOffset)/8;
			gui.ManeuverBar.value = (visibleKayak.transform.GetComponent(KayakScript).TStrength)/6;
			gui.DragBar.value = 1-(visibleKayak.transform.GetComponent(KayakScript).upRiverTracking);		//upRiverTracking
}


function SaveKayak(player:int, continuing:boolean)
{
PlayerPrefs.SetString("KayakPlayer"+player,""+currentKayak+","+currentColor+","+currentDesign+","+currentDecal);
PlayerPrefs.Save();

if(continuing)
{
player+=1;


var kString2:String;
	if(player>3)
	{
	 kString2= PlayerPrefs.GetString("KayakPlayer4");
	}
	else if(player>2)
	{
	 kString2= PlayerPrefs.GetString("KayakPlayer3");
	}
	else if(player>1)
	{
	 kString2= PlayerPrefs.GetString("KayakPlayer2");
	}

if(kString2.Length<7)
{
kString2 = "0,0,0,0";
}		
	

	
	var kayakValues2 = new Array(kString2.Split(","[0]));


	currentKayak =  int.Parse(kayakValues2[0]);
	currentColor =  int.Parse(kayakValues2[1]);
	currentDesign =  int.Parse(kayakValues2[2]);
	currentDecal =  int.Parse(kayakValues2[3]);
	
	if(visibleKayak!=null)
			{
			Destroy(visibleKayak.gameObject);
			}
			visibleKayak = Instantiate(Kayaks[currentKayak], KayakPlacement.position, KayakPlacement.rotation);
			kayakMat = visibleKayak.transform.GetComponent(KayakScript).KayakMaterial01;
			visibleKayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = kayakMat;
			
			kayakMat.SetTexture("_MainTex",visibleKayak.transform.GetComponent(KayakScript).color[currentColor]);
			kayakMat.SetTexture("_DecalTex",visibleKayak.transform.GetComponent(KayakScript).design[currentDesign]);
			kayakMat.SetTexture("_DecalTexB",visibleKayak.transform.GetComponent(KayakScript).decal[currentDecal]);
	
	
	
}
}

function SwapKayak(forward:boolean, player:int)// make another variable to see what player it is so we change the correct material to match the player
{
	
	
	
	if(forward)
	{
	currentKayak++;
	}
	else
	{
	currentKayak--;
	}
	
	

	if(currentKayak > Kayaks.Length-1)
	{
	currentKayak =0;
	}
	else if(currentKayak < 0)
	{
	currentKayak = Kayaks.Length-1;
	}
	
	if(visibleKayak != Kayaks[currentKayak])
		{
			if(visibleKayak!=null)
			{
			Destroy(visibleKayak);
			}
			visibleKayak = Instantiate(Kayaks[currentKayak], KayakPlacement.position, KayakPlacement.rotation);
		}
	
	gui.riverName.text  = visibleKayak.transform.GetComponent(KayakScript).kayakName;
	gui.riverName.positionFromTopRight(0.0575f,0.15f);
	gui.riverName.position.x += gui.riverName.width/2;
	gui.SpeedBar.value = (visibleKayak.transform.GetComponent(KayakScript).MaxSpeed)/2;
	gui.AccelerationBar.value = (visibleKayak.transform.GetComponent(KayakScript).Strength)/10;
	gui.TrackingBar.value = (visibleKayak.transform.GetComponent(KayakScript).angDragOffset)/8;	
	gui.ManeuverBar.value = (visibleKayak.transform.GetComponent(KayakScript).TStrength)/6;
	gui.DragBar.value = 1-(visibleKayak.transform.GetComponent(KayakScript).upRiverTracking);
	
	if(player == 1 )
	{
	kayakMat = visibleKayak.transform.GetComponent(KayakScript).KayakMaterial01;
	visibleKayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = kayakMat;
	
	PlayerPrefs.SetInt("player01Kayak",currentKayak);
	}
	else if(player == 2)
	{
	kayakMat = visibleKayak.transform.GetComponent(KayakScript).KayakMaterial02;
	visibleKayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = kayakMat;
	PlayerPrefs.SetInt("player02Kayak",currentKayak);
	}
	else if(player == 3)
	{
	kayakMat = visibleKayak.transform.GetComponent(KayakScript).KayakMaterial03;
	visibleKayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = kayakMat;
	PlayerPrefs.SetInt("player03Kayak",currentKayak);
	}
	else if(player == 4)
	{
	kayakMat = visibleKayak.transform.GetComponent(KayakScript).KayakMaterial04;
	visibleKayak.transform.GetComponent(KayakScript).kayakBody.GetComponent(MeshRenderer).renderer.material = kayakMat;
	PlayerPrefs.SetInt("player04Kayak",currentKayak);
	}
	
	currentColor = 0;
	currentDesign = 0;
	currentDecal = 0;
	
	kayakMat.SetTexture("_MainTex",visibleKayak.transform.GetComponent(KayakScript).color[currentColor]);
	kayakMat.SetTexture("_DecalTex",visibleKayak.transform.GetComponent(KayakScript).design[currentDesign]);
	kayakMat.SetTexture("_DecalTexB",visibleKayak.transform.GetComponent(KayakScript).decal[currentDecal]);
	
}


function SwapColor(forward:boolean, player:int)// make another variable to see what player it is so we change the correct material to match the player
{
	if(forward)
	{
	currentColor++;
	}
	else
	{
	currentColor--;
	}
	
	if(currentColor > visibleKayak.transform.GetComponent(KayakScript).color.Length-1)
	{
	currentColor =0;
	}
	else if(currentColor < 0)
	{
	currentColor = visibleKayak.transform.GetComponent(KayakScript).color.Length-1;
	}

	
	kayakMat.SetTexture("_MainTex",visibleKayak.transform.GetComponent(KayakScript).color[currentColor]);
	
	
}

function SwapDesign(forward:boolean, player:int)// make another variable to see what player it is so we change the correct material to match the player
{
	if(forward)
	{
	currentDesign++;
	}
	else
	{
	currentDesign--;
	}
	
	if(currentDesign > visibleKayak.transform.GetComponent(KayakScript).design.Length-1)
	{
	currentDesign =0;
	}
	else if(currentDesign < 0)
	{
	currentDesign = visibleKayak.transform.GetComponent(KayakScript).design.Length-1;
	}

	
	kayakMat.SetTexture("_DecalTex",visibleKayak.transform.GetComponent(KayakScript).design[currentDesign]);
	}

function SwapDecal(forward:boolean, player:int)// make another variable to see what player it is so we change the correct material to match the player
{
	if(forward)
	{
	currentDecal++;
	}
	else
	{
	currentDecal--;
	}
	
	if(currentDecal > visibleKayak.transform.GetComponent(KayakScript).decal.Length-1)
	{
	currentDecal =0;
	}
	else if(currentDecal < 0)
	{
	currentDecal = visibleKayak.transform.GetComponent(KayakScript).decal.Length-1;
	}

	
	kayakMat.SetTexture("_DecalTexB",visibleKayak.transform.GetComponent(KayakScript).decal[currentDecal]);
}


function UnlockKayaks():boolean
{

	var StringText:String = PlayerPrefs.GetString("unlockedKayaks");
	var kayakArray:String[] = StringText.Split(","[0]);
	
	
	for (var i in kayakArray)
	{
		if(i != "")
		{
			if(lockedKayaks.Length-1 >= int.Parse(i))
			{
			var tempOBJ:GameObject = lockedKayaks[int.Parse(i)];
			Kayaks += [tempOBJ];
			}
		}
	}

return true;
}
