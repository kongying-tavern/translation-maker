const _          = require('lodash');
const Path       = require('path');
const UtilExcel  = require('../util/excel');
const UtilFormat = require('../util/format');

module.exports = (base = process.cwd(), path = '', tabName = '', conf = {SkipRows: 0, KeyMapper: {}}) => {
    if(!path)
        throw new Error('[RENDER-EXCEL] Path is empty');
    if(!tabName)
        throw new Error('[RENDER-EXCEL] Tab name is empty');

    let translations = {};
    let filePath     = Path.resolve(base, path);
    let sheet        = UtilExcel.getSheet(filePath, tabName);
    let range        = UtilExcel.getRangeIndexes(sheet['!ref']);

    for(let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
        // 跳过指定行数
        if(rowIndex - range.s.r < conf.SkipRows)
            continue;

        let rowName       = UtilExcel.getRowName(rowIndex);
        let transCellName = `${conf.KeyCol}${rowName}`;
        let transCell     = sheet[transCellName] || {};
        let transKey      = UtilFormat.transText(transCell.v || '');

        if(!transKey)
            continue;

        for(let colIndex = range.s.c; colIndex <= range.e.c; colIndex++) {
            let colName = UtilExcel.getColName(colIndex);

            // 查找Mapper配置，如果没有配置则直接跳过
            let mapperConf = conf.KeyMapper[colName]
            if(!mapperConf)
                continue;

            let cellName = `${colName}${rowName}`;
            let cell     = sheet[cellName] || {};
            let cellVal  = UtilFormat.transText(cell.v || '');
            let langCode = mapperConf.langCode || '';

            _.set(translations, [langCode, transKey], cellVal);
        }
    }

    return translations;
};
