#pragma strict

var kayakName:String;
var Strength:float;
var TStrength:float;
var liftForce:float;
var upRiverTracking:float;
var dragOffset:float;
var angDragOffset:float;
var MaxSpeed :float;
var ContinuousDrag:float;

var yPOS:float;
var kayakColliderSize:Vector3;
var kayakColliderPOS:Vector3;


var KayakMaterial01:Material;
var KayakMaterial02:Material;
var KayakMaterial03:Material;
var KayakMaterial04:Material;

var color:Texture2D[];
var design:Texture2D[];
var decal:Texture2D[];

var kayakBody:Transform;

