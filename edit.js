document.addEventListener("keydown", Edit_elMove);


function modeEdit(mode)
{
	editorMode = mode;

	if (mode)
	{
		console.log("Editor mode is now ON");
		mainMenuEditSub.childNodes[1].style.display = "block";
		mainMenuEditSub.childNodes[3].style.display = "block";		
	}
	else
	{
		
		console.log("Editor mode is now OFF");	
		mainMenuEditSub.childNodes[1].style.display = "none";
		mainMenuEditSub.childNodes[3].style.display = "none";	
	}
}

function editWindow(win, state)
{
	let Window = win;
	Window.winContentPointer.contentEditable = state;
}

function Edit_ePick(el)
{
	pickedElement = el;
	console.log("Picked element: " + el + "#" +el.id);
}

function Edit_moveElement(el)
{
	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

	//Make element movable
	el.onmousedown = Edit_dragMouseDown;

	
	function Edit_dragMouseDown(e)
	{
		if (editorMode)
		{
			Edit_ePick(el);
			e = e || window.event;
			e.preventDefault();
			el.focus();
			Edit_extractAttributes(el);
			
			
			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = Edit_closeDragElement;
			
			// call a function whenever the cursor moves:
			document.onmousemove = Edit_elementDrag;
		}
	}
	
	
	function Edit_elementDrag(e)
	{
		if (editorMode)
		{
			e = e || window.event;
			e.preventDefault();
			
			// calculate the new cursor position:
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			// set the element's new position:
			el.style.top = (el.offsetTop - pos2) + "px";
			el.style.left = (el.offsetLeft - pos1) + "px";
		}
	}

	function Edit_closeDragElement()
	{
		if (editorMode)
		{
			// stop moving when mouse button is released:
			document.onmouseup = null;
			document.onmousemove = null;
		}
	}
	
	
}

function Edit_openEditWindow()
{
	if (editorWindow.winHidden == false) //Execute when window is open
	{
		editorWindow.hide();
		editorWindow.winHidden = true;
	}
	else
	{
		editorWindow.show();
		editorWindow.winHidden = false;
	}
}

function Edit_changeElementProperties()
{
	
	let actions = [
	
		function(){pickedElementLocked.id 				= EDITOR_T_TXT_01.value},
		function(){pickedElementLocked.innerHTML 		= EDITOR_T_TXT_02.value},
		function(){pickedElementLocked.style.width		= EDITOR_T_TXT_03.value},
		function(){pickedElementLocked.style.height 	= EDITOR_T_TXT_04.value},
		function(){pickedElementLocked.onclick 			= function(){eval("EDITOR_T_TXT_05.value")}},
		function(){pickedElementLocked.value 			= EDITOR_T_TXT_06.value}
	];
	
	if (document.getElementById("EDITOR_TOOLBOX_CHK_1").checked){actions[0].call();}
	if (document.getElementById("EDITOR_TOOLBOX_CHK_2").checked){actions[1].call();}
	if (document.getElementById("EDITOR_TOOLBOX_CHK_3").checked){actions[2].call();}
	if (document.getElementById("EDITOR_TOOLBOX_CHK_4").checked){actions[3].call();}
	if (document.getElementById("EDITOR_TOOLBOX_CHK_5").checked){actions[4].call();}
	if (document.getElementById("EDITOR_TOOLBOX_CHK_6").checked){actions[5].call();}

}

function Edit_extractAttributes(el)
{
	/*
		function(){pickedElementLocked.id 				= EDITOR_T_txt_01.value},
		function(){pickedElementLocked.innerHTML 		= EDITOR_T_txt_02.value},
		function(){pickedElementLocked.style.width		= EDITOR_T_txt_03.value},
		function(){pickedElementLocked.style.height 	= EDITOR_T_txt_04.value},
		function(){pickedElementLocked.onclick 			= EDITOR_T_txt_05.value},
		function(){pickedElementLocked.value 			= EDITOR_T_txt_06.value}
	*/
	document.getElementById("EDITOR_TOOLBOX_TXT_1").value = el.id;
	document.getElementById("EDITOR_TOOLBOX_TXT_2").value = el.innerHTML;
	document.getElementById("EDITOR_TOOLBOX_TXT_3").value = parseInt(el.style.width);
	document.getElementById("EDITOR_TOOLBOX_TXT_4").value = parseInt(el.style.height);
	document.getElementById("EDITOR_TOOLBOX_TXT_5").value = el.onclick;
	document.getElementById("EDITOR_TOOLBOX_TXT_6").value = el.value;

}

