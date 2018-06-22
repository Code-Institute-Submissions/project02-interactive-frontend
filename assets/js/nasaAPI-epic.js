// START EPIC WITH ONE ITEM PER PAGE  - PAGING ================================================================================== //
// GET DATA Using Fetch

// EPIC Global variables for paging
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 1;
var numberOfPages = 1; // calculates the total number of pages
var currentImageNumber = 1;
var numberOfImages = 1;

// Function called from Search button
// Call made to EPIC API using FETCH. Result Object returned
// Result object sent to getResultItems() for looping and rendering to HTML
// with help from Simen Daehlin on slack
function getEpicImageByDate() {
    if (document.getElementById("formDate").value !== "") {
        document.getElementById("errorMessage").innerHTML = ""; //clear div between refreshes
        $('#epicMostRecentContainer').hide(200);
        let varDate = document.getElementById("formDate").value; //Get user date input via form
        let objDateSplitUp = splitDate(varDate, 0); //objDateSplitUp is an object containing year, month, day
        let varImageType = document.querySelector('input[name="imageType"]:checked').value; //get image type from form
        let varDataCol = document.getElementById("dataCol");
        let varImageCol = document.getElementById("imageCol");

        //scroll window to results
        $('html, body').animate({
            scrollTop: $("#jumpto1").offset().top - 20
        }, 'slow');

        // START OF GET DATA USING FETCH
        if (varImageType === "enhanced") {
            $('#epicMostRecentContainer').hide(); // If most recent EPIC image showing then hide
            let url = fetch("https://api.nasa.gov/EPIC/api/enhanced/date/" + varDate + "?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ") //call to API for enhanced images on a specified date
                .then(function(response) {
                    if (response.ok) {
                        return response.json(); // parses response to JSON
                    }
                    throw new Error('There was a problem connecting to NASA. Please try again later. EPIC Search is only compatible with Chrome or Firefox.'); //catch connection errors
                }).then(function(result) {
                    varDataCol.innerHTML = ""; //clear div between refreshes
                    varImageCol.innerHTML = ""; //clear div between refreshes
                    document.getElementById('resultStatus').innerHTML = ""; //clear div between refreshes

                    let totalResultCount = result.length; //get total count of results returned
                    document.getElementById('resultStatus').innerHTML += "<p class='text-faded'>There were <span class='font-weight-bold'>" + totalResultCount + "</span> enhanced images found for <br><span class='font-weight-bold'>" +
                        objDateSplitUp.day + "-" + objDateSplitUp.month + "-" + objDateSplitUp.year + "</span></p>"; //Results message to site user
            
                    if (result.length !== 0) {
                        // Send result object to function 'pageTheResult()' to slice the object for paging
                        let pagedResultEnhanced = pageTheResult(result);
                        // Send the sliced object to 'getResultItems()' for looping and rendering to HTML
                        getResultItems(pagedResultEnhanced, varImageType, objDateSplitUp, varDataCol, varImageCol, totalResultCount);
                    }
                    else {
                        $('#epicResultsContainer').show(200);
                        $('#pagingRow').hide();
                        $('#epicMostRecentContainer').hide(300); // If most recent EPIC image showing then hide
                        document.getElementById('resultStatus').innerHTML += "<p class='text-faded'>Please note images were not captured before 01 September 2015 or there were no images captured for the date: " +
                            +objDateSplitUp.day + "-" + objDateSplitUp.month + "-" + objDateSplitUp.year;
                    }
                }).catch(function(error) {
                    console.log('Error in NASA EPIC enhanced request.', error.message);
                });
        }
        else if (varImageType === "natural") {
            $('#epicMostRecentContainer').hide(); // If most recent EPIC image showing then hide
            let url = fetch("https://api.nasa.gov/EPIC/api/natural/date/" + varDate + "?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ") //call to API for natural images on a specified date
                .then(function(response) {
                    if (response.ok) {
                        return response.json(); // parses response to JSON
                    }
                    throw new Error('There was a problem connecting to NASA. Please try again later.'); //catch connection errors
                }).then(function(result) {
                    varDataCol.innerHTML = ""; //clear div between refreshes
                    varImageCol.innerHTML = ""; //clear div between refreshes
                    document.getElementById('resultStatus').innerHTML = ""; //clear div between refreshes
                    let totalResultCount = result.length; //Get total count of results returned
                    document.getElementById('resultStatus').innerHTML += "<p class='text-faded'>There were <span class='font-weight-bold'>" + totalResultCount + "</span> natural images found for <br><span class='font-weight-bold'>" +
                        objDateSplitUp.day + "-" + objDateSplitUp.month + "-" + objDateSplitUp.year + "</span></p>"; //Results message to site user

                    if (result.length !== 0) {
                        // Send result object to function 'pageTheResult()' to slice the object for paging
                        let pagedResultNatural = pageTheResult(result);

                        // Send the sliced object to 'getResultItems()' for looping and rendering to HTML
                        getResultItems(pagedResultNatural, varImageType, objDateSplitUp, varDataCol, varImageCol, totalResultCount);
                    }
                    else {
                        $('#epicResultsContainer').show(200);
                        $('#pagingRow').hide();
                        $('#epicMostRecentContainer').hide(200); // If most recent EPIC image showing then hide
                        document.getElementById('resultStatus').innerHTML += "<p class='text-faded'>Please note images were not captured before 01 September 2015 or there were no images captured for the date: " +
                            +objDateSplitUp.day + "-" + objDateSplitUp.month + "-" + objDateSplitUp.year;
                    }
                }).catch(function(error) {
                    console.log('Error in NASA EPIC natural request.', error.message);
                });

        }
        // END OF GET DATA USING FETCH
    }
    else {
        $('#epicMostRecentContainer').hide(200); // If most recent EPIC image showing then hide
        if ($('#errorMessage').css("display", "none")) {$('#errorMessage').show(100);} // if error message showing then hide
        document.getElementById("errorMessage").textContent = "Please enter a date to search.";
    }

} //end of getEpicImageByDate()

