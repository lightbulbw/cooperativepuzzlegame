var board=[];//2d array
var xlength=40;//min value is17
var ylength=15;//min value is 10

var initx1pos=3;
var inity1pos=3;
var freeze=false;
var player1={
  ability:"UV vision",
  health:3,
  nbpuzzlesol:0,
  xpos:initx1pos,
  ypos:inity1pos,
  inventory:[".",".",".",".",".",".",".","."]
};
var initx2pos=xlength-4;
var inity2pos=ylength-4;
var player2={
  ability:"go through thin walls",
  health:3,
  nbpuzzlesol:0,
  xpos:initx2pos,
  ypos:inity2pos,
  inventory:[".",".",".",".",".",".",".","."]
};
var cp=1;//current player
var cplayer=player1;

//pressure plates
var ptiles=[
	{xpos:0,ypos:0},
	{xpos:0,ypos:0}   
];

var traps=[
	{xpos:0,ypos:0},
	{xpos:0,ypos:0}   
];

var mirror1={
xpos:0,
ypos:0
}

var mirror2={
xpos:0,
ypos:0
}

var books=[
	{xpos:0,ypos:1},
	{xpos:0,ypos:2},
	{xpos:0,ypos:3},
	{xpos:0,ypos:4}     
];
var codebook=1;
var code1=1;
var code2=1;
var code3=1;
var c1=0;
var c2=0;
var c3=0;

var chests=[
	{xpos:xlength-16,ypos:1},
	{xpos:xlength-2,ypos:ylength-9}, 
	{xpos:xlength-14,ypos:ylength-2}  
];

var potion1={
xpos:0,
ypos:0
}
var gotpotion=false;
var potionbook={
xpos:0,
ypos:0
}
var potioncolor1=0;
var potioncolor2=0;
var potioncolor3=0;
var pcolor1=0;
var pcolor2=0;
var pcolor3=0;

var rats=[
	{xpos:0,ypos:0},
	{xpos:0,ypos:0},
	{xpos:0,ypos:0}    
];
var food=[
	{xpos:0,ypos:0},
	{xpos:0,ypos:0},
	{xpos:0,ypos:0}    
];
var soup=[
	[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0] 
]

var bat=2;//shared resource

var sidebartxt="";
var dispboard="";
var message="&#128123;";
var booktext="";
var chest="";
var showplate="";

