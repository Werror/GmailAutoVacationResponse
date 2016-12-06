# GmailAutoVacationResponse
This is a Google App Script to set vacation response in Gmail setting using Calendar's specific event
The setup will trigger this script to run once each day (preferred between 0:00 - 1:00 am) and go through your all day event and find "Vacation" (this is customizable) and set `startDate`, `endDate`, `subject`, `body` in the Gmail Vacation Setting. 

## Prerequisite
The following *Advanced Google Services* need to be enabled before running this script.
- Calendar
- Gmail
Please refer to https://developers.google.com/apps-script/guides/services/advanced

## Usage
1. Login to Google drive and create a new App Scriot
2. Copy the [Code.gs](https://github.com/Werror/GmailAutoVacationResponse/blob/master/Code.gs) and paste into the new App Script
3. On the calendar, book a chunk of all day event, (E.g. as "Vacation" or any thing you like, but make sure you change [here](https://github.com/Werror/GmailAutoVacationResponse/blob/master/Code.gs#L38)). You can also change the [subject](https://github.com/Werror/GmailAutoVacationResponse/blob/master/Code.gs#L14) and [body](https://github.com/Werror/GmailAutoVacationResponse/blob/master/Code.gs#L15) if the response message.
4. To test this standalone script, follow https://developers.google.com/apps-script/guides/standalone and choose `run` or `debug`.
5. To schedule **time trigger** go to Resources -> Current project's trigger -> Add a new trigger -> Time driven -> Set to run once a day from 0:00 am - 1:00 am
6. To verify the result, go to Gmail->Setting, then scroll all the way to the end and verify Vacation responder is turned on with all the other field populated.
![Image Gmail Vacation Setting](http://icdn3.digitaltrends.com/image/gmail_step2-1049x296.jpg)

