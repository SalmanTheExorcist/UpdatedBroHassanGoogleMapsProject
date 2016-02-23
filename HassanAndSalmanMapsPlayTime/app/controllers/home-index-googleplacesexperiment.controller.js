//home-index-googleplacesexperiment.controller.js

(function () {
    'use strict';
    console.log('inside: home-index-googleplacesexperiment.controller.js');

    angular.module('homeIndex')
    .controller('googlePlacesExperimentationController', ['$scope', '$http', 'dataService', 'NgMap', function ($scope, $http, dataService, NgMap) {
        $scope.data = dataService;
        //
        $scope.myCirclePropertiesHolderObject = {
            radius: 200,
            zoom: 16,
            circle_center_lat: 0,
            circle_center_lag: 0
        };
        $scope.map = null;
        NgMap.getMap().then(function (map) {
            $scope.map = map;
            $scope.myCirclePropertiesHolderObject.circle_center_lat = $scope.map.getCenter().lat();
            $scope.myCirclePropertiesHolderObject.circle_center_lag = $scope.map.getCenter().lng();
            console.log(map.getCenter());
        });

        //
        //
    }])
})();