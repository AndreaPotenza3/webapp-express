const express = require('express')
const app = express()
const port = 3000
const movieRouter = require('./routers/movieRouter.js')
const notFound = require('./middlewares/notFound.js')
const errorsHandler = require('./middlewares/errorsHandler.js')
const cors = require('cors')

app.use(cors())

app.use(express.json())

app.use(express.static('public'))

app.get('/', (_, res) => {
    res.send('server on')
})

app.use('/movies', movieRouter)

app.use(express.static('public'))

app.use(errorsHandler)

app.use(notFound)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})