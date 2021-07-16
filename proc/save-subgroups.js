const _       = require('lodash');
const Path    = require('path');
const FsExtra = require('fs-extra');

module.exports = (base = process.cwd(), translationConfig = {}, target = '', conf = {KeyMapper: {}}) => {
    if(!target)
        throw new Error('[SAVE-TRANS] Target is empty');

    let translations = translationConfig.translations || {};
    let subgroups    = translationConfig.subgroups || {};

    for(let langCode in translations) {
        let translation = translations[langCode] || {};

        for(let subgroupName in subgroups) {
            let subgroupKeys              = subgroups[subgroupName] || [];
            let subgroupTranslation       = _.pick(translation, subgroupKeys);
            let subgroupTranslationSorted = _.sortBy(subgroupTranslation, v => subgroupKeys.indexOf(v));

            let translationOutput   = subgroupTranslationSorted.join(',');
            let translationFilePath = Path.resolve(base, target, `./${langCode}.${subgroupName}.txt`);
            FsExtra.outputFileSync(translationFilePath, translationOutput, 'utf-8');
        }
    }
};
