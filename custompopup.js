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
}

//library chest
function updigit(nb){
	chest="";
	var code="";
	if(nb==1){
		c1++; 
		if(c1>=10){
			c1=0;
		}	
	}else if(nb==2){
		c2++; 
		if(c2>=10){
			c2=0;
		}	
	}if(nb==3){
		c3++; 
		if(c3>=10){
			c3=0;
		}	
	}
	code=code.concat(c1+" "+c2+" "+c3);
	if(c1==code1 && c2==code2 && c3==code3){
		chest=chest.concat("Congratulations you solved this puzzle!<br> You have received a knight helmet as a reward.<br> Bring it to the castle knight, when his armor is complete the main gate will be unlocked");
		document.getElementById("chestmessage").innerHTML = chest;
	}
	document.getElementById("codeenter").innerHTML = code;
}
function downdigit(nb){
	chest="";
	var code="";
	if(nb==1){
		c1--; 
		if(c1<=-1){
			c1=9;
		}	
	}else if(nb==2){
		c2--; 
		if(c2<=-1){
			c2=9;
		}	
	}if(nb==3){
		c3--; 
		if(c3<=-1){
			c3=9;
		}	
	}
	code=code.concat(c1+" "+c2+" "+c3);
	if(c1==code1 && c2==code2 && c3==code3){
		chest=chest.concat("Congratulations you solved this puzzle!<br> You have received a knight helmet as a reward.<br> Bring it to the castle knight, when his armor is complete the main gate will be unlocked");
		document.getElementById("chestmessage").innerHTML = chest;
	}
	document.getElementById("codeenter").innerHTML = code;
}

//potion chest
function changecolor(nb){
	var colors=["red", "blue", "green"];
	var colorbox="box"+nb;
	var pcolors=[pcolor1, pcolor2, pcolor3];
	pcolors[nb - 1] = (pcolors[nb - 1] + 1) % 3;
	document.getElementById(colorbox).style.backgroundColor = colors[pcolors[nb - 1]];pcolor1 = pcolors[0];
	pcolor1 = pcolors[0];
	pcolor2 = pcolors[1];
	pcolor3 = pcolors[2];
	givepotion();
}

function givepotion(){
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
	if(potioncolor1==pcolor1 && potioncolor2==pcolor2 && potioncolor3==pcolor3 && gotpotion){
		chest=chest.concat("Congratulation you have solved this puzzle!<br>As a reward you get 2 batteries");	
	}else if(gotpotion){
		chest=chest.concat("great now just select the correct colors to activate the potion");
	}
	document.getElementById("chestmessage").innerHTML=chest;
}


//mirror room
function movemirrorup(nb){
	chest="";
	var m=window["mirror" + nb];
	if(board[m.xpos][m.ypos-1]=="." || board[m.xpos][m.ypos-1]=="-"){
	board[m.xpos][m.ypos]=".";
	m.ypos--;
	showboard();
	}else{
		chest=chest.concat("The mirror has hit something");
		document.getElementById("chestmessage").innerHTML=chest;
	}
}
function movemirrorleft(nb){
	chest="";
	var m=window["mirror" + nb];
	if(board[m.xpos-1][m.ypos]=="." || board[m.xpos-1][m.ypos]=="-"){
	board[m.xpos][m.ypos]=".";
	m.xpos--;
	showboard();
	}else{
		chest=chest.concat("The mirror has hit something");
		document.getElementById("chestmessage").innerHTML=chest;
	}
}
function movemirrorright(nb){
	chest="";
	var m=window["mirror" + nb];
	if(board[m.xpos+1][m.ypos]=="." || board[m.xpos+1][m.ypos]=="-"){
	board[m.xpos][m.ypos]=".";
	m.xpos++;
	showboard();
	}else{
		chest=chest.concat("The mirror has hit something");
		document.getElementById("chestmessage").innerHTML=chest;
	}
}
function movemirrordown(nb){
	chest="";
	var m=window["mirror" + nb];
	if(board[m.xpos][m.ypos+1]=="." || board[m.xpos][m.ypos+1]=="-"){
	board[m.xpos][m.ypos]=".";
	m.ypos++;
	showboard();
	}else{
		chest=chest.concat("The mirror has hit something");
		document.getElementById("chestmessage").innerHTML=chest;
	}
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
	showplate="";
	chest="";
	chest=chest.concat("Use the arrow keys to put the ingridients in order.<br> Each row should be only one type of food.");
	document.getElementById("chestmessage").innerHTML = chest;
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
	var cnt=0;
	for(var i=0; i<3; i++){
		if(soup[i][0]==soup[i][1] && soup[i][2]==soup[i][2]){
			cnt++;
		}
	}if(cnt==3){
		chest="";
		chest=chest.concat("Congratulations you solved this puzzle!<br> You have received knight armor pants as a reward.<br> Bring it to the castle knight, when his armor is complete the main gate will be unlocked");
		document.getElementById("chestmessage").innerHTML = chest;
	}
}
