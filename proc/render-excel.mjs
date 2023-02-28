import _ from 'lodash'
import Path from 'path'
import UtilExcel from '../util/excel.mjs'
import UtilFormat from '../util/format.mjs'

export default (base = process.cwd(), path = '', tabName = '', conf = { SkipRows: 0, KeyMapper: {} }) => {
  if (!path) { throw new Error('[RENDER-EXCEL] Path is empty') }
  if (!tabName) { throw new Error('[RENDER-EXCEL] Tab name is empty') }

  const translations = {}
  const subgroups = {}
  const filePath = Path.resolve(base, path)
  const sheet = UtilExcel.getSheet(filePath, tabName)
  const range = UtilExcel.getRangeIndexes(sheet['!ref'])

  for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
    // 跳过指定行数
    if (rowIndex - range.s.r < conf.SkipRows) { continue }

    const rowName = UtilExcel.getRowName(rowIndex)
    const transCellName = `${conf.KeyCol}${rowName}`
    const transCell = sheet[transCellName] || {}
    const transKey = UtilFormat.transText(transCell.v || '')
    const subgroupCellName = `${conf.SubGroupCol}${rowName}`
    const subgroupCell = sheet[subgroupCellName] || {}
    const subgroupName = UtilFormat.trimStartDot(subgroupCell.v || '')

    if (!transKey) { continue }

    // 查找【分类标记】对应的类
    if (subgroupName) {
      subgroups[subgroupName] = subgroups[subgroupName] || []
      subgroups[subgroupName].push(transKey)
    }

    // 遍历所有语言，获取翻译
    for (let colIndex = range.s.c; colIndex <= range.e.c; colIndex++) {
      const colName = UtilExcel.getColName(colIndex)

      // 查找Mapper配置，如果没有配置则直接跳过
      const mapperConf = conf.KeyMapper[colName]
      if (!mapperConf) { continue }

      const cellName = `${colName}${rowName}`
      const cell = sheet[cellName] || {}
      const cellVal = UtilFormat.transText(cell.v || '')
      const cellText = cellVal || transKey
      const langCode = mapperConf.langCode || ''

      _.set(translations, [langCode, transKey], cellText)
    }
  }

  return { translations, subgroups }
}
