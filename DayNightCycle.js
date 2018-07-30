#pragma strict

var Water:Material;
var dayWaterText:Texture2D;
var nightWaterText:Texture2D;
var Ground:Material;
var dayGroundText:Texture2D;
var nightGroundText:Texture2D;
var Bushes:Material;
var dayBushes:Texture2D;
var nightBushes:Texture2D;


//--------------SKYBOXES------------
var DaySkyMat:Material;
var NightSkyMat:Material;

//-----------------TREES-----------
var treeMatA:Material;
var treeMatB:Material;

var dayTreesText:Texture2D;
var dayTreesText2:Texture2D;
var nightTreesText:Texture2D;

var treeMatA2:Material;
var treeMatB2:Material;

var dayTree2Text:Texture2D;

var nightTree2Text:Texture2D;

//----------------ROCKS----------------

var stoneGroup01:Material;
var stoneGroup02:Material;
var stoneGroup03:Material;

var dayStone:Texture2D;
var nightStone:Texture2D;


//-----------------------------------------------------
function LoadEnviro()
{

	if(PlayerPrefs.GetInt("dayMode")==2)
	{
	NightMode();
	}
	else
	{
	DayMode();
	}
}

function NightMode()
{
	PlayerPrefs.SetInt("dayMode",2);
	RenderSettings.skybox = NightSkyMat;
	
	Water.mainTexture = nightWaterText;
	Ground.mainTexture = nightGroundText;
	Bushes.mainTexture = nightBushes;
	treeMatA.mainTexture = nightTreesText;
	treeMatB.mainTexture = nightTreesText;
	treeMatA2.mainTexture = nightTree2Text;
	treeMatB2.mainTexture = nightTree2Text;
	stoneGroup01.mainTexture = nightStone;
	stoneGroup02.mainTexture = nightStone;
	stoneGroup03.mainTexture = nightStone;
	
}
function DayMode()
{
	PlayerPrefs.SetInt("dayMode",1);
	RenderSettings.skybox = DaySkyMat;
	
	Water.mainTexture = dayWaterText;
	Ground.mainTexture = dayGroundText;
	Bushes.mainTexture = dayBushes;
	
	treeMatA.mainTexture = dayTreesText;
	treeMatB.mainTexture = dayTreesText2;
	treeMatA2.mainTexture = dayTree2Text;
	treeMatB2.mainTexture = dayTree2Text;
	stoneGroup01.mainTexture = dayStone;
	stoneGroup02.mainTexture = dayStone;
	stoneGroup03.mainTexture = dayStone;
}