
//clases basicas

class BloqueVacio {

	constructor(){
		this.densidad = 1;
		this.updateControl = true;
		this.destroyC = false;
	}

	update(mundo,i,j){
		//
	}
	render(draw, i, j, s){
		draw.set_color("black");
		draw.rectangle(i*s, j*s, i*s+s, j*s+s, false);
	}

	setUpdate(b){
		this.updateControl = b;
	}

	getUpdate(){
		return(this.updateControl);
	}

	getDensidad(){
		return(this.densidad);
	}

	cambio(mundo, i1, j1, i2, j2){
		if(mapa[i1][j1].getUpdate()){
			let a = mundo[i1][j1];
			let b = mundo[i2][j2];
			mundo[i1][j1] = b;
			mundo[i2][j2] = a;
			a.setUpdate(false);
			b.setUpdate(false);
		}
	}

	destroy(){
		this.destroyC = true;
	}

	getDestroy(){
		return(this.destroyC);
	}

}

class BloqueSolido extends BloqueVacio{

	constructor(){
		super();
		this.densidad = 100;
	}

	render(draw, i, j, s){
		draw.set_color("gray");
		draw.rectangle(i*s, j*s, i*s+s, j*s+s, false);
	}

}

class BloqueGravedad extends BloqueVacio{
	constructor(densidad){
		super();
		this.densidad = densidad;
	}

	update(mundo,i,j){
		if(mundo[i][j+1].getDensidad() < this.getDensidad()){
			this.cambio(mundo, i, j, i, j+1);
		}else
		if(mundo[i+1][j+1].getDensidad() < this.getDensidad()){
			this.cambio(mundo, i, j, i+1, j+1);
		}else
		if(mundo[i-1][j+1].getDensidad() < this.getDensidad()){
			this.cambio(mundo, i, j, i-1, j+1);
		}
	}
}

class BloqueTierra extends BloqueGravedad{
	constructor(){
		super(50);
	}
	render(draw, i, j, s){
		draw.set_color("orange");
		draw.rectangle(i*s, j*s, i*s+s, j*s+s, false);
	}
}

class BloqueLiquido extends BloqueVacio{

	constructor(densidad){
		super();
		this.densidad = densidad;
		if(Math.random() > 0.5)
			this.dir = 1;
		else
			this.dir = -1;
	}

	update(mundo,i,j){

		if(mundo[i][j+1].getDensidad() < this.getDensidad()){
			this.cambio(mundo, i, j, i, j+1);
		}else
		if(mundo[i+1][j+1].getDensidad() < this.getDensidad()){
			this.cambio(mundo, i, j, i+1, j+1);
		}else
		if(mundo[i-1][j+1].getDensidad() < this.getDensidad()){
			this.cambio(mundo, i, j, i-1, j+1);
		}else
		if(mundo[i+this.dir][j].getDensidad() < this.getDensidad()){
			this.cambio(mundo, i, j, i+this.dir, j);
		}else{
			this.dir *= -1;
		}

	}

}

class BloqueAgua extends BloqueLiquido{

	constructor(){
		super(10);
	}

	render(draw, i, j, s){
		draw.set_color("blue");
		draw.rectangle(i*s, j*s, i*s+s, j*s+s, false);
	}
}

class BloquePiedra extends BloqueGravedad{

	constructor(){
		super(50);
	}

	render(draw, i, j, s){
		draw.set_color("gray");
		draw.rectangle(i*s, j*s, i*s+s, j*s+s, false);
	}

}

class BloqueFuego extends BloqueVacio{

	constructor(){
		super();
		this.densidad = 10;
		if(Math.random() > 0.5)
			this.dir = 1;
		else
			this.dir = -1;
	}

	update(mundo,i,j){

		if(Math.random() > 0.9){
			mundo[i][j] = new BloqueVacio();
		}
		if(mundo[i][j+1] instanceof BloqueAgua || mundo[i+1][j] instanceof BloqueAgua || mundo[i-1][j] instanceof BloqueAgua || mundo[i][j-1] instanceof BloqueAgua){
			mundo[i][j] = new BloqueVacio();
		}

		if(mundo[i][j-1].getDensidad() < this.getDensidad()){
			this.cambio(mundo, i, j, i, j-1);
		}else
		if(mundo[i+1][j-1].getDensidad() < this.getDensidad()){
			this.cambio(mundo, i, j, i+1, j-1);
		}else
		if(mundo[i-1][j-1].getDensidad() < this.getDensidad()){
			this.cambio(mundo, i, j, i-1, j-1);
		}else
		if(mundo[i+this.dir][j].getDensidad() < this.getDensidad()){
			this.cambio(mundo, i, j, i+this.dir, j);
		}else{
			this.dir *= -1;
		}

	}

	render(draw, i, j, s){
		if(Math.random() > 0.5)
			draw.set_color("red");
		else
			draw.set_color("yellow");
		draw.rectangle(i*s, j*s, i*s+s, j*s+s, false);
	}

}

