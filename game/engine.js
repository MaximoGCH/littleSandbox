//------------ONLINE--------------

function OnlineConexion(){
	
	this.socket = io();
	
	this.clientReceiveData = function(name,func){
		this.socket.on(name,func);
	};

	this.clientSendData = function(name,data){
		this.socket.emit(name,data);
	}
}

// ------------OTROS-------------

//Posición elemento
function elementPosition(el){
    var rect = el.getBoundingClientRect();
    return {y: rect.top, x: rect.left}
}

// ----------CONTROLES------------

function MouseControl(canvas){
	
	this.canvas = canvas;

	this.canvas.control_mouse_x = 1;
	this.canvas.control_mouse_y = 1;
	this.canvas.control_mouse = false;
	this.canvas.control_mouseUp = false;
	this.canvas.control_mouseDown = false;

	this.canvas.addEventListener('mousemove', function(evt) {
        var mousePos = elementPosition(this);
        this.control_mouse_x = evt.clientX-mousePos.x;
		this.control_mouse_y = evt.clientY-mousePos.y;

		this.is_mouse = true;
    }, false);
	this.canvas.addEventListener('mousedown', function (e) {
		this.control_mouse = true;
		this.control_mouseUp = true;
	});
	this.canvas.addEventListener('mouseup', function (e) {
		this.control_mouse = false;
		this.control_mouseDown = true;
	});

	this.get_mouse_x = function(){
		if(this.canvas.view){
			return(this.canvas.control_mouse_x+this.canvas.view.x);
		}else{
			return(this.canvas.control_mouse_x);
		}
	}
	this.get_mouse_y = function(){
		if(this.canvas.view){
			return(this.canvas.control_mouse_y+this.canvas.view.y);
		}else{
			return(this.canvas.control_mouse_y);
		}
	}
	this.is_mouseDown = function(){
		return(this.canvas.control_mouse);
	}

	this.is_mousePresed = function(){
		return(this.canvas.control_mouseUp);
	}
	this.is_mouseRelease = function(){
		return(this.canvas.control_mouseDown);
	}

	this.update = function(){
		this.canvas.control_mouseUp = false;
		this.canvas.control_mouseDown = false;
	}

}

function KeyboardControl(){

	document.keysDown = [];
	document.keysPressed = [];
	document.keysReleased = [];

	document.addEventListener("keydown", function(event) {
	 	this.keysDown[event.keyCode] = true;
	 	this.keysPressed[event.keyCode] = true;
	});
	
	document.addEventListener("keyup", function(event) {
		delete this.keysDown[event.keyCode];
		this.keysReleased[event.keyCode] = true;
	});

	this.is_keyPressed = function(keyNum){
		r = false;
		for(var key in document.keysPressed) {
			var value = Number(key);
			if(value == keyNum) {
				r = true;
				break;
			}
		}
		return(r);
	}

	this.is_keyReleased = function(keyNum){
		r = false;
		for(var key in document.document.keysReleased) {
			var value = Number(key);
			if(value == keyNum) {
				r = true;
				break;
			}
		}
		return(r);
	}

	this.is_keyDown = function(keyNum){
		r = false;
		for(var key in document.keysDown) {
			var value = Number(key);
			if(value == keyNum) {
				r = true;
				break;
			}
		}
		return(r);
	}

	this.is_anykeyPressed = function(){
		r = false;
		for(var key in document.keysDown) {
			r = true;
			break;
		}
		return(r);
	}

	this.update = function(){
		document.keysPressed = [];
		document.keysReleased = [];
	};

}

//teclas
const KEY_A = 65;
const KEY_B = 66;
const KEY_C = 67;
const KEY_D = 68;
const KEY_E = 69;
const KEY_F = 70;
const KEY_G = 71;
const KEY_H = 72;
const KEY_I = 73;
const KEY_J = 74;
const KEY_K = 75;
const KEY_L = 76;
const KEY_M = 77;
const KEY_N = 78;
const KEY_NN = 192;
const KEY_O = 79;
const KEY_P = 80;
const KEY_Q = 81;
const KEY_R = 82;
const KEY_S = 83;
const KEY_T = 84;
const KEY_U = 85;
const KEY_V = 86;
const KEY_W = 87;
const KEY_X = 88;
const KEY_Y = 89;
const KEY_Z = 90;
const KEY_DERECHA = 39;
const KEY_IZQUIERDA = 37;
const KEY_ARRIBA = 38;
const KEY_ABAJO = 40;
const KEY_ESPACIO = 32;
const KEY_ESCAPE = 27;
const KEY_CONTROL = 17;
const KEY_SHIFT = 16;
const KEY_ENTER = 13;
const KEY_BACKSPACE = 8;


