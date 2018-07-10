
function Headline() {
    $.ajax({
        url: "https://api.nytimes.com/svc/topstories/v2/home.json?"
            + "&api-key=72e2a44892c743248b362965fbe0d583&limit=10",
        method: "GET"
    }).then(function (response) {
        var news = response.results;

        console.log(news);
        for (var i = 0; i < news.length; i++) {
            console.log(news[i]);
            var temp1 = JSON.stringify(news[i].section);
            var temp2 = JSON.stringify(news[i].title);
            var temp3 = JSON.stringify(news[i].abstract);
            console.log(temp1);


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


var map;
var infowindow;
var request;
var service;
var markers = [];

function initialize() {
    var center = new google.maps.LatLng(28.5383, -81.3792);
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13
    });

    request = {
        location: center,
        // in meter (5miles)
        radius: 8047,
        types: ['cafe']
    };
    // opens info window in google map 
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

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
        service.nearbySearch(request, callback);
    })
}

// get back good result, no error connection to server
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            // var place = results[i];
            markers.push(createMarker(results[i]));
        }
    }
}

// creates and places markers on map 
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

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