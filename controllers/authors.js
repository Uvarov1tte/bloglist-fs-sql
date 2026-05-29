const authorsRouter = require('express').Router()
const { sequelize } = require('../utils/db')
const { Blog } = require('../models')

authorsRouter.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        group: 'author',
        attributes: ['author',
            [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
        ],
        order: sequelize.literal('likes DESC'),
    });
    console.log(authors.map(n => n.toJSON()))
    res.json(authors)
})

module.exports = authorsRouter
