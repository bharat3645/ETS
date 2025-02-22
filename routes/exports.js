const { signup, login } = require('../auth/controllers/auth');
const { book, isBooked } = require('../auth/controllers/events');
const { signupValidation, loginValidation } = require('../auth/middlewares/validation');
const ensureAuthenticated = require("../auth/middlewares/auth")
const {createToken, verifyToken} = require("../auth/tokens")
module.exports = {
    signup,
    login,
    signupValidation,
    loginValidation,
    ensureAuthenticated,
    createToken,
    verifyToken,
    book,
    isBooked
}