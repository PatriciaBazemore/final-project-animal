angular.module('volunteerApp.directives', [])
.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            $(element).datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function (date) {
                    scope.user.started = date;
                    scope.$apply();
                }
            });
        }
    };
});