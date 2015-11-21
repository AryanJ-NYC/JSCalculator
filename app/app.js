app = angular.module('calculatorApp', []);

app.controller('calcCtrl', function($scope) {
    $scope.displayValue = '0';
    $scope.mathExpression = '';
    var displayValueInitialized = false,
        displayIsDecimal = false,
        isInt = function(number) { return number % 1 === 0};

    function replaceAt(string, index, character) {
        return string.substr(0, index) + character + string.substr(index + character.length);
    }
    function mathExpressionEndsInOperator() {
        var mathExpressionLength = $scope.mathExpression.length;
        return '+-/*'.indexOf($scope.mathExpression.charAt(mathExpressionLength -1)) > -1;
    }

    $scope.numberClick = function(value) {
        if (!displayValueInitialized) {
            $scope.displayValue = value;
            if (mathExpressionEndsInOperator()) {
                $scope.mathExpression += value;
            } else {
                $scope.mathExpression = value;
            }
        } else {
            $scope.displayValue += value;
            $scope.mathExpression += value;
        }
        displayValueInitialized = true;
    };

    $scope.operatorClick = function(event) {
        if ($scope.mathExpression !== '') {
            var operator = event.srcElement.value;
            var mathExpressionLength = $scope.mathExpression.length;
            if (operator == '%') {
                $scope.displayValue = parseInt($scope.displayValue) / 100;
                $scope.mathExpression += '/100';
            } else {
                if (!mathExpressionEndsInOperator()) {
                    displayIsDecimal = false;
                    displayValueInitialized = false;
                    $scope.mathExpression += operator;
                } else {
                    $scope.mathExpression = replaceAt($scope.mathExpression, mathExpressionLength - 1, operator);
                }
            }
        }
    };

    $scope.addDecimal = function() {
        if (!displayValueInitialized) {
            $scope.displayValue = '0.';
            $scope.mathExpression += $scope.displayValue;
        } else if (!displayIsDecimal) {
            $scope.displayValue += '.';
            $scope.mathExpression += '.';
        }
        displayValueInitialized = true;
        displayIsDecimal = true;
    };

    $scope.evaluateExpression = function() {
        var mathExpressionLength = $scope.mathExpression.length;
        if (mathExpressionEndsInOperator()) $scope.mathExpression = $scope.mathExpression.slice(0, mathExpressionLength-1);
        $scope.displayValue = $scope.mathExpression = Parser.parse($scope.mathExpression).evaluate().toString();
        if (isInt(parseInt($scope.displayValue))) displayIsDecimal = false;
        displayValueInitialized = false;
    };

    $scope.resetCalculator = function() {
        $scope.mathExpression = '';
        $scope.displayValue = '0';
        displayValueInitialized = false;
        displayIsDecimal = false;
    };
});