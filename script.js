// Preload
const faceapi = ml5.faceApi(modelLoaded);
let reader = new FileReader();
let img = new Image();
    img.src = 'DropHere.png';
let canvas, ctx;

// modelLoaded > Ready to Accept
function modelLoaded() {
  document.getElementById('message').innerHTML = '<p>FaceApi loaded!</p>';

  canvas = document.getElementById("canvas");
  canvas.width  = 640;
  canvas.height = 480;
  ctx = canvas.getContext('2d');
  ctx.drawImage( img, 0, 0);

  canvas.addEventListener("dragover",function(ev){ ev.preventDefault();}, false);
  canvas.addEventListener("drop", function(ev){ ev.preventDefault(); GetImage(ev);}, false);
}

// GetImage
function GetImage(ev){

  var file = ev.dataTransfer.files[0];

  var fileType = file.name.slice(-4).toLowerCase();
  if( fileType !== ".jpg" ) {
    alert("File available only .jpg");
    return;
  }

  reader.readAsDataURL(file);

  reader.onloadend = function ()  {

    document.getElementById('message').innerHTML = '<p>Now Preparing! </p>';

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

  document.getElementById('message').innerHTML = '<p>Detected!</p>';

  if (err) {
      console.log(err);
      alert('Detection Error：Cannot read property.');
      return;
  }

  if (result) {
    console.log(result);
    drawBox(result);
    drawLandmarks(result);
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
  drawPart(result.parts.mouth, true);
  drawPart(result.parts.nose, false);
  drawPart(result.parts.leftEye, true);
  drawPart(result.parts.leftEyeBrow, false);
  drawPart(result.parts.rightEye, true);
  drawPart(result.parts.rightEyeBrow, false);
}

function drawPart(feature, closed){

  ctx.beginPath();
  for(let i = 0; i < feature.length; i++){
      const x = feature[i]._x;
      const y = feature[i]._y;

      if(i === 0){
          ctx.moveTo(x, y);
      } else {
          ctx.lineTo(x, y);
      }
  }

  if(closed === true){
      ctx.closePath();
  }
  ctx.stroke();

}
