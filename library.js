function getQueryText() {
    document.getElementById("errorMessage").textContent = "";
    var varLibraryQuery = document.getElementById("searchLibraryText").value; //Get user date input via form
    var varMediaType = document.querySelector('input[name="mediaType"]:checked').value;
    if (varLibraryQuery !== "") {
        searchNASALibrary(varLibraryQuery, varMediaType);
    }
    else {
        document.getElementById("errorMessage").textContent = "Please enter text to search.";
    }
}


function searchNASALibrary(searchLibraryText, varMediaType) {
    var varLibraryResult = document.getElementById("libraryResults");
    var varthumbnailContainer = document.getElementById("libraryThumbnailResults");

    var xhr = new XMLHttpRequest();
    var url = "https://images-api.nasa.gov/search?q=" + searchLibraryText + "&media_type=" + varMediaType;

    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var varNasaLibraryData = JSON.parse(this.responseText); //write out responseText as json object
            //console.log(varNasaData);
            varLibraryResult.innerHTML = ""; //clear div between refreshes
            varthumbnailContainer.innerHTML = ""; //clear div between refreshes
            //document.getElementById("searchLibraryText").value = ""; //clear div between refreshes

            var varTotalLibraryHits = varNasaLibraryData.collection.metadata.total_hits;
            document.getElementById('totalLibraryHits').innerHTML = varTotalLibraryHits; //total number of hits returned by call to API for search query
            if (varTotalLibraryHits !== 0) {
                getLibraryResultsData(varNasaLibraryData, varMediaType);
            }
            else {
                document.getElementById("errorMessage").innerHTML = "There were no results for <strong>" + searchLibraryText + "</strong>";
                $('#searchResultsContainer').hide(); 
            }
        }
    };
}

function getLibraryResultsData(queryResponseData, varMediaType) {
    var resultObj = queryResponseData.collection; // Get result collection
    var itemsArray = resultObj.items; // Get items array

    if (varMediaType === "image") {
        $('#searchResultsContainer').show(); // Results div hidden when page loads. Show for results.
        itemsArray.forEach(function(item) { // Items: data, href, links, we need data[{}] array
            var itemsDataObj = item.data; // Data object
            var itemsLinkObj = item.links; // Links object

            itemsDataObj.forEach(function(item) {
                var varTruncatedDataDescription = item.description.substring(0, 30)
                document.getElementById('libraryResults').innerHTML += "<div class='dataDetails'>Centre: " + item.center + "</div>" +
                    "<div class='dataDetails'>Date created: " + item.date_created + "</div>" +
                    "<div class='dataDetails'>Description: " + varTruncatedDataDescription + "</div>" +
                    "<div class='dataDetails'>Nasa id: " + item.nasa_id + "</div>" +
                    "<div class='dataDetails'>Title: " + item.title + "</div>";

                itemsLinkObj.forEach(function(item) {
                    //console.log(item.description, typeof(item));
                    document.getElementById('libraryThumbnailResults').innerHTML += "<div class='image'>" +
                        "<img alt='item.href' id='imageID' src='" + item.href + "'/>" +
                        "</div>" +
                        "<div><br><br></div>";
                });
            });

        });
    }
    else if (varMediaType === "video") {
        console.log("video");
    }
    else if (varMediaType === "audio") {
        console.log("audio");
    }
}
