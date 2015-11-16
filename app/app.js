app = angular.module('calculatorApp', []);

app.controller('calcCtrl', function($scope) {
    $scope.displayValue = 0;

    $scope.numberClick = function(value) {
        if ($scope.displayValue == 0) $scope.displayValue = value;
        else $scope.displayValue += value;
    };
});