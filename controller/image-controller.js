import fs from 'fs';

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
