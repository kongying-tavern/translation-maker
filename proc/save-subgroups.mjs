import _ from 'lodash'
import Path from 'path'
import FsExtra from 'fs-extra'

export default (base = process.cwd(), translationConfig = {}, target = '', conf = { KeyMapper: {} }) => {
  if (!target) { throw new Error('[SAVE-SUBGROUPS] Target is empty') }

  const translations = translationConfig.translations || {}
  const subgroups = translationConfig.subgroups || {}

  for (const langCode in translations) {
    const translation = translations[langCode] || {}
    const translationConverted = translation

    for (const subgroupName in subgroups) {
      const subgroupKeys = subgroups[subgroupName] || []
      const subgroupTranslation = _.pick(translationConverted, subgroupKeys)
      const subgroupTranslationSorted = _.sortBy(subgroupTranslation, v => subgroupKeys.indexOf(v))

      const translationOutput = subgroupTranslationSorted.join(',')
      const translationFilePath = Path.resolve(base, target, `./${langCode}.${subgroupName}.txt`)
      FsExtra.outputFileSync(translationFilePath, translationOutput, 'utf-8')
    }
  }
}
