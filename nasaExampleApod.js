// APOD ==================================================================================

var url = "https://api.nasa.gov/planetary/apod?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ";

$.ajax({
  url: url,
  success: function(result){
  if("copyright" in result) {
    $("#copyright").text("Image Credits: " + result.copyright);
  }
  else {
    $("#copyright").text("Image Credits: " + "Public Domain");
  }
  
  if(result.media_type == "video") {
    $("#apod_img_id").css("display", "none"); 
    $("#apod_vid_id").attr("src", result.url);
  }
  else {
    $("#apod_vid_id").css("display", "none"); 
    $("#apod_img_id").attr("src", result.url);
  }
  $("#reqObject").text(url);
  $("#returnObject").text(JSON.stringify(result, null, 4));  
  $("#apod_explaination").text(result.explanation);
  $("#apod_title").text(result.title);
  $("#apod_date1").text(result.date);
  var euroDateFormat = new Date(result.date);
  var euroDateFormatM = new Date(result.date).getMonth() + 1;
  $("#apod_date2").text(euroDateFormat.getDate() + " " + euroDateFormatM + " " + euroDateFormat.getFullYear());
}
});

var neoUrl = "https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ"
var myend_date = 2018-03-01;
var mystart_date = 2018-05-22;



function getNeoW(startdate, enddate){
  
}