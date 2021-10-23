import _ from 'lodash';
import Path from 'path';
import FsExtra from 'fs-extra';

export default (base = process.cwd(), translationConfig = {}, target = '', conf = {KeyMapper: {}}) => {
    if(!target)
        throw new Error('[SAVE-SUBGROUPS] Target is empty');

    let translations = translationConfig.translations || {};
    let subgroups    = translationConfig.subgroups || {};

    for(let langCode in translations) {
        let translation          = translations[langCode] || {};
        let mapperConf           = _.find(conf.KeyMapper, {langCode}) || {};
        let translationConverted = mapperConf.useKey ? _.mapValues(translation, (v, i) => i) : translation;

        for(let subgroupName in subgroups) {
            let subgroupKeys              = subgroups[subgroupName] || [];
            let subgroupTranslation       = _.pick(translationConverted, subgroupKeys);
            let subgroupTranslationSorted = _.sortBy(subgroupTranslation, v => subgroupKeys.indexOf(v));

            let translationOutput   = subgroupTranslationSorted.join(',');
            let translationFilePath = Path.resolve(base, target, `./${langCode}.${subgroupName}.txt`);
            FsExtra.outputFileSync(translationFilePath, translationOutput, 'utf-8');
        }
    }
}
