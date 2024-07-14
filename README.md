# SpreadsheetTables

This script lets you reference Google Sheets table ranges using the same syntax you would use to reference a named range.

## Problem
In Google Apps Script, you cannot refer to a table range using the table range syntax. For example, if you have a table called "Tasks" with a column called "Status", the following fails:
```
SpreadsheetApp.getRange('Tasks[Status]') 
```
If we had a named range defined "Tasks\[Status\]" instead of a table range, the above call would work. The goal of this script is to make the above table syntax work like a named range would.

## Solution
This script allows you to reference a range using the table range syntax. Meaning you do not have to create a new named range. You can initialize the script as follows:
```
const spreadsheet = SpreadsheetApp.openById(YOUR-SPREADSHEET-ID)
const spreadsheetTables = setSpreadsheet(spreadsheet)
```
To get a range from your table called Tasks, you write:
```
const statusColumn = spreadsheetTables.getRange('Tasks[Status]')
```
The getRange method returns a [SpreadsheetApp.Range](https://developers.google.com/apps-script/reference/spreadsheet/range) object. So you can call methods like this:
```
const columnValues = statusColumn.getValues()
```
If you want ranges from multiple columns of the same table, you can use the `getRangeList` method:
```
const taskColumns = spreadsheetTables.getRangeList('Tasks[Status]', 'Tasks[Owner]', 'Tasks[Due Date]') //assuming the Tasks table has columns for Status, Owner, and Due Date
```
This returns a [SpreadsheetApp.RangeList](https://developers.google.com/apps-script/reference/spreadsheet/range-list) object. So you can call methods like this:
```
const columnValues = taskColumns.getRanges().map(range => range.getValues())
```
Finally, in addition to providing ranges for each column, Sheets tables give us ranges for the full table, which can be accessed like this:
```
//With header row
const tableRangeWithHeader = spreadsheetTables.getRange('Tasks[#ALL]')

//Without header row
const tableRange = spreadsheetTables.getRange('Tasks')
```

## Known issues
This script will cause volatile functions to refresh.

This project was created using `bun init` in bun v1.0.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
