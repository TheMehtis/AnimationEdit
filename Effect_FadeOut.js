function FadeOut_Data()
{
	//DEFINE ONLY ONCE
	
	if (typeof window.FadeOut !== 'undefined') {
		// the variable is defined
	}
	else
	{
		window.FadeOut = {};
	}
	
	
	if (typeof FadeOut.theX !== 'undefined') {}else{  FadeOut.theX = 0;	} //Let theX = 0;
}


function FadeOut_Main(Layer)
{
	FadeOut_Data();
	
	//START
	c = Layer.ctx;
	c.globalAlpha = 0.1;
	c.fillStyle = "#0000FF";
	c.fillRect(0, 0, 800, 800);
	
}