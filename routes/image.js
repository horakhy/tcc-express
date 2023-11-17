import express from 'express'
import { readFileImage, saveImage } from '../controller/image-controller.js';

const router = express.Router();

router.get('/load-small-image', (req, res) => {
    const image = readFileImage('static/small-image.png');

    res.set('Content-Type', 'image/png');
    res.send(image);
})

router.get('/load-big-image', (req, res) => {
    const image = readFileImage('static/big-image.png');

    res.set('Content-Type', 'image/png');
    res.send(image);

})

router.post('/save-big-image', (req, res) => {
    saveImage(req.body);

    res.status(200).send();
})

export default router;