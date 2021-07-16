const ConfDownload         = require('./config/download');
const ConfMapper           = require('./config/mapper');
const ProcRmdir            = require('./proc/rmdir');
const ProcDownloadExcel    = require('./proc/download-excel');
const ProcRenderExcel      = require('./proc/render-excel');
const ProcSaveTranslations = require('./proc/save-translations');
const ProcSaveSubgroups    = require('./proc/save-subgroups');
const ProcSaveManifest     = require('./proc/save-manifest');
const ProcPackTranslations = require('./proc/pack-translations');

(async function() {
    // 下载Excel
    ProcRmdir(__dirname, './resource');
    await ProcDownloadExcel(__dirname, ConfDownload.DocKey, './resource/excel.xlsx');

    // 解析Excel
    let tlConf = ProcRenderExcel(__dirname, './resource/excel.xlsx', 'YSDTTranslate', ConfMapper);

    // 保存语言文件
    ProcRmdir(__dirname, './output');
    ProcSaveTranslations(__dirname, tlConf.translations, './output/translations', ConfMapper);
    ProcSaveSubgroups(__dirname, tlConf, './output/subgroups', ConfMapper);
    ProcSaveManifest(__dirname, tlConf.translations, './output/translations', ConfMapper);

    // 打包成压缩文件
    ProcPackTranslations(__dirname, './output/translations', './output/translations.zip');
    ProcPackTranslations(__dirname, './output/subgroups', './output/subgroups.zip');
})();
