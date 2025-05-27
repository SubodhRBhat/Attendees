const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/user-auth-controller');
const userSignupSchema = require('../validators/userSignup-auth-validator');
const userSigninSchema = require('../validators/userSignin-auth-validator');
const validate = require('../middlewares/user-auth-middleware');

router.post('/user-signup', validate(userSignupSchema), userAuthController.signup);
router.post('/user-signin', validate(userSigninSchema), userAuthController.signin);

module.exports = router;
