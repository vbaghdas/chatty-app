const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
const path = require('path');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = app => {

    app.post('/auth/login', requireSignIn, Authentication.signin);
    app.post('/auth/signup', Authentication.signup);
    app.get('/auth/get-user', requireAuth, (req, res) => {
        const user = {
            username: req.user.username,
            color: req.user.color
        }
        res.send(user);
    });
}