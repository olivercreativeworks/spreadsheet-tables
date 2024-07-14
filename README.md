# SpreadsheetTables

This script lets you use [table references](https://support.google.com/docs/answer/14239833?hl=en#:~:text=use%20table%20references) to reference ranges of a Google Sheet.

## Problem
In Google Apps Script, you cannot use table references to refer to areas of a Google Sheet. 

For example, if you have a table called "Tasks" with a column called "Status", the following fails:
```
//Throws 'Range not found' error
SpreadsheetApp.getRange('Tasks[Status]')
```
If we had a named range defined "Tasks\[Status\]" instead of a table reference, the above call would work. 

The goal of this script is to make the above table reference syntax work like a named range would.

## Solution
This script lets you use table references to reference ranges of a Google Sheet.

To initialize the script:
```
const spreadsheet = SpreadsheetApp.openById(YOUR-SPREADSHEET-ID)
const spreadsheetTables = setSpreadsheet(spreadsheet)
```
To get the Status column from your table called Tasks, you write:
```
const statusColumn = spreadsheetTables.getRange('Tasks[Status]')
```
The getRange method returns a [SpreadsheetApp.Range](https://developers.google.com/apps-script/reference/spreadsheet/range) object. So you can call methods like this:
```
const columnValues = statusColumn.getValues()
```
To get ranges from multiple columns of the same table, you can use the `getRangeList` method:
```
//Assuming Tasks has columns for Status, Owner, and Due Date
const taskColumns = spreadsheetTables.getRangeList('Tasks[Status]', 'Tasks[Owner]', 'Tasks[Due Date]')
```
This returns a [SpreadsheetApp.RangeList](https://developers.google.com/apps-script/reference/spreadsheet/range-list) object. So you can call methods like this:
```
const columnValues = taskColumns.getRanges().map(range => range.getValues())
```
Table references include references to the full table, too:
```
//With header row
const tableRangeWithHeader = spreadsheetTables.getRange('Tasks[#ALL]')

//Without header row
const tableRange = spreadsheetTables.getRange('Tasks')
```

## Known issues
This script will cause volatile functions to refresh.

This project was created using `bun init` in bun v1.0.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
