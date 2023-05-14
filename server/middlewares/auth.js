import jwtToken from "../helpers/jwtToken.js";
import { error } from "../helpers/responses.js";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json(error("Unauthorized user"));
    } else {
      const user = jwtToken.verifyToken(token);
      req.userId = user.id;
    }
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json(error("Unauthorized user"));
  }
};
export default auth;
