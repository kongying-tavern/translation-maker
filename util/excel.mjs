import _ from 'lodash'
import XLSX from 'xlsx'

function getExcel (file = '') {
  return XLSX.readFile(file)
}

function getSheet (file = '', sheet = '') {
  const excel = getExcel(file)
  const data = _.get(excel, ['Sheets', sheet], {})
  return data
}

function getRowName (row = 0) {
  return +XLSX.utils.encode_row(row)
}

function getRowIndex (row = '1') {
  return XLSX.utils.decode_row(row)
}

function getColName (col = 0) {
  return XLSX.utils.encode_col(col)
}

function getColIndex (col = '') {
  return XLSX.utils.decode_col(col)
}

function getRangeNames (range = {}) {
  return XLSX.utils.encode_range(range)
}

function getRangeIndexes (range = '') {
  return XLSX.utils.decode_range(range)
}

export default {
  getExcel,
  getSheet,
  getRowName,
  getRowIndex,
  getColName,
  getColIndex,
  getRangeNames,
  getRangeIndexes
}
