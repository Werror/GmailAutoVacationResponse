# GmailAutoVacationResponse
This is a Google App Script to set vacation response in Gmail setting using Calendar's specific event
The setup will trigger this script to run once each day (preferred between 0:00 - 1:00 am) and go through your all day event and find "Vacation" (this is customizable) and set `startDate`, `endDate`, `subject`, `body` in the Gmail Vacation Setting. 

![Image Gmail Vacation Setting](http://icdn3.digitaltrends.com/image/gmail_step2-1049x296.jpg)

## Prerequisite
The following *Advanced Google Services* need to be enabled before running this script.
- Calendar
- Gmail
Please refer to https://developers.google.com/apps-script/guides/services/advanced

## Usage
1. Login to Google drive and create a new App Scriot
2. Copy the [Code.gs](https://github.com/Werror/GmailAutoVacationResponse/blob/master/Code.gs) and paste into the new App Script
3. On the calendar, book a chunk of all day event, (E.g. as "Vacation" or any thing you like, but make sure you change [here](https://github.com/Werror/GmailAutoVacationResponse/blob/master/Code.gs#L38))
4. To test, you can hit run on the Google App Script console
5. To schedule **time trigger** go to Resources -> Current project's trigger -> Add a new trigger -> Time driven -> Set to run once a day from 0:00 am - 1:00 am

