app = angular.module('calculatorApp', []);

app.controller('calcCtrl', function($scope) {
    $scope.displayValue = '0';

    var displayValueInitialized = false,
        displayIsDecimal = false,
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
                displayIsDecimal = true;
                displayValueInitialized = true;
            } else {
                displayIsDecimal = false;
                displayValueInitialized = false;
                $scope.mathExpression += $scope.displayValue + event.srcElement.value;
            }
        }
    };

    $scope.addDecimal = function() {
        if (!displayValueInitialized) $scope.displayValue = '0.';
        else if (!displayIsDecimal) $scope.displayValue += '.';
        displayValueInitialized = true;
        displayIsDecimal = true;
    };

    $scope.evaluateExpression = function() {
        var mathExpressionLength = $scope.mathExpression.length;
        var expressionEndsInOperator = '+-/*'.indexOf($scope.mathExpression.charAt(mathExpressionLength -1)) > -1;
        if (expressionEndsInOperator) $scope.mathExpression = $scope.mathExpression.slice(0, mathExpressionLength-1);
        if (displayValueInitialized) $scope.mathExpression += $scope.displayValue + event.srcElement.value;
        $scope.displayValue = Parser.parse($scope.mathExpression).evaluate();
        if (isInt(parseInt($scope.displayValue))) displayIsDecimal = false;
        $scope.mathExpression = '';
        displayValueInitialized = true;
    };

    $scope.resetCalculator = function() {
        $scope.mathExpression = '';
        $scope.displayValue = '0';
        displayValueInitialized = false;
        displayIsDecimal = false;
    };
});