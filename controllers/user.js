import User from "../models/User.js";

// update the user through the id
export const updateUser = async (req,res,next)=>{
  try {
    const {username, email, password, phone} = req.body
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: {username,email, password, phone} },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

// delete the user 
export const deleteUser = async (req,res,next)=>{
  try {
    const {username,email} = req.body;
    await User.findOneAndUpdate({email,username}, {$set: {isDeleted:true}});
    return res.status(200).json({
      success: true,
      message: 'User has been deleted.'
    });
  } catch (err) {
    next(err);
  }
}

// get the user through the id
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

// get all the users 
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

