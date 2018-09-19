
//global scope
 var map;
@@ -8,8 +7,21 @@ var infowindow;
var request;
var service;
var markers = [];
 var section = "";
var title = "";
var abstract = "";
 // Initialize Firebase
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
 function initialize() {
    navigator.geolocation.getCurrentPosition(function (position) {
@@ -93,16 +105,16 @@ function callback(results, status) {
        for (var i = 0; i < data.length; i++) {
            console.log(results);
            // var place = results[i];
            var rate = results[i].rating;
            rate = results[i].rating;
            var rating = $("<div>");
            rating.text(rate);
            $("#rating").append(rating);
             var geo = results[i].vicinity;
            geo = results[i].vicinity;
            var location = $("<div>");
            location.text(geo);
            $("#vicinity").append(location);
            var name = results[i].name;
            name = results[i].name;
            var namely = $("<div>");
            namely.text(name);
            $("#name").append(namely);
@@ -155,7 +167,7 @@ function Headline() {
            "&api-key=72e2a44892c743248b362965fbe0d583&limit=10",
        method: "GET"
    }).then(function (response) {
        var news = response.results.slice(0, 3);
        var news = response.results.slice(0, 5);
         // console.log(news);
        for (var i = 0; i < news.length; i++) {
@@ -166,11 +178,11 @@ function Headline() {
            // console.log(temp1);
             var section = $("<div>");
            section = $("<div>");
            section.text(temp1);
            var title = $("<div>");
            title = $("<div>");
            title.text(temp2);
            var abstract = $("<div>");
            abstract = $("<div>");
            abstract.text(temp3);
             $("#section").append(section);
@@ -179,4 +191,11 @@ function Headline() {
        }
    });
};
Headline(); 
Headline();
database.ref().push({
    section: section,
    title: title,
    abstract: abstract,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
});
console.log(database)
