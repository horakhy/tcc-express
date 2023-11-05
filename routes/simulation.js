import express, { json } from 'express'
import protobuf from 'protobufjs';

const router = express.Router();

const root = await protobuf.load('person.proto');
const Person = root.lookupType('Person');

router.get('/harmonic-progression', (req, res) => {
    const n = req.query.n;

    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += 1 / i;
    }

    res.json(sum);
})

router.post('/json', express.json(), (req, res) => {
    const person = req.body;
    res.send(person)
})

router.post('/protobuf', express.text({ type: 'application/protobuf' }), (req, res) => {
    const personRequest = Person.decode(Buffer.from(req.body));

    const response = Person.encode(personRequest).finish();
    res.send(response);
})

export default router;