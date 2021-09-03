console.log("Executing Autoexec.js");

createNewAnimation(800, 800, 30);


let layer_bg	= anim.createNewLayer(true); layer_bg.setZIndex(0);
let layer_main	= anim.createNewLayer(false); layer_main.setZIndex(1);
let layer_fade	= anim.createNewLayer(false); layer_fade.setZIndex(2);

let imgs = [];
BG = new Image; BG.src = "Graphics/Halt.png"; imgs.push(BG);
BG = new Image; BG.src = "Graphics/Background.jpg"; imgs.push(BG);



//EVENTS
//Infinite events; for permanent drawings
layer_bg.addEvent(DrawImage, 0, Infinity, [imgs[1], -200, -50, 2000, 900]);

//Finite
layer_fade.addEvent(FadeIn, 0, 30);
layer_bg.addEvent(CameraMove, 0, 60, [600, 1]);
layer_bg.addEvent(CameraMove, 90, 15, [600, 0]);
//layer_fade.addEvent(FadeOut, 30, 60);
//layer_fade.addEvent(FadeIn, 90, 30);
layer_fade.addEvent(FadeOut, 130, 30);
layer_bg.addEvent(CameraShake, 60, 30, 50);


