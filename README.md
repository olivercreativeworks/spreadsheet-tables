# Table references in google apps script

This library lets you use [table references](https://support.google.com/docs/answer/14239833?hl=en#:~:text=use%20table%20references) in Google Apps Script to reference ranges of a Google Sheet.

## Description
In Google Apps Script, you cannot use table references to refer to areas of a Google Sheet. 

For example, if you have a table reference called "Tasks[Status\]", the following code throws an error:
```javascript
//Throws 'Range not found' error
SpreadsheetApp.getRange('Tasks[Status]')
```
The goal of this library is to allow you to use a table reference to refer to areas of your Google Sheet.

## Library project key
`1VcRUbO--w71dbJ4yFA8A-vYdzQXwa2sgjHE9230z-cvgCpqNNihZ32jP`

## Installation
To use this script, you should first install it into your GAS project:
1. **Create a GAS project** ([Instructions](https://developers.google.com/apps-script/guides/projects#create-and-delete))
	* This library works in standalone and container-bound projects.
2. **Install this library** ([Instructions](https://developers.google.com/apps-script/guides/libraries))
	* This library's project key is `1VcRUbO--w71dbJ4yFA8A-vYdzQXwa2sgjHE9230z-cvgCpqNNihZ32jP`

### Scopes
This library uses the following scope:
* `https://www.googleapis.com/auth/spreadsheets`

## Usage
To initialize the library call the `setSpreadsheet` method:
```javascript
const spreadsheet = SpreadsheetApp.openById(YOUR-SPREADSHEET-ID)
const spreadsheetTables = setSpreadsheet(spreadsheet)
```
To get the Status column from your table called Tasks:
```javascript
const statusColumn = spreadsheetTables.getRange('Tasks[Status]')
```
The getRange method returns a [SpreadsheetApp.Range](https://developers.google.com/apps-script/reference/spreadsheet/range) object. So you can call methods like this:
```javascript
const columnValues = statusColumn.getValues()
```
To get ranges from multiple columns of the same table, you can use the `getRangeList` method:
```javascript
//Assuming Tasks has columns for Status, Owner, and Due Date
const taskColumns = spreadsheetTables.getRangeList('Tasks[Status]', 'Tasks[Owner]', 'Tasks[Due Date]')
```
This returns a [SpreadsheetApp.RangeList](https://developers.google.com/apps-script/reference/spreadsheet/range-list) object. So you can call methods like this:
```javascript
const columnValues = taskColumns.getRanges().map(range => range.getValues())
```
Table references include references to the full table, too:
```javascript
//With header row
const tableRangeWithHeader = spreadsheetTables.getRange('Tasks[#ALL]')

//Without header row
const tableRange = spreadsheetTables.getRange('Tasks')
```

## Known issues
This library will cause [volatile functions](https://support.google.com/docs/answer/12159115?hl=en#:~:text=Reference%20your%20volatile%20function%20efficiently,TODAY()%20refreshes%20every%20day.) to refresh.

## Other
This project was created using `bun init` in bun v1.0.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
