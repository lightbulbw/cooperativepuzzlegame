var board=[];//2d array
var xlength=40;//min value is17
var ylength=15;//min value is 10

var puzzle=[false,false,false,false,false];
var gotarmor=[false,false,false,false];
var freeze=false;
var player1={
  ability:"UV vision",
  health:3,
  nbpuzzlesol:0,
  xpos:3,
  ypos:3,
  inventory:[".",".",".",".",".",".",".",".","."]
};
var player2={
  ability:"go through thin walls",
  health:3,
  nbpuzzlesol:0,
  xpos:xlength-4,
  ypos:ylength-4,
  inventory:[".",".",".",".",".",".",".",".","."]
};
var cp=1;//current player
var cplayer=player1;
//armor stand aka knight
var as={
xpos:1,
ypos:Math.floor(ylength/3)+1
}
//pressure plates
var ptiles=[
	{xpos:0,ypos:0},
	{xpos:0,ypos:0}   
];

var traps=[
	{xpos:0,ypos:0},
	{xpos:0,ypos:0}   
];

var mirrors=[
	{xpos:0,ypos:0},
	{xpos:0,ypos:0}   
];

var books=[
	{xpos:0,ypos:1},
	{xpos:0,ypos:2},
	{xpos:0,ypos:3},
	{xpos:0,ypos:4}     
];
var codebook=1;
var code=[1,1,1];
var c=[0,0,0];
var rnbl=-1;
var portals=[
	{xpos:xlength-2,ypos:ylength-2},
	{xpos:xlength-2,ypos:1}, 
	{xpos:1,ypos:1},
];

