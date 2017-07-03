const q = require('q')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const async = require('async')
const express = require('express')
const bodyParser = require('body-parser')
const address = '127.0.0.1'
const app = express()
const port = 7000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({limit: '10mb'}))

app.get('/api/test', (req, res) => {
  res.json({ message: 'API Testing here' })
})

var listener = app.listen(port, address, () => {
  console.log('API running on: ' + listener.address().address+':'+listener.address().port)
})
