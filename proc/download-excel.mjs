import Path from 'node:path'
import URL from 'node:url'
import Axios from 'axios'
import FsExtra from 'fs-extra'

export default async (base = process.cwd(), docBase = '', docPath = '', target = '') => {
  if (!docBase) { throw new Error('[DOWN-EXCEL] DocBase is empty') }
  if (!docPath) { throw new Error('[DOWN-EXCEL] DocPath is empty') }
  if (!target) { throw new Error('[DOWN-EXCEL] Target is empty') }

  const downloadUrl = URL.resolve(docBase, docPath)
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
