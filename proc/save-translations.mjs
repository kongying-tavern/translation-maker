import _ from 'lodash';
import Path from 'path';
import FsExtra from 'fs-extra';

export default (base = process.cwd(), translations = {}, target = '', conf = {KeyMapper: {}}) => {
    if(!target)
        throw new Error('[SAVE-TRANS] Target is empty');

    for(let langCode in translations) {
        let translation         = translations[langCode] || {};
        let translationFilePath = Path.resolve(base, target, `./${langCode}.json`);
        FsExtra.outputJsonSync(translationFilePath, translation, 'utf-8');
    }
}
