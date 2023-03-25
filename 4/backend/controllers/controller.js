const {User} = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
class Controller{

    static async register(req,res,next){
        try {
            
            const {name, username, password} = req.body
            const user = await User.create({name, username, password})

            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next){
        try {   
            const {username,password} = req.body

            if(!username){
                throw {name: "Invalid input", value:"Username"}
            }

            if(!password){
                throw {name:"Invalid input", value:"Password"}
            }
            const user = await User.findOne({where:{username}})

            if(!user){
                throw {name:"Invalid username/password"}
            }

            const passwordCheck = bcrypt.compareSync(password, user.password)

            if(!passwordCheck){
                throw {name:"Invalid username/password"}
            }

            const access_token = jwt.sign({id:user.id}, process.env.SECRET)

            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller