import * as bcrypt from "bcrypt";

const saltRounds = 10;

export const createPassword = (password) => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (err) {
    console.log(err.message);
  }
};

export const verifyPassword = (password, hash) => {
  try {
    const result = bcrypt.compareSync(password, hash);
    return result;
  } catch (err) {
    console.log(err.message);
  }
};
