
const bcrypt = require('bcrypt')

const saltRounds = process.env.JWT_SALT_ROUNDS as number | undefined;

const generatePassword = (oldPassword: string) => {
    const salt = bcrypt.genSaltSync(Number(saltRounds))
    const hash = bcrypt.hashSync(oldPassword, salt)

    return hash
}

export default generatePassword