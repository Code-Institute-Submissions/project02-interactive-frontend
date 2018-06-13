//Function to split date into components:2015-10-31  
//returns object of year:2015 month:10 day:31
//monthName = 1 returns month name. monthName = 0 returns month number
function splitDate(varDate, monthName) {
    var varDateArray = varDate.split("-"); //break up date for url int year, month, day
    var varYear = varDateArray[0]; //year
    var varMonth = varDateArray[1]; //month
    if (monthName == 1) {
        switch (varMonth) {
            case "01":
                varMonth = "January";
                break;
            case "02":
                varMonth = "February";
                break;
            case "03":
                varMonth = "March";
                break;
            case "04":
                varMonth = "April";
                break;
            case "05":
                varMonth = "May";
                break;
            case "06":
                varMonth = "June";
                break;
            case "07":
                varMonth = "July";
                break;
            case "08":
                varMonth = "August";
                break;
            case "09":
                varMonth = "September";
                break;
            case "10":
                varMonth = "October";
                break;
            case "11":
                varMonth = "November";
                break;
            case "12":
                varMonth = "December";
                break;
                Default:
                    varMonth = "No Month supplied";
        }
    }
    else {
        varMonth = varMonth;
    }
    var varDay = varDateArray[2]; //day 
    return { year: varYear, month: varMonth, day: varDay } // return an object with properties year, month(name), day
}


// Calculation found on https://www.calculatorsoup.com/calculators/geometry-solids/distance-two-points.php
// Calculate 3D distance between two sets of xyz coordinates
function dscovrDistance(x1, y1, z1, x2, y2, z2) {
    var xSqr = (x2 - x1) * (x2 - x1);
    var ySqr = (y2 - y1) * (y2 - y1);
    var zSqr = (z2 - z1) * (z2 - z1);
    var d = xSqr + ySqr + zSqr;
    d = Math.sqrt(d);
    d = Math.round(d);
    return d;
}


// Get NASA Center
function nasaCenter(centerName) {
    if (centerName !== "") {
        switch (centerName) {
            case "JPL":
                centerName = "https://www.nasa.gov/centers/jpl/home/index.html";
                break;
            case "JSC":
                centerName = "https://www.nasa.gov/centers/johnson/home/index.html";
                break;
            case "ARC":
                centerName = "https://www.nasa.gov/ames";
                break;
            case "GSFC":
                centerName = "https://www.nasa.gov/goddard";
                break;
            case "KSC":
                centerName = "https://www.nasa.gov/centers/kennedy/home/index.html";
                break;
            case "MSFC":
                centerName = "https://www.nasa.gov/centers/marshall/home/index.html";
                break;
            case "HQ":
                centerName = "https://www.nasa.gov/centers/hq/home/index.html";
                break;
            case "GRC":
                centerName = "https://www.nasa.gov/centers/glenn/home/index.html";
                break;
            case "LRC":
                centerName = "https://www.nasa.gov/langley";
                break;
            case "AFRC":
                centerName = "https://www.nasa.gov/centers/armstrong/home/index.html";
                break;
                Default:
                    centerName = "No center supplied";
        }
        return centerName;
    }
}

