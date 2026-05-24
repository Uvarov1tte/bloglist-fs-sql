const express = require('express')
const blogsRouter = require('./controllers/blogs')
const app = express()

app.use(express.json())

app.use('/blogs', blogsRouter)

app.get('/', (req, res) => {
    console.log('hello')
    res.send({ msg: 'hello' })
})

module.exports = app
