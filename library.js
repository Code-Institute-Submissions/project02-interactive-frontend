function getQueryText() {
    var varSearchQuery = document.getElementById("searchText").value; //Get user date input via form
    var varMediaType = document.querySelector('input[name="mediaType"]:checked').value;
    searchNASA(varSearchQuery, varMediaType);
}


function searchNASA(searchQueryText, varMediaType) {
    var varSearchResultContainer = document.getElementById("searchResultContainer");
    var varthumbnailContainer = document.getElementById("thumbnailContainer");
    var varSearchTextBox = document.getElementById("searchText");

    var xhr = new XMLHttpRequest();
    var url = "https://images-api.nasa.gov/search?q="+searchQueryText+"&media_type="+varMediaType;

    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var varNasaData = JSON.parse(this.responseText); //write out responseText as object
            //console.log(varNasaData);
            varSearchResultContainer.innerHTML = ""; //clear div between refreshes
            varthumbnailContainer.innerHTML = ""; //clear div between refreshes
            varSearchTextBox.textContent = ""; //clear div between refreshes

            var varTotalHits = varNasaData.collection.metadata.total_hits;
            document.getElementById('totalHits').innerHTML = varTotalHits; //total number of hits returned by call to API for query
            if (varNasaData.length !== 0) {
                getResultsData(varNasaData, varMediaType);
            }
            else {
                document.getElementById('searchResultContainer').textContent = "no results";
            }
        }
    };
}

function getResultsData(queryResponseData, varMediaType) {
    var resultObj = queryResponseData.collection; //collection
    var itemsArray = resultObj[Object.keys(resultObj)[1]]; //items

console.log(itemsArray.length);
console.log(itemsArray);


if (varMediaType === "image") {
    itemsArray.forEach(function(item) { //item: data href links, we want data[{}]
        var itemsDataObj = item.data; //data
        var itemsLinkObj = item.links; //links
        
        itemsDataObj.forEach(function(item) {
            var varTruncatedDescription = item.description.substring(0, 30)
            var indexNumber = itemsDataObj.indexOf(item);

            document.getElementById('searchResultContainer').innerHTML += "<div class='dataDetailsWrapper'>" +
                "<div class='dataDetails'>" + indexNumber + "</div>" +
                "<div class='dataDetails'>" + item.center + "</div>" +
                "<div class='dataDetails'>" + item.date_created + "</div>" +
                "<div class='dataDetails'>" + varTruncatedDescription + "</div>" +
                "<div class='dataDetails'>" + item.media_type + "</div>" +
                "<div class='dataDetails'>" + item.nasa_id + "</div>" +
                "<div class='dataDetails'>" + item.title + "</div>" +
                "</div>";

            itemsLinkObj.forEach(function(item) {
                //console.log(item.description, typeof(item));
                document.getElementById('thumbnailContainer').innerHTML += "<div class='image'>" +
                    "<img alt='item.href' id='imageID' src='" + item.href + "'/>" +
                    "</div>" +
                    "<div><br><br></div>";
            });
        });

    });
} else if (varMediaType === "video") {
    console.log ("video");
} else if (varMediaType === "audio") {
    console.log ("audio");
}


    // itemsArray.forEach(function(item) { //item: data href links, we want data[{}]
    //     var itemsImageLink = item.links; //image thumbnail link

    //     console.log(itemsImageLink, typeof(itemsImageLink));

    //     itemsImageLink.forEach(function(item) {
    //         //console.log(item.description, typeof(item));
    //         document.getElementById('thumbnailContainer').innerHTML += "<div class='image'>" +
    //             "<img id='imageID' src='" + item.href + "'/>" +
    //             "</div>" +
    //             "<div><br><br></div>";
    //     });


    // });
}
