const express = require('express');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const keys = require('./keys');
const User = require('../models/user')

const authenticateUser = (app) => {

    const transformLinkedInProfile =(profile) => ({
        first_name: profile.first_name
    })


    passport.use(new LinkedInStrategy({
        clientID: '78wk0dns93g2cp',
        clientSecret: 'IcLoLOsz35oGlDgH',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback',
        profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile._json)
        User.findOrCreate({
            where: {linkedinID: profile.id},
            defaults: {
                userName: 'acleoni',
                email: 'alexander.cleoni@gmail.com',
                password: 'DefaultPassword'
            }
        }).then(res =>{
            console.log(res)
        })
        return done(null, profile); 
    }))

    passport.serializeUser((user, done) => done(null, user));

    passport.deserializeUser((user, done)=> done( null, user));

    app.use(passport.initialize());

    app.use(passport.session());

    app.get('/auth/linkedin', passport.authenticate('linkedin', {scope: ['r_basicprofile']}))

    app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin', {failureRedirect: '/auth/linkedin'}),
        (req, res)=> res.redirect('/'))

}

module.exports = authenticateUser;