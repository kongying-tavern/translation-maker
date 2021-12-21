import Url from 'url'
import Path from 'path'

function getCurrentFileName (path = '') {
  const filename = Url.fileURLToPath(path)
  return filename
}

function getCurrentDirName (path = '') {
  const filename = getCurrentFileName(path)
  const dirname = Path.dirname(filename)
  return dirname
}

export default {
  getCurrentFileName,
  getCurrentDirName
}
