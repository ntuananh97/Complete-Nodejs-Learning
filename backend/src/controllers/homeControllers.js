const User = require("../models/User")

const getHomePage = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    const {email, name, city} = req.body

    await User.create({
        email,
        name, 
        city
    })

    res.send("success")
}

const getUsers = async (req, res) => {
    const results = await User.find({})

    res.json(results)
}

const getUserDetail = async (req, res) => {
    const userId = req.params.id
    const result = await User.findById(userId).exec();
    res.json(result)
}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const body = req.body || {}
    await User.updateOne({ _id: userId }, { ...body });
    res.send('Success')
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    await User.deleteOne({ _id: userId });
    res.send('Success')
}

module.exports = {
    getHomePage,
    postCreateUser,
    getUsers,
    getUserDetail,
    updateUser,
    deleteUser
}