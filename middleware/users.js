import Users from "../models/Users.js";
import { comparePassword } from "../services/auth.js"
import Jwt  from "jsonwebtoken";


export const checkForUser = async (req, res, next) => {
  const user = await Users.findOne({id: req.params.id,});
  if (!user) {
    return res.status(404).send({
      message: "User not found",
      data: null,
    });
  }
  req.user = user;
  next();
};

// export const checkUserPassword = async (res, req, next) => {
//   const user = await Users.findOne({ email: req.body.email });
//   const valid = await comparePassword(req.body.password, user.password);
//   if (!valid) {
//     return res.status(400).send({
//       message: "Wrong email or password",
//       data: null,
//     });
//   }
//   req.user = user;
//   next();
// };

export const auth  =  (req, res, next) => {
  const {token} = req.headers
  console.log(token)
  const decoded = Jwt.verify(token,process.env.JWT_SECRET );
  console.log(decoded)
  if(!token){
    return res.status(400).send({
      message: "Access denied. No token was provided",
      data:null
    })
  }
  try {
    if(!decoded){
      return res.status(403).send({
        message:"You do not have the right access to this resource",
        data: null
      })
    }
    req.user = decoded
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).send({
      message:"You do not have the right access to this resource",
      data: null
    })
  }
  }