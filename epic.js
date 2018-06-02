// EPIC ==================================================================================
function getAllImages() {
  // START OF GET DATA
  let varImagesDiv = document.getElementById("allImagesResult");
  let url = fetch("https://api.nasa.gov/EPIC/api/natural/images?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ") //call to API for enhanced images on a specified date
    .then(function(response) {
      if (response.ok) {
        return response.json(); // parses response to JSON
      }
      throw new Error('Network response was not ok.'); //catch connectin errors
    }).then(function(result) {
      console.log(result);
      varImagesDiv.innerHTML = ""; //clear div between refreshes
      document.getElementById('totalCount').textContent = result.length; //total number of records returned by call to API
      
 
      if (result.length !== 0) {
          document.getElementById('imageStatus').textContent = 'Found';
          let mostRecent = result[result.length - 1];
          let imageDate = splitDate(mostRecent.date);
          let strImageDate = imageDate.day;
          strImageDate = strImageDate.substring(0, strImageDate.length - 9);
          
          console.log(strImageDate);
          //Text data
          varImagesDiv.innerHTML += "<div>" + mostRecent.image +  "</div>" + 
          "<div>" + mostRecent.date +  "</div>" +
          "<div>" + mostRecent.caption +  "</div>" +
          "<div><a href='https://epic.gsfc.nasa.gov/archive/natural/" + imageDate.year + "/" + imageDate.month + "/" + strImageDate + "/jpg/" + mostRecent.image + ".jpg'>view image</a></div>" +

          "<div><br><br></div>";
        
      }
      else {
        document.getElementById('imageStatus').textContent = 'Please note images were not captured before 2015-09-01 or there were no images captured for that date:';
      }
    }).catch(function(error) {
      console.log('Request failed', error.message);
    });
}
// END OF GET DATA


function getEpicImageByDate() {
  let varDate = document.getElementById("formDate").value; //Get user date input via form
  let objDateSplitUp = splitDate(varDate); //varDateSplitUp is an object containing year, month, day
  let varImageType = document.querySelector('input[name="imageType"]:checked').value;
  let varDataCol = document.getElementById("dataCol");
  let varImageCol = document.getElementById("imageCol");

  // START OF GET DATA
  if (varImageType === "enhanced") {
    let url = fetch("https://api.nasa.gov/EPIC/api/enhanced/date/" + varDate + "?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ") //call to API for enhanced images on a specified date
      .then(function(response) {
        if (response.ok) {
          return response.json(); // parses response to JSON
        }
        throw new Error('Network response was not ok.'); //catch connectin errors
      }).then(function(result) {
        console.log(result);
        varDataCol.innerHTML = ""; //clear div between refreshes
        varImageCol.innerHTML = ""; //clear div between refreshes
        document.getElementById('totalCount').textContent = result.length; //total number of records returned by call to API
        getResultItems(result, varImageType, objDateSplitUp, varDataCol, varImageCol);
      }).catch(function(error) {
        console.log('Request failed', error.message);
      });
  }
  else if (varImageType === "natural") {
    let url = fetch("https://api.nasa.gov/EPIC/api/natural/date/" + varDate + "?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ") //call to API for natural images on a specified date
      .then(function(response) {
        if (response.ok) {
          return response.json(); // parses response to JSON
        }
        throw new Error('Network response was not ok.'); //catch connection errors
      }).then(function(result) {
        console.log(result);
        varDataCol.innerHTML = ""; //clear div between refreshes
        varImageCol.innerHTML = ""; //clear div between refreshes

        document.getElementById('totalCount').textContent = result.length; //total number of records returned by call to API

        getResultItems(result, varImageType, objDateSplitUp, varDataCol, varImageCol);

      }).catch(function(error) {
        console.log('Request failed', error.message);
      });

  }
  // END OF GET DATA

} //end of getEpicImageByDate()


// Calculation found on https://www.calculatorsoup.com/calculators/geometry-solids/distance-two-points.php
// Calculate 3D distance between two sets of xyz coordinates
function discovrDistance(x1, y1, z1, x2, y2, z2) {
  var xSqr = (x2 - x1) * (x2 - x1);
  var ySqr = (y2 - y1) * (y2 - y1);
  var zSqr = (z2 - z1) * (z2 - z1);
  var d = xSqr + ySqr + zSqr;
  d = Math.sqrt(d);
  d = Math.round(d);
  return d;
}

//Function to split date into components:2015-10-31  return object of year:2015 month:10 day:31
function splitDate(varDate) {
  var varDateArray = varDate.split("-"); //break up date for url int year, month, day
  var varYear = varDateArray[0]; //year
  var varMonth = varDateArray[1]; //month
  var varDay = varDateArray[2]; //day
  return { year: varYear, month: varMonth, day: varDay }
}

//Start get data items from API result
function getResultItems(result, varImageType, objDateSplitUp, varDataCol, varImageCol) {

  if (result.length !== 0) {
    result.forEach(function(item) {
      document.getElementById('imageStatus').textContent = 'Found';
      let epicNaturalUrl = "https://epic.gsfc.nasa.gov/archive/" + varImageType + "/" + objDateSplitUp.year + "/" + objDateSplitUp.month + "/" + objDateSplitUp.day + "/jpg/" + item.image + ".jpg";
      let distanceToSun = discovrDistance(item.dscovr_j2000_position.x, item.dscovr_j2000_position.y, item.dscovr_j2000_position.z, item.sun_j2000_position.x, item.sun_j2000_position.y, item.sun_j2000_position.z).toLocaleString();
      let distanceToEarth = discovrDistance(0, 0, 0, item.dscovr_j2000_position.x, item.dscovr_j2000_position.y, item.dscovr_j2000_position.z).toLocaleString();
      console.log(item.image);
      //Text data
      varDataCol.innerHTML += "<div class='imageData'>" +
        "<div class='imageName'>" + item.image + "</div>" +
        "<div class='imageCaption'>" + item.caption + "</div>" +
        "<div class='imageCount'><b>Showing image: </b>" + (result.indexOf(item) + 1) + " of " + +result.length + "</div>" +
        "<div class='imageCoord'>Lat: " + item.centroid_coordinates.lat + " Lon: " + item.centroid_coordinates.lon + "</div>" +
        "<div class='imageGoogleMaps'><a href='https://www.google.ie/maps/@" + item.centroid_coordinates.lat + "," + item.centroid_coordinates.lon + ",4z' target='_blank'>view on Google Maps</a></div>" +
        "<div class='distanceSun'>distance To Sun: " + distanceToSun + "km</div>" +
        "<div class='distanceEarth'>distance To Earth: " + distanceToEarth + "km</div>" +
        "<div'><br><br></div>" +
        "</div>";

      //Images natural and enhanced
      varImageCol.innerHTML += "<div class='image'>" +
        "<img id='imageID' src='" + epicNaturalUrl + "'/>" +
        "</div>" +
        "<div><br><br></div>";
    });

  }
  else {
    document.getElementById('imageStatus').textContent = 'Please note images were not captured before 2015-09-01 or there were no images captured for that date: ' + objDateSplitUp.year + objDateSplitUp.month + objDateSplitUp.day;
  }



} //End get data items from API result
