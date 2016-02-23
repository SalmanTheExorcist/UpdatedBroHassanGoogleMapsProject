//home-index-googleplacesexperiment.controller.js

(function () {
    'use strict';
    console.log('inside: home-index-googleplacesexperiment.controller.js');

    angular.module('homeIndex')
    .controller('googlePlacesExperimentationController', ['$scope', '$http', 'dataService', function ($scope, $http, dataService) {
        $scope.data = dataService;

        //
        //
    }])
})();