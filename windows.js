const TITLEBAR_HEIGHT = 30;
const WINDOW_MIN_WIDTH = 150;
const WINDOW_MIN_HEIGHT = 100;

let eNbr = 0;
let winMgr = [];

class Win
{
	static id = 0;
	
	constructor(winTitle, winW = WINDOW_MIN_WIDTH, winH = WINDOW_MIN_HEIGHT, initX = 400, initY = 400, controls = [1, 1, 1], resizable = true)
	{
		this.winIndex = winMgr.length;			//Window index that is used for identifying windows with indexes from winMgr
		this.zIndex = 1000000;
		this.id = Win.id;
		this.width = winW;
		this.height = winH;
		this.title = winTitle;
		this.elArray = [];
		this.winHidden = false;
		
		let D = document.getElementById("mainMenu"); 			
		let newWinFrame = document.createElement("div");		//Window Frame	
		let newWinTitle = document.createElement("div");		//Window title Node
		let newWinContent = document.createElement("div");		//Window content Node
		
		
		this.winPointer = newWinFrame;							//Pointer to the window frame Node
		this.winTitlePointer = newWinTitle;						//Pointer to the window title Node
		this.winContentPointer = newWinContent;					//Pointer to the window content Node
		this.winPointer.append(newWinTitle, newWinContent);		//Merge Title and Content together into frame
		
		//Window frame
		newWinFrame.className = "winFrame";
		newWinFrame.style.position = "absolute";
		newWinFrame.style.display = "block";
		newWinFrame.style.top = initY;
		newWinFrame.style.left = initX;
		newWinFrame.style.minWidth = WINDOW_MIN_WIDTH;
		newWinFrame.style.minHeight = WINDOW_MIN_HEIGHT;
		newWinFrame.style.width = this.width;
		newWinFrame.style.height = this.height;
		newWinFrame.id = "winId_" + this.id;
		newWinFrame.style.visibility = "visible";


		//Window title
		//newWinTitle.innerHTML = winTitle;
		newWinTitle.className = "winTitleBar";
		newWinTitle.style.height = TITLEBAR_HEIGHT;
		
		//Title Label
		let newWinTitleLabel = document.createElement("div");
		newWinTitleLabel.className = "winTitleLabel";
		this.winTitlePointer.append(newWinTitleLabel);
		newWinTitleLabel.innerHTML = winTitle;		

		//Control bar
		if (controls[2] == 1)
		{
			let newWinControl = document.createElement("div");		//Window control bar; close minimize etc.
			newWinControl.className = "winControl";
			this.winTitlePointer.append(newWinControl);				//Merge Title and Control bar
			newWinControl.innerHTML = "X";							//Give buttons to control bar
			newWinControl.win = this;
			newWinControl.addEventListener("click", function(){newWinControl.win.destroy();} );
			
		}
			
		
		//Content
		newWinContent.innerHTML = "";
		newWinContent.className = "winContent";
		newWinContent.style.backgroundColor = "#FFFFFF";
		

	
		//Set variable to css side and substract titlebar from height.
		newWinContent.style.setProperty('--titlebar_height', (TITLEBAR_HEIGHT + 2 + "px"));
		newWinContent.style.setProperty('--window_min_height', WINDOW_MIN_HEIGHT);
		newWinContent.style.minHeight = "!important calc(var(--window_min_height) - var(--titlebar_height))";
		newWinContent.style.height = "calc(100% - var(--titlebar_height))";
		
		
		if (resizable)
		{
			newWinFrame.style.resize = "both";
			newWinFrame.style.overflow = "hidden";
			
		}
		
		document.body.insertBefore(newWinFrame, D);
		dragElement(this);
		Win.id++;
		winMgr.push(this);
		this.winFocus();
	}
	
	hide()
	{
		this.winPointer.style.visibility = "hidden";
	}
	
	show()
	{
		this.winPointer.style.visibility = "visible";
	}
	
	destroy()
	{
		//WINDOW
			//TITLEBAR
				//LABEL
				//CONTROL
					//BUTTONS
			//CONTENT
		
		//Remove window
		this.winPointer.remove();
		winMgr.splice(this.winIndex, 1);	//Remove winMgr element by winindex
		
		//Rearrange winIndexes
		for (let i = 0; i < winMgr.length; i++)
		{
			winMgr[i].winIndex = i;
		}
		
		
	}
	
