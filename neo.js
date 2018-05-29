// NEO WS ==================================================================================
$(document).ready(function(){

var neoUrl = "https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ"



  
});


  function getFormValues() {
  var varStartDate = document.getElementById("formStartDate").value;
  var varEndDate = document.getElementById("formEndDate").value;
  console.log(varStartDate);
  console.log(varEndDate);
  var url = "https://ide.c9.io/sonyacooley/interactive-front-end-project/"+varStartDate; 
  window.location = url; 
  return false;
}