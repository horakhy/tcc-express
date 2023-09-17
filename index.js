import express from 'express'
import bodyParser from 'body-parser'
import imageRoutes from './routes/image.js'

const app = express();
const PORT = 5000;

app.use(bodyParser.raw({
    type: "image/png",
    limit: '50mb'
}));

// app.use(express.raw({type: 'application/octet-stream'}))

app.use('/image', imageRoutes);

app.get('/', (req, res) => res.send("Hello it's a me"));

app.listen(PORT, () => console.log("BRUHHH, it's live in:", PORT));