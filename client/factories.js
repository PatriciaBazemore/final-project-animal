angular.module('volunteerApp.factories', [])
.factory('Animal', ['$resource', function($resource) {
    return $resource('/api/animals/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
}]);