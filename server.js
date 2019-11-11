const http = require('http')
//const express = require('express')
const uid = require('uid')
let cards = require('./cards.json').map(card => ({ ...card, id: uid() }))

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'application/json charset: utf-8'
  })

  id = req.url.replace('/cards/', '')
  index = cards.findIndex(card => card.id === id)
  cards = cards.filter(card => card.id !== id)

  res.end(
    req.url === '/cards' && req.method === 'GET'
      ? JSON.stringify(cards)
      : JSON.stringify(cards[index])
  )

  res.statusCode = 404
})

server.listen(3333)
