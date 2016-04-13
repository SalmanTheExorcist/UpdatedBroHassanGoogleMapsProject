//MyJQueryPlayTime.js
//Date: March-22-2016 (Tuesday Night)
//
var MyApp = {};
MyApp.LookupArrayPlacesTypes = [
    "accounting",
    "airport",
    "amusement_park",
    "aquarium",
    "art_gallery",
    "atm",
    "bakery",
    "bank",
    "bar",
    "beauty_salon",
    "bicycle_store",
    "book_store",
    "bowling_alley",
    "bus_station",
    "cafe",
    "campground",
    "car_dealer",
    "car_rental",
    "car_repair",
    "car_wash",
    "casino",
    "cemetery",
    "church",
    "city_hall",
    "clothing_store",
    "convenience_store",
    "courthouse",
    "dentist",
    "department_store",
    "doctor",
    "electrician",
    "electronics_store",
    "embassy",
    "fire_station",
    "florist",
    "funeral_home",
    "furniture_store",
    "gas_station",
    "grocery_or_supermarket",
    "gym",
    "hair_care",
    "hardware_store",
    "hindu_temple",
    "home_goods_store",
    "hospital",
    "insurance_agency",
    "jewelry_store",
    "laundry",
    "lawyer",
    "library",
    "liquor_store",
    "local_government_office",
    "locksmith",
    "lodging",
    "meal_delivery",
    "meal_takeaway",
    "mosque",
    "movie_rental",
    "movie_theater",
    "moving_company",
    "museum",
    "night_club",
    "painter",
    "park",
    "parking",
    "pet_store",
    "pharmacy",
    "physiotherapist",
    "plumber",
    "police",
    "post_office",
    "real_estate_agency",
    "restaurant",
    "roofing_contractor",
    "rv_park",
    "school",
    "shoe_store",
    "shopping_mall",
    "spa",
    "stadium",
    "storage",
    "store",
    "subway_station",
    "synagogue",
    "taxi_stand",
    "train_station",
    "transit_station",
    "travel_agency",
    "university",
    "veterinary_care",
    "zoo",
    "administrative_area_level_1",
    "administrative_area_level_2",
    "administrative_area_level_3",
    "administrative_area_level_4",
    "administrative_area_level_5",
    "colloquial_area",
    "country",
    "establishment",
    "finance",
    "floor",
    "food",
    "general_contractor",
    "geocode",
    "health",
    "intersection",
    "locality",
    "natural_feature",
    "neighborhood",
    "place_of_worship",
    "political",
    "point_of_interest",
    "post_box",
    "postal_code",
    "postal_code_prefix",
    "postal_code_suffix",
    "postal_town",
    "premise",
    "room",
    "route",
    "street_address",
    "street_number",
    "sublocality",
    "sublocality_level_4",
    "sublocality_level_5",
    "sublocality_level_3",
    "sublocality_level_2",
    "sublocality_level_1",
    "subpremise"

];
MyApp.MyPlacesObjectsArrayForHTMLTable = [];
//
function initializeMyJqueryPlayTime() {
    console.log('called initializeMyJqueryPlayTime()');
    //
    $('#btnJQueryPromisesPlayTime').click(function (evt) {
        evt.preventDefault();
        //
        myJqueryPromisesPlayTimeFunc();

        //
    });

    //
    fillDrpLocationTypes();
    //

    /*------------Here let's let the magic begin: --------------*/

    // google.maps.event.addDomListener(window, 'load', retriveMyCurrentPossitionValuesUsingHTML5GeolocationAndThenLoadMyMap);
    $('#btnLoadMyMap').click(retriveMyCurrentPossitionValuesUsingHTML5GeolocationAndThenLoadMyMap);
    $('#btnSearchNearPlaces').click(doSearchForPlacesNearBy);
    /*------------------------------------------------------------*/
};
//
/*-------------Jquery-Promises And Defered Stuff Starting Below-----*/
/*------------------------------------------------------------------*/
function myJqueryPromisesPlayTimeFunc() {
    showMyOverLay();
    console.log("inside: myJqueryPromisesPlayTimeFunc()");

    withPromise_retriveMyCurrentPossitionValuesUsingHTML5GeolocationAndThenLoadMyMap(MyApp).done(function () {
        withPromise_doSearchForPlacesNearByAndFillMyPlacesObjectsArray(MyApp).done(function () {
            withPromise_fillDistancesValuesFromGoogleGeometry(MyApp).done(function () {
                console.log("MyApp object is now: ");
                console.log(MyApp);
            });
            //
        });
    });
}
//
var withPromise_fillDistancesValuesFromGoogleGeometry = function (MyApp) {
    var _deferred = new $.Deferred();
    //
    console.log("now inside: withPromise_fillDistancesValuesFromGoogleGeometry()");
    //

    // return promise so that outside code cannot reject/resolve the deferred
    return _deferred.promise();
}
var withPromise_doSearch = function (searchResultsArray, searchResultsStatus, MyApp) {
    var _deferred = new $.Deferred();
    console.log("Inside: withPromise_doSearch()");
    //looping through the Array-Of-Places Results
    $.each(searchResultsArray, function (key, value) {
        MyApp.MyPlacesObjectsArrayForHTMLTable.push({
            id: "" + key + "",
            placeName: "" + value.name + "",
            type: "" + getStringLocationsConcatenatedFromArray(value.types) + "",
            distanceFromCenter: "--- meters",
            latitudeHorizontalLines: "" + roundTheNumberToTwoDecimalPlacesAndReturnTheNewValue(value.geometry.location.lat()) + "",
            longtitudeVerticalLines: "" + roundTheNumberToTwoDecimalPlacesAndReturnTheNewValue(value.geometry.location.lng()) + ""
        }
    )
    });
    //

    // return promise so that outside code cannot reject/resolve the deferred
    return _deferred.promise();
}
var withPromise_doSearchForPlacesNearByAndFillMyPlacesObjectsArray = function (MyApp) {
    var _deferred = new $.Deferred();

    var strSelectedPlaceType = $("#drpLocationTypes option:selected").val();

    MyApp.MyGooglePlacesService.nearbySearch({
        location: new google.maps.LatLng(MyApp.MyPossitionObject.latitudeValue, MyApp.MyPossitionObject.longtitudeValue),
        radius: MyApp.scaleInputRadiusValue
    }, function (searchResultsArray, searchResultsStatus) {
        if (searchResultsStatus === google.maps.places.PlacesServiceStatus.OK) {
            withPromise_doSearch(searchResultsArray, searchResultsStatus, MyApp).done(_deferred.resolve(MyApp));
        }
        else {
            _deferred.reject();
        }
    });

    // return promise so that outside code cannot reject/resolve the deferred
    return _deferred.promise();
}
var withPromise_retriveMyCurrentPossitionValuesUsingHTML5GeolocationAndThenLoadMyMap = function (MyApp) {
    var _deferred = new $.Deferred();
    //

    /*--setting an initial value--*/
    MyApp.MyPossitionObject = {
        latitudeValue: 0.0,
        longtitudeValue: 0.0
    };
    /*---------------------------*/
    MyApp.scaleInputZoomValue = parseInt($('#scaleInputZoom').val());
    MyApp.scaleInputRadiusValue = parseInt($('#scaleInputRadius').val());
    MyApp.MyGoogleMapPropertiesObject = {
        center: new google.maps.LatLng(MyApp.MyPossitionObject.latitudeValue, MyApp.MyPossitionObject.longtitudeValue),
        zoom: MyApp.scaleInputZoomValue,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    MyApp.MyMap = new google.maps.Map(document.getElementById("divMyMap"), MyApp.MyGoogleMapPropertiesObject);
    MyApp.MyGooglePlacesService = new google.maps.places.PlacesService(MyApp.MyMap);

    /*-----------------------------*/
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            MyApp.MyPossitionObject.latitudeValue = position.coords.latitude;
            MyApp.MyPossitionObject.longtitudeValue = position.coords.longitude;
            //
            console.log('Location found.');

            MyApp.scaleInputZoomValue = parseInt($('#scaleInputZoom').val());
            MyApp.MyGoogleMapPropertiesObject = {
                center: new google.maps.LatLng(MyApp.MyPossitionObject.latitudeValue, MyApp.MyPossitionObject.longtitudeValue),
                zoom: MyApp.scaleInputZoomValue,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            _deferred.resolve(MyApp);
            //  createAndLoadMyGoogleMap();
        }, function () {
            showGeoLocationErrorInConsole(true);
        });
    } else {
        // Browser doesn't support Geolocation
        showGeoLocationErrorInConsole(false);
        _deferred.reject();
    }

    // return promise so that outside code cannot reject/resolve the deferred
    return _deferred.promise();
}
/*-------------Jquery-Promises And Defered Stuff Above-----------------*/
/*---------------------------------------------------------------------*/
//
function fillDrpLocationTypes() {
    $("#drpLocationTypes").find('option').remove();
    $("#drpLocationTypes").append('<option value="-1">All Location Types</option>');
    $.each(MyApp.LookupArrayPlacesTypes, function (index, listItem) {
        var strOption = '<option value="' + listItem + '">' + listItem + '</option>';
        $("#drpLocationTypes").append(strOption);
    });
}
//
function doSearchForPlacesNearBy() {
    showMyOverLay();

    // console.log(MyApp);
    var strSelectedPlaceType = $("#drpLocationTypes option:selected").val();
    console.log(strSelectedPlaceType);
    if (strSelectedPlaceType == "-1") {
        MyApp.MyGooglePlacesService.nearbySearch({
            location: new google.maps.LatLng(MyApp.MyPossitionObject.latitudeValue, MyApp.MyPossitionObject.longtitudeValue),
            radius: MyApp.scaleInputRadiusValue
        }, mySearchPlacesCallbackFunction);
    }
    else {
        MyApp.MyGooglePlacesService.nearbySearch({
            location: new google.maps.LatLng(MyApp.MyPossitionObject.latitudeValue, MyApp.MyPossitionObject.longtitudeValue),
            radius: MyApp.scaleInputRadiusValue,
            type: ['' + strSelectedPlaceType + '']
        }, mySearchPlacesCallbackFunction);
    }
}
//

