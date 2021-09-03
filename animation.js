let fps = 30; fps = 1000 / fps;
let timer = setInterval(tick, fps); clearInterval(timer);
let anim;
let selectedLayer;
let frameCount = 0;
let DEFAULT_ANIMATION_ZINDEX = 1000;
let running = false;
let Effects = [];

class Animation
{
	constructor(width, height ,fps)
	{
		anim = this;
		if (width == "")	{width	= 200;}
		if (height == "")	{height	= 200;}
		if (fps == "")		{fps	= 30;}
		
		this.elapsedTime = 0;
		this.layerList = [];
		
		this.fps = parseInt(fps);
		this.width = parseInt(width);
		this.height = parseInt(height);
		
		this.createNewLayer(true) //Create main layer
	}
	
	createNewLayer(persist, z)
	{
		let nLayer = new Layer(persist, this, this.width, this.height, z);
		this.layerList.push(nLayer);
		layerList_Update();
		return nLayer;
	}
}

class Layer
{
	static layerCount = 0;
	
	constructor(persist, animation, w, h, z)
	{

		this.name = "Layer_" + Layer.layerCount; Layer.layerCount++;

		this.inAnimation = animation;
		this.elapsedTime = 0;
		this.events = [];
		
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.canvas.classList.add("layer");
		this.canvas.style.border = "1px solid black";
		
		this.canvas.width = w;
		this.canvas.height = h;
		this.tMatrix = [0, 0]; //Camera. Width, Height
	
		this.setZIndex(z);
		this.persistent = persist;
		document.getElementById("main").appendChild(this.canvas);
	}
	
	addEvent(fx, start, end, args)
	{
		let eff = new fx(this, start, end, args); //Passing object type by argument
		this.events.push(eff);
		
		console.log("Added event to layer: " + this.name);
	}
	
	setZIndex(i)
	{
		this.canvas.style.zIndex = DEFAULT_ANIMATION_ZINDEX + i
	}
}

class Effect
{
	constructor(Layer, startFrame, nbrOfFrames)
	{
		this.object = 
		this.L = Layer;
		this.startFrame = startFrame;
		this.endFrame = startFrame + nbrOfFrames;
		
		Effects.push(this);
		return this;
	}
}

class FadeIn extends Effect
{
	constructor(Layer, startFrame, nbrOfFrames)
	{
		super(Layer, startFrame, nbrOfFrames);
		
		//DATA
		this.globalAlpha = 1.0
	}
	
	main()
	{
		let L  = this.L;
		let ctx = L.ctx;
		
		//START
		ctx.fillStyle = "#000000";
		ctx.clearRect(0, 0, 800, 800);
		ctx.globalAlpha = this.globalAlpha;
		ctx.fillRect(0, 0, 800, 800);
		this.globalAlpha = this.globalAlpha - 0.05;
		if (this.globalAlpha < 0){this.globalAlpha = 0;}
	}
}

class FadeOut extends Effect
{
	constructor(Layer, startFrame, nbrOfFrames)
	{
		super(Layer, startFrame, nbrOfFrames);
		
		//DATA
		this.globalAlpha = 0
	}
	
	main()
	{
		let L  = this.L;
		let ctx = L.ctx;
		
		//START
		ctx.fillStyle = "#000000";
		ctx.clearRect(0, 0, 800, 800);
		ctx.globalAlpha = this.globalAlpha;
		ctx.fillRect(0, 0, 800, 800);
		this.globalAlpha = this.globalAlpha + 0.05;
		if (this.globalAlpha > 1){this.globalAlpha = 1;}
	}
}

class AniPixels extends Effect
{
	constructor(Layer, startFrame, nbrOfFrames)
	{
		super(Layer, startFrame, nbrOfFrames);
		
		//DATA
		this.x = 0;
	}
	
	main()
	{
		let L  = this.L;
		let ctx = L.ctx;
		
		//START
		ctx.scale(2, 2);
		ctx.fillStyle = "#000000";
		ctx.fillRect(-60 + this.x, 0, 60, 60);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.x++;
	}
}

class CameraMove extends Effect
{
	constructor(Layer, startFrame, nbrOfFrames, args)
	{
		super(Layer, startFrame, nbrOfFrames);
		console.log(args[1]);
		//DATA
		this.dir = args[1];
		this.moveTime = nbrOfFrames;
		this.moveAmount = args[0];
		this.pxPerFrame = this.moveAmount / this.moveTime;
	}
	
	main()
	{
		let L  = this.L;
		let ctx = L.ctx;
		
		//START
		switch(this.dir)
		{
			case 0:
				ctx.translate(this.pxPerFrame, 0); L.tMatrix[0] = L.tMatrix[0] + this.pxPerFrame; break;
			case 1:
				ctx.translate(-this.pxPerFrame, 0); L.tMatrix[0] = L.tMatrix[0] - this.pxPerFrame; break;
			case 2:
				ctx.translate(0, this.pxPerFrame); L.tMatrix[1] = L.tMatrix[1] + this.pxPerFrame; break;
			case 3:
				ctx.translate(0, -this.pxPerFrame); L.tMatrix[1] = L.tMatrix[1] - this.pxPerFrame; break;
		}
		
	}
}

