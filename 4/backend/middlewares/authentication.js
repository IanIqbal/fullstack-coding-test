const jwt = require("jsonwebtoken")
const {User} = require("../models")
const authentication = async (req,res,next)=>{
    try {
        
        if(!req.headers.access_token){
            throw {name:"Unauthorized"}
        }

        let access_token = jwt.verify(req.headers.access_token, process.env.SECRET)

        if(!access_token){
            throw {name:"Unauthorized"}
        }

        let {id} = access_token
        // console.log(access_token);
        // console.log(id);
        const user = await User.findByPk(id)

        if(!user){
            throw {name:"Unauthorized"}
        }

        req.user = {UserId: user.id}

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication