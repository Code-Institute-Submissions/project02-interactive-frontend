// START APOD =================================================================================================================== //
// GET DATA Using AJAX
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
            $("#apod_img_container").css("display", "none"); //If type video...
            $("#apod_vid_id").attr("src", result.url);
            $("#apod_title_vid").text(result.title); //Image title
        }
        else {
            $("#apod_vid_container").css("display", "none"); //If type image...
            $("#apod_img_id").attr("src", result.url);
            $("#apod_title_img").text(result.title); //Image title
        }
        $("#apod_explaination").text(result.explanation); //Image explanation

        var varDateString = splitDate(result.date, 1); //Show date of image with Month name. 1 = get Month name

        $("#apod_date").text(varDateString.day + " " + varDateString.month + " " + varDateString.year);
    }
});

// END APOD ===================================================================================================================== //

