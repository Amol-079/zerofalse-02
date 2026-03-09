import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {

  res.json({ message: 'Backend running' })

})

app.listen(4000, () => {

  console.log('Backend listening on port 4000')

})