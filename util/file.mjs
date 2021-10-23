import Url from 'url';
import Path from 'path'

function getCurrentFileName(path = '') {
    let filename = Url.fileURLToPath(path);
    return filename;
}

function getCurrentDirName(path = '') {
    let filename = getCurrentFileName(path);
    let dirname  = Path.dirname(filename);
    return dirname;
}

export default {
    getCurrentFileName,
    getCurrentDirName
}
