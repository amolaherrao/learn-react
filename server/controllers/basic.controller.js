import basicModel from "../models/basic.model.js";
import { success, error } from "../helpers/responses.js";

const basicController = {
  async basic(req, res) {
    try {
      return res.status(200).json(success("basic route created"));
    } catch (err) {
      const { message } = err;
      return res.status(500).json(error(message));
    }
  },

  async getRouteDynamicId(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json(error("Please pass query param"));
      } else {
        return res.status(200).json(success("successfully get dynamic user id", id));
      }
    } catch (err) {
      const { message } = err;
      return res.status(500).json(error(message));
    }
  },

  async getAllUsers(req, res) {
    try {
      const response = await basicModel.find();
      if (response) res.status(200).json(success("all users", response));
      else res.status(401).json(error("failed to load"));
    } catch (err) {
      const { message } = err;
      return res.status(500).json(error(message));
    }
  },
};

export default basicController;
