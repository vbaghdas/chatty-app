const jwt = require('jwt-simple');
const User = require('../models/users');
const keys = require('../config/keys');

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode ( { uid: user.id, iat: timestamp }, keys.secret);
}

exports.signup = (req, res, next) => {
    const { email, password, firstName, lastName, userName, color } = req.body

    if(!email || !password || !firstName, !lastName, !userName, !color){
        const output = {
            errors: [],
            suggestions: {}
        }
        if(!email){
            output.errors.push('No email found');
        }
        if(!password){
            output.errors.push('No password found');
        }
        if(!firstName){
            output.errors.push('No first name found');
        }
        if(!lastName){
            output.errors.push('No last name found');
        }
        if(!userName){
            outut.errors.push('No user name found');
            output.suggestions.userName = firstName && lastName ? firstName + ' ' + lastName : 'Fluffy Bunny';
        }
        if(!color){
            output.errors.push('No color found');
            output.suggestions.color = '#00ff00'; //green
        }

        return res.status(422).send(output);
    }
    User.findOne({email}, (err, existingUser) => {
        if(err) return next(err);

        if(existingUser){
            return res.status(422).send({ errors: ['Email akready in use'] })
        }
        const newUser = new User({
            email, password, firstName, lastName, userName, color
        });
        newUser.save((err) => {
            if(err) return next(err);

            res.json({ token: tokenForUser(newUser) });
        })  
 });
}

exports.signin = (req, res, next) => {
    res.send({ token: tokenForUser(req.user) })
}