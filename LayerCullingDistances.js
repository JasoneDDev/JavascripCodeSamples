#pragma strict

var distanceToCull=50.0;
var layerCullDistances : float[] ;

var distanceToCullLONG=50.0;
var distanceToCullRiver=100.0;



function Start  ()
{
var distances = new float[32];
// Set up layer 10 to cull at 15 meters distance.
// All other layers use the far clip plane distance.

distances[12] = distanceToCull; //grass
distances[13]= distanceToCullLONG;
distances[14]=distanceToCullRiver;

camera.layerCullDistances = distances;
}

AddComponentMenu("Camera/CullingDistances");
