//home-index-landingpagecontroller.js
(function () {
    'use strict';
    console.log('inside: home-index-landingpagecontroller.js');

    angular.module('homeIndex')
    .controller('landingPageController', ['$scope', '$http', 'dataService', function ($scope, $http, dataService) {
        $scope.data = dataService;
        //
        //$scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMrD1y782H_DWSR-Y02QLxGzOAdFbWJP4";
        //
        $scope.myCirclePropertiesHolderObject = {
            radius: 100,
            zoom: 16
        };
    }])
})();