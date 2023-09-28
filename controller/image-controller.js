import IM from 'node-magickwand';
import fs from 'fs';

const { Magick } = IM;

const box_blur_image_separable = (imageBlob, radius_x, radius_y) => {
    let image = new Magick.Image();
    image.read(imageBlob);
    let blurredImage = new Magick.Image();
    blurredImage.read(imageBlob);

    let kernel_x_size = 2 * radius_x + 1;
    let kernel_y_size = 2 * radius_y + 1;
    let kernel_area = kernel_x_size * kernel_y_size;
    let height = image.size().height();
    let width = image.size().width();

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r_total = 0, g_total = 0, b_total = 0;

            for (let offset_y = -radius_y; offset_y <= radius_y; offset_y++) {
                for (let offset_x = -radius_x; offset_x <= radius_x; offset_x++) {
                    let new_x = x + offset_x;
                    let new_y = y + offset_y;

                    if (0 <= new_x && new_x < width && 0 <= new_y && new_y < height) {
                        let pixel = image.pixelColor(new_x, new_y);

                        r_total += pixel.quantumRed();
                        g_total += pixel.quantumGreen();
                        b_total += pixel.quantumBlue();
                    }
                }
            }

            let r_avg = parseInt(r_total / kernel_area);
            let g_avg = parseInt(g_total / kernel_area);
            let b_avg = parseInt(b_total / kernel_area);

            blurredImage.pixelColor(x, y, new Magick.Color(r_avg, g_avg, b_avg));
        }
    }

    return blurredImage;
}

export const blurImage = (imageData, radius) => {
    let imageBlob = new Magick.Blob;
    imageBlob.base64(imageData);

    let image = new Magick.Image();
    image.read(imageBlob);

    image.gaussianBlur(parseFloat(radius), parseFloat(radius));
    image.write(imageBlob);

    return imageBlob.data();

    /*
    let image = box_blur_image_separable(imageBlob, radius, 0);
    image.write(imageBlob);
    image = box_blur_image_separable(imageBlob, 0, radius);
    image.write(imageBlob);

    return imageBlob.data();
    */
}

export const readFileImage = (path) => {
    return fs.readFileSync(path);
}

export const saveImage = (imageData) => {
    fs.writeFile("upload.png", imageData, 'binary', function (err) {
        if (err) throw err;
        console.log('File saved.');
        }
    )
}