	addButton(label, x, y, width, height, f)
	{
		let el = document.createElement("button");
		el.id = 			"win" + eNbr; eNbr++;
		el.innerHTML = 		label;
		el.style.position = "absolute";
		el.style.left = 	x;
		el.style.top = 		y;
		el.style.width = 	width;
		el.style.height = 	height;
		el.onclick = 		f;
		el.win = 			this;

		
		this.winContentPointer.append(el);
		
		//Checking if function exists / if it's included
		if (typeof Edit_moveElement === "function")
		{
			//Only do it for Editor window.
			if (this.winPointer.id == editorWindow.winPointer.id)
			{
				el.addEventListener("mousedown", Edit_moveElement(el));
				console.log("This element is editable");
			}
		}
		
		return el;		
	}
	
	addTextbox(x, y, width, height)
	{
		let el = document.createElement("input");
		el.id = 			"win" + eNbr; eNbr++;
		el.style.position = "absolute";
		el.style.left = 	x;
		el.style.top = 		y;
		el.style.width = 	width;
		el.style.height = 	height;
		el.win = 			this;
		
		this.winContentPointer.append(el);
		
		//Checking if function exists / if it's included
		if (typeof Edit_moveElement === "function")
		{
			//Only do it for Editor window.
			if (this.winPointer.id == editorWindow.winPointer.id)
			{
				el.addEventListener("mousedown", Edit_moveElement(el));
				console.log("This element is editable");
			}
		}
		
		return el;		
	}
	
	addLabel(label, x, y, width = 200, height = 25)
	{
		let el = document.createElement("label");
		el.type = 			"checkbox";
		el.id = 			"win" + eNbr; eNbr++;
		el.style.position = "absolute";
		el.style.left = 	x;
		el.style.top = 		y;
		el.style.width = 	width;
		el.style.height = 	height;
		el.style.overflow = "auto";
		el.style.resize = 	"both";
		el.innerHTML = 		label;
		el.win = 			this;
		
		this.winContentPointer.append(el);
		
		//Checking if function exists / if it's included
		if (typeof Edit_moveElement === "function")
		{
			//Only do it for Editor window.
			if (this.winPointer.id == editorWindow.winPointer.id)
			{
				el.addEventListener("mousedown", Edit_moveElement(el));
				console.log("This element is editable");
			}
		}
		
		return el;		
	}
	
	addCheckbox(x, y)
	{
		let el = document.createElement("input");
		el.type = 			"checkbox";
		el.id = 			"win" + eNbr; eNbr++;
		el.style.position = "absolute";
		el.style.left = 	x;
		el.style.top = 		y;
		el.win = 			this;
		
		this.winContentPointer.append(el);
		
		//Checking if function exists / if it's included
		if (typeof Edit_moveElement === "function")
		{
			//Only do it for Editor window.
			if (this.winPointer.id == editorWindow.winPointer.id)
			{
				el.addEventListener("mousedown", Edit_moveElement(el));
				console.log("This element is editable");
			}
		}
		
		return el;		
	}

	addSelect(x, y, width, height, multi, options)
	{
		let el = document.createElement("select");
		el.id = 			"win" + eNbr; eNbr++;
		el.style.position = "absolute";
		el.style.left = 	x;
		el.style.top = 		y;
		el.style.width = 	width;
		el.style.height = 	height;
		el.win = 			this;
		
		//Multi select option
		if (multi){el.multiple = true;};
		
		for (let i = 0; i < options.length; i++)
		{
			let op = document.createElement("option");
			op.innerHTML = options[i];
			el.appendChild(op);
		}
		
		this.winContentPointer.append(el);
		
		//Checking if function exists / if it's included
		if (typeof Edit_moveElement === "function")
		{
			//Only do it for Editor window.
			if (this.winPointer.id == editorWindow.winPointer.id)
			{
				el.addEventListener("mousedown", Edit_moveElement(el));
				console.log("This element is editable");
			}
		}
		
		return el;		
	}
	
	winFocus()
	{
		
		for (let i = 0; i < winMgr.length; i++)
		{
			winMgr[i].winPointer.style.zIndex = 1000000 + 1;
		}
		
		this.winPointer.style.zIndex++;
	}
	
}

// Make the DIV element draggable:

function dragElement(wInstance)
{
	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

	//Make titlebar movable
	wInstance.winTitlePointer.onmousedown = dragMouseDown;

	//Make clicking content window focus it
	wInstance.winContentPointer.onmousedown = contentFocus;


	function contentFocus(e)
	{
		wInstance.winFocus();
	}
	
	function dragMouseDown(e)
	{
		wInstance.winFocus();
		e = e || window.event;
		e.preventDefault();
		
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}
	

	function elementDrag(e)
	{
		e = e || window.event;
		e.preventDefault();
		
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		wInstance.winPointer.style.top = (wInstance.winPointer.offsetTop - pos2) + "px";
		wInstance.winPointer.style.left = (wInstance.winPointer.offsetLeft - pos1) + "px";
	}

	function closeDragElement()
	{
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
	
	
}