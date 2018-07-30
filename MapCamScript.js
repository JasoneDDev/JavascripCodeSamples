#pragma strict

var player:Transform;

function Start () {

yield WaitForSeconds(1.5);
player = GameObject.FindWithTag("Player").transform;
}

function LateUpdate () {

if(player!=null)
{
transform.eulerAngles.y = player.rotation.y;
}


}