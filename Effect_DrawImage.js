
function DrawImage_Data()
{
	//DEFINE ONLY ONCE
	
	if (typeof window.DrawImage !== 'undefined') {
		// the variable is defined
	}
	else
	{
		window.DrawImage = { };
	}
	
	//Set up the base frame for all DrawImage Effects
	if (typeof DrawImage.baseFrame !== 'undefined') {}else{  DrawImage.baseFrame = [];	}
	if (typeof DrawImage.imgs !== 'undefined') {}else{  DrawImage.imgs = [document.createElement("img")];	}
	

}


function DrawImage_Main(Layer, dir)
{
	DrawImage_Data();
	let idx;
	
	if (typeof DrawImage.baseFrame[0] !== 'undefined')
	{
		if (!DrawImage.baseFrame[0].includes(Layer))
		{
			//Layer, GlobalAlpha
			idx = DrawImage.baseFrame.push([Layer, 1.0]);
		}
	}
	else{
		idx = DrawImage.baseFrame.push([Layer, 1.0]);
	}
	
	
	if (DrawImage.baseFrame[0].includes(Layer))
	{
		//If Layer exist, do stuff
		for (let i = 0; i < DrawImage.baseFrame.length; i++)
		{
			if (DrawImage.baseFrame[i][0] == Layer)
			{
				
				//START
				let c  = DrawImage.baseFrame[i][0];
				let ga = DrawImage.baseFrame[i][1];
				let ctx = c.ctx;

				DrawImage.imgs[0].src = "Graphics/Run.png";
				ctx.drawImage(DrawImage.imgs[0], 0, 0);
				
			}
		}
	}
	//FIX LAYERS TO BE MULTI-USE LAYERS
	
	
}