function fillInTheDistanceProperty(searchResultsArray) {
    var _distancesArray = [];
    for (var i = 0; i < searchResultsArray.length; i++) {
        MyApp.MyGooglePlacesService.getDetails({
            placeId: searchResultsArray[i].place_id
        }, function (place, status, searchResultsArray, i) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var myDistance = google.maps.geometry.spherical.computeDistanceBetween(place.geometry.location, MyApp.MyBouncingMarker.position);
                console.log("myDistance");
                console.log(myDistance);
                searchResultsArray[i]["distance"] = myDistance;
            }
            else {
                searchResultsArray[i]["distance"] = "Not-OK!";
            }
        });
    }

    return this;
}
//
function drawAndFillMyHTMLTable(searchResultsArray) {
    //---Setting Defaults----
    $('#tableSearchPlacesResults > tbody').empty();
    $('#lblSearchResultsCount').text("Search Found ( 0 ) Points-Of-Interests");
    //
    for (var i = 0; i < searchResultsArray.length; i++) {
        var strTableRowHtml = "<tr>";

        strTableRowHtml = strTableRowHtml + "<td>" + (i + 1) + "</td>";
        strTableRowHtml = strTableRowHtml + "<td>" + searchResultsArray[i].name + "</td>";
        strTableRowHtml = strTableRowHtml + "<td>" + getStringLocationsConcatenatedFromArray(searchResultsArray[i].types) + "</td>";
        strTableRowHtml = strTableRowHtml + "<td>" + searchResultsArray[i].distance + "</td>";
        strTableRowHtml = strTableRowHtml + "<td>" + roundTheNumberToTwoDecimalPlacesAndReturnTheNewValue(searchResultsArray[i].geometry.location.lat()) + "</td>";
        strTableRowHtml = strTableRowHtml + "<td>" + roundTheNumberToTwoDecimalPlacesAndReturnTheNewValue(searchResultsArray[i].geometry.location.lng()) + "</td>";
        strTableRowHtml = strTableRowHtml + "</tr>";
        $('#tableSearchPlacesResults > tbody').append(strTableRowHtml);
    }

    $('#lblSearchResultsCount').text("Search Found (" + searchResultsArray.length + ") Points-Of-Interests");
    //
    return this;
}
//
function mySearchPlacesCallbackFunction(searchResultsArray, searchResultsStatus) {
    console.log("inside mySearchPlacesCallbackFunction(searchResultsArray, searchResultsStatus)");
    console.log("searchResultsStatus: " + searchResultsStatus);
    console.log("searchResultsArray.length: " + searchResultsArray.length);

    ///---Now doing real search---
    if (searchResultsStatus === google.maps.places.PlacesServiceStatus.OK) {
        fillInTheDistanceProperty(searchResultsArray).drawAndFillMyHTMLTable(searchResultsArray);
    }
    //

    stopMyOverLay();
    //
}
//

