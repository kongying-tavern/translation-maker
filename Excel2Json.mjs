import ConfDownload from './config/download.mjs';
import ConfMapper from './config/mapper.mjs';
import UtilFile from './util/file.mjs';
import ProcRmdir from './proc/rmdir.mjs';
import ProcDownloadExcel from './proc/download-excel.mjs';
import ProcRenderExcel from './proc/render-excel.mjs';
import ProcSaveTranslations from './proc/save-translations.mjs';
import ProcSaveSubgroups from './proc/save-subgroups.mjs';
import ProcSaveManifest from './proc/save-manifest.mjs';
import ProcPackTranslations from './proc/pack-translations.mjs';

global.__dirname = UtilFile.getCurrentDirName(import.meta.url);

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
