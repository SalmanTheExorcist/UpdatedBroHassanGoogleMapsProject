//MyJQueryPlayTime.js
//Date: March-22-2016 (Tuesday Night)
//
var MyApp = {};

//
function initializeMyJqueryPlayTime() {
    console.log('called initializeMyJqueryPlayTime()');
    //
    /*------------Here let's let the magic begin: --------------*/

    google.maps.event.addDomListener(window, 'load', retriveMyCurrentPossitionValuesUsingHTML5GeolocationAndThenLoadMyMap);

    /*------------------------------------------------------------*/
};
//

//

function retriveMyCurrentPossitionValuesUsingHTML5GeolocationAndThenLoadMyMap() {
    /*--setting an initial value--*/
    MyApp.MyPossitionObject = {
        latitudeValue: 0.0,
        longtitudeValue: 0.0
    };
    /*---------------------------*/

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            MyApp.MyPossitionObject.latitudeValue = position.coords.latitude;
            MyApp.MyPossitionObject.longtitudeValue = position.coords.longitude;
            //
            console.log('Location found.');
            //
            createAndLoadMyGoogleMap();
        }, function () {
            showGeoLocationErrorInConsole(true);
        });
    } else {
        // Browser doesn't support Geolocation
        showGeoLocationErrorInConsole(false);
    }
}

//

function createAndLoadMyGoogleMap() {
    //

    MyApp.MyGoogleMapPropertiesObject = {
        center: new google.maps.LatLng(MyApp.MyPossitionObject.latitudeValue, MyApp.MyPossitionObject.longtitudeValue),
        //center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    MyApp.MyMap = new google.maps.Map(document.getElementById("divMyMap"), MyApp.MyGoogleMapPropertiesObject);
    //
    //

    console.log(MyApp);
    //
    //
}

//
function showGeoLocationErrorInConsole(browserHasGeolocation) {
    console.log(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
//