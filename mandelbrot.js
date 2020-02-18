

function setup() {
    //pixelDensity(1);
    // createCanvas(windowHeight,windowHeight);
    createCanvas(windowWidth,windowWidth);
    // createCanvas(screen.width, screen.height);
    // createCanvas(650,650);
    // createCanvas(360,360);
    pixelDensity(1);
    noStroke();
    // background('blue');
    noLoop();

}

function pixel(i, j, color) {
    p = (i + j * width ) * 4;

    pixels[p + 0] = color[0];
    pixels[p + 1] = color[1];
    pixels[p + 2] = color[2];
    pixels[p + 3] = 255;
}

function draw() {

    loadPixels();
    maxIter = 100;

    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            n = 0;

            // mapping values from canvas width & height down to between -2 and 2
            a = map(x, 0, width, -2, 2);
            b = map(y, 0, height, -2, 2);

            oa = a;
            ob = b;

            z = 0;

            while(n < maxIter) {

                aa = a*a - b*b;
                bb = 2 * a * b;

                a = aa + oa;
                b = bb + ob;

                if((a+b) > 16) {
                    break;
                }
                n++;
            }

            bright = map(n, 0, maxIter, 0, 1);
            bright = map(sqrt(bright), 0, 1, 0, 255);
            
            // if(n == 100) {
            //     bright = 255;
            // }

            if (n == maxIter) {
                bright = 0;
            }

            pixel(x,y, [bright,bright,bright]);
        }
    }

    updatePixels();
}

