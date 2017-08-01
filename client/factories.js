angular.module('volunteerApp.factories', [])
.factory('Animal', ['$resource', function($resource) {
    return $resource('/api/animals/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
}])
.factory('User', ['$resource', function($resource) {
    return $resource('/api/users/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
}])
.factory('Comments', ['$resource', function($resource) {
    return $resource('/api/comments/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        },
        queryForAnimal: {
            method: 'GET',
            url: '/api/comments/:id',
            isArray: true
        },
        queryForFlag: {
            method: 'GET',
            url: '/api/comments/flagged',
            isArray: true
        }
    });
}])
.factory('Donation', ['$resource', function($resource) {
    return $resource('/api/donations/:id');
}]);