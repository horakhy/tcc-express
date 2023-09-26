import IM from 'node-magickwand';
import fs from 'fs';

const { Magick } = IM;

const box_blur_image_separable = (imageData, radius_x, radius_y) => {
    const blob = new Magick.Blob;
    let image = new Magick.Image();
    blob.base64(imageData);
    image.read(blob);
    let blurredImage = image.clone(image);

    let kernel_x_size = 2 * radius_x + 1;
    let kernel_y_size = 2 * radius_y + 1;
    let kernel_area = kernel_x_size * kernel_y_size;

    for (let y = 0; y < image.size().height(); y++) {
        for (let x = 0; x < image.size().width(); x++) {
            let r_total = 0, g_total = 0, b_total = 0;

            for (let offset_y = -radius_y; offset_y < radius_y + 1; offset_y++) {
                for (let offset_x = -radius_x; offset_x < radius_x + 1; offset_x++) {
                    let new_x = x + offset_x;
                    let new_y = y + offset_y;

                    if (0 <= new_x && new_x < image.size().width() && 0 <= new_y && new_y < image.size().height()) {
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
    let image = box_blur_image_separable(imageData, radius, 0);
    let blob = new Magick.Blob;
    image.write(blob);
    image = box_blur_image_separable(blob.base64(), 0, radius);
    image.write(blob);

    return blob.data();
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
