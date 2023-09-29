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
app.use('/static', express.static(__dirname + '/static'));

app.use('/image', imageRoutes);

app.get('/status/ok', (req, res) => res.status(200).send({status: '200'}));

app.listen(PORT, () => console.log("Express running on port ", PORT));