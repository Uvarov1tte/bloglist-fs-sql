const resetRouter = require('express').Router()
const { sequelize } = require('../utils/db')
const { Blog, User } = require('../models')

resetRouter.post('/', (req, res) => {
    sequelize.truncate({ cascade: true, restartIdentity: true })
    res.status(201).send({ msg: 'ok' })
})

module.exports = resetRouter