import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  }
]
app.get('/', (_, res) => {
  res.send('Hello from API!');
});

app.get('/api/notes', (_, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(note => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
});

app.use(express.json());

app.post('/api/notes', (req, res) => {
  const id = notes.length > 0? Math.max(...notes.map(note => note.id)) : 0;
  const note = req.body;
  note.date = new Date().toISOString();
  note.id = id + 1;
  notes = [...notes, note];
  res.json(note);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
