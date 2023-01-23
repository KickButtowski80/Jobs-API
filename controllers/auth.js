const register = async (req, res) => {
    res.send('register user 😊')
}

const login = async (req, res ) => {
    res.send('login user 😊')
}

module.exports = {
    register,
    login,
}