const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../model/user");


const signup = async (req, res) => {
    try {
        const { name, id, password,phone, branch} = req.body;
        const user = new UserModel(id,null,name,phone,branch);
        console.log(user.find())
        if (user.find()) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false});
        }
        const __ = await bcrypt.hash(password, 10)
        user.password = __
        user.signUp()
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { id, password } = req.body;
        var user = new UserModel(id)
        user = user.find()
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            user,
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                id,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

module.exports = {
    signup,
    login
}