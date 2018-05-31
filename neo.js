// NEO WS ==================================================================================

//with help from Simen Daehlin on slack

function buildUrl() {
  let varStartDate = document.getElementById("formStartDate").value;
  let varNumberOfDays = parseInt(document.getElementById("numberOfDays").value) - 1; // minus 1 because it returns 8 for 7 days for example
  let varEndDate = addDays(varStartDate, varNumberOfDays);
  let url = fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=" + varStartDate + "&end_date=" + varEndDate + "&api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ")
    .then(function(response) {
      console.log(response);
      return response.json(); // parses response to JSON
    }).catch(function(err) {
      console.log('Request failed', err);
    }).then(function(result) {
      console.log(result);
      console.dir(result);
      $("#elementCount").text(result.element_count);
      $("#near_earth_objects").text(result.near_earth_objects["2018-03-01"]["0"].absolute_magnitude_h);
      $("#near_earth_objects").text(result.near_earth_objects["2018-03-01"]["0"].neo_reference_id); //3799745

      result.near_earth_objects.forEach(function(item) {
        Object.keys(item).forEach(function(key) {
          console.log(key);
        })
        $("#nasa-data").text(item.name);
      });
    })

  
  
  
  
} //end of buildURL()











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
