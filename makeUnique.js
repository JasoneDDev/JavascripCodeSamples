#pragma strict

var makeScaleUnique=false;
var scaleRange:Vector2;

function Start () {

	if(makeScaleUnique)
	{
		var randomChance=Random.Range(-1,1);
		
		if(randomChance >0.25)
		{
		transform.localScale = Vector3(scaleRange.x,scaleRange.x,scaleRange.x);
		}
		else if(randomChance <-0.25)
		{
		transform.localScale = Vector3(scaleRange.y,scaleRange.y,scaleRange.y);
		}
		else
		{
		}
	}
	
	
	
}