//Maths

function point_angle(x1,y1,x2,y2){
	return(Math.atan2(y2 - y1, x2 - x1));
}

function degtorad(degrees){
  return degrees * Math.PI/180;
}

function radtodeg(radians){
  return radians * 180/Math.PI;
}
//-------------DIBUJO-----------------

function View(){
	this.x = 0;
	this.y = 0;

	this.set_pos = function(x,y){
		this.x = x;
		this.y = y;
	}
}

function DrawContext(canvas,view){

	this.canvas = canvas;
	this.view = view || {x : 0, y : 0};
	this.canvas.view = this.view;

	this.g = this.canvas.getContext("2d");
	this.g.imageSmoothingEnabled = false;

	this.global_color = 0;

	this.global_alineacionTexto = "left";
	this.global_tamannoTexto = 16;
	this.global_fontTexto = "arial";

	this.controlNoRotate = true;

	this.set_color = function(c){
		this.global_color = c;
	}

	this.resetCanvas = function(){
		this.g.clearRect(0, 0, canvas.width, canvas.height);
	}

	this.line = function(x1,y1,x2,y2,w){
		this.g.strokeStyle = this.global_color;
		this.g.beginPath();
		this.g.lineWidth = w;
		this.g.lineCap = "butt";
		this.g.moveTo(x1-this.view.x*this.controlNoRotate,y1-this.view.y*this.controlNoRotate);
		this.g.lineTo(x2-this.view.x*this.controlNoRotate,y2-this.view.y*this.controlNoRotate);
		this.g.stroke();
	}
	this.rectangle = function(x1,y1,x2,y2,linea){
		if(linea == true){
			this.g.strokeStyle = this.global_color;
			this.g.beginPath();
			this.g.rect(x1-this.view.x*this.controlNoRotate,y1-this.view.y*this.controlNoRotate,x2-x1,y2-y1);
			this.g.stroke();
		}else{
			this.g.fillStyle = this.global_color;
			this.g.fillRect(x1-this.view.x*this.controlNoRotate,y1-this.view.y*this.controlNoRotate,x2-x1,y2-y1);
		}
	}

	this.resetCanvasRec = function(){
		this.rectangle(0, 0, canvas.width, canvas.height);
	}

	this.circle = function(x,y,r,linea){
		if(linea == true){
			this.g.strokeStyle = this.global_color;
			this.g.beginPath();
			this.g.arc(x-this.view.x*this.controlNoRotate,y-this.view.y*this.controlNoRotate,r,0,2*Math.PI);
			this.g.stroke();
		}else{
			this.g.fillStyle = this.global_color;
			this.g.beginPath();
			this.g.arc(x-this.view.x*this.controlNoRotate,y-this.view.y*this.controlNoRotate,r,0,2*Math.PI);
			this.g.fill();
		}
	}

	this.set_text_align = function(c){
		this.global_alineacionTexto = c;
	}
	
	this.set_text_size = function(c){
		this.global_tamannoTexto = c;
	}
	
	this.set_text_font = function(c){
		this.global_fontTexto = c;
	}

	this.text = function(texto,x,y){
		this.g.textAlign = this.global_alineacionTexto;  
		this.g.font = this.global_tamannoTexto+"px "+this.global_fontTexto;
		this.g.fillStyle = this.global_color;
		this.g.fillText(texto,x-this.view.x*this.controlNoRotate,y-this.view.y*this.controlNoRotate);
	}

	this.rotateTransformation = function(x,y,angl){
		this.g.save();
		this.g.translate(x-this.view.x*this.controlNoRotate,y-this.view.y*this.controlNoRotate);
		this.g.rotate(angl);
		this.controlNoRotate = false;
	}

	this.rotateApply = function(){
		this.g.restore();
		this.controlNoRotate = true;
	}

	this.sprite = function(spritesheet, name, x, y, xscale, yscale){
		var buffer = spritesheet.getTiles(name);
		this.g.drawImage(buffer,x-this.view.x*this.controlNoRotate,y-this.view.y*this.controlNoRotate,buffer.width*xscale,buffer.height*yscale);
	};

	this.spriteCenter = function(spritesheet, name, x, y, xscale, yscale){
		var buffer = spritesheet.getTiles(name);
		this.g.drawImage(buffer,x-(buffer.width*xscale)/2-this.view.x*this.controlNoRotate,y-(buffer.height*yscale)/2-this.view.y*this.controlNoRotate,buffer.width*xscale,buffer.height*yscale);
	};

	this.canvas = function(canvas, x, y, xscale, yscale){
		this.g.drawImage(canvas,x-this.view.x*this.controlNoRotate,y-this.view.y*this.controlNoRotate,canvas.width*xscale,canvas.height*yscale);
	};

	this.canvasCenter = function(canvas, x, y, xscale, yscale){
		this.g.drawImage(canvas,x-(canvas.width*xscale)/2-this.view.x*this.controlNoRotate,y-(canvas.height*yscale)/2-this.view.y*this.controlNoRotate,canvas.width*xscale,canvas.height*yscale);
	};

	this.set_alpha = function(alpha){
		this.g.globalAlpha = alpha;
	};

}

