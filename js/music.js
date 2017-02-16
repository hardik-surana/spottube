// Making constants for the query that has to be passed onto
// the ajax request.
var spotifyUrl = "https://api.spotify.com/v1/search?q=";
var queryEnd = "&limit=15&type=track";


// Main function to make the ajax call with the query parameter
// which is being created using makeURL() function.
function getTracks() {
    $("#alltracks").empty();
    var url = makeUrl();
    var settings = {
        url: url,
        dataType: "json",
        cache: false
    };

    // Making the ajax request to the server.
    $.ajax(settings).done(getTrackSuccess);
}

// Function to create the query by getting the track name from the HTML page.
function makeUrl() {
    var trackname = $("#searchtrack").val();
    var trackUrl = spotifyUrl
    + encodeURI(trackname)
    + queryEnd;

    //console.log(trackUrl);

    return trackUrl;
}

// Helper function to structure the response to display on the HTML page
function getTrackSuccess(data) {

    // Iterating thought the response to structure each object in the response.
    $.each(data.tracks.items, function (key, obj) {

        var artistname = trimString(obj.artists[0].name);
        var trackname = trimString(obj.name);

        $("#alltracks").append('<div class="col-md-4"><img class="artwork" src=' + obj.album.images[1].url + '><img />' +
            '<h3>' + artistname + '</h3><h3>' + trackname + '</h3>' +
            '<a href=' + obj.album.external_urls.spotify + ' target="_blank">Open In Spotify</a>' +
            '<audio controls="controls" src=' + obj.preview_url + '></audio><hr class="hrstyle"/><br />')
    })

    //console.log(data);
}

// Function to manage the key press on the HTML page.
function keypressHandler(event) {

    if ((event.keyCode == '13') || (event.keyCode == '10')) {
        getTracks();
    }
}


// Initilizing function for key press
function initialize() {
    $("#searchtrack").keypress(keypressHandler);
}

$(initialize);

// Function to trim the string to fit in the display.
// If the string is too long if will get trimmed and "..." will be
// appened to the end.
function trimString(str) {
    if (str.length > 41) {
        return shortText = jQuery.trim(str).substring(0, 40)
                .split(" ").slice(0, -1).join(" ") + "...";
    }
    return str;
}