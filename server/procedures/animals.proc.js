var db = require('../config/db');

exports.all = function() {
    return db.rows('GetAnimals');
}

exports.read = function(id) {
    return db.row('GetAnimal', [id]);
}

exports.update = function(name, age, gender, species, breed, size, shelterid, bio, id) {
    return db.empty('UpdateAnimal', [name, age, gender, species, breed, size, shelterid, bio, id]);
}

exports.destroy = function(id) {
    return db.empty('DeleteAnimal', [id]);
}

exports.create = function(name, age, gender, species, breed, size, shelterid, bio) {
    return db.row('InsertAnimal', [name, age, gender, species, breed, size, shelterid, bio]);
}