var activeObjectArbolNavidad;
	class ArbolNavidad{
	constructor(){
		this.svg=document.createElement("SVG");
		this.lucesAmarillas=[];
		this.encendio=false;
		this.identificador;
		this.colorLuz="yellow";
		this.circuito=1;
		this.luz_con_efecto=-1;
		activeObjectArbolNavidad=this;
	}
	muestra(id){
		this.identificador=id;
		this.svg.setAttribute("width","650");
		this.svg.setAttribute("height","500");
		//arbol
		var arbol= this.creaArbol();
		this.svg.appendChild(arbol);
		//luces 
		var luces = this.lucesAmarillas;
		for(var j =0; j<luces.length; j++){
			var nl = this.creaLuz(luces[j]);
			if(j==this.luz_con_efecto)
				nl.appendChild(this.creaEfecto());
			activeObjectArbolNavidad=this;
			var agrega_efecto = "activeObjectArbolNavidad.agregaEfectoALuz("+j+")";
			nl.setAttribute("onclick", agrega_efecto);
			this.svg.appendChild(nl);
		}
		//para agregar luces con un click
		activeObjectArbolNavidad=this;
		var agrega_luz_AO = "activeObjectArbolNavidad.agregaLuz()";
		arbol.setAttribute("onclick", agrega_luz_AO);
		//se agrega el switch para prender y apagar luces
		activeObjectArbolNavidad=this;
		var switch1=this.creaSwitch1();
		this.svg.appendChild(switch1);
		var cambiar_switch_1 = "activeObjectArbolNavidad.cambiaColorSwitch1()";
		switch1.setAttribute("onclick", cambiar_switch_1);
		//se agrega switch que cambia luces de color
		activeObjectArbolNavidad=this;
		var switch2=this.creaSwitch2();
		this.svg.appendChild(switch2);
		var cambiar_switch_2 = "activeObjectArbolNavidad.cambiaColorSwitch2()";
		switch2.setAttribute("onclick", cambiar_switch_2);
		//se agrega el svg al div
		document.getElementById(this.identificador).innerHTML=this.svg.outerHTML;
	}
	creaLuz(luz){
		var l = document.createElement("circle");
		l.setAttribute("cx",luz.x);
		l.setAttribute("cy",luz.y);
		l.setAttribute("r","4");
		l.setAttribute("fill",luz.color);
		l.setAttribute("stroke","grey");
		if(this.encendido){
			if(luz.circuito==1)
				var f = this.creaflash("1s",luz.color);
			if(luz.circuito==2)
				var f = this.creaflash("0.6s",luz.color);
			if(luz.circuito==3)
				var f = this.creaflash("0.4s",luz.color);	
		l.appendChild(f);
		}
		return l;
	}
	creaArbol(){
		var p = document.createElement("polygon");
		p.setAttribute("points", "250,60 100,400 120,400 80,500 100,500 60,600 440,600 400,500 420,500 380,400 400,400");
		p.setAttribute("fill", "#409040");
		return p;
	}
	creaSwitch1(){
		var swi = document.createElement("rect");
		swi.setAttribute("width","40");
		swi.setAttribute("height","40");
		swi.setAttribute("x","210");
		swi.setAttribute("y","460");
		if (this.encendido){
			swi.setAttribute("fill","yellow");
		}else{swi.setAttribute("fill","grey");
		}
		return swi;
	}
	creaSwitch2(){
		var swi = document.createElement("rect");
		swi.setAttribute("width","40");
		swi.setAttribute("height","40");
		swi.setAttribute("x","250");
		swi.setAttribute("y","460");
		swi.setAttribute("fill",this.colorLuz);
		return swi;
	}
	creaflash(tiempo,color){
		var flash =document.createElement("animate");
		flash.setAttribute( "attributeType","XML");
		flash.setAttribute("attributeName","fill");
		flash.setAttribute( "values",color+";grey");
		flash.setAttribute( "dur",tiempo);
		flash.setAttribute("repeatCount","indefinite");
		return flash;
	}
	creaEfecto(){
		var c =document.createElement("animate");
		c.setAttribute( "attributeType","XML");
		c.setAttribute("attributeName","r");
		c.setAttribute( "values","4;9;4");
		c.setAttribute( "dur","4s");
		c.setAttribute("repeatCount","1");
		return c;
	}
	cambiaColorSwitch1(){
		if (this.encendido){
			this.encendido=false;
			this.luz_con_efecto=-1;
		}else{
			this.encendido=true;}
		document.getElementById(this.identificador).innerHTML="";
		this.muestra(this.identificador);
	}
	cambiaColorSwitch2(){
		if (this.colorLuz=="yellow"){
			this.colorLuz="red";
		}else{
			if(this.colorLuz=="red")
			this.colorLuz="blue";
			else
			this.colorLuz="yellow";}
		document.getElementById(this.identificador).innerHTML="";
		this.muestra(this.identificador);
	}
	agregaLuz(){
		this.lucesAmarillas.push({x:event.clientX,y:event.clientY,color:this.colorLuz,circuito:this.circuito});
		if(this.circuito==3){
			this.circuito=1;
		}else{
			this.circuito++}
		console.log(this.lucesAmarillas);
		document.getElementById(this.identificador).innerHTML="";
		this.muestra(this.identificador);
	}
	agregaEfectoALuz(j){
		if(this.encendido && j!=this.luz_con_efecto){
			this.luz_con_efecto=j;
			document.getElementById(this.identificador).innerHTML="";
			this.muestra(this.identificador);
		}else{
			this.luz_con_efecto=-1;}
	}
}