//home-index-fourthexperimentation.controller.js
(function () {
    'use strict';
    console.log('inside: home-index-fourthexperimentation.controller.js');

    angular.module('homeIndex')
    .controller('fourthExperimentationController', ['$scope', '$http', 'dataService', function ($scope, $http, dataService) {
        $scope.data = dataService;

        //
        //
    }])
})();