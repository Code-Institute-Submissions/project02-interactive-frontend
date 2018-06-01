// EPIC ==================================================================================

function getEpicImageByDate() {
  let varDate = document.getElementById("formDate").value; //Get user date input via form
  
  let objDateSplitUp = splitDate(varDate); //varDateSplitUp is an object containing year, month, day

  let varImageType = document.querySelector('input[name="imageType"]:checked').value;
  let varDataCol = document.getElementById("dataCol");
  let varImageCol = document.getElementById("imageCol");

  //paging
  let sta = 0;
  let elements_per_page = 2;
  let limit = elements_per_page;


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

        //paging
        let max_size = result.length;

        document.getElementById('totalCount').textContent = result.length; //total number of records returned by call to API


getResultItems(result, varImageType, objDateSplitUp, varDataCol, varImageCol);


      }).catch(function(error) {
        console.log('Request failed', error.message);
      });

  }
  // END OF GET DATA



} //end of getEpicImageByDate()


// fetch('http://catfacts-api.appspot.com/api/facts?number=99', { mode: 'no-cors'})

// Calculation found on https://www.calculatorsoup.com/calculators/geometry-solids/distance-two-points.php
function discovrDistance(x1, y1, z1, x2, y2, z2, ) {
  var xSqr = (x2 - x1) * (x2 - x1);
  var ySqr = (y2 - y1) * (y2 - y1);
  var zSqr = (z2 - z1) * (z2 - z1);
  var d = xSqr + ySqr + zSqr;
  d = Math.sqrt(d);
  d = Math.round(d);
  //console.log(d);  
  return d;
}

function splitDate(varDate) {
  var varDateArray = varDate.split("-"); //break up date for url int year, month, day
  var varYear = varDateArray[0]; //year
  var varMonth = varDateArray[1]; //month
  var varDay = varDateArray[2]; //day
  return {year: varYear, month: varMonth, day: varDay}
}

//start get Data items
        function getResultItems(result, varImageType, objDateSplitUp, varDataCol, varImageCol) {


          if (result.length !== 0) {
            result.forEach(function(item) {
              document.getElementById('imageStatus').textContent = 'Found';
              let epicNaturalUrl = "https://epic.gsfc.nasa.gov/archive/"+ varImageType + "/" + objDateSplitUp.year + "/" + objDateSplitUp.month + "/" + objDateSplitUp.day + "/jpg/" + item.image + ".jpg";
              let distanceToSun = discovrDistance(item.dscovr_j2000_position.x, item.dscovr_j2000_position.y, item.dscovr_j2000_position.z, item.sun_j2000_position.x, item.sun_j2000_position.y, item.sun_j2000_position.z).toLocaleString();
              let distanceToEarth = discovrDistance(0, 0, 0, item.dscovr_j2000_position.x, item.dscovr_j2000_position.y, item.dscovr_j2000_position.z).toLocaleString();


              varDataCol.innerHTML += "<div class='imageData'>" +
                "<div class='imageName'>" + item.image + "</div>" +
                "<div class='imageName'>" + item.caption + "</div>" +
                "<div class='imageCount'><b>Showing image: </b>" + (result.indexOf(item) + 1) + " of " + +result.length + "</div>" +
                "<div class='imageCoord'>Lat: " + item.centroid_coordinates.lat + " Lon: " + item.centroid_coordinates.lon + "</div>" +
                "<div class='imageGoogleMaps'><a href='https://www.google.ie/maps/@" + item.centroid_coordinates.lat + "," + item.centroid_coordinates.lon + ",4z' target='_blank'>view on Google Maps</a></div>" +
                "<div class='distanceSun'>distance To Sun: " + distanceToSun + "km</div>" +
                "<div class='distanceEarth'>distance To Earth: " + distanceToEarth + "km</div>" +
                "<div class='distanceEarth'><br><br></div>" +
                "</div>";

              varImageCol.innerHTML += "<div class='image'>" +
                "<img id='imageID' src='" + epicNaturalUrl + "'/>" +
                "</div>" +
                "<div><br><br></div>";
            });
          }
          else {
            document.getElementById('imageStatus').textContent = 'Please note images were not captured before 2015-09-01 or there were no images captured for that date: ' + objDateSplitUp.year + objDateSplitUp.month + objDateSplitUp.day;
          }

        } //End get Data items