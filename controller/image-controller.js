import imageMagick from 'imagemagick'
import fs from 'fs'

export const handleImage = (imageData) => {
    const width = 720;
    const height = 713;

    // const outputData = new imageMagick.convert(imageData.length);
    // const outputData = new Uint8ClampedArray(imageData.length);
    const outputData = imageData;

    
    // features = imageMagick.identify([imageData])
    // const image = new Image(imageData)

    console.log(imageData.length)
    // console.log(image)
    // console.log(typeof imageData)

    const radius = 5 
    const halfRadius = Math.floor(radius / 2);
    const kernelSize = radius * radius;
  
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let rSum = 0, gSum = 0, bSum = 0;
            for (let dy = -halfRadius; dy <= halfRadius; dy++) {
                for (let dx = -halfRadius; dx <= halfRadius; dx++) {
                    const offsetY = y + dy;
                    const offsetX = x + dx;

                    if (offsetY >= 0 && offsetY < height && offsetX >= 0 && offsetX < width) {
                        const index = (offsetY * width + offsetX) * 4;
                        rSum += imageData[index];
                        gSum += imageData[index + 1];
                        bSum += imageData[index + 2];
                    }
                }
            }

            const currentIndex = (y * width + x) * 4;
            outputData[currentIndex] = Math.floor(rSum / kernelSize);
            outputData[currentIndex + 1] = Math.floor(gSum / kernelSize);
            outputData[currentIndex + 2] = Math.floor(bSum / kernelSize);
            outputData[currentIndex + 3] = imageData[currentIndex + 3];  // Alpha channel
        }
    }

    return outputData;
}


export const readFileImage = (path) => {
    
    return fs.readFileSync(path)
}

// export const getImageFromFile = (path) => {
    
//     // return fs.readFileSync(path, {encoding: 'utf8' })
//     return fs.readFile(path, (err, data)=>{
//         // error handle
//         if(err) {
//             throw err;
//         }
        
//         // get image file extension name
//         const extensionName = path.extname(path);
        
//         // convert image file to base64-encoded string
//         const base64Image = Buffer.from(data, 'binary').toString('base64');
        
//         // combine all strings
//         const base64ImageStr = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
//     })
// }


