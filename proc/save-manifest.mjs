import _ from 'lodash'
import Path from 'path'
import FsExtra from 'fs-extra'
import MD5 from 'md5'

export default (base = process.cwd(), translations = {}, target = '', conf = { KeyMapper: {} }) => {
  if (!target) { throw new Error('[SAVE-MANIFEST] Target is empty') }

  const translationMap = _.keyBy(conf.KeyMapper, 'langCode')

  for (const langCode in translations) {
    const config = translationMap[langCode] || {}
    const translationFilePath = Path.resolve(base, target, `./${langCode}.json`)
    const content = FsExtra.readFileSync(translationFilePath, 'utf-8')
    const json = FsExtra.readJsonSync(translationFilePath, 'utf-8')

    // 生成 MD5
    const contentBuf = Buffer.from(content)
    const md5Hash = MD5(contentBuf)
    _.set(translationMap, [langCode, 'md5Hash'], md5Hash)

    // 生成覆盖率
    const totalCount = _.keys(json).length
    const translatedCount = _.values(json).filter(v => v).length
    const ratioTranslated = totalCount === 0 ? 0 : +(translatedCount / totalCount * 100).toFixed(8)
    _.set(translationMap, [langCode, 'summary', 'countTotal'], totalCount)
    _.set(translationMap, [langCode, 'summary', 'countTranslated'], translatedCount)
    _.set(translationMap, [langCode, 'summary', 'ratioTranslated'], ratioTranslated)
  }

  const translationManifestPath = Path.resolve(base, target, './manifest.json')
  const translationMapVals = _.values(translationMap)
  FsExtra.outputJsonSync(translationManifestPath, translationMapVals, 'utf-8')
}
