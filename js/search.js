//Function to fetch the api key from another file.
function getApiKey() {
    var url = "../getkey.aspx?youtubeapikey";

    var settings = {
        url: url,
        dataType: "text",
        cache: false
    };

    $.ajax(settings)
        .done(getApiKeySuccess);
}

// Function for when the getApiKey() is a success. Returns the key.
function getApiKeySuccess(data) {
    apikey = data;
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Getting the api key for youtube
var apikey = getApiKey();

// Called automatically when YouTube API interface is loaded.
function onYouTubeApiLoad() {

    //console.log(apikey);
    // Sending the api key to the youtube API service.
    gapi.client.setApiKey(apikey);
}

function search(query) {
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.

    var request = gapi.client.youtube.search.list({
        q: query,
        part: 'snippet',
        maxResults: 15,
        type: 'video',
    });

    // Fetching videos from the server.
    // Initilizing a request to fetch the JSON data.
    request.execute(function (response) {
        var items = response.items;

        if (items) {
            var ids = '';
            items.forEach(function (item) {
                if (ids != "") ids += ",";
                ids += item.id.videoId;
            });

            var secondrequest = gapi.client.youtube.videos.list({
                id: ids,
                part: 'id, snippet, statistics, contentDetails'
            });

            secondrequest.execute(showResponse);
            $(searchTitle).html('search results for "' + query + '"').parent().fadeIn();
        }

    });
}

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var count = 0;
    var items = response.items;
    if (items) {
        var contents = "";
        var ids = '';
        items.forEach(function (item) {
            if (ids != "") ids += ",";
            ids += item.id.videoId;
        });

        // Iterating though the response to arrange the data to be displayed on
        // the HTML page.
        items.forEach(function (item) {

            var titlename = trimString(item.snippet.title);

            contents += '<li class=""><div><iframe height="175" allowfullscreen="true" src=\"//www.youtube.com/embed/' + item.id + '\"></iframe>';
            contents += '<h2><a href="http://youtu.be/' + item.id + '" target="_blank" ' +
                'class="videoTitleLink">' + titlename + '</a></h2>';
            contents += '<div class="videoMeta"><div class="channel">by:' +
                '<a href="https://www.youtube.com/channel/' + item.snippet.channelId + '" ' +
                'target="_blank" class="channelNameLink">' + item.snippet.channelTitle + '</a></div>' +
                '<div class="duration">' + convertDuration(item.contentDetails.duration) + '</div></div>';
            contents += '<p class="videoDesc">' + item.snippet.description + '</p>';

            var dt = new Date(Date.parse(item.snippet.publishedAt));

            contents += '<div class="videoMeta"><div class="views">' + numberWithCommas(item.statistics.viewCount) + ' views</div><div class="ago" title="' + dateConvertFromWeird(item.snippet.publishedAt) + '">' + $.timeago(dt) + '</div></div></li>';
            count++;
        });
    }

    // Returning an error if the response results no objects.
    if (count === 0) {
        $(resultDiv).html("<p>Sorry. No Videos Found</p><p>Please Try With A Different Keyword</p>");
    } else {
        $(loader).hide();
        $(resultDiv).html(contents).fadeIn();
    }
}

// Function to fetch popular videos on the HTML page.
function randomVideos() {
    var request = gapi.client.youtube.videos.list({
        part: 'id, snippet, statistics, contentDetails',
        chart: 'mostPopular',
        maxResults: 15
    });

    // Calling the helper function again to structure the response for HTML page.
    request.execute(showResponse);
    $(searchTitle).html('most popular videos').parent().fadeIn();
}


// Function to trim the string to fit in the display.
// If the string is too long if will get trimmed and "..." will be
// appened to the end.
function trimString(str) {
    if (str.length > 36) {
        return shortText = jQuery.trim(str).substring(0, 35)
                .split(" ").slice(0, -1).join(" ") + "...";
    }
    return str;
}