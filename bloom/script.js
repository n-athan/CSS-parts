var canvas = document.querySelector("canvas");
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

//background
ctx.fillStyle = "rgb(21, 6, 63)";
ctx.fillRect(0, 0, width, height);

//center
cx = width/2;
cy = height/2;

r = 200;
rh = 50;
hue = 0;
var f = 0;
var fh = 0;

function arm(cx,cy,r, f) {
    var x_ = cx + Math.cos(f) * r;
    var y_ = cy + Math.sin(f) * r;
    //original nice
    // var x_ = cx + Math.cos(f) * r;
    // var y_ = cy + Math.sin(f) * r;
    //    f += 1.6241/Math.PI;
    //    fh += Math.PI/200;
    return {
        x: x_,
        y: y_
    };
}

function hand() {
    var a = arm(cx,cy,r,f);
    // var x_ = a.x + Math.cos(fh) * rh;
    // var y_ = a.y + Math.sin(fh)*Math.sin(fh) * rh;
    //very cool one
    // var x_ = a.x + Math.cos(fh)*Math.cos(fh) * rh;
    // var y_ = a.y + Math.sin(fh) * rh; 
    //    f += 1.6241/Math.PI;
    //    fh += Math.PI/200;
    //original nice
    var x_ = a.x + Math.cos(fh) * rh;
    var y_ = a.y + Math.sin(fh) * rh;
    //    f += 1.6241/Math.PI;
    //    fh += Math.PI/200;
    
    return {
        x: x_,
        y: y_
    };
}

function animate() {
    requestAnimationFrame(animate);
    // drawArm();
    drawHand();
    hue ++;
    // f += Math.PI/200;
    // fh +=  Math.PI/100;
    if (f === 0){
        f += 0.001;
    }
       f += 1.6241/Math.PI;
       fh += Math.PI/200;

    // f += Math.PI/200 + (f - Math.floor(f))*0.01;
    // fh +=  Math.PI/100;
}

function drawArm() {
    var a = arm(cx,cy,r,f);
    ctx.beginPath(); 
    ctx.arc(a.x, a.y, 1, 0, 2 * Math.PI, true); 
    ctx.fillStyle = "hsl(100,100%,100%)";
    ctx.fill();    
}

function drawHand() {
    var h = hand();
    ctx.beginPath(); 
    ctx.arc(h.x, h.y, 2, 0, 2 * Math.PI, true); 
    ctx.fillStyle = `hsla(${hue},50%,70%,0.5)`;
    ctx.fill();    
}

animate();