// Start get data items from API result
// Render data to HTML
function getResultItems(result, varImageType, objDateSplitUp, varDataCol, varImageCol, totalResultCount) {
    if (result.length !== 0) {
        $('#epicResultsContainer').show(300);
        $('#pagingRow').show();// Results div hidden when page loads. Show for results.
        result.forEach(function(item) {
            let epicImageTypeUrl = "https://epic.gsfc.nasa.gov/archive/" + varImageType + "/" + objDateSplitUp.year + "/" + objDateSplitUp.month + "/" + objDateSplitUp.day + "/jpg/" + item.image + ".jpg";
            let distanceToSun = dscovrDistance(item.dscovr_j2000_position.x, item.dscovr_j2000_position.y, item.dscovr_j2000_position.z, item.sun_j2000_position.x, item.sun_j2000_position.y, item.sun_j2000_position.z).toLocaleString();
            let distanceToEarth = dscovrDistance(0, 0, 0, item.dscovr_j2000_position.x, item.dscovr_j2000_position.y, item.dscovr_j2000_position.z).toLocaleString();
            //Text data
            varDataCol.innerHTML += "<div class='imageData'>" +
                "<div><strong>Image name:</strong> " + item.image + ".jpg</div>" +
                "<div>" + item.caption + "</div>" +
                "<div><strong>Centroid coordinates: </strong>Lat: " + item.centroid_coordinates.lat + ", Lon: " + item.centroid_coordinates.lon + "</div>" +
                "<div><a href='https://www.google.ie/maps/@" + item.centroid_coordinates.lat + "," + item.centroid_coordinates.lon + ",4z' target='_blank'>View this location on Google Maps</a> <i class='fa fa-external-link' aria-hidden='true'></i></div>" +
                "<div><strong>Dscovr distance to the Sun:</strong> " + distanceToSun + "km</div>" +
                "<div><strong>Dscovr distance from the Earth:</strong> " + distanceToEarth + "km</div>" +
                "<div><a href='" + epicImageTypeUrl + "' target='blank'>View full size image</a>  <i class='fa fa-external-link' aria-hidden='true'></i></div>" +
                "<div class='mt-3'><b>Showing image: </b>" + currentImageNumber + " of " + totalResultCount + "</div>" +
                "</div>";

            //Images natural and enhanced
            varImageCol.innerHTML += "<div class='earthImage'>" +
                "<img id='imageID' src='" + epicImageTypeUrl + "'/>" +
                "</div>";
        });
    }
    else {
        document.getElementById('resultStatus').innerHTML += "<p class='text-faded'>Please note images were not captured before 01 September 2015 or there were no images captured for the date: " +
            +objDateSplitUp.day + "-" + objDateSplitUp.month + "-" + objDateSplitUp.year;
    }

} //End get data items from API result

