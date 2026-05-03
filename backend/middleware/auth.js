import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(403).json("No token");

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json("Invalid token");
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json("Admin only");
  }
  next();
};