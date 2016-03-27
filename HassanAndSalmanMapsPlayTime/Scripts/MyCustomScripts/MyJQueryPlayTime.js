//MyJQueryPlayTime.js
//Date: March-22-2016 (Tuesday Night)
//
var MyApp = {};

//
function initializeMyJqueryPlayTime() {
    console.log('called initializeMyJqueryPlayTime()');
    //
    //
    /*------------Here let's let the magic begin: --------------*/

    // google.maps.event.addDomListener(window, 'load', retriveMyCurrentPossitionValuesUsingHTML5GeolocationAndThenLoadMyMap);
    $('#btnLoadMyMap').click(retriveMyCurrentPossitionValuesUsingHTML5GeolocationAndThenLoadMyMap);
    $('#btnSearchNearPlaces').click(doSearchForPlacesNearBy);
    /*------------------------------------------------------------*/
};
//

//
function doSearchForPlacesNearBy() {
    showMyOverLay();

    // console.log(MyApp);
    MyApp.MyGooglePlacesService.nearbySearch({
        location: new google.maps.LatLng(MyApp.MyPossitionObject.latitudeValue, MyApp.MyPossitionObject.longtitudeValue),
        radius: MyApp.scaleInputRadiusValue//,
        // type: ['store']
    }, mySearchPlacesCallbackFunction);
}
//

function mySearchPlacesCallbackFunction(searchResultsArray, searchResultsStatus) {
    console.log("inside mySearchPlacesCallbackFunction(searchResultsArray, searchResultsStatus)");
    console.log("searchResultsStatus: " + searchResultsStatus);
    console.log("searchResultsArray.length: " + searchResultsArray.length);
    // console.log(searchResultsArray[0]);
    //
    if (searchResultsStatus === google.maps.places.PlacesServiceStatus.OK) {
        $('#lblSearchResultsCount').text("Search Found (" + searchResultsArray.length + ") Points-Of-Interests");
        $('#tableSearchPlacesResults > tbody').empty();
        for (var i = 0; i < searchResultsArray.length; i++) {
            var strTableRowHtml = "<tr>";

            strTableRowHtml = strTableRowHtml + "<td>" + (i + 1) + "</td>";
            strTableRowHtml = strTableRowHtml + "<td>" + searchResultsArray[i].name + "</td>";
            strTableRowHtml = strTableRowHtml + "<td>" + searchResultsArray[i].types[0] + "</td>";
            strTableRowHtml = strTableRowHtml + "<td></td>";
            strTableRowHtml = strTableRowHtml + "<td></td>";
            strTableRowHtml = strTableRowHtml + "<td></td>";
            strTableRowHtml = strTableRowHtml + "</tr>";
            $('#tableSearchPlacesResults > tbody').append(strTableRowHtml);
        }
    }
    //

    stopMyOverLay();
    //
}

//
function retriveMyCurrentPossitionValuesUsingHTML5GeolocationAndThenLoadMyMap() {
    showMyOverLay();

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
    MyApp.scaleInputZoomValue = parseInt($('#scaleInputZoom').val());
    MyApp.MyGoogleMapPropertiesObject = {
        center: new google.maps.LatLng(MyApp.MyPossitionObject.latitudeValue, MyApp.MyPossitionObject.longtitudeValue),
        //center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: MyApp.scaleInputZoomValue,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    MyApp.MyMap = new google.maps.Map(document.getElementById("divMyMap"), MyApp.MyGoogleMapPropertiesObject);
    //
    MyApp.MyGooglePlacesService = new google.maps.places.PlacesService(MyApp.MyMap);
    //

    //
    addBouncingMarkerToMyCurrentPosition();
    //
    addCircleAroundMyCurrentPosition();
    //
    displayMyMapObjectProperties();
    //
    //console.log(MyApp);
    //
    //
    //
    stopMyOverLay();
    //
}
//
function addCircleAroundMyCurrentPosition() {
    MyApp.scaleInputRadiusValue = parseInt($('#scaleInputRadius').val());

    MyApp.MyCircleObject = new google.maps.Circle({
        center: new google.maps.LatLng(MyApp.MyPossitionObject.latitudeValue, MyApp.MyPossitionObject.longtitudeValue),
        radius: MyApp.scaleInputRadiusValue,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.4
    });
    MyApp.MyCircleObject.setMap(MyApp.MyMap);
}
//
function addBouncingMarkerToMyCurrentPosition() {
    MyApp.MyBouncingMarker = new google.maps.Marker({
        position: new google.maps.LatLng(MyApp.MyPossitionObject.latitudeValue, MyApp.MyPossitionObject.longtitudeValue),
        animation: google.maps.Animation.BOUNCE
    });

    MyApp.MyBouncingMarker.setMap(MyApp.MyMap);
}

//
function displayMyMapObjectProperties() {
    $('#lblCurrentPositionLatitude').text(roundTheNumberToTwoDecimalPlacesAndReturnTheNewValue(MyApp.MyMap.getCenter().lat()));
    $('#lblCurrentPositionLongtitude').text(roundTheNumberToTwoDecimalPlacesAndReturnTheNewValue(MyApp.MyMap.getCenter().lng()));
    $('#lblMapZoomValue').text(MyApp.MyMap.zoom);
    $('#lblCircleRadius').text(MyApp.MyCircleObject.radius);
    $('#divMyMapInformation').removeClass('hidden');
}
//
function roundTheNumberToTwoDecimalPlacesAndReturnTheNewValue(givenNumber) {
    return Math.round(givenNumber * 100) / 100;
}
//
function showGeoLocationErrorInConsole(browserHasGeolocation) {
    console.log(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');

    //
    stopMyOverLay();
    //
}
//

function showMyOverLay() {
    $(".myBigPageRowForOverLay").plainOverlay('show');
}
function stopMyOverLay() {
    $(".myBigPageRowForOverLay").plainOverlay('hide');
}