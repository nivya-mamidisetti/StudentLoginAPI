var registration = require('../routes/registration');

    //create a new user

let createNewUser = async (req, res) => {
    let newUser = {
        fullname: req.body.fullName,
        rollNumber: req.body.rollNumber,
        email: req.body.email,
        password: req.body.password,
        currentStandard: req.body.currentStandard
    };
    try {
        await registration.createNewUser(newUser);
        return res.redirect("/details");
    } catch (err) {
        return res.redirect("/register");
    }
};
module.exports = {
    createNewUser: createNewUser
};
