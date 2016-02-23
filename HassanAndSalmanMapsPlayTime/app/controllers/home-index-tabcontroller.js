//home-index-tabcontroller.js
(function () {
    'use strict';
    console.log('inside: home-index-tabcontroller.js');

    angular.module('homeIndex')
    .controller('tabController', ['$scope', 'dataService', function ($scope, dataService) {
        $scope.tab = 0;
        $scope.setTab = function (val) {
            $scope.tab = val;
        };
        $scope.getTab = function () {
            return ($scope.tab);
        };
        $scope.setMyInits = function () {
            console.log("inside $scope.setMyInits ");
            dataService.setMyInits();
        };
    }]);
})();