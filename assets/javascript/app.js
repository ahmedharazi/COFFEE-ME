var limit = 10;
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
            //$("#section").text(section);
            $("#section").append(section);
            $("#title").append(title);
            $("#abstract").append(abstract);
        }
    });
};
Headline();