var chests=[
	{xpos:Math.floor(xlength/2)+4,ypos:1},
	{xpos:xlength-2,ypos:Math.floor(ylength/3)+1}, 
	{xpos:Math.floor(xlength/2)+6,ypos:ylength-2}  
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
var potioncolor=[0,0,0];
var pcolor=[0,0,0];	

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

var bat=3;//shared resource
var stepcnt=0;

var sidebartxt="";
var dispboard="";
var message="&#128123;";
var booktext="";
var chest="";
var codem="";
var showplate="";
var place="";

function restart(){
	//console.log("restart");
	hideshow(false,"playagain");
	removepopup();
	cp=1;
	cplayer=player1;
	player1.health=3;
	player1.nbpuzzlesol=0;
	player2.health=3;
	player2.nbpuzzlesol=0;
	
	player1.xpos=3;
	player1.ypos=3;

	player2.xpos=xlength-4;
	player2.ypos=ylength-4;

	player1.inventory=[".",".",".",".",".",".",".","."];
	player2.inventory=[".",".",".",".",".",".",".","."];

	puzzle=[false,false,false,false,false];
	gotarmor=[false,false,false,false];
	bat=3;
	
	for(var i=0; i<ptiles.length;i++){
		ptiles[i].xpos=0;
		ptiles[i].ypos=0;
	}
	for(var i=0; i<traps.length;i++){
		traps[i].xpos=0;
		traps[i].ypos=0;
	}
	for(var i=0; i<mirrors.length;i++){
		mirrors[i].xpos=0;
		mirrors[i].ypos=0;
	}
	for(var i=0; i<books.length;i++){
		books[i].xpos=0;
	}
	code=[1,1,1];
	c=[0,0,0];
	potion1={
		xpos:0,
		ypos:0
	}
	gotpotion=false;
	potionbook={
		xpos:0,
		ypos:0
	}
	potioncolor=[0,0,0];
	pcolor=[0,0,0];
	for(var i=0; i<rats.length;i++){
		rats[i].xpos=0;
		rats[i].ypos=0;
	}
	for(var i=0; i<food.length;i++){
		food[i].xpos=0;
		food[i].ypos=0;
	}
	
	sidebartxt="";
	dispboard="";
	message="&#128123;";
	booktext="";
	chest="";
	codem="";
	showplate="";
	place="";
	document.getElementById("light").innerHTML = sidebartxt;
	document.getElementById("thegame").innerHTML = dispboard;
	document.getElementById("message").innerHTML = message;
	document.getElementById("chestmessage").innerHTML = chest;
	document.getElementById("place").innerHTML = place;

	populateboard();
	showboard();
	dispinfo();
}
function instruct(){
	document.getElementById("mypopup").style.backgroundColor = "crimson";
	custompopup("instructions");
}
function dispinfo(){
	sidebartxt="";
	sidebartxt=sidebartxt.concat("current player: p" + cp+"<br>");

	sidebartxt=sidebartxt.concat("player ability: " + cplayer.ability+"<br>");
	
	sidebartxt=sidebartxt.concat("health: " + cplayer.health + "/3<br>");

	sidebartxt=sidebartxt.concat("flashlight battery: " + bat + "/3<br>");
	
	sidebartxt=sidebartxt.concat("inventory:<br>");
	for(var i=0; i<cplayer.inventory.length; i++){
		if(cplayer.inventory[i]=="*"){
			sidebartxt=sidebartxt.concat("<font style='background-color:blue;'>&#129514;</font>");
		}else if(cplayer.inventory[i]=="f"){
			sidebartxt=sidebartxt.concat("<font style='background-color:blue;'>&#127822;</font>");
		}else if(cplayer.inventory[i]=="$"){
			sidebartxt=sidebartxt.concat("<font style='background-color:blue;'>&#128267;</font>");
		}else if(cplayer.inventory[i]=="h"){
			sidebartxt=sidebartxt.concat("<font style='background-color:blue;'>&#127762;</font>");
		}else if(cplayer.inventory[i]=="c"){
			sidebartxt=sidebartxt.concat("<font style='background-color:blue;'>&#127764;</font>");
		}else if(cplayer.inventory[i]=="p"){
			sidebartxt=sidebartxt.concat("<font style='background-color:blue;'>&#127766;</font>");
		}else if(cplayer.inventory[i]=="s"){
			sidebartxt=sidebartxt.concat("<font style='background-color:blue;'>&#127768;</font>");
		}else{
			sidebartxt=sidebartxt.concat("<font style='background-color:blue;'>&nbsp;"+cplayer.inventory[i]+"</font>");
		}
	}
	document.getElementById("light").innerHTML = sidebartxt;
	
}
function changep(){
	//console.log("changeplayer fct");
	if(cp==1){
		cp=2;
		cplayer=player2;
	}else{
		cp=1;
		cplayer=player1;
	}
	message="&#128123;";
	roomdescr(cplayer.xpos,cplayer.ypos);
	game();
}

function drawwalls(){
	//walls
	for(var i=0; i<xlength; i++){
		if(i<Math.floor(2*xlength/3)-1){
			board[i][Math.floor(2*ylength/3)-1]="=";
			board[i][Math.floor(2*ylength/3)-5]="=";
		}else if(i>Math.floor(xlength/3)-1){
			board[i][Math.floor(2*ylength/3)-3]="=";
		}
		board[i][0]="#";
		board[i][ylength-1]="#";
	}
	for(var j=0; j<ylength; j++){
		if(board[Math.floor(2*xlength/3)-1][j]=="."){
		board[Math.floor(2*xlength/3)-1][j]="=";
		}
		board[0][j]="#";
		board[xlength-1][j]="#";
	}
	board[0][Math.floor(ylength/2)]="|";//exit
	//open doors
	board[Math.floor(2*xlength/3)-3][Math.floor(2*ylength/3)-5]=".";
	board[Math.floor(2*xlength/3)-2][Math.floor(2*ylength/3)-5]=".";
	board[Math.floor(2*xlength/3)-1][Math.floor(2*ylength/3)-4]=".";
	board[Math.floor(2*xlength/3)-1][Math.floor(2*ylength/3)-2]=".";
}

function randomposgen(range, offset){
	var rnb=Math.floor(Math.random() * range)+offset;
	return rnb;	
}

function populateboard(){
	message=message.concat("Two friends(player1 and player 2) explore a castle when suddently the lights are blown out.<br>To escape you have to help them solve puzzles and bring the moon phases to the knight at the entrance before their flashlight battery runs out.<br>(move around using arrow keys or w-a-s-d or h-j-k-l)");
	document.getElementById("message").innerHTML = message;
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
	for(var i=0; i<portals.length; i++){
		board[portals[i].xpos][portals[i].ypos]="0";
	}
	board[as.xpos][as.ypos]="T";
	
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
	for(var i=0;i<mirrors.length; i++){
		while(board[mirrors[i].xpos][mirrors[i].ypos]!="."){
			if(i==0){
			mirrors[i].xpos=randomposgen(10, 1);
			mirrors[i].ypos=randomposgen(2, ylength-3);
			}else{
			mirrors[i].xpos=randomposgen(10, 13);
			mirrors[i].ypos=randomposgen(2, ylength-5);
			}	
		}
		board[mirrors[i].xpos][mirrors[i].ypos]="m";
	}
	
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
	for(var i=0; i<code.length; i++){
	code[i]= randomposgen(10,0);
	}
	booktext="";
	booktext=booktext.concat(code[0]+" "+code[1]+" "+code[2]);
	document.getElementById("B").innerHTML = booktext;
	
	//potions and potion book
	while(board[potion1.xpos][potion1.ypos]!="."){
		potion1.xpos = randomposgen(10,30);
		potion1.ypos = randomposgen(6,1);
	}
	board[potion1.xpos][potion1.ypos]="*";
	
	while(board[potionbook.xpos][potionbook.ypos]!="."){
		potionbook.xpos = randomposgen(10,xlength-10);
		potionbook.ypos = randomposgen(6,1);
	}
	board[potionbook.xpos][potionbook.ypos]="b";
	
	
	var colors=["red", "blue", "green"];
	potioncolor[0] = randomposgen(3, 0);
	potioncolor[1] = randomposgen(3, 0);
	while(potioncolor[1] === potioncolor[0]){
    		potioncolor[1] = randomposgen(3, 0);
	}

	potioncolor[2] = randomposgen(3, 0);
	while(potioncolor[2] === potioncolor[1]){
    		potioncolor[2] = randomposgen(3, 0);
	}
	for(var i=0; i<potioncolor.length; i++){
		document.getElementById("firework"+(i+1)).style.setProperty("--firework-color", colors[potioncolor[i]]);
	}
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
			food[i].xpos=randomposgen(14, Math.floor(2*xlength/3));
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
	board[as.xpos][as.ypos]="T";
	for(var i=0; i<chests.length; i++){
		board[chests[i].xpos][chests[i].ypos]="]";
	}
	for(var i=0; i<portals.length; i++){
		board[portals[i].xpos][portals[i].ypos]="0";
	}
	for(var i=0; i<mirrors.length; i++){
		board[mirrors[i].xpos][mirrors[i].ypos]="m";
	}
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
			//if not illumnated then black else show board content
			if(!(board[i][j]=="#" || board[i][j]=="=" || (i==cplayer.xpos && j==cplayer.ypos) || (i==cplayer.xpos+1 && j==cplayer.ypos) || (i==cplayer.xpos-1 && j==cplayer.ypos) || (i==cplayer.xpos && j==cplayer.ypos+1) || (i==cplayer.xpos && j==cplayer.ypos-1))){
				dispboard = dispboard.concat("<span>&#9632;</span>");
			}else{
				if(board[i][j]=="]" && i==chests[1].xpos && j==chests[1].ypos){
					dispboard=dispboard.concat("<span>&#9879;&#65039;</span>");
				}else if(board[i][j]=="]"){
					dispboard=dispboard.concat("<span>&#128230;</span>");
				}else if(board[i][j]=="T"){
					dispboard=dispboard.concat("<span>&#9820;</span>");
				}else if(board[i][j]=="0"){
					dispboard=dispboard.concat("<span>&#10024;</span>");
				}else if(board[i][j]=="p"){
					dispboard=dispboard.concat("<span>&#128062;</span>");
				}else if(board[i][j]=="m"){
					dispboard=dispboard.concat("<span>&#129694;</span>");
				}else if(board[i][j]=="x"){
					dispboard=dispboard.concat("<span>&#9760;</span>");
				}else if((board[i][j]=="b" || board[i][j]=="B") && j==books[3].ypos){
					dispboard=dispboard.concat("<span>&#128217;</span>");
				}else if((board[i][j]=="b" || board[i][j]=="B") && j==books[2].ypos){
					dispboard=dispboard.concat("<span>&#128216;</span>");
				}else if((board[i][j]=="b" || board[i][j]=="B") && j==books[1].ypos){
					dispboard=dispboard.concat("<span>&#128215;</span>");
				}else if((board[i][j]=="b" || board[i][j]=="B") && j==books[0].ypos){
					dispboard=dispboard.concat("<span>&#128213;</span>");
				}else if(board[i][j]=="b"){
					dispboard=dispboard.concat("<span>&#128213;</span>");
				}else if(board[i][j]=="*"){
					var potion="&#129514;";
					var ctx=document.createElement("canvas").getContext("2d");
					if(ctx){
						ctx.fillText("\uD83E\uDDEA", 0, 10);
						if(ctx.getImageData(0, 0, 12, 12).data.indexOf(255)==-1){
							potion="&#127863;";//fallback
						}
					}
					dispboard=dispboard.concat("<span>"+potion+"</span>");
				}else if(board[i][j]=="f"){
					dispboard=dispboard.concat("<span>&#127822;</span>");
				}else if(board[i][j]=="r"){
					dispboard=dispboard.concat("<span>&#128000;</span>");
				}else{
					dispboard=dispboard.concat("<span style='color:white;'>",board[i][j],"</span>");
				}
			}
		}
		dispboard=dispboard.concat("<br>");
	}
	document.getElementById("thegame").innerHTML = dispboard;
	//document.getElementById("thegame").style.setProperty("--columns", xlength);
	document.getElementById("thegame").style.fontSize=Math.min(window.innerWidth*0.05, window.innerWidth*1.25/(xlength*1.2))+"px";
}
window.addEventListener("resize", function() {
    document.getElementById("thegame").style.fontSize =
        Math.min(window.innerWidth*0.05,window.innerWidth*1.25/(xlength*1.2))+"px";
});

