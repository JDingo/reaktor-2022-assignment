const express = require('express')
const axios = require('axios')
const app = express()

const cors = require('cors')

app.use(cors({
  origin: 'https://jdingo.github.io'
}));

app.get('/rps/history', (req, res) => {
  axios.get(`https://bad-api-assignment.reaktor.com/rps/history/${req.query.cursor ? `?cursor=${req.query.cursor}` : ''}`).then(response => {
    res.json(response.data)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`)
})