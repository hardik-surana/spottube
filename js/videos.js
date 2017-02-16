var searched = decodeURIComponent(getQueryVariable("query"));
var form = $('#searchvideosForm');
var loader = $('#resultLoading')
var resultDiv = $('#searchResult');
var searchTitle = $('#searchTitle div.title');


// Function to pass to the query the text field and
// fetch the data from the API server
$(function () {

    if (searched != false && $.trim(searched) != "" && searched != "false") {
        $(form).find("input.tosearch").val(searched);
        $(loader).slideDown();
        runAutoSearch();
    }
    else {
        runAutoRandom();
    }
    $(form).find("input.tosearch").focus();

    form.submit(function (event) {
        event.preventDefault();
        $(loader).slideDown();
        var query = $(form).find("input.tosearch").val();
        if ($.trim(query) != "") {
            currentURL = getCurrentPageURL();
            history.pushState(null, null, "?query=" + query);
            search(query);
        }
        else return false;
    });

});


// Helper function to be called on submitting the form.
function runAutoSearch() {
    setTimeout(function () {
        if (gapi.client && gapi.client.youtube)
            search(searched);
        else runAutoSearch()
    }, 500)
}

// Function to fetch random popular videos from youtube
function runAutoRandom() {
    setTimeout(function () {
        if (gapi.client && gapi.client.youtube)
            randomVideos();
        else runAutoRandom()
    }, 500)
}