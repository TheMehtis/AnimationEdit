
function FadeIn_Data()
{
	//DEFINE ONLY ONCE
	
	if (typeof window.FadeIn !== 'undefined') {
		// the variable is defined
	}
	else
	{
		window.FadeIn = { };
	}
	
	//Set up the base frame for all FadeIn Effects
	if (typeof FadeIn.baseFrame !== 'undefined') {}else{  FadeIn.baseFrame = [];	}
	

}


function FadeIn_Main(Layer)
{
	FadeIn_Data();
	let idx;
	
	if (typeof FadeIn.baseFrame[0] !== 'undefined')
	{
		if (!FadeIn.baseFrame[0].includes(Layer))
		{
			//Layer, GlobalAlpha
			idx = FadeIn.baseFrame.push([Layer, 1.0]);
		}
	}
	else{
		idx = FadeIn.baseFrame.push([Layer, 1.0]);
	}
	
	
	if (FadeIn.baseFrame[0].includes(Layer))
	{
		//If Layer exist, do stuff
		for (let i = 0; i < FadeIn.baseFrame.length; i++)
		{
			if (FadeIn.baseFrame[i][0] == Layer)
			{
				let c  = FadeIn.baseFrame[i][0];
				let ga = FadeIn.baseFrame[i][1];
				let ctx = c.ctx;
				
				//START
				ctx.fillStyle = "#0000FF";
				ctx.clearRect(0, 0, 800, 800);
				ctx.globalAlpha = FadeIn.baseFrame[i][1];
				ctx.fillRect(0, 0, 800, 800);
				FadeIn.baseFrame[i][1] = FadeIn.baseFrame[i][1] - 0.25;
				if (FadeIn.baseFrame[i][1] < 0){FadeIn.baseFrame[i][1] = 0;}
			}
		}
	}
	//FIX LAYERS TO BE MULTI-USE LAYERS
	
	
}
