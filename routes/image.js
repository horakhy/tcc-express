import express from 'express'
import { readFileImage } from '../controller/image-controller.js';
import multer from 'multer'
import imageMagick from 'imagemagick'

const router = express.Router();
// const upload = multer({dest: 'facade/images'})

// All routes in here start with /image
router.post('/blur', (req, res) => {
    console.log(req.body)
    console.log(typeof req.body)

    if (!req.body || !Buffer.isBuffer(req.body)) {
        return res.status(400).json({ error: 'Invalid image data' });
    }
    // const imageData = handleImage(req.body)

    // Convert the binary image data to a Buffer

    // const imageBuffer = Buffer.from(imageData, 'binary');

    // Set the appropriate headers for the image response
    res.set('Content-Type', 'image/png'); // Adjust content type based on your image format

    // Send the image buffer as the response
    res.send(req.body);

})

router.get('/small-image', (req, res) => {

    const image = readFileImage('static/small-image.png')
    res.set('Content-Type', 'image/png');

    res.send(image)

})

router.get('/big-image', (req, res) => {
    
    const image = readFileImage('static/big-image.png')
    res.set('Content-Type', 'image/png');

    res.send(image)

})

export default router;