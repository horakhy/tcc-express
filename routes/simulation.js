import express from 'express'

const router = express.Router();

router.get('/harmonic-progression', (req, res) => {
    const n = req.query.n;

    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += 1 / i;
    }

    res.json(sum);
})

router.get('/json', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
})

export default router;