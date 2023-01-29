const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :response-time ms :body'))
app.use(express.static('build'))
let counter = 0

const Persons = [
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
]

app.get('/api/persons', (req, res) => {
  res.status(200).send(Persons)
})

app.get('/info', (req, res) => {
  counter+=1
  const now = new Date()
  res.status(200).send(`Phonebook has info for ${counter} people test <br/> <br/> ${now}`)
})

app.get('/api/persons/:id', (req, res) => {
  const findId = Persons.find(x => x.id === Number(req.params.id))
  if (!findId) {
    return res.status(404).send('Id not found')
  }
  return res.status(200).send(findId)
})

app.delete('/api/persons/:id', (req, res) => {
  const findId = Persons.filter(x => x.id !== Number(req.params.id))

  if (!findId) {
    return res.status(404).send('Id not found')
  }
  return res.status(200).send(findId)
})

app.post('/api/persons', (req, res) => {
  const existingPerson = Persons.find(x => x.name === req.body.name)
  if (existingPerson) {
    return res.status(400).send({
      error: "name must be unique"
    })
  }
  if (!req.body.name || !req.body.number) {
    return res.status(400).send({
      error: "name or number cannot empty"
    })
  }

  const newPerson = {
    id: Math.floor(Math.random() * 100) + 4,
    name: req.body.name,
    number: req.body.number
  }
  Persons.push(newPerson)

  return res.status(200).send(Persons)
})



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})