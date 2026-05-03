import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed, role: "admin" });
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// 🔥 IMPORTANT (ye missing hoga)
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(404).json("User not found");

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json("Wrong password");

    // 🔥 AUTO ADMIN (simple logic)
    if (!user.role) {
      user.role = "admin";
      await user.save();
    }

    // ✅ FIXED JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role   // 🔥 MUST
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });

  } catch (err) {
    res.status(500).json(err.message);
  }
};