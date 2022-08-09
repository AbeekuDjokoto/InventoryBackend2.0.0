import jwt from "jsonwebtoken"
import "dotenv/config"
import Users from "../models/Users.js"
import { generatePassword, comparePassword } from "../services/auth.js"
import { responseHandler } from "../services/response.js";


export const createUser = async (req, res) => {
  try{
    const { fullName, email, shopName, password } = req.body;
    const { salt, hash } = await generatePassword(password);
    const user = await Users.create({
      fullName: fullName,
      email,
      shopName,
      salt,
      password: hash,
      products: [],
  });
    return responseHandler(res, `success user ${user.fullName} created`, 201, user);
  } 
  catch(error){
    return responseHandler(res, "E-mail is already taken, try another", 400, error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { fullName, email, shopName, password } = req.body;
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, {fullName, email, shopName, password});
    return responseHandler(res, "user details has been updated successfully", 200, updatedUser);
  } catch (error) {
    return responseHandler(res, "Something went wrong, please try again later", 400, error);
  }
};


export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    return responseHandler(res, "user deleted successfully", 200, deletedUser);
  } catch (error) {
    return responseHandler(res, "user could not be deleted, something went wrong", 400, error);
  }
};


export const getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id);
    return responseHandler(res, "user retrieved successfully", 200, user);
  } catch (error) {
    return responseHandler(res, "user deleted successfully", 400, error);
  }
};


export const getAllUsers = async (req, res) => {
  try{
    const users = await Users.find();
    return responseHandler(res, "All users fetched successfully", 200, users);
  } catch (error) {
    return responseHandler(res, "Something went wrong", 400, error);
  }
};


export const loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  const user = await Users.findOne({ email: userEmail });
  if (!user) {
    return res.status(400).send({
      message: "Wrong email or password",
      data: null,
    });
  }
  const validPass = await comparePassword(userPassword, user.password);
  if (!validPass) {
      return res.status(400).send({
      message: "Wrong email or password",
      data: null,
    });
  }

  const {_id, fullName, email, shopName} = user
  const token = jwt.sign(
    { _id, fullName, email, shopName },
    process.env.JWT_SECRET
  );
  return res.header("X-auth-token", token).status(200).send({
    message: "user login successful",
    data: req.user,
  });
};
