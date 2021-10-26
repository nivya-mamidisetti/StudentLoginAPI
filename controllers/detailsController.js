var details = require('../routes/details');

    //Add Students previous standard details 

let previousStandardDetails = async (req, res) => {

    let studentDetails = {
        id: req.body.id,
        standard: req.body.standard,
        remark: req.body.remark,
        percentage: req.body.percentage,
    };
    try {
        await details.previousStandardDetails(studentDetails);
        return res.send("Student details added successfully");
    } catch (err) {
        return res.redirect("/register");
    }
};
module.exports = {
    previousStandardDetails: previousStandardDetails
};