function restart(){
	console.log("restart");
	cp=1;
	player1.health=3;
	player1.nbpuzzlesol=0;
	player2.health=3;
	player2.nbpuzzlesol=0;
	cplayer=player1;
	for(var i=0; i<ptiles.length;i++){
		ptiles[i].xpos=0;
		ptiles[i].ypos=0;
	}
	for(var i=0; i<traps.length;i++){
		traps[i].xpos=0;
		traps[i].ypos=0;
	}
}
function instruct(){
	console.log("instructions");
}
function disppinfo(){
	sidebartxt="";
	sidebartxt=sidebartxt.concat("current player: p" + cp+"<br>");

	sidebartxt=sidebartxt.concat("player ability: " + cplayer.ability+"<br>");
	
	sidebartxt=sidebartxt.concat("health: " + cplayer.health + "/3<br>");

	sidebartxt=sidebartxt.concat("flashlight battery: " + bat + "/3<br>");
	
	sidebartxt=sidebartxt.concat("inventory:<br>");
	for(var i=0; i<cplayer.inventory.length; i++){
		if(cplayer.inventory[i]=="*"){
			sidebartxt=sidebartxt.concat("&#129514;");
		}else if(cplayer.inventory[i]=="f"){
			sidebartxt=sidebartxt.concat("&#127822;");
		}else{
			sidebartxt=sidebartxt.concat("&nbsp;"+cplayer.inventory[i]);
		}
	}
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
	game();
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
	for(var i=0; i<chests.length; i++){
		board[chests[i].xpos][chests[i].ypos]="]";
	}
	board[1][1]="0";
	board[xlength-2][1]="0";
	board[xlength-2][ylength-2]="0";
	board[1][Math.floor(ylength/2)-1]="T";
	
	//===random elements===
	//pressure plates in corridor
	for(var i=0;i<ptiles.length; i++){
		while(board[ptiles[i].xpos][ptiles[i].ypos]!="."){
			if(i==0){
			ptiles[i].xpos=randomposgen(10, 1);
			}else{
			ptiles[i].xpos=randomposgen(10, 11);
			}
			ptiles[i].ypos=randomposgen(3, 6);
		}
		board[ptiles[i].xpos][ptiles[i].ypos]="p";
	}
	
	//traps
	//rats
	for(var i=0;i<traps.length; i++){
		while(board[traps[i].xpos][traps[i].ypos]!="."){
			if(i==0){
			traps[i].xpos=randomposgen(10, 1);
			}else{
			traps[i].xpos=randomposgen(10, 11);
			}
			traps[i].ypos=randomposgen(3, 6);
		}
		board[traps[i].xpos][traps[i].ypos]="x";
	}
	
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
	for(var i=0;i<books.length; i++){
		while(board[books[i].xpos][books[i].ypos]!="."){
			books[i].xpos=randomposgen(20, 0);
		}
		board[books[i].xpos][books[i].ypos]="b";
	}
	
	//the codebook is
	codebook= randomposgen(4,1);
	//the code is
	code1= randomposgen(10,0);
	code2= randomposgen(10,0);
	code3= randomposgen(10,0);
	booktext="";
	booktext=booktext.concat(code1+" "+code2+" "+code3);
	document.getElementById("B").innerHTML = booktext;
	
	//potions and potion book
	while(board[potion1.xpos][potion1.ypos]!="."){
		potion1.xpos = randomposgen(10,30);
		potion1.ypos = randomposgen(6,1);
	}
	board[potion1.xpos][potion1.ypos]="*";
	
	while(board[potionbook.xpos][potionbook.ypos]!="."){
		potionbook.xpos = randomposgen(10,30);
		potionbook.ypos = randomposgen(6,1);
	}
	board[potionbook.xpos][potionbook.ypos]="b";
	
	
	var colors=["red", "blue", "green"];
	potioncolor1 = randomposgen(3, 0);
	potioncolor2 = randomposgen(3, 0);
	while(potioncolor2 === potioncolor1){
    		potioncolor2 = randomposgen(3, 0);
	}

	potioncolor3 = randomposgen(3, 0);
	while(potioncolor3 === potioncolor2){
    		potioncolor3 = randomposgen(3, 0);
	}

	document.getElementById("firework1").style.setProperty("--firework-color", colors[potioncolor1]);

	document.getElementById("firework2").style.setProperty("--firework-color", colors[potioncolor2]);

	document.getElementById("firework3").style.setProperty("--firework-color", colors[potioncolor3]);

	//rats
	for(var i=0;i<rats.length; i++){
		while(board[rats[i].xpos][rats[i].ypos]!="."){
			rats[i].xpos=randomposgen(xlength, 0);
			rats[i].ypos=randomposgen(ylength, 0);
		}
		board[rats[i].xpos][rats[i].ypos]="r";
	}
	//food
	for(var i=0;i<food.length; i++){
		while(board[food[i].xpos][food[i].ypos]!="."){
			food[i].xpos=randomposgen(14, xlength-14);
			food[i].ypos=randomposgen(7, ylength-7);
		}
		board[food[i].xpos][food[i].ypos]="f";
	}
	
	//kitchen chest soup
	for(var i=0; i<3; i++){
		var ingredients=[0, 1, 2];
		for(var j=0; j<3; j++){
			var candidates = ingredients.filter(function (v){
				return !(j>0 && v === soup[i][j-1]);
			});
			if(candidates.length === 0){
				candidates=ingredients;
			}
			var r = randomposgen(candidates.length, 0);
			var chosen = candidates[r];
			ingredients.splice(ingredients.indexOf(chosen), 1);
			soup[i][j] = chosen;
		}
	}
}
function showboard(){
	dispboard="";
	drawwalls();
	if(cplayer==player1){
		for(var i=0;i<ptiles.length; i++){
			board[ptiles[i].xpos][ptiles[i].ypos]="p";
		}
		for(var i=0;i<traps.length; i++){
			board[traps[i].xpos][traps[i].ypos]="x";
		}
	}else{
		for(var i=0;i<ptiles.length; i++){
			board[ptiles[i].xpos][ptiles[i].ypos]=".";
		}
		for(var i=0;i<traps.length; i++){
			board[traps[i].xpos][traps[i].ypos]=".";
		}
	}
	for(var i=0; i<chests.length; i++){
		board[chests[i].xpos][chests[i].ypos]="]";
	}
	board[mirror1.xpos][mirror1.ypos]="m";
	board[mirror2.xpos][mirror2.ypos]="m";
	board[potionbook.xpos][potionbook.ypos]="b";
	for(var i=0;i<rats.length; i++){
		board[rats[i].xpos][rats[i].ypos]="r";
	}
	//food should disapear when walked over so dont redraw it if its no longer there
	//for(var i=0;i<food.length; i++){
		//board[food[i].xpos][food[i].ypos]="f";
	//}
	
	for(var i = 0; i < books.length; i++){
    		if(codebook == i + 1){
        		board[books[i].xpos][books[i].ypos] = "B";
    		}else{
        		board[books[i].xpos][books[i].ypos] = "b";
    		}
	}
		
	board[player1.xpos][player1.ypos]="1";
	board[player2.xpos][player2.ypos]="2";
	for(var j=0; j<ylength; j++){
		for(var i=0; i<xlength; i++){
			if(board[i][j]=="]" && i==chests[1].xpos && j==chests[1].ypos){
			dispboard=dispboard.concat("<font size=5px>&#9879;&#65039;</font>");
			}else if(board[i][j]=="]"){
			dispboard=dispboard.concat("<font size=5px>&#128230;</font>");
			}else if(board[i][j]=="0"){
			dispboard=dispboard.concat("<font size=5px>&#10024;</font>");
			}else if(board[i][j]=="p"){
			dispboard=dispboard.concat("<font size=5px>&#128062;</font>");
			}else if(board[i][j]=="m"){
			dispboard=dispboard.concat("<font size=5px>&#129694;</font>");
			}else if(board[i][j]=="x"){
			dispboard=dispboard.concat("<font size=5px>&#9760;</font>");
			}else if((board[i][j]=="b" || board[i][j]=="B") && j==books[3].ypos){
			dispboard=dispboard.concat("<font size=5px>&#128217;</font>");
			}else if((board[i][j]=="b" || board[i][j]=="B") && j==books[2].ypos){
			dispboard=dispboard.concat("<font size=5px>&#128216;</font>");
			}else if((board[i][j]=="b" || board[i][j]=="B") && j==books[1].ypos){
			dispboard=dispboard.concat("<font size=5px>&#128215;</font>");
			}else if((board[i][j]=="b" || board[i][j]=="B") && j==books[0].ypos){
			dispboard=dispboard.concat("<font size=5px>&#128213;</font>");
			}else if(board[i][j]=="b"){
			dispboard=dispboard.concat("<font size=5px>&#128213;</font>");
			}else if(board[i][j]=="*"){
				var potion="&#129514;";
				var ctx=document.createElement("canvas").getContext("2d");
				if(ctx){
				ctx.fillText("\uD83E\uDDEA", 0, 10);
				if(ctx.getImageData(0, 0, 12, 12).data.indexOf(255)==-1){
					potion="&#127863;";//fallback
				}
				}
				dispboard=dispboard.concat("<font size=5px>"+potion+"</font>");
			}else if(board[i][j]=="f"){
				dispboard=dispboard.concat("<font size=5px>&#127822;</font>");
			}else if(board[i][j]=="r"){
				dispboard=dispboard.concat("<font size=5px>&#128000;</font>");
			}else{
				dispboard=dispboard.concat("<font size=6px, color=white>",board[i][j],"</font>");
			}
		}
		dispboard=dispboard.concat("<br>");
	}
	document.getElementById("thegame").innerHTML = dispboard;
}


