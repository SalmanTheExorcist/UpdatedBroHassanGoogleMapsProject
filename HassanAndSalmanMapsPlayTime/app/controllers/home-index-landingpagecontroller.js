//home-index-landingpagecontroller.js
(function () {
    'use strict';
    console.log('inside: home-index-landingpagecontroller.js');

    angular.module('homeIndex')
    .controller('landingPageController', ['$scope', '$http', 'dataService', function ($scope, $http, dataService) {
        $scope.data = dataService;
        $scope.myCirclePropertiesHolderObject = {
            radius: 100,
            zoom: 16
        };
    }])
})();