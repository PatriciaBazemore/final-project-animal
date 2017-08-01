angular.module('volunteerApp', ['volunteerApp.controllers', 'volunteerApp.factories', 'volunteerApp.services', 'ngRoute', 'ngResource'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'views/welcome.html',
            controller: 'WelcomeController'
        })
        .when('/animals/add', {
            templateUrl: 'views/add_animal.html',
            controller: 'AddAnimalController'
        })
        .when('/animals/:id/update', {
            templateUrl: 'views/animal_update.html',
            controller: 'AnimalUpdateController'
        })
        .when('/animals/:id', {
            templateUrl: 'views/single_animal.html',
            controller: 'SingleAnimalController'
        })
        .when('/animals', {
            templateUrl: 'views/animal_list.html',
            controller: 'AnimalsController'
        })
        .when('/users/:id/update', {
            templateUrl: 'views/user_update.html',
            controller: 'UserUpdateController'
        })
        .when('/users/:id', {
            templateUrl: 'views/single_user.html',
            controller: 'SingleUserController'
        })
        .when('/users', {
            templateUrl: 'views/user_list.html',
            controller: 'UserListController',
            // requiresLogin: true, //made up requiresLogin
            // requiresAdmin: true //made up requiresAdmin
        })
        .when('/donate', {
            templateUrl: 'views/donations.html',
            controller: 'DonationController'
        })
        .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'LogoutController'
        })
        .when('/admin', {
            templateUrl: 'views/admin_controls.html',
            controller: 'AdminController'
        })
        // .when('/bulletin_board', {
        //     templateUrl: 'views/bulletin_board',
        //     controller: 'StaticController'
        // })
        .otherwise({
            redirectTo: '/'
        });
        
}])

.run(['$rootScope', '$location', 'UserService', function($rootScope, $location, UserService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, previousRoute) {
        if (nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()) { //if route requires login and arent logged in
            event.preventDefault();
            UserService.loginRedirect();
        } else if (nextRoute.$$route.requiresAdmin && !UserService.isAdmin()) {
            event.preventDefault();
            $location.path('/');
        }
    });
}]);