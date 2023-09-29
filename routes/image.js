import express from 'express'
import { readFileImage, saveImage, blurImage } from '../controller/image-controller.js';

const router = express.Router();

router.post('/blur', (req, res) => {
    if (!req.body || !Buffer.isBuffer(req.body)) {
        return res.status(400).json({ error: 'Invalid image data' });
    }
    const radius = req.query.radius;

    if (!radius || isNaN(radius) || radius < 0) {
        return res.status(400).json({ error: 'Invalid radius' });
    }

    const imageData = blurImage(req.body.toString('base64'), radius);

    res.set('Content-Type', 'image/png');
    res.send(imageData);
})

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

    res.status(200).send({ status: '200' });
  })

export default router;