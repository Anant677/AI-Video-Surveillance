vdo = "";
status = "";
object = [];
function preload(){
    Video = createVideo("video.mp4");
   
}
function setup(){
    canvas = createCanvas(400,400);
    canvas.center(); 
    Video.hide();
    
}
function draw(){
    image(Video,0,0,400,400);
    if(status!=""){
        objectDetector.detect(Video,gotResult);
    }
    for(var i=0;i<object.length;i++){        
        document.getElementById("status").innerHTML = "Objects Detected";
        document.getElementById("status1").innerHTML = "Objects Detected = "+object.length;
        confidence = floor(object[i].confidence*100);
        fill("#eb2c1e");
        text(object[i].label+" "+confidence+" % ",object[i].x,object[i].y-15);
        noFill();
        stroke("#eb2c1e");
        rect(object[i].x , object[i].y , object[i].width , object[i].height);
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoded);

    document.getElementById("status").innerHTML = "Detecting Objects 😊";
}
function modelLoded(){
    console.log("Model is Initalized");
    status = true;
    Video.loop();
    Video.volume(0);
}
function gotResult(error,results){
if(error){
    console.log(error);
}else{
    console.log(results);
object = results;
}
}