function main() {
    var events = listAllDayEvents();
    
    if (events < 1)
    {
        return;
    }
    
    var dateTime = findHolidayDate(events);
    setNewVacationSettings(dateTime);
}

function setNewVacationSettings(dateTime) {
    // get existing VacationSettings
    // var vacationSetting =   Gmail.Users.Settings.getVacation('me');

    // create a new VacationSettings
    var vacationSetting =   Gmail.newVacationSettings();
    vacationSetting.enableAutoReply = true;
    vacationSetting.responseSubject = "Out of Office";
    vacationSetting.responseBodyPlainText = "I am out of reach from " + 
        dateTime.start.toLocaleDateString() + " - "
        + dateTime.end.toLocaleDateString();

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
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.summary == "Vacation") {
            duration["start"] = (parseDate(event.start.date));
            duration["end"] = (parseDate(event.end.date));
            break;
        }
    }
    return duration;
}

/**
 * Obtain all day events only
 * @return {Object[]} array of event from 'primary calendar'
 */
function listAllDayEvents() {
    var calendarId = 'primary';
    var today = new Date();
    var tomorrow = new Date(Date.now() + 24*60*60*1000);
    var events = Calendar.Events.list(calendarId, {
        timeMin: today.toISOString(),
        timeMax: tomorrow.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
    });

    var eventsOfInterest = [];

    if (events.items && events.items.length > 0) {
        for (var i = 0; i < events.items.length; i++) {
            var event = events.items[i];
            if (event.start.date) { // only check for All day event
                var start = parseDate(event.start.date);
                var end = parseDate(event.end.date);
                //var formatedDate = Utilities.formatDate(start, 'EST', )
                Logger.log('%s (%s - %s)', event.summary, start.toLocaleDateString(), end.toLocaleDateString());
                eventsOfInterest.push(event);
            } else {
                // we are not intersted in these at the moment
                // var start = parseDate(event.start.dateTime);
                // Logger.log('%s (%s)', event.summary, start.toLocaleString());
            }
        }
    } else {
        Logger.log('No events found.');
    }

    return eventsOfInterest;
}

function parseDate(string) {
    return parseRFC3339Date(string);
}

/**
 * Apps Script does not supports RFC 3339 dates properly.
 * Parses RFC 3339 date from calendar event and returns a corresponding Date object.
 * See detailed explanataion in https://code.google.com/p/google-apps-script-issues/issues/detail?id=3860
 * @param {string} string The RFC 3339 string to parse.
 * @return {Date} The parsed date.
 */
function parseRFC3339Date(string) {
    var stringParts = string.split('T');
    stringParts[0] = stringParts[0].replace(/-/g, '/');
    return new Date(stringParts.join(' '));
}
