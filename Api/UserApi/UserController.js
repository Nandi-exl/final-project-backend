const UserModel = require('./UserModel');
const { hash, compareSync } = require('bcrypt');

class UserController {
  static async AddUser(req, res) {
    const data = req.body;
    const password = data.password;
    const hashPassword = await hash(password, 10);

    const getUser = await UserModel.GetUserByEmail(data.email);
    if (getUser) {
      return res.status(400).json({ msg: `${data.email} is already exist` });
    }

    await UserModel.AddUser(data, hashPassword)
    res.status()

  }
}

module.exports = UserController;
