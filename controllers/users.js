const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { Blog, User } = require('../models')
const { tokenExtractor } = require('../utils/middleware')


usersRouter.get('/', async (req, res, next) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: {
                exclude: ['userId']
            }
        }
    })
    res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body
    if (password.length < 3) {
        res.status(400).json({ error: "password too short" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    try {
        const user = await User.create({
            username,
            name,
            passwordHash,
        })

        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
})

usersRouter.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

usersRouter.put('/:username', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    try {
        user.name = req.body.name
        await user.save()
        res.json(user)
    } catch (err) {
        next(err)
    }
})

module.exports = usersRouter