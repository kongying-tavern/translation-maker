import _ from 'lodash'

export default (base = process.cwd(), tlConfigs = []) => {
  const translations = {}
  const subgroups = {}

  for (const tlConfig of tlConfigs) {
    // 获取数据
    const tlTranslations = _.get(tlConfig, 'translations', {})
    const tlSubgroups = _.get(tlConfig, 'subgroups', {})

    // 合并翻译数据
    for (const langCode in tlTranslations) {
      const langTranslations = _.get(tlTranslations, langCode, {})
      const langTranslationsExist = _.get(translations, langCode, {})
      const langTranslationsMerged = _.assign({}, langTranslationsExist, langTranslations)
      _.set(translations, langCode, langTranslationsMerged)
    }

    // 合并分组数据
    for (const subgroupName in tlSubgroups) {
      const subgroupData = _.get(tlSubgroups, subgroupName, [])
      const subgroupDataExist = _.get(subgroups, subgroupName, [])
      const subgroupDataMerged = _.concat([], subgroupDataExist, subgroupData)
      const subgroupDataUnique = _.uniq(subgroupDataMerged)
      _.set(subgroups, subgroupName, subgroupDataUnique)
    }
  }

  return { translations, subgroups }
}
