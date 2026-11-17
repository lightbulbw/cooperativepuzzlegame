function hideshow(show,x){
        if(show==false){
                document.getElementById(x).style.display="none";
        }else{
                document.getElementById(x).style.display="inline-block";
        }
}

function custompopup(myobject){
	freeze=true;
	hideshow(true,"overlay");
	hideshow(true,"mypopup");
	hideshow(true,"exit");
	hideshow(true,myobject);
}

function removepopup(){
	freeze=false;
	chest="";
	document.getElementById("chestmessage").innerHTML = chest;
	hideshow(false,"overlay");
	hideshow(false,"mypopup");
	hideshow(false,"exit");
	hideshow(false,"]1");
	hideshow(false,"]2");
	hideshow(false,"]3");
	hideshow(false,"b");
	hideshow(false,"B");
	hideshow(false,"0");
	hideshow(false,"p");
	hideshow(false,"fireworks");
	hideshow(false,"m1");
	hideshow(false,"m2");
	hideshow(false,"instructions");
	document.getElementById("mypopup").style.backgroundColor = "yellow";

}

function theknight(){
	chest="";
	for(var i=0; i<cplayer.inventory.length; i++){
		if(cplayer.inventory[i]=="h"){
			gotarmor[0]=true;
			cplayer.inventory[i]=".";
		}else if(cplayer.inventory[i]=="c"){
			gotarmor[1]=true;
			cplayer.inventory[i]=".";
		}else if(cplayer.inventory[i]=="p"){
			gotarmor[2]=true;
			cplayer.inventory[i]=".";
		}if(cplayer.inventory[i]=="s"){
			gotarmor[3]=true;
			cplayer.inventory[i]=".";
		}
	}
	
	var cnt=0;
	if(gotarmor[0]){
		chest=chest.concat("h");
		cnt++;
	}else{
		chest=chest.concat(".&nbsp;");
	}if(gotarmor[1]){
		chest=chest.concat("c");
		cnt++;
	}else{
		chest=chest.concat(".&nbsp;");
	}if(gotarmor[2]){
		chest=chest.concat("p");
		cnt++;
	}else{
		chest=chest.concat(".&nbsp;");
	}if(gotarmor[3]){
		chest=chest.concat("s");
		cnt++;
	}else{
		chest=chest.concat(".&nbsp;");
	}
	chest=chest.concat("Hi, I am the Castle Knight,");
	if(!(gotarmor[0] && gotarmor[1] && gotarmor[2] && gotarmor[3])){
		var done=0;
	for(var i=0; i<puzzle.length; i++){
		if(puzzle[i]){done++;}
		}if(cnt<4 && done==4){
			chest=chest.concat("<br>Thank you for the armor pieces. If the other player also brings me its collected pieces I will unlock the front gate");
		}else{
			chest=chest.concat("<br>please give me all the armorpieces, then I will unlock the Main gate");
		}
	}
	if(cnt==4){
		chest=chest.concat("<br><font size=8px, color=red>y</font><font size=8px, color=blue>o</font><font size=8px, color=green>u </font><font size=8px, color=orange>w</font><font size=8px, color=purple>i</font><font size=8px, color=turquise>n</font><font size=8px, color=red>!</font><font size=8px, color=orange>!</font><font size=8px, color=blue>!</font>");
		hideshow(false,"exit");
		hideshow(true,"playagain");
	}
	
	document.getElementById("chestmessage").innerHTML = chest;
}