function checkobstacle(nextx, nexty){
	if(board[nextx][nexty]=="]" && nextx==chests[0].xpos){
		if(puzzle[0]==true){
			chest="";
			chest=chest.concat("puzzle complete");
			document.getElementById("chestmessage").innerHTML = chest;
		}else{
			chest="";
			chest=chest.concat("use the buttons to enter the code");
			document.getElementById("chestmessage").innerHTML = chest;
		}
		custompopup("]1");
		codem="";
		for(var i=0; i<c.length; i++){
			codem=codem.concat(c[i]+" ");
		}
		document.getElementById("codeenter").innerHTML = codem;
	}else if(board[nextx][nexty]=="]" && nextx==chests[1].xpos){
		if(puzzle[2]==true){
		chest="";
		chest=chest.concat("puzzle complete");
		document.getElementById("chestmessage").innerHTML = chest;
		}
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
		secretl(nextx,nexty);
	}
	
	else if(traps.some(t => nextx == t.xpos && nexty == t.ypos)){
		message="&#128123;";
		message=message.concat("CAREFUL! You stepped on a trap and have lost a heart");
		document.getElementById("message").innerHTML = message;
		var ate=false;
		for(var i=0; i<cplayer.inventory.length; i++){
			if(cplayer.inventory[i]=="f"){
				ate=true;
				cplayer.inventory[i]=".";
				break;
			}
		}
		if(!ate){cplayer.health--;}
		dispinfo();
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
			if(puzzle[1]==false){
				chest="";
				chest=chest.concat("Congratulations you solved this puzzle!<br> You have received a Waxing gibbous moon as a reward.<br> Bring it to the castle knight, when his armor is complete the main gate will be unlocked");
				document.getElementById("chestmessage").innerHTML = chest;
		
				var cnt=0;
				while(cnt<cplayer.inventory.length && cplayer.inventory[cnt]!="."){
					cnt++;
				}
				cplayer.inventory[cnt]="c";
				puzzle[1]=true;
			}else{
				chestm="";
				chest=chest.concat("puzzle complete");
				document.getElementById("chestmessage").innerHTML = chest;
		
			}
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
		if(puzzle[4]==false){
			chest="The Mirror room has no entrance.<br>If you dare enter you must move the mirrors such that they look at each other.<br>This will break the spell and help you restore the moon phases for the castle knight<br>";
		}else{
			chest="puzzle complete";
		}
		document.getElementById("chestmessage").innerHTML = chest;
		
		if(nexty==mirrors[0].ypos && nextx==mirrors[0].xpos){
			custompopup("m1");
		}else{
			custompopup("m2");
		}
	}
	else if(board[nextx][nexty]=="r"){
		message="&#128123; CAREFUL! Rats bite, you have lost a heart";
		var ate=false;
		for(var i=0; i<cplayer.inventory.length; i++){
			if(cplayer.inventory[i]=="f"){
				ate=true;
				cplayer.inventory[i]=".";
				break;
			}
		}
		if(!ate){cplayer.health--;}
		dispinfo();
	}
	else if(board[nextx][nexty]=="f"){
		message="&#128123;";
		message=message.concat("Food can restore your health");
		document.getElementById("message").innerHTML = message;
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

function roomdescr(nextx,nexty){
	place="";
	if(nextx<Math.floor(2*xlength/3) && nexty>ylength-7){
	place=place.concat("The Mirror room has no entrance.<br>If you dare enter you must move the mirrors such that they look at each other.<br>This will break the spell and help you restore the moon phases for the castle knight<br>");
	}else if(nextx<Math.floor(2*xlength/3) && nexty<ylength-6 && nexty>ylength-10){
	place=place.concat("The corridor has 2 pressure plates that if simultaniously activated will help you restore the moon phases for the castle knight. <br>However, their locations are only marked in UV.<br>Also becareful there are traps!<br>");
	}else if(nextx>Math.floor(2*xlength/3)-1 && nexty<ylength-7){
		place=place.concat("You are in the Potion room<br>");
	}else if(nextx>Math.floor(2*xlength/3)-1 && nexty>ylength-8){
		place=place.concat("You are in the Kitchen<br>");
	}else if(nextx<Math.floor(2*xlength/3)-1 && nexty<Math.floor(2*ylength/3)-5){
		place=place.concat("You are in the Library<br>");
	}
	document.getElementById("place").innerHTML = place;
}

function batdrain(){
	stepcnt++;
	if(stepcnt>=50){
		stepcnt=0;
		var yes=false;
		for(var i=0; i<player1.inventory.length; i++){
			if(player1.inventory[i]=="$"){
				yes=true;
				player1.inventory[i]="."; 
				break;
			}
		}
		if(!yes){
			for(var i=0; i<player2.inventory.length; i++){
				if(player2.inventory[i]=="$"){
					yes=true;
					player2.inventory[i]="."; 
					break;
				}
			}if(!yes){
				bat--;
			}
		}
	}
}

function moveup(){
	if(!freeze){
	if(board[cplayer.xpos][cplayer.ypos-1]=="T"){
		custompopup("T");
		theknight();
	}else{
		message="&#128123;";
		roomdescr(cplayer.xpos,cplayer.ypos-1);
		checkobstacle(cplayer.xpos,cplayer.ypos-1);
		if(board[cplayer.xpos][cplayer.ypos-1]=="#"){
			message=message.concat("you have hit a wall");
		}else if(cplayer.ability!="go through thin walls" && board[cplayer.xpos][cplayer.ypos-1]=="="){
			message=message.concat("you have hit a wall");
		}else{
			board[cplayer.xpos][cplayer.ypos]=".";
			cplayer.ypos--;
			batdrain();
			game();
		}
		document.getElementById("message").innerHTML = message;
	}
	}
}
function moveleft(){
	if(!freeze){
	if(board[cplayer.xpos-1][cplayer.ypos]=="T"){
		custompopup("T");
		theknight();
	}else{
		message="&#128123;";
		roomdescr(cplayer.xpos-1,cplayer.ypos);
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
			batdrain();
			game();
		}
		document.getElementById("message").innerHTML = message;
	}
	}
}
function moveright(){
	if(!freeze){
	if(board[cplayer.xpos+1][cplayer.ypos]=="T"){
		custompopup("T");
		theknight();
	}else{
		message="&#128123;";
		roomdescr(cplayer.xpos+1,cplayer.ypos);
		checkobstacle(cplayer.xpos+1,cplayer.ypos);
		if(board[cplayer.xpos+1][cplayer.ypos]=="#"){
			message=message.concat("you have hit a wall");
		}else if(cplayer.ability!="go through thin walls" && board[cplayer.xpos+1][cplayer.ypos]=="="){
			message=message.concat("you have hit a wall");
		}else{
			board[cplayer.xpos][cplayer.ypos]=".";
			cplayer.xpos++;
			batdrain();
			game();
		}
		document.getElementById("message").innerHTML = message;
	}
	}
}
function movedown(){
	if(!freeze){
	if(board[cplayer.xpos][cplayer.ypos+1]=="T"){
		custompopup("T");
		theknight();
	}else{
		message="&#128123;";
		roomdescr(cplayer.xpos,cplayer.ypos+1);
		checkobstacle(cplayer.xpos,cplayer.ypos+1);
		if(board[cplayer.xpos][cplayer.ypos+1]=="#"){
			message=message.concat("you have hit a wall");
		}else if(cplayer.ability!="go through thin walls" && board[cplayer.xpos][cplayer.ypos+1]=="="){
			message=message.concat("you have hit a wall");
		}else{
			board[cplayer.xpos][cplayer.ypos]=".";
			cplayer.ypos++;
			batdrain();
			game();
		}
		document.getElementById("message").innerHTML = message;
	}
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
if(e.keyCode==32){//spacebar
    e.preventDefault();
    e.stopPropagation();
    removepopup();
}
}
//to stop scrolling with down arrow key
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function game(){
	dispinfo();
	showboard();
	if(bat<3 && puzzle[2]==false){
		message=message.concat("<br>The castle magic is draining your flashlight battery fast. Go to the potion room and solve its puzzle to get extra batteries");
		document.getElementById("message").innerHTML = message;
	}
	if(player1.health<=0 || player2.health<=0 || bat<1){
		removepopup();
		custompopup("lost");
		chest="";
		chest=chest.concat("Game Over!!!<br>");
		if(bat<1){
			chest=chest.concat("Your flashlight batteries are all dead");
		}else if(player1.health<=0){
			chest=chest.concat("player1 has lost all 3 hearts");
		}else if(player2.health<=0){
			chest=chest.concat("player2 has lost all 3 hearts");
		}
		document.getElementById("chestmessage").innerHTML = chest;
		hideshow(false,"exit");
		hideshow(true,"playagain");
	}
}

