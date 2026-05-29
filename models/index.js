const Blog = require('./blog')
const User = require('./user')

const syncModels = async ()=>{
    await User.sync()
    await Blog.sync()

    User.hasMany(Blog)
    Blog.belongsTo(User)

    User.sync({ alter: true })
    Blog.sync({ alter: true })
}
// User.sync({ alter: true })
// Blog.sync({ alter: true })

// User.hasMany(Blog)
// Blog.belongsTo(User)

// User.sync({ alter: true })
// Blog.sync({ alter: true })

syncModels()

module.exports = {
    Blog, User
}