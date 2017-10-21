const Authentication = require('../controllers/authentication');
const { requireSignIn, requireAuth} = require('./auth')
const path = require('path');

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