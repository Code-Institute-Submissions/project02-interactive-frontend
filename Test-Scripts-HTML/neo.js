// NEO WS ==================================================================================

function buildNeoUrl() {
  let varStartDate = document.getElementById("formStartDate").value;
  let varNumberOfDays = parseInt(document.getElementById("numberOfDays").value);
  let varEndDate = addDays(varStartDate, varNumberOfDays);
  if (varNumberOfDays > 7) {
    document.getElementById('neo-Error-Message').innerHTML = "Not bigger than 7";
  }
  else {
    var url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + varStartDate + "&end_date=" + varEndDate + "&api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ";

    $.ajax({
      url: url,
      success: function(result) {
        console.log(result);
      }
    });
  }
}


// $.ajax({
//         type: 'POST',
//         url: 'https://cors-anywhere.herokuapp.com/https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21',
//         headers: {
//             'Content-Type': 'text/plain;charset=utf-8',
//             'Accept': 'application/json',
//             'Content-Language': 'en',
//             'Accept-Language': 'en',
//             'Authorization': 'Basic ' + btoa('27ed9380-b340-408c-b554-7057f3beb6f8:YNBdZB8Xrjmk')
//         },
//         data: textToAnalyze
//     }).done(function(data) {
//         var docTones = data.document_tone.tones;
//         var sentTones = data.sentences_tone;
//         var docToneTableInnerHTML = '';
//         var sentToneTableInnerHTML = '';

//         docTones.forEach(function(docTone) {
//             if(docTone.tone_name == 'Anger') {
//                 var className = 'tone-anger';
//             } else if(docTone.tone_name == 'Fear') {

//         });
// }









// var url = "https://api.nasa.gov/planetary/apod?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ";

// $.ajax({
//   url: url,
//   success: function(result){
//   if("copyright" in result) {
//     $("#copyright").text("Image Credits: " + result.copyright);
//   }
//   else {
//     $("#copyright").text("Image Credits: " + "Public Domain");
//   }

//   if(result.media_type == "video") {
//     $("#apod_img_id").css("display", "none"); 
//     $("#apod_vid_id").attr("src", result.url);
//   }
//   else {
//     $("#apod_vid_id").css("display", "none"); 
//     $("#apod_img_id").attr("src", result.url);
//   }
//   $("#reqObject").text(url);
//   $("#returnObject").text(JSON.stringify(result, null, 4));  
//   $("#apod_explaination").text(result.explanation);
//   $("#apod_title").text(result.title);
//   $("#apod_date1").text(result.date);
//   var euroDateFormat = new Date(result.date);
//   var euroDateFormatM = new Date(result.date).getMonth() + 1;
//   $("#apod_date2").text(euroDateFormat.getDate() + " " + euroDateFormatM + " " + euroDateFormat.getFullYear());
// }
// });




// function buildUrl() {
//   let varStartDate = document.getElementById("formStartDate").value;
//   let varNumberOfDays = parseInt(document.getElementById("numberOfDays").value) - 1; // minus 1 because it returns 8 for 7 days for example
//   let varEndDate = addDays(varStartDate, varNumberOfDays);
//   let url = fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=" + varStartDate + "&end_date=" + varEndDate + "&api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ")
//     .then(function(response) {
//       console.log(response);
//       return response.json(); // parses response to JSON
//     }).catch(function(err) {
//       console.log('Request failed', err);
//     }).then(function(result) {
//       console.log(result);
//       console.dir(result);
//       $("#elementCount").text(result.element_count);
//       $("#near_earth_objects").text(result.near_earth_objects["2018-03-01"]["0"].absolute_magnitude_h);
//       $("#near_earth_objects").text(result.near_earth_objects["2018-03-01"]["0"].neo_reference_id); //3799745

//       result.near_earth_objects.forEach(function(item) {
//         Object.keys(item).forEach(function(key) {
//           console.log(key);
//         })
//         $("#nasa-data").text(item.name);
//       });
//     })

// }
//end of buildURL()











// NASA only allows x days of data returned. User chooses Start Date, this function adds 7 days to get End Date
// StackOverflow
function addDays(startDate, daysToAdd) {
  var endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + daysToAdd);
  endDate = formatDate(endDate);
  return endDate;
}


//Format the End Date to yyyy-mm-dd
// StackOverflow
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
