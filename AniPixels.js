function AniPixels_Data()
{
	//DEFINE ONLY ONCE
	
	if (typeof window.AniPixels !== 'undefined') {
		// the variable is defined
	}
	else
	{
		window.AniPixels = {};
	}
	
	
	if (typeof AniPixels.theX !== 'undefined') {
		// the variable is defined
	}
	else
	{
		AniPixels.theX = 0;
		
	}
}


function AniPixels_Main()
{
	AniPixels_Data();
	
	//START
	AniPixels.theX++;

	anim.layerList[0].ctx.clearRect(0, 0, anim.layerList[0].canvas.width, anim.layerList[0].canvas.height);
	anim.layerList[0].ctx.fillRect(0, 0, AniPixels.theX, 60);
}
