var express = require('express');
var router = express.Router();
var db = require('../database/connect');


findUserById = function(studentId) {
  return new Promise((resolve, reject) => {
      try {
          db.mysqlConnection.query(
              ' SELECT * FROM `details` WHERE `id` = ?', [studentId],
              function(err, rows) {
                  if (err) {
                      reject(err)
                  }
                  resolve(rows);
              }
          );
      } catch (err) {
          reject(err);
      }
  });
};

module.exports = {
  findUserById
};