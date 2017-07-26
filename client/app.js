angular.module('volunteerApp', ['volunteerApp.controllers', 'volunteerApp.factories', 'volunteerApp.services', 'ngRoute', 'ngResource'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'views/welcome.html',
            controller: 'WelcomeController'
        })
        .when('/animals', {
            templateUrl: 'views/animal_list.html',
            controller: 'AnimalsController'
        })
        .when('/animals/:id', {
            templateUrl: 'views/single_animal.html',
            controller: 'SingleAnimalController'
        })
        .otherwise({
            redirectTo: '/'
        });
        
}]);