var board=[];//2d array
var xlength=40;//min value is17
var ylength=15;//min value is 10

var initx1pos=3;
var inity1pos=3;
var player1={
  ability:"UV vision",
  health:3,
  nbpuzzlesol:0,
  xpos:initx1pos,
  ypos:inity1pos
};
var initx2pos=xlength-4;
var inity2pos=ylength-4;
var player2={
  ability:"go through thin walls",
  health:3,
  nbpuzzlesol:0,
  xpos:initx2pos,
  ypos:inity2pos
};
var cp=1;//current player
var cplayer=player1;

//pressure plate 1
var ptile1={
xpos:0,
ypos:0
}
//pressure plate 2
var ptile2={
xpos:0,
ypos:0
}

var mirror1={
xpos:0,
ypos:0
}

var mirror2={
xpos:0,
ypos:0
}

var book1={
xpos:0,
ypos:1
}
var book2={
xpos:0,
ypos:2
}
var book3={
xpos:0,
ypos:3
}
var book4={
xpos:0,
ypos:4
}
var codebook=1;

var bat=2;//shared resource

var sidebartxt="";
var dispboard="";
var message="&#128123;";

function restart(){
	console.log("restart");
	cp=1;
	player1.health=3;
	player1.nbpuzzlesol=0;
	player2.health=3;
	player2.nbpuzzlesol=0;
	cplayer=player1;
}
function instruct(){
	console.log("instructions");
}
function disppinfo(){
	sidebartxt="";
	sidebartxt=sidebartxt.concat("current player: p" + cp);
	document.getElementById("cplayer").innerHTML = sidebartxt;
	sidebartxt="";
	sidebartxt=sidebartxt.concat("player ability: " + cplayer.ability);
	document.getElementById("ability").innerHTML = sidebartxt;
	sidebartxt="";
	sidebartxt=sidebartxt.concat("health: " + cplayer.health + "/3");
	document.getElementById("phealth").innerHTML = sidebartxt;
	sidebartxt="";
	sidebartxt=sidebartxt.concat("flashlight battery: " + bat + "/3");
	document.getElementById("light").innerHTML = sidebartxt;
	
}
function changep(){
	console.log("changeplayer fct");
	if(cp==1){
		cp=2;
		cplayer=player2;
	}else{
		cp=1;
		cplayer=player1;
	}
	disppinfo();
	showboard();
}

function drawwalls(){
	//walls
	for(var i=0; i<xlength; i++){
		if(i<xlength-15){
			board[i][ylength-6]="=";
			board[i][ylength-10]="=";
		}else if(i>xlength-15){
			board[i][ylength-8]="=";
		}
		board[i][0]="#";
		board[i][ylength-1]="#";
	}
	for(var j=0; j<ylength; j++){
		if(board[xlength-15][j]=="."){
		board[xlength-15][j]="=";
		}
		board[0][j]="#";
		board[xlength-1][j]="#";
	}
	board[0][Math.floor(ylength/2)]="|";//exit
	//open doors
	board[xlength-17][Math.floor(ylength-10)]=".";
	board[xlength-16][Math.floor(ylength-10)]=".";
	board[xlength-15][Math.floor(ylength-9)]=".";
	board[xlength-15][Math.floor(ylength-7)]=".";
}

function randomposgen(range, offset){
	var rnb=Math.floor(Math.random() * range)+offset;
	return rnb;	
}

