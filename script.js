// Preload
const faceapi = ml5.faceApi(modelLoaded);
let reader = new FileReader();
let img = new Image();
    img.src = 'DropHere.png';
let canvas, ctx;

// modelLoaded > Ready to Accept
function modelLoaded() {
  document.getElementById('message').innerHTML = '<p>FaceApi model loaded!</p>';

  canvas = document.getElementById("canvas");
  canvas.width  = 640;
  canvas.height = 480;
  ctx = canvas.getContext('2d');
  ctx.drawImage( img, 0, 0);

  canvas.addEventListener("dragover",function(ev){ ev.preventDefault();}, false);
  canvas.addEventListener("drop", function(ev){ ev.preventDefault(); Classify(ev);}, false);
}

function Classify(ev){

  var file = ev.dataTransfer.files[0];

  var fileType = file.name.slice(-4).toLowerCase();
  if( fileType !== ".jpg" ) {
    alert("File available only .jpg");
    return;
  }

  reader.readAsDataURL(file);

  reader.onloadend = function ()  {

    img.src = reader.result;

    img.onload = function(){

      console.log(img.naturalWidth, img.naturalHeight);
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0,0, img.naturalWidth, img.naturalHeight);

      faceapi.detectSingle(img, gotResults);
    }

  }

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        alert('Detection Error：Cannot read property.');
        return
    }

    if (result) {
        console.log(result)
        drawBox(result)
        drawLandmarks(result)
    }
}

function drawBox(result){
    const alignedRect = result.alignedRect;
    const {_x, _y, _width, _height} = alignedRect._box;
    ctx.rect(_x, _y, _width, _height);
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
}

function drawLandmarks(result){

    ctx.strokeStyle = "#a15ffb";

    // mouth
    ctx.beginPath();
    result.parts.mouth.forEach( (item, idx) => {
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
    result.parts.nose.forEach( (item, idx) => {
        if(idx = 0){
            ctx.moveTo(item._x, item._y);
        } else {
            ctx.lineTo(item._x, item._y);
        }
    })
    ctx.stroke();

    // left eye
    ctx.beginPath();
    result.parts.leftEye.forEach( (item, idx) => {
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
    result.parts.rightEye.forEach( (item, idx) => {
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
    result.parts.rightEyeBrow.forEach( (item, idx) => {
        if(idx = 0){
            ctx.moveTo(item._x, item._y);
        } else {
            ctx.lineTo(item._x, item._y);
        }
    })
    ctx.stroke();

    // left eyeBrow
    ctx.beginPath();
    result.parts.leftEyeBrow.forEach( (item, idx) => {
        if(idx = 0){
            ctx.moveTo(item._x, item._y);
        } else {
            ctx.lineTo(item._x, item._y);
        }
    })
    ctx.stroke();

}
