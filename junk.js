var xhr = new XMLHttpRequest();
var url = "https://api.nasa.gov/planetary/apod?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ"

xhr.open("GET", url);
xhr.send();

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var nasaData = JSON.parse(this.responseText); //write out responseText as object
        document.getElementById("apod").innerHTML = nasaData;
        console.dir(nasaData);
        console.dir(nasaData.title);
    }
};

//===================================================

var xhr = new XMLHttpRequest();
var url = "https://api.nasa.gov/planetary/apod?api_key=pyZKDq8cb4x1dJi0dsodTT9PBoWkQaa5CgxmPAxZ"

xhr.open("GET", url);
xhr.send();

xhr.onreadystatechange = function(){
  if (this.readyState == 0 || this.readyState == 4) {
    var rateLimit = this.getAllResponseHeaders();
    var rateRemaining = this.getResponseHeader('X-RateLimit-Remaining');
    var lastMod = JSON.parse(this.responseText);
      $("#apiThrottleLimit").html(`Throttle Limit: ${rateLimit}`);
      $("#apiThrottleRemaining").html(`Throttle Remaining: ${rateRemaining}`);
      $("#lastModified").html(`Last-Modified: ${lastMod.date}`);
      console.log(xhr);
  }
}
