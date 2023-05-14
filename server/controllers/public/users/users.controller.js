import _ from "lodash";
import usersModel from "../../../models/users/users.model.js";
import { createPassword, verifyPassword } from "../../../helpers/passwordHash.js";
import jwtToken from "../../../helpers/jwtToken.js";
import { success, error } from "../../../helpers/responses.js";

const usersController = {
  async signup(req, res) {
    try {
      const isEmpty = _.isEmpty(req.body);
      if (isEmpty) {
        return res.status(400).json(error("All fields are required"));
      } else {
        const { name, username, email, password } = req.body;
        const checkNotEmpty = Boolean(name && username && email && password);
        if (checkNotEmpty) {
          const isUserExists = await usersModel.findOne({ username, email });
          if (isUserExists) {
            return res.status(400).json(error("User already exists"));
          } else {
            const hashPassword = createPassword(password);
            const user = await usersModel.create({ name, username, email, password: hashPassword });
            if (!user) {
              return res.status(500).json(error("Error for user creation"));
            } else {
              return res.status(201).json(success("User created successfully", user));
            }
          }
        } else {
          return res.status(400).json(error("All fields are required"));
        }
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json(error(err.message));
    }
  },

  async signin(req, res) {
    try {
      const isEmpty = _.isEmpty(req.body);
      if (isEmpty) {
        return res.status(400).json(error("All fields are required"));
      } else {
        const { email, password } = req.body;
        const checkNotEmpty = Boolean(email && password);
        if (checkNotEmpty) {
          const isUserExists = await usersModel.findOne({ email });
          if (!isUserExists) {
            return res.status(400).json(error("User not exists"));
          } else {
            const matchPassword = verifyPassword(password, isUserExists.password);
            if (!matchPassword) {
              return res.status(400).json(error("Invalid credentials"));
            } else {
              const user = {
                id: isUserExists._id,
                email: isUserExists.email,
              };
              const token = jwtToken.createToken(user);
              const result = { user, token };
              return res.status(200).json(success("Login successfully", result));
            }
          }
        } else {
          return res.status(400).json(error("All fields are required"));
        }
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json(error(err.message));
    }
  },

  async getUserDetails(req, res) {
    try {
      const { userId } = req;
      return res.status(200).json(success("Get user id", { userId }));
    } catch (err) {
      console.log(err.message);
      return res.status(500).json(error(err.message));
    }
  },
};

export default usersController;
