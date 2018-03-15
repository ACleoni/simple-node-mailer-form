const express = require('express');
const router = express.Router();
const User = require('../models/user');

const passport = require('passport');


router.route('/linkedin', passport.authenticate('linkedin', {scope: 'email'}));
router.get('linkedin/callback', (req, res, next)=> {
    console.log('logging in');
    passport.authenticate('linkedin', (err, user)=> {
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        if (!user) {
            console.log('user not found');
            return res.redirect('/')
        }
    })
})

module.exports = router