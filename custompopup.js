function hideshow(show,x){
        if(show==false){
                document.getElementById(x).style.display="none";
        }else{
                document.getElementById(x).style.display="inline-block";
        }
}

function custompopup(myobject){
	hideshow(true,"overlay");
	hideshow(true,"mypopup");
	hideshow(true,"exit");
	hideshow(true,myobject);
}

function removepopup(){
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
}
