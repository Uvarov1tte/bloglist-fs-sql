require('dotenv').config()
const express = require('express')
const { Sequelize } = require('sequelize')
const blogsRouter = require('./controllers/blogs')
const app = express()
require('./postgres/postgres_init')

app.use(express.json())

app.use('/blogs', blogsRouter)

app.get('/', (req, res) => {
    console.log('hello')
    res.send({ msg: 'hello' })
})

module.exports = app
