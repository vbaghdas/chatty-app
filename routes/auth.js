const passportService = require('../services/passport');
const passport = require('passport');



exports.requireAuth = passport.authenticate('jwt', { session: false });
exports.requireSignIn = passport.authenticate('local', { session: false });