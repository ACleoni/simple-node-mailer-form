const Sequelize = require('sequelize')
const connection = require('../database')

const User = connection.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                msg: 'Please enter a valid email address.'
            }
        }
    },  
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                msg: 'Passwords must contain a combination of 6 characters, capital letters, lowercase letters and special characters.'
            }
        }
    }
});

module.exports = User;