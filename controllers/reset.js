const resetRouter = require('express').Router()
const { sequelize } = require('../utils/db')
const { Blog, User } = require('../models')

resetRouter.post('/', (req, res) => {
    Blog.truncate()
    User.truncate()
    res.status(201).send({ msg: 'ok' })
})

module.exports = resetRouter