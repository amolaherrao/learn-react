import Jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "amolaherrao";

const jwtToken = {
  createToken(user) {
    try {
      const token = Jwt.sign(user, SECRET_KEY, { expiresIn: "24h" });
      return token;
    } catch (err) {
      console.log(err.message);
    }
  },

  verifyToken(token) {
    try {
      const splitToken = token.split(" ")[1];
      const userToken = Jwt.verify(splitToken, SECRET_KEY);
      return userToken;
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default jwtToken;
