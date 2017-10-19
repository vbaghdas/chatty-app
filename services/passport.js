const passport = require('passport');
const User = require('../models/users');
const keys = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
        if(err) return done(err);
        if(!user) return done(null, false);

        user.comparePasswords(password, (err, isMatch) => {
            if(err) return done(err);
            if(!isMatch) return done(null, false);

            return done(null, user);
        })
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromHeader('authorization'),
    secretOrKey: keys.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.uid, (err, user) => {
        if(err) return done(err);

        if(user){
            return done(null, user);
        }
        return done(null, false);
    })
})

passport.use(jwtLogin);
passport.use(localLogin);