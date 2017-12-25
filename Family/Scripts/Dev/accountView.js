var app = angular.module('app', ['customFilters'])
.controller("mainCtrl", function ($scope, $http) {


    var toDay = new Date();
    $scope.startYear = '2015';
    $scope.endYear = toDay.getFullYear().toString();
    $scope.year = $scope.endYear;
    $scope.month = (toDay.getMonth() + 1).toString();


    $scope.GetAccountView = function () {
        $http.get("/Dev/GetAccountView", {
            params: { year: $scope.year, month: $scope.month }
        }).success(function (data) {
            $scope.AccountView = data.list;
        });
    }

    $scope.GetAccountView();
});