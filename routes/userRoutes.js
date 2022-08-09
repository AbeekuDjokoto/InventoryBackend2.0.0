import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
  loginUser,
} from "../controllers/users.js";
import { checkForUser } from "../middleware/users.js";
import { createUserValidation } from "../middleware/validation.js";

const router = Router();

router.post("/user/create", createUserValidation, createUser);
router.post("/login", loginUser);
router.put("/user/update/:id", checkForUser, updateUser);
router.delete("/user/delete/:id", checkForUser, deleteUser);
router.get("/user/:id", checkForUser, getUser);
router.get("/users", getAllUsers);

export default router;
