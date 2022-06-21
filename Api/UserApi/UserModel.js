const { Users } = require('../../Config/config');

class UsersModel {
  static async AddUser(data, hashedPassword) {
    const addUser = await Users.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    return new Promise((res, rej) => {
      try {
        res(addUser);
      } catch (error) {
        rej(error);
      }
    });
  }
  
  static async GetUserDetail(id) {
    const findUser = await Users.findAll({
        where : {
            id : id 
        }
    })
    return new Promise((res, rej) => {
        try {
            res(findUser)
        } catch (error) {
            rej(error)
        }
    })
  }

  static async GetUserByEmail(email){
    const getUser = await Users.findAll({
      where : {
        email : email
      }
    })

    return new Promise((res, rej) => {
      try {
        res(getUser)
      } catch (error) {
        rej(error)
      }
    })
  }
}

module.exports = UsersModel;
