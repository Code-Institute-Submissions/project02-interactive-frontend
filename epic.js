// EPIC ==================================================================================

function getEpicImageByDate() {
  let varDate = document.getElementById("formDate").value; //Get user date input via form
  let varDateArray = varDate.split("-"); //break up date for url int year, month, day
  let varYear = varDateArray[0]; //year
  let varMonth = varDateArray[1]; //month
  let varDay = varDateArray[2]; //day
  let varImageType = document.querySelector('input[name="imageType"]:checked').value;
  console.log(varImageType);

  if (varImageType === "enhancedImage") {

    let url = fetch("https://api.nasa.gov/EPIC/api/enhanced/date/" + varDate + "?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ") //call to API for enhanced images on a specified date
      .then(function(response) {
        if (response.ok) {
          return response.json(); // parses response to JSON
        }
        throw new Error('Network response was not ok.'); //catch connectin errors
      }).then(function(result) {
        console.log(result);

        let varDataCol = document.getElementById("dataCol");
        let varimageCol = document.getElementById("imageCol");
        varDataCol.innerHTML = ""; //clear div between refreshes
        varimageCol.innerHTML = ""; //clear div between refreshes

        document.getElementById('totalCount').textContent = result.length; //total number of records returned by call to API

        if (result.length !== 0) {
          result.forEach(function(item) {

            console.log(item.image);
            document.getElementById('imageStatus').textContent = 'Found';
            let epicEnhancedUrl = "https://epic.gsfc.nasa.gov/archive/enhanced/" + varYear + "/" + varMonth + "/" + varDay + "/jpg/" + item.image + ".jpg";

            varDataCol.innerHTML += "<div class='imageData'>" +
              "<div class='imageName'>" + item.image + "</div>" +
              "<div class='imageCount'><b>Showing image: </b>" + (result.indexOf(item) + 1) + " of " + +result.length + "</div>" +
              "<div class='imageCoord'>Lat: " + item.centroid_coordinates.lat + " Lon: " + item.centroid_coordinates.lon + "</div>" +
              "<div class='imageGoogleMaps'><a href='https://www.google.ie/maps/@" + item.centroid_coordinates.lat + "," + item.centroid_coordinates.lon + ",4z' target='_blank'>view on Google Maps</a></div>" +
              "</div>";

            varimageCol.innerHTML += "<div class='image'>" +
              "<img id='imageID' src='" + epicEnhancedUrl + "'/>" +
              "</div>";
          });
        }
        else {
          document.getElementById('imageStatus').textContent = 'Please note images were not captured before 2015-09-01 or there were no images captured for that date: ' + varDate;
        }
      }).catch(function(error) {
        console.log('Request failed', error.message);
      });

  }
  else if (varImageType === "naturalImage") {

    let url = fetch("https://api.nasa.gov/EPIC/api/natural/date/" + varDate + "?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ") //call to API for natural images on a specified date
      .then(function(response) {
        if (response.ok) {
          return response.json(); // parses response to JSON
        }
        throw new Error('Network response was not ok.'); //catch connectin errors
      }).then(function(result) {
        console.log(result);

        let varDataCol = document.getElementById("dataCol");
        let varimageCol = document.getElementById("imageCol");
        varDataCol.innerHTML = ""; //clear div between refreshes
        varimageCol.innerHTML = ""; //clear div between refreshes

        document.getElementById('totalCount').textContent = result.length; //total number of records returned by call to API

        if (result.length !== 0) {

          result.forEach(function(item) {
            console.log(item.image);
            document.getElementById('imageStatus').textContent = 'Found';
            let epicNaturalUrl = "https://epic.gsfc.nasa.gov/archive/natural/" + varYear + "/" + varMonth + "/" + varDay + "/jpg/" + item.image + ".jpg";

            varDataCol.innerHTML += "<div class='imageData'>" +
              "<div class='imageName'>" + item.image + "</div>" +
              "<div class='imageCount'><b>Showing image: </b>" + (result.indexOf(item) + 1) + " of " + +result.length + "</div>" +
              "<div class='imageCoord'>Lat: " + item.centroid_coordinates.lat + " Lon: " + item.centroid_coordinates.lon + "</div>" +
              "<div class='imageGoogleMaps'><a href='https://www.google.ie/maps/@" + item.centroid_coordinates.lat + "," + item.centroid_coordinates.lon + ",4z' target='_blank'>view on Google Maps</a></div>" +
              "</div>";

            varimageCol.innerHTML += "<div class='image'>" +
              "<img id='imageID' src='" + epicNaturalUrl + "'/>" +
              "</div>";
          });
        }
        else {
          document.getElementById('imageStatus').textContent = 'Please note images were not captured before 2015-09-01 or there were no images captured for that date: ' + varDate;
        }

      }).catch(function(error) {
        console.log('Request failed', error.message);
      });

  }




} //end of getEpicImageByDate()


// fetch('http://catfacts-api.appspot.com/api/facts?number=99', { mode: 'no-cors'})
