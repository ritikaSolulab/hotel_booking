import express from "express";
import {register} from '../controllers/auth/register.js'
import {login} from '../controllers/auth/login.js'
import { resetPassword } from "../controllers/auth/register.js";
import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// for register
router.post("/register", register);

// for login
router.post("/login", login)

// for resetPassword
router.put("/:id", verifyUser, resetPassword);

export default router;