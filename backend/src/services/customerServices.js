const Customer = require("../models/Customer");

const createCustomerService = async (creatingData) => {
    try {
        const user =  await Customer.create(creatingData);
        return user
    } catch (error) {
        console.log(">>>> Error when create customer: ", error)
        return null
    }
}

module.exports = {
    createCustomerService
}