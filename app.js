const express = require('express')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const resetRouter = require('./controllers/reset')
const middleware = require('./utils/middleware')
const app = express()

app.use(express.json())

app.use('/api/reset', resetRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)

app.get('/', (req, res) => {
    console.log('hello')
    res.status(200).send({ msg: 'hello' })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
