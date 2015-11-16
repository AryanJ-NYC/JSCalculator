app = angular.module('calculatorApp', []);

app.controller('calcCtrl', function($scope) {
    $scope.displayValue = 0;


    var displayValueInitialized = false,
        mathExpression = '';

    $scope.numberClick = function(value) {
        if (!displayValueInitialized) {
            $scope.displayValue = value;
            displayValueInitialized = true;
        } else $scope.displayValue += value;
    };

    $scope.operatorClick = function(event) {
        mathExpression += $scope.displayValue + event.srcElement.value;
        displayValueInitialized = false;
        console.log(mathExpression);
    };

    $scope.evaluateExpression = function() {
        mathExpression += $scope.displayValue + event.srcElement.value;
        console.log(mathExpression);
        $scope.displayValue = Parser.parse(mathExpression).evaluate();
        mathExpression = '';
        displayValueInitialized = false;
    };
});