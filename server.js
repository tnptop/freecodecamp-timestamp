'use strict'
const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/timestamp/:date_string?', (req, res, next) => {
  const { date_string } = req.params
  const isCurrent = typeof date_string === 'undefined'
  const isTimestamp = isCurrent ? true : date_string.match(/\D/g) === null
  const date = isCurrent ? new Date() :
    isTimestamp ? new Date(parseInt(date_string)) :
      new Date(date_string)
  
  const isValid = date.toString() !== 'Invalid Date'
  let response = isValid ?
    { unix: date.getTime(), utc: date.toUTCString() } :
    { error: 'Invalid Date' }
  
  res.json(response)
})

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})