// EPIC ==================================================================================

/*
https://epic.gsfc.nasa.gov/archive/natural/' + year + '/' + month + '/' + day + '/jpg/' + 'IMAGE_NAME+ '.jpg';

Previous Example:
https://epic.gsfc.nasa.gov/archive/natural/2015/10/31/jpg/epic_1b_20151031003633_01.jpg

*/
function getEpicImageByDate() {
  let varDate = document.getElementById("formDate").value;
  let varDateArray = varDate.split("-"); //break up date for url
  let varYear = varDateArray[0];
  let varMonth = varDateArray[1];
  let varDay = varDateArray[2];
  let url = fetch("https://api.nasa.gov/EPIC/api/enhanced/date/" + varDate + "?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ")
    .then(function(response) {
      if (response.ok) {
        return response.json(); // parses response to JSON
      }
      throw new Error('Network response was not ok.');
    }).then(function(result) {
      console.log(result);

      let epicUrl = "https://epic.gsfc.nasa.gov/archive/enhanced/" + varYear + "/" + varMonth + "/" + varDay + "/jpg/" + result[0].image + ".jpg";
      document.getElementById('imageID').src = epicUrl;

      document.getElementById('imageTotalCount').textContent = result.length;
      document.getElementById('imageCount').textContent = result.indexOf(result[0])+1;
      document.getElementById('imageName').textContent = result[0].image;
    }).catch(function(error) {
      console.log('Request failed', error.message);

    });




} //end of getEpicImageByDate()


// fetch('http://catfacts-api.appspot.com/api/facts?number=99', { mode: 'no-cors'})


