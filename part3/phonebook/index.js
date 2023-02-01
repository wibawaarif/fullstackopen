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


const errorHandler = (error, request, response, next) => {
  console.error('error middleware', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.get('/api/persons',async (req, res) => {
  const fetchPeople = await Person.find({})
  return res.status(200).send(fetchPeople)
})

app.get('/info', async (req, res) => {
  const getAllData = await Person.find({})
  const now = new Date()
  res.status(200).send(`Phonebook has ${getAllData.length} people <br/> <br/> ${now}`)
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const findId = await Person.findById(req.params.id)
    if (!findId) {
      return res.status(404).send('Id not found')
    }
    return res.status(200).send(findId)
  } catch(err) {
    next(err)
  }

})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', async (req, res, next) => {

  if (!req.body.name || !req.body.number) {
    return res.status(400).send({
      info: "Field must not be empty"
    })
  }

  const existingPerson = await Person.findOne({name: req.body.name})

  if (existingPerson) {
    return res.status(400).send({
      info: "Person already exist"
    })
  }

  if (req.body.number[2] !== '-' &&  req.body.number[3] !== '-' || req.body.number[2] === '-' && req.body.number[3] === '-') {
    return res.status(400).send({
      error: "Invalid number"
    })
  }
  try {
    const person = new Person({
      name: req.body.name,
      number: req.body.number
    })
  
    await person.save()
  
    return res.status(200).send(person)
  } catch(err) {
    next(err)
  }

  
})


app.use(errorHandler)


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})