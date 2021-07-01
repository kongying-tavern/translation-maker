const _       = require('lodash');
const Path    = require('path');
const FsExtra = require('fs-extra');
const MD5     = require('md5');

module.exports = (base = process.cwd(), translations = {}, target = '', conf = {KeyMapper: {}}) => {
    if(!target)
        throw new Error('[SAVE-TRANS] Target is empty');

    let translationMap = _.keyBy(conf.KeyMapper, 'langCode');

    for(let langCode in translations) {
        let translation         = translations[langCode] || {};
        let translationFilePath = Path.resolve(base, target, `./${langCode}.json`);
        FsExtra.outputJsonSync(translationFilePath, translation, 'utf-8');

        let content    = FsExtra.readFileSync(translationFilePath, 'utf-8');
        let contentBuf = Buffer.from(content);
        let md5Hash    = MD5(contentBuf);
        _.set(translationMap, [langCode, 'md5Hash'], md5Hash);
    }

    let translationManifestPath = Path.resolve(base, target, './manifest.json');
    let translationMapVals      = _.values(translationMap);
    FsExtra.outputJsonSync(translationManifestPath, translationMapVals, 'utf-8');
};
