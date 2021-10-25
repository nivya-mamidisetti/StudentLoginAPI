var details = require('../routes/details');

    //Add Student details 

let previousStandardDetails = async (req, res) => {
    let studentDetails = {
        standard: req.body.standard,
        remark: req.body.remark,
        percentage: req.body.percentage,
    };
    try {
        await details.previousStandardDetails(studentDetails);
        return res.redirect("/login");
    } catch (err) {
        return res.redirect("/register");
    }
};
module.exports = {
    previousStandardDetails: previousStandardDetails
};
