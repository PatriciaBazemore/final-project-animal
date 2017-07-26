angular.module('volunteerApp.controllers', [])
.controller('WelcomeController', ['$scope', 'SEOService', '$location', function($scope, SEOService, $location) {
    SEOService.setSEO({
        title: 'Welcome',
        url: $location.url(),
        description: 'McKamey Animal Shelter Volunteer Portal'
    })
    $scope.animals = function() {
        $location.path('/animal_list');
    }
}])
// .controller('NavToggle', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
//     if $location.url() === 
// }])
// WORK W WILL TO CREATE CONTROLLERS TOGGLING PUBLIC NAV & PRIVATE (USER) NAV
.controller('AnimalsController', ['$scope', 'Animal', 'SEOService', '$location', function($scope, Animal, SEOService, $location) {
    $scope.animals = Animal.query();

    SEOService.setSEO({
            title: 'Adoptable',
            url: $location.url(),
            description: 'McKamey Animal Shelter Volunteer Portal'
        })
}])
.controller('SingleAnimalController', ['$scope', 'Animal', 'SEOService', '$location', '$routeParams', function($scope, Animal, SEOService, $location, $routeParams) {
    $scope.animal = Animal.get({id : $routeParams.id});

    SEOService.setSEO({
            title: 'Adoptable',
            url: $location.url(),
            description: 'McKamey Animal Shelter Volunteer Portal'
        })
}]);

// .controller('NavController', ['$scope', '$location', function($scope, $location) {
//     if(localStorage.items === undefined) 
//         localStorage.items = angular.toJson([]);
//     $scope.cartTotal = angular.fromJson(localStorage.items).length;
//     $scope.$on("cartChanged", function() {
//         $scope.cartTotal = angular.fromJson(localStorage.items).length;
//     })
//     $scope.$on("purchase", function() {
//         $scope.cartTotal = 0;
//     })
