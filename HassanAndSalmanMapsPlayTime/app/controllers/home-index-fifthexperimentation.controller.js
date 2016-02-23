//home-index-fifthexperimentation.controller.js
(function () {
    'use strict';
    console.log('inside: home-index-fifthexperimentation.controller.js');

    angular.module('homeIndex')
    .controller('fifthExperimentationController', ['$scope', '$http', 'dataService', function ($scope, $http, dataService) {
        $scope.data = dataService;

        //
        //
    }])
})();