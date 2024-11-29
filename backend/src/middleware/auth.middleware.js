import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "unauthroized - no token provided " });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "unauthroized - Invalid  token  " });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: " no user found " });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protected Route ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
