/**
 * @param {SpreadsheetApp.Spreadsheet} spreadsheet
 * @return {Record<'getRange', (tableRangeName:string) => SpreadsheetApp.Range> & Record<'getRangeList', (...tableRangeNames:string[]) => SpreadsheetApp.RangeList>}
 */
function setSpreadsheet(spreadsheet){
  const spreadsheetTables = new SpreadsheetTables_(spreadsheet)
  return {
    getRange:spreadsheetTables.getRange,
    getRangeList:spreadsheetTables.getRangeList
  }
}

class SpreadsheetTables{
  /**
   * @param {SpreadsheetApp.Spreadsheet} ss
   */
  constructor(ss){
    /** @private */
    this.ss = ss
  }

  /**
   * @param {string} tableRangeName
   */
  getRange(tableRangeName){
    const a1NotationFormulas = this.rangeNameToA1NotationFormula(tableRangeName)
    const a1Notation = this.usingTempSheet(this.getFormulaResults(a1NotationFormulas))[0]
    return this.ss.getRange(a1Notation)
  }

  /** @private */
  rangeNameToA1NotationFormula(range){
    return `=LET(r, ${range}, 
      IF(
        AND(ROWS(r) = 1, COLUMNS(r) = 1), 
        CELL("address", r), 
        CONCATENATE(CELL("address", r), ":", ADDRESS(ROWS(r)+ROW(r)-1, COLUMNS(r)+COLUMN(r)-1))
      ))`
  }

  /**
   * @private
   * @template A
   * @param {(tempSheet:SpreadsheetApp.Sheet) => A} fn
   * @return A
   */
  usingTempSheet(fn){
    let tempSheet;
    try{
      tempSheet= this.ss.insertSheet()
      const result = fn(tempSheet)
      return result
    }
    finally{
      try{
        this.ss.deleteSheet(tempSheet)
      }catch(err){
        console.error(err)
      }
    }
  }

  /**
   * @private
   * @param {...string} formulas
   */
  getFormulaResults(...formulas){
    /** 
     * @param {SpreadsheetApp.Sheet} sheet
     * @return {string[]}
     */
    return sheet => {
      return sheet.getRange(1, 1, 1, formulas.length).setFormulas([formulas]).getDisplayValues().flat()
    }
  }

  /**
   * @param {...string} tableRangeName Any number of ranges from the same sheet.
   */
  getRangeList(...tableRangeName){
    console.log(tableRangeName)
    const a1NotationFormulas = tableRangeName.map(this.rangeNameToA1NotationFormula)
    const a1Notation = this.usingTempSheet(this.getFormulaResults(...a1NotationFormulas))
    const sheet = this.ss.getRange(a1Notation[0]).getSheet()
    console.log(sheet.getName())
    return sheet.getRangeList(a1Notation)
  }
}