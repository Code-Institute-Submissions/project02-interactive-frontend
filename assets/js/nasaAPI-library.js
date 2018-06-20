// START NASA IMAGE AND VIDEO LIBRARY ================================================================================== //


var currentLibraryPage = 1; //Library global variables for paging
var numberOfLibraryPages = 1; // calculates the total number of pages

var varLibraryQuery;
var varMediaType; // variable for holding media type selected by user; image, video, audio
var varNextPageUrl; // variable for holding the next page url returned by API
var varPrevPageUrl; // variable for holding the previous page url returned by API
var varFirstPageUrl; // variable for holding the first page
var varLastPageUrl; // variable for holding the last page

var linkToAudioJson;
var linkToVideoJson;


// Function called from Search button
// Values received from html form and validated
function getQueryText() {
    document.getElementById("errorLibraryMessage").textContent = ""; //clear div of any previous error messages
    varLibraryQuery = document.getElementById("searchLibraryText").value; //Get query text from form
    varMediaType = document.querySelector('input[name="mediaType"]:checked').value; //Get media type from form
    varFirstPageUrl = "https://images-api.nasa.gov/search?q=" + varLibraryQuery + "&page=1&media_type=" + varMediaType; //create url to send to NASA API
    if (varLibraryQuery !== "") {
        searchNASALibrary(varFirstPageUrl);
    }
    else {
        document.getElementById("errorLibraryMessage").innerHTML = "Please enter text to search the NASA Library.";
    }
}

// Call made to NASA Library API using XMLHttpRequest()
// Result object sent to getLibraryResultsData() for looping and rendering to HTML
function searchNASALibrary(pagedUrl) {
    var varLibraryResult = document.getElementById("libraryResults");
    var jsondiv = document.getElementById('jsondiv');
    var xhr = new XMLHttpRequest();
    var url = pagedUrl;

    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var varNasaLibraryData = JSON.parse(this.responseText); //parse responseText as json object
            varLibraryResult.innerHTML = ""; //clear div between refreshes
            document.getElementById("errorLibraryMessage").innerHTML = ""; //clear div between refreshes
            var varTotalLibraryHits = varNasaLibraryData.collection.metadata.total_hits; //check to see if any results came back from query

            if (varTotalLibraryHits !== 0 && varMediaType === "image") {
                document.getElementById('totalLibraryHits').innerHTML = varTotalLibraryHits; //total number of hits returned by call to API for search query
                getLibraryResultsDataImage(varNasaLibraryData, varMediaType);
            }
            else if (varTotalLibraryHits !== 0 && varMediaType === "audio") {
                document.getElementById('totalLibraryHits').innerHTML = varTotalLibraryHits; //total number of hits returned by call to API for search query
                getLibraryResultsDataAudio(varNasaLibraryData, varMediaType);
            }
            else if (varTotalLibraryHits !== 0 && varMediaType === "video") {
                document.getElementById('totalLibraryHits').innerHTML = varTotalLibraryHits; //total number of hits returned by call to API for search query
                getLibraryResultsDataVideo(varNasaLibraryData, varMediaType);
            }
            else {
                document.getElementById("errorLibraryMessage").innerHTML = "There were no <strong>" + varMediaType + "</strong> results for <strong>" + varLibraryQuery + "</strong>";
                $('#searchLibraryResultsContainer').hide();
            }
        }
    };
}

