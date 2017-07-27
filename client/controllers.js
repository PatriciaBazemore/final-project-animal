angular.module('volunteerApp.controllers', [])
.controller('WelcomeController', ['$scope', 'SEOService', '$location', 'UserService', function($scope, SEOService, $location, UserService) {
    UserService.me().then(function() {
        redirect();
    });

    $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(function() {
            redirect();
        }, function(err) {
            console.log(err);
        });
    }

    function redirect() {
        var dest = $location.search().dest;
        if (!dest) {
            dest = '/';
        }
        $location.replace().path().search('dest', null);
    }

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
}])
.controller('DonationController', ['$scope', 'SEOService', 'Donation', '$location', function($scope, SEOService, Donation, $location) {
    var elements = stripe.elements();
    var card = elements.create('card');
    card.mount('#card-field');

    $scope.errorMessage = '';

    $scope.processDonation = function() {
        stripe.createToken(card, {
            name: $scope.fullname,
            address_line1: $scope.line1,
            address_line2: $scope.line2,
            address_city: $scope.city,
            address_state: $scope.state
        }).then(function(result) {
            if (result.error) {
                $scope.errorMessage = result.error.message;
            } else {
                var d = new Donation({
                    token: result.token.id,
                    amount: $scope.amount
                });
                d.$save(function() {
                    alert('Thank you for your donation!');
                    $location.path('/');
                }, function(err) {
                    console.log(err);
                });
            }
        });
    }

    SEOService.setSEO({
            title: 'Donate',
            url: $location.url(),
            description: 'Help Out The McKamey Animal Shelter'
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