function checkobstacle(nextx, nexty){
	if(board[nextx][nexty]=="]" && nextx==chests[0].xpos){
		custompopup("]1");
		chest="";
		chest=chest.concat(c1+" "+c2+" "+c3);
		document.getElementById("codeenter").innerHTML = chest;
	}else if(board[nextx][nexty]=="]" && nextx==chests[1].xpos){
		custompopup("]2");
		givepotion();
	}else if(board[nextx][nexty]=="]" && nextx==chests[2].xpos){
		custompopup("]3");
		showsoup();
		dispexpla();
	}else if(board[nextx][nexty]=="b"){
		custompopup("b");
		if(nextx==potionbook.xpos && nexty==potionbook.ypos){
			custompopup("fireworks");	
		}
	}else if(board[nextx][nexty]=="B"){
		if(cplayer==player1){
			custompopup("b");
			custompopup("B");
		}else{
			custompopup("b");
		}
	}else if(board[nextx][nexty]=="0"){
		custompopup("0");
	}
	
	else if(traps.some(t => nextx == t.xpos && nexty == t.ypos)){
		message="";
		message=message.concat("CAREFUL! You stepped on a trap and have lost a heart");
		document.getElementById("message").innerHTML = chest;
		cplayer.health--;
		game();
	}else if(ptiles.some(p => nextx == p.xpos && nexty == p.ypos)){
		//which ptile is the mover stepping onto?
		var destindex = -1;
		for(var i=0; i<ptiles.length; i++){
			if(nextx == ptiles[i].xpos && nexty == ptiles[i].ypos){
				destindex=i;
			}
		}
		//is the other player standing on a ptile, and which one?
		var oppindex = -1;
		if(cp==1){
			for(var i=0; i <ptiles.length; i++){
				if(player2.xpos == ptiles[i].xpos && player2.ypos == ptiles[i].ypos){
					oppindex=i;
				}
			}
		}
		if(cp==2){
			for(var i=0; i <ptiles.length; i++){
				if(player1.xpos == ptiles[i].xpos && player1.ypos == ptiles[i].ypos){
					oppindex=i;
				}
			}
		}
		//check if both on different pressure plates
		if(destindex!=-1 && oppindex!=-1 && destindex!=oppindex){
			custompopup("p");
		}
	}
	else if(board[nextx][nexty]=="*"){
		var cnt=0;
		while(cnt<cplayer.inventory.length && cplayer.inventory[cnt]!="."){
			cnt++;
		}
		cplayer.inventory[cnt]="*";
	}
	else if(board[nextx][nexty]=="m"){
		if(nextx==mirror1.xpos && nexty==mirror1.ypos){
			custompopup("m1");
		}else{
			custompopup("m2");
		}
	}
	else if(board[nextx][nexty]=="r"){
		message="&#128123; CAREFUL! Rats bite, you have lost a heart";
		cplayer.health--;
		disppinfo();
	}
	else if(board[nextx][nexty]=="f"){
		if(cplayer.health<3){
			cplayer.health++;
		}else{
			var cnt=0;
			while(cnt<cplayer.inventory.length && cplayer.inventory[cnt]!="."){
				cnt++;
			}
			cplayer.inventory[cnt]="f";
		}
	}
}

