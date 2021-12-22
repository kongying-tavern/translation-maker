import Path from 'path'
import CrossZip from 'cross-zip'

export default (base = process.cwd(), inPath = '', outPath = '') => {
  if (!inPath) { throw new Error('[PACK-TRANS] Input path is empty') }
  if (!outPath) { throw new Error('[PACK-TRANS] Output path is empty') }

  const zipIn = Path.resolve(base, inPath)
  const zipOut = Path.resolve(base, outPath)
  CrossZip.zipSync(zipIn, zipOut)
}
