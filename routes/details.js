var db = require('../database/connect');


let previousStandardDetails = (data) => {
    return new Promise(async (resolve, reject) => {
            let userItem = {
                standard: data.standard,
                remark: data.remark,
                percentage: data.percentage,
            };

            //create previous standard details
            db.mysqlConnection.query(
                ' INSERT INTO details set ? ', userItem,
                function(err, rows) {
                    if (err) {
                        reject(false)
                    }
                    resolve("Previous standard details added");
                }
            );
    });
};


module.exports = {
    previousStandardDetails: previousStandardDetails
};