// sprites

function Sprite(dir,onloadFunc){
	
	this.image = new Image();
	this.image.onloadFunc = onloadFunc;
	this.image.onload = function(){
		this.onloadFunc();
	};
	this.image.src = dir;

}

function SpriteSheet(spr){
	
	this.sprite = spr;
	this.tiles = new Map();

	this.define = function(name,x,y,w,h){
		var buffer = document.createElement("canvas");
		buffer.width = w;
		buffer.height = h;
		buffer.getContext("2d")
			.drawImage(this.sprite.image, x, y, w, h, 0, 0, w, h);
		this.tiles.set(name, buffer);
		return(this);
	};

	this.getTiles = function(name){
		return(this.tiles.get(name));
	};

	this.arrayOfNames = function(){
		return(Array.from(this.tiles.keys()));
	};

}

//hilos

function Thread(update,render,speed){
	this.update = update;
	this.render = render || function(){};
	this.speed = speed || 30;
	
	this.step = function(){
		this.update();
		this.render();
	};

	this.interval = setInterval(this.step,this.speed);

	this.stop = function(){
		clearInterval(this.interval);
	};
};

// otros


function Button(x,y,w,h,mouseObj,func,name){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.func = func;
	this.control = false;
	this.mouseObj = mouseObj;
	this.name = name || "";

	this.update = function(){
		if(this.mouseObj.get_mouse_x() > this.x && this.mouseObj.get_mouse_x() < this.x+this.w &&  this.mouseObj.get_mouse_y() > this.y && this.mouseObj.get_mouse_y() < this.y+this.h){
			this.control = false;
			if(this.mouseObj.is_mousePresed()){
				this.func();
				this.control = true;
			}
		}
	};

	this.render = function(draw){
		draw.set_color("gray");
		draw.rectangle(this.x,this.y,this.x+this.w,this.y+this.h,false);
		if(this.mouseObj.get_mouse_x() > this.x && this.mouseObj.get_mouse_x() < this.x+this.w &&  this.mouseObj.get_mouse_y() > this.y && this.mouseObj.get_mouse_y() < this.y+this.h){
			draw.set_color("black");
			draw.rectangle(this.x,this.y,this.x+this.w,this.y+this.h,true);
		}
		draw.set_text_align("center");
		draw.set_color("black");
		draw.text(this.name,this.x+this.w/2,this.y+this.h-10);
	};
}

