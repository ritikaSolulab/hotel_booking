import User from "../../models/User.js";
import bcrypt from "bcryptjs";

// to register the user
export const register = async(req,res,next)=> {
    try{
        const {username, password, email, phone} = req.body
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username: username,
            email: email,
            phone: phone,
            password: hash,
        })

        await newUser.save()
        return res.status(200).json({
            success: true,
            message: "User has been created."
        })
    }catch(err){
        next(err)
    }
}

// to reset the password
export const resetPassword  = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        await User.findOneAndUpdate({email:email}, {password:hash})

        return res.status(200).json({
            success: true,
            message: "new password has been created."
        })

    } catch(err){
        next(err)
    }
};


  