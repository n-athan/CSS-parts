<!DOCTYPE html>
<html>
<body>

<canvas id="myCanvas" width="200" height="100"
style="border:1px solid #c3c3c3;">
Your browser does not support the canvas element.
</canvas>

<script>
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var j = 100;
var i = 0;
while (i < 200) {
  ctx.fillStyle = `hsl(${j},50%,50%)`;
  ctx.fillRect(i, 0, i+50, 50);
  i = i + 50; 
  j = j + 25;
};

var j = 100;
var i = 0;
while (i < 200) {
  ctx.beginPath();
  ctx.fillStyle = `hsla(${j},50%,10%,0.5)`;
  ctx.arc(i+27, 27, 15, 0, 2 * Math.PI, false);
  ctx.fill();
  i = i + 50; 
  j = j + 25;
  };
  
var j = 100;
var i = 0;
while (i < 200) {
  ctx.beginPath();
  ctx.fillStyle = `hsl(${j},50%,70%)`;
  ctx.arc(i+25, 25, 15, 0, 2 * Math.PI, false);
  ctx.fill();
  i = i + 50; 
  j = j + 25;
  };
  

</script>

</body>
</html>

<!DOCTYPE html>
<html>
<body>

<canvas id="myCanvas" width="400" height="200"
style="border:1px solid #c3c3c3;">
Your browser does not support the canvas element.
</canvas>

<script>
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var width = 8;
var length = 32;
//var j = 100;
var i = 0;
var pixel = 1;
var line = 0;

while (pixel <= length) {
	if (i === width*50){
    	i = 0;
        line = line + 50;
    };
  var j =  Math.floor(Math.random()*360);
//shadow square
  ctx.fillStyle = `hsl(${j},50%,40%)`;
  ctx.fillRect(i, line, i+50, line+50);
//square
  ctx.fillStyle = `hsl(${j},50%,50%)`;
  ctx.fillRect(i+2, line+2, i+50, line+50);
//shadow top
  ctx.beginPath();
  ctx.fillStyle = `hsla(${j},50%,10%,0.5)`;
  ctx.arc(i+28, line+28, 15, 0, 2 * Math.PI, false);
  ctx.fill();
//top  
  ctx.beginPath();
  ctx.fillStyle = `hsl(${j},50%,60%)`;
  ctx.arc(i+25, line+25, 15, 0, 2 * Math.PI, false);
  ctx.fill();
//counters
  i = i + 50; 
  // j = j + 25;
  pixel = pixel + 1;
};
</script>

</body>
</html>
