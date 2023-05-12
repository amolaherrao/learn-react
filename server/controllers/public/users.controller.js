import userModel from "../../models/users/users.model.js";
import { success, error } from "../../helpers/responses.js";

const usersController = {
  async signup(req, res) {
    try {
      console.log(req.body);
      const { name, username, email, password } = req.body;
      const isExists = Boolean(name && username && email && password) ?? false;
      if (!isExists) {
        return res.status(400).json(error("Required All Fields"));
      } else {
        const response = await userModel.create({
          name,
          username,
          email,
          password,
          createdAt: new Date().toISOString(),
        });
        if (!response) {
          return res.status(200).json(error("Failed to signup"));
        } else {
          return res.status(201).json(success("User Signup successfully"));
        }
      }
    } catch (err) {
      const { message } = err;
      return res.status(500).json(error(message));
    }
  },
  async getAllUsers(req, res) {
    try {
      const { page, size } = req.body;
      const isExists = Boolean(page && size);
      if (!isExists) {
        return res.status(400).json(error("Required All Fields"));
      }
    } catch (err) {
      const { message } = err;
      return res.status(500).json(error(message));
    }
  },
};

export default usersController;