function Edit_decompileNodes(Window)
{
	let contentNodes = Window.winContentPointer.childNodes;
	let code;
	let script = [];
	let compileWin = new Win("Decompiled Code", 500, 800, 100, 100);

	//DECOMPILE WINDOW ITSELF
	let wP = Window.winPointer;
	let wTitle = Window.winTitlePointer.innerText;
	let wH = parseInt(Window.winPointer.style.height);
	let wW = parseInt(Window.winPointer.style.width);
	let wX = Window.winPointer.style.left;	wX = wX.replace("px", "");
	let wY = Window.winPointer.style.top;	wY = wY.replace("px", "");
	script.push("<b>Window</b>");
	code = 'new Win(\x27' + wTitle + '\x27, ' + wW + ', ' + wH + ', ' + wX + ', ' +  wY + ');';
	script.push(code);
	
	script.push("");
	script.push("<b>Elements<b>");
	
	for (i = 0; i < contentNodes.length; i++)
	{
		let iHTML = contentNodes[i].innerHTML;
		
		let x = contentNodes[i].style.left; x = x.replace("px", "");
		let y = contentNodes[i].style.top; y = y.replace("px", "");
		let width = contentNodes[i].style.width; width = width.replace("px", "");
		let height = contentNodes[i].style.height; height = height.replace("px", "");
		let func;
		
		//Check if onclick has a function
		if (contentNodes[i].onclick == null)
		{
			func = null; //onclick: null; no function
		}
		//Check if function name is anonymous
		else if (contentNodes[i].onclick.name == "")
		{
			func = contentNodes[i].onclick; //onclick: block of code
		}
		//Check if function name is not undefined
		else if (typeof(contentNodes[i].onclick.name) != undefined)
		{
			func = contentNodes[i].onclick.name; //onclick: function name
		}


		
		//BUTTON NODE
		if (contentNodes[i].tagName == "BUTTON")
		{	
			//START
			code = '$WINDOW.addButton(';
			code = code + '\x27'+iHTML+'\x27, '; //innerHTML
			
			code = code + x + ', '; 
			code = code + y + ', '; 
			code = code + width + ', '; 
			code = code + height + ', '; 
			code = code + func;
			script.push(code + ");");
		}
		if (contentNodes[i].tagName == "INPUT" && contentNodes[i].type == "text")
		{	
			//START
			code = '$WINDOW.addTextbox(';
			
			code = code + x + ', '; 
			code = code + y + ', '; 
			code = code + width + ', '; 
			code = code + height + ', '; 
			code = code + func;
			script.push(code + ");");
		}
		if (contentNodes[i].tagName == "INPUT" && contentNodes[i].type == "checkbox")
		{	
			//START
			code = '$WINDOW.addCheckbox(';

			code = code + x + ', '; 
			code = code + y;
			script.push(code + ");");
		}
		if (contentNodes[i].tagName == "LABEL")
		{	
			//START
			code = '$WINDOW.addLabel(' + '\x27' + iHTML + '\x27, ';	

			code = code + x + ', '; 
			code = code + y + ', '; 
			code = code + width + ', '; 
			code = code + height + ', '; 
			code = code + func;
			script.push(code + ");");			
		}
		if (contentNodes[i].tagName == "SELECT")
		{
			//START
			let multi = contentNodes[i].multiple
			let ops = contentNodes[i].options;
			
			code = '$WINDOW.addSelect('+x+', '+y+', '+width+', '+height+', '+multi+', [';
			for (let i = 0; i < ops.length; i++)
			{
				code = code + "'" + ops[i].innerHTML + "'" + ",";
			}
			code = code.substring(0, code.length - 1);
			code = code + "]";
			script.push(code + ");");
		}

		
	}
	
	//Print all codes
	for (i = 0; i < script.length; i++)
	{
		compileWin.winContentPointer.innerHTML = compileWin.winContentPointer.innerHTML + script[i] + "</br>";
	}
	
	return script;
}


//UP, DOWN, LEFT, RIGHT
let controls = ["Numpad8", "Numpad5", "Numpad4", "Numpad6", "Numpad0"];

function Edit_elMove(e)
{
	if (controls.includes(e.code))
	{
		//Snap to grid
		if (typeof(pickedElement) !== "undefined")
		{
			if (Edit_grid == 1 && parseInt(pickedElement.style.top) % Edit_gridSize != 0)
			{
				pickedElement.style.top = Math.ceil( (parseInt(pickedElement.style.top)+1) / Edit_gridSize ) * Edit_gridSize;
				pickedElement.style.left = Math.ceil( (parseInt(pickedElement.style.left)+1) / Edit_gridSize ) * Edit_gridSize;
			}
			
			if (e.code == "Numpad8")
			{
				pickedElement.style.top = parseInt(pickedElement.style.top) - (Edit_grid == 1 ? Edit_gridSize : 1);
			}
			else if (e.code == "Numpad5")
			{
				pickedElement.style.top = parseInt(pickedElement.style.top) + (Edit_grid == 1 ? Edit_gridSize : 1);
			}
			else if (e.code == "Numpad4")
			{
				pickedElement.style.left = parseInt(pickedElement.style.left) - (Edit_grid == 1 ? Edit_gridSize : 1);
			}
			else if (e.code == "Numpad6")
			{
				pickedElement.style.left = parseInt(pickedElement.style.left) + (Edit_grid == 1 ? Edit_gridSize : 1);
			}
			else if (e.code == "Numpad0")
			{
				pickedElementLocked = pickedElement;
				console.log("Element pick confirmed: " + pickedElementLocked);
			}
		}
		else
		{
			console.log("Nothing selected.");
		}
	}
}


function Edit_copyToEditor(win)
{
	let html = win.winContentPointer.innerHTML;
	editorWindow.winContentPointer.innerHTML = html;
	editorWindow.winPointer.style.height = win.winPointer.style.height;
	editorWindow.winPointer.style.width = win.winPointer.style.width;
	
	for (i = 0; i < editorWindow.winContentPointer.childNodes.length; i++)
	{
		let el = editorWindow.winContentPointer.childNodes[i];
		editorWindow.winContentPointer.childNodes[i].id = win.winContentPointer.childNodes[i].id + "_copy";
		el.addEventListener("mousedown", Edit_moveElement(el));
	}
}

let Edit_grid = 1;
let Edit_gridSize = 10;
let pickedElement;
let pickedElementLocked;
let editorMode = 0;
modeEdit(1);
let editorWindow = new Win("Editor window", 300, 300, 200, 200, [0, 0, 0]);
editorWindow.hide();
