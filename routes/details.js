var db = require('../database/connect');


let previousStandardDetails = (data) => {
    return new Promise(async (resolve, reject) => {
            let userItem = {
                id: data.id,
                standard: data.standard,
                remark: data.remark,
                percentage: data.percentage,
            };

            //save previous standard details to database
            
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