class BloqueMadera extends BloqueVacio{

	constructor(){
		super();
		this.densidad = 99;
		this.quemandose = false;
	}

	update(mundo,i,j){
		if(mundo[i][j+1] instanceof BloqueFuego || mundo[i+1][j] instanceof BloqueFuego || mundo[i-1][j] instanceof BloqueFuego){
			if(Math.random() > 0.98){
				mundo[i][j] = new BloqueFuego();
			}
		}
		if(mundo[i][j-1] instanceof BloqueFuego){
			this.quemandose = true;
		}
		if(this.quemandose == true){
			if(mundo[i][j+1] instanceof BloqueAgua || mundo[i+1][j] instanceof BloqueAgua || mundo[i-1][j] instanceof BloqueAgua || mundo[i][j-1] instanceof BloqueAgua){
				this.quemandose = false;
			}else{
				mundo[i][j-1] = new BloqueFuego();
				if(Math.random() > 0.98){
					mundo[i][j] = new BloqueFuego();
				}
			}
		}
	}

	render(draw, i, j, s){
		draw.set_color("brown");
		draw.rectangle(i*s, j*s, i*s+s, j*s+s, false);
	}

}

class BloqueHoja extends BloqueVacio{

	constructor(){
		super();
		this.densidad = 99;
		this.quemandose = false;
	}

	update(mundo,i,j){
		if(mundo[i][j+1] instanceof BloqueFuego || mundo[i+1][j] instanceof BloqueFuego || mundo[i-1][j] instanceof BloqueFuego){
			if(Math.random() > 0.5){
				mundo[i][j] = new BloqueFuego();
			}
		}
		if(mundo[i][j-1] instanceof BloqueFuego){
			this.quemandose = true;
		}
		if(this.quemandose == true){
			if(mundo[i][j+1] instanceof BloqueAgua || mundo[i+1][j] instanceof BloqueAgua || mundo[i-1][j] instanceof BloqueAgua || mundo[i][j-1] instanceof BloqueAgua){
				this.quemandose = false;
			}else{
				mundo[i][j-1] = new BloqueFuego();
				if(Math.random() > 0.5){
					mundo[i][j] = new BloqueFuego();
				}
			}
		}
	}

	render(draw, i, j, s){
		draw.set_color("green");
		draw.rectangle(i*s, j*s, i*s+s, j*s+s, false);
	}

}

class BloqueArbolTallo extends BloqueVacio{

	constructor(n,r){
		super();
		this.n = n;
		this.r = r;
	}

	update(mundo,i,j){
		if(this.n > 3 && Math.random() > 0.7 && this.r == true){
			let dir;
			if(Math.random() > 0.5)
				dir = 1;
			else
				dir = -1;
			mundo[i+dir][j] = new BloqueArbolRama(0,dir);
		}
		if(this.n < 10 || Math.random() > 0.2){
			mundo[i][j-1] = new BloqueArbolTallo(this.n+1, !this.r);
		}
		mundo[i][j] = new BloqueMadera();
	}

	render(draw, i, j, s){
		draw.set_color("green");
		draw.rectangle(i*s, j*s, i*s+s, j*s+s, false);
	}
}

class BloqueArbolRama extends BloqueVacio{

	constructor(n,dir){
		super();
		this.n = n;
		this.dir = dir;
	}

	update(mundo,i,j){
		if(this.n < 3 && Math.random() > 0.3){
			mundo[i+this.dir][j] = new BloqueArbolRama(this.n+1, this.dir);
		}
		mundo[i][j] = new BloqueMadera();
		mundo[i][j+1] = new BloqueHoja();
		mundo[i][j-1] = new BloqueHoja();
	}
	render(draw, i, j, s){
		draw.set_color("brown");
		draw.rectangle(i*s, j*s, i*s+s, j*s+s, false);
	}
}

class BloqueSemilla extends BloqueGravedad{

	constructor(){
		super(5);
	}

	update(mundo,i,j){
		super.update(mundo,i,j);
		if(mundo[i][j+1] instanceof BloqueTierra){
			mundo[i][j] = new BloqueArbolTallo(0,false);
		}
	}

	render(draw, i, j, s){
		draw.set_color("green");
		draw.rectangle(i*s, j*s, i*s+s, j*s+s, false);
	}

}

class BloqueAcido extends BloqueLiquido{

	constructor(){
		super(9);
	}

	update(mundo, i, j){
		super.update(mundo, i, j);
		if(mundo[i][j+1] instanceof BloqueMadera || mundo[i][j+1] instanceof BloqueHoja)
			mundo[i][j+1] = new BloqueVacio();
	}

	render(draw, i, j, s){
		draw.set_color("green");
		draw.rectangle(i*s, j*s, i*s+s, j*s+s, false);
	}
}

