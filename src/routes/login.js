const router = require('express').Router();
const loginController = require('../controllers/loginController');
const passport = require('passport');

router.get('/', loginController.index);
router.post(
    '/',
    passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/blog', failureFlash: true }),
);

module.exports = router;
