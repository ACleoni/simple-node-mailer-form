const Sequelize = require('sequelize')
const User = require('./user');
const connection = require('../database')

User.sync({force: true})
    .then(()=> User.create({
        userName: 'acleoni',
        email: 'alexander.cleoni@gmail.com',
        password: 'Desiree93!',
        headline: null,
        linkedInID: null,
        isNewRecord: true
    }))
    .then(initialUser => {
        console.log(initialUser.toJSON());
    });
    // .then((intialUser)=>{
    //     console.log(intialUser.toJSON());