class BloqueMeteorito extends BloqueGravedad{
	constructor(){
		super(50);
	}
	update(mundo, i, j){
		if(!(mundo[i][j+1].getDensidad() < 40 || mundo[i][j+1] instanceof BloqueMeteorito || mundo[i][j+1] instanceof BloqueFuego)){
			console.log("hola");
			for(let x = -5; x < 5; x++){
			for(let y = -5; y < 5; y++){
				if(!(mundo[i+x][j+y] instanceof BloqueSolido)){
					if(Math.random() > (Math.max(Math.abs(x), Math.abs(y))+0.01)/6)
						mundo[i+x][j+y] = new BloqueVacio();
					if(Math.random() > 0.6)
						mundo[i+x][j+y] = new BloqueFuego();
				}
			}}
		}else{
			super.update(mundo, i, j);
			if(mundo[i][j-1].getDensidad() < 10)
				mundo[i][j-1] = new BloqueFuego();
		}
	}
	render(draw, i, j, s){
		draw.set_color("red");
		draw.rectangle(i*s-s, j*s-s, i*s+s*2, j*s+s*2, false);
	}
}

// main
let thread = new Thread(update,render,1);

let canvas, draw;
let mapa;
let mouse, keyboard, mouseControl = 0, mouseSize = 1;

canvas = document.getElementById("canvas");
mouse = new MouseControl(canvas);
keyboard = new KeyboardControl();
draw = new DrawContext(canvas);
mapa = [];

for(let i = 0; i < 200; i++){
	mapa[i] = [];
	for(let j = 0; j < 150; j++){
		if(i == 0 || i == 199 || j == 0 || j == 149){
			mapa[i][j] = new BloqueSolido();
		}else{
			mapa[i][j] = new BloqueVacio();
		}
	}
}

let btnsType = document.getElementsByClassName("type");
for(let btn of btnsType){
	btn.onclick = function(){
		mouseControl = this.value;
	};
}

let sizeElement = document.getElementById("sizeNumber");

document.getElementById("btnMas").onclick = function(){
	mouseSize ++;
	sizeElement.innerHTML = mouseSize;
};

document.getElementById("btnMenos").onclick = function(){
	mouseSize --;
	if(mouseSize < 1){mouseSize = 1;}
	sizeElement.innerHTML = mouseSize;
};

function update(){
	if(keyboard.is_keyPressed(KEY_DERECHA)){
		mouseControl++;
	}
	if(keyboard.is_keyPressed(KEY_IZQUIERDA)){
		mouseControl--;
	}
	if(keyboard.is_keyPressed(KEY_ARRIBA)){
		mouseSize++;
		sizeElement.innerHTML = mouseSize;
	}
	if(keyboard.is_keyPressed(KEY_ABAJO)){
		mouseSize--;
		if(mouseSize < 1){mouseSize = 1;}
		sizeElement.innerHTML = mouseSize;
	}

	for(let speed = 0; speed < 2; speed ++){
		if(mouse.is_mouseDown()){
			for(let i = Math.round(mouse.get_mouse_x()/5-mouseSize/2); i < Math.round(mouse.get_mouse_x()/5+mouseSize/2); i++){
				for(let j = Math.round(mouse.get_mouse_y()/5-mouseSize/2); j < Math.round(mouse.get_mouse_y()/5+mouseSize/2); j++){
					if(i > 0 && i < mapa.length-1 && j > 0 && j < mapa[0].length-1){
						if(mouseControl == 0)
							mapa[i][j] = new BloqueVacio();
						if(mouseControl == 1)
							mapa[i][j] = new BloqueTierra();
						if(mouseControl == 2)
							mapa[i][j] = new BloqueAgua();
						if(mouseControl == 3)
							mapa[i][j] = new BloquePiedra();
						if(mouseControl == 4)
							mapa[i][j] = new BloqueMadera();
						if(mouseControl == 5)
							mapa[i][j] = new BloqueFuego();
						if(mouseControl == 6)
							mapa[i][j] = new BloqueSemilla();
						if(mouseControl == 7)
							mapa[i][j] = new BloqueAcido();
						if(mouseControl == 8)
							mapa[i][j] = new BloqueMeteorito();
					}
				}
			}
			
		}

		for(let i = 0; i < 200; i++){
			for(let j = 0; j < 150; j++){
				mapa[i][j].setUpdate(true);
			}
		}
		for(let i = 0; i < 200; i++){
			for(let j = 0; j < 150; j++){
				if(mapa[i][j].getDestroy()){
					mapa[i][j] = new BloqueVacio();
				}
				mapa[i][j].update(mapa, i, j);
			}
		}
	}

	mouse.update();
	keyboard.update();
}

function render(){

	draw.set_color("white");
	draw.resetCanvasRec();

	for(let i = 0; i < 200; i++){
		for(let j = 0; j < 150; j++){
			mapa[i][j].render(draw, i, j, 5);
		}
	}

}

