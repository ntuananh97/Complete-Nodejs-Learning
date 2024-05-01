const express = require('express');

const configBodyParser = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}

module.exports = configBodyParser