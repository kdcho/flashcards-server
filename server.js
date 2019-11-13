const mongoose = require('mongoose')
const Card = require('./models/Card')
const express = require('express')

mongoose.connect('mongodb://localhost:27017/flashcards', {
  useNewUrlParser: true
})

const app = express()
app.use(express.json())

app.listen(3334, () => console.log('Express ready'))

app.get('/cards', (req, res) => {
  Card.find()
    .then(card => res.json(card))
    .catch(err => res.end(err))
})

app.get('/cards/:id', (req, res) => {
  Card.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.json(err))
})

app.post('/cards', (req, res) => {
  Card.create(req.body)
    .then(card => res.json(card))
    .catch(err => res.json(err))

  /*   const card = new Card(req.body)
  card
    .save()
    .then(card => res.json(card))
    .catch(err => res.json(err)) */
})

app.patch('/cards/:id', (req, res) => {
  Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(card => res.json(card))
    .catch(err => res.json(err))
})

app.delete('/cards/:id', (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.json(err))
})
