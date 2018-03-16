const Sequelize = require('sequelize')
const connection = require('../database')

const User = connection.define('user', {
    userName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            is: {
                args: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                msg: 'Please enter a valid email address.'
            }
        }
    },  
    password: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            is: {
                args: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                msg: 'Passwords must contain a combination of 6 characters, capital letters, lowercase letters and special characters.'
            }
        }
    },
    headline: {
        type: Sequelize.STRING
    },
    linkedInID: {
        type: Sequelize.STRING
    },
    isNewRecord: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = User;