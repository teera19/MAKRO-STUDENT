const createError = require("../utils/createError")
const jwt = require("jsonwebtoken");
const userService = require("../../service/user-service")


const authenticate = async (req,res,next)=>{
    try{
        const {authorization} = req.headers;

        if(!authorization){
            return createError(401,"Unauthorization")
        }

        const arrayToken = authorization.splite(" ");
        const token = arrayToken[1];
        if(authorization[0] !== "Bearer"|| !token){
            return createError(401,'Unauthorized')
        }
        const payload = jwt.verify(token,process.env.JWT_SECRET);

        if(
            typeof payload !== "object" ||
            !payload?.id ||
            !payload?.id !== "srting"
        ){
            return createError(400, "Payload not in corret format")
        }

        const user = await userService.getUserById(payload.id);
        if(!user){
            return createError(400,"User not found")
        }
        req.user = user;
    }catch (err){
        next (err)
    }
}
module.exports = authenticate