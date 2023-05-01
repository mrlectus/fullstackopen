import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Phone } from './mongo.js'


const app = express();
const port = process.env.PORT || 3001;


app.use(morgan('dev'));
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.get('/api/persons', async (_req, res) => {
  try {
    const result = await Phone.find({});
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/persons/:id', async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.id);
    if (phone) {
      res.status(200).json(phone);
    } else {
      res.status(404).json();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/persons', async (req, res) => {
  const book = req.body;
  if (book.name === undefined || book.number === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }

  try {
    const nameExists = await Phone.findOne({ name: book.name });
    if (nameExists) {
      return res.status(400).json({ error: 'name already exists' });
    }

    const numberExists = await Phone.findOne({ number: book.number });
    if (numberExists) {
      return res.status(400).json({ error: 'number already exists' });
    }

    const phone = new Phone({
      name: book.name,
      number: book.number,
    });
    const savedPhone = await phone.save();
    res.json(savedPhone);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'internal server error' });
  }
});

app.delete('/api/persons/:id', async (req, res) => {
  try {
    const result = await Phone.findByIdAndDelete(req.params.id);
    if (result === null) {
      return res.status(404).json({ error: 'phone not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.put('/api/persons/:id', async (req, res) => {
  try {
    const body = req.body;
    const phone = {
      name: body.name,
      number: body.number
    }
    const result = await Phone.findOneAndUpdate({ _id: req.params.id }, phone, { new: true });
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
