var db = require('../config/db');

exports.create = function(token, amount) {
    return db.row('InsertDonation', [token, amount])
}