class CameraShake extends Effect
{
	constructor(Layer, startFrame, nbrOfFrames, mag = 1)
	{
		super(Layer, startFrame, nbrOfFrames);
		//DATA
		this.endFrame = startFrame + nbrOfFrames;
		this.tMatrixShift = [0,0];
		this.magnitude = mag + 1;
	}
	
	main()
	{
		let L  = this.L;
		let ctx = L.ctx;
		
		//Create 2 int variables that have value between potitive magnitude and negative magnitude
		let randX = Math.ceil(Math.random() * (this.magnitude*2 - 1)) - this.magnitude;
		let randY = Math.ceil(Math.random() * (this.magnitude*2 - 1)) - this.magnitude;
		
		//START
		ctx.translate(randX, randY);
		this.tMatrixShift[0] = this.tMatrixShift[0] + randX;
		this.tMatrixShift[1] = this.tMatrixShift[1] + randY;
		
		if (frameCount == this.endFrame)
		{
			ctx.translate(-this.tMatrixShift[0], -this.tMatrixShift[1]);
			this.tMatrixShift = [0, 0];
		}
		
	}
}

class DrawImage extends Effect
{
	constructor(Layer, startFrame, nbrOfFrames, args)
	{
		super(Layer, startFrame, nbrOfFrames);
		
		//DATA
		this.args = args;
	}
	
	main()
	{
		let L  = this.L;
		let ctx = L.ctx;
		
		//START
		ctx.drawImage(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4]);
	}
}

class ImagePulse extends Effect
{
	////MAKE !!!!!!!!!!!
	//Cycle where image gets bigger and smaller every set amount of frames
	////
	constructor(Layer, startFrame, nbrOfFrames)
	{
		super(Layer, startFrame, nbrOfFrames);
		
		//DATA
		this.args = args;
	}
	
	main()
	{
		let L  = this.L;
		let ctx = L.ctx;
		
		//START

	}
}

class AnimationSprite extends Effect
{
	////MAKE !!!!!!!!!!!
	//Draw a sprite animation
	////
	constructor(Layer, startFrame, nbrOfFrames)
	{
		super(Layer, startFrame, nbrOfFrames);
		
		//DATA
		this.args = args;
	}
	
	main()
	{
		let L  = this.L;
		let ctx = L.ctx;
		
		//START

	}
}

function layerList_Update()
{
	ANIM_WINDOW_LAYER_SELECT.innerHTML = ""; //Clear select element
	
	for (let i = 0; i < anim.layerList.length; i++)
	{
		let OP = document.createElement("option");
		OP.text = anim.layerList[i].name;
		OP.ondblclick = function(){console.log("Selected Layer: " + anim.layerList[i].name); selectedLayer = anim.layerList[i]};
		ANIM_WINDOW_LAYER_SELECT.add(OP);
		
	}

}

function createNewAnimation(width = 200, height = 200, fps = 30)
{
	let w = width, h = height, f = fps;
	//STATS
	new Animation(w, h, f);
	
}

function C_clearLayer()
{
	anim.layerList[0].ctx.clearRect(0, 0, anim.layerList[0].canvas.width, anim.layerList[0].canvas.height);
}

function animation_Run()
{
	if (!running)
	{
		console.log("Animation Running..");
		running = true;
		ANIM_EDITOR_BTN_RUN.classList.add("aniButton_Halt");
		ANIM_EDITOR_BTN_RUN.classList.remove("aniButton_Run");
		timer = setInterval(tick, fps);
		
	}
	else
	{
		console.log("Animation Halted.");
		clearInterval(timer);
		running = false;
		ANIM_EDITOR_BTN_RUN.classList.add("aniButton_Run");
		ANIM_EDITOR_BTN_RUN.classList.remove("aniButton_Halt");
	}
	
}

function animation_StepForward()
{
	timer = setTimeout(tick, fps);
	console.log("Stepped forward to frame: " + frameCount);
}

function tick()
{
	ANIM_EDITOR_LBL_FRAMEC.innerHTML = frameCount; //Update animation window label with frame count
	

		anim.layerList[1].ctx.clearRect(0 - anim.layerList[1].tMatrix[0], 0, 800, 800);
	
	
	//Loop through all effects, and run them
	for (i = 0; i < Effects.length; i++)
	{
		if (frameCount >= Effects[i].startFrame && frameCount <= Effects[i].endFrame)
		{
			Effects[i].main();
		}
	}
	
	
	frameCount++; //Increment frame counter

}
