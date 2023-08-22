function transText (str = '') {
  return str.replace(/\\n/g, '\n')
}

function trimStartDot (str = '') {
  return str.toString().replace(/^\./g, '')
}

export default {
  transText,
  trimStartDot
}
