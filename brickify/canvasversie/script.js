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
    canvas.width = 800;
    canvas.height = 800;
    document.body.appendChild(canvas);
   var context = canvas.getContext('2d');
   return context;
}

// context.width = imageObj.width;
// context.height = imageObj.height;


function loadImage(context)
{
    var imageObj = new Image();
    imageObj.onload = function()
    {
        var pixelation = 30;
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
    imageObj.src = 'fly.jpg';
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

    var length = colorsHSL.length;
    var i = 0;
    var pixel = 1;
    var line = 0;
    

    for (var pixel = 1;pixel <= length;pixel++) {
        var c = colorsHSL[pixel];
        var h = c[0];
        var s = c[1];
        var l = c[2];
        if (i === fw*25){
            i = 0;
            line = line + 25;
        };
        //shadow square
        context.fillStyle = base(h,s,(l-20));
        context.fillRect(i, line, i+25, line+25);
        //square
        context.fillStyle = base(h,s,l);
        context.fillRect(i+1, line+1, i+25, line+25);
        //shadow top
        context.beginPath();
        context.fillStyle = base(h,s,(l-30));
        context.arc(i+14, line+15, 9, 0, 2 * Math.PI, false);
        context.fill();
        //top  
        context.beginPath();
        context.fillStyle = base(h,s,l+10);
        context.arc(i+12.5, line+12.5, 9, 0, 2 * Math.PI, false);
        context.fill();
        //logo
        context.font = "italic 0.45em Ubuntu";
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.strokeStyle = base(h,s,l);
        context.strokeText("logo",i+12.5,line+12.5);
        //counter
        i += 25;
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
// https://css-tricks.com/hsl-hsla-is-great-for-programmatic-color-control/

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