function populateboard(){
	for(var i=0; i<xlength; i++){
		board[i]=[];
		for(var j=0; j<ylength; j++){
			board[i][j]=".";
		}
	}
	
	drawwalls();
	
	//players
	board[player1.xpos][player1.ypos]="1";
	board[player2.xpos][player2.ypos]="2";
	
	//chests, knight armor stand and secret passages
	board[1][1]="0";
	board[1][ylength-2]="0";
	board[xlength-2][ylength-2]="0";
	board[1][Math.floor(ylength/2)-1]="T";
	board[xlength-16][1]="]";
	board[xlength-2][ylength-9]="]";
	board[xlength-14][ylength-2]="]";
	
	//===random elements===
	//pressure plates in corridor
	ptile1.xpos = randomposgen(10,1);
	ptile1.ypos = randomposgen(3,6);
	board[ptile1.xpos][ptile1.ypos]="p";
	ptile2.xpos = randomposgen(10,11);
	ptile2.ypos = randomposgen(3,6);
	if(ptile1.xpos==ptile2.xpos && ptile1.ypos==ptile2.ypos){
	ptile2.xpos+=1;
	}
	board[ptile2.xpos][ptile2.ypos]="p";
	
	//mirrors in mirror room
	mirror1.xpos = randomposgen(10,1);
	mirror1.ypos = randomposgen(2,ylength-3);
	if(board[mirror1.xpos][mirror1.ypos]!="."){
		mirror1.xpos+=1;
	}
	board[mirror1.xpos][mirror1.ypos]="m";
	mirror2.xpos = randomposgen(10,11);
	mirror2.ypos = randomposgen(2,ylength-5);
	if(board[mirror2.xpos][mirror2.ypos]!="."){
		mirror2.xpos+=1;
	}
	board[mirror2.xpos][mirror2.ypos]="m";
	
	//books in the library
	book1.xpos = randomposgen(20,1);
	if(board[book4.xpos][book4.ypos]!="."){
		book1.xpos++;
	}
	board[book1.xpos][book1.ypos]="b";
	book2.xpos = randomposgen(20,1);
	if(board[book2.xpos][book2.ypos]!="."){
		book2.xpos++;
	}
	board[book2.xpos][book2.ypos]="b";
	book3.xpos = randomposgen(20,1);
	if(board[book3.xpos][book3.ypos]!="."){
		book3.xpos++;
	}
	board[book3.xpos][book3.ypos]="b";
	book4.xpos = randomposgen(20,1);
	if(board[book4.xpos][book4.ypos]!="."){
		book4.xpos++;
	}
	board[book4.xpos][book4.ypos]="b";
	//the codebook is
	codebook= randomposgen(4,1);
}
function showboard(){
	dispboard="";
	drawwalls();
	if(cplayer==player1){
		board[ptile1.xpos][ptile1.ypos]="p";
		board[ptile2.xpos][ptile2.ypos]="p";
	}else{
		board[ptile1.xpos][ptile1.ypos]=".";
		board[ptile2.xpos][ptile2.ypos]=".";
	}
	board[mirror1.xpos][mirror1.ypos]="m";
	board[mirror2.xpos][mirror2.ypos]="m";
	
	if(codebook==1){board[book1.xpos][book1.ypos]="B";}
	else{board[book1.xpos][book1.ypos]="b";}
	if(codebook==2){board[book2.xpos][book2.ypos]="B";}
	else{board[book2.xpos][book2.ypos]="b";}
	if(codebook==3){board[book3.xpos][book3.ypos]="B";}
	else{board[book3.xpos][book3.ypos]="b";}
	if(codebook==4){board[book4.xpos][book4.ypos]="B";}
	else{board[book4.xpos][book4.ypos]="b";}
		
	board[player1.xpos][player1.ypos]="1";
	board[player2.xpos][player2.ypos]="2";
	for(var i=0; i<ylength; i++){
		for(var j=0; j<xlength; j++){
			dispboard=dispboard.concat("<font size=6px, color=white>",board[j][i],"</font>");
		}
		dispboard=dispboard.concat("<br>");
	}
	document.getElementById("thegame").innerHTML = dispboard;
}

function moveup(){
	message="&#128123;";
	if(board[cplayer.xpos][cplayer.ypos-1]=="#"){
		message=message.concat("you have hit a wall");
	}else if(cplayer.ability!="go through thin walls" && board[cplayer.xpos][cplayer.ypos-1]=="="){
		message=message.concat("you have hit a wall");
	}else{
		board[cplayer.xpos][cplayer.ypos]=".";
		cplayer.ypos--;
		showboard();
	}
	document.getElementById("message").innerHTML = message;
}
function moveleft(){
	message="&#128123;";
	if(board[cplayer.xpos-1][cplayer.ypos]=="#"){
		message=message.concat("you have hit a wall");
	}else if(board[cplayer.xpos-1][cplayer.ypos]=="|"){
		message=message.concat("front gate is locked");
	}else if(cplayer.ability!="go through thin walls" && board[cplayer.xpos-1][cplayer.ypos]=="="){
		message=message.concat("you have hit a wall");
	}else{
		board[cplayer.xpos][cplayer.ypos]=".";
		cplayer.xpos--;
		showboard();
	}
	document.getElementById("message").innerHTML = message;
}
function moveright(){
	message="&#128123;";
	if(board[cplayer.xpos+1][cplayer.ypos]=="#"){
		message=message.concat("you have hit a wall");
	}else if(cplayer.ability!="go through thin walls" && board[cplayer.xpos+1][cplayer.ypos]=="="){
		message=message.concat("you have hit a wall");
	}else{
		board[cplayer.xpos][cplayer.ypos]=".";
		cplayer.xpos++;
		showboard();
	}
	document.getElementById("message").innerHTML = message;
}
function movedown(){
	message="&#128123;";
	if(board[cplayer.xpos][cplayer.ypos+1]=="#"){
		message=message.concat("you have hit a wall");
	}else if(cplayer.ability!="go through thin walls" && board[cplayer.xpos][cplayer.ypos+1]=="="){
		message=message.concat("you have hit a wall");
	}else{
		board[cplayer.xpos][cplayer.ypos]=".";
		cplayer.ypos++;
		showboard();
	}
	document.getElementById("message").innerHTML = message;
}

//to use keys instead of button
document.onkeydown = function(e) {
if(e.keyCode==38 || e.keyCode==87 || e.keyCode==75){
moveup();
}
if(e.keyCode==37 || e.keyCode==65 || e.keyCode==72){
moveleft();
}
if(e.keyCode==39 || e.keyCode==68 || e.keyCode==76){
moveright();
}
if(e.keyCode==40 || e.keyCode==83 || e.keyCode==74){
movedown();
}
/*if(e.keyCode==78){
if(potions==true){usepotion();}
}*/
}
//to stop scrolling with down arrow key
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


function game(){
	showboard();
}