function moveup(){
	if(!freeze){
		message="&#128123;";
		checkobstacle(cplayer.xpos,cplayer.ypos-1);
		
		if(board[cplayer.xpos][cplayer.ypos-1]=="#"){
			message=message.concat("you have hit a wall");
		}else if(cplayer.ability!="go through thin walls" && board[cplayer.xpos][cplayer.ypos-1]=="="){
			message=message.concat("you have hit a wall");
		}else{
			board[cplayer.xpos][cplayer.ypos]=".";
			cplayer.ypos--;
			game();
		}
		document.getElementById("message").innerHTML = message;
	}
}
function moveleft(){
	if(!freeze){
		message="&#128123;";
		checkobstacle(cplayer.xpos-1,cplayer.ypos);
		if(board[cplayer.xpos-1][cplayer.ypos]=="#"){
			message=message.concat("you have hit a wall");
		}else if(board[cplayer.xpos-1][cplayer.ypos]=="|"){
			message=message.concat("front gate is locked");
		}else if(cplayer.ability!="go through thin walls" && board[cplayer.xpos-1][cplayer.ypos]=="="){
			message=message.concat("you have hit a wall");
		}else{
			board[cplayer.xpos][cplayer.ypos]=".";
			cplayer.xpos--;
			game();
		}
		document.getElementById("message").innerHTML = message;
	}
}
function moveright(){
	if(!freeze){
		message="&#128123;";
		checkobstacle(cplayer.xpos+1,cplayer.ypos);
		if(board[cplayer.xpos+1][cplayer.ypos]=="#"){
			message=message.concat("you have hit a wall");
		}else if(cplayer.ability!="go through thin walls" && board[cplayer.xpos+1][cplayer.ypos]=="="){
			message=message.concat("you have hit a wall");
		}else{
			board[cplayer.xpos][cplayer.ypos]=".";
			cplayer.xpos++;
			game();
		}
		document.getElementById("message").innerHTML = message;
	}
}
function movedown(){
	if(!freeze){
		message="&#128123;";
		checkobstacle(cplayer.xpos,cplayer.ypos+1);
		if(board[cplayer.xpos][cplayer.ypos+1]=="#"){
			message=message.concat("you have hit a wall");
		}else if(cplayer.ability!="go through thin walls" && board[cplayer.xpos][cplayer.ypos+1]=="="){
			message=message.concat("you have hit a wall");
		}else{
			board[cplayer.xpos][cplayer.ypos]=".";
			cplayer.ypos++;
			game();
		}
		document.getElementById("message").innerHTML = message;
	}
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
	disppinfo();
	showboard();
}

