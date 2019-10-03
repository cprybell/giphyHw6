var topicsArray = ["lab puppies", "soccer", "the office", "sopranos"];
var apiKey = "IeV1JVMe4hP3QnHoYlLcIllaNyepyGOf";

function addButton(buttonName) {
    var tempNewButton = $("<button>");
    tempNewButton.text(buttonName);
    tempNewButton.addClass("GIF-Button");
    tempNewButton.attr("topic", buttonName);
    $("#buttons").append(tempNewButton);
}

function createArrayButtons() {
    for (i = 0; i < topicsArray.length; i++) {
        addButton(topicsArray[i]);
    }
}

createArrayButtons();

$("#buttons").on("click", ".GIF-Button", function() {
    var buttonTopic = $(this).attr("topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    buttonTopic + "&api_key=" + apiKey +"&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
        var results = response.data;
        //console.log(JSON.stringify(response));
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("col-sm-10 col-md-10 col-lg-5 col-xl-5");
            gifDiv.attr("id", "gif-div");

            var rating = results[i].rating.toUpperCase();

            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img class=>");
            gifImage.attr("status", "still");
            gifImage.attr("gifURL", results[i].images.fixed_height.url);
            gifImage.attr("stillURL", results[i].images.fixed_height_still.url)
            gifImage.attr("class", "gif-image");
            gifImage.attr("src", results[i].images.fixed_height_still.url);

            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);

            $("#GIFs").prepend(gifDiv);
        }
    })
})

$("#GIFs").on("click", ".gif-image", function() {
    console.log("clicked");
    var gifStatus = $(this).attr("status");

    if (gifStatus === "still") {
        $(this).attr("src", $(this).attr("gifURL"));
        $(this).attr("status", "gif");
    }
    else {
        $(this).attr("src", $(this).attr("stillURL"));
        $(this).attr("status", "still");
    }
})

$(".button-add").on("click", function(event) {
    // prevent form from submitting
    event.preventDefault();

    $("#buttons").empty();
    var buttonText = $(".button-add-input").val().trim();
    topicsArray.push(buttonText);
    createArrayButtons();
})