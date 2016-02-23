//home-index-thirdexperimentation.controller.js
(function () {
    'use strict';
    console.log('inside: home-index-thirdexperimentation.controller.js');

    angular.module('homeIndex')
    .controller('thirdExperimentationController', ['$scope', '$http', 'dataService', function ($scope, $http, dataService) {
        $scope.data = dataService;

        //
        //
    }])
})();