const _       = require('lodash');
const Path    = require('path');
const FsExtra = require('fs-extra');

module.exports = (base = process.cwd(), translations = {}, target = '', conf = {KeyMapper: {}}) => {
    if(!target)
        throw new Error('[SAVE-TRANS] Target is empty');

    let translationMap = _.keyBy(conf.KeyMapper, 'langCode');

    for(let langCode in translations) {
        let translation         = translations[langCode] || {};
        let translationFilePath = Path.resolve(base, target, `./${langCode}.json`);
        FsExtra.outputJsonSync(translationFilePath, translation, 'utf-8');
    }
};
