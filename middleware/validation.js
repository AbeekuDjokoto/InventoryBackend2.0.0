import Joi from "joi";
import Users from "../models/Users.js";

export const createUserValidation = async (req, res, next) => {
  const userSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    shopName: Joi.string().required(),
    password: Joi.string().min(8).required(),
    // confirmPassword: Joi.ref("password")
  });
  const { error } = userSchema.validate(req.body);
  // const user = await Users.findOne({ email: req.body.email });
  if (error) {
    return res.status(400).send({
      error,
    })
  }
  // if (user) {
  //    return res.status(400).send({
  //     message: "Another user has the same email",
  //   });
  // }
  next();
};

export const productSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().required(),
  unitPrice: Joi.number().required(),
  status: Joi.string().required(),
  category: Joi.string().required(),
});
