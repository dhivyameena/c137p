status="";
objects=[];

function setup() {
    canvas=createCanvas(480, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start() {
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
    object_name=document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("model is loaded");
    status=true;
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResults);

        for (i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML="status: objects detected";
            fill("#FF0000");
            percent=floor(object[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label==object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML=object_name + " found";

                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name + " found");
                synth.speak(utterThis);
            }

            else {
                document.getElementById("object_status").innerHTML=object_name + " not found";
            }
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
    }
}