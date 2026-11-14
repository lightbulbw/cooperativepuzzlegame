// on game branch
var player1={
  ability:"something",
  health:3,
  nbpuzzlesol:0
};

var player2={
  ability:"something",
  health:3,
  nbpuzzlesol:0
};

var sharedrs=0;//shared resource
var cp=1;//current player

var htmlcode="";

function restart(){
	console.log("restart");
}
function instruct(){
	console.log("instructions");
}
function disppinfo(){
	htmlcode="";
	htmlcode=htmlcode.concat("current player: p" + cp);
	document.getElementById("cplayer").innerHTML = htmlcode;
	htmlcode="";
	htmlcode=htmlcode.concat("health: " + player2.health + "/3");
	document.getElementById("phealth").innerHTML = htmlcode;
	htmlcode="";
	htmlcode=htmlcode.concat("resources<br>collected: " + sharedrs + "/3");
	document.getElementById("rs").innerHTML = htmlcode;
}
function changep(){
	console.log("changeplayer fct");
	if(cp==1){cp=2;}
	else{cp=1;}
	disppinfo();
}
function game(){
	disppinfo();
}

