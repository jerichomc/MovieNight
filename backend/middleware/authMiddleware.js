import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) { // Middleware to authenticate JWT tokens
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1]; // Extract the token from the Authorization header

  if (!token) { // Check if the token is present
    return res.status(401).json({
      message: "Access token required",
    });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedUser; // Attach the decoded user information to the request object

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}