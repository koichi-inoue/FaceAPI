window.onload = function() {
  // EventListener for Drop Image
  var obj = document.getElementById("image");
  obj.addEventListener("dragover",function(ev){ ev.preventDefault();}, false);
  obj.addEventListener("drop", function(ev){ ev.preventDefault(); GetImage(ev);}, false);
}

function GetImage(ev){

  var targetObj = ev.currentTarget;
  var file = ev.dataTransfer.files[0];
  var fileType = file.name.slice(-4).toLowerCase();

  if( fileType == ".jpg" ){

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function(){

      document.getElementById('predictions').innerHTML = '<p>The MobileNet model loading・・</p>';

      targetObj.setAttribute("src",reader.result);
      var img = document.getElementById('image');

      ml5.imageClassifier('MobileNet')
        .then(classifier => classifier.classify(img))
        .then(results => {
          var txt="";
          for(i=0; i<results.length; i++){
           txt += "Label：" + results[i].label +'<br>';
           txt += "Confidence：" + results[i].confidence.toFixed(4) +'<br>';
           txt += '<br>';
          }
          document.getElementById('predictions').innerHTML = txt;
        });

    }

  }else{

    alert("File available only .jpg");

  }
}
