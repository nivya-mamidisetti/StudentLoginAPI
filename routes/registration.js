var db = require('../database/connect')

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        
        // check email is exist or not
        let isEmailExist = await checkExistEmail(data.email);
        if (isEmailExist) {
            reject(`This email "${data.email}" has already exist. Please choose an other email`);
        } else {
            // Passwords need to be encrypted before saving to database and should be decrypted and compared if the entered password is correct.
            let userItem = {
                fullname: data.fullname,
                rollNumber: data.rollNumber,
                email: data.email,
                password: data.password,
                currentStandard: data.currentStandard,
            };

            //create a new account
            db.mysqlConnection.query(
                ' INSERT INTO students set ? ', userItem,
                function(err, rows) {
                    if (err) {
                        reject(false)
                    }
                    resolve("Create a new user successful");
                }
            );
        }
    });
};

let checkExistEmail = (email) => {
    return new Promise( (resolve, reject) => {
        try {
            db.mysqlConnection.query(
                ' SELECT * FROM `students` WHERE `email` = ?  ', email,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    createNewUser: createNewUser
};
