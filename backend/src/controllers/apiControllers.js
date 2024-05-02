const User = require("../models/User")


const getUsersApi = async (req, res) => {
    const results = await User.find({})

    return res.status(200).json({
        data: results,
        errorCode: 0
    })
}

const createUserApi = async (req, res) => {
    const {email, name, city} = req.body

    const newUser = await User.create({
        email,
        name, 
        city
    })

    return res.status(200).json({
        data: newUser,
        errorCode: 0
    })
}

module.exports = {
    getUsersApi,
    createUserApi
}