//global scope
var map;
var infowindow;
var request;
var service;
var markers = [];
var section = "";
var title = "";
var abstract = "";
// Initialize Firebase
// Used API key for google maps to lon
var config = {
    apiKey: "AIzaSyBY-s5tlp_CHpiB9hPD7itnEC8grnylHPc",
    authDomain: "mapapi-1531165016443.firebaseapp.com",
    databaseURL: "https://mapapi-1531165016443.firebaseio.com",
    projectId: "mapapi-1531165016443",
    storageBucket: "",
    messagingSenderId: "106823754719"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

//   The position for the make is relative to the users location 
function initialize() {
    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        // var center = new google.maps.LatLng(28.5383, -81.3792);
        map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 13
        });
        service = new google.maps.places.PlacesService(map);
        request = {
            location: pos,
            // in meter (5miles)
            radius: 8047,
            // use key words from google API key to find the coffee shops
            types: ["cafe"]
        };
        // opens info window in google map 
        infowindow = new google.maps.InfoWindow();
        service.nearbySearch(request, callback);
        // listen for click on map and take that to look for other coffe shops in that location 
        google.maps.event.addListener(map, 'rightclick', function (event) {
            map.setCenter(event.latLng)
            clearResults(markers)
            request = {
                location: event.latLng,
                radius: 8047,
                types: ["cafe"]
            };
            console.log(request);
            service.nearbySearch(request, callback);
            console.log(callback);
        })
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                infowindow.setPosition(pos);
                infowindow.setContent('Current Location.');
                infowindow.open(map);
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infowindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infowindow, map.getCenter());
        }
    });
    function handleLocationError(browserHasGeolocation, infowindow, pos) {
        infowindow.setPosition(pos);
        infowindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infowindow.open(map);
    }
}
//service.nearbySearch(request, callback);
// get back good result, no error connection to server
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var data = results.slice(0, 10);
        for (var i = 0; i < data.length; i++) {
            console.log(results);
            // var place = results[i];
            rate = results[i].rating;
            var rating = $("<tr>");
            rating.text(rate);
            $("#rating").append(rating);
            geo = results[i].vicinity;
            var location = $("<tr>");
            location.text(geo);
            $("#vicinity").append(location);
            name = results[i].name;
            var namely = $("<tr>");
            namely.text(name);
            $("#name").append(namely);
            markers.push(createMarker(results[i]));
            // console.log(markers);
        }
    }
}
// creates and places markers on map 
function createMarker(place) {
    console.log(place);
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    console.log(marker);
    // add lister for click on marker and info window pops
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
    return marker;
}
// clear markers off map everytime another click is made
function clearResults(markers) {
    for (var m in markers) {
        markers[m].setMap(null)
    }
    markers = []
}
google.maps.event.addDomListener(window, 'load', initialize);



$("#search").on("click", function (event) {
    event.preventDefault();
    // when this is added the user get asked twice for map verification
    // initialize();
    $("#coffeeInfo").show();
});


// use the api key for the NYT to add to the bottom of the page

function Headline() {
    $.ajax({
        url: "https://api.nytimes.com/svc/topstories/v2/home.json?" +
            "&api-key=72e2a44892c743248b362965fbe0d583&limit=10",
        method: "GET"
    }).then(function (response) {
        var news = response.results.slice(0, 5);

        // console.log(news);
        for (var i = 0; i < news.length; i++) {
            // console.log(news[i]);
            temp1 = news[i].section;
            var section = $("<tr>");
            section.text(temp1);
            $("#section").append(section);

            temp2 = news[i].title;
            var title = $("<tr>");
            title.text(temp2);
            $("#title").append(title);

            var temp3 = news[i].abstract;
            // console.log(temp1);

// creating a new section for each news headline by creatiing a (div)
           
            
            abstract = $("<tr>");
            abstract.text(temp3)
            $("#abstract").append(abstract);
        }
    });
};

//  Making the headline section
Headline();
database.ref().push({
    section: section,
    title: title,
    abstract: abstract,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
});
console.log(database);

// button on nav bar for Headlines only
$("#headLine").on("click", function () {
    $("#news").show();
});



$(function() {
    $(".preload").fadeOut(3000, function() {
        response();
        $(".content").fadeIn(1000);        
    });
});
