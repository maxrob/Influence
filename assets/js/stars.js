/////////////////////////////////////////////////////////
//
//  Original code from jonathanhooker
//  http://codepen.io/jonathanhooker
//
/////////////////////////////////////////////////////////


var canvas = document.getElementsByClassName('dots')[0],
    context = canvas.getContext('2d');


var numDots = 2000,
    n = numDots,
    currDot,
    maxRad = 700,
    maxRad = 800,
    minRad = 10,
    radDiff = maxRad-minRad,
    dots = [],
    PI = Math.PI,
    centerPt = {x:0, y:0};

resizeHandler();
window.onresize = resizeHandler;


// Création des points
while(n--){
  currDot = {};
  currDot.radius = minRad+Math.random()*radDiff;
  currDot.ang = (1-Math.random()*2)*PI;
  currDot.speed = (1-Math.random()*2)*0.0006;
  currDot.intensity = Math.round(Math.random()*110);
  currDot.fillColor = "rgb("+currDot.intensity+","+currDot.intensity+","+currDot.intensity+")";
  dots.push(currDot);
}

// Affichage des points
function drawPoints(){
  n = numDots;
  var _centerPt = centerPt,
      _context = context,
      dX = 0,
      dY = 0;

  _context.clearRect(0, 0, canvas.width, canvas.height);

  // Dessine les points sur le canvas
  while(n--){
    currDot = dots[n];
    dX = _centerPt.x+Math.sin(currDot.ang)*currDot.radius;
    dY = _centerPt.y+Math.cos(currDot.ang)*currDot.radius;

    currDot.ang += currDot.speed;

      _context.fillStyle= currDot.fillColor;
//    _context.fillStyle= "rgb(237,251,255)";
    _context.fillRect(dX, dY, 1, 1);

  }
  window.requestAnimationFrame(drawPoints);
}

function resizeHandler(){
  var box = canvas.getBoundingClientRect();
  var w = box.width;
  var h = box.height;
  canvas.width = w;
  canvas.height = h;
  centerPt.x = Math.round(w/2);
  centerPt.y = Math.round(h/2);
}

drawPoints();

