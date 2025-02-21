const { signup, login } = require('../auth/controllers/auth');
const { signupValidation, loginValidation } = require('../auth/middlewares/validation');
const ensureAuthenticated = require("../auth/middlewares/auth")
module.exports = {
    signup,
    login,
    signupValidation,
    loginValidation,
    ensureAuthenticated
}