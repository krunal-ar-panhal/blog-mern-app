import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const decode = jwt.verify(token, process.env.JWTS);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
