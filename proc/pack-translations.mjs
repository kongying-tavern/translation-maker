import Fs from 'fs'
import Path from 'path'
import Archiver from 'archiver'

export default (base = process.cwd(), inPath = '', outPath = '') => {
  if (!inPath) { throw new Error('[PACK-TRANS] Input path is empty') }
  if (!outPath) { throw new Error('[PACK-TRANS] Output path is empty') }

  const zipIn = Path.resolve(base, inPath)
  const zipOut = Path.resolve(base, outPath)

  const output = Fs.createWriteStream(zipOut)
  const archive = Archiver('zip', { zlib: { level: 9 } })
  archive.pipe(output)
  archive.directory(zipIn, false)
  archive.finalize()
}
