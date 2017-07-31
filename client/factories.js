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
.factory('Donation', ['$resource', function($resource) {
    return $resource('api/donations/:id');
}]);