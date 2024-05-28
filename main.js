var status = "";
var img = "";
var r, g, b;
objects = []

function setup() {
canvas = createCanvas(640, 420);
canvas.center();

video = createCapture(VIDEO);
video.hide();
}


function draw() {
    //image(imagem, x, y, width, height)
    image(video, 0, 0, 640, 420);
    if(status != "") {
        objectDetector.detect(video, gotResult);
        for (var f = 0; f < objects.length; f++) {
                r =255;
                g = 0;
                b = 0;      
            
            noFill();
            stroke("rgb("+ r + ", " + g + ", " + b + ")");
            rect(objects[f].x,objects[f].y, objects[f].width, objects[f].height);
            fill("rgb("+ r + ", " + g + ", " + b + ")");
            var confidence = floor(objects[f].confidence * 100);
            console.log(confidence);
            var name = objects[f].label;
            text(name + "  " + confidence + "%", objects[f].x + 20, objects[f].y + 20);

            document.getElementById("numberOfObjects").innerHTML = objects.length;
        }
    }
}

function Start()
{
    console.log("Start")
    //O codigo da linha abaixo, inicializa o modelo cocossd xdxd
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function modelLoaded() {
    console.log("Modelo Carregado! xd");
    status = true;
    
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}