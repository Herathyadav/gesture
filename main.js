p1="";
Webcam.set({
    width:350,
    height:300,
    image_format:'jpeg',
    jpeg_quality:150
});
camera= document.getElementById("cam");
Webcam.attach("#cam");
function takesnap() {
    Webcam.snap(function(data_uri) { 
        document.getElementById("r").innerHTML = '<img id="capture" src="'+data_uri+'"/>'; });
}
//Webcam.snap() is a predefined function of webcam.js used to take images from a webcam, this function contains data_uri that can be used to show preview of the image which generates after taking a snapshot.
//data_uri is used for displaying the image
//data_uri has the image captured.
//We are giving id to the img tag, so that later we can take this image from this img tag and use it for comparing it with the model. Now in src of the img tag we will pass data_uri. So that this image gets updated with the selfie taken and gets displayed.
console.log("ml5 version:" ,ml5.version)
classifier=ml5.imageClassifier("change link",modelLoaded);//loads the trained models

function modelLoaded() {
    console.log("mode loaded")
}//loads and notifiys when the model is loaded
function check() {
    img=document.getElementById("capture");//saves the captured image in the varaible img 
    classifier.classify(img,gotResult);//this is a comparision of the captured image with the trained model
}
function gotResult(error,results) {
    if(error) {
        console.error(error);
      
        
    }
    else{
        console.log(results);//results is the array of the identified images starting with index nunber 0, index 0 will have the object with the highest confidence.
        document.getElementById("r1").innerHTML=results[0].label;

        p1=results[0].label;
        speak();
        if(p1=="peace"){
            document.getElementById("e1").innerHTML="✌️";
        }
        if(p1=="thumbs-up"){
            document.getElementById("e1").innerHTML="👍";
        }
        if(p1=="perfect"){
            document.getElementById("e1").innerHTML="👌";
        }
    }
}
function speak() {
    var synth=window.speechSynthesis;
    d1="the first prediction is "+p1;
    var utterthis=new SpeechSynthesisUtterance(d1);
    synth.speak(utterthis);
}