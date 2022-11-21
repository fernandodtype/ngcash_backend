const checkPassword = (password: string): boolean => {

    const upper_pattern = /[A-Z]/;
    const number_pattern = /[0-9]/;

    if (password.length >= 8 && upper_pattern.test(password) && number_pattern.test(password)) {
        return false
    }

    return true

}

export default checkPassword
