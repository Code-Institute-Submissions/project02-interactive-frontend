// EPIC ==================================================================================

/*
https://epic.gsfc.nasa.gov/archive/natural/' + year + '/' + month + '/' + day + '/jpg/' + 'IMAGE_NAME+ '.jpg';

Previous Example:
https://epic.gsfc.nasa.gov/archive/natural/2015/10/31/jpg/epic_1b_20151031003633_01.jpg

*/
function getEpicImage() {
  let varDate = document.getElementById("formDate").value;
  let varDateArray = varDate.split("-"); //break up date for url
  let varYear = varDateArray[0];
  let varMonth = varDateArray[1];
  let varDay = varDateArray[2];
  let url = fetch("https://api.nasa.gov/EPIC/api/enhanced/date/" + varDate + "?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ")
    .then(function(response) {
      return response.json(); // parses response to JSON
    }).catch(function(err) {
      console.log('Request failed', err);
    }).then(function(result) {
      console.log(result);
    
  let epicUrl = "https://epic.gsfc.nasa.gov/archive/enhanced/" + varYear + "/" + varMonth + "/" + varDay + "/jpg/" + result[0].image + ".jpg";
      document.getElementById('imageID').src = epicUrl;
      
    })




} //end of getEpicImage()


//
