const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
const path = require('path');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = app => {
    app.get('/', (req, res) => {
        res.send('<h1>App Worked</h1>')
    })

    app.post('/signin', requireSignIn, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.get('/chat-lobby', requireAuth, (req, res) => {
        console.log('/chat-lobby', req.user);
        res.send({ temp: 'Say something'});
    })
}