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

        $routeProvider.when('/googlePlacesExperimentation', {
            templateUrl: '/app/templates/googlePlacesExperimentView.html',
            controller: 'googlePlacesExperimentationController'
        });

        $routeProvider.when('/thirdexperiment', {
            templateUrl: '/app/templates/thirdExperimentView.html',
            controller: 'thirdExperimentationController'
        });

        $routeProvider.when('/fourthexperiment', {
            templateUrl: '/app/templates/fourthExperimentView.html',
            controller: 'fourthExperimentationController'
        });

        $routeProvider.when('/fifthexperiment', {
            templateUrl: '/app/templates/fifthExperimentView.html',
            controller: 'fifthExperimentationController'
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }])
})();