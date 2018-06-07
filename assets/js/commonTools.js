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