// Get data items from API result - Image
// Render data to HTML
function getLibraryResultsDataImage(queryResponseData, varMediaType) {
    let resultObj = queryResponseData.collection; // Get result collection
    let itemsArray = resultObj.items; // Get items array
    let pagingLinks = resultObj.links; // Get links array
    numberOfLibraryPages = Math.ceil(resultObj.metadata.total_hits / 100); // API returns results in lots of 100
    document.getElementById('pageNumber').innerHTML = currentLibraryPage; // Display Page pageNumber of pageCount
    document.getElementById('pageCount').innerHTML = numberOfLibraryPages; // Display Page pageNumber of pageCount
    document.getElementById('media-type').innerHTML = "- Images" //Display title search results for images

    // PAGING ======================
    checkLibraryResultButtons(); //disable/enable paging buttons as appropriate
    // Get next and previous page urls from results object for PAGING

    if (pagingLinks !== undefined) {
        if (pagingLinks[1] === undefined) {
            varNextPageUrl = pagingLinks[0]['href'];
        }
        else {
            varPrevPageUrl = pagingLinks[0]['href'];
            varNextPageUrl = pagingLinks[1]['href'];
        }
    }
    // Build last page url
    varLastPageUrl = "https://images-api.nasa.gov/search?q=" + varLibraryQuery + "&page=" + numberOfLibraryPages + "&media_type=" + varMediaType;

    $('#searchLibraryResultsContainer').show(); // Results div hidden when page loads. Show for results.
    if ($('#paging-buttons').hide()) { $('#paging-buttons').show(); }
    if ($('#pagingInfo').hide()) { $('#pagingInfo').show(); }

    itemsArray.forEach(function(item, i) { // Items: data, href, links, we need data[{}] array
        var itemsDataObj = item.data; // Data object
        var itemsThumbnailLinkObj = item.links; // Links object

        //iterate through Data object for item info
        itemsDataObj.forEach(function(item) {
            //iterate through Links object to get url for thumbnail image
            itemsThumbnailLinkObj.forEach(function(itemUrl) {
                var imageUrl = itemUrl.href;
                //send 'center' to getNasaCenter() to get its website
                var nasaCenterWebsite = getNasaCenter(item.center);
                var varTruncatedItemDescription = item.description;
                if (varTruncatedItemDescription.length > 22) {
                    varTruncatedItemDescription = varTruncatedItemDescription.substring(0, 170) + " ...";
                }
                // replace chars with html coded version
                var varItemFullDescription = escapeHtml(item.description);
                var varTruncatedDataDate = splitDate(item.date_created.substring(0, 10), 1); // Cut off UTC time and split out date into day, month, year

                // reinitiates the popover as the results are not on the page when loaded first
                $(function() {
                    var $trigger = $('.p-trigger').popover({
                        placement: 'right',
                        animation: true,
                        title: "Click to hide"
                    });
                });

                // id of div is set by using the value of the index (i) and appending it to text (libraryResultsItem)
                document.getElementById('libraryResults').innerHTML += "<div class='row' id='libraryResultsItem" + i + "'><div class='col-3 col-sm-2 text-center'>" +
                    "<a href='" + imageUrl + "' target='blank'><img src='" + imageUrl + "' alt='" + item.title + "' tooltip='" + item.title + "'/></a></div>" +
                    "<div class='col-9 col-sm-10'><p><strong>Title:</strong> " + item.title + "<br>" +
                    "<strong>Date created:</strong> " + varTruncatedDataDate.day + " " + varTruncatedDataDate.month + " " + varTruncatedDataDate.year + "<br>" +
                    "<strong>Center: </strong><a href='" + nasaCenterWebsite + "' target='blank'>Click to visit the " + item.center + " website.</a> <i class='fa fa-external-link' aria-hidden='true'></i><br>" +
                    "<strong>Nasa id:</strong> " + item.nasa_id + "<br>" +
                    "<strong>Description:</strong> " + varTruncatedItemDescription + "<br>" +
                    "<button class='p-trigger' href='#' data-content='" + varItemFullDescription + "' data-trigger='focus'>Read full description</button></p>" +
                    "</div></div>";

            }); // end thumbnail forEach
        }); // end data forEach

        // if the index (i) is divisable by 2 then it's even otherwise odd
        // different background colours are applied by css if row is even/odd
        if (i % 2 == 0) {
            document.getElementById('libraryResultsItem' + i).classList.add('evenColour');
        }
        else {
            document.getElementById('libraryResultsItem' + i).classList.add('oddColour');
        }
    });
}

