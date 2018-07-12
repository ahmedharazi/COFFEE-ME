//global scope
var map;
var infowindow;

var request;
var service;
var markers = [];

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
            types: ['cafe']
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
                types: ['cafe']
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
            var rate = JSON.stringify(results[i].rating);
            var rating = $("<div>");
            rating.text(rate);
            $("#rating").append(rating);

            var geo = JSON.stringify(results[i].vicinity);
            var location = $("<div>");
            location.text(geo);
            $("#vicinity").append(location);
            var name = JSON.stringify(results[i].name);
            var namely = $("<div>");
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
    event.initialize();
})
//$("#map").append(map);





function Headline() {
    $.ajax({
        url: "https://api.nytimes.com/svc/topstories/v2/home.json?" +
            "&api-key=72e2a44892c743248b362965fbe0d583&limit=10",
        method: "GET"
    }).then(function (response) {
        var news = response.results.slice(0, 3);

        // console.log(news);
        for (var i = 0; i < news.length; i++) {
            // console.log(news[i]);
            var temp1 = JSON.stringify(news[i].section);
            var temp2 = JSON.stringify(news[i].title);
            var temp3 = JSON.stringify(news[i].abstract);
            // console.log(temp1);


            var section = $("<div>");
            section.text(temp1);
            var title = $("<div>");
            title.text(temp2);
            var abstract = $("<div>");
            abstract.text(temp3);

            $("#section").append(section);
            $("#title").append(title);
            $("#abstract").append(abstract);
        }
    });
};
Headline();