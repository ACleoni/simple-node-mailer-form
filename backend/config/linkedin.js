const express = require('express');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const keys = require('./keys');
const User = require('../models/user')




const authenticateUser = (app) => {

    const transformLinkedInProfile = (profile) => ({
        first_name: profile.first_name
    })

    
    


    passport.use(new LinkedInStrategy({
        clientID: '78wk0dns93g2cp',
        clientSecret: 'IcLoLOsz35oGlDgH',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback',
        profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
    }, (accessToken, refreshToken, profile, done) => {
        // This allows for LinkedIn users to log in with their profile. Gives a random password at first but redirects to page to change to a permanent password
        const generatePassword = require('password-generator');
        const maxLength = 12;
        const minLength = 6;
        const uppercaseMinCount = 0;
        const lowercaseMinCount = 0;
        const numberMinCount = 0;
        const specialMinCount = 0;
        const UPPERCASE_REGEX = /([A-Z]) /g;
        const LOWERCASE_REGEX = /([a-z]) /g;
        const NUMBER_REGEX = /([\d]) /g;
        const SPECIAL_CHAR_REGEX = /([\?\-]) /g;
        const NON_REPEATING_CHAR_REGEX = /([\w\d\?\-])\1{2,} /g;

        isStrongPassword =  (password) => {

            let uppercase = password.match(UPPERCASE_REGEX);
            let lowercase = password.match(LOWERCASE_REGEX);
            let number = password.match(NUMBER_REGEX);
            let specialChar = password.match(SPECIAL_CHAR_REGEX);
            let nonRepeatChar = password.match(NON_REPEATING_CHAR_REGEX);
            return password.length >= minLength && 
                                    !nonRepeatChar && 
                                    uppercase && uppercase.length >= uppercaseMinCount &&
                                    lowercase && lowercase.length >= lowercaseMinCount &&
                                    number && number.length >= numberMinCount &&
                                    specialChar && specialChar.length >= specialMinCount;

        }

        createUserPassword = () => {

            let password = ''
            let randomLength = Math.floor(Math.random() * (maxLength - minLength) + minLength)
            if (!isStrongPassword(password)) {
                password = generatePassword(randomLength, false, /[\w\d\?\-]/)
            }  
            return password
        }

        const tempPW = createUserPassword()

        console.log(profile._json)
        User.findOrCreate({
            where: {linkedInID: profile.id},
            defaults: {
                userName: profile._json.firstName,
                email:profile._json.emailAddress,
                headline: profile._json.headline,
                linkedInID: profile.id
            }
        }).then(res =>{
            User.update({ isNewRecord: (res[0]._options.isNewRecord) }, { where: {id: res[0].dataValues.id} });
        })
        return done(null, profile); 
    }))

    passport.serializeUser((user, done) => done(null, user));

    passport.deserializeUser((user, done) => done( null, user));

    app.use(passport.initialize());

    app.use(passport.session());

    app.get('/auth/linkedin', passport.authenticate('linkedin', {scope: ['r_basicprofile', 'r_emailaddress', 'rw_company_admin']}))
    
    app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin', {failureRedirect: '/auth/linkedin'}),
        (req, res) => res.redirect('/'))

}

module.exports = authenticateUser;