// Paging the result to one item per page
function pageTheResult(resultApiResponse) {
    numberOfPages = getNumberOfPages(resultApiResponse);
    numberOfImages = resultApiResponse.length;

    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = resultApiResponse.slice(begin, end);
    check();
    return pageList;
}

// Get total number of items returned from API
function getNumberOfPages(resultApiResponse) {
    return Math.ceil(resultApiResponse.length / numberPerPage);
}

// Next Button
function nextPage() {
    currentPage += 1;
    currentImageNumber += 1;
    getEpicImageByDate();
}

// Previous Button
function previousPage() {
    currentPage -= 1;
    currentImageNumber -= 1;
    getEpicImageByDate();
}

// First Item Button
function firstPage() {
    currentPage = 1;
    currentImageNumber = 1;
    getEpicImageByDate();
}

// Last Item Button
function lastPage() {
    currentPage = numberOfPages;
    currentImageNumber = numberOfImages;
    getEpicImageByDate();
}

// Enable/Disable paging buttons if necessary
function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}

// END EPIC  =========================================================================================================== //

// START EPIC MOST RECENT IMAGE ======================================================================================== //

// Get latest image received from EPIC 
function getMostRecentEpic() {
    //scroll window to results
    $('html, body').animate({
        scrollTop: $("#jumpto2").offset().top -50
    }, 'slow');

    // START OF GET DATA
    let varMostRecentImagesDiv = document.getElementById("epicMostRecentImage");
    let varMostRecentDataDiv = document.getElementById("epicMostRecentData");
    let url = fetch("https://api.nasa.gov/EPIC/api/enhanced/images?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ") //call to API for natural images
        .then(function(response) {
            if (response.ok) {
                return response.json(); // parses response to JSON
            }
            throw new Error('There was a problem connecting to NASA. Please try again later.'); //catch connection errors
        }).then(function(result) {
            varMostRecentImagesDiv.innerHTML = ""; //clear div between refreshes
            varMostRecentDataDiv.innerHTML = "";
            if (result.length !== 0) {
                let mostRecent = result[result.length - 1]; //get last array item
                let imageDate = splitDate(mostRecent.date, 0); //split the date up into year, month, day
                let strImageDay = imageDate.day; //this contains day and time
                strImageDay = strImageDay.substring(0, strImageDay.length - 9); //remove time from date string
                $('#epicMostRecentContainer').show(300); // Results div hidden when page loads. Show for results.
                $('#epicResultsContainer').hide(300); // if EPIC results showing then hide
                if ($('#errorMessage').show()) {$('#errorMessage').hide(100);} // if error message showing then hide

                varMostRecentDataDiv.innerHTML += "<div><strong>Image name:</strong> " + mostRecent.image + ".jpg</div>" +
                    "<div><strong>Image date and time: </strong>" + mostRecent.date + "</div>" +
                    "<div>" + mostRecent.caption + "</div>";

                //Images natural and enhanced
                varMostRecentImagesDiv.innerHTML += "<div class='earthImage'>" +
                    "<a href='https://epic.gsfc.nasa.gov/archive/enhanced/" + imageDate.year + "/" + imageDate.month + "/" + strImageDay + "/jpg/" + mostRecent.image + ".jpg' target='blank'><img id='imageID' src='https://epic.gsfc.nasa.gov/archive/enhanced/" + imageDate.year + "/" + imageDate.month + "/" + strImageDay + "/jpg/" + mostRecent.image + ".jpg'/></a>" +
                    "</div>";
            }
            else {
                document.getElementById('imageStatus').textContent = 'Please note images were not captured before 2015-09-01 or there were no images captured for that date:';
            }
        }).catch(function(error) {
            console.log('Request failed', error.message);
        });
}

// END EPIC MOST RECENT IMAGE ======================================================================================== //

