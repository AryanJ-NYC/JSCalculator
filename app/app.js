app = angular.module('calculatorApp', []);

app.controller('calcCtrl', function($scope) {
    $scope.displayValue = '0';


    var displayValueInitialized = false,
        isFloat = false,
        isInt = function(number) { return number % 1 === 0},
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
    };

    $scope.addDecimal = function() {
        if (!displayValueInitialized) $scope.displayValue = '.';
        else if (!isFloat) $scope.displayValue += '.';
        isFloat = true;
        displayValueInitialized = true;
    };

    $scope.evaluateExpression = function() {
        mathExpression += $scope.displayValue + event.srcElement.value;
        $scope.displayValue = Parser.parse(mathExpression).evaluate();
        if (isInt($scope.displayValue)) isFloat = false;
        mathExpression = '';
        displayValueInitialized = false;
    };

    $scope.resetCalculator = function() {
        mathExpression = '';
        $scope.displayValue = '0';
        displayValueInitialized = false;
    };
});