const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())
morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :response-time ms :body'))
app.use(express.static('build'))

let counter = 0

app.get('/api/persons',async (req, res) => {
  const fetchPeople = await Person.find({})
  return res.status(200).send(fetchPeople)
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

app.post('/api/persons', async (req, res) => {
  const existingPerson = await Person.findOne({name: req.body.name})
  const {name, number} = req.body
  if (existingPerson) {
    return res.status(400).send({
      info: "Person already exist"
    })
  }
  if (!name || !number) {
    return res.status(400).send({
      info: "Field must not be empty"
    })
  }
  const person = new Person({
    name,
    number
  })

  await person.save()

  return res.status(200).send(person)
})



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})