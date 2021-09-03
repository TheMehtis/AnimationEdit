//Window
let Toolbox = new Win('Editor Toolbox', 300, 500, 968, 49, [0, 0, 0], false);


Toolbox.addLabel('Element Editor Tool', 30, 70, 250, 25, null);

//TEXT ELEMENTS
let EDITOR_T_TXT_01 = Toolbox.addTextbox(30, 100, 150, 25, null); EDITOR_T_TXT_01.id = "EDITOR_TOOLBOX_TXT_1";
let EDITOR_T_TXT_02 = Toolbox.addTextbox(30, 130, 150, 25, null); EDITOR_T_TXT_02.id = "EDITOR_TOOLBOX_TXT_2";
let EDITOR_T_TXT_03 = Toolbox.addTextbox(30, 160, 150, 25, null); EDITOR_T_TXT_03.id = "EDITOR_TOOLBOX_TXT_3";
let EDITOR_T_TXT_04 = Toolbox.addTextbox(30, 190, 150, 25, null); EDITOR_T_TXT_04.id = "EDITOR_TOOLBOX_TXT_4";
let EDITOR_T_TXT_05 = Toolbox.addTextbox(30, 220, 150, 25, null); EDITOR_T_TXT_05.id = "EDITOR_TOOLBOX_TXT_5";
let EDITOR_T_TXT_06 = Toolbox.addTextbox(30, 250, 150, 25, null); EDITOR_T_TXT_06.id = "EDITOR_TOOLBOX_TXT_6";

//LABEL ELEMENTS
let EDITOR_T_LBL_01 = Toolbox.addLabel('ID', 190, 100, 150, 25, null);
let EDITOR_T_LBL_02 = Toolbox.addLabel('InnerHTML', 190, 130, 150, 25, null);
let EDITOR_T_LBL_03 = Toolbox.addLabel('Width', 190, 160, 150, 25, null);
let EDITOR_T_LBL_04 = Toolbox.addLabel('Height', 190, 190, 150, 25, null);
let EDITOR_T_LBL_05 = Toolbox.addLabel('Onclick', 190, 220, 150, 25, null);
let EDITOR_T_LBL_06 = Toolbox.addLabel('Value', 190, 250, 150, 25, null);





//CHECKBOX ELEMENTS
let EDITOR_T_CHK_01 = Toolbox.addCheckbox(0, 100); EDITOR_T_CHK_01.id = "EDITOR_TOOLBOX_CHK_1";
let EDITOR_T_CHK_02 = Toolbox.addCheckbox(0, 130); EDITOR_T_CHK_02.id = "EDITOR_TOOLBOX_CHK_2";
let EDITOR_T_CHK_03 = Toolbox.addCheckbox(0, 160); EDITOR_T_CHK_03.id = "EDITOR_TOOLBOX_CHK_3";
let EDITOR_T_CHK_04 = Toolbox.addCheckbox(0, 190); EDITOR_T_CHK_04.id = "EDITOR_TOOLBOX_CHK_4";
let EDITOR_T_CHK_05 = Toolbox.addCheckbox(0, 220); EDITOR_T_CHK_05.id = "EDITOR_TOOLBOX_CHK_5";
let EDITOR_T_CHK_06 = Toolbox.addCheckbox(0, 250); EDITOR_T_CHK_06.id = "EDITOR_TOOLBOX_CHK_6";

let EDITOR_T_BTN_01 = Toolbox.addButton('Change', 30, 280, 100, 50, Edit_changeElementProperties); EDITOR_T_BTN_01.id = "EDITOR_TOOLBOX_BTN_01";

//ELEMENT ADDER

Toolbox.addButton('Add Textbox', 30, 360, 100, 50, function(){editorWindow.addTextbox(0, 0, 100, 25, null)})
Toolbox.addButton('Add Button', 30, 420, 100, 50, function(){editorWindow.addButton("New Button", 0, 0, 100, 50, null)})
Toolbox.addButton('Add Label', 140, 360, 100, 50, function(){editorWindow.addLabel("New Label", 50, 50, 100, 25, null)})
Toolbox.addButton('Add Checkbox', 140, 420, 100, 50, function(){editorWindow.addCheckbox(0, 0, null)})

//Edit_copyToEditor(Toolbox);