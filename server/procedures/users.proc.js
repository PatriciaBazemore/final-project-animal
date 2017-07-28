var db = require('../config/db');

exports.all = function() {
    return db.rows('GetUsers');
}

exports.read = function(id) {
    return db.row('GetUser', [id]);
}

exports.readByEmail = function(email) {
    return db.row('GetUserByEmail', [email]);
}

exports.update = function(firstname, lastname, email, role, id) {
    return db.empty('UpdateUser', [firstname, lastname, email, role, id]);
}

exports.destroy = function(id) {
    return db.empty('DeleteUser', [id]);
}

exports.create = function(email, password, firstname, lastname) {
    return db.row('InsertUser', [email, password, firstname, lastname]);
}