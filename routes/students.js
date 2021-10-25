var express = require('express');
var router = express.Router();
var db = require('../database/connect');


router.get('/studentDetails', function(req, res, next) {
    var sql='SELECT * FROM details';
    db.mysqlConnection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('studentDetails', { title: 'Students List', userData: data});
  });
});

module.exports = router;