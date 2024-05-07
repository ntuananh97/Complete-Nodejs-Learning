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

const getCustomersService = async () => {
    try {
        const customers =  await Customer.find({})
        return customers
    } catch (error) {
        console.log(">>>> Error when getCustomersService: ", error)
        return null
    }
}

const updateCustomersService = async (id, data = {}) => {
    try {
        const updatedCustomer =  await Customer.updateOne({ _id: id }, data);
        return updatedCustomer
    } catch (error) {
        console.log(">>>> Error when updateCustomersService: ", error)
        return null
    }
}

const deleteCustomersService = async (id) => {
    try {
        const data =  await Customer.deleteOne({ _id: id });
        return data
    } catch (error) {
        console.log(">>>> Error when deleteCustomersService: ", error)
        return null
    }
}

module.exports = {
    createCustomerService,
    bulkCustomersService,
    getCustomersService,
    updateCustomersService,
    deleteCustomersService
}