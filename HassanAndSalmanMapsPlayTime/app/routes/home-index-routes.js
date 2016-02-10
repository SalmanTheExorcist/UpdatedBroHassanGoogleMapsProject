//home-index-routes.js
(function () {
    'use strict';
    console.log('inside: home-index-routes.js');
    angular.module('homeIndex')
    .config(['$routeProvider', function ($routeProvider) {
        //in here we specify the routes:

        $routeProvider.when('/', {
            templateUrl: '/app/templates/landingPageView.html',
            controller: 'landingPageController'
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }])
})();