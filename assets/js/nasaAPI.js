// APOD ================================================================================== //
var url = "https://api.nasa.gov/planetary/apod?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ";

$.ajax({
    url: url,
    success: function(result) {
        if ("copyright" in result) {
            $("#copyright").text("Image Credits: " + result.copyright); //Get copyright information and display
        }
        else {
            $("#copyright").text("Image Credits: " + "Public Domain"); //No copyright information, display 'Public Domain'
        }

        if (result.media_type == "video") {
            $("#apod_img_id").css("display", "none");   //If type video...
            $("#apod_vid_id").attr("src", result.url);
        }
        else {
            $("#apod_vid_id").css("display", "none");   //If type image...
            $("#apod_img_id").attr("src", result.url);
        }
        $("#apod_explaination").text(result.explanation); //Image explanation
        $("#apod_title").text(result.title);    //Image title
    
        var varDateString = splitDateMonthName(result.date); //Show date of image with Month name

        $("#apod_date").text(varDateString.day + " " + varDateString.month + " " + varDateString.year);
    }
});
