//home-index-factory.js
(function () {
    'use strict';
    console.log('inside: home-index-factory.js');

    angular.module('homeIndex')
    .factory("dataService", ["$http", "$q", "appSpinner", function ($http, $q, appSpinner) {
        var _callShowSpinner = function () {
            appSpinner.showSpinner();
        };
        var _callHideSpinner = function () {
            appSpinner.hideSpinner();
        };

        var _setMyInits = function () {
            console.log("inside: _setMyInits");
        };

        var _isInit = false;
        var _isReady = function () {
            return _isInit;
        }

        return {
            isReady: _isReady,

            setMyInits: _setMyInits,

            callShowSpinner: _callShowSpinner,
            callHideSpinner: _callHideSpinner
        };
    }])
})();