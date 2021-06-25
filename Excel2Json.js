const _            = require('lodash');
const Path         = require('path');
const Axios        = require('axios');
const FsExtra      = require('fs-extra');
const Rimraf       = require('rimraf');
const MD5          = require('md5');
const CrossZip     = require('cross-zip');
const UtilExcel    = require('./util/excel');
const ConfDownload = require('./config/download');
const ConfMapper   = require('./config/mapper');

const transText = (str = '') => {
    return str.replace(/\\n/g, '\n');
};

(async function() {
    let translations = {};

    // 清空Excel目录
    let excelDir = Path.resolve('./Excel');
    Rimraf.sync(excelDir);

    // 下载Excel
    let downloadMeta = await Axios.get(`https://drive.kdocs.cn/api/v3/links/${ConfDownload.DocKey}/download?isblocks=false`).then(res => res.data).catch(() => ({}));
    let downloadUrl  = _.get(downloadMeta, 'fileinfo.static_url', '');
    let excelPath    = Path.resolve(__dirname, './Excel/Excel.xlsx');
    await Promise.resolve(downloadUrl)
    .then(() => {
        if(downloadUrl)
            return true;
        else
            throw false;
    })
    .then(() => {
        return Axios
            .get(downloadUrl, {responseType: 'arraybuffer'})
            .then(res => {
                console.log('Download Excel Succeeds.')
                FsExtra.outputFileSync(excelPath, res.data);
            })
            .catch(err => {
                throw err;
            });
    })
    .catch(e => {
        console.error('Download Excel Fails.', 'Error:', e.toString());
        process.exit(0);
    });

    // 解析Excel
    let sheet     = UtilExcel.getSheet(excelPath, 'YSDTTranslate');
    let range     = UtilExcel.getRangeIndexes(sheet['!ref']);

    for(let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
        // 跳过指定行数
        if(rowIndex - range.s.r < ConfMapper.SkipRows)
            continue;

        let rowName       = UtilExcel.getRowName(rowIndex);
        let transCellName = `${ConfMapper.KeyCol}${rowName}`;
        let transCell     = sheet[transCellName] || {};
        let transKey      = transText(transCell.v || '');

        if(!transKey)
            continue;

        for(let colIndex = range.s.c; colIndex <= range.e.c; colIndex++) {
            let colName = UtilExcel.getColName(colIndex);

            // 查找Mapper配置，如果没有配置则直接跳过
            let mapperConf = ConfMapper.KeyMapper[colName]
            if(!mapperConf)
                continue;

            let cellName = `${colName}${rowName}`;
            let cell     = sheet[cellName] || {};
            let cellVal  = transText(cell.v || '');
            let langCode = mapperConf.langCode || '';

            _.set(translations, [langCode, transKey], cellVal);
        }
    }

    // 清空目标目录
    let outputDir = Path.resolve(__dirname, './output');
    Rimraf.sync(outputDir);

    // 保存文件
    let translationMap = _.keyBy(ConfMapper.KeyMapper, 'langCode');
    for(let langCode in translations) {
        let translation         = translations[langCode] || {};
        let translationFilePath = `./output/${langCode}.json`;
        FsExtra.outputJsonSync(translationFilePath, translation, 'utf-8');

        let content    = FsExtra.readFileSync(translationFilePath, 'utf-8');
        let contentBuf = Buffer.from(content);
        let md5Hash    = MD5(contentBuf);
        _.set(translationMap, [langCode, 'md5Hash'], md5Hash);
    }

    // 写入目录文件manifest.json
    FsExtra.outputJsonSync('./output/manifest.json', _.values(translationMap), 'utf-8');
    console.log('Manifest file generated.');

    // 打包成压缩文件
    let zipIn  = Path.resolve(__dirname, './output');
    let zipOut = Path.resolve(__dirname, './translations.zip');
    CrossZip.zipSync(zipIn, zipOut);
    console.log('Archieve file generated.');
})();
