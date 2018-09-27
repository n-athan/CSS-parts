//input from controls
var pix = document.getElementById("pix");
var pixOutput = document.getElementById("demo");
// pixValue.innerHTML = slider.value; 

// Update the current slider value (each time you drag the slider handle)
pix.oninput = function() {
    // pixOutput.innerHTML = this.value;
    pixValue = this.value;
    var imageObj = loadImage(context,pixValue,source);
} 

var source = 'fly.jpg';
// var pixValue = 30;
var context = initContext();


// hsl values to css-hsl
function base(h,s,l) {
    return(`hsl(${h},${s}%,${l}%)`);
};

//initialize
function initContext() {
    var canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;
    document.body.getElementsByTagName('main')[0].appendChild(canvas);
    var context = canvas.getContext('2d');
    return context;
}; 

//load image
function loadImage(context,pix,source) {
    var imageObj = new Image();
    imageObj.onload = function() {
        var fw = (imageObj.width / pix)|0,
        fh = (imageObj.height / pix)|0;
        disableSmoothing(context);
        context.drawImage(imageObj, 0, 0, fw, fh);
        var imageData = context.getImageData(0,0,fw,fh);
        document.getElementsByTagName('canvas')[0].width = `${fw*50}`;
        document.getElementsByTagName('canvas')[0].height = `${fh*50}`;
        brickify(imageData,fw);
    };
    imageObj.src = source;
    return imageObj;
};

//to get actual square pixels
function disableSmoothing() {
    context.imageSmoothingEnabled =
            context.mozImageSmoothingEnabled =
            context.msImageSmoothingEnabled =
            context.webkitImageSmoothingEnabled = false;
};

//pixelcolor to HSL
function dataToHsl(imageData) {   
    var data = imageData.data;
    var colors = [];
    for(var i = 0; i < data.length; i += 4) {
    var color = rgbToHsl(data[i], data[i + 1], data[i + 2])
    colors.push(color);
    }
    return colors;
};

function brickify(imageData,fw) {
    var colors = dataToHsl(imageData);
    var length = colors.length;
    //loop through all pixels
    for (var p = 0, i = 0, line = 0; p < length; p++) {
        var c = colors[p];
        var h = c[0];
        var s = c[1];
        var l = c[2];

        if (i === fw*50){
            i = 0;
            line = line + 50;
        }

        //shadow square
        context.fillStyle = base(h,s,(l-20));
        context.fillRect(i, line, i+50, line+50);
        //square
        context.fillStyle = base(h,s,l);
        context.fillRect(i+2, line+2, i+50, line+50);
        //shadow top
        context.beginPath();
        context.fillStyle = base(h,s,(l-30));
        context.arc(i+28, line+28, 18, 0, 2 * Math.PI, false);
        context.fill();
        //top  
        context.beginPath();
        context.fillStyle = base(h,s,l+10);
        context.arc(i+25, line+25, 18, 0, 2 * Math.PI, false);
        context.fill();
        //logo
        context.font = "italic 0.7em Ubuntu";
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.strokeStyle = base(h,s,l);
        context.strokeText("LOGO",i+25,line+25);
        //counter
        i += 50;
    };
};  

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 505] and
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