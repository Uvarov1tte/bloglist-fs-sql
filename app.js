const express = require('express')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const app = express()

app.use(express.json())

app.use('/blogs', blogsRouter)

app.get('/', (req, res) => {
    console.log('hello')
    res.send({ msg: 'hello' })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
