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

const getCustomersService = async (query) => {
    const { filter, range, attributes, sort } = query;

    // filter
    const filterObject = filter && JSON.parse(filter) || {};
    const filterQueries = {};
    const createdAt = {};

    Object.keys(filterObject).forEach(key => {
        const value = filterObject[key];

        if (!["fromCreatedAt", "toCreatedAt"].includes(key))
          filterQueries[key] = {
            $regex: value,
            $options: "i",
          };

        if (key === "fromCreatedAt" && value) createdAt.$gte = new Date(value);
        else if (key === "toCreatedAt" && value) createdAt.$lt = new Date(value);
    });
    if (Object.keys(createdAt).length > 0) filterQueries["createdAt"] = createdAt

    // pagination
    const [fromItem = 0, toItem = 10] = range && JSON.parse(range) || [];
    const pageSize = toItem - fromItem + 1;

    // sort
    const [sortedName, sortDirection] = sort && JSON.parse(sort) || [];
    const sortObject = {}
    if (sortedName && sortDirection) sortObject[sortedName] = sortDirection

    // attributes
    const parseAttributes = attributes && JSON.parse(attributes) || "";
    const attributeArray = parseAttributes ? parseAttributes.split(",") : []
    console.log("getCustomersService ~ parseAttributes: hello", parseAttributes, attributeArray)

    try {
        const [customers, totalDocuments] = await Promise.all([
          Customer.find(filterQueries)
            .skip(fromItem)
            .limit(Number(pageSize))
            .sort(sortObject)
            .select(attributeArray)
            .exec(),
          Customer.countDocuments(filterQueries),
        ]);
        console.log("getCustomersService ~ totalDocuments:", totalDocuments);
        return {
            list: customers,
            count: totalDocuments
        };
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

const bulkDeleteCustomersService = async (ids) => {
    try {
        const data =  await Customer.deleteMany({ _id: ids });
        return data
    } catch (error) {
        console.log(">>>> Error when bulkDeleteCustomersService: ", error)
        return null
    }
}

module.exports = {
    createCustomerService,
    bulkCustomersService,
    getCustomersService,
    updateCustomersService,
    deleteCustomersService,
    bulkDeleteCustomersService
}