import _ from 'lodash';

export default (base = process.cwd(), tlConfigs = []) => {
    let translations = {};
    let subgroups    = {};

    for(let tlConfig of tlConfigs) {
        // 获取数据
        let tlTranslations = _.get(tlConfig, 'translations', {});
        let tlSubgroups    = _.get(tlConfig, 'subgroups', {});

        // 合并翻译数据
        for(let langCode in tlTranslations) {
            let langTranslations       = _.get(tlTranslations, langCode, {});
            let langTranslationsExist  = _.get(translations, langCode, {});
            let langTranslationsMerged = _.assign({}, langTranslationsExist, langTranslations);
            _.set(translations, langCode, langTranslationsMerged);
        }

        // 合并分组数据
        for(let subgroupName in tlSubgroups) {
            let subgroupData       = _.get(tlSubgroups, subgroupName, []);
            let subgroupDataExist  = _.get(subgroups, subgroupName, []);
            let subgroupDataMerged = _.concat([], subgroupDataExist, subgroupData);
            let subgroupDataUnique = _.uniq(subgroupDataMerged);
            _.set(subgroups, subgroupName, subgroupDataUnique);
        }
    }

    return {translations, subgroups};
}
