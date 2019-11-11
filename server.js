const express = require('express')
const uid = require('uid')

const app = express()
app.use(express.json())
let cards = require('./cards.json').map(card => ({ ...card, id: uid() }))

app.listen(3334, () => console.log('Express ready'))

app.get('/cards', (req, res) => {
  res.json(cards)
})

app.get('/cards/:id', (req, res) => {
  const id = req.params.id
  /*   index = cards.findIndex(card => card.id === id)
  res.json(cards[index]) */
  card = cards.find(card => card.id === id)
  res.json(card)
})

app.post('/cards', (req, res) => {
  const newCard = { ...req.body, id: uid() }
  //cards.unshift(newCard)
  cards = [newCard, ...cards]
  res.json(newCard)
})

app.patch('/cards/:id', (req, res) => {
  const patch = req.body
  index = cards.findIndex(card => card.id === req.params.id)
  card = { ...cards[index], ...patch }
  cards[index] = card
  res.json(card)
})

app.delete('/cards/:id', (req, res) => {
  const id = req.params.id
  index = cards.findIndex(card => card.id === id)
  cards = cards.filter(card => card.id !== id)
  res.json(cards[index])
})
