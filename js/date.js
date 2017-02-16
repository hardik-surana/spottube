// Function to convert the duration of the videos, which is recieved from the
// response of the call to youtube server.
// The duration is in seconds and this function is used to convert it into
// proper format.
function convertDuration(duration)
{
	var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
	var hours = 0, minutes = 0, seconds = 0, totalseconds;
	
	if (reptms.test(duration)) {
	var matches = reptms.exec(duration);
	if (matches[1]) hours = Number(matches[1]);
	if (matches[2]) minutes = Number(matches[2]);
	if (matches[3]) seconds = Number(matches[3]);
	totalseconds = hours * 3600  + minutes * 60 + seconds;
	}
    var d=new Date(0,0,0);
    d.setSeconds(+totalseconds);
    return (d.getHours() ? d.getHours()+':' : '')+d.getMinutes()+':'+d.getSeconds();
}

// Function to retrieve the query variable from the query parameter.
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

// Function to retireve the URL path of the current page.
function getCurrentPageURL()
{
	return "" + window.location.protocol + "://" + window.location.host + "/" + window.location.pathname;
}

// Function which returns the ouput with numbers with commas(,)
// in between
function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}


// Function to convert a garbage date to proper format.
function dateConvertFromWeird(dt)
{
	var d = new Date(Date.parse(dt));
    var toreturn =  d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    return toreturn;
}

// Function to convert a date into string format
function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}