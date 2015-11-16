app = angular.module('calculatorApp', []);

app.controller('calcCtrl', function($scope) {
    $scope.displayValue = 0;
    $scope.mathExpression = ''; // TODO Use parser.js (https://github.com/silentmatt/js-expression-eval/tree/master) to parse expression

    var displayValueInitialized = false;

    $scope.numberClick = function(value) {
        if (!displayValueInitialized) {
            $scope.displayValue = value;
            displayValueInitialized = true;
        } else $scope.displayValue += value;
    };

    $scope.operatorClick = function(event) {
        $scope.mathExpression += $scope.displayValue + event.srcElement.value;
        displayValueInitialized = false;
        console.log($scope.mathExpression);
    };

    $scope.evaluateExpression = function() {
        $scope.mathExpression += $scope.displayValue + event.srcElement.value;
        console.log($scope.mathExpression);
        $scope.displayValue = Parser.parse($scope.mathExpression).evaluate();
        displayValueInitialized = false;
    };
});