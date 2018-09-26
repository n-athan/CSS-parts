// function to make random integer in range
const rnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
// create a random color in hsl
function base(h,s,l) {
    return(`hsl(${h},${s}%,${l}%)`);
};
//Create a canvas to place a pixelated image on. 
//https://codepen.io/jakealbaugh/post/canvas-image-pixel-manipulation 

function initContext()
{
    var canvas = document.createElement("canvas");
    canvas.width  = 300;
    canvas.height = 300;
    document.body.appendChild(canvas);
   var context = canvas.getContext('2d');
   return context;
}

function loadImage(context)
{
    var imageObj = new Image();
    imageObj.onload = function()
    {
        var pixelation = 35;
        var fw = (imageObj.width / pixelation)|0,
        fh = (imageObj.height / pixelation)|0;
        context.imageSmoothingEnabled =
        context.mozImageSmoothingEnabled =
        context.msImageSmoothingEnabled =
        context.webkitImageSmoothingEnabled = false;
        context.drawImage(imageObj, 0, 0, fw, fh);
        var imageData = context.getImageData(0,0,fw,fh);
        brickify(imageData,fw);
    };
    imageObj.src = 'eifeltoren.jpg';
    return imageObj;
}
var context = initContext();
var imageObj = loadImage(context);

function brickify(imageData,fw) {
    var data = imageData.data;
    var colors = [];
    for(var i = 0, loop = data.length; i < loop; i += 4) {
      var color = {
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
        a: data[i + 3]
      };
      colors.push(color);
    }
    
    //convert pixel colors to hsl
    var colorsHSL = [];
    for (i in colors) {
        var pixel = colors[i];
        var hsl = rgbToHsl(pixel['r'],pixel['g'],pixel['b'])
        colorsHSL.push(hsl);
    };

    var grid = document.getElementsByTagName("main")[0];
    var column = `repeat(${fw}, 25px)`
    grid.style.gridTemplateColumns = column;
    for (i in colorsHSL) {
        var pixel = colorsHSL[i];
        var h = pixel[0];
        var s = pixel[1];
        var l = pixel[2];
        grid.insertAdjacentHTML('beforeend',`<div class="block" style="background-color: ${base(h,s,l)}; border-color: ${base(h,s,(l-20))};"><div class="shadow"><div class="circle" style="background-color: ${base(h,s,(l+10))};color: ${base(h,s,l)} "><i>html</i></div></div></div>`);
    };
};  

// Sources:
// Pixelate image by shrinking it and blowing it back up. 
// https://jsfiddle.net/fedek6/NgwP2/
// Get color data of each pixel in the pixelated image
// https://codepen.io/jakealbaugh/post/canvas-image-pixel-manipulation 
// Convert rgb color to hsl
// http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
// https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
// https://stackoverflow.com/questions/32279288/getimagedata-returning-all-zeros

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    };

    return [h, (s*100), (l*100)];
};

// Testing function. Fill grid with a random (max 64) number of bricks with random colors. 
function fill() {
    var num = rnd(1,64);
    var i = 0;
    var num = 624;
    var grid = document.getElementsByTagName("main")[0];
    var column = `repeat(25, 25px)`
    grid.style.gridTemplateColumns = column;
    while (i <= num) {
        var h = rnd(0,360);
        var s = rnd(0,100);
        var l = rnd(0,100);
        grid.insertAdjacentHTML('beforeend',`<div class="block" style="background-color: ${base(h,s,l)}; border-color: ${base(h,s,(l-20))};"><div class="shadow"><div class="circle" style="background-color: ${base(h,s,l+10)};color: ${base(h,s,l)} "><i>html</i></div></div></div>`);
        i = i + 1;
    };
};  
// fill();