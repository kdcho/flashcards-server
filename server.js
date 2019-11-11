const express = require('express')
const uid = require('uid')

const app = express()
let cards = require('./cards.json').map(card => ({ ...card, id: uid() }))

app.listen(3334, () => console.log('Express ready'))

app.get('/cards', (req, res) => {
  res.json(cards)
})

app.delete('/cards/:id', (req, res) => {
  const id = req.params.id
  index = cards.findIndex(card => card.id === id)
  cards = cards.filter(card => card.id !== id)
  res.json(cards[index])
})
