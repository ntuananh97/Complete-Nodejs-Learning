const Customer = require("../models/Customer");

const createCustomerService = async (creatingData) => {
    try {
        const customer =  await Customer.create(creatingData);
        return customer
    } catch (error) {
        console.log(">>>> Error when create customer: ", error)
        return null
    }
}

const bulkCustomersService = async (datas) => {
    try {
        const customers =  await Customer.insertMany(datas);
        return customers
    } catch (error) {
        console.log(">>>> Error when bulk customer: ", error)
        return null
    }
}

module.exports = {
    createCustomerService,
    bulkCustomersService
}