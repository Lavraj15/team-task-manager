import express from "express";
import { getUsers, updateRole } from "../controllers/userController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getUsers);
router.put("/:id/role", verifyToken, isAdmin, updateRole);

export default router;