//secret passage
function secretl(nextx, nexty){
	chest="";
	chest=chest.concat("This is a secrete passage to ");
	rnbl=-1;
	if(nextx==portals[0].xpos && nexty==portals[0].ypos){
		rnbl=randomposgen(2,1);//l or p
	}else if(nextx==portals[1].xpos && nexty==portals[1].ypos){
		rnbl=randomposgen(2,0);
		if(rnbl==1){rnbl=2;}//k or l
	}else if(nextx==portals[2].xpos && nexty==portals[2].ypos){
		rnbl=randomposgen(2,0);//k or p
	}
	if(rnbl==0){
		chest=chest.concat("the kitchen");
	}
	else if(rnbl==1){
		chest=chest.concat("the potion room");
	}else if(rnbl==2){
		chest=chest.concat("the library");
	}else if(rnbl==-1){
		chest=chest.concat("nowhere");
	}
	document.getElementById("chestmessage").innerHTML = chest;
}
function gothere(){
		board[cplayer.xpos][cplayer.ypos]=".";
		cplayer.xpos=portals[rnbl].xpos; cplayer.ypos=portals[rnbl].ypos;
		removepopup();
		game();
}

//library chest
function digit(nb,change){
	chest="";
	codem="";
	c[nb-1]+=change;
	if(c[nb-1]>=10){
	c[nb-1]=0;
	}else if(c[nb-1]<=0){
	c[nb-1]=9;
	}
	codem=codem.concat(c[0]+" "+c[1]+" "+c[2]);
	if(puzzle[0]==false && c[0]==code[0] && c[1]==code[1] && c[2]==code[2]){
		chest=chest.concat("Congratulations you solved this puzzle!<br> You have received a Waxing crescent moon as a reward.<br> Bring it to the castle knight, when his moon phases are complete the main gate will be unlocked");
		document.getElementById("chestmessage").innerHTML = chest;
		var cnt=0;
		while(cnt<cplayer.inventory.length && cplayer.inventory[cnt]!="."){
			cnt++;
		}
		cplayer.inventory[cnt]="h";
		puzzle[0]=true;
		dispinfo();
	}
	document.getElementById("codeenter").innerHTML = codem;
}

//potion chest
function changecolor(nb){
	var colors=["red", "blue", "green"];
	var colorbox="box"+nb;
	pcolor[nb - 1] = (pcolor[nb - 1] + 1) % 3;
	document.getElementById(colorbox).style.backgroundColor = colors[pcolor[nb - 1]];
	givepotion();
}

function givepotion(){
	if(puzzle[2]==false){
	chest="";
	for(var i=0; i<cplayer.inventory.length; i++){
		if(cplayer.inventory[i]=="*"){
			gotpotion=true;
			cplayer.inventory[i]=".";
		}
	}
	if(gotpotion){
		chest=chest.concat("&#129514;");
	}else{
		chest=chest.concat("please give me a potion for the spell to work");
	}
	if(puzzle[2]==false && potioncolor[0]==pcolor[0] && potioncolor[1]==pcolor[1] && potioncolor[2]==pcolor[2] && gotpotion){
		chest=chest.concat("Congratulation you have solved this puzzle!<br>As a reward you get 2 batteries");
		message="&#128123;";
		document.getElementById("message").innerHTML=message;	
		puzzle[2]=true;
		var gotbat=2;
		if(bat<3){
			bat+=gotbat;
			gotbat=0;
			if(bat>3){
				bat=3;gotbat=1;
			}
		}while(gotbat>0){
			var cnt=0;
			while(cnt<cplayer.inventory.length && cplayer.inventory[cnt]!="."){
				cnt++;
			}
			cplayer.inventory[cnt]="$";
			gotbat--;
		}
	}else if(gotpotion){
		chest=chest.concat("great now just select the correct colors to activate the potion");
	}
	document.getElementById("chestmessage").innerHTML=chest;
	dispinfo();
	}
}


