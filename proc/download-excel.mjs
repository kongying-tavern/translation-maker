import _ from 'lodash'
import Path from 'path'
import Axios from 'axios'
import FsExtra from 'fs-extra'

export default async (base = process.cwd(), docKey = '', target = '') => {
  if (!docKey) { throw new Error('[DOWN-EXCEL] DocKey is empty') }
  if (!target) { throw new Error('[DOWN-EXCEL] Target is empty') }

  const downloadMeta = await Axios.get(`https://drive.kdocs.cn/api/v3/links/${docKey}/download?isblocks=false`).then(res => res.data).catch(() => ({}))
  const downloadUrl = _.get(downloadMeta, 'fileinfo.url', '')
  const excelPath = Path.resolve(base, target)

  return await Promise
    .resolve(downloadUrl)
    .then(() => {
      if (downloadUrl) { return true } else { throw new Error('[DOWN-EXCEL] Cannot fetch download URL') }
    })
    .then(() => {
      return Axios
        .get(downloadUrl, { responseType: 'arraybuffer' })
        .then(res => {
          FsExtra.outputFileSync(excelPath, res.data)
        })
        .catch(err => {
          throw err
        })
    })
    .catch(e => {
      throw new Error(`[DOWN-EXCEL] ${e.toString()}`)
    })
}
