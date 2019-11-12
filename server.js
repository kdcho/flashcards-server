const fs = require('fs')
const express = require('express')
const uid = require('uid')

let cards = require('./cards.json')

function reloadFile(cards, res, output) {
  fs.writeFile('./cards.json', JSON.stringify(cards, null, 2), err => {
    if (err) {
      res.end('Error: could not write file.')
    } else {
      res.json(output)
    }
  })
}

const app = express()
app.use(express.json())

app.listen(3334, () => console.log('Express ready'))

app.get('/cards', (req, res) => {
  res.json(cards)
})

app.get('/cards/:id', (req, res) => {
  const id = req.params.id
  card = cards.find(card => card.id === id)
  res.json(card)
})

app.post('/cards', (req, res) => {
  const newCard = { ...req.body, id: uid() }
  cards = [newCard, ...cards]
  reloadFile(cards, res, newCard)
})

app.patch('/cards/:id', (req, res) => {
  index = cards.findIndex(card => card.id === req.params.id)
  card = { ...cards[index], ...req.body }
  cards[index] = card
  reloadFile(cards, res, card)
})

app.delete('/cards/:id', (req, res) => {
  const id = req.params.id
  index = cards.findIndex(card => card.id === id)
  cards = cards.filter(card => card.id !== id)
  reloadFile(cards, res, cards[index])
})
