import _ from 'lodash';
import Path from 'path';
import FsExtra from 'fs-extra';
import MD5 from 'md5';

export default (base = process.cwd(), translations = {}, target = '', conf = {KeyMapper: {}}) => {
    if(!target)
        throw new Error('[SAVE-MANIFEST] Target is empty');

    let translationMap = _.keyBy(conf.KeyMapper, 'langCode');

    for(let langCode in translations) {
        let config              = translationMap[langCode] || {};
        let translationFilePath = Path.resolve(base, target, `./${langCode}.json`);
        let content             = FsExtra.readFileSync(translationFilePath, 'utf-8');
        let json                = FsExtra.readJsonSync(translationFilePath, 'utf-8');

        // 生成 MD5
        let contentBuf = Buffer.from(content);
        let md5Hash    = MD5(contentBuf);
        _.set(translationMap, [langCode, 'md5Hash'], md5Hash);

        // 生成覆盖率
        let totalCount      = _.keys(json).length;
        let translatedCount = !!config.useKey ? totalCount : _.values(json).filter(v => v).length;
        let ratioTranslated = totalCount === 0 ? 0 : +(translatedCount / totalCount * 100).toFixed(8);
        _.set(translationMap, [langCode, 'totalCount'], totalCount);
        _.set(translationMap, [langCode, 'translatedCount'], translatedCount);
        _.set(translationMap, [langCode, 'ratioTranslated'], ratioTranslated);
    }

    let translationManifestPath = Path.resolve(base, target, './manifest.json');
    let translationMapVals      = _.values(translationMap);
    FsExtra.outputJsonSync(translationManifestPath, translationMapVals, 'utf-8');
}