// Get data items from API result - Audio
// Render data to HTML
function getLibraryResultsDataAudio(queryResponseData, varMediaType) {
    let resultObj = queryResponseData.collection; // Get result collection
    let itemsArray = resultObj.items; // Get items array
    numberOfLibraryPages = Math.ceil(resultObj.metadata.total_hits / 100); // API returns results in lots of 100
    document.getElementById('pageNumber').innerHTML = currentLibraryPage; // Display Page pageNumber of pageCount
    document.getElementById('pageCount').innerHTML = numberOfLibraryPages; // Display Page pageNumber of pageCount
    document.getElementById('media-type').innerHTML = "- Audio" //Display title search results for audio    

    $('#searchLibraryResultsContainer').show(); //Results div hidden when page loads. Show for results.
    $('#paging-buttons').hide();
    $('#pagingInfo').hide();

    itemsArray.forEach(function(item, i) { // Items: data, href, we need data[{}] array
        var itemsDataObj = item.data;
        var audioList = item.href; // href object with links to audio files
        //iterate through Data object for item info
        itemsDataObj.forEach(function(item) {

            //Get & parse JSON file of audio file links
            var xhr = new XMLHttpRequest();
            var url = audioList;
            xhr.open("GET", url);
            xhr.send();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    linkToAudioJson = JSON.parse(this.responseText);

                    // reinitiates the popover as the results are not on the page when loaded first
                    $(function() {
                        var $trigger = $('.p-trigger').popover({
                            placement: 'bottom',
                            animation: true,
                            title: "Click to hide"
                        });
                    });

                    //send 'center' to getNasaCenter() to get its website
                    var nasaCenterWebsite = getNasaCenter(item.center);
                    var varTruncatedItemDescription = item.description;
                    if (varTruncatedItemDescription.length > 22) {
                        varTruncatedItemDescription = varTruncatedItemDescription.substring(0, 100) + " ...";
                    }
                    // replace chars with html coded version
                    var varItemFullDescription = escapeHtml(item.description);
                    var varTruncatedDataDate = splitDate(item.date_created.substring(0, 10), 1); // Cut off UTC time and split out date into day, month, year

                    // id of div is set by using the value of the index (i) and appending it to text (libraryResultsItem)

                    document.getElementById('libraryResults').innerHTML += "<div class='col-6 col-md-3' id='libraryResultsItem" + i + "'>" +
                        "<p>" +
                        "<strong>Title: </strong>" + item.title + "<br>" +
                        "<strong>Date created: </strong>" + varTruncatedDataDate.day + " " + varTruncatedDataDate.month + " " + varTruncatedDataDate.year + "<br>" +
                        "<strong>Description: </strong> " + varTruncatedItemDescription + "<br>" +
                        "<strong>Center: </strong><a href='" + nasaCenterWebsite + "' target='blank'>Click to visit the " + item.center + " website.</a> <i class='fa fa-external-link' aria-hidden='true'></i><br>" +
                        "<strong>Nasa id: </strong>" + item.nasa_id + "<br>" +
                        "<strong>Audio: </strong><a href='" + linkToAudioJson[0] + "' target='blank'>Listen to original audio</a> <i class='fa fa-volume-up' aria-hidden='true'></i><br>" +
                        "<button class='p-trigger' href='#' data-content='" + varItemFullDescription + "' data-trigger='focus'>Read full description</button></p>" +
                        "</div>";

                    // if the index (i) is divisable by 2 then it's even otherwise odd
                    // different background colours are applied by css if row is even/odd
                    if (i % 2 == 0) {
                        document.getElementById('libraryResultsItem' + i).classList.add('evenColour');
                    }
                    else {
                        document.getElementById('libraryResultsItem' + i).classList.add('oddColour');
                    }
                }
            };


        }); // end data forEach     
    });
}

