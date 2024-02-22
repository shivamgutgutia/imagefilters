var inputCanvas = document.getElementById("inputCanvas");
var outputCanvas = document.getElementById("outputCanvas");
var inputImage = null;
var outputImage = null;

function checkLoaded(image){
  if (image==null || !image.complete()){
    return false;
  }
  return true;
}

function loadImage(){
  var image = document.getElementById("inputImage");
  inputImage = new SimpleImage(image);
  inputImage.drawTo(inputCanvas);
  
}

function resetImage(){
  var ctx = inputCanvas.getContext("2d");              ctx.clearRect(0,0,inputCanvas.width,inputCanvas.height)
  
  var ctx = outputCanvas.getContext("2d");              ctx.clearRect(0,0,outputCanvas.width,outputCanvas.height)
  
  inputImage = null;
  outputImage = null;
  inputCanvas.height = 300;
  inputCanvas.width = 500;
  outputCanvas.height = 300;
  outputCanvas.width = 500;
  
  var button = document.getElementById("inputImage");
  button.value="";
}

function resetFilters(){
  var ctx = outputCanvas.getContext("2d");              ctx.clearRect(0,0,outputCanvas.width,outputCanvas.height)
  outputCanvas.height = 300;
  outputCanvas.width = 500;
  outputImage = null;
}

function setup(r_multiplier,g_multiplier,b_multiplier){
  if (checkLoaded(inputImage)){
    if (checkLoaded(outputImage)){
      resetFilters()
    }
    outputImage = new SimpleImage(inputImage.getWidth(),inputImage.getHeight());
    for (pixel of inputImage.values()){
      var r = pixel.getRed();
      var g = pixel.getGreen();
      var b = pixel.getBlue();
      var avg = (r+g+b)/3;
      var outputPixel = outputImage.getPixel(pixel.getX(),pixel.getY());
      outputPixel.setRed(avg*r_multiplier);
      outputPixel.setGreen(avg*g_multiplier);
      outputPixel.setBlue(avg*b_multiplier);
    }
    outputImage.drawTo(outputCanvas);
  }
}

function blackWhite(){
  setup(1,1,1)  
}

function red(){
  setup(1,0,0);
}

function green(){
  setup(0,1,0);
}

function blue(){
  setup(0,0,1);
}

function majenta(){
  setup(1,0,1);
}


function flipH(){
  if (checkLoaded(inputImage)){
    if (checkLoaded(outputImage)){
      resetFilters()
    }
    outputImage = new SimpleImage(inputImage.getWidth(),inputImage.getHeight());
    var width = inputImage.getWidth();
    var height = inputImage.getHeight();
    for (var pixel of inputImage.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var newX = width-x-1;
      outputImage.setPixel(newX,y,pixel);
    }
    outputImage.drawTo(outputCanvas); 
  }
}

function flipV(){
  if (checkLoaded(inputImage)){
    if (checkLoaded(outputImage)){
      resetFilters()
    }
    outputImage = new SimpleImage(inputImage.getWidth(),inputImage.getHeight());
    var width = inputImage.getWidth();
    var height = inputImage.getHeight();
    for (var pixel of inputImage.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var newY = height-y-1;
      outputImage.setPixel(x,newY,pixel);  
    }
    outputImage.drawTo(outputCanvas); 
  }
}

function getCode(y,avg,height){
  var code = new Array(3);
  code[0] = 0;
  code[1] = 0;
  code[2] = 0;
  if (y<height/7){
      code[0] = 2;
  }else if(y<2*height/7){
      code[0] = 2;
      code[1] = 0.8;
  }else if(y<3*height/7){
      code[0] = 2;
      code[1] = 2;
  }else if(y<4*height/7){
      code[1] = 2;
  }else if(y<5*height/7){
      code[2] = 2;
  }else if(y<6*height/7){
      code[0] = 0.8;
      code[2] = 2;
  }else{
      code[0] = 1.6;
      code[2] = 1.6;
  }
  return(code)
}

function rainbow(){
  if (checkLoaded(inputImage)){
    if (checkLoaded(outputImage)){
      resetFilters()
    }
    outputImage = new SimpleImage(inputImage.getWidth(),inputImage.getHeight());
    var width = inputImage.getWidth();
    var height = inputImage.getHeight();
    for (pixel of inputImage.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var r = pixel.getRed();
      var g = pixel.getGreen();
      var b = pixel.getBlue();
      var avg = (r+g+b)/3;
      var outputPixel = outputImage.getPixel(pixel.getX(),pixel.getY());
      var colorCode = getCode(y,avg,height);
      outputPixel.setRed(avg*colorCode[0]);
      outputPixel.setGreen(avg*colorCode[1]);
      outputPixel.setBlue(avg*colorCode[2]);
    }
    outputImage.drawTo(outputCanvas);
  }
}

function blurr(){
  if (checkLoaded(inputImage)){
    if (checkLoaded(outputImage)){
      resetFilters()
    }
    outputImage = new SimpleImage(inputImage.getWidth(),inputImage.getHeight());
    var width = inputImage.getWidth();
    var height = inputImage.getHeight();
    for (var pixel of inputImage.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var range = document.getElementById("blurRange");
      var blurRange = range.value;
      var xOffset = x%blurRange;
      var yOffset = y%blurRange;
      outputImage.setPixel(x,y,inputImage.getPixel(x-xOffset,y-yOffset))
        
    }
    outputImage.drawTo(outputCanvas);
  }else{
    var range = document.getElementById("blurRange");
    range.value="0";
  }
}