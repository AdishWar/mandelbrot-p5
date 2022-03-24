

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
    colorMode(HSB);

    // good zoom locations here:
    // http://www.cuug.ab.ca/dewara/mandelbrot/Mandelbrowser.html

    locations = [
        [-2, -2, 4],
        [-0.7453, 0.1127, 0.00065],
        [-0.7463, 0.1102, 0.005],    // spiral
        [-0.74529, 0.113075, 0.00015],
        [-0.745428, 0.113009, .00003],   // x 
        [-0.925, 0.266, 0.032],         // lightning with part of cardiod
        [-1.25066, 0.02012, 0.00017],   // julia set lookalike
        [-0.748, 0.1, 0.0014],      // circular spider-web
        [-0.235125, 0.827215, .00004]  // lightning arm
    ];

    // select index of values from locations list
    selection = 0;
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

            astart = locations[selection][0];
            bstart = locations[selection][1];
            range = locations[selection][2];

            // mapping values from canvas width & height down to between -2 and 2
            // c = a + ib
            // amin = astart;
            // amax = astart + range;
            a = map(x, 0, width, astart, astart + range);

            // calculating b's range automatically so that plot doesnt get distorted lmao.
            // lena = amax- amin;
            // lenb = lena * (height/width);
            // bmin = -lenb/2;
            // bmax = lenb/2;
            // b = map(y, 0, height, bmin, bmax);
            b = map(y, 0, height, bstart, bstart + range);

            // storign original values since the real values of a abd b keep updating at every iteration
            oa = a;
            ob = b;

            // starting at z = 0
            z = 0;

            while(n < maxIter) {
                // real and imag components of squared(a + ib)
                re = a*a - b*b;
                im = 2 * a * b;

                // (a + ib) = (a + ib)^2 + (original a + original ib)
                a = re + oa;
                b = im + ob;

                if((a+b) > 16) {
                    break;
                }
                n++;
            }

            bright = map(n, 0, maxIter, 0, 1);

            // for RGB
            bright = map(sqrt(bright), 0, 1, 0, 255);

            // for HSB
            // bright = map(sqrt(bright), 0, 1, 0, 100);
            
            // if(n == 100) {
            //     bright = 255;
            // }

            if (n == maxIter) {
                bright = 0;
                pixel(x,y, [ 0, 0, 0 ] );
            }
            else {
                // color scheme for RGB
                pixel(x,y, [bright,bright,bright]);

                // color scheme for HSB
                // pixel(x,y, [ bright, 255, 255 ] );
            }
        }
    }

    updatePixels();
}

