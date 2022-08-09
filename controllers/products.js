import Products from "../models/Products.js";
import  Users  from "../models/Users.js";
import { responseHandler } from "../services/response.js";

export const addProduct = async (req, res) => {
  try{
    const { id, ...productObject } = req.body;
    const addedProduct = await Users.updateOne(
    { _id: id },
    { $push: { products: { productId: req.id, ...productObject } } }
  );
    return responseHandler(res, "product added successfully", 200, addedProduct);
  } catch (error){
    return responseHandler(res, "something went wrong, try again later", 400, error);
  }
};

export const getAllUserProducts = async (req, res) => {
  try{
    const { id } = req.body;
    const user = await Users.findById(id);
    const products = user.products;
    return responseHandler(res, "Fetched all user products successfully", 200, products);
  } catch(error) {
    return responseHandler(res, "something went wrong, try again later", 400, error);
  }
};

export const getSingleProduct = (req, res) => {
  try{
    return responseHandler(res, "single product found successfully", 200, req.product);
  } catch (error){
    return responseHandler(res, "something went wrong, try again later", 400, error);
  }
};

export const deleteSingleProduct = async (req, res) => {
  try{
    const id = req.params.id;
    const newProduct = await Products.findByIdAndDelete(id);
    return responseHandler(res, "product deleted successfully", 200, newProduct);
  } catch (error){
    return responseHandler(res, "something went wrong, try again later", 400, error);
  }
};
