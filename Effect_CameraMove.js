
function CameraMove_Data()
{
	//DEFINE ONLY ONCE
	
	if (typeof window.CameraMove !== 'undefined') {
		// the variable is defined
	}
	else
	{
		window.CameraMove = { };
	}
	
	//Set up the base frame for all CameraMove Effects
	if (typeof CameraMove.baseFrame !== 'undefined') {}else{  CameraMove.baseFrame = [];	}
	

}


function CameraMove_Main(Layer, dir)
{
	CameraMove_Data();
	let idx;
	
	if (typeof CameraMove.baseFrame[0] !== 'undefined')
	{
		if (!CameraMove.baseFrame[0].includes(Layer))
		{
			//Layer, GlobalAlpha
			idx = CameraMove.baseFrame.push([Layer, 1.0]);
		}
	}
	else{
		idx = CameraMove.baseFrame.push([Layer, 1.0]);
	}
	
	
	if (CameraMove.baseFrame[0].includes(Layer))
	{
		//If Layer exist, do stuff
		for (let i = 0; i < CameraMove.baseFrame.length; i++)
		{
			if (CameraMove.baseFrame[i][0] == Layer)
			{
				
				//START
				let c  = CameraMove.baseFrame[i][0];
				let ga = CameraMove.baseFrame[i][1];
				let ctx = c.ctx;
				
				ctx.translate(1, 0);
				
			}
		}
	}
	//FIX LAYERS TO BE MULTI-USE LAYERS
	
	
}


