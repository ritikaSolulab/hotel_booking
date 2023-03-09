import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import {createError} from "../../utils/error.js";
import jwt from "jsonwebtoken";


export const login = async(req,res,next)=> {
    try{
        const {username,password} = req.body
        const user = await User.findOne({username:username})
        if(!user) return next(createError(404, "User not found!"))

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) return next(createError(400, 'wrong password or username!'));

        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT);

        const {pass, isAdmin, ...otherDetails} = user._doc;

        return res.cookie("access_token", token, {
            httpOnly:true,
        })
        .status(200)
        .json({...otherDetails});
    }catch(err){
        next(err)
    }
}