//home-index.js

(function () {
    'use strict';
    console.log('inside: home-index.js');

    //doing the chaining-technique below:
    angular.module('homeIndex', ['ngRoute',
                                'ui.bootstrap.datetimepicker',
                                'ngCookies',
                                'ngResource',
                                'ngSanitize',
                                'ui.bootstrap',
                                'ngMap'])
    .run([function () {
        /* Run is when the app gets kicked off*/
        console.log("Run hook");
    }]);
})();