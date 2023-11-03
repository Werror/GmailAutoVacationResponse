function main() {
    var events = listAllDayEvents();
    
    var dateTime = findHolidayDate(events);
    setNewVacationSettings(dateTime);
}

function setNewVacationSettings(dateTime) {
    // if you wants to save the existing VacationSettings
    // var vacationSetting =   Gmail.Users.Settings.getVacation('me');

    if (dateTime.start == undefined || dateTime.end == undefined) {
      Logger.log("No event needs processing, no vacation response set, disabling AutoReply");
      var vacationSetting = Gmail.newVacationSettings();
      vacationSetting.enableAutoReply = false;
      Gmail.Users.Settings.updateVacation(vacationSetting, 'me');

      return;
    }

    const displayName = Gmail.Users.Settings.SendAs.list("me").sendAs.filter(function(account){if(account.isDefault){return true}})[0].displayName;
    const escalationName = "";
    const escalationContact = "";
    const endDate = (dateTime.end.getUTCMonth() + 1 /** Jan starts with 0 */) + "/" + dateTime.end.getUTCDate() + "/" + dateTime.end.getUTCFullYear();
    const signature = "";

    // create a new VacationSettings
    var vacationSetting = Gmail.newVacationSettings();
    vacationSetting.enableAutoReply = true;
    vacationSetting.responseSubject = "Out of Office Notice";
    vacationSetting.responseBodyPlainText = "Hi" + 
        "\n\nThank you for your message. I am currently out of the office and will be returning on " +
        endDate + "." +
        "\nFor any urgent inquiery please reach out to " +
        escalationName + " " + escalationContact + 
        "\n\n" + displayName + 
        "\n\n" + signature;

    vacationSetting.startTime = dateTime.start.getTime();
    vacationSetting.endTime = dateTime.end.getTime();

    // good place to place break point to check
    // Logger.log((vacationSetting));

    Gmail.Users.Settings.updateVacation(vacationSetting, 'me');
}

/**
 * Find start and end date of this event corresponding to particular event.summary
 * In this example we use "Vacation"
 * @param {Object[]}
 * @return {Object} start and end, Date object
 */
function findHolidayDate(events) {
    var duration = {};
      events.forEach(function(event) {
        //Logger.log('%s %s (%s - %s)', event.getTitle(), event.getCreators(), event.getStartTime(), event.getEndTime());
        duration["start"] = ((event.getStartTime()));
        duration["end"] = ((event.getEndTime()));
      });

    return duration;
}

/**
 * Obtain all day events only
 * @return {Object[]} array of event from 'primary calendar'
 */
function listAllDayEvents() {
    var calendarId = 'primary';
    // search for next 24 hours
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    var events = CalendarApp.getDefaultCalendar().getEventsForDay(tomorrow)

    var eventsOfInterest = events.filter(function(event){
      //Logger.log('%s %s (%s - %s)', event.getTitle(), event.getCreators(), event.getStartTime(), event.getEndTime());
      return event.getTitle() === 'OOO' || event.getTitle() === 'PTO';
    });

    return eventsOfInterest;
}


/**
 * LEGACY CODE
 * Apps Script does not supports RFC 3339 dates properly.
 * Parses RFC 3339 date from calendar event and returns a corresponding Date object.
 * See detailed explanataion in https://code.google.com/p/google-apps-script-issues/issues/detail?id=3860
 * @param {string} string The RFC 3339 string to parse.
 * @return {Date} The parsed date.
 */

/*
function parseRFC3339Date(string) {
    var stringParts = string.split('T');
    stringParts[0] = stringParts[0].replace(/-/g, '/');
    return new Date(stringParts.join(' '));
}
*/
