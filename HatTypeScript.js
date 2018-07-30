#pragma strict

var currentColor:int;
var MaterialArray:Texture2D[];
var MainMatP01:Material;
var MainMatP02:Material;
var MainMatP03:Material;
var MainMatP04:Material;
var hatObj:Transform;


function SwapColor(color:int, player:int)
{
	if(MainMatP01!=null && MainMatP02!=null && MainMatP03!=null && MainMatP04!=null && hatObj!=null && color < MaterialArray.Length )
	{

hatObj = this.gameObject.transform.GetChild(0);
	switch (player)
        {
            case 1:
           
            	MainMatP01.SetTexture("_MainTex",MaterialArray[color]);
            	hatObj.renderer.material =  MainMatP01;
             break;
            case 2:
            	MainMatP02.SetTexture("_MainTex",MaterialArray[color]);
            	hatObj.renderer.material =  MainMatP02;
             break;
            case 3:
            	MainMatP03.SetTexture("_MainTex",MaterialArray[color]);
            	hatObj.renderer.material =  MainMatP03;
             break;
            case 4:
            	MainMatP04.SetTexture("_MainTex",MaterialArray[color]);
            	hatObj.renderer.material =  MainMatP04;
             break;   
            
            default:
                break;
        }
	
	}
	else
	{
	Debug.Log("MISSING MATRERIALS FOR " + this.gameObject.name);
	}
}
