
const bcrypt = require('bcrypt')

const saltRounds = 10;

const generatePassword = (oldPassword: string) => {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(oldPassword, salt)

    return hash
}

export default generatePassword