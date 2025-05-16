/**
 * A function that gets the availability of a portfolio (time management)
 * @function getAvailability
 * @param {Date} createdAt - Datetime object, representing the portfolio's creation time
 * @param {Int} timeLimit - Represents how much time, in seconds the portfolio has left to live
 * @returns { String } if the operation completed successfully, false otherwise
 */
export function getAvailability(createdAt, timeLimit){
    var availability = "";
    if (timeLimit < 0){ // Demo portfolio should be eternal, ETERNAL I SAY!!!
        availability = "Available";
    } else {
        var elapsedTime = Math.round((new Date() - createdAt)/1000);
        if (elapsedTime > timeLimit){
            availability = "Expired";
        } else {
            availability = "Time left: " + sToTime(timeLimit - elapsedTime);
        }
    }
    return availability
}

/**
 * @function sToTime
 * @param {sec} seconds to convert
 * @return duration in days or hours or minutes or seconds
 */
function sToTime(sec) {
    let minutes = (sec / (60)).toFixed(1);
    let hours = (sec / (60 * 60)).toFixed(1);
    let days = (sec / (60 * 60 * 24)).toFixed(1);
    if (sec < 60) return sec + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Days"
}