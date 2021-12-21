import Path from 'path'
import FsExtra from 'fs-extra'

export default (base = process.cwd(), translations = {}, target = '', conf = { KeyMapper: {} }) => {
  if (!target) { throw new Error('[SAVE-TRANS] Target is empty') }

  for (const langCode in translations) {
    const translation = translations[langCode] || {}
    const translationFilePath = Path.resolve(base, target, `./${langCode}.json`)
    FsExtra.outputJsonSync(translationFilePath, translation, 'utf-8')
  }
}
