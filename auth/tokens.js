const jwt = require('jsonwebtoken');


const createToken = (payload,secret,time = "7d")=> jwt.sign(
    payload,
    secret,
    { expiresIn: time }
)

const verifyToken = (payload,secret) => {
    console.log(secret)
    return jwt.verify(payload, secret)
} 

module.exports = {
    createToken,
    verifyToken
}