import _ from "lodash";
import usersModel from "../../../models/users/users.model.js";
import addressModel from "../../../models/users/address.model.js";
import { createPassword, verifyPassword } from "../../../helpers/passwordHash.js";
import jwtToken from "../../../helpers/jwtToken.js";
import { success, error } from "../../../helpers/responses.js";

const usersController = {
  async signup(req, res) {
    try {
      const isEmpty = _.isEmpty(req.body);
      if (!isEmpty) {
        return res.status(400).json(error("All fields are required"));
      } else {
        const { name, username, email, password } = req.body;
        const checkNotEmpty = Boolean(name && username && email && password);
        if (checkNotEmpty) {
          await usersModel
            .findOne({ username, email })
            .then(async (isUserExists) => {
              if (isUserExists) {
                return res.status(400).json(error("User already exists"));
              } else {
                const hashPassword = createPassword(password);
                await usersModel
                  .create({ name, username, email, password: hashPassword })
                  .then((user) => {
                    if (!user) {
                      return res.status(500).json(error("Error for user creation"));
                    } else {
                      return res.status(201).json(success("User created successfully", user));
                    }
                  })
                  .catch((err) => {
                    console.log(err.message);
                    return res.status(500).json(error(err.message));
                  });
              }
            })
            .catch((err) => {
              console.log(err.message);
              return res.status(500).json(error(err.message));
            });
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
          await usersModel
            .findOne({ email })
            .then((isUserExists) => {
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
            })
            .catch((err) => {
              console.log(err.message);
              return res.status(500).json(error(err.message));
            });
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
      await usersModel
        .findById(userId, "-password")
        .then((user) => {
          if (user) {
            return res.status(200).json(success("User details", user));
          } else {
            return res.status(404).json(error("User not found"));
          }
        })
        .catch((err) => {
          console.log(err.message);
          return res.status(500).json(error(err.message));
        });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json(error(err.message));
    }
  },

  async addUserAddress(req, res) {
    try {
      const isEmpty = _.isEmpty(req.body);
      if (!isEmpty) {
        const { userId } = req;
        const { city, state, pincode } = req.body;
        const checkNotEmpty = Boolean(city && state && pincode);
        if (checkNotEmpty) {
          await addressModel
            .findOne({ userId, isDeleted: false })
            .then(async (isNotUserAddress) => {
              if (isNotUserAddress) {
                return res.status(400).json(error("User already have address"));
              } else {
                await addressModel
                  .create({ city, state, pincode, userId })
                  .then((addAddress) => {
                    if (addAddress) {
                      return res
                        .status(201)
                        .json(success("Address added successfully", addAddress));
                    } else {
                      return res.status(500).json(error("Address not added"));
                    }
                  })
                  .catch((err) => {
                    console.log(err.message);
                    return res.status(500).json(error(err.message));
                  });
              }
            })
            .catch((err) => {
              console.log(err.message);
              return res.status(500).json(error(err.message));
            });
        } else {
          return res.status(400).json(error("All fields are required"));
        }
      } else {
        return res.status(400).json(error("All fields are required"));
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json(error(err.message));
    }
  },

  async updateUserAddress(req, res) {
    try {
      const isEmpty = _.isEmpty(req.body);
      if (!isEmpty) {
        const { userId } = req;
        const { city, state, pincode, id } = req.body;
        const checkNotEmpty = Boolean(city || state || pincode);
        if (checkNotEmpty && id) {
          await addressModel
            .findOne({ _id: id, userId, isDeleted: false })
            .then(async (isUserAddress) => {
              if (isUserAddress) {
                const UpdateObject = {
                  city: city ?? isUserAddress.city,
                  state: state ?? isUserAddress.state,
                  pincode: pincode ?? isUserAddress.pincode,
                };
                await addressModel
                  .findByIdAndUpdate({ _id: id, userId }, UpdateObject, { new: true })
                  .then((updateUserAddress) => {
                    if (updateUserAddress) {
                      return res.status(202).json(success("address updated", updateUserAddress));
                    } else {
                      return res.status(500).json(error("address not updated"));
                    }
                  })
                  .catch((err) => {
                    console.log(err.message);
                    return res.status(500).json(error(err));
                  });
              } else {
                return res.status(400).json(error("User not have address"));
              }
            })
            .catch((err) => {
              console.log(err.message);
              return res.status(500).json(error("your not authorized to update"));
            });
        } else {
          return res.status(400).json(error("field are required"));
        }
      } else {
        return res.status(400).json(error("All fields are required"));
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json(error(err.message));
    }
  },

  async getUserAddress(req, res) {
    try {
      const { userId, body } = req;
      const { id } = body;
      if (userId && id) {
        await addressModel
          .findOne({ _id: id, userId, isDeleted: false })
          .then((userAddress) => {
            if (userAddress) {
              return res.status(200).json(success("User address details", userAddress));
            } else {
              return res.status(404).json(error("User address not found"));
            }
          })
          .catch((err) => {
            console.log(err.message);
            return res.status(500).json(error(err.message));
          });
      } else {
        return res.status(400).json(error("id is required"));
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json(error(err.message));
    }
  },

  async deleteUserAddress(req, res) {
    try {
      const isEmpty = _.isEmpty(req.body);
      if (isEmpty) {
        return res.status(400).json(error("id is required"));
      } else {
        const { userId } = req;
        const { id } = req.body;
        if (userId && id) {
          await addressModel
            .findOneAndUpdate(
              { _id: id, userId, isDeleted: false },
              { isDeleted: true, deletedAt: Date.now() }
            )
            .then((userAddress) => {
              if (userAddress) {
                return res.status(200).json(success("User address deleted"));
              } else {
                return res.status(404).json(error("User address not found"));
              }
            })
            .catch((err) => {
              console.log(err.message);
              return res.status(500).json(error(err.message));
            });
        } else {
          return res.status(400).json(error("id is required"));
        }
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json(error(err.message));
    }
  },
};

export default usersController;
