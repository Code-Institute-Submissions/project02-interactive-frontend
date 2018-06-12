// START NASA IMAGE AND VIDEO LIBRARY ================================================================================== //

//Library global variables for paging
var pageLibraryList = new Array();
var currentLibraryPage = 1;
var numberPerLibraryPage = 5;
var numberOfLibraryPages = 1; // calculates the total number of pages

var varMediaType; // variable for holding media type selected by user; image, video, audio
var varNextPageUrl; // variable for holding the next page url returned by API
var varPrevPageUrl; // variable for holding the previous page url returned by API


// Function called from Search button
// Values received from html form and validated
function getQueryText() {
    document.getElementById("errorLibraryMessage").textContent = ""; //clear div of any previous error messages
    var varLibraryQuery = document.getElementById("searchLibraryText").value; //Get query text from form
    varMediaType = document.querySelector('input[name="mediaType"]:checked').value; //Get media type from form
    var varPagedUrl = "https://images-api.nasa.gov/search?q=" + varLibraryQuery + "&page=1&media_type=" + varMediaType; //create url to send to NASA API
    if (varLibraryQuery !== "") {
        searchNASALibrary(varPagedUrl);
    }
    else {
        document.getElementById("errorLibraryMessage").innerHTML = "Please enter text to search the NASA Library.";
    }
}

// Call made to NASA Library API using XMLHttpRequest()
// Result object sent to getLibraryResultsData() for looping and rendering to HTML
function searchNASALibrary(pagedUrl) {
    var varLibraryResult = document.getElementById("libraryResults");
    var xhr = new XMLHttpRequest();
    var url = pagedUrl;

    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var varNasaLibraryData = JSON.parse(this.responseText); //parse responseText as json object
            varLibraryResult.innerHTML = ""; //clear div between refreshes
            document.getElementById("errorLibraryMessage").innerHTML = ""; //clear div between refreshes
            var varLibraryQuery = document.getElementById("searchLibraryText").value; //Get query text from form
            var varTotalLibraryHits = varNasaLibraryData.collection.metadata.total_hits; //check to see if any results came back from query
            if (varTotalLibraryHits !== 0) {
                document.getElementById('totalLibraryHits').innerHTML = varTotalLibraryHits; //total number of hits returned by call to API for search query
                getLibraryResultsData(varNasaLibraryData, varMediaType);
            }
            else {
                document.getElementById("errorLibraryMessage").innerHTML = "There were no <strong>" + varMediaType + "</strong> results for <strong>" + varLibraryQuery + "</strong>";
                $('#searchLibraryResultsContainer').hide();
            }
        }
    };
}


// Start get data items from Library API result
// Render data to HTML
function getLibraryResultsData(queryResponseData, varMediaType) {
    let resultObj = queryResponseData.collection; // Get result collection
    let itemsArray = resultObj.items; // Get items array
    let pagingLinks = resultObj.links; // Get links Object
    
    // Get next and previous urls from results object for PAGING
    if (pagingLinks[1] === undefined) {
        varNextPageUrl = pagingLinks[0]['href'];
    }
    else {
        varPrevPageUrl = pagingLinks[0]['href'];
        varNextPageUrl = pagingLinks[1]['href'];
    }

    document.getElementById('pageNumber').innerHTML = currentLibraryPage;
    document.getElementById('pageCount').innerHTML = numberOfLibraryPages;

    if (varMediaType === "image") {
        $('#searchLibraryResultsContainer').show(); // Results div hidden when page loads. Show for results.

        itemsArray.forEach(function(item, i) { // Items: data, href, links, we need data[{}] array
            var itemsDataObj = item.data; // Data object
            var itemsThumbnailLinkObj = item.links; // Links object

            //iterate through Data object for item info
            itemsDataObj.forEach(function(item) {
                //nasaCenter(item.center);
                //iterate through Links object to get url for thumbnail image
                itemsThumbnailLinkObj.forEach(function(itemUrl) {
                    var imageUrl = itemUrl.href;
                    var varTruncatedDataDescription = item.description.substring(0, 170);
                    var varTruncatedDataDate = splitDate(item.date_created.substring(0, 10), 1); // Cut off UTC time and split out date into day, month, year

                    // id of div is set by using the value of the index (i) and appending it to text (libraryResultsItem)
                    document.getElementById('libraryResults').innerHTML += "<div class='row' id='libraryResultsItem" + i + "'><div class='col-3 col-sm-2 text-center'>" +
                        "<a href='" + imageUrl + "' target='blank'><img src='" + imageUrl + "' alt='" + item.title + "' tooltip='" + item.title + "'/></a></div>" +
                        "<div class='col-9 col-sm-10'><p><strong>Title:</strong> " + item.title + "<br>" +
                        "<strong>Date created:</strong> " + varTruncatedDataDate.day + " " + varTruncatedDataDate.month + " " + varTruncatedDataDate.year + "<br>" +
                        "<strong>Description:</strong> " + varTruncatedDataDescription + "...<br>" +
                        "<strong>Center:</strong> " + item.center + "<br>" +
                        "<strong>Nasa id:</strong> " + item.nasa_id + "</p>" +
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
    else if (varMediaType === "video") {
        console.log("video");
    }
    else if (varMediaType === "audio") {
        console.log("audio");
    }
}

//Next Button
$('#nextButton').click(function() {
    currentLibraryPage += 1;
    searchNASALibrary(varNextPageUrl);
});
// Previous Button
$('#previousButton').click(function() {
    currentLibraryPage -= 1;
    searchNASALibrary(varPrevPageUrl);
});

// Paging the library result to ten items per page
function pageTheLibraryResult(resultLibraryApi) {
    numberOfLibraryPages = getNumberOfLibraryPages(resultLibraryApi);
    numberOfLibraryImages = resultLibraryApi.length;

    var begin = ((currentLibraryPage - 1) * numberPerLibraryPage);
    var end = begin + numberPerLibraryPage;

    pageLibraryList = resultLibraryApi.slice(begin, end);
    checkLibraryResultButtons();
    return pageLibraryList;
}

// Get total number of items returned from API
function getNumberOfLibraryPages(resultLibraryApi) {
    return Math.ceil(resultLibraryApi.length / numberPerLibraryPage);
}


// First Item Button
function firstLibraryPage() {
    currentLibraryPage = 1;
    getQueryText();
}

// Last Item Button
function lastLibraryPage() {
    currentLibraryPage = numberOfLibraryPages;
    getQueryText();
}

// Enable/Disable paging buttons if necessary
function checkLibraryResultButtons() {
    document.getElementById("nextButton").disabled = currentLibraryPage == numberOfLibraryPages ? true : false;
    document.getElementById("previousButton").disabled = currentLibraryPage == 1 ? true : false;
    document.getElementById("firstLibrary").disabled = currentLibraryPage == 1 ? true : false;
    document.getElementById("lastLibrary").disabled = currentLibraryPage == numberOfLibraryPages ? true : false;
}

// END  NASA IMAGE AND VIDEO LIBRARY ================================================================================== //
