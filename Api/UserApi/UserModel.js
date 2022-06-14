const {Role, Users, Category} = require('../../Config/config')

class UsersModel {
static async AddUser(data, hashedPassword){
    const addUser = await Users.create({
        name : data.name,
        email : data.email,
        password : hashedPassword,
    })
    return new Promise((res, rej) => {
        try {
            res(addUser)
        } catch (error) {
            rej(error)
        }
    })
}

}

module.exports = UsersModel;