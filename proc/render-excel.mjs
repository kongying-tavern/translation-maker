import _ from 'lodash';
import Path from 'path';
import UtilExcel from '../util/excel.mjs';
import UtilFormat from '../util/format.mjs';

export default (base = process.cwd(), path = '', tabName = '', conf = {SkipRows: 0, KeyMapper: {}}) => {
    if(!path)
        throw new Error('[RENDER-EXCEL] Path is empty');
    if(!tabName)
        throw new Error('[RENDER-EXCEL] Tab name is empty');

    let translations = {};
    let subgroups    = {};
    let filePath     = Path.resolve(base, path);
    let sheet        = UtilExcel.getSheet(filePath, tabName);
    let range        = UtilExcel.getRangeIndexes(sheet['!ref']);

    for(let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
        // 跳过指定行数
        if(rowIndex - range.s.r < conf.SkipRows)
            continue;

        let rowName          = UtilExcel.getRowName(rowIndex);
        let transCellName    = `${conf.KeyCol}${rowName}`;
        let transCell        = sheet[transCellName] || {};
        let transKey         = UtilFormat.transText(transCell.v || '');
        let subgroupCellName = `${conf.SubGroupCol}${rowName}`;
        let subgroupCell     = sheet[subgroupCellName] || {};
        let subgroupName     = UtilFormat.trimStartDot(subgroupCell.v || '');

        if(!transKey)
            continue;

        // 查找【分类标记】对应的类
        if(subgroupName) {
            subgroups[subgroupName] = subgroups[subgroupName] || [];
            subgroups[subgroupName].push(transKey);
        }

        // 遍历所有语言，获取翻译
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

    return {translations, subgroups};
}
