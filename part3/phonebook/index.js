const express = require('express');
const app = express();

const persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post('/api/persons', express.json(), (req, res) => {
  const { name, number } = req.body;    
  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }
  if (persons.find(p => p.name.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  const newPerson = {
    id: Math.random() * 1000000,
    name,
    number
  };
  persons.push(newPerson);
  res.status(201).json(newPerson);
});


app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    persons.splice(persons.indexOf(person), 1);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

app.get('/info', (req, res) => {
  res.send(`<p> Phonebook has info for ${persons.length} people</p><p> ${new Date()}</p>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
