var objActivoAmbienteConway;
class  AmbienteConway{
	constructor(alto, ancho){
		objActivoAmbienteConway=this;
		this.alto=alto;
		this.ancho=ancho;
		this.celula=[];
		this.creaCelulas();
		this.identificador="";
	}
	creaCelulas(){
		var i,j;
		for(i=0;i<this.alto;i++){
			this.celula[i]=[];
			for(j=0;j<this.ancho;j++){
				this.celula[i][j]=false;
			}
		}
	}
	activa(i,j){
		if(this.posicionOK(i,j)){
			this.celula[i][j]=true;
		}
	}
	estaViva(i,j){
		if(this.posicionOK(i,j))
			return this.celula[i][j];
		else
			return false;
	}
	posicionOK(i,j){
		return(i>=0 && i<this.alto && j>=0 && j<this.ancho);
	}

	inyectaAmbiente(idDiv){
		this.identificador=idDiv;
		var tabla, fila, celd, i,j;
		tabla = document.createElement("TABLE");
		tabla.setAttribute("class", "ambiente");
		for (i=0; i<this.alto; i++){
			fila = document.createElement("TR");
			for (j=0; j<this.ancho; j++){
				celd = document.createElement("TD");
				if(this.estaViva(i,j)){
					celd.setAttribute("class","celula viva");
				}
				else{
					celd.setAttribute("class", "celula muerta");
				}
				objActivoAmbienteConway=this;
				var st="objActivoAmbienteConway.cambiaEstado("+i+","+j+")";
				celd.setAttribute("onclick",st);
				fila.appendChild(celd);
			}
			tabla.appendChild(fila);
		}
		document.getElementById(this.identificador).appendChild(tabla);
	}
	cambiaEstado(fila,columna){	
		if(this.estaViva(fila,columna)){
			this.celula[fila][columna]=false;
		}else{
			this.celula[fila][columna]=true;
		}
		document.getElementById(this.identificador).innerHTML="";
		this.inyectaAmbiente(this.identificador);
	}
	proximoTurno(){
		var celu = [];
		for (var i=0; i<this.alto; i++){
			celu[i]=[];
			for (var j=0; j<this.ancho;j++){
				var v = this.vecinasVivas(i,j);
				if(this.estaMuerta(i,j) && v==3)
					celu[i][j] = true;
				else if(this.estaViva(i,j) && (v==2 || v==3))
					celu[i][j] = true;
				else 
					celu[i][j] = false;
			}
		}
		this.celula=celu;
	}
	estaMuerta(){
		return !this.estaViva();
	}

	vecinasVivas(i,j){
		var total=0;
		if(this.estaViva(i-1,j-1)) total++;
		if(this.estaViva(i,j-1)) total++;
		if(this.estaViva(i+1,j-1)) total++;
		if(this.estaViva(i-1,j)) total++;
		if(this.estaViva(i+1,j)) total++;
		if(this.estaViva(i-1,j+1)) total++;
		if(this.estaViva(i,j+1)) total++;
		if(this.estaViva(i+1,j+1)) total++;
		return total;
	}

	agregaPatron(fila, columna, nombrePatron){
		var y=fila;
		var x = columna;
		if (nombrePatron=="pentaDecatlon"){
			console.log("lllega");
			for(var i=x; i<(x+8);i++){
				for(var j=y; j<(y+3);j++){
					console.log("activando "+i+","+j);
					this.activa(i,j);
				}
			this.celula[x+1][y+1]=false;
			this.celula[x+6][y+1]=false;
			}
		}
		if (nombrePatron=="figureEight"){
			for (var j=y; j<(y+6);j++){
				for(var i=x; i<(x+6);i++){
					if(i<(x+3) && j<(y+3)){
						this.activa(i,j);
					}else if(i>=(x+3) && j>=(y+3)){
						this.activa(i,j);
					}
				}
			}
		}

		if(nombrePatron=="octagon"){
			for (var j=(y+1); j<(y+6);j=j+3){
				for (var i=x;i<(x+6);i++){
					this.activa(i,j);
				}
			}
			for (var j=(y+1); j<(y+6);j=j+3){
				for (var i=x;i<(x+6);i++){
					if(this.estaViva(j,i)){
						this.celula[j][i]=false;
					}else{
						this.activa(j,);
					}
				}
			}

		}

	}
}