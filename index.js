import express from 'express'
import bodyParser from 'body-parser'
import imageRoutes from './routes/image.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(bodyParser.raw({
    type: "image/png",
    limit: '50mb'
}));

// app.use('/img', express.static(__dirname + '/static'));

// app.use(express.raw({type: 'application/octet-stream'}))

app.use('/image', imageRoutes);

app.get('/', (req, res) => res.send("Hello it's a me"));

app.listen(PORT, () => console.log("BRUHHH, it's live in:", PORT));