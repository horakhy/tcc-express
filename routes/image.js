import express from 'express'
import { readFileImage, saveImage } from '../controller/image-controller.js';

const router = express.Router();

router.post('/save-big-image', (req, res) => {
    saveImage(req.body);

    res.status(200).send();
})

export default router;