// Get data items from API result - Video
// Render data to HTML
function getLibraryResultsDataVideo(queryResponseData, varMediaType) {
    let resultObj = queryResponseData.collection; // Get result collection
    let itemsArray = resultObj.items; // Get items array
    numberOfLibraryPages = Math.ceil(resultObj.metadata.total_hits / 100); // API returns results in lots of 100
    document.getElementById('pageNumber').innerHTML = currentLibraryPage; // Display Page pageNumber of pageCount
    document.getElementById('pageCount').innerHTML = numberOfLibraryPages; // Display Page pageNumber of pageCount
    document.getElementById('media-type').innerHTML = "- Video" //Display title search results for video    

    $('#searchLibraryResultsContainer').show(); //Results div hidden when page loads. Show for results.
    $('#paging-buttons').hide();
    $('#pagingInfo').hide();

    itemsArray.forEach(function(item, i) { // Items: data, href, we need data[{}] array
        var itemsDataObj = item.data;
        var videoList = item.href; // href object with links to audio files
        //iterate through Data object for item info
        itemsDataObj.forEach(function(item) {

            //Get & parse JSON file of audio file links
            var xhr = new XMLHttpRequest();
            var url = videoList;
            xhr.open("GET", url);
            xhr.send();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    linkToVideoJson = JSON.parse(this.responseText);

                    // reinitiates the popover as the results are not on the page when loaded first
                    $(function() {
                        var $trigger = $('.p-trigger').popover({
                            placement: 'bottom',
                            animation: true,
                            title: "Click to hide"
                        });
                    });

                    //send 'center' to getNasaCenter() to get its website
                    var nasaCenterWebsite = getNasaCenter(item.center);
                    var varTruncatedItemDescription = item.description;
                    if (varTruncatedItemDescription.length > 22) {
                        varTruncatedItemDescription = varTruncatedItemDescription.substring(0, 100) + " ...";
                    }
                    // replace chars with html coded version
                    var varItemFullDescription = escapeHtml(item.description);
                    var varTruncatedDataDate = splitDate(item.date_created.substring(0, 10), 1); // Cut off UTC time and split out date into day, month, year

                    // id of div is set by using the value of the index (i) and appending it to text (libraryResultsItem)

                    document.getElementById('libraryResults').innerHTML += "<div class='col-6 col-md-3' id='libraryResultsItem" + i + "'>" +
                        "<p>" +
                        "<strong>Title: </strong>" + item.title + "<br>" +
                        "<strong>Date created: </strong>" + varTruncatedDataDate.day + " " + varTruncatedDataDate.month + " " + varTruncatedDataDate.year + "<br>" +
                        "<strong>Description: </strong> " + varTruncatedItemDescription + "<br>" +
                        "<strong>Center: </strong><a href='" + nasaCenterWebsite + "' target='blank'>Click to visit the " + item.center + " website.</a> <i class='fa fa-external-link' aria-hidden='true'></i><br>" +
                        "<strong>Nasa id: </strong>" + item.nasa_id + "<br>" +
                        "<strong>Audio: </strong><a href='" + linkToVideoJson[0] + "' target='blank'>Watch the video</a> <i class='fa fa-play' aria-hidden='true'></i><br>" +
                        "<button class='p-trigger' href='#' data-content='" + varItemFullDescription + "' data-trigger='focus'>Read full description</button></p>" +
                        "</div>";

                    // if the index (i) is divisable by 2 then it's even otherwise odd
                    // different background colours are applied by css if row is even/odd
                    if (i % 2 == 0) {
                        document.getElementById('libraryResultsItem' + i).classList.add('evenColour');
                    }
                    else {
                        document.getElementById('libraryResultsItem' + i).classList.add('oddColour');
                    }
                }
            };


        }); // end data forEach     
    });
}


// Next Button
$('#next-Button').click(function() {
    currentLibraryPage += 1;
    searchNASALibrary(varNextPageUrl);
});
// Previous Button
$('#previous-Button').click(function() {
    currentLibraryPage -= 1;
    searchNASALibrary(varPrevPageUrl);
});
// First Button
$('#first-Button').click(function() {
    currentLibraryPage = 1;
    searchNASALibrary(varFirstPageUrl);
});
// Last Button
$('#last-Button').click(function() {
    currentLibraryPage = numberOfLibraryPages;
    searchNASALibrary(varLastPageUrl);
});

// Enable/Disable paging buttons if necessary
function checkLibraryResultButtons() {
    document.getElementById("next-Button").disabled = currentLibraryPage == numberOfLibraryPages ? true : false;
    document.getElementById("previous-Button").disabled = currentLibraryPage == 1 ? true : false;
    document.getElementById("first-Button").disabled = currentLibraryPage == 1 ? true : false;
    document.getElementById("last-Button").disabled = currentLibraryPage == numberOfLibraryPages ? true : false;
}



// END NASA IMAGE AND VIDEO LIBRARY ================================================================================== //
