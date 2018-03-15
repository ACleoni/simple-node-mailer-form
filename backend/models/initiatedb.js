const Sequelize = require('sequelize')
const User = require('./user');
const connection = require('../database')

User.sync()
    .then(()=> User.create({
        username: 'acleoni',
        email: 'alexander.cleoni@gmail.com',
        password: 'Desiree93!'
    }))
    .then(initialUser => {
        console.log(initialUser.toJSON());
    });
    // .then((intialUser)=>{
    //     console.log(intialUser.toJSON());