//mirror room
function movemirror(nb, x, y){
	if(puzzle[4]==false){
	chest="The Mirror room has no entrance.<br>If you dare enter you must move the mirrors such that they look at each other.<br>This will break the spell and help you restore the moon phases for the castle knight<br>";
	if(board[mirrors[nb-1].xpos+x][mirrors[nb-1].ypos+y]=="." || board[mirrors[nb-1].xpos+x][mirrors[nb-1].ypos+y]=="-"){
	board[mirrors[nb-1].xpos][mirrors[nb-1].ypos]=".";
	mirrors[nb-1].xpos+=x;
	mirrors[nb-1].ypos+=y;
	showboard();
	}else{
		chest=chest.concat("The mirror has hit something");
	}
	//checkwin
	if(mirrors[0].ypos==mirrors[1].ypos || mirrors[0].xpos==mirrors[1].xpos){
		chest="";
		chest=chest.concat("Congratulations you solved this puzzle!<br> You have received a Waning crescent moon as a reward.<br> Bring it to the castle knight, when his moon phases are complete the main gate will be unlocked");
		var cnt=0;
		while(cnt<cplayer.inventory.length && cplayer.inventory[cnt]!="."){
			cnt++;
		}
		cplayer.inventory[cnt]="s";
		puzzle[4]=true;
		dispinfo();
	}
	}else{
		chest="";
		chest=chest.concat("puzzle complete");
	}
	document.getElementById("chestmessage").innerHTML=chest;
}


//kitchen chest
function showsoup(){
	var v="";
	for(var j=0; j<3; j++){
		for(var i=0; i<3; i++){
			if(soup[i][j]==0){
				v="\u{1F344}";
			}else if(soup[i][j]==1){
				v="\u{1F33E}";
			}else if(soup[i][j]==2){
				v="\u{1F357}";
			}
			document.getElementById("plate" + i + j).textContent=v;
			v="";
		}
	}
}
function dispexpla(){
	if(puzzle[3]==false){
		showplate="";
		chest="";
		chest=chest.concat("Use the arrow keys to put the ingridients in order.<br> Each row should be only one type of food. Its like a 2D Rubik's cube");
		document.getElementById("chestmessage").innerHTML = chest;
	}else{
		chest="";
		chest=chest.concat("puzzle complete");
		document.getElementById("chestmessage").innerHTML = chest;
		
	}
}

function cookmove(dir,rowcol){
	if(dir=="l"){
		soup[rowcol].push(soup[rowcol].shift());
	}
	else if(dir=="r"){
		soup[rowcol].unshift(soup[rowcol].pop());
	}
	else if(dir=="u"){
		var col=[soup[0][rowcol], soup[1][rowcol], soup[2][rowcol]];
		col.push(col.shift());
		for(var i=0; i<3; i++){
			soup[i][rowcol]=col[i];
		}
	}
	else if(dir === "d"){
		var col=[soup[0][rowcol], soup[1][rowcol], soup[2][rowcol]];
		col.unshift(col.pop());
		for(var i=0; i<3; i++){
			soup[i][rowcol] = col[i];
		}
	}
	showsoup();
	//checkwin
	if(puzzle[3]==false){
	var cnt=0;
	var colcnt=0;
	for(var i=0; i<3; i++){
		if(soup[i][0]==soup[i][1] && soup[i][2]==soup[i][1]){
			cnt++;
		}
	}// Check whether every COLUMN contains only one symbol
	for(var j=0; j<3; j++){
   		if(soup[0][j]==soup[1][j] && soup[2][j]==soup[1][j]){
        		colcnt++;
    		}
	}if(cnt==3){
		chest="";
		chest=chest.concat("Congratulations you solved this puzzle!<br> You have received a Waning gibbous moon as a reward.<br> Bring it to the castle knight, when his moon phases are complete the main gate will be unlocked");
		document.getElementById("chestmessage").innerHTML = chest;
		var cnt=0;
		while(cnt<cplayer.inventory.length && cplayer.inventory[cnt]!="."){
			cnt++;
		}
		cplayer.inventory[cnt]="p";
		puzzle[3]=true;
		dispinfo();
	}else if(colcnt==3){
		chest="";
		chest=chest.concat("Please sort by rows not columns");
		document.getElementById("chestmessage").innerHTML = chest;
	}
	}else{
		chest="";
		chest=chest.concat("puzzle complete");
		document.getElementById("chestmessage").innerHTML = chest;
		
	}
}