function ColisionMap(w,h,size){
	this.w = w;
	this.h = h;
	this.size = size;
	
	this.colision = [];
	for(var i = 0; i < this.w; i++){
		this.colision[i] = [];
		for(var j = 0; j < this.h; j++){
			this.colision[i][j] = false;
		}
	}

	this.set_colision = function(x,y,control){
		if(x < this.w*this.size && y < this.h*this.size && x >= 0 && y >= 0){
			this.colision[Math.trunc(x/this.size)][Math.trunc(y/this.size)] = control;
		}
	};
	this.get_colision = function(x,y){
		if(x < this.w*this.size && y < this.h*this.size && x >= 0 && y >= 0){
			return(this.colision[Math.trunc(x/this.size)][Math.trunc(y/this.size)]);
		}else{
			return(false);
		}
	};
	this.draw = function(draw){
		for(var i = 0; i < this.w; i++){
			for(var j = 0; j < this.h; j++){
				draw.rectangle(i*this.size,j*this.size,i*this.size+this.size,j*this.size+this.size,true);
				if(this.get_colision(i*this.size,j*this.size)){
					draw.rectangle(i*this.size,j*this.size,i*this.size+this.size,j*this.size+this.size,false);
				}
			}
		}
	}
}

//startFunction({name}) vas por aqui
function MaximosGamesAccount(canvas,online,type,registerPage,startFunction){

	var style_element = document.createElement("STYLE");
    var style_text = document.createTextNode("");
    style_element.appendChild(style_text);
    document.head.appendChild(style_element);

 	this.back = document.createElement("div");
	this.back.style.left = elementPosition(canvas).x+"px";
	this.back.style.top = elementPosition(canvas).y+"px";
	this.back.style.width = canvas.width+"px";
	this.back.style.height = canvas.height+"px";
	this.back.className = "engine_accountBack";
	document.body.appendChild(this.back);

	this.div = document.createElement("div");
	this.div.style.width = 600+"px";
	this.div.style.left = elementPosition(canvas).x+canvas.width/2-300+"px";
	if(type == 1){
		this.div.style.height = 270+"px";
		this.div.style.top = elementPosition(canvas).y+canvas.height/2-135+"px";
	}
	if(type == 2){
		this.div.style.height = 200+"px";
		this.div.style.top = elementPosition(canvas).y+canvas.height/2-100+"px";
	}
	if(type == 3){
		this.div.style.height = 500+"px";
		this.div.style.top = elementPosition(canvas).y+canvas.height/2-250+"px";
	}
	this.div.className = "engine_account";
    document.body.appendChild(this.div);

	if(type == 1 || type == 3){

		this.titulo1 = document.createElement("div");
		this.titulo1.innerHTML = "Log-in with your Máximo's Games account:"
		this.titulo1.className = "engine_accountTitle";
	  	this.div.appendChild(this.titulo1);

		this.login = document.createElement("table");
		this.login.className = "engine_accountTablaInputs";
	  	this.div.appendChild(this.login);

		this.login_file1 = document.createElement("tr");
	  	this.login.appendChild(this.login_file1);

		this.login_file1_1 = document.createElement("td");
		this.login_file1_1.className = "engine_accountTablaInputs-td";
		this.login_file1_1.innerHTML = "Username:"
	  	this.login_file1.appendChild(this.login_file1_1);

		this.login_file1_2 = document.createElement("td");
		this.login_file1_2.className = "engine_accountTablaInputs-td";
	  	this.login_file1.appendChild(this.login_file1_2);

		this.login_input_username = document.createElement("input");
		this.login_input_username.className = "engine_accountInput";
		this.login_input_username.setAttribute("type", "text");
	  	this.login_file1_2.appendChild(this.login_input_username);

		this.login_file2 = document.createElement("tr");
	  	this.login.appendChild(this.login_file2);

		this.login_file2_1 = document.createElement("td");
		this.login_file2_1.className = "engine_accountTablaInputs-td";
		this.login_file2_1.innerHTML = "Password:"
	  	this.login_file2.appendChild(this.login_file2_1);

		this.login_file2_2 = document.createElement("td");
		this.login_file2_2.className = "engine_accountTablaInputs-td";
	  	this.login_file2.appendChild(this.login_file2_2);

		this.login_input_password = document.createElement("input");
		this.login_input_password.className = "engine_accountInput";
		this.login_input_password.setAttribute("type", "password");
	  	this.login_file2_2.appendChild(this.login_input_password);

		this.login_file3 = document.createElement("tr");
	  	this.login.appendChild(this.login_file3);

		this.login_file3_1 = document.createElement("td");
		this.login_file3_1.className = "engine_accountTablaInputs-td";
	  	this.login_file3.appendChild(this.login_file3_1);

		this.login_file3_2 = document.createElement("td");
		this.login_file3_2.className = "engine_accountTablaInputs-td";
	  	this.login_file3.appendChild(this.login_file3_2);

		this.login_input_login = document.createElement("button");
		this.login_input_login.className = "engine_accountRegister";
		this.login_input_login.innerHTML = "Log-in";
	  	this.login_file3_2.appendChild(this.login_input_login);

		this.registrarse = document.createElement("div");
		this.registrarse.innerHTML = "Don't you have a Maximo's Games account? <a href = '"+registerPage+"' target='_blank''>REGISTER HERE FOR FREE.<a>"
		this.registrarse.className = "engine_accountSubTitle";
	 	this.div.appendChild(this.registrarse);
		
	}

	if(type == 2 || type == 3){

		this.titulo2 = document.createElement("div");
		if(type == 2)
			this.titulo2.innerHTML = "Maximo Games. Play :";
		else 
			this.titulo2.innerHTML = "Or Play as a guest :";
		this.titulo2.className = "engine_accountTitle";
	  	this.div.appendChild(this.titulo2);

		this.guest = document.createElement("table");
		this.guest.className = "engine_accountTablaInputs";
	  	this.div.appendChild(this.guest);

		this.guest_file1 = document.createElement("tr");
	  	this.guest.appendChild(this.guest_file1);

		this.guest_file1_1 = document.createElement("td");
		this.guest_file1_1.className = "engine_accountTablaInputs-td";
		this.guest_file1_1.innerHTML = "Username:"
	  	this.guest_file1.appendChild(this.guest_file1_1);

		this.guest_file1_2 = document.createElement("td");
		this.guest_file1_2.className = "engine_accountTablaInputs-td";
	  	this.guest_file1.appendChild(this.guest_file1_2);

		this.guest_input_username = document.createElement("input");
		this.guest_input_username.className = "engine_accountInput";
		this.guest_input_username.setAttribute("type", "text");
	  	this.guest_file1_2.appendChild(this.guest_input_username);

		this.guest_file2 = document.createElement("tr");
	  	this.guest.appendChild(this.guest_file2);

		this.guest_file2_1 = document.createElement("td");
		this.guest_file2_1.className = "engine_accountTablaInputs-td";
	  	this.guest_file2.appendChild(this.guest_file2_1);

		this.guest_file2_2 = document.createElement("td");
		this.guest_file2_2.className = "engine_accountTablaInputs-td";
	  	this.guest_file2.appendChild(this.guest_file2_2);

		this.guest_input_guest = document.createElement("button");
		this.guest_input_guest.className = "engine_accountRegister";
		this.guest_input_guest.innerHTML = "Play";
	  	this.guest_file2_2.appendChild(this.guest_input_guest);

		if(type == 3){
			this.advertencia = document.createElement("div");
			this.advertencia.innerHTML = "Playing as a guest do not allow you to save any progress in game."
			this.advertencia.className = "engine_accountSubTitle";
		 	this.div.appendChild(this.advertencia);
	 	}

	 	this.login_input_login.parent = this;
	 	this.login_input_login.onclick = function(){
	 		online.clientSendData("ENGINE_ACCOUNT(login_info)",{username: this.parent.login_input_username.value, password: this.parent.login_input_password.value});
	 	};

 	}

 	var div = this.div;
	online.clientReceiveData("ENGINE_ACCOUNT(login_validation)",function(data){
		if(data){
			document.body.removeChild(div);
		}
	});
	var back = this.back;
	online.clientReceiveData("ENGINE_ACCOUNT(start)",function(data){
		if(data){
			document.body.removeChild(back);
		}
	});
}


