app = angular.module('calculatorApp', []);

app.controller('calcCtrl', function($scope) {
    $scope.displayValue = '0';

    var displayValueInitialized = false,
        isDecimal = false,
        isInt = function(number) { return number % 1 === 0};
    $scope.mathExpression = '';

    $scope.numberClick = function(value) {
        if (!displayValueInitialized) {
            $scope.displayValue = value;
            displayValueInitialized = true;
        } else $scope.displayValue += value;
    };

    $scope.operatorClick = function(event) {
        if (displayValueInitialized) {
            if (event.srcElement.value == '%') {
                $scope.displayValue = (parseInt($scope.displayValue) / 100).toString();
                isDecimal = true;
                displayValueInitialized = true;
            } else {
                isDecimal = false;
                $scope.mathExpression += $scope.displayValue + event.srcElement.value;
                displayValueInitialized = false;
            }
        }
    };

    $scope.addDecimal = function() {
        if (!displayValueInitialized) $scope.displayValue = '.';
        else if (!isDecimal) $scope.displayValue += '.';
        isDecimal = true;
        displayValueInitialized = true;
    };

    $scope.evaluateExpression = function() {
        $scope.mathExpression += $scope.displayValue + event.srcElement.value;
        $scope.displayValue = Parser.parse($scope.mathExpression).evaluate();
        if (isInt(parseInt($scope.displayValue))) isDecimal = false;
        $scope.mathExpression = '';
        displayValueInitialized = false;
    };

    $scope.resetCalculator = function() {
        $scope.mathExpression = '';
        $scope.displayValue = '0';
        displayValueInitialized = false;
        isDecimal = false;
    };
});