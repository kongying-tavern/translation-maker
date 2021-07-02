const Path   = require('path');
const Rimraf = require('rimraf');

module.exports = async (base = process.cwd(), path = '') => {
    if(!path)
        throw new Error('[RMDIR] Path is empty');

    let dir = Path.resolve(base, path);
    Rimraf.sync(dir);
};