function doSearchPlaceDetailsByPlaceIDAndReturnDistance(paramPlaceID) {
    //---TODO: Add required Coded

    MyApp.MyGooglePlacesService.getDetails({
        placeId: paramPlaceID
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var myDistance = google.maps.geometry.spherical.computeDistanceBetween(place.geometry.location, MyApp.MyBouncingMarker.position);
            console.log("myDistance");
            console.log(myDistance);
            return myDistance;
        }
        else {
            return "Not-OK!";
        }
    });

    //
}

//
function getStringLocationsConcatenatedFromArray(mySpecificPlaceLocationTypesArray) {
    var strConcatenatedLocationsString = "<ul class='text-left'>";
    for (var i = 0; i < mySpecificPlaceLocationTypesArray.length; i++) {
        strConcatenatedLocationsString = strConcatenatedLocationsString + "<li>" + mySpecificPlaceLocationTypesArray[i] + "</li>";
    }
    strConcatenatedLocationsString = strConcatenatedLocationsString + "</ul>";
    return strConcatenatedLocationsString;
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
    //

    MyApp.MyCircleObject.setMap(MyApp.MyMap);
    //
    //MyApp.MyCircleObject.bindTo('center', MyApp.MyBouncingMarker, 'position');
    //--Date: Wednesday March-30th-2016
    //-- added below line, and hence we have hidden
    //-- the second inputScaler (Zoom) no longer need.
    // MyApp.MyMap.fitBounds(MyApp.MyCircleObject.getBounds());
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