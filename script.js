let faceapi;
let img;
let detections;
let canvas, ctx;

const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}

window.onload = function() {
  var obj = document.getElementById("DropHere");
  obj.addEventListener("dragover",function(ev){ ev.preventDefault();}, false);
  obj.addEventListener("drop", function(ev){ ev.preventDefault(); GetImage(ev);}, false);
}

function GetImage(ev){

  var file = ev.dataTransfer.files[0];
  var fileType = file.name.slice(-4).toLowerCase();

  if( fileType == ".jpg" ){

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function(){

      img = new Image();
      img.src = reader.result;

      canvas = document.createElement("canvas");
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;

      document.getElementById("DropHere").remove();
      document.getElementById("image").appendChild(canvas);
      ctx = canvas.getContext('2d');

      faceapi = ml5.faceApi(detection_options, modelReady);
    }

  }else{

    alert("File available only .jpg");

  }

}

function modelReady() {
    console.log('ready!')
    faceapi.detectSingle(img, gotResults)
}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    if (detections) {
        console.log(detections)
        ctx.drawImage(img, 0,0, img.naturalWidth, img.naturalHeight);
        drawBox(detections)
        drawLandmarks(detections)
    }
}

function drawBox(detections){
    const alignedRect = detections.alignedRect;
    const {_x, _y, _width, _height} = alignedRect._box;
    ctx.rect(_x, _y, _width, _height);
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
}

function drawLandmarks(detections){

    ctx.strokeStyle = "#a15ffb";

    // mouth
    ctx.beginPath();
    detections.parts.mouth.forEach( (item, idx) => {
        if(idx = 0){
            ctx.moveTo(item._x, item._y);
        } else {
            ctx.lineTo(item._x, item._y);
        }
    })
    ctx.closePath();
    ctx.stroke();

    // nose
    ctx.beginPath();
    detections.parts.nose.forEach( (item, idx) => {
        if(idx = 0){
            ctx.moveTo(item._x, item._y);
        } else {
            ctx.lineTo(item._x, item._y);
        }
    })
    ctx.stroke();

    // left eye
    ctx.beginPath();
    detections.parts.leftEye.forEach( (item, idx) => {
        if(idx = 0){
            ctx.moveTo(item._x, item._y);
        } else {
            ctx.lineTo(item._x, item._y);
        }
    })
    ctx.closePath();
    ctx.stroke();

    // right eye
    ctx.beginPath();
    detections.parts.rightEye.forEach( (item, idx) => {
        if(idx = 0){
            ctx.moveTo(item._x, item._y);
        } else {
            ctx.lineTo(item._x, item._y);
        }
    })
    ctx.closePath();
    ctx.stroke();

    // right eyebrow
    ctx.beginPath();
    detections.parts.rightEyeBrow.forEach( (item, idx) => {
        if(idx = 0){
            ctx.moveTo(item._x, item._y);
        } else {
            ctx.lineTo(item._x, item._y);
        }
    })
    ctx.stroke();

    // left eyeBrow
    ctx.beginPath();
    detections.parts.leftEyeBrow.forEach( (item, idx) => {
        if(idx = 0){
            ctx.moveTo(item._x, item._y);
        } else {
            ctx.lineTo(item._x, item._y);
        }
    })
    ctx